import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import 'date-fns';
import moment from 'moment';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css'
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
import { ToastContainer } from 'react-toastify';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Videocam from '@material-ui/icons/Videocam';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Help from '@material-ui/icons/Help';
import Image from '@material-ui/icons/Image';
import Assignment from '@material-ui/icons/Assignment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import { Zoom } from "@material-ui/core";
import combinedStyles from '../../material-ui';
// import CourseMaterial from './CourseMaterial';
// import CourseMaterialSection from './CourseMaterialSection';
import { handleAddFolder, handleAddFile, handleAddVideo, handleAddContent, handleAddAssignment, handleAddScorm, handleAddQTest } from '../../actions/actionSetupCourse';
import { actionGetCourseTopicList } from '../../actions/actionGetCourseTopicList';
import { actionGetMaterialBySession } from '../../actions/Courses/actionGetMaterialBySession';
import { actionGetMaterialByTopic } from '../../actions/Courses/actionGetMaterialByTopic';
import { actionUploadQuestions } from '../../actions/Courses/actionUploadQuestions';
import { actionDeleteTopic } from '../../actions/Courses/actionDeleteTopic';


const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0,0,0,.125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    },
    expanded: {
        margin: 'auto',
    },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0,0,0,.03)',
        borderBottom: '1px solid rgba(0,0,0,.125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
}))(MuiExpansionPanelDetails);


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});


function buildFileSelector() {
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    fileSelector.setAttribute("multiple", "multiple");
    return fileSelector;
}


