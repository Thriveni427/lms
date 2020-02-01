import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import combinedStyles from '../../material-ui';
import { ToastContainer } from 'react-toastify';

import { actionEditQuestionPaper } from '../../actions/actionEditQuestionPaper';
import { actionGetCourseList } from '../../actions/actionGetCourseList';
import { actionGetMaterialSection } from '../../actions/actionGetMaterial';



export class EditQuestionPaper extends Component {

    handleStatus = () => event => {
        console.log(this.state);
        this.setState({ questionBankVisibility: event.target.checked });
        this.props.setValues({
            ...this.props.values,
            questionBankVisibility: event.target.checked
        });
    };

    handleBack = (row) => {
        this.props.history.goBack();
        console.log(row);
    }

    handleCategoryChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.setValues({
            ...this.props.values,
            [event.target.name]: event.target.value
        });
        this.props.actionGetMaterialSection({ "courseID": event.target.value });
        //this.props.actionGetQuestionPaper({"courseID": event.target.value});
    };

    handleSectionChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.setValues({
            ...this.props.values,
            [event.target.name]: event.target.value
        });
        //this.props.actionGetMaterialSection({"courseID": event.target.value});
    };

    componentDidMount = () => {
        this.props.actionGetCourseList();
        //console.log(this.props.history.location.state.question.QuestionType)
        this.props.actionGetMaterialSection({ "courseID": this.props.history.location.state.questionpaper.QuestionBankID });
    }

    render() {

        const {
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            history,
            getCourseListReducer,
            getCourseSectionReducer,
            editQuestionPaperReducer,
            classes,
        } = this.props;

        if (editQuestionPaperReducer.editedQuestionPaper === true) 
        {
             setTimeout(function(){ history.goBack();
             editQuestionPaperReducer.editedQuestionPaper = false; }, 1100);
        }

        console.log(this.props.editQuestionPaperReducer);
        return (
            <React.Fragment>
                <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
                    <ToastContainer autoClose={2000} />
                    <div className="container-fluid">
                        <div className="header-body">
                            <div className="row align-items-center py-4">
                                <div className="col-lg-6 col-6">
                                    <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Edit Question Paper</h6>
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
                                    <h3 className="margin-0 padding-0">Edit Question Paper</h3>
                                </div>
                                <div className="content">
                                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <div className="c-formSection">
                                            <div className="c-formSection__grid">
                                                <FormControl className={classes.formControl} error={errors.courseID && touched.courseID ? true : false}>
                                                    <InputLabel htmlFor="courseID">Select Course *</InputLabel>
                                                    <Select
                                                        error={errors.courseID && touched.courseID ? true : false}
                                                        fullWidth
                                                        required
                                                        value={values.courseID}
                                                        onChange={this.handleCategoryChange}
                                                        inputProps={{
                                                            name: 'courseID',
                                                            id: 'courseID',
                                                            classes: { select: classes.textField }
                                                        }}
                                                    >
                                                        {
                                                            ((typeof getCourseListReducer.coursesData !== 'undefined' && getCourseListReducer.coursesData.length > 0) ?
                                                                (getCourseListReducer.coursesData.map((arr) => {
                                                                    return (
                                                                        <MenuItem value={arr.CourseID}>{arr.CourseName}</MenuItem>
                                                                    )
                                                                })) : <MenuItem value=""><em>None</em></MenuItem>)
                                                        }
                                                    </Select>
                                                    {errors.courseID &&
                                                        touched.courseID && (
                                                            <div className="errorMsg">
                                                                {errors.courseID}
                                                            </div>
                                                        )}
                                                </FormControl>
                                            </div>
                                            <div className="c-formSection__grid">
                                                <FormControl className={classes.formControl} error={errors.sectionID && touched.sectionID ? true : false}>
                                                    <InputLabel htmlFor="sectionID">Select section *</InputLabel>
                                                    <Select
                                                        fullWidth
                                                        required
                                                        error={errors.sectionID && touched.sectionID ? true : false}
                                                        value={values.sectionID}
                                                        onChange={this.handleSectionChange}
                                                        inputProps={{
                                                            name: 'sectionID',
                                                            id: 'sectionID',
                                                            classes: { select: classes.textField }
                                                        }}
                                                    >
                                                    {
                                                            ((typeof getCourseSectionReducer.SectionsData !== 'undefined' && getCourseSectionReducer.SectionsData.length > 0) ?
                                                                (getCourseSectionReducer.SectionsData.map((arr) => {
                                                                    return (
                                                                        <MenuItem value={arr.SectionID}>{arr.SectionName}</MenuItem>
                                                                    )
                                                                })) : <MenuItem value=""><em>None</em></MenuItem>)
                                                        }
                                                    </Select>
                                                    {errors.sectionID &&
                                                        touched.sectionID && (
                                                            <div className="errorMsg">
                                                                {errors.sectionID}
                                                            </div>
                                                        )}
                                                </FormControl>
                                            </div>
                                            <div className="c-formSection__grid">
                                                <FormControl fullWidth>
                                                    <TextField
                                                        required
                                                        error={errors.marks && touched.marks ? true : false}
                                                        id="marks"
                                                        label="Marks"
                                                        margin="normal"
                                                        onChange={handleChange}
                                                        value={values.marks}
                                                        type="number"
                                                        InputProps={{ classes: { input: classes.textField } }}
                                                    />
                                                    {errors.marks &&
                                                        touched.marks && (
                                                            <div className="errorMsg">
                                                                {errors.marks}
                                                            </div>
                                                        )}
                                                </FormControl>
                                            </div>
                                            <div className="c-formSection__grid">
                                                <FormControl fullWidth>
                                                    <TextField
                                                        required
                                                        error={errors.duration && touched.duration ? true : false}
                                                        id="duration"
                                                        label="Duration"
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
                                                </FormControl>
                                            </div>
                                            <div className="c-formSection__grid">
                                                <FormControl fullWidth>
                                                    <TextField
                                                        required
                                                        error={errors.questionPaperName && touched.questionPaperName ? true : false}
                                                        id="questionPaperName"
                                                        label="Question Paper name"
                                                        margin="normal"
                                                        onChange={handleChange}
                                                        value={values.questionPaperName}
                                                        InputProps={{ classes: { input: classes.textField } }}
                                                    />
                                                    {errors.questionPaperName &&
                                                        touched.questionPaperName && (
                                                            <div className="errorMsg">
                                                                {errors.questionPaperName}
                                                            </div>
                                                        )}
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className="c-formSection pt-4 pb-4">
                                            <Button
                                                variant="contained"
                                                className={[classes.button, classes.buttonPrimary]}
                                                type="submit"
                                            >
                                                Update Question Paper
                      </Button>
                                            {/* <Link to="/questionpaper"> */}
                                            <Button 
                                            onClick={this.handleBack} 
                                            variant="contained" 
                                            className={[classes.button, classes.buttonSecondary]}>
                                                CANCEL
                      </Button>
                                            {/* </Link> */}
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ actionEditQuestionPaper,actionGetMaterialSection,actionGetCourseList }, dispatch)

}


