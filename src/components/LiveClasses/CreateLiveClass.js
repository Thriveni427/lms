import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import combinedStyles from '../../material-ui';
import { actionCreateLiveClass } from '../../actions/actionCreateLiveClass';
import { actionGetCategory } from '../../actions/actionGetCategory';
import 'date-fns';
import * as GLOBAL from './../../utils/index';

import axios from 'axios';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import { EditorState } from 'draft-js';
import DropzoneComponent from 'react-dropzone-component';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css'
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
import { ToastContainer } from 'react-toastify';



export class CreateLiveClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labelWidth: 0,
      startdate: new Date(),
      enddate: new Date(),
      editorState: EditorState.createEmpty(),
    };
    this.djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: "image/*,application/pdf,.mov,.mp4,.mp3,.ppt,.pptx,.doc,.docx,.xls",
      autoProcessQueue: false
    }
    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png'],
      showFiletypeIcon: true,
      postUrl: '/FileUploadHandler.ashx'
    }
    this.dropzone = null;
  }
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
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.setValues({
      ...this.props.values,
      editorState
    });
  };

  handleStatus = name => event => {
    this.setState({ [name]: event.target.checked });
    this.props.setValues({ ...this.props.values, [name]: event.target.checked });
  };

  handleFileAdded(files) {
    // this.props.values.iuploadname = files.name;
    // this.props.values.ioriginalname = files.name;
    //let GalleryFileName = files.name.split(".");
    this.props.values.ioriginalname.push({
      "name": files.name
    })
    this.props.values.galleryData.push(files);
  };

  componentDidMount = () => {
    console.log("Inside componentDidMount doing actionGetCategory");
    this.props.actionGetCategory();
  }



  render() {
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;
    const eventHandlers = {
      init: dz => this.dropzone = dz,
      addedfile: this.handleFileAdded.bind(this)
    }
    const {
      values,
      touched,
      errors,
      handleChange,
      handleSubmit,
      classes,
      history,
      createLiveClassReducer,
      getCategoryReducer
    } = this.props;

    if (createLiveClassReducer.createdLiveClass === true) {
      setTimeout(function () {
        history.push({
          pathname: '/liveclasses',
        });
        createLiveClassReducer.createdLiveClass = false;
      },
        2100);
    }
    console.log(this.props);
    console.log(this.state);

    let parentCategory = getCategoryReducer.getCategoryData.filter(function (
      element
    ) {
      return element.ParentID === null;
    });
    let childCategories = getCategoryReducer.getCategoryData.filter(function (
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
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Create Live Class</h6>
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
                  <h3 className="margin-0 padding-0">Create Live Class</h3>
                </div>
                <div className="content">
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="col-md-12">
                      <div className="row">

                        <div className="col-md-6">
                          <FormControl fullWidth>
                            <TextField
                              required
                              error={errors.className && touched.className ? true : false}
                              id="className"
                              label="Class Name"
                              placeholder="Class Name"
                              margin="normal"
                              onChange={handleChange}
                              value={values.className}
                              InputProps={{ classes: { input: classes.textField } }}
                            />
                            {errors.className &&
                              touched.className && (
                                <div className="errorMsg">
                                  {errors.className}
                                </div>
                              )}
                          </FormControl>
                        </div>
                        <div className="col-md-6 mt-2">
                          <TextField
                            fullWidth
                            required
                            id="courseObjective"
                            error={errors.courseObjective && touched.courseObjective ? true : false}
                            label="Course Objective"
                            placeholder="Write the course objective"
                            onChange={handleChange}
                            value={values.courseObjective}
                            multiline
                            InputProps={{ classes: { input: classes.textField } }}
                            margin="normal"
                          />
                          {errors.courseObjective &&
                            touched.courseObjective && (
                              <div className="errorMsg">
                                {errors.courseObjective}
                              </div>
                            )}
                        </div>
                        <div className="col-md-6">
                          <FormControl className={classes.formControl} error={errors.categoryID && touched.categoryID ? true : false}>
                            <InputLabel htmlFor="categoryID">Select category *</InputLabel>
                            <Select
                              fullWidth
                              required
                              value={values.categoryID}
                              onChange={this.handleCategoryChange}
                              inputProps={{
                                name: 'categoryID',
                                id: 'categoryID',
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
                            {errors.category &&
                              touched.category && (
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
                        <div className="col-md-12 mt-3">
                          <h4 className="mt-3"> Live Class Details</h4>
                        </div>
                        <div className="col-md-3">
                          <TextField
                            fullWidth
                            required
                            error={errors.availableSeats && touched.availableSeats ? true : false}
                            id="availableSeats"
                            label="Available Seats"
                            margin="normal"
                            onChange={handleChange}
                            value={values.availableSeats}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.availableSeats &&
                            touched.availableSeats && (
                              <div className="errorMsg">
                                {errors.availableSeats}
                              </div>
                            )}
                        </div>
                        <div className="col-md-3">
                          <TextField
                            required
                            fullWidth
                            id="allocatedSeats"
                            error={errors.allocatedSeats && touched.allocatedSeats ? true : false}
                            label="Allocated Seats"
                            margin="normal"
                            value={values.allocatedSeats}
                            onChange={handleChange}
                            // className={classes.textField}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.allocatedSeats &&
                            touched.allocatedSeats && (
                              <div className="errorMsg">
                                {errors.allocatedSeats}
                              </div>
                            )}
                        </div>
                        <div className="col-md-3 mt-2">
                          <FormControl className={classes.formControl}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                              <DateTimePicker
                                fullWidth
                                autoOk
                                name="startdate"
                                ampm={false}
                                label="Class Start date & time"
                                disablePast
                                value={values.startdate}
                                onChange={this.handleStartDateChange}
                              />
                            </MuiPickersUtilsProvider>
                          </FormControl>
                        </div>
                        <div className="col-md-3">
                          <TextField
                            required
                            fullWidth
                            error={errors.duration && touched.duration ? true : false}
                            id="duration"
                            label="Course duration in Hrs/Day/Month"
                            margin="normal"
                            onChange={handleChange}
                            value={values.duration}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.duration &&
                            touched.duration && (
                              <div className="errorMsg">
                                {errors.duration}
                              </div>
                            )}
                        </div>
                        <div className="col-md-3">
                          <FormControl className={classes.formControl} error={errors.category && touched.category ? true : false}>
                            <InputLabel htmlFor="occurance">Occurance *</InputLabel>
                            <Select
                              error={errors.occurance && touched.occurance ? true : false}
                              fullWidth
                              required
                              value={values.occurance}
                              onChange={this.handleCategoryChange}
                              inputProps={{
                                name: 'occurance',
                                id: 'occurance',
                                classes: { select: classes.textField }
                              }}
                            >
                              <MenuItem value={"Daily"}>Daily</MenuItem>
                              <MenuItem value={"Weekly"}>Weekly</MenuItem>
                              <MenuItem value={"Monthly"}>Monthly</MenuItem>
                              <MenuItem value={"Quaterly"}>Quaterly</MenuItem>
                            </Select>
                            {errors.occurance &&
                              touched.occurance && (
                                <div className="errorMsg">
                                  {errors.occurance}
                                </div>
                              )}
                          </FormControl>
                        </div>
                        <div className="col-md-3 mt-2">
                          <TextField
                            multiline
                            fullWidth
                            required
                            error={errors.software && touched.software ? true : false}
                            id="software"
                            label="Software Requirements"
                            margin="normal"
                            onChange={handleChange}
                            value={values.software}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.software &&
                            touched.software && (
                              <div className="errorMsg">
                                {errors.software}
                              </div>
                            )}
                        </div>
                        <div className="col-md-3 mt-2">
                          <TextField
                            fullWidth
                            multiline
                            required
                            error={errors.hardware && touched.hardware ? true : false}
                            id="hardware"
                            label="Hardware Requirements"
                            margin="normal"
                            onChange={handleChange}
                            value={values.hardware}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.hardware &&
                            touched.hardware && (
                              <div className="errorMsg">
                                {errors.hardware}
                              </div>
                            )}
                        </div>
                        <div className="col-md-3">
                          <FormControl className={classes.formControl} error={errors.category && touched.category ? true : false}>
                            <InputLabel htmlFor="medium">Class Medium *</InputLabel>
                            <Select
                              error={errors.medium && touched.medium ? true : false}
                              fullWidth
                              required
                              value={values.medium}
                              onChange={this.handleCategoryChange}
                              inputProps={{
                                name: 'medium',
                                id: 'medium',
                                classes: { select: classes.textField }
                              }}
                            >
                              <MenuItem value={"Online(Google Hangouts)"}>Online(Google Hangouts)</MenuItem>
                              <MenuItem value={"Online(Zoom Meeting)"}>Online(Zoom Meeting)</MenuItem>
                              <MenuItem value={"Online(AnyMeeting)"}>Online(AnyMeeting)</MenuItem>
                              <MenuItem value={"Online(ezTalks)"}>Online(ezTalks)</MenuItem>
                              <MenuItem value={"Online(WebEx)"}>Online(WebEx)</MenuItem>
                              <MenuItem value={"Online(Video)"}>Online(Video)</MenuItem>
                              <MenuItem value={"ClassRoom"}>ClassRoom</MenuItem>
                              <MenuItem value={"Self-Paced"}>Self-Paced</MenuItem>
                            </Select>
                            {errors.medium &&
                              touched.medium && (
                                <div className="errorMsg">
                                  {errors.medium}
                                </div>
                              )}
                          </FormControl>
                        </div>
                        <div className="col-md-3">
                          <FormControl className={classes.formControl} error={errors.category && touched.category ? true : false}>
                            <InputLabel htmlFor="difficultyLevel">Difficulty Level *</InputLabel>
                            <Select
                              error={errors.difficultyLevel && touched.difficultyLevel ? true : false}
                              fullWidth
                              required
                              value={values.difficultyLevel}
                              onChange={this.handleCategoryChange}
                              inputProps={{
                                name: 'difficultyLevel',
                                id: 'difficultyLevel',
                                classes: { select: classes.textField }
                              }}
                            >
                              <MenuItem value={"Easy"}>Easy</MenuItem>
                              <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                              <MenuItem value={"Beginner"}>Beginner</MenuItem>
                              <MenuItem value={"Expert"}>Expert</MenuItem>
                            </Select>
                            {errors.difficultyLevel &&
                              touched.difficultyLevel && (
                                <div className="errorMsg">
                                  {errors.difficultyLevel}
                                </div>
                              )}
                          </FormControl>
                        </div>
                        <div className="col-md-3">
                          <TextField
                            fullWidth
                            required
                            error={errors.classurl && touched.classurl ? true : false}
                            id="classurl"
                            label="Class Medium ID/URL"
                            margin="normal"
                            onChange={handleChange}
                            value={values.classurl}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.classurl &&
                            touched.classurl && (
                              <div className="errorMsg">
                                {errors.classurl}
                              </div>
                            )}
                        </div>
                        <div className="c-formSection__grid--full mt-4 ml-3 mr-3">
                          <InputLabel className="mt-1" htmlFor="ioriginalname">Live Class image (Maximum size for new files: 256MB, maximum attachments: 1)</InputLabel>
                          <DropzoneComponent
                            config={config}
                            eventHandlers={eventHandlers}
                            djsConfig={djsConfig}
                          >
                            <div className="dz-message">Min image dimension 1024 x 1024 px</div>
                          </DropzoneComponent>
                          {errors.ioriginalname &&
                            touched.ioriginalname && (
                              <div className="errorMsg">
                                {errors.ioriginalname}
                              </div>
                            )}
                        </div>
                        <div className="col-md-12 pt-5 pb-5">
                          {/* <Link to="/liveclasses"> */}
                          <Button
                            variant="contained"
                            className={[classes.button, classes.buttonPrimary]}
                            type="submit"
                          >
                            Create Live Class
                      </Button>
                          {/* </Link>        */}
                          <Button variant="contained" className={[classes.button, classes.buttonSecondary]}
                            onClick={this.props.history.goBack}
                          >
                            Cancel
                  </Button>
                        </div>
                      </div>

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
  return bindActionCreators({ actionGetCategory, actionCreateLiveClass }, dispatch)
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // className: Yup.string().required('Please enter class name'),
    // category: Yup.string().required('Please select course category'),
    // courseType: Yup.string().required('Please enter course type'),
    // courseStatus: Yup.string().required('Please select course status'),
    // duration: Yup.number().required('Please enter course duration'),
    // editorState: Yup.string().required('Please enter course summary'),
    // subCategory: Yup.string().required('Please select course sub category'),
    // courseLevel: Yup.string().required('Please select course level'),
    // courseimage: Yup.string().required('Please upload course image'),
    //startdate: Yup.string().required('Please enter course start date')
  }),
  mapPropsToValues: () => ({
    className: '',
    courseObjective: '',
    availableSeats: '',
    allocatedSeats: '',
    startdate: new Date(),
    duration: '',
    occurance: '',
    software: '',
    hardware: '',
    medium: '',
    difficultyLevel: '',
    // createdDate: '',
    categoryID: '',
    subCategory:'',
    galleryData: [],
    ioriginalname: [],
    classurl:'',
  }),
  handleSubmit: (payload, { props }) => {
    payload["createdDate"] = moment().format("YYYY/MM/DD HH:mm");
    // payload["createdBy"] = localStorage.getItem("VendorID")
    console.log(payload);

    let galleryFD = new FormData();
    let galleryFiles = payload.galleryData;
    if (galleryFiles !== undefined) {
      for (var i = 0; i < galleryFiles.length; i++) {
        galleryFD.append("files", galleryFiles[i]);
      }
    }
    axios.post(GLOBAL.API_HOST + `/uploadLiveClassImage`, galleryFD)
      .then(function (response) {
        console.log(response)
        let imageArray = [];
        let imageArray2 = [];
        if (response.status === 200) {
          response.data.fileDetails.map((arr) => {
            console.log(arr);

            imageArray.push({
              "location": arr.location
            })
            imageArray2.push({
              "name": arr.originalname
            })
            return 0;
          })
          payload["iuploadname"] = imageArray;
          payload["ioriginalname"] = imageArray2;
          delete payload['galleryData'];
          console.log(payload);
          props.actionCreateLiveClass(payload)
        }
      }).catch(function () {
        console.log("Bad Response");
      });

  },
  displayName: 'CreateLiveClass',
})(CreateLiveClass);
const CreateLiveClassForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(CreateLiveClassForm)))
