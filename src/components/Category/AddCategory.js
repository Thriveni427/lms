import React, { Component } from "react";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { ToastContainer } from "react-toastify";
import "date-fns";
import moment from "moment";


import combinedStyles from "../../material-ui";
import { actionAddCategory } from "../../actions/actionAddCategory";
import { actionGetCategory } from "../../actions/actionGetCategory";


export class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      showSuccess: false,
      statusMessage: "",
      fetching: false,
      labelWidth: 0
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.setValues({
      ...this.props.values,
      [event.target.name]: event.target.value
    });
  };

  componentDidMount = () => {
    this.props.actionGetCategory();
    //this.props.actionGetCategory.getCategoryData;
  };

  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleSubmit,
      addCategoryReducer,
      getCategoryReducer,
      classes
    } = this.props;

    console.log(this.props);

    if (addCategoryReducer.addedCategory === true) {
      setTimeout(function () {
        //window.location.reload();
        addCategoryReducer.addedCategory = false;
      }, 1000);
    }

    let items = getCategoryReducer.getCategoryData.filter(function (element) {
      return element.ParentID === null;
    });




    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <ToastContainer autoClose={2000} />
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">
                    Home > Add Category
                  </h6>
                </div>
                <div className="col-lg-6 col-6 text-right" />
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header d-flex align-items-center border-0">
                  <h3 className="margin-0 padding-0">Add Category</h3>
                </div>
                <div className="content">
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="c-formSection">
                      <div className="c-formSection__grid">
                        <FormControl fullWidth>
                          <TextField
                            required
                            error={
                              errors.categoryName && touched.categoryName
                                ? true
                                : false
                            }
                            id="categoryName"
                            label="Category Name"
                            margin="normal"
                            onChange={handleChange}
                            value={values.categoryName}
                            InputProps={{
                              classes: { input: classes.textField }
                            }}
                          />
                          {errors.categoryName && touched.categoryName && (
                            <div className="errorMsg">
                              {errors.categoryName}
                            </div>
                          )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                        <FormControl
                          className={classes.formControl}
                          error={
                            errors.categoryID && touched.categoryID
                              ? true
                              : false
                          }
                        >
                          <InputLabel htmlFor="categoryID">
                            Select parent Category
                          </InputLabel>
                          <Select
                            fullWidth
                            error={
                              errors.categoryID && touched.categoryID
                                ? true
                                : false
                            }
                            value={values.categoryID}
                            onChange={handleChange}
                            //onBlur={handleBlur}
                            inputProps={{
                              name: "categoryID",
                              id: "categoryID",
                              classes: { select: classes.textField }
                            }}
                          >
                            {/* <MenuItem value="">
                              <em>None</em>
                            </MenuItem> */}
                            {/* {getCategoryReducer.getCategoryData.map(arr => {
                              return (
                                <MenuItem value={arr.CategoryID}>
                                  {arr.CategoryName}
                                </MenuItem>
                              );
                            })} */}

                            {items.map((arr, i) => {
                              return (
                                <MenuItem key={i} value={arr.CategoryID}>
                                  {arr.CategoryName}
                                </MenuItem>
                              );
                            })}

                          </Select>
                          {errors.categoryID && touched.categoryID && (
                            <div className="errorMsg">{errors.categoryID}</div>
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
                        ADD CATEGORY
                      </Button>
                      <Link to="/coursecategory">
                        <Button
                          variant="contained"
                          className={[classes.button, classes.buttonSecondary]}
                        >
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
    );
  }
}

// const mapStateToProps = state => {
//   return state
// }

// const mapDispatchToProps = {
//   return bindActionCreators({actionAddCategory}, dispatch)
// }

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // categoryName: Yup.string().required('Please enter first name').matches(/^[A-Za-z\s '-]+$/, { message : "Only characters and spaces are allowed" , excludeEmptyString: false }),
    // categoryID: Yup.string().required('Please select Parent')
  }),
  mapPropsToValues: () => ({
    categoryName: "",
    categoryID: ""
  }),
  handleSubmit: (payload, { props }) => {
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    // console.log("INFO:-", userinfo)
    // if (userinfo === null) userinfo = [];
    props.actionAddCategory(payload);
    payload["createdDate"] = moment().format("YYYY-MM-DD HH:mm:ss");
    payload["createdBy"] = ((userinfo.userType === "admin") ? userinfo.UserID : ((userinfo.userType === "vendor") ? userinfo.VendorID : userinfo.UserID));
  },

  displayName: "AddCategory"
})(AddCategory);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ actionAddCategory }, dispatch);
};

const AddCategoryForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

//export default withStyles(combinedStyles)(connect(mapStateToProps, {actionAddCategory, actionGetCategory})(AddCategoryForm))

export default withRouter(
  withStyles(combinedStyles)(
    connect(
      mapStateToProps,
      { actionAddCategory, actionGetCategory }
    )(AddCategoryForm)
  )
);
