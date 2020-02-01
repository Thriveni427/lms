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


import combinedStyles from '../../material-ui';
import CourseMaterial from './CourseMaterial'
import CourseMaterialSection from './CourseMaterialSection'
import { handleAddFolder, handleAddFile, handleAddVideo, handleAddContent, handleAddAssignment, handleAddScorm, handleAddQTest } from '../../actions/actionSetupCourse';


// import AddTest2 from './Users/AddTest2';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});
//this.props.history.location.state.course.
export class ViewCourseSessions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            // showNewFolder: false,
            // showAddFile: false,
            // showAddVideos: false,
            // showAddContent: false,
            // showAddAssignment: false,
            // showAddQTest: false,
            // showAddScorm: false,
            // showAssignModal: false,
        };
    }

    componentDidMount = () => {
        console.log(this.props.history.location.state.course);
    }

    handleAssignClick = (e, row) => {
        e.preventDefault();
        this.setState({
            showAssignModal: true,
            courseID: row,
            showAddQTest: true,
        }, () =>{
            this.props.handleAddQTest(this.state.showAddQTest);
        } );
    };

    handleAssignClose = () => {
        this.setState({ showAssignModal: false, showAddQTest: false });
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    handleNewFolder = () => {
        this.setState({ showNewFolder: !this.state.showNewFolder }, () => {
            this.props.handleAddFolder(this.state.showNewFolder);
        });
    }
    handleAddVideos = () => {
        this.setState({ showAddVideos: !this.state.showAddVideos }, () => {
            this.props.handleAddVideo(this.state.showAddVideos);
        });
    }
    handleAddFiles = () => {
        this.setState({ showAddFile: !this.state.showAddFile }, () => {
            this.props.handleAddFile(this.state.showAddFile);
        });
    }
    handleAddContent = () => {
        this.setState({ showAddContent: !this.state.showAddContent }, () => {
            this.props.handleAddContent(this.state.showAddContent);
        });
    }
    handleAddAssignment = () => {
        this.setState({ showAddAssignment: !this.state.showAddAssignment }, () => {
            this.props.handleAddAssignment(this.state.showAddAssignment);
        });
    }
    handleAddScorms = () => {
        this.setState({ showAddScorm: !this.state.showAddScorm }, () => {
            this.props.handleAddScorm(this.state.showAddScorm);
        });
    }
    handleAddTest = () => {
        console.log("inside handleAddTest");

        this.setState({ showAddQTest: !this.state.showAddQTest }, () => {
            this.props.handleAddQTest(this.state.showAddQTest);
        });
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        // const { addMaterialSectionReducer } = this.props;
        const courseDetail = this.props.history.location.state.course;
        console.log(this.props);
        console.log(courseDetail);

        // if (addMaterialSectionReducer.addedAssignment === true || addMaterialSectionReducer.addedMaterialSection === true || addMaterialSectionReducer.addedContent === true || addMaterialSectionReducer.addedVideo === true || addMaterialSectionReducer.addedFile === true || addMaterialSectionReducer.addedScorm === true || addMaterialSectionReducer.addedQTest === true) {
        //     setTimeout(function () {
        //         window.location.reload();
        //         addMaterialSectionReducer.addedAssignment = false;
        //         addMaterialSectionReducer.addedMaterialSection = false;
        //         addMaterialSectionReducer.addedContent = false;
        //         addMaterialSectionReducer.addedVideo = false;
        //         addMaterialSectionReducer.addedFile = false;
        //         addMaterialSectionReducer.addedScorm = false;
        //         addMaterialSectionReducer.addedQTest = false;
        //     }, 1000);
        // }

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
                                            <h3 className="margin-0 padding-0">{this.props.history.location.state.course.CourseName}</h3>
                                        </div>

                                    </div>
                                    
                                </div>

                             
                                <div className="clearfix"></div>
                                <div className="content">
                                    <hr />
                                    <div className="col">
                                        <div className="row">
                                            <CourseMaterialSection courseDetail={courseDetail} />
                                            <div className="col-md-9">
                                                <h2 className="courseSetup__title">Sessions</h2>
                                                <CourseMaterial courseDetail={courseDetail} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <TakeTest/> */}

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
    displayName: 'ViewCourseSessions',
})(ViewCourseSessions);

const ViewCourseSessionsForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(styles, combinedStyles)(ViewCourseSessionsForm)))
