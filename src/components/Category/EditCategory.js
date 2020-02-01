import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Link, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import combinedStyles from '../../material-ui';
import { actionEditCategory } from '../../actions/actionEditCategory';
import { actionGetCategory } from '../../actions/actionGetCategory';
import 'date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css'
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
import { ToastContainer } from 'react-toastify';


export class EditCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labelWidth: 0
    };
  }

  componentDidMount = () => {
    this.props.actionGetCategory();
  }

  handleCategoryChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.setValues({
      ...this.props.values,
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      //handleBlur,
      handleSubmit,
      classes,
      editCategoryReducer,
      getCategoryReducer,
      history
    } = this.props;

    if (editCategoryReducer.editedCategory === true) {

      setTimeout(function () { history.push({ pathname: '/coursecategory', }); editCategoryReducer.editedCategory = false; }, 2100);
    }

    console.log(this.props);
    console.log(this.state);
    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Edit Category</h6>
                </div>
                <div className="col-lg-6 col-6 text-right">
                  {/* <Button
                    variant="contained"
                    color="primary"
                    className={[classes.button, classes.buttonWhite, classes.buttonSm]}
                  >
                    New
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={[classes.button, classes.buttonWhite, classes.buttonSm]}
                  >
                    Filters
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <ToastContainer autoClose={2000} />
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header d-flex align-items-center border-0">
                  <h3 className="margin-0 padding-0">Edit Category</h3>
                </div>
                <div className="content">
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="c-formSection">
                      <div className="c-formSection__grid">
                        <FormControl fullWidth>
                          <TextField
                            required
                            error={errors.categoryName && touched.categoryName ? true : false}
                            id="categoryName"
                            label="Course Name"
                            margin="normal"
                            onChange={handleChange}
                            value={values.categoryName}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.categoryName &&
                            touched.categoryName && (
                              <div classcategoryName="errorMsg">
                                {errors.categoryName}
                              </div>
                            )}
                        </FormControl>
                      </div>

                      <div className="c-formSection__grid">
                        <FormControl className={classes.formControl} error={errors.parentID && touched.parentID ? true : false}>
                          <InputLabel htmlFor="parentID">Select parent Category</InputLabel>
                          <Select
                            fullWidth
                            error={errors.parentID && touched.parentID ? true : false}
                            value={values.parentID}
                            onChange={handleChange}
                            //onBlur={handleBlur}
                            inputProps={{
                              name: 'parentID',
                              id: 'parentID',
                              classes: { select: classes.textField }
                            }}
                          >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {
                              getCategoryReducer.getCategoryData.map((arr) => {
                                return (
                                  <MenuItem value={arr.CategoryID}>{arr.CategoryName}</MenuItem>
                                )
                              })
                            }
                          </Select>
                          {errors.parentID &&
                            touched.parentID && (
                              <div className="errorMsg">
                                {errors.parentID}
                              </div>
                            )}
                        </FormControl>
                      </div>

                    </div>
                    <div className="c-formSection pt-4 pb-4">
                      <Button
                        variant="contained"
                        className={[classes.button, classes.buttonPrimary]}
                        type="submit"
                      >
                        Edit Category
                  </Button>
                      <Link to="/coursecategory">
                        <Button variant="contained" className={[classes.button, classes.buttonSecondary]}>
                          Cancel
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
  return bindActionCreators({ actionEditCategory }, dispatch)
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // categoryName: Yup.string().required('Please enter category name'),
    // courseType: Yup.string().required('Please enter category type'),
    // courseStatus: Yup.string().required('Please enter category status'),
    // duration: Yup.string().required('Please enter category duration'),
    // category: Yup.string().required('Please select category category'),
    // subCategory: Yup.string().required('Please select category sub category'),
    //startdate: Yup.string().required('Please enter category start date')
  }),
  mapPropsToValues: (function (props) {
    console.log(props.history.location.state);

    if (props.history.location.state.category === undefined) {
      return {
        categoryName: '',
        categoryID: '',
        createdDate: props.history.location.state.category.CreatedDate,
        createdBy: props.history.location.state.category.CreatedBy,
        parentID: ''
      }
    }
    else {
      return {
        categoryName: props.history.location.state.category.CategoryName,
        categoryID: props.history.location.state.category.CategoryID,
        createdDate: props.history.location.state.category.CreatedDate,
        createdBy: props.history.location.state.category.CreatedBy,
        parentID: props.history.location.state.category.ParentID
      }
    }
  }),
  handleSubmit: (payload, { props }) => {
    let x = payload["parentID"];
    delete payload["parentID"];
    console.log(x);
    console.log(typeof x);
    payload["parentID"] = ((x !== "" || x !== undefined || x !== null) ? x : null);
    console.log(payload["parentID"]);

    props.actionEditCategory(payload);
  },
  displayName: 'EditCategory',
})(EditCategory);
const EditCategoryForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter(withStyles(combinedStyles)(connect(mapStateToProps, { actionGetCategory, actionEditCategory })(EditCategoryForm)
))