import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withFormik } from "formik";
import * as Yup from "yup";
import { bindActionCreators } from "redux";
import axios from "axios";
import moment from "moment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";


import * as GLOBAL from "./../../utils/index";
import combinedStyles from "../../material-ui";
import MediaUpload from "../ContentLibrary/MediaUpload";
import { handleHideVideo } from "../../actions/actionSetupCourse";
import { actionAddVideo } from "../../actions/actionAddVideo";


export class AddVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "uploadfile",
      completed: 0,
      showVideoUrl: false,
      showUploadVideo: true,
      showScreenRecord: false,
      showVideoUpload: false,
      materialType: ""
    };
  }
  handleHide = () => {
    console.log("inside handleHide()");
    this.props.handleHideVideo();
  };
  handleButtonChange = event => {
    event.preventDefault();
    console.log(event.target.value);
    let value = event.target.value;
    this.setState({ value: value });

    if (value === "uploadfile") {
      this.setState({
        showVideoUrl: false,
        showUploadVideo: true,
        materialType: "video/file"
      });
      this.props.setValues({
        ...this.props.values,
        materialType: "video/file"
      });
    }

    else if (value === "embedvideo") {
      this.setState({
        showVideoUrl: true,
        showUploadVideo: false,
        materialType: "video/embed"
      });
      this.props.setValues({
        ...this.props.values,
        materialType: "video/embed"
      });
    }

    else if (value === "record") {
      this.setState({
        showVideoUrl: false,
        showUploadVideo: false,
        materialType: "video/record"
      });
      this.props.setValues({
        ...this.props.values,
        materialType: "video/record"
      });
    }
  };

  // handleVideoUrl = () => {
  //   this.setState({
  //       showVideoUrl: !this.state.showVideoUrl
  //   })
  // }

  handleTextChange = (e, text) => {
    e.preventDefault();

    console.log(this.props);

    if(text === "videodescription"){
      this.props.setValues({
        ...this.props.values,
        videodescription: e.target.value
      });
      if(this.props.values.materialType === "video/embed"){

        this.props.handleVideoData(
          this.props.values.videoUrl,
          "url",
          this.props.values.videotitle,
          this.props.values.videodescription
        );
      }
      else{
        this.props.handleVideoData(
          this.props.values.files,
          "file",
          this.props.values.videotitle,
          this.props.values.videodescription
        );
      }
    }
    else if(text === "videotitle"){
      this.props.setValues({
        ...this.props.values,
        videotitle: e.target.value
      });
      if(this.props.values.materialType === "video/embed"){

        this.props.handleVideoData(
          this.props.values.videoUrl,
          "url",
          this.props.values.videotitle,
          this.props.values.videodescription
        );
      }
      else{
        this.props.handleVideoData(
          this.props.values.files,
          "file",
          this.props.values.videotitle,
          this.props.values.videodescription
        );
      }
    }
    else{
      console.log(text);
    }
    

    
    
  }

  handleUrlChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log(e.target.name);
    console.log(this.props);

    this.props.setValues({
      ...this.props.values,
      videoUrl: e.target.value
    });
    console.log(this.props);
    
    this.props.handleVideoData(
      e.target.value,
      "url",
      this.props.values.videotitle,
      this.props.values.videodescription
    )
  }

  handleFiles = files => {
    this.props.setValues({
      ...this.props.values,
      files: files
      // videotitle: this.props.values.videotitle,
      // videodescription: this.props.values.videodescription
    });
    console.log(this.props);

    this.props.handleVideoData(
      this.props.values.files,
      "file",
      this.props.values.videotitle,
      this.props.values.videodescription
    );
  };

  handleBack = () => { };

  render() {
    const {
      values,
      touched,
      errors,
      handleSubmit,
      classes
    } = this.props;

    return (
      <div className="createFolder mb-4 mb-4">
        <div className="createFolder__card">
          <div className="createFolder__content">
            <Typography
              component="h6"
              variant="h6"
              className="createFolder__title"
            >
              Upload Video
            </Typography>
            <div className="player-uploader">
              <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <div className="video-source">
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <FormControl
                        fullWidth
                        className="createFolder__formControl"
                      >
                        <RadioGroup
                          aria-label="Gender"
                          name="gender1"
                          row
                          className={classes.group}
                          value={this.state.value}
                          onChange={this.handleButtonChange}
                        >
                          <FormControlLabel
                            value="uploadfile"
                            control={<Radio />}
                            label="Upload Video File"
                          />
                          <FormControlLabel
                            value="embedvideo"
                            control={<Radio />}
                            label="Embed Video URL"
                          />
                          {/* <FormControlLabel value="record" control={<Radio />} label="Record your screen" /> */}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                  <div className="row">
                    {
                      this.state.showVideoUrl && (
                        <div className="col-md-12 mb-3">
                          <FormControl fullWidth style={{ padding: 0 }}>
                            <TextField
                              required
                              error={
                                errors.videourl && touched.videourl ? true : false
                              }
                              id="videourl"
                              label="https://www.youtube.com/watch?v=7Uuwjlu-5S4"
                              helperText="Paste URL of the video training material"
                              onChange={(e) => {this.handleUrlChange(e)}}
                              value={values.videourl}
                              InputProps={{
                                classes: { input: classes.textField }
                              }}
                            />
                            {errors.videourl && touched.videourl && (
                              <div className="errorMsg">{errors.videourl}</div>
                            )}
                          </FormControl>
                        </div>
                      )
                    }
                  </div>
                  {
                    this.state.showUploadVideo && (
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <MediaUpload
                            completed={this.state.completed}
                            handleFiles={this.handleFiles}
                          />
                        </div>
                      </div>
                    )
                  }
                  <div className="row">
                    <div className="col-md-6">
                      <FormControl fullWidth>
                        <TextField
                          required
                          error={
                            errors.videotitle && touched.videotitle
                              ? true
                              : false
                          }
                          id="videotitle"
                          label="Video Title"
                          margin="normal"
                          onChange={(e) => {this.handleTextChange(e, "videotitle")}}
                          value={values.videotitle}
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.videotitle && touched.videotitle && (
                          <div className="errorMsg">{errors.videotitle}</div>
                        )}
                      </FormControl>
                    </div>
                    <div className="col-md-6">
                      <FormControl fullWidth>
                        <TextField
                          required
                          multiline
                          error={
                            errors.firstname && touched.videodescription
                              ? true
                              : false
                          }
                          id="videodescription"
                          label="Video Description"
                          margin="normal"
                          onChange={(e) => {this.handleTextChange(e, "videodescription")}}
                          value={values.videodescription}
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.videodescription &&
                          touched.videodescription && (
                            <div className="errorMsg">
                              {errors.videodescription}
                            </div>
                          )}
                      </FormControl>
                    </div>
                  </div>
                </div>
                {/* <Button
              variant="contained"
              color="primary"
              type="submit"
              className={[classes.button, classes.buttonPrimary]}
            >
              SAVE CHANGES
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={(event) => this.handleHide()}
              className={[classes.button, classes.buttonSecondary]}
            >
              CANCEL
            </Button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => { };

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ actionAddVideo, handleHideVideo }, dispatch);
};

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({}),
  mapPropsToValues: () => ({
    files: [],
    materialType: ""
  }),
  handleSubmit: (payload, { state, props }) => {
    console.log(payload);
    console.log(props);
    console.log(state);

    if (!payload.videourl) {
      let galleryFD = new FormData();
      let galleryFiles = payload.files;
      galleryFD.append("files", galleryFiles);
      axios
        .post(GLOBAL.API_HOST + `/uploadFile`, galleryFD)
        .then(function (response) {
          console.log(response);
          let imageArray = [];
          if (response.status === 200) {
            response.data.fileDetails.map(arr => {
              imageArray.push({
                materialLoc: arr.location,
                sectionID: localStorage.getItem("sectionID"),
                materialName: arr.originalname,
                materialType: arr.mimetype,
                creationDate: moment().format("YYYY/MM/DD HH:mm"),
                modifiedDate: moment().format("YYYY/MM/DD HH:mm"),
                courseID: props.history.location.state.course.CourseID,
                materialTitle: payload.videotitle,
                materialDescription: payload.videodescription
              });
              return 0;
            });
            payload = [];
            payload.push(...imageArray);
            delete payload.files;
            console.log(payload);

            props.actionAddVideo(payload);
          }
        })
        .catch(function () {
          console.log("Bad Response");
        });
    } else if (payload.videourl) {
      console.log(payload);
      // let oldPayload = [];
      // oldPayload.push([...payload]);
      // payload = [];
      let arr = [];
      arr.push({
        destination: "public/files",
        encoding: "7bit",
        fieldname: "files",
        filename: payload.videotitle,
        mimetype: "video/embed",
        originalname: payload.videotitle,
        path: payload.videourl,
        size: 26246026
      });
      console.log(arr);

      let imageArray = [];
      imageArray.push({
        materialLoc: arr[0].path,
        sectionID: parseInt(localStorage.getItem("sectionID")),
        materialName: arr[0].originalname,
        materialType: arr[0].mimetype,
        creationDate: moment().format("YYYY/MM/DD HH:mm"),
        modifiedDate: moment().format("YYYY/MM/DD HH:mm"),
        courseID: props.history.location.state.course.CourseID,
        materialTitle: payload.videotitle,
        materialDescription: payload.videodescription
      });
      payload = [];
      payload.push(...imageArray);
      delete payload.files;
      console.log(payload);

      // payload["courseID"] = props.courseDetail.CourseID;
      // payload["sectionID"] = localStorage.getItem("sectionID"); //  props.courseDetail.CourseID;
      // payload["creationDate"] = moment().format("YYYY/MM/DD HH:mm");
      // payload["modifiedDate"] = null; //    moment().format("YYYY/MM/DD HH:mm");
      // //payload["materialName"] =  payload.videotitle;
      // payload["materialTitle"] = payload.videotitle;//"Section Video";
      // payload["materialType"] = "video/embed" ;
      // payload["materialDescription"] = payload.videodescription;
      // let data = [];
      // data.push(payload.videourl);
      // payload["materialLoc"] = data;
      // data = [];
      // data.push(payload.videotitle);
      // //payload["materialName"] =  data;
      // payload["originalname"] = data;
      console.log(payload);
      delete payload.videourl;
      delete payload.files;
      delete payload.videodescription;
      delete payload.videotitle;

      console.log(payload);

      props.actionAddVideo(payload);
    } else {
    }
  },
  displayName: "AddVideos"
})(AddVideos);

const AddVideosForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

export default withRouter(withStyles(combinedStyles)(AddVideosForm));
// export default withStyles(combinedStyles)(
//     connect(mapStateToProps, {actionGetCourseList, actionDeleteCourse}) (CourseList)
// )
