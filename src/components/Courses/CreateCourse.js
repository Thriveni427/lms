import React from "react";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as GLOBAL from "./../../utils/index";
import * as Yup from "yup";
import "date-fns";
import axios from "axios";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DateTimePicker } from "material-ui-pickers";
import { withRouter, Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import combinedStyles from "../../material-ui";
import { actionCreateCourse } from "../../actions/actionCreateCourse";
import { actionGetCategory } from "../../actions/actionGetCategory";
import DropzoneComponent from "react-dropzone-component";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import { ToastContainer } from "react-toastify";

export class CreateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelWidth: 0,
      startdate: new Date(),
      enddate: new Date(),
      courseSummary: ""
    };
    this.djsConfig = {
      addRemoveLinks: true,
      acceptedFiles:
        "image/*,application/pdf,.mov,.mp4,.mp3,.ppt,.pptx,.doc,.docx,.xls",
      autoProcessQueue: false
    };
    this.componentConfig = {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "/FileUploadHandler.ashx"
    };
    this.dropzone = null;
  }

  componentDidMount = () => {
    this.props.actionGetCategory();
  };

  handleStartDateChange = date => {
    this.setState({ selectedDate: date });
    this.props.setValues({
      ...this.props.values,
      startdate: date
    });
  };
  handleEndDateChange = date => {
    this.setState({ selectedDate: date });
    this.props.setValues({
      ...this.props.values,
      enddate: date
    });
  };

  handleCategoryChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.setValues({
      ...this.props.values,
      [event.target.name]: event.target.value
    });
  };

  onEditorStateChange = courseSummary => {
    this.setState({
      courseSummary
    });
    this.props.setValues({
      ...this.props.values,
      courseSummary
    });
  };

  handleStatus = name => event => {
    this.setState({ [name]: event.target.checked });
    this.props.setValues({
      ...this.props.values,
      [name]: event.target.checked
    });
  };

  handleFileAdded(files) {
    this.props.values.ioriginalname.push({
      name: files.name
    });
    this.props.values.galleryData.push(files);
  }

  render() {
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;
    const eventHandlers = {
      init: dz => (this.dropzone = dz),
      addedfile: this.handleFileAdded.bind(this)
    };
    const {
      values,
      touched,
      errors,
      handleChange,
      handleSubmit,
      classes,
      history,
      getCategoryReducer,
      createCourseReducer
    } = this.props;

    // console.log(createCourseReducer);
    if (createCourseReducer.createdCourse === true) {
      console.log(createCourseReducer.createCourseData);
      setTimeout(() => {
        history.push({
          pathname: "/assesments",
          state: { courseID: createCourseReducer.createCourseData }
        });
        createCourseReducer.createdCourse = false;
      }, 1100);

      // setTimeout(function () { history.push({ pathname: '/courses', }); createCourseReducer.createdCourse = false; }, 2100);
    }

    let parentCategory = getCategoryReducer.getCategoryData.filter(function(
      element
    ) {
      return element.ParentID === null;
    });
    let childCategories = getCategoryReducer.getCategoryData.filter(function(
      element
    ) {
      return element.ParentID !== null;
    });

    let childCategory = [];

    // console.log(this.props);

    if (this.props.values.category === "") {
      childCategory = [];
    } else {
      childCategory = childCategories.filter(element => {
        return element.ParentID === this.props.values.category;
      });
    }

    return (
      <React.Fragment>
        <ToastContainer autoClose={2000} />
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">
                    Home > Create Course
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
                  {/* <h3 className="margin-0 padding-0">Create Course</h3> */}
                </div>
                <div className="content">
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="c-formSection">
                      <div className="c-formSection__grid">
                        <FormControl fullWidth>
                          <TextField
                            required
                            error={errors.name && touched.name ? true : false}
                            id="name"
                            label="Course Name"
                            margin="normal"
                            onChange={handleChange}
                            value={values.name}
                            InputProps={{
                              classes: { input: classes.textField }
                            }}
                          />
                          {errors.name && touched.name && (
                            <div className="errorMsg">{errors.name}</div>
                          )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                        <FormControl
                          className={classes.formControl}
                          error={
                            errors.courseType && touched.courseType
                              ? true
                              : false
                          }
                        >
                          <InputLabel htmlFor="courseType">
                            Course Type *
                          </InputLabel>
                          <Select
                            fullWidth
                            required
                            error={
                              errors.courseType && touched.courseType
                                ? true
                                : false
                            }
                            value={values.courseType}
                            onChange={this.handleCategoryChange}
                            inputProps={{
                              name: "courseType",
                              id: "courseType",
                              classes: { select: classes.textField }
                            }}
                          >
                            <MenuItem value={"General"}>General</MenuItem>
                            {/* <MenuItem value={"Third Party"}>
                              Third Party
                            </MenuItem> */}
                            {/* <MenuItem value={"Free"}>Free</MenuItem> */}
                          </Select>
                          {errors.courseType && touched.courseType && (
                            <div className="errorMsg">{errors.courseType}</div>
                          )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid--full">
                        <div className="row">
                          <div className="col-md-6">
                            <FormControl
                              className={classes.formControl}
                              error={
                                errors.category && touched.category
                                  ? true
                                  : false
                              }
                            >
                              <InputLabel htmlFor="category">
                                Select category *
                              </InputLabel>
                              <Select
                                error={
                                  errors.category && touched.category
                                    ? true
                                    : false
                                }
                                fullWidth
                                required
                                value={values.category}
                                onChange={this.handleCategoryChange}
                                inputProps={{
                                  name: "category",
                                  id: "category",
                                  classes: { select: classes.textField }
                                }}
                              >
                                {parentCategory.map((arr, i) => {
                                  return (
                                    <MenuItem key={i} value={arr.CategoryID}>
                                      {arr.CategoryName}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                              {errors.category && touched.category && (
                                <div className="errorMsg">
                                  {errors.category}
                                </div>
                              )}
                            </FormControl>
                          </div>
                          <div className="col-md-6">
                            <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="subCategory">
                                Select Subcategory
                              </InputLabel>
                              <Select
                                fullWidth
                                required
                                value={values.subCategory}
                                onChange={this.handleCategoryChange}
                                inputProps={{
                                  name: "subCategory",
                                  id: "subCategory",
                                  classes: { select: classes.textField }
                                }}
                              >
                                <MenuItem value={0}>None</MenuItem>
                                {childCategory.map(arr => {
                                  return (
                                    // <Fragment>

                                    <MenuItem value={arr.CategoryID}>
                                      {arr.CategoryName}
                                    </MenuItem>
                                    // </Fragment>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div className="c-formSection__grid--full mt-2">
                        <div className="row">
                          <div className="col-md-4">
                            <FormControl
                              className={classes.formControl}
                              error={
                                errors.courseLevel && touched.courseLevel
                                  ? true
                                  : false
                              }
                            >
                              <InputLabel htmlFor="courseLevel">
                                Select Level *
                              </InputLabel>
                              <Select
                                fullWidth
                                required
                                value={values.courseLevel}
                                onChange={this.handleCategoryChange}
                                inputProps={{
                                  name: "courseLevel",
                                  id: "courseLevel",
                                  classes: { select: classes.textField }
                                }}
                              >
                                <MenuItem value={"Beginner"}>Beginner</MenuItem>
                                <MenuItem value={"Intermediate"}>
                                  Intermediate
                                </MenuItem>
                                <MenuItem value={"Advance"}>Advanced</MenuItem>
                              </Select>
                              {errors.courseLevel && touched.courseLevel && (
                                <div className="errorMsg">
                                  {errors.courseLevel}
                                </div>
                              )}
                            </FormControl>
                          </div>
                          <div className="col-md-4 mt-1">
                            <FormControl className={classes.formControl}>
                              <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DateTimePicker
                                  fullWidth
                                  autoOk
                                  name="startdate"
                                  ampm={false}
                                  label="Course Validity(From)"
                                  disablePast
                                  value={values.startdate}
                                  onChange={this.handleStartDateChange}
                                />
                              </MuiPickersUtilsProvider>
                            </FormControl>
                          </div>
                          <div className="col-md-4 mt-1">
                            <FormControl className={classes.formControl}>
                              <MuiPickersUtilsProvider utils={MomentUtils}>
                                <DateTimePicker
                                  fullWidth
                                  autoOk
                                  name="enddate"
                                  ampm={false}
                                  label="Course Validity(To)"
                                  disablePast
                                  value={values.enddate}
                                  onChange={this.handleEndDateChange}
                                />
                              </MuiPickersUtilsProvider>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div className="c-formSection__grid--full mt-3">
                        <FormControl
                          className={classes.formControl}
                          error={
                            errors.coursesummary && touched.coursesummary
                              ? true
                              : false
                          }
                        >
                          <TextField
                            fullWidth={true}
                            required
                            multiline={true}
                            rows={8}
                            rowsMax={16}
                            id="courseSummary"
                            label="Course summary"
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            value={values.courseSummary}
                            InputProps={{
                              classes: { input: classes.textField }
                            }}
                          />
                          {errors.courseSummary && touched.courseSummary && (
                            <div className="errorMsg">
                              {errors.courseSummary}
                            </div>
                          )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid--full mt-4">
                        <InputLabel htmlFor="ioriginalname">
                          Course image (Maximum size for new files: 256MB,
                          maximum attachments: 1)
                        </InputLabel>
                        <DropzoneComponent
                          config={config}
                          eventHandlers={eventHandlers}
                          djsConfig={djsConfig}
                        >
                          <div className="dz-message">
                            Min image dimension 1024 x 1024 px
                          </div>
                        </DropzoneComponent>
                        {errors.ioriginalname && touched.ioriginalname && (
                          <div className="errorMsg">{errors.ioriginalname}</div>
                        )}
                      </div>
                    </div>
                    <div className="c-formSection pt-4 pb-4">
                      <Button
                        variant="contained"
                        className={[classes.button, classes.buttonPrimary]}
                        type="submit"
                      >
                        Save and Continue
                      </Button>
                      <Link to="/courses">
                        <Button
                          variant="contained"
                          className={[classes.button, classes.buttonSecondary]}
                        >
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
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { actionGetCategory, actionCreateCourse },
    dispatch
  );
};

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Please enter course name"),
    courseType: Yup.string().required("Please enter course type"),
    courseSummary: Yup.string().required("Please enter course summary"),
    courseLevel: Yup.string().required("Please select course level"),
    category: Yup.string().required("Please select course category"),
    ioriginalname: Yup.string().required("Please upload course image")
  }),
  mapPropsToValues: () => ({
    name: "",
    courseType: "General",
    category: "",
    courseLevel: "",
    subCategory: "",
    courseSummary: "",
    galleryData: [],
    ioriginalname: []
  }),
  handleSubmit: (payload, { props }) => {
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    console.log(userinfo);
    // if (userinfo === null) userinfo = [];
    payload["createdDate"] = moment().format("YYYY/MM/DD HH:mm");
    payload.enddate = moment(payload.enddate).format("YYYY/MM/DD HH:mm");
    payload.startdate = moment(payload.startdate).format("YYYY/MM/DD HH:mm");
    payload["createdBy"] =
      userinfo.userType === "admin"
        ? userinfo.UserID
        : userinfo.userType === "vendor"
        ? userinfo.VendorID
        : userinfo.UserID;
    payload["RoleID"] =
      userinfo.userType === "admin"
        ? 1
        : userinfo.userType === "vendor"
        ? 4
        : 2;
    payload["CourseStatus"] = "1";
    delete payload[""];
    let galleryFD = new FormData();
    let galleryFiles = payload.galleryData;
    if (galleryFiles !== undefined) {
      for (var i = 0; i < galleryFiles.length; i++) {
        galleryFD.append("files", galleryFiles[i]);
      }
    }
    axios
      .post(GLOBAL.API_HOST + `/uploadCourseImage`, galleryFD)
      .then(function(response) {
        console.log(response);
        let imageArray = [];
        let imageArray2 = [];
        if (response.status === 200) {
          response.data.fileDetails.map(arr => {
            console.log(arr);
            imageArray.push({
              location: arr.location
            });
            imageArray2.push({
              name: arr.originalname
            });
            return 0;
          });
          payload["iuploadname"] = imageArray;
          payload["ioriginalname"] = imageArray2;
          delete payload["galleryData"];
          console.log(payload);
          props.actionCreateCourse(payload);
        }
      })
      .catch(function() {
        console.log("Bad Response");
      });
  },
  displayName: "CreateCourse"
})(CreateCourse);
const CreateCourseForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

export default withRouter(withStyles(combinedStyles)(CreateCourseForm));
