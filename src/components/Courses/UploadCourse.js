import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import { CSVLink } from "react-csv";
// import CloudDownload from "@material-ui/icons/CloudDownload";


import combinedStyles from '../../material-ui';
import MediaUpload from '../ContentLibrary/MediaUpload';
import { actionCourseExcelUpload } from '../../actions/Courses/actionCourseExcelUpload';
import { actionDownloadCourseUploadTemplate } from '../../actions/Courses/actionDownloadCourseUploadTemplate';

//  import VerticalAlignBottom from '@material-ui/icons/VerticalAlignBottom';
// var file = "../../../public/CourseUploadTemplate.xlsx";
// import file from '../../../public/CourseUploadTemplate.xlsx';
// import { exportName } from '../../../public/CourseUploadTemplate.xlsx';
// import {file} from '../../../public'

export class UploadCourse extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      completed: 0
    }
  }

  componentDidMount = () => {
    // this.props.actionDownloadCourseUploadTemplate();
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.setValues({
      ...this.props.values,
      [event.target.name]: event.target.value
    });
  };

  handleDownload = () => {
    
    this.props.actionDownloadCourseUploadTemplate();

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
      classes,
      courseExcelUploadReducer,
      history
      // downloadCourseUploadTemplateReducer
    } = this.props;

    if (courseExcelUploadReducer.uploadedCourseExcel === true) {
      setTimeout(function () {
        // window.location.reload();
        history.push({pathname: '/courses',})
        courseExcelUploadReducer.uploadedCourseExcel = false;
      }, 1100);
      
    }

    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <ToastContainer autoClose={2000} />
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Upload Course Excel File</h6>
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
                  <div className="col-lg-6 col-6">
                    <h3 className="margin-0 padding-0">Upload Course Excel File</h3>
                  </div>
                  <div className="col-lg-6 col-6">
                    <div className="float-right">
                      <Button variant="contained" className={[classes.button, classes.buttonPrimary]} onClick={() => this.handleDownload()}>
                        <i class="fas fa-download"></i>
                        &nbsp;&nbsp;&nbsp;Download Sample File
                    </Button>
                    </div>
                  </div>
                </div>


                <div className="content">
                  <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <div className="c-formSection">
                      <div className="c-formSection__grid">
                        <MediaUpload
                          completed={this.state.completed}
                          handleFiles={this.handleFiles}
                        />
                      </div>
                    </div>
                    <div className="c-formSection pt-4 pb-4">

                      {/* <Button variant="contained" className={[classes.button, classes.buttonPrimary]}>
                    Download Sample File
                  </Button> */}
                      {/* <a href="https://dg-lms-api.herokuapp.com/public/sample/users.csv"> */}


                      {/* {
                        // downloadCourseSampleReducer.downloadedCourseSample === true &&
                        <CSVLink
                          // data={downloadCourseSampleReducer.downloadedCourseSampleData}
                          variant="outlined"
                          filename={"CourseUploadTemplate.xlsx"}
                          target="_blank"
                          className="downloadBtntemplat"
                        >
                          Download Template
                        <CloudDownload
                            className={[classes.button, classes.buttonPrimary]}
                          />
                        </CSVLink>
                      } */}





                      {/* </a> */}
                      <Link to="/courses">
                        <Button variant="contained" className={[classes.button, classes.buttonSecondary]}>
                          CANCEL
                        </Button>
                      </Link>

                      <Button type="submit" variant="contained" className={[classes.button, classes.buttonPrimary]}>
                        Submit
                      </Button>

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
  return bindActionCreators({ actionDownloadCourseUploadTemplate, actionCourseExcelUpload }, dispatch)
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // vendorID: Yup.string().required('Please select Vendor'),
  }),
  mapPropsToValues: () => ({
    files: [],
    // vendorID: '',
  }),
  handleSubmit: (payload, { props }) => {
    console.log(payload);
    let galleryFD = new FormData();
    let galleryFiles = payload.files;
    galleryFD.append("files", galleryFiles);
    //delete payload["files"];
    // let vendorID = payload["vendorID"];
    // galleryFD.shift();

    for (var pair of galleryFD.entries()) {
      console.log(pair[0]+ ' : ' + pair[1]); 
  }

    // for (var pair of galleryFD.entries()) {
    //   console.log(pair);
    // }

    // for (var value of galleryFD.values()) {
    //   console.log(value);
    // }

    // payload = [];
    // payload.push(...galleryFD);
    // payload.push(vendorID)

    // console.log(payload);
    props.actionCourseExcelUpload(galleryFD);
  },
  displayName: 'UploadCourse',
})(UploadCourse);

const UploadCourseForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withStyles(combinedStyles)(
  connect(mapStateToProps, mapDispatchToProps)(UploadCourseForm)
)