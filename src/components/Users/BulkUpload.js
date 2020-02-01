import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import combinedStyles from '../../material-ui';
import { bindActionCreators } from 'redux';
import { actionBulkUpload } from '../../actions/Vendors/actionBulkUpload';
import MediaUpload from '../ContentLibrary/MediaUpload';
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { actionGetVendors } from '../../actions/actionGetVendors';
import { Link } from 'react-router-dom';
import { actionDownloadSample } from '../../actions/Users/actionDownloadSample';
import { ToastContainer } from 'react-toastify';
//  import VerticalAlignBottom from '@material-ui/icons/VerticalAlignBottom';

export class BulkUpload extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      completed: 0
    }
  }

  componentDidMount = () => {
    this.props.actionGetVendors();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.setValues({
      ...this.props.values,
      [event.target.name]: event.target.value
    });
  };

  handleDownload = () => {
    this.props.actionDownloadSample();
  }

  handleFiles = files => {
    console.log(files)
    this.props.setValues({
      ...this.props.values,
      files: files
    });
  }

  render() {
    const {
      handleSubmit,
      handleChange,
      values,
      classes,
      errors,
      touched,
      getVendorReducer,
      bulkUploadReducer,
    } = this.props;

    if (bulkUploadReducer.bulkUploaded === true) {
      setTimeout(function () { window.location.reload(); bulkUploadReducer.bulkUploaded = false; }, 2100);
    }
    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <ToastContainer autoClose={2000} />
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Upload Bulk Users</h6>
                </div>
                <div className="col-lg-6 col-6 text-right">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header d-flex align-items-center border-0">
                  <h3 className="margin-0 padding-0">Upload Bulk Users</h3>
                </div>
                <div className="content">
                  <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <div className="c-formSection">
                      <div className="c-formSection__grid">
                        <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="age-simple">Choose Vendor</InputLabel>
                          <Select
                            fullWidth
                            required
                            error={errors.vendorID && touched.vendorID ? true : false}
                            value={values.vendorID}
                            onChange={handleChange}
                            inputProps={{
                              name: 'vendorID',
                              id: 'vendorID',
                              classes: { select: classes.textField }
                            }}
                          >
                            {
                              ((typeof getVendorReducer.vendorsData !== 'undefined' && getVendorReducer.vendorsData.length > 0) ?
                                (getVendorReducer.vendorsData.map((arr) => {
                                  return (
                                    <MenuItem value={arr.VendorID}>{arr.VendorName}</MenuItem>
                                  )
                                })) : <MenuItem value=""><em>None</em></MenuItem>)
                            }
                          </Select>
                          {errors.vendorID &&
                            touched.vendorID && (
                              <div className="errorMsg">
                                {errors.vendorID}
                              </div>
                            )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                        <MediaUpload
                          completed={this.state.completed}
                          handleFiles={this.handleFiles}
                        />
                      </div>
                    </div>
                    <div className="c-formSection pt-4 pb-4">
                      <Button type="submit" variant="contained" className={[classes.button, classes.buttonPrimary]}>
                        Submit
                  </Button>
                      {/* <Button variant="contained" className={[classes.button, classes.buttonPrimary]}>
                    Download Sample File
                  </Button> */}
                      {/* <a href="https://dg-lms-api.herokuapp.com/public/sample/users.csv"> */}
                      <Button variant="contained" className={[classes.button, classes.buttonPrimary]} onClick={() => this.handleDownload()}>
                        {/* <VerticalAlignBottom/> */}
                        <i class="fas fa-download"></i>
                        &nbsp;&nbsp;&nbsp;Download Sample File
                        </Button>
                      {/* </a> */}
                      <Link to="/users">
                        <Button variant="contained" className={[classes.button, classes.buttonSecondary]}>
                          CANCEL
                        </Button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ actionGetVendors, actionDownloadSample, actionBulkUpload }, dispatch)
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    vendorID: Yup.string().required('Please select Vendor'),
  }),
  mapPropsToValues: () => ({
    files: [],
    vendorID: '',
  }),
  handleSubmit: (payload, { props }) => {
    //console.log(payload);
    let galleryFD = new FormData();
    let galleryFiles = payload.files;
    galleryFD.append("files", galleryFiles);
    //delete payload["files"];
    let vendorID = payload["vendorID"];
    payload = [];
    payload.push(galleryFD);
    payload.push(vendorID)
    console.log(payload);
    props.actionBulkUpload(payload);
  },
  displayName: 'BulkUpload',
})(BulkUpload);

const BulkUploadForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withStyles(combinedStyles)(
  connect(mapStateToProps, mapDispatchToProps)(BulkUploadForm)
)