const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        // firstname: Yup.string().required('Please enter first name'),
        // mi: Yup.string().required('Please enter middle name'),
        // lastname: Yup.string().required('Please enter last name'),
        // emailid: Yup.string().email('Please enter a valid email address')
        //   .required('Please enter email address'),
        // contactno: Yup.string().required('Please enter contactno '),
        // createddate: Yup.string().required('Please enter created date'),
        // role: Yup.string().required('Please select a role'),

    }),
    mapPropsToValues: (function (props) {
        console.log(props.history.location.state);
        // console.log(typeof props.paperBank.QuestionBankVisibility);
        // console.log(props.paperBank.QuestionBankID);
        if (props.history.location.state.questionpaper === undefined) {
            return {
                courseID: '',
                sectionID: '',
                marks: '',
                duration: '',
                questionPaperName: '',
                questionPaperID: '',
                
            }
        } else {
            return {
                courseID: props.history.location.state.questionpaper.QuestionBankID,
                sectionID: props.history.location.state.questionpaper.SectionID,
                marks: props.history.location.state.questionpaper.Marks,
                duration: props.history.location.state.questionpaper.Duration,
                questionPaperName: props.history.location.state.questionpaper.QuestionPaperName,
                questionPaperID: props.history.location.state.questionpaper.QuestionPaperID,


            }
        }
    }),

    handleSubmit: (payload, { props }) => {
        // console.log(JSON.stringify(payload))
        props.actionEditQuestionPaper(payload);
    },
    displayName: 'EditQuestionPaper',
})(EditQuestionPaper);

const EditQuestionPaperForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(EditQuestionPaperForm)))
