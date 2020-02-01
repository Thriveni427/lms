import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
//import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import combinedStyles from '../../material-ui';
import { actionEditQuestion } from '../../actions/TestPapers/actionEditQuestion';
import { actionGetQuestions } from '../../actions/actionGetQuestions';
import 'date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css'
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
import { ToastContainer } from 'react-toastify';
import { actionGetCourseList } from '../../actions/actionGetCourseList';
import { actionGetMaterialSection } from '../../actions/actionGetMaterial';
import { TextField } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { handleShowMcq, handleShowEssay, handleShowFillBlank, handleShowTrueFalse, handleShowMatch } from '../../actions/actionCreateQuestionMcq';

export class ViewQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labelWidth: 0,
            showMcq: false,
            showEssay: false,
            showFillBlanks: false,
            showTrueFalse: false,
            showMatch: false,
        };
    }
    handleShowMcqs = () => {
        this.setState({ showMcq: !this.state.showMcq }, () => {
            this.props.handleShowMcq(this.state.showMcq);
        });
    }
    handleShowEssays = () => {
        this.setState({ showEssay: !this.state.showEssay }, () => {
            this.props.handleShowEssay(this.state.showEssay);
        });
    }
    handleShowFillBlanks = () => {
        this.setState({ showFillBlanks: !this.state.showFillBlanks }, () => {
            this.props.handleShowFillBlank(this.state.showFillBlanks);
        });
    }
    handleShowTrueFalses = () => {
        this.setState({ showTrueFalse: !this.state.showTrueFalse }, () => {
            this.props.handleShowTrueFalse(this.state.showTrueFalse);
        });
    }
    handleShowMatchs = () => {
        this.setState({ showMatch: !this.state.showMatch }, () => {
            this.props.handleShowMatch(this.state.showMatch);
        });
    }
    componentDidMount = () => {
        this.props.actionGetCourseList();
        //console.log(this.props.history.location.state.question.QuestionType)
        this.props.actionGetMaterialSection({ "courseID": this.props.history.location.state.question.CourseID });
        let event = {
            target: {
                name: "QuestionType",
                value: this.props.history.location.state.question.QuestionType
            }
        }
        this.handleChange(event);
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
    handleBack = (row) => {
        this.props.history.goBack();
        // ({
        //   pathname: '/question',
        //   state: { questionpaper: row }
        // })
        console.log(row);
    }
    handleLevelChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.setValues({
            ...this.props.values,
            [event.target.name]: event.target.value
        });
    }
    handlePaperChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.setValues({
            ...this.props.values,
            [event.target.name]: event.target.value
        });
        //this.props.actionGetMaterialSection({"courseID": event.target.value});
    };

    handleChange = event => {
        console.log(event.target);

        this.setState({ [event.target.name]: event.target.value });
        this.props.setValues({
            ...this.props.values,
            [event.target.name]: event.target.value
        });
        switch (event.target.value) {
            case "Essay/Text Entry":
                console.log("Calling handleShowEssays");
                this.handleShowEssays();
                break;
            case "Fill In The Blank":
                console.log("Calling handleShowFillBlanks");
                this.handleShowFillBlanks();
                break;
            case "Matching":
                console.log("Calling handleShowMatchs");
                this.handleShowMatchs();
                break;
            case "Multiple Choice":
                console.log("Calling handleShowMcqs");
                this.handleShowMcqs();
                break;
            case "True Or False":
                console.log("Calling handleShowTrueFalses");
                this.handleShowTrueFalses();
                break;
            default:
                break;
        }
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
            history,
            getCourseSectionReducer,
            getCourseListReducer,
            createQuestionEsaayReducer,
            editQuestionReducer,
        } = this.props;

        if (editQuestionReducer.editedQuestion === true) {
            setTimeout(function () { history.goBack(); editQuestionReducer.editedQuestion = false; }, 1100);
        }

        console.log(this.props);
        console.log(this.state);
        return (
            <React.Fragment>
                <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
                    <div className="container-fluid">
                        <div className="header-body">
                            <div className="row align-items-center py-4">
                                <div className="col-lg-6 col-6">
                                    <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Test Papers > Question Bank > Question Papers > Questions</h6>
                                </div>
                                <div className="col-lg-6 col-6 text-right">
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
                                    <h3 className="margin-0 padding-0">View question</h3>
                                </div>
                                <div className="content">
                                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <div className="c-formSection">
                                            <div className="row">
                                            <div className="col md-4">
                                                <FormControl className={classes.formControl} error={errors.courseID && touched.courseID ? true : false}>
                                                    <InputLabel htmlFor="courseID">Select Course *</InputLabel>
                                                    <Select
                                                        required
                                                        disabled
                                                        fullWidth
                                                        error={errors.courseID && touched.courseID ? true : false}
                                                        value={values.courseID}
                                                        onChange={this.handleCategoryChange}
                                                        //onChange={handleChange}
                                                        //onBlur={handleBlur}
                                                        inputProps={{
                                                            name: 'courseID',
                                                            id: 'courseID',
                                                            classes: { select: classes.textField }
                                                        }}
                                                    >
                                                        {/* <MenuItem value=""><em>None</em></MenuItem> */}
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

                                            <div className="col md-4">
                                                <FormControl className={classes.formControl} error={errors.sectionID && touched.sectionID ? true : false}>
                                                    <InputLabel htmlFor="sectionID">Select Section *</InputLabel>
                                                    <Select
                                                        fullWidth
                                                        disabled
                                                        error={errors.sectionID && touched.sectionID ? true : false}
                                                        value={values.sectionID}
                                                        //onChange={handleChange}
                                                        onChange={this.handleSectionChange}
                                                        //onBlur={handleBlur}
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
                                            <div className="col md-4">
                                                <FormControl className={classes.formControl} error={errors.questionType && touched.questionType ? true : false}>
                                                    <InputLabel htmlFor="questionType">Question Type *</InputLabel>
                                                    <Select
                                                        fullWidth
                                                        disabled
                                                        required
                                                        error={errors.questionType && touched.questionType ? true : false}
                                                        value={values.questionType}
                                                        onChange={this.handleChange}
                                                        inputProps={{
                                                            name: 'questionType',
                                                            id: 'questionType',
                                                            classes: { select: classes.textField }
                                                        }}
                                                    >
                                                        <MenuItem value="Essay/Text Entry">Essay/Text Entry</MenuItem>
                                                        <MenuItem value="Fill In The Blank">Fill In The Blank</MenuItem>
                                                        <MenuItem value="Matching">Matching</MenuItem>
                                                        <MenuItem value="Multiple Choice">Multiple Choice</MenuItem>
                                                        <MenuItem value="True Or False">True Or False</MenuItem>
                                                    </Select>
                                                    {errors.questionType &&
                                                        touched.questionType && (
                                                            <div className="errorMsg">
                                                                {errors.questionType}
                                                            </div>
                                                        )}
                                                </FormControl>
                                            </div>
                                            {
                                                createQuestionEsaayReducer.showEssay &&
                                                <React.Fragment>
                                                    <div className="col-md-12 mt-4 mb-1 mt-4 mb-1">
                                                        <h5 className="margin-0 padding-0">Descriptive or Essay Type Question</h5>
                                                    </div>
                                                    
                                                    <div className="col-md-12">
                                                        <TextField
                                                            fullWidth
                                                            disabled
                                                            required
                                                            id="questionName"
                                                            label="Question"
                                                            placeholder="Write your question here"
                                                            onChange={handleChange}
                                                            value={values.questionName}
                                                            multiline
                                                            InputProps={{ classes: { input: classes.textField } }}
                                                            margin="normal"
                                                        />
                                                        {errors.questionName &&
                                                            touched.questionName && (
                                                                <div className="errorMsg">
                                                                    {errors.questionName}
                                                                </div>
                                                            )}
                                                        
                                                    </div>
                                                </React.Fragment>
                                            }
                                            {
                                                createQuestionEsaayReducer.showEssay &&
                                                <div className="col-md-12">
                                                    <TextField
                                                        fullWidth
                                                        disabled
                                                        required
                                                        id="answer"
                                                        label="Answer"
                                                        placeholder="Write answer here"
                                                        onChange={handleChange}
                                                        value={values.answer}
                                                        multiline
                                                        InputProps={{ classes: { input: classes.textField } }}
                                                        margin="normal"
                                                    />
                                                    {errors.answer &&
                                                        touched.answer && (
                                                            <div className="errorMsg">
                                                                {errors.answer}
                                                            </div>
                                                        )}
                                                </div>
                                                
                                            }
                                            {
                                                createQuestionEsaayReducer.showFillBlanks &&
                                                <React.Fragment>
                                                    <div className="col-md-12 mt-4 mb-1 mt-4 mb-1">
                                                        <h5 className="margin-0 padding-0">Fill in the blank Question</h5>
                                                    </div>
                                                    <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <TextField
                                                                fullWidth
                                                                required
                                                                disabled
                                                                id="questionPart1"
                                                                label="Question Part 1"
                                                                placeholder="Write your question here"
                                                                onChange={handleChange}
                                                                value={values.questionPart1}
                                                                multiline
                                                                InputProps={{ classes: { input: classes.textField } }}
                                                                margin="normal"
                                                            />
                                                            {errors.questionPart1 &&
                                                                touched.questionPart1 && (
                                                                    <div className="errorMsg">
                                                                        {errors.questionPart1}
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <TextField
                                                                fullWidth
                                                                disabled
                                                                id="questionPart2"
                                                                label="Question Part 2 (optional)"
                                                                placeholder="Write your question here (optional)"
                                                                onChange={handleChange}
                                                                value={values.questionPart2}
                                                                multiline
                                                                InputProps={{ classes: { input: classes.textField } }}
                                                                margin="normal"
                                                            />
                                                            {errors.questionPart2 &&
                                                                touched.questionPart2 && (
                                                                    <div className="errorMsg">
                                                                        {errors.questionPart2}
                                                                    </div>
                                                                )}
                                                        </div>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            }
                                            {
                                                createQuestionEsaayReducer.showFillBlanks &&
                                                <div className="col-md-12">
                                                    <TextField
                                                        fullWidth
                                                        required
                                                        disabled
                                                        id="answer"
                                                        label="Answer"
                                                        placeholder="Write answer here"
                                                        onChange={handleChange}
                                                        value={values.answer}
                                                        multiline
                                                        InputProps={{ classes: { input: classes.textField } }}
                                                        margin="normal"
                                                    />
                                                    {errors.answer &&
                                                        touched.answer && (
                                                            <div className="errorMsg">
                                                                {errors.answer}
                                                            </div>
                                                        )}
                                                        
                                                </div>
                                            }
                                            {
                                                createQuestionEsaayReducer.showMcq &&
                                                <React.Fragment>
                                                    <div className="col-md-12 mt-4 mb-1 mt-4 mb-1">
                                                        <h5 className="margin-0 padding-0">Multiple Choice Question</h5>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <TextField
                                                            fullWidth
                                                            required
                                                            disabled
                                                            id="questionName"
                                                            label="Question"
                                                            placeholder="Write your question here"
                                                            onChange={handleChange}
                                                            value={values.questionName}
                                                            multiline
                                                            InputProps={{ classes: { input: classes.textField } }}
                                                            margin="normal"
                                                        />
                                                        {errors.questionName &&
                                                            touched.questionName && (
                                                                <div className="errorMsg">
                                                                    {errors.questionName}
                                                                </div>
                                                            )}
                                                    </div>
                                                </React.Fragment>
                                            }
                                            {
                                                createQuestionEsaayReducer.showMcq &&
                                                <React.Fragment>
                                                    <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            
                                                            <TextField
                                                                fullWidth
                                                                required
                                                                disabled
                                                                id="option1"
                                                                label="Option A"
                                                                placeholder="Write Option A here"
                                                                onChange={handleChange}
                                                                value={values.option1}
                                                                multiline
                                                                InputProps={{ classes: { input: classes.textField } }}
                                                                margin="normal"
                                                            />
                                                            {errors.option1 &&
                                                                touched.option1 && (
                                                                    <div className="errorMsg">
                                                                        {errors.option1}
                                                                    </div>
                                                                )}
                                                            
                                                        </div>
                                                        <div className="col-md-6">
                                                            <TextField
                                                                fullWidth
                                                                required
                                                                disabled
                                                                id="option2"
                                                                label="Option B"
                                                                placeholder="Write Option B here"
                                                                onChange={handleChange}
                                                                value={values.option2}
                                                                multiline
                                                                InputProps={{ classes: { input: classes.textField } }}
                                                                margin="normal"
                                                            />
                                                            {errors.option2 &&
                                                                touched.option2 && (
                                                                    <div className="errorMsg">
                                                                        {errors.option2}
                                                                    </div>
                                                                )}
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <TextField
                                                                fullWidth
                                                                required
                                                                disabled
                                                                id="option3"
                                                                label="Option C"
                                                                placeholder="Write Option C here"
                                                                onChange={handleChange}
                                                                value={values.option3}
                                                                multiline
                                                                InputProps={{ classes: { input: classes.textField } }}
                                                                margin="normal"
                                                            />
                                                            {errors.option3 &&
                                                                touched.option3 && (
                                                                    <div className="errorMsg">
                                                                        {errors.option3}
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <TextField
                                                                fullWidth
                                                                disabled
                                                                required
                                                                id="option4"
                                                                label="Option D"
                                                                placeholder="Write Option D here"
                                                                onChange={handleChange}
                                                                value={values.option4}
                                                                multiline
                                                                InputProps={{ classes: { input: classes.textField } }}
                                                                margin="normal"
                                                            />
                                                            {errors.option4 &&
                                                                touched.option4 && (
                                                                    <div className="errorMsg">
                                                                        {errors.option4}
                                                                    </div>
                                                                )}
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <TextField
                                                            fullWidth
                                                            disabled
                                                            required
                                                            id="answer"
                                                            label="Answer"
                                                            placeholder="Write answer here"
                                                            onChange={handleChange}
                                                            value={values.answer}
                                                            multiline
                                                            InputProps={{ classes: { input: classes.textField } }}
                                                            margin="normal"
                                                        />
                                                        {errors.answer &&
                                                            touched.answer && (
                                                                <div className="errorMsg">
                                                                    {errors.answer}
                                                                </div>
                                                            )}
                                                    </div>
                                                </React.Fragment>
                                            }
                                            {
                                                createQuestionEsaayReducer.showTrueFalse &&
                                                <React.Fragment>
                                                    <div className="col-md-12 mt-4 mb-1">
                                                        <h5 className="margin-0 padding-0">True or False Question</h5>
                                                    </div>
                                                    <div className="col-md-6">
                                                    
                                                        <TextField
                                                            fullWidth
                                                            disabled
                                                            required
                                                            id="questionName"
                                                            label="Question"
                                                            placeholder="Write your question here"
                                                            onChange={handleChange}
                                                            value={values.questionName}
                                                            multiline
                                                            InputProps={{ classes: { input: classes.textField } }}
                                                            margin="normal"
                                                        />
                                                        {errors.questionName &&
                                                            touched.questionName && (
                                                                <div className="errorMsg">
                                                                    {errors.questionName}
                                                                </div>
                                                            )}
                                                    
                                                    </div>
                                                </React.Fragment>
                                            }
                                            {
                                                createQuestionEsaayReducer.showTrueFalse &&
                                                <div className="col-md-6 d-flex align-items-center justify-content-center">
                                                
                                                    <FormControl component="fieldset" className={classes.formControl}>
                                                        <FormLabel component="legend">Answer</FormLabel>
                                                        <RadioGroup
                                                            required
                                                            disabled
                                                            aria-label="Answer"
                                                            name="answer"
                                                            id="answer"
                                                            error={errors.answer && touched.answer ? true : false}
                                                            className={classes.group}
                                                            value={values.answer}   //{this.state.answer}
                                                            onChange={this.handleChange}
                                                            row
                                                        >
                                                            <FormControlLabel value="true" control={<Radio />} label="True" />
                                                            <FormControlLabel value="false" control={<Radio />} label="False" />
                                                        </RadioGroup>
                                                        {errors.answer &&
                                                            touched.answer && (
                                                                <div className="errorMsg">
                                                                    {errors.answer}
                                                                </div>
                                                            )}
                                                    </FormControl>
                                                    {/* <TextField
                                    fullWidth
                                    required
                                    id="answer"
                                    label="Answer"
                                    placeholder="Write answer here"
                                    onChange={handleChange}
                                    value={values.answer}
                                    multiline
                                    InputProps={{ classes: { input: classes.textField } }}
                                    margin="normal"
                                /> */}  
                                                
                                                </div>
                                            }
                                            <div className="col-md-12 mt-4 mb-1">
                                                <h5 className="margin-0 padding-0 mt-2">Scoring Parameters</h5>
                                            </div>
                                            <div className="col-md-4">
                                            
                                                <FormControl fullWidth className={classes.formControl}>
                                                    <TextField
                                                        disabled
                                                        required
                                                        error={errors.scoreForCorrect && touched.scoreForCorrect ? true : false}
                                                        id="scoreForCorrect"
                                                        label="Score For Correct Answer"
                                                        placeholder="Correct Answer"
                                                        margin="normal"
                                                        onChange={handleChange}
                                                        value={values.scoreForCorrect}
                                                        InputProps={{ classes: { input: classes.textField } }}
                                                    />
                                                    {errors.scoreForCorrect &&
                                                        touched.scoreForCorrect && (
                                                            <div className="errorMsg">
                                                                {errors.scoreForCorrect}
                                                            </div>
                                                        )}
                                                </FormControl>
                                            
                                            </div>
                                            <div className="col-md-4">
                                            
                                                <FormControl fullWidth className={classes.formControl}>
                                                    <TextField
                                                        required
                                                        disabled
                                                        error={errors.scoreForIncorrect && touched.scoreForIncorrect ? true : false}
                                                        id="scoreForIncorrect"
                                                        label="Score For In Correct Answer"
                                                        placeholder="Score For In Incorrect Answer"
                                                        margin="normal"
                                                        onChange={handleChange}
                                                        value={values.scoreForIncorrect}
                                                        InputProps={{ classes: { input: classes.textField } }}
                                                    />
                                                    {errors.scoreForIncorrect &&
                                                        touched.scoreForIncorrect && (
                                                            <div className="errorMsg">
                                                                {errors.scoreForIncorrect}
                                                            </div>
                                                        )}
                                                </FormControl>
                                            
                                            </div>
                                            <div className="col-md-4 mt-3">
                                            
                                                <FormControl fullWidth className={classes.formControl} error={errors.difficultyLevel && touched.difficultyLevel ? true : false}>
                                                    <InputLabel htmlFor="difficultyLevel">Difficulty Level *</InputLabel>
                                                    <Select
                                                        disabled
                                                        required
                                                        error={errors.difficultyLevel && touched.difficultyLevel ? true : false}
                                                        value={values.difficultyLevel}
                                                        onChange={this.handleLevelChange}
                                                        inputProps={{
                                                            name: 'difficultyLevel',
                                                            id: 'difficultyLevel',
                                                            classes: { select: classes.textField }
                                                        }}
                                                    >
                                                        <MenuItem value="Easy">Easy</MenuItem>
                                                        <MenuItem value="Difficult">Difficult</MenuItem>
                                                        <MenuItem value="Hard">Hard</MenuItem>
                                                    </Select>
                                                    {errors.difficultyLevel &&
                                                        touched.difficultyLevel && (
                                                            <div className="errorMsg">
                                                                {errors.difficultyLevel}
                                                            </div>
                                                        )}
                                                </FormControl>
                                                </div>
                                            
                                            </div>
                                        </div>
                                        <div className="c-formSection pt-4 pb-4">
                                            <Button
                                                variant="contained"
                                                className={[classes.button, classes.buttonPrimary]}
                                                type="submit"
                                            >
                                                Update Question
                  </Button>
                                            <Button
                                                onClick={this.handleBack}
                                                variant="contained"
                                                className={[classes.button, classes.buttonSecondary]}>
                                                Cancel
                  </Button>
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
    return bindActionCreators({
        actionGetCourseList,
        actionGetMaterialSection,
        actionEditQuestion,
        actionGetQuestions,
        handleShowMcq,
        handleShowEssay,
        handleShowFillBlank,
        handleShowTrueFalse,
        handleShowMatch,
    }, dispatch)
}

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        // questionName: Yup.string().required('Please enter category name'),
        // courseType: Yup.string().required('Please enter category type'),
        // courseStatus: Yup.string().required('Please enter category status'),
        // duration: Yup.string().required('Please enter category duration'),
        // category: Yup.string().required('Please select category category'),
        // subCategory: Yup.string().required('Please select category sub category'),
        //startdate: Yup.string().required('Please enter category start date')
    }),
    mapPropsToValues: (function (props) {
        console.log(props.history.location.state);

        if (props.history.location.state.question === undefined) {
            return {
                questionID: '',
                questionName: '',
                questionType: '',
                sectionID: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                option5: '',
                option6: '',
                option7: '',
                option8: '',
                option9: '',
                option10: '',
                scoreForCorrect: '',
                scoreForIncorrect: '',
                difficultyLevel: '',
                questionGrading: '',
                questionPaperID: '',
                courseID: '',
                answer: '',
            }
        }
        else {
            return {
                questionID: props.history.location.state.question.QuestionID,
                questionName: props.history.location.state.question.QuestionName,
                questionPaperID: props.history.location.state.question.QuestionPaperID,
                questionType: props.history.location.state.question.QuestionType,
                createdBy: props.history.location.state.question.CreatedBy,
                courseID: props.history.location.state.question.CourseID,
                answer: props.history.location.state.question.Answer,
                sectionID: props.history.location.state.question.SectionID,
                difficultyLevel: props.history.location.state.question.DifficultyLevel,
                questionGrading: props.history.location.state.question.DifficultyLevel,
                scoreForCorrect: props.history.location.state.question.ScoreForCorrect,
                scoreForIncorrect: props.history.location.state.question.ScoreForIncorrect,
                option1: props.history.location.state.question.Option1,
                option2: props.history.location.state.question.Option2,
                option3: props.history.location.state.question.Option3,
                option4: props.history.location.state.question.Option4
            }
        }
    }),
    handleSubmit: (payload, { props }) => {
        console.log(payload);

        props.actionEditQuestion(payload);
    },
    displayName: 'ViewQuestion',
})(ViewQuestion);
const ViewQuestionForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(formikEnhancer)

export default withRouter(withStyles(combinedStyles)(connect(mapStateToProps, { actionGetQuestions, actionEditQuestion })(ViewQuestionForm)
))