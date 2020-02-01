import React, { Component } from "react";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import "date-fns";
import axios from "axios";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";


import * as GLOBAL from "./../../utils/index";
import combinedStyles from "../../material-ui";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import content from "../images/content.svg";
import CreateTopic from "./CreateTopic";
import CourseTopicList from "./CourseTopicList";
import AddSessions from "./AddSessions";
import { handleAddFolder } from "../../actions/actionSetupCourse";
import { actionCreateCourse } from "../../actions/actionCreateCourse";
import { actionCreateTopic } from "../../actions/Courses/actionCreateTopic";


export class CreateCourseStepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setupCourse: true,
      showNewFolder: false,
      addTopic: false,
      courseID: null,
      topicID: null,
      showSessionForm: false,
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
    // this.props.actionGetCategory();
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  handleFileAdded(files) {
    this.props.values.ioriginalname.push({
      name: files.name
    });
    this.props.values.galleryData.push(files);
  }

  handleToggleAddContent = e => {
    e.preventDefault();
    this.setState({
      setupCourse: false
    });
  };

  handleOpenAddTopic = () => {
    this.setState({ addTopic: true });
  };

  handleCloseAddTopic = () => {
    this.setState({ addTopic: false });
  };

  handleAddSession = topic => {
    console.log(topic);
    this.setState({
      topicID: topic,
      showSessionForm: !this.state.showSessionForm
    });
  };
  handleAddSessionClose = () => {
    this.setState({
      showSessionForm: !this.state.showSessionForm
    });
  };
  render() {
    const {
      handleSubmit,
      classes,
      createCourseReducer
    } = this.props;

    let { setupCourse, addTopic, showSessionForm } = this.state;
    console.log(createCourseReducer.createCourseData);
    console.log(this.props);
// this.props.history.location.state.courseID
    return (
      <React.Fragment>
        {
          (this.props.history.location.state.courseID === undefined || this.props.history.location.state.courseID === null || this.props.history.location.state.courseID.length < 1)
            ?
            <h3 className="mt-4" align="center">No Data is available. Somthing went wrong ......</h3>
            :
            (
              <div className="container-fluid mt-4">
                <div className="row">
                  <div className="col">
                    <div className="card">
                      <div className="content">
                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                          <div className="c-formSection pt-4 pb-4 pl-0 pr-0">
                            <div className="col-lg d-flex justify-content-center align-items-center">
                              {setupCourse && !showSessionForm && (
                                <div className="c-upload-content d-flex justify-content-center align-items-center flex-column">
                                  <Button
                                    onClick={this.handleOpenAddTopic}
                                    color="primary"
                                    className={[
                                      "p-3",
                                      "pl-5",
                                      "pr-5",
                                      classes.button,
                                      classes.buttonPrimary
                                    ]}
                                  >
                                    Create New Topic
                              <CloudUploadIcon
                                      style={{ fontSize: 30, paddingLeft: 10 }}
                                    />
                                  </Button>
                                  <img src={content} width="200" alt="icon" />
                                </div>
                              )}
                              {!setupCourse && !showSessionForm && (
                                <h2 className="mt-5">Add content to your course</h2>
                              )}
                            </div>
                            {showSessionForm && (
                              <AddSessions
                                handleAddSessionClose={this.handleAddSessionClose}
                                topicID={this.state.topicID}
                              />
                            )}

                            {!showSessionForm && (
                              <div className="col-md-12">
                                <CourseTopicList
                                  handleAddSession={this.handleAddSession}
                                />
                              </div>
                            )}
                            <CreateTopic
                              addTopic={addTopic}
                              courseID={104}
                              // courseID={
                              //   createCourseReducer.createdCourse === true
                              //     ? createCourseReducer.createCourseData
                              //     : null
                              // }
                              handleOpenAddTopic={this.handleOpenAddTopic}
                              handleCloseAddTopic={this.handleCloseAddTopic}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { handleAddFolder, actionCreateCourse, actionCreateTopic },
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
    courseSummary: "",
    galleryData: [],
    ioriginalname: []
  }),
  handleSubmit: (payload, { props }) => {
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    if (userinfo === null) userinfo = [];
    payload["createdDate"] = moment().format("YYYY/MM/DD HH:mm");
    payload["createdBy"] =
      userinfo.userType === "admin"
        ? userinfo.AdminID
        : userinfo.userType === "vendor"
          ? userinfo.VendorID
          : userinfo.UserID;
    payload["RoleID"] =
      userinfo.userType === "admin"
        ? 1
        : userinfo.userType === "vendor"
          ? 4
          : 2;
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
      .then(function (response) {
        console.log(response);
        let imageArray = [];
        let imageArray2 = [];
        if (response.status === 200) {
          response.data.fileDetails.map(arr => {
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
          props.actionCreateCourse(payload);

          if (props.createCourseReducer.createdCourse === true) {
            // console.log("Creating topic");
            // payload = [];
            // payload["topicName"] = "Fundamentals";
            // payload["courseID"] = props.createCourseReducer.createCourseData;
            // props.actionCreateTopic(payload);
          }
        }
      })
      .catch(function () {
        console.log("Bad Response");
      });
  },
  displayName: "CreateCourseStepTwo"
})(CreateCourseStepTwo);
const CreateCourseStepTwoForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

export default withRouter(withStyles(combinedStyles)(CreateCourseStepTwoForm));
