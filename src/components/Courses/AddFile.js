import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';


import * as GLOBAL from './../../utils/index';
import combinedStyles from '../../material-ui'
import MediaUpload from '../ContentLibrary/MediaUpload';
import { handleHideFile } from '../../actions/actionSetupCourse';
import { actionAddFile } from '../../actions/actionAddFile';


export class AddFile extends Component {
  constructor(props){
    super(props)
    this.state ={
      value: '',
      completed: 0
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleHide = () => {
    console.log("inside handleHide()");
    this.props.handleHideFile();
  }

  handleFiles = files => {
    console.log(files);
    this.props.setValues({
      ...this.props.values,
      files: files
      // videotitle: this.props.values.videotitle,
      // videodescription: this.props.values.videodescription
    });
    console.log(this.props);

    this.props.handleVideoData(
      this.props.values.files,
      this.props.values.videotitle,
      this.props.values.videodescription
    );
  };

//   handleAddContent = () => {
//     this.setState({ showAddContent: !this.state.showAddContent }, () => {
//       this.props.handleAddContent(this.state.showAddContent);
//     });
//   }

  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleSubmit,
      classes
    } = this.props;
    return (
      <div className="createFolder col mb-4 mb-4">
        {/* <Card className="createFolder__card">
          <CardContent className="createFolder__content"> */}
            <Typography component="h6" variant="h6" className="createFolder__title">
              Upload File
            </Typography>
              {/* <Paper className="createFolder__paper player-uploader"> */}
              <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className="video-source">
                <div className="row mt-5">
                  <div className="col-md-8">
                    <MediaUpload
                      completed={this.state.completed}
                      handleFiles={this.handleFiles}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8">
                    <FormControl fullWidth>
                      <TextField
                        required
                        error={errors.videotitle && touched.videotitle ? true : false}
                        id="videotitle"
                        label="Title"
                        margin="normal"
                        onChange={handleChange}
                        value={values.videotitle}
                        InputProps={{ classes: { input: classes.textField } }}
                      />
                      {errors.videotitle &&
                        touched.videotitle && (
                          <div className="errorMsg">
                            {errors.videotitle}
                          </div>
                        )}
                    </FormControl>
                  </div>
                </div>
                <div className="row mt-3 mb-5">
                  <div className="col-md-8">
                    <FormControl fullWidth>
                      <TextField
                        required
                        multiline
                        error={errors.firstname && touched.videodescription ? true : false}
                        id="videodescription"
                        label="Description"
                        margin="normal"
                        onChange={handleChange}
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
              //onClick={() => {this.fetchMaterial()}}
              className={[classes.button, classes.buttonSecondary]}
            >
              CANCEL
            </Button> */}
            </form>
            {/* </Paper>
          </CardContent>
        </Card> */}
      </div>
    )
  }
}

const mapStateToProps = () => {}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({actionAddFile, handleHideFile}, dispatch)
  }

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
  }),
  mapPropsToValues: () => ({
    files: [],
    videotitle: '',
  }),
  handleSubmit: (payload, { props }) => {
    console.log(payload);

    let galleryFD = new FormData();
    let galleryFiles = payload.files;
    galleryFD.append("files", galleryFiles);
    console.log(GLOBAL.API_HOST+`/uploadFile`);

    axios.post(GLOBAL.API_HOST+`/uploadFile`, galleryFD)
    .then(function (response) {
      console.log(response)
      let imageArray = [];
      if(response.status === 200){
        response.data.fileDetails.map((arr)=>{
          imageArray.push({
            "materialLoc": arr.location,
            "sectionID": localStorage.getItem("sectionID"),
            "materialName":arr.originalname,
            "materialType":arr.mimetype,
            "creationDate": moment().format("YYYY/MM/DD HH:mm"),
            "modifiedDate": moment().format("YYYY/MM/DD HH:mm"),
            "courseID":props.history.location.state.course.CourseID,
            "materialTitle":payload.videotitle,
            "MaterialDescription":payload.videodescription
          })
          return 0;
        })
        payload = [];
        payload.push(...imageArray);
        //delete payload['galleryData'];
        console.log(payload);
        props.actionAddFile(payload);
      }
    }).catch(function () {
      console.log("Bad Response");
    });
  },
  displayName: 'AddFile',
})(AddFile);

const AddFileForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(AddFileForm)))
