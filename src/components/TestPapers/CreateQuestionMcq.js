import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import combinedStyles from '../../material-ui';
import { actionCreateQuestionMcq } from '../../actions/actionCreateQuestionMcq';
import { actionGetCourseList } from '../../actions/actionGetCourseList';
import { actionGetMaterialSection } from '../../actions/actionGetMaterial';
import { actionGetQuestionPaper } from '../../actions/actionGetQuestionPaper';
import { handleShowMcq, handleShowEssay, handleShowFillBlank, handleShowTrueFalse, handleShowMatch } from '../../actions/actionCreateQuestionMcq';
import 'date-fns';
import { EditorState } from 'draft-js';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css'
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';

export class CreateQuestionMcq extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labelWidth: 0,
            startdate: new Date(),
            enddate: new Date(),
            editorState: EditorState.createEmpty(),
            showMcq: false,
            showEssay: false,
            showFillBlanks: false,
            showTrueFalse: false,
            showMatch: false,
        };
    }

    handleLevelChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.setValues({
            ...this.props.values,
            [event.target.name]: event.target.value
        });
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
    handleCategoryChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.setValues({
            ...this.props.values,
            [event.target.name]: event.target.value
        });
        this.props.actionGetMaterialSection({ "courseID": event.target.value });
        this.props.actionGetQuestionPaper({ "courseID": event.target.value });
    };
    handleSectionChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.setValues({
            ...this.props.values,
            [event.target.name]: event.target.value
        });
        //this.props.actionGetMaterialSection({"courseID": event.target.value});
    };
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
    componentDidMount = () => {
        this.props.actionGetCourseList();
        this.props.actionGetMaterialSection({"courseID":this.props.history.location.state.questionpaper.QuestionBankID});
    }

    render() {

        const {
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            classes,
            getCourseListReducer,
            getCourseSectionReducer,
            getQuestionPaperReducer,
            createQuestionEsaayReducer,
        } = this.props;

        console.log(this.props);
        console.log(this.state);
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="col-lg-6 col-6 text-right">
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="">
                            <div className="card-header d-flex align-items-center border-0">
                                <h3 className="margin-0 padding-0">Create New Question</h3>
                            </div>
                            <div className="content">
                                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                    <div className="c-formSection">
                                        <div className="c-formSection__grid">
                                            <FormControl className={classes.formControl} error={errors.courseID && touched.courseID ? true : false}>
                                                <InputLabel htmlFor="courseID">Select Course *</InputLabel>
                                                <Select
                                                    disabled
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
                                                        getCourseListReducer.coursesData.map((arr) => {
                                                            return (
                                                                <MenuItem value={arr.CourseID}>{arr.CourseName}</MenuItem>
                                                            )
                                                        })
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
                                            <FormControl className={classes.formControl} error={errors.questionPaperID && touched.questionPaperID ? true : false}>
                                                <InputLabel htmlFor="questionPaperID">Question Paper *</InputLabel>
                                                <Select
                                                    disabled
                                                    fullWidth
                                                    required
                                                    error={errors.questionPaperID && touched.questionPaperID ? true : false}
                                                    value={values.questionPaperID}
                                                    onChange={this.handlePaperChange}
                                                    inputProps={{
                                                        name: 'questionPaperID',
                                                        id: 'questionPaperID',
                                                        classes: { select: classes.textField }
                                                    }}
                                                >
                                                    {
                                                        ((typeof getQuestionPaperReducer.QuestionPaperData !== 'undefined' && getQuestionPaperReducer.QuestionPaperData.length > 0) ?
                                                            (getQuestionPaperReducer.QuestionPaperData.map((arr) => {
                                                                return (
                                                                    <MenuItem value={arr.QuestionPaperID}>{arr.QuestionPaperName}</MenuItem>
                                                                )
                                                            })) : <MenuItem value=""><em>None</em></MenuItem>)
                                                    }

                                                </Select>
                                                {errors.questionPaperID &&
                                                    touched.questionPaperID && (
                                                        <div className="errorMsg">
                                                            {errors.questionPaperID}
                                                        </div>
                                                    )}
                                            </FormControl>
                                        </div>

                                        <div className="c-formSection__grid">
                                            <FormControl className={classes.formControl} error={errors.sectionID && touched.sectionID ? true : false}>
                                                <InputLabel htmlFor="sectionID">Select section *</InputLabel>
                                                <Select
                                                    disabled
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
                                                    {}
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
                                            <FormControl className={classes.formControl} error={errors.questionType && touched.questionType ? true : false}>
                                                <InputLabel htmlFor="questionType">Question Type *</InputLabel>
                                                <Select
                                                    fullWidth
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
                                                <div className="c-formSection__grid--full mt-5 mb-1">
                                                    <h5 className="margin-0 padding-0">Descriptive or Essay type Question</h5>
                                                </div>
                                                <div className="c-formSection__grid--full">
                                                    <TextField
                                                        fullWidth
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
                                            <div className="c-formSection__grid--full">
                                                <TextField
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
                                                <div className="c-formSection__grid--full mt-5 mb-1">
                                                    <h5 className="margin-0 padding-0">Fill in the blank Question</h5>
                                                </div>
                                                <div className="c-formSection__grid--full">
                                                    <div className="c-formSection__grid--full">
                                                        <TextField
                                                            fullWidth
                                                            required
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
                                                    {/* <div className="c-formSection__grid">
                                                        <TextField
                                                            fullWidth
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
                                                    </div> */}
                                                </div>
                                            </React.Fragment>
                                        }
                                        {
                                            createQuestionEsaayReducer.showFillBlanks &&
                                            <div className="c-formSection__grid--full">
                                                <TextField
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
                                                <div className="c-formSection__grid--full mt-5 mb-1">
                                                    <h5 className="margin-0 padding-0">Multiple Choice Question</h5>
                                                </div>
                                                <div className="c-formSection__grid--full">
                                                    <TextField
                                                        fullWidth
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
                                            createQuestionEsaayReducer.showMcq &&
                                            <React.Fragment>
                                                <div className="c-formSection__grid--full">
                                                    <div className="c-formSection__grid">
                                                        <TextField
                                                            fullWidth
                                                            required
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
                                                    <div className="c-formSection__grid">
                                                        <TextField
                                                            fullWidth
                                                            required
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
                                                <div className="c-formSection__grid--full">
                                                    <div className="c-formSection__grid">
                                                        <TextField
                                                            fullWidth
                                                            required
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
                                                    <div className="c-formSection__grid">
                                                        <TextField
                                                            fullWidth
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
                                                <div className="c-formSection__grid--full">
                                                    <TextField
                                                        fullWidth
                                                        required
                                                        id="answer"
                                                        label="Correct Answer"
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
                                                <div className="c-formSection__grid--full mt-5 mb-1">
                                                    <h5 className="margin-0 padding-0">True or False Question</h5>
                                                </div>
                                                <div className="c-formSection__grid">
                                                    <TextField
                                                        fullWidth
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
                                            <div className="c-formSection__grid d-flex align-items-center justify-content-center">
                                                <FormControl component="fieldset" className={classes.formControl}>
                                                    <FormLabel component="legend">Answer</FormLabel>
                                                    <RadioGroup
                                                        required
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
                                        <div className="c-formSection__grid--full mt-5">
                                            <h5 className="margin-0 padding-0">Scoring Parameters</h5>
                                        </div>
                                        <div className="c-formSection__grid">
                                            <FormControl className={classes.formControl}>
                                                <TextField
                                                    required
                                                    error={errors.scoreForCorrect && touched.scoreForCorrect ? true : false}
                                                    id="scoreForCorrect"
                                                    label="Score For Correct Answer"
                                                    placeholder="Score For Correct Answer"
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
                                        <div className="c-formSection__grid">
                                            <FormControl className={classes.formControl}>
                                                <TextField
                                                    required
                                                    error={errors.scoreForIncorrect && touched.scoreForIncorrect ? true : false}
                                                    id="scoreForIncorrect"
                                                    label="Score For Incorrect Answer"
                                                    placeholder="Score For Incorrect Answer"
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
                                        <div className="c-formSection__grid">
                                            <FormControl className={classes.formControl} error={errors.difficultyLevel && touched.difficultyLevel ? true : false}>
                                                <InputLabel htmlFor="difficultyLevel">Difficulty Level *</InputLabel>
                                                <Select
                                                    fullWidth
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
                                    <div className="c-formSection pt-4 pb-4">
                                        <Button
                                            variant="contained"
                                            className={[classes.button, classes.buttonPrimary]}
                                            type="submit"
                                        >
                                            Create Question
</Button>
                                        {/* <Link to="/courses"><Button variant="contained" className={[classes.button, classes.buttonSecondary]}>
Cancel
</Button>
</Link> */}
                                    </div>
                                </form>
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
    return bindActionCreators(
        {
            actionCreateQuestionMcq,
            actionGetCourseList,
            actionGetMaterialSection,
            actionGetQuestionPaper,
            handleShowMcq,
            handleShowEssay,
            handleShowFillBlank,
            handleShowTrueFalse,
            handleShowMatch,
        }, dispatch)
}

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        // coursename: Yup.string().required('Please enter courseID name'),
        // courseType: Yup.string().required('Please enter course type'),
        // // courseStatus: Yup.string().required('Please select course status'),
        // duration: Yup.number().required('Please enter course duration'),
        // editorState: Yup.string().required('Please enter course summary'),
        // subCategory: Yup.string().required('Please select course sub category'),
        // courseLevel: Yup.string().required('Please select course level'),
        // category: Yup.string().required('Please select course category'),
        // courseimage: Yup.string().required('Please upload course image'),
        //startdate: Yup.string().required('Please enter course start date')
    }),

    mapPropsToValues: (function (props) {
        console.log(props)
        if (props.history.location.state.questionpaper === undefined) {
            return {
                courseID: '',
                questionPaperID: '',
                sectionID: '',
                questionName: '',
                questionType: '',
                answer: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                scoreForCorrect: '',
                scoreForIncorrect: '',
                difficultyLevel: '',
                questionPart1: '',
                questionPart2: ''
            }
        } else {
            return {
                courseID: props.history.location.state.questionpaper.QuestionBankID,
                questionPaperID: props.history.location.state.questionpaper.QuestionPaperID,
                sectionID: props.history.location.state.questionpaper.SectionID,
                questionType: '',
                difficultyLevel: '',
            }
        }
    }),
    handleSubmit: (payload, { props, state }) => {
        //payload["createdDate"] = moment().format("YYYY/MM/DD HH:mm");
        //payload["createdBy"] = localStorage.getItem("VendorID")
        payload["questionGrading"] = payload["difficultyLevel"];
        console.log(props);

        if (props.createQuestionEsaayReducer.showFillBlanks === true) {
            payload["questionName"] = payload["questionPart1"] + payload["questionPart2"];
        }
        // if(payload["questionPart1"] !== undefined || payload["questionPart1"] !== ""){
        //     payload["questionName"] = payload["questionPart1"] + payload["questionPart2"];
        // }
        console.log(payload);
        // let date1 = payload["startdate"];
        // payload["startdate"] = moment(date1).format("YYYY/MM/DD HH:mm");
        //  questionName,questionType,sectionID,option1,option2,option3,option4,Option5,option6,option7,option8, option9,Option10,scoreForCorrect,scoreForIncorrect,difficultyLevel,questionGrading,questionPaperID,courseID,answer
        props.actionCreateQuestionMcq(payload)

    },
    displayName: 'CreateQuestionMcq',
})(CreateQuestionMcq);
const CreateQuestionMcqForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(CreateQuestionMcqForm)))