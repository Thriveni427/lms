import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import combinedStyles from "../../material-ui";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import * as GLOBAL from "../../utils/index";
import MediaUpload from "../ContentLibrary/MediaUpload";
import AddVideos from "./AddVideos";
import { actionAddSession } from "../../actions/Courses/actionAddSession";
import { actionAddVideo } from "../../actions/actionAddVideo";
import { actionCreateQuestionMcq } from "../../actions/actionCreateQuestionMcq";
import { actionAddArtifacts } from "../../actions/Courses/User/actionAddArtifacts";


export class AddSessions extends Component {
  state = {
    remark: true,
    remark1: false,
    remark2: false,
    remark3: false,
    remark4: false,
    remark5: false,
    difficultyLevel1: "",
    difficultyLevel2: "",
    difficultyLevel3: "",
    difficultyLevel4: "",
    difficultyLevel5: "",
    questions: []
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleFiles = files => {
    this.props.setValues({
      ...this.props.values,
      files: files
    });
    console.log(this.props);
  };

  addMoreQuest = () => {
    this.setState({ questions: [...this.state.questions, ""] })

  }
  handleRemove = (i) => {
    this.state.questions.splice(i, 1)
    this.setState({
      questions: this.state.questions
    })
  }
  handleLevelChange = (event, question) => {
    this.setState({ [event.target.name]: event.target.value });
    let values = { ...this.props.values };
    let newValue = (values[question][event.target.name] = event.target.value);
    console.log(newValue);

    this.props.setValues({
      ...this.props.values,
      newValue
    });
    console.log(this.props);

  };

  handleAddSessionClose = () => {
    this.props.handleAddSessionClose();
  };

  handleVideoData = (videoData, videoType, videotitledata, videodescriptiondata) => {
    console.log(videoData);
    console.log(videotitledata);
    console.log(videodescriptiondata);

    if (videoType === "file") {
      console.log("Got video from child");

      this.props.setValues({
        ...this.props.values,
        videofiles: videoData,
        videotitle: videotitledata,
        videodescription: videodescriptiondata
      });
    }
    else if (videoType === "url") {
      console.log("Got video url from child");

      this.props.setValues({
        ...this.props.values,
        videourl: videoData,
        videotitle: videotitledata,
        videodescription: videodescriptiondata
      });
    }
    else {
      console.log("Got empty data from child");
    }

    //
  };

  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleSubmit,
      addSessionReducer,
      classes
    } = this.props;
    const courseDetail = this.props.history.location.state.course;
    console.log(this.props);
    console.log(this.state);
    if (addSessionReducer.addedSessionComplete === true && addSessionReducer.addedSession === true) {
      addSessionReducer.addedSessionComplete = false;
      addSessionReducer.addedSession = false;
      this.handleAddSessionClose();
    }
    return (
      <div className="col-lg-12 d-flex">
        <ToastContainer autoClose={2000} />
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className="c-formSection">
            <div className="row">
              <div className="col-lg-12">
                <FormControl fullWidth>
                  <TextField
                    required
                    error={
                      errors.sessionName && touched.sessionName ? true : false
                    }
                    id="sessionName"
                    label="Session Title"
                    margin="normal"
                    onChange={handleChange}
                    value={values.sessionName}
                    InputProps={{ classes: { input: classes.textField } }}
                  />
                  {errors.sessionName && touched.sessionName && (
                    <div className="errorMsg">{errors.sessionName}</div>
                  )}
                </FormControl>
              </div>
              <div className="col-lg-12">
                <AddVideos
                  courseDetail={courseDetail}
                  handleVideoData={this.handleVideoData}
                />
              </div>
              {/* <div className="col-lg-12">
                <AddFile
                  courseDetail={courseDetail}
                  handleVideoData={this.handleVideoData}
                />
              </div> */}
              <div className="col-md-12">
                <Typography
                  component="h6"
                  variant="h6"
                  className="createFolder__title"
                >
                  Artifacts (codes, images etc.)
                </Typography>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <MediaUpload
                      completed={this.state.completed}
                      handleFiles={this.handleFiles}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <FormControl fullWidth>
                      <TextField
                        // required
                        error={
                          errors.filetitle && touched.filetitle
                            ? true
                            : false
                        }
                        id="filetitle"
                        label="Artifact Title"
                        margin="normal"
                        onChange={handleChange}
                        value={values.filetitle}
                        InputProps={{ classes: { input: classes.textField } }}
                      />
                      {errors.filetitle && touched.filetitle && (
                        <div className="errorMsg">{errors.filetitle}</div>
                      )}
                    </FormControl>
                  </div>
                  <div className="col-md-6">
                    <FormControl fullWidth>
                      <TextField
                        // required
                        multiline
                        error={
                          errors.filedescription && touched.filedescription
                            ? true
                            : false
                        }
                        id="filedescription"
                        label="Artifact Description"
                        margin="normal"
                        onChange={handleChange}
                        value={values.filedescription}
                        InputProps={{ classes: { input: classes.textField } }}
                      />
                      {errors.filedescription &&
                        touched.filedescription && (
                          <div className="errorMsg">
                            {errors.filedescription}
                          </div>
                        )}
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 ">
              </div>
            </div>
          </div>

          <div className="c-formSection">
            <Button
              onClick={this.handleOpenAddTopic}
              type="submit"
              color="primary"
              className={[
                "p-3",
                "pl-5",
                "pr-5",
                classes.button,
                classes.buttonPrimary
              ]}
            >
              Add Session
              </Button>
            <Button
              onClick={this.handleAddSessionClose}
              color="primary"
              className={[
                "p-3",
                "pl-5",
                "pr-5",
                classes.button,
                classes.buttonSecondary
              ]}
            >
              Go Back
              </Button>
            {/* <div className="b-formSection">
              <Button onClick={this.addMoreQuest} type="submit"
                color="primary"
                className={[
                  "p-3",
                  "pl-5",
                  "pr-5",
                  classes.button,
                  classes.buttonPrimary,

                ]}>Add more</Button>
              <Button
                onClick={this.handleRemove}
                color="primary"
                className={[
                  "p-3",
                  "pl-5",
                  "pr-5",
                  classes.button,
                  classes.buttonSecondary
                ]}
              >
                Remove
              </Button>
            </div> */}
          </div>

        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { actionAddVideo, actionAddSession, actionCreateQuestionMcq, actionAddArtifacts },
    dispatch
  );
};
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // question1: {
    //   questionName: Yup.string().required('Please enter course name'),
    //   answer: Yup.string().required('Please enter course name'),
    //   option1: Yup.string().required('Please enter course name'),
    //   option2: Yup.string().required('Please enter course name'),
    //   option3: Yup.string().required('Please enter course name'),
    //   option4: Yup.string().required('Please enter course name')
    // },
    // name: Yup.string().required('Please enter course name'),
    // courseType: Yup.string().required('Please enter course type'),
    // courseSummary: Yup.string().required('Please enter course summary'),
    // courseLevel: Yup.string().required('Please select course level'),
    // category: Yup.string().required('Please select course category'),
    // ioriginalname: Yup.string().required('Please upload course image'),
  }),

  mapPropsToValues: () => ({
    // question1: {
    //   questionName: "",
    //   answer: "",
    //   option1: "",
    //   option2: "",
    //   option3: "",
    //   option4: "",
    //   scoreForCorrect: "",
    //   scoreForIncorrect: "",
    //   difficultyLevel: "",
    //   remark: true,
    //   posRemark: "",
    //   negRemark: ""
    // },
    // question2: {
    //   questionName: "",
    //   answer: "",
    //   option1: "",
    //   option2: "",
    //   option3: "",
    //   option4: "",
    //   scoreForCorrect: "",
    //   scoreForIncorrect: "",
    //   difficultyLevel: "",
    //   remark: true,
    //   posRemark: "",
    //   negRemark: ""
    // },
    // question3: {
    //   questionName: "",
    //   answer: "",
    //   option1: "",
    //   option2: "",
    //   option3: "",
    //   option4: "",
    //   scoreForCorrect: "",
    //   scoreForIncorrect: "",
    //   difficultyLevel: "",
    //   remark: true,
    //   posRemark: "",
    //   negRemark: ""
    // },
    // question4: {
    //   questionName: "",
    //   answer: "",
    //   option1: "",
    //   option2: "",
    //   option3: "",
    //   option4: "",
    //   scoreForCorrect: "",
    //   scoreForIncorrect: "",
    //   difficultyLevel: "",
    //   remark: true,
    //   posRemark: "",
    //   negRemark: ""
    // },
    // question5: {
    //   questionName: "",
    //   answer: "",
    //   option1: "",
    //   option2: "",
    //   option3: "",
    //   option4: "",
    //   scoreForCorrect: "",
    //   scoreForIncorrect: "",
    //   difficultyLevel: "",
    //   remark: true,
    //   posRemark: "",
    //   negRemark: ""
    // },
    sessionName: "",
    // name: "",
    // courseType: "General",
    // category: "",
    // courseLevel: "",
    // courseSummary: "",
    // galleryData: [],
    // ioriginalname: [],
    // topicID: "",
    // difficultyLevel1: "",
    // difficultyLevel2: "",
    // difficultyLevel3: "",
    // difficultyLevel4: "",
    // difficultyLevel5: "",
    filedescription: "",
    filetitle: "",
  }),

  handleSubmit: (payload, { props }) => {
    let mypayload = [];
    let SessionID;
    let data = {
      courseID: props.history.location.state.courseID,
      topicID: props.topicID,
      sessionName: payload["sessionName"]
    };
    axios
      .post(GLOBAL.API_HOST + `/createSession`, data)
      .then(function (response) {
        const res = response;
        console.log(res);
        if (res.data.status === 200) {
          // toast.success(res.data.message);
          SessionID = res.data.data;

          // actionAddQuestions(SessionID, props.history.location.state.courseID, props, payload);
          addArtifacts(SessionID, props.history.location.state.courseID, props, payload);
          console.log(SessionID);

          mypayload = {};
          // payload.question1.difficultyLevel = payload.difficultyLevel1;
          // payload.question2.difficultyLevel = payload.difficultyLevel2;
          // payload.question3.difficultyLevel = payload.difficultyLevel3;
          // payload.question4.difficultyLevel = payload.difficultyLevel4;
          // payload.question5.difficultyLevel = payload.difficultyLevel5;
          // questions.push(payload.question1);
          // questions.push(payload.question2);
          // questions.push(payload.question3);
          // questions.push(payload.question4);
          // questions.push(payload.question5);
          // mypayload["questions"] = questions;
          mypayload.topicID = props.topicID;
          mypayload.sessionID = SessionID;
          mypayload.courseID = props.history.location.state.courseID;
          console.log(JSON.stringify(mypayload));
          console.log(mypayload);


          // mypayload.sessionID === SessionID
          //   ? axios
          //     .post(GLOBAL.API_HOST + `/createQuestion`, mypayload)
          //     .then(function (response) {
          //       const res = response;
          //       console.log(res);
          //       if (res.data.status === 200) {
          //         actionAddVideo(SessionID, payload);
          //       }
          //     })
          //     .catch(function () {
          //       console.log("Couldn't create question");
          //     })
          //   : console.log("waiting");
          console.log(payload);
          console.log(SessionID);
          console.log(props);

          actionAddVideo(SessionID, payload, props);

          // myprops.actionCreateQuestionMcq(mypayload);
        }
      })
      .catch(function () {
        console.log("Couldn't create a session");
      });

    function actionAddVideo(SessionID, payload, props) {
      console.log(payload);
      if (payload.videourl) {
        console.log(payload);

        // let arr = [];
        // arr.push({
        //   destination: "public/files",
        //   encoding: "7bit",
        //   fieldname: "files",
        //   filename: payload.videotitle,
        //   mimetype: "video/embed",
        //   originalname: payload.videotitle,
        //   path: payload.videourl,
        //   size: 26246026
        // });
        // console.log(arr);
        // console.log(payload.videourl);
        // console.log(payload.videodescription);
        // console.log(payload.videotitle);
        // console.log(SessionID);
        // // console.log(props.history.location.state.course.courseID);
        // console.log(props.history.location.state.courseID);

        // console.log( moment(Date.now()).format("YYYY/MM/DD HH:mm"));

        let imageArray = [];
        imageArray.push({
          materialLoc: payload.videourl,
          sectionID: SessionID,
          materialName: payload.videotitle,
          materialType: "video/embed",
          creationDate: moment(Date.now()).format("YYYY/MM/DD HH:mm"),
          modifiedDate: moment(Date.now()).format("YYYY/MM/DD HH:mm"),
          courseID: props.history.location.state.courseID,
          materialTitle: payload.videotitle,
          materialDescription: payload.videodescription
        });
        // payload = [];
        // payload.push(...imageArray);
        // delete payload.files;
        // console.log(payload);
        // console.log(payload);
        // delete payload.videourl;
        // delete payload.files;
        // delete payload.videodescription;
        // delete payload.videotitle;

        console.log(imageArray);
        props.actionAddVideo(imageArray);
      }
      // else if (payload.videofiles && payload.videofiles.length > 0) 
      else if (payload.videofiles) 

      {
        let galleryFD = new FormData();
        console.log(payload.videofiles);
        
        let galleryFiles = payload.videofiles;
        galleryFD.append("files", galleryFiles);
        axios
          .post(GLOBAL.API_HOST + `/uploadFile`, galleryFD)
          .then(function (response) {
            const res = response;
            console.log(res);
            let imageArray = [];

            if (res.status === 200) {
              // toast.success(res.data.message);
              res.data.fileDetails.map(arr => {
                console.log(arr);
                imageArray.push({
                  materialLoc: arr.location,  //res.data.fileDetails[0].path, //arr.path,
                  sectionID: SessionID, //localStorage.getItem("sectionID"),
                  sessionID: SessionID,
                  topicID: props.topicID,
                  materialName: arr.originalname,
                  materialType: arr.mimetype,
                  creationDate: moment().format("YYYY/MM/DD HH:mm"),
                  modifiedDate: moment().format("YYYY/MM/DD HH:mm"),
                  courseID: props.history.location.state.courseID,
                  materialTitle: payload.videotitle,
                  materialDescription: payload.videodescription
                });
                return null;
              });
              // mypayload = [];
              // mypayload.push(...imageArray);
              // delete payload.files;
              console.log(imageArray);
              props.actionAddVideo(imageArray);
            }
          })
          .catch(function () {
            console.log("Bad Response from long time");
          });
      }

      else {
      }
    }

    function addArtifacts(SessionID, courseID, myprops, payload) {
      console.log(SessionID);
      console.log(courseID);
      console.log(myprops);
      console.log(payload.files);

      if (payload.files) {
        let galleryFD = new FormData();
        let galleryFiles = payload.files;
        galleryFD.append("files", galleryFiles);
        axios.post(GLOBAL.API_HOST + `/uploadFile`, galleryFD)
          .then(function (response) {
            const res = response;
            console.log(res);
            let imageArray = [];

            if (res.status === 200) {
              // toast.success(res.data.message);

              // props.history.push({
              //   pathname: "/assesments",
              // },2000);

              res.data.fileDetails.map(arr => {
                console.log(arr);
                imageArray.push({
                  materialLoc: arr.location,  //res.data.fileDetails[0].path, //arr.path,
                  sectionID: SessionID, //localStorage.getItem("sectionID"),
                  sessionID: SessionID,
                  topicID: props.topicID,
                  materialName: arr.originalname,
                  materialType: arr.mimetype,
                  creationDate: moment().format("YYYY/MM/DD HH:mm"),
                  modifiedDate: moment().format("YYYY/MM/DD HH:mm"),
                  courseID: props.history.location.state.courseID,
                  materialTitle: payload.filetitle,
                  materialDescription: payload.filedescription
                });
                // return imageArray;
              });
              // mypayload = [];
              // mypayload.push(...imageArray);
              // delete payload.files;
              console.log(imageArray);

              props.actionAddArtifacts(imageArray);
            }
          })
          .catch(function () {
            console.log("Bad Response from long time");
          });
      }
      console.log(mypayload);

      // myprops.actionCreateQuestionMcq(mypayload);
    }


    // actionAddQuestions();
  },

  displayName: "AddSessions"
})(AddSessions);
const AddSessionsForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);
export default withRouter(withStyles(combinedStyles)(AddSessionsForm));
