import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Link, withRouter } from 'react-router-dom'
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
import 'date-fns';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css'
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
import { ToastContainer } from 'react-toastify';


import { actionGetCategory } from '../../actions/actionGetCategory';
import { actionEditCourse } from '../../actions/actionEditCourse';


export class ViewCourse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labelWidth: 0,
            startdate: null,
            enddate: null,
            courseStatus: true,
            gotImg: false,
            //courseSummary: EditorState.createEmpty(),
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

    // onEditorStateChange = (courseSummary) => {
    //     this.props.setValues({
    //         ...this.props.values,
    //         courseSummary
    //     });
    // };

    handleStatus = name => event => {
        this.setState({ [name]: event.target.checked });
        this.props.setValues({ ...this.props.values, 
            [name]: event.target.checked 
        });

    };
    

    handleFileAdded(files) {
        console.log(this.props.values);
        this.setState ({
            gotImg: true,
        })
        this.props.values.ioriginalname.push({
            "name": files.name
        })
        this.props.values.galleryData.push(files);
        this.props.setValues({ ...this.props.values, gotImage: true });
    }

    componentDidMount = () => {
        this.props.actionGetCategory();
    }

    render() {
        const {
            values,
            touched,
            errors,
            handleChange,
            //handleBlur,
            handleSubmit,
            classes,
            editCourseReducer,
            getCategoryReducer,
            history
        } = this.props;

        if (editCourseReducer.editedCourse === true) {
            setTimeout(
                function () {
                    history.push({ pathname: '/courses', });
                    editCourseReducer.editedCourse = false
                }, 2100);
        }

        console.log(this.props.getCategoryReducer.getCategoryData);
        console.log(this.state);
        return (
            <React.Fragment>

                <div className="container-fluid1">
                    <ToastContainer autoClose={2000} />
                    <div className="row">
                        <div className="col">
                            <div className="c-formSection__grid--full">
                                <div className="content">
                                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <div className="c-formSection">
                                            <div className="c-formSection__grid">
                                                <FormControl fullWidth>
                                                    <TextField
                                                    disabled
                                                        required
                                                        error={errors.Name && touched.Name ? true : false}
                                                        id="Name"
                                                        label="Course Name"
                                                        margin="normal"
                                                        onChange={handleChange}
                                                        value={values.Name}
                                                        InputProps={{ classes: { input: classes.textField } }}
                                                    />
                                                    {errors.Name &&
                                                        touched.Name && (
                                                            <div className="errorMsg">
                                                                {errors.Name}
                                                            </div>
                                                        )}
                                                </FormControl>
                                            </div>
                                            <div className="c-formSection__grid">
                                                <FormControl className={classes.formControl}
                                                    // error={
                                                    //     errors.courseType && touched.courseType
                                                    //         ? true
                                                    //         : false
                                                    // }
                                                >
                                                    <InputLabel htmlFor="courseType">Course Type *</InputLabel>
                                                    <Select
                                                    disabled
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
                                                        {/* <MenuItem value={"Online"}>Online</MenuItem>
                                                        <MenuItem value={"Fulltime"}>Fulltime</MenuItem>
                                                        <MenuItem value={"Other"}>Other</MenuItem> */}
                                                        <MenuItem value={"General"}>General</MenuItem>
                                                        <MenuItem value={"Third Party"}>Third Party</MenuItem>
                                                        <MenuItem value={"Free"}>Free</MenuItem>
                                                    </Select>
                                                    {errors.courseType &&
                                                        touched.courseType && (
                                                            <div className="errorMsg">
                                                                {errors.courseType}
                                                            </div>
                                                        )}
                                                </FormControl>
                                            </div>
                                            {/* <div className="c-formSection__grid">
                                                <TextField
                                                    fullWidth
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
                                            </div> */}
                                            <div className="c-formSection__grid">
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel htmlFor="category">Select category *</InputLabel>
                                                    <Select
                                                    disabled
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
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel htmlFor="subCategory">Select sub category</InputLabel>
                                                    <Select
                                                    disabled
                                                        fullWidth
                                                        required
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
                                                </FormControl>
                                            </div>
                                            <div className="c-formSection__grid">
                                                <FormControl className={classes.formControl}>
                                                    <FormGroup row>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    color="primary"
                                                                    checked={values.courseStatus}
                                                                    onChange={this.handleStatus('courseStatus')}
                                                                    value={values.courseStatus}
                                                                />
                                                                
                                                            }
                                                            label="Course Status"
                                                        />
                                                        {
                                                            console.log(values.courseStatus)
                                                                                                                      
                                                        }
                                                    </FormGroup>
                                                </FormControl>
                                            </div>

                                            <div className="c-formSection__grid">
                                                <FormControl className={classes.formControl}>
                                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                                        <DateTimePicker
                                                        disabled
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
                                                        disabled
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
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel htmlFor="courseLevel">Select Level</InputLabel>
                                                    <Select
                                                    disabled
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
                                                        <MenuItem value={"Advance"}>Advanced</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="c-formSection__grid">
                                                <FormControl fullWidth>
                                                    <TextField
                                                        disabled
                                                        error={errors.vendorname && touched.vendorname ? true : false}
                                                        id="vendorname"
                                                        label="Vendor Name"
                                                        margin="normal"
                                                        onChange={handleChange}
                                                        value={values.vendorname}
                                                        InputProps={{ classes: { input: classes.textField } }}
                                                    />
                                                    {errors.vendorname &&
                                                        touched.vendorname && (
                                                            <div classvendorname="errorMsg">
                                                                {errors.vendorname}
                                                            </div>
                                                        )}
                                                </FormControl>
                                            </div>

                                            <div className="c-formSection__grid--full mt-5">
                                                {/* <InputLabel htmlFor="courseSummary">Course summary</InputLabel>
                                                <Editor
                                                    name="courseSummary"
                                                    // courseSummary={this.state.courseSummary}
                                                    editorState={values.courseSummary}
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
                                                disabled
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
                                            </div>
                                            {/* <div className="c-formSection__grid--full mt-4">
                                                <InputLabel htmlFor="ioriginalname">Live Class image (Maximum size for new files: 256MB, maximum attachments: 1)</InputLabel>
                                                <DropzoneComponent
                                                    config={config}
                                                    eventHandlers={eventHandlers}
                                                    djsConfig={djsConfig}
                                                >
                                                    {                                                       
                                                        !gotImg 
                                                        &&
                                                        <img src={history.location.state.course.iuploadname} alt="" />
                                                    }
                                                    {
                                                        console.log(history.location.state.course.iuploadname)
                                                    }
                                                    <div className="dz-message">Min image dimension 1024 x 1024 px</div>
                                                </DropzoneComponent>
                                                {errors.ioriginalname &&
                                                    touched.ioriginalname && (
                                                        <div className="errorMsg">
                                                            {errors.ioriginalname}
                                                        </div>
                                                    )}
                                            </div> */}
                                        </div>
                                        <div className="c-formSection pt-4 pb-4">
                                            <Button
                                                variant="contained"
                                                className={[classes.button, classes.buttonPrimary]}
                                                type="submit"
                                            >
                                                Edit Course
                                            </Button>
                                            <Link to="/courses">
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
    return bindActionCreators({ actionEditCourse, actionGetCategory }, dispatch)
}

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        // coursename: Yup.string().required('Please enter course name'),
        // courseType: Yup.string().required('Please enter course type'),
        // courseStatus: Yup.string().required('Please enter course status'),
        // duration: Yup.string().required('Please enter course duration'),
        // category: Yup.string().required('Please select course category'),
        // subCategory: Yup.string().required('Please select course sub category'),
        //startdate: Yup.string().required('Please enter course start date')
    }),
    mapPropsToValues: (function (props) {
        let course = props.history.location.state.course;
        console.log(course)
        if (props.history.location.state === undefined) {   //this.props.history.location.state
            return {
                courseType: '',
                Name: '',
                vendorname: '',
                duration: '',
                category: '',
                startdate: null,
                enddate: null,
                subCategory: '',
                createdDate: '',
                courseLevel: '',
                courseSummary: '',
                courseStatus: true,
                galleryData: [],
                ioriginalname: []
            }
        }
        else {
            console.log(course.CourseStatus);
            
            return {
                Name: course.CourseName,
                category: course.Category,
                subCategory: course.SubCategory,
                courseType: course.CourseType,
                courseLevel: course.CourseLevel,
                courseStatus: ((course.CourseStatus === "1") ? true : false),
                createdDate: course.CreatedDate,
                shortDescription: course.ShortDescription,
                duration: course.Duration,
                CourseID: course.CourseID,
                createdBy: course.CreatedBy,
                vendorname: course.VendorName,
                startdate: course.StartDate,
                enddate: course.EndDate,
                courseSummary: course.CourseSummary,
                galleryData: [],
                ioriginalname: course.iuploadname

            }
        }
    }),
    handleSubmit: (payload, { props }) => {
        //payload["courseSummary"] = draftToHtml(convertToRaw(payload.courseSummary.getCurrentContent()));
        // payload["createdDate"] = moment().format("YYYY/MM/DD HH:mm");
        //courseStatus: ( ( course.CourseStatus === "Active" ) ? true : false ),
        // let x = payload["courseStatus"];
        // delete payload["courseStatus"];

        // payload["startdate"] = moment(payload.startdate).format("YYYY/MM/DD HH:mm");
        // payload["enddate"] = moment(payload.enddate).format("YYYY/MM/DD HH:mm");
        payload["courseStatus"] = "1";   //((x === true) ? "Ac  tive" : "Inactive");
        delete payload['vendorname'];
        // delete payload['createdDate'];
        delete payload['duration'];

        let galleryFD = new FormData();
        let galleryFiles = payload.galleryData;
        if (galleryFiles !== undefined) {
            for (var i = 0; i < galleryFiles.length; i++) {
                galleryFD.append("files", galleryFiles[i]);
            }
        }
        // console.log(galleryFD);
        console.log(props);
        // console.log(payload);
        // payload["ioriginalname"] = props.history.location.state.course.ioriginalname;
        // payload["iuploadname"] = props.history.location.state.course.iuploadname;
        delete payload.galleryData;
        delete payload.shortDescription;
        // delete payload.galleryData;

        // if (payload.galleryData.length > 0) {
        //     axios.post(GLOBAL.API_HOST + `/uploadCourseImage`, galleryFD)
        //         .then(function (response) {
        //             console.log(response)
        //             let imageArray = [];
        //             let imageArray2 = [];
        //             if (response.status === 200) {
        //                 response.data.fileDetails.map((arr) => {
        //                     console.log(arr);

        //                     imageArray.push({
        //                         "location": arr.location
        //                     })
        //                     imageArray2.push({
        //                         "name": arr.originalname
        //                     })
        //                     return 0;
        //                 })
        //                 payload["iuploadname"] = imageArray;
        //                 payload["ioriginalname"] = imageArray2;
        //                 delete payload['galleryData'];


        //             }
        //         }).catch(function () {
        //             console.log("Bad Response");
        //         });
        //     console.log(payload);
        //     props.actionEditCourse(payload);
        // }

        console.log(payload);
        props.actionEditCourse(payload);

    },
    displayName: 'ViewCourse',
})(ViewCourse);
const EditCourseForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(EditCourseForm)))