export class SetupCourse extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            value2: 0,
            expanded: 'panel',
            expanded2: 'panel',
            currentIndex: -1,
            currentInnerIndex: -1,
            fileSelector: [],
        };
    }

    componentDidMount = () => {
        console.log(this.props.history.location.state.course);
        this.props.actionGetCourseTopicList(this.props.history.location.state.course.CourseID);
        this.fileSelector = buildFileSelector();
    }

    // handleAssignClick = (e, row) => {
    //     e.preventDefault();
    //     this.setState({
    //         showAssignModal: true,
    //         courseID: row,
    //         showAddQTest: true,
    //     }, () => {
    //         this.props.handleAddQTest(this.state.showAddQTest);
    //     });
    // };

    // handleAssignClose = () => {
    //     this.setState({ showAssignModal: false, showAddQTest: false });
    // };

    // handleClick = event => {
    //     this.setState({ anchorEl: event.currentTarget });
    // };

    // handleClose = () => {
    //     this.setState({ anchorEl: null });
    // };

    // toggle = () => {
    //     this.setState({
    //         dropdownOpen: !this.state.dropdownOpen
    //     });
    // }

    // handleChange = (event, value) => {
    //     this.setState({ value });
    // };

    // getFirstMaterial = (data) => {

    // }

    fetchMaterial = (id) => {
        let payload = {
            courseID: this.props.history.location.state.course.CourseID,
            topicID: id
        };
        // this.props.actionGetMaterialBySession(payload);
        this.props.actionGetMaterialByTopic(payload);
        localStorage.setItem("sectionID", id);

        // console.log(payload);

    }

    handleExpansionChange = (index, event, id) => {
        console.log(id);
        console.log(index);
        event.preventDefault();

        if (index === this.state.currentIndex) {
            this.setState({
                currentIndex: -1
            })
        }
        else {
            this.fetchMaterial(id);
            this.setState({
                currentIndex: index,
            });
        }
    };

    addTopicHandler = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname: "/assesments",
            state: { courseID: this.props.history.location.state.course.CourseID }
            // state: undefined
        });
    }
    deleteTopicHandler = (e, id) => {
        e.preventDefault();
        let payload = {
            TopicID: id
        }
        this.props.actionDeleteTopic(id);
        console.log(payload);

    }


    handleExpansionInnerChange = (index, event, id) => {
        console.log(index);
        event.preventDefault();

        this.fetchMaterial(id);
        this.setState({
            currentInnerIndex: index,
        });
    };

    onChangeFile(event) {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        console.log(file);
        this.setState({ files: file }); /// if you want to upload latter
        let formData = new FormData();
        formData.append('files', file);
        console.log(formData);
        for (var pair of formData.entries()) {
            console.log(pair[0] + ' : ' + pair[1]);
        }

        // let forms = this.state.files;
        // console.log(this.state.files);
        // console.log(this.props);

        // e.preventDefault();
        // console.log(forms.length);

        // let formData = new FormData();
        // for (let file of forms) {
        //   formData.append("file", file);
        //   // console.log(file);
        //   console.log(formData);
        // }
        // // formData.append("id", this.props.getEventsByIdReducer.getAllEventsByIdData._id);
        // console.log(formData);
        // this.props.bulkRegistrationAction(
        //   formData,
        //   this.props.getEventsByIdReducer.getAllEventsByIdData._id
        // );


        this.props.actionUploadQuestions(formData);
    }

    render() {
        // let item = [1, 2, 3, 4];
        let { getCourseTopicListReducer, getMaterialByTopicReducer, classes, createTopicReducer, deleteTopicReducer } = this.props;
        let { currentIndex } = this.state;
        const courseDetail = this.props.history.location.state.course;
        console.log(this.props);
        console.log(courseDetail);

        // let files = this.state.files.map(file => (
        //     <li key={file.name}>
        //         {file.name} - {file.size} bytes
        //     </li>
        // ));


        // if (createCourseReducer.createdCourse === true) {
        //     console.log(createCourseReducer.createCourseData);

        //       this.history.push({
        //         pathname: "/assesments",
        //         state: { courseID: createCourseReducer.createCourseData }
        //       });
        //       createCourseReducer.createdCourse = false;

        //         }

        return (
            <React.Fragment>
                <div>
                    <ToastContainer autoClose={2000} />
                    <div className="row courseSetup">
                        <div className="col">
                            <div className="card1">
                                <div className="card-header d-flex align-items-center border-0 mt-3">
                                    <div className="col-lg-6 col-6">
                                        <div className="row">
                                            {/* <h3 className="margin-0 padding-0">{this.props.history.location.state.course.CourseName}</h3> */}
                                        </div>

                                    </div>
                                </div>

                                <div className="card-header d-flex flex-row justify-content-between">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="view_course_a">
                                                <div className="view_course_b">
                                                    <img className="card" src={this.props.history.location.state.course.iuploadname.slice(0, -1)} alt="logo" width="300" margin-left="66px" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8" style={{ flexBasis: '65%' }}>
                                            <h2>{this.props.history.location.state.course.CourseName}</h2>
                                            <div className="view_course_c mb-4">
                                                <strong>{this.props.history.location.state.course.CourseSummary}</strong>
                                            </div>
                                            <div className="viewCoursetext">
                                                <div className="col-md-4">
                                                    <p className="mt-2"><strong>Course Duration</strong> : {this.props.history.location.state.course.Duration} days</p>
                                                    <p className="mt-2"><strong>Course Type</strong> : {this.props.history.location.state.course.CourseType}</p>
                                                    <p className="mt-2"><strong>Category</strong> : {this.props.history.location.state.course.CategoryName}</p>
                                                    <p className="mt-2"><strong>Sub Category</strong> : {this.props.history.location.state.course.SubCategory}</p>
                                                    {
                                                        this.props.history.location.state.course.CourseStatus !== 1 ?
                                                            <p><strong>Course Status</strong> : Active</p> :
                                                            <p><strong>Course Status</strong> : Inactive</p>
                                                    }
                                                </div>

                                                <div className="col-md-8 mt-1">
                                                    {/* <p className="mt-2"><strong>Course Status</strong> : {this.props.history.location.state.course.CourseStatus}</p> */}
                                                    <p className="mt-2"><strong>Created Date</strong> : {moment(this.props.history.location.state.course.CreatedDate).format('L')} </p>
                                                    <p className="mt-2"><strong>End Date</strong> : {moment(this.props.history.location.state.course.CreatedDate).format('L')} </p>
                                                    <p className="mt-2"><strong>Course Level</strong> : {this.props.history.location.state.course.CourseLevel}</p>
                                                    {/* <p className="mt-2"><strong>Vendor Name</strong> : {this.props.history.location.state.course.VendorName} </p> */}
                                                    <p className="mt-2"><strong>Vendor Name</strong> : Static</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="content">
                                    {/* <hr /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        getCourseTopicListReducer.gotCourseTopicListData.map((item, index) => {
                            console.log(item);

                            return (
                                <div className="row">
                                    <div className="col-md-11">
                                        <ExpansionPanel
                                            square
                                            // expanded={expanded === 'panel'}
                                            expanded={currentIndex === index ? true : false}
                                            onChange={(event) => { this.handleExpansionChange(index, event, item.TopicID) }}
                                        >
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography key={index}
                                                    style={{ fontSize: 16 }}
                                                >{item.TopicName}</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails className="flex-column">

                                                {
                                                    getMaterialByTopicReducer.gotMaterialByTopic === true &&
                                                    (
                                                        (getMaterialByTopicReducer.gotMaterialByTopicData === undefined || getMaterialByTopicReducer.gotMaterialByTopicData === null || getMaterialByTopicReducer.gotMaterialByTopicData.length < 1)
                                                            ?
                                                            <h4>No Material is available in this topic</h4>
                                                            :
                                                            (
                                                                getMaterialByTopicReducer.gotMaterialByTopicData.map((material) => {
                                                                    {
                                                                        console.log(material);

                                                                    }
                                                                    return (
                                                                        <React.Fragment>
                                                                            <div style={{ flexDirection: 'column' }} key={1}>
                                                                                <ListItem
                                                                                    key={1}
                                                                                    // onClick={(e) => { this.fetchMaterial(e, subitem.SessionID) }}
                                                                                    style={{
                                                                                        borderBottomStyle: 'solid',
                                                                                        borderBottomWidth: 1,
                                                                                        borderBottomColor: '#e4e4e4'
                                                                                    }}>
                                                                                    <ListItemAvatar>
                                                                                        {
                                                                                            ((material.MaterialType === "video/x-ms-wmv" || material.MaterialType === "video/mp4")
                                                                                                ?
                                                                                                <Videocam />
                                                                                                :
                                                                                                ((material.MaterialType === "image/jpeg" || material.MaterialType === "image/png")
                                                                                                    ?
                                                                                                    <Image />
                                                                                                    :
                                                                                                    ((material.MaterialType === "video/embed")
                                                                                                        ?
                                                                                                        <img src="https://static.thenounproject.com/png/531904-200.png" width="30px" height="30px" alt="im" />
                                                                                                        :
                                                                                                        ((material.MaterialType === "assignment")
                                                                                                            ?
                                                                                                            <Assignment />
                                                                                                            :
                                                                                                            <Help />
                                                                                                        )
                                                                                                    )
                                                                                                )
                                                                                            )
                                                                                        }
                                                                                    </ListItemAvatar>
                                                                                    <ListItemText primary={material.MaterialName} />
                                                                                    <i className="fas fa-play-circle"></i>&nbsp;
                                                                    </ListItem>
                                                                            </div>

                                                                        </React.Fragment>
                                                                    )
                                                                })
                                                            )
                                                    )
                                                }

                                                {/* <div className="d-flex justify-content-center align-items-center">
                                            <Button
                                                style={{ marginTop: 40, paddingTop: 15, paddingBottom: 15 }}
                                                variant="contained"
                                                className={["w-25", classes.button, classes.buttonSecondary]}
                                                onClick={() => this.handleAddSession(1)}
                                            >
                                                + Add Session
                                            </Button>
                                        </div> */}

                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>

                                    </div>
                                    <div className="col-md-1 rightSideDeleteBtn mt-3" align="start">
                                        <IconButton className={classes.buttonTableAction}>
                                            <Tooltip
                                                title="Delete"
                                                TransitionComponent={Zoom}
                                                placement="top"
                                            >
                                                <Icon
                                                    style={{ fontSize: 20 }}
                                                    className={[classes.icon, "fas fa-trash-alt"]}
                                                    color="secondary"
                                                    onClick={(e) => { this.deleteTopicHandler(e, item.TopicID) }}
                                                />
                                            </Tooltip>
                                        </IconButton>
                                        {/* <Button
                                            variant="contained"
                                            className={[classes.button, classes.buttonPrimary]}
                                            type="submit"
                                            color="primary"
                                            onClick={(e) => { this.deleteTopicHandler(e, item.TopicID) }}
                                        >
                                            Delete Topic
                                                </Button>            */}
                                    </div>

                                </div>
                            )

                        })

                    }


                </div>
                <div className="btnUpload mt-3 mb-3">
                    <div className="fileUploadBtn">
                        <div className="ml-4">
                            <input id="myInput"
                                type="file"
                                ref={(ref) => this.upload = ref}
                                style={{ display: 'none' }}
                                onChange={this.onChangeFile.bind(this)}
                            />
                            <Button
                                variant="contained"
                                className={[classes.button, classes.buttonPrimary]}
                                type="submit"
                                color="primary"
                                onClick={() => { this.upload.click() }}
                            // onClick={() => this.handleUpload(arr)}
                            >
                                Upload Questions
                                                </Button>
                        </div>
                        <div className="ml-2 mt-2">
                            <h5 align="center">Files</h5>
                            {
                                (this.state.files === null || this.state.files === undefined)
                                    ?
                                    null
                                    :
                                    <ul>{this.state.files.name}</ul>
                            }
                        </div>
                    </div>
                    <div className="addTopicBtn">
                        <Button
                            variant="contained"
                            className={[classes.button, classes.buttonPrimary]}
                            type="submit"
                            color="primary"
                            onClick={(e) => { this.addTopicHandler(e) }}
                        >
                            Add Topic
                                                </Button>
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
    return bindActionCreators(
        {
            handleAddFolder,
            handleAddFile,
            handleAddVideo,
            handleAddContent,
            handleAddAssignment,
            handleAddScorm,
            handleAddQTest,
            actionGetCourseTopicList,
            actionGetMaterialBySession,
            actionGetMaterialByTopic,
            actionUploadQuestions,
            actionDeleteTopic,
        }, dispatch)
}

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({}),
    mapPropsToValues: (function () { }),
    handleSubmit: (payload, { props }) => {
        payload["createdDate"] = moment().format("YYYY/MM/DD HH:mm");
        let galleryFD = new FormData();
        let galleryFiles = payload.galleryData;
        if (galleryFiles !== undefined) {
            for (var i = 0; i < galleryFiles.length; i++) {
                galleryFD.append("files", galleryFiles[i]);
            }
        }
        props.actionEditCourse(payload);
    },
    displayName: 'SetupCourse',
})(SetupCourse);

const SetupCourseForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(styles, combinedStyles)(SetupCourseForm)))
