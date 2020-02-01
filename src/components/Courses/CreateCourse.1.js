import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import combinedStyles from '../../material-ui';
import { actionCreateCourse } from '../../actions/actionCreateCourse';
import { actionGetCategory } from '../../actions/actionGetCategory';
import 'date-fns';
import * as GLOBAL from './../../utils/index';

import axios from 'axios';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import DropzoneComponent from 'react-dropzone-component';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css'
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
import { ToastContainer } from 'react-toastify';



export class CreateCourse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labelWidth: 0,
            startdate: new Date(),
            enddate: new Date(),
            courseSummary: EditorState.createEmpty(),
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

    componentDidMount = () => {
        this.props.actionGetCategory();
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
    onEditorStateChange = (courseSummary) => {
        this.setState({
            courseSummary,
        });
        this.props.setValues({
            ...this.props.values,
            courseSummary
        });
    };

    handleStatus = name => event => {
        this.setState({ [name]: event.target.checked });
        this.props.setValues({ ...this.props.values, [name]: event.target.checked });
    };

    handleFileAdded(files) {
        this.props.values.ioriginalname.push({
            "name": files.name
        })
        this.props.values.galleryData.push(files);
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
            getCategoryReducer,
            createCourseReducer,
        } = this.props;

        if (createCourseReducer.createdCourse === true) {

            setTimeout(function () { history.push({ pathname: '/courses', }); createCourseReducer.createdCourse = false; }, 2100);
        }

        console.log(this.props);
        console.log(this.state);
        return (
            <React.Fragment>
                <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
                    <ToastContainer
                        autoClose={2000}
                    />
                    <div className="container-fluid">
                        <div className="header-body">
                            <div className="row align-items-center py-4">
                                <div className="col-lg-6 col-6">
                                    <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Create Course</h6>
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
                                    <h3 className="margin-0 padding-0">Create Course</h3>
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
                                                        InputProps={{ classes: { input: classes.textField } }}
                                                    />
                                                    {errors.name &&
                                                        touched.name && (
                                                            <div className="errorMsg">
                                                                {errors.name}
                                                            </div>
                                                        )}
                                                </FormControl>
                                            </div>
                                            <div className="c-formSection__grid">
                                                <FormControl className={classes.formControl} error={errors.courseType && touched.courseType ? true : false}>
                                                    <InputLabel htmlFor="courseType">Course Type *</InputLabel>
                                                    <Select
                                                        fullWidth
                                                        required
                                                        error={errors.courseType && touched.courseType ? true : false}
                                                        value={values.courseType}
                                                        onChange={this.handleCategoryChange}
                                                        inputProps={{
                                                            name: 'courseType',
                                                            id: 'courseType',
                                                            classes: { select: classes.textField }
                                                        }}
                                                    >
                                                        <MenuItem value={"Online"}>Online</MenuItem>
                                                        <MenuItem value={"Fulltime"}>Fulltime</MenuItem>
                                                        <MenuItem value={"Other"}>Other</MenuItem>
                                                    </Select>
                                                    {errors.courseType &&
                                                        touched.courseType && (
                                                            <div className="errorMsg">
                                                                {errors.courseType}
                                                            </div>
                                                        )}
                                                </FormControl>
                                            </div>
                                            <div className="c-formSection__grid">
                                                <TextField
                                                    fullWidth
                                                    required
                                                    error={errors.duration && touched.duration ? true : false}
                                                    id="duration"
                                                    label="Course duration in days eg. 90"
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
                                            <div className="c-formSection__grid">
                                                <FormControl className={classes.formControl} error={errors.category && touched.category ? true : false}>
                                                    <InputLabel htmlFor="category">Select category *</InputLabel>
                                                    <Select
                                                        error={errors.category && touched.category ? true : false}
                                                        fullWidth
                                                        required
                                                        value={values.category}
                                                        onChange={this.handleCategoryChange}
                                                        inputProps={{
                                                            name: 'category',
                                                            id: 'category',
                                                            classes: { select: classes.textField }
                                                        }}
                                                    >
                                                        {
                                                            getCategoryReducer.getCategoryData.map((arr) => {
                                                                return (
                                                                    <MenuItem value={arr.CategoryID}>{arr.CategoryName}</MenuItem>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                    {errors.category &&
                                                        touched.category && (
                                                            <div className="errorMsg">
                                                                {errors.category}
                                                            </div>
                                                        )}
                                                </FormControl>
                                            </div>
                                            <div className="c-formSection__grid">
                                                <FormControl className={classes.formControl} error={errors.subCategory && touched.subCategory ? true : false}>
                                                    <InputLabel htmlFor="subCategory">Select sub category *</InputLabel>
                                                    <Select
                                                        fullWidth
                                                        required
                                                        error={errors.subCategory && touched.subCategory ? true : false}
                                                        value={values.subCategory}
                                                        onChange={this.handleCategoryChange}
                                                        inputProps={{
                                                            name: 'subCategory',
                                                            id: 'subCategory',
                                                            classes: { select: classes.textField }
                                                        }}
                                                    >
                                                        {
                                                            getCategoryReducer.getCategoryData.map((arr) => {
                                                                return (
                                                                    <MenuItem value={arr.CategoryID}>{arr.CategoryName}</MenuItem>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                    {errors.subCategory &&
                                                        touched.subCategory && (
                                                            <div className="errorMsg">
                                                                {errors.subCategory}
                                                            </div>
                                                        )}
                                                </FormControl>
                                            </div>
                                            <div className="c-formSection__grid">
                                                <FormControl className={classes.formControl}>
                                                    <FormGroup row>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    color="primary"
                                                                    checked={this.state.courseStatus}
                                                                    onChange={this.handleStatus('courseStatus')}
                                                                    value="courseStatus"
                                                                />
                                                            }
                                                            label="Course Status"
                                                        />
                                                    </FormGroup>
                                                </FormControl>
                                            </div>

                                            <div className="c-formSection__grid">
                                                <FormControl className={classes.formControl}>
                                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                                        <DateTimePicker
                                                            fullWidth
                                                            autoOk
                                                            name="startdate"
                                                            ampm={false}
                                                            label="Course Start date & time"
                                                            disablePast
                                                            value={values.startdate}
                                                            onChange={this.handleStartDateChange}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </FormControl>
                                            </div>
                                            <div className="c-formSection__grid">
                                                <FormControl className={classes.formControl}>
                                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                                        <DateTimePicker
                                                            fullWidth
                                                            autoOk
                                                            name="enddate"
                                                            ampm={false}
                                                            label="Course End date & time"
                                                            disablePast
                                                            value={values.enddate}
                                                            onChange={this.handleEndDateChange}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </FormControl>
                                            </div>
                                            <div className="c-formSection__grid">
                                                <FormControl className={classes.formControl} error={errors.courseLevel && touched.courseLevel ? true : false}>
                                                    <InputLabel htmlFor="courseLevel">Select Level *</InputLabel>
                                                    <Select
                                                        fullWidth
                                                        required
                                                        value={values.courseLevel}
                                                        onChange={this.handleCategoryChange}
                                                        inputProps={{
                                                            name: 'courseLevel',
                                                            id: 'courseLevel',
                                                            classes: { select: classes.textField }
                                                        }}
                                                    >
                                                        <MenuItem value={"Beginner"}>Beginner</MenuItem>
                                                        <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
                                                        <MenuItem value={"Advance"}>Advance</MenuItem>
                                                    </Select>
                                                    {errors.courseLevel &&
                                                        touched.courseLevel && (
                                                            <div className="errorMsg">
                                                                {errors.courseLevel}
                                                            </div>
                                                        )}
                                                </FormControl>
                                            </div>
                                            <div className="c-formSection__grid--full mt-5">
                                                <FormControl className={classes.formControl} error={errors.coursesummary && touched.coursesummary ? true : false}>
                                                {/* <InputLabel htmlFor="courseSummary">Course summary</InputLabel>
                                                <Editor
                                                    name="courseSummary"
                                                    courseSummary={this.state.courseSummary}
                                                    toolbarClassName="toolbarClassName"
                                                    wrapperClassName="wrapperClassName"
                                                    editorClassName="editorClassName"
                                                    onEditorStateChange={this.onEditorStateChange}
                                                />
                                                {errors.courseSummary &&
                                                    touched.courseSummary && (
                                                        <div className="errorMsg">
                                                            {errors.courseSummary}
                                                        </div>
                                                    )} */}
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
                                                            InputProps={{ classes: { input: classes.textField } }}
                                                            />
                                                            {errors.courseSummary &&
                                                                touched.courseSummary && (
                                                                <div className="errorMsg">
                                                                    {errors.courseSummary}
                                                                </div>
                                                            )}
                                                </FormControl>
                                            </div>
                                            <div className="c-formSection__grid--full mt-4">
                                                <InputLabel htmlFor="ioriginalname">Course image (Maximum size for new files: 256MB, maximum attachments: 1)</InputLabel>
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
                                        </div>
                                        <div className="c-formSection pt-4 pb-4">

                                            <Button
                                                variant="contained"
                                                className={[classes.button, classes.buttonPrimary]}
                                                type="submit"
                                            >
                                                Create Course
                                            </Button>

                                            <Link to="/courses"><Button variant="contained" className={[classes.button, classes.buttonSecondary]}>
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
    return bindActionCreators({ actionGetCategory, actionCreateCourse }, dispatch)
}

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        // name: Yup.string().required('Please enter course name'),
        // courseType: Yup.string().required('Please enter course type'),
        // // courseStatus: Yup.string().required('Please select course status'),
        // duration: Yup.number().required('Please enter course duration'),
        // courseSummary: Yup.string().required('Please enter course summary'),
        // subCategory: Yup.string().required('Please select course sub category'),
        // courseLevel: Yup.string().required('Please select course level'),
        // category: Yup.string().required('Please select course category'),
        // ioriginalname: Yup.string().required('Please upload course image'),
        //startdate: Yup.string().required('Please enter course start date')
    }),
    mapPropsToValues: () => ({
        name: '',
        courseType: '',
        courseStatus: true,
        duration: '',
        startdate: new Date(),
        enddate: new Date(),
        subCategory: '',
        category: '',
        createdDate: '',
        courseLevel: '',
        courseSummary: "",
        galleryData: [],
        ioriginalname: []
    }),
    handleSubmit: (payload, { props }) => {
        let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
        if (userinfo === null) userinfo = [];
        console.log(userinfo);
        //payload["courseSummary"] = draftToHtml(convertToRaw(payload.courseSummary.getCurrentContent()));
        payload["createdDate"] = moment().format("YYYY/MM/DD HH:mm");
        payload["createdBy"] = ((userinfo.userType === "admin") ? userinfo.AdminID : (userinfo.userType === "vendor") ? userinfo.VendorID : userinfo.UserID);
        //payload["courseStatus"] = "Active";
        payload["RoleID"] = ((userinfo.userType === "admin") ? 1 : (userinfo.userType === "vendor") ? 4 : 2);
        delete payload[""]
        console.log(payload);
        // let date1 = payload["startdate"];
        // payload["startdate"] = moment(date1).format("YYYY/MM/DD HH:mm");

        let galleryFD = new FormData();
        let galleryFiles = payload.galleryData;
        if (galleryFiles !== undefined) {
            for (var i = 0; i < galleryFiles.length; i++) {
                galleryFD.append("files", galleryFiles[i]);
            }
        }
        axios.post(GLOBAL.API_HOST + `/uploadCourseImage`, galleryFD)
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
                    props.actionCreateCourse(payload)
                }
            }).catch(function () {
                console.log("Bad Response");
            });
    },
    displayName: 'CreateCourse',
})(CreateCourse);
const CreateCourseForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(CreateCourseForm)))