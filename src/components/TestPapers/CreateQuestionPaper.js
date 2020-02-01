import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreateQuestionPaper } from '../../actions/actionCreateQuestionPaper';
import { actionGetCourseList } from '../../actions/actionGetCourseList';
import { actionGetMaterialSection } from '../../actions/actionGetMaterial';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import combinedStyles from '../../material-ui';
import { ToastContainer } from 'react-toastify';
import 'date-fns';
import moment from 'moment';

export class CreateQuestionPaper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: [],
            showSuccess: false,
            statusMessage: "",
            fetching: false,
            labelWidth: 0
        }
    }
    handleCategoryChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.setValues({
          ...this.props.values,
          [event.target.name]: event.target.value
        });
        this.props.actionGetMaterialSection({"courseID": event.target.value});
      };

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.setValues({
            ...this.props.values,
            [event.target.name]: event.target.value
          });
      };
      
      handleEdit = (row) => {
        this.props.history.push({
          pathname: '/question',
          state: { questionpaper: row }
        })
        console.log(row);
      }

      handleBack = (row) => {
        this.props.history.goBack();
        // ({
        //   pathname: '/question',
        //   state: { questionpaper: row }
        // })
        console.log(row);
      }

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
    }
  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleSubmit,
      getCourseListReducer,
      getCourseSectionReducer,
      createQuestionPaperReducer,
      classes,
      history,
    } = this.props;

    console.log(this.props);

    if(createQuestionPaperReducer.createdQuestionPaper === true){
        setTimeout(function(){ history.goBack();
            createQuestionPaperReducer.createdQuestionPaper = false; }, 1000);
      }
    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <ToastContainer autoClose={2000} />
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Create Question Paper</h6>
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
                  <h3 className="margin-0 padding-0">Create Question Paper</h3>
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
                                        getCourseListReducer.coursesData.map((arr) => {
                                            return(
                                                <MenuItem value={arr.CourseID}>{arr.CourseName}</MenuItem>
                                                )})
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
                            {}
                            {
                                ((typeof getCourseSectionReducer.SectionsData !== 'undefined' && getCourseSectionReducer.SectionsData.length > 0)?
                                (getCourseSectionReducer.SectionsData.map((arr) => {
                                    return(
                                        <MenuItem value={arr.SectionID}>{arr.SectionName}</MenuItem>
                                        )})):<MenuItem value=""><em>None</em></MenuItem>)
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
                            type = "number"
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
                            label="Duration (Mention Hours/Days/Months)"
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
                        ADD Question Paper
                      </Button>
                      {/* <Link to="/questionpaper"> */}
                      <Button onClick={this.handleBack} variant="contained" className={[classes.button, classes.buttonSecondary]}>
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

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // categoryName: Yup.string().required('Please enter first name').matches(/^[A-Za-z\s '-]+$/, { message : "Only characters and spaces are allowed" , excludeEmptyString: false }),
    // categoryID: Yup.string().required('Please select Parent')
  }),
  // mapPropsToValues: () => ({
  //   questionPaperName: '',
  //   categoryID: '',
  //   marks: '',
  //   duration: '',
  //   status: '',
  //   courseID:'',
  //   sectionID:'',

  // }),
  mapPropsToValues:(function(props){
    console.log(props.history.location.state);
    
    if(props.history.location.state.category === undefined){
      return{
        questionPaperName: '',
        categoryID: '',
        marks: '',
        duration: '',
        status: '',
        courseID:'',
        sectionID:'',
       }
    }
    else{
        return{
            questionPaperName: '',
            // categoryID: '',
            marks: '',
            duration: '',
            status: '',
            courseID:'',
            sectionID:'',
          categoryName: props.history.location.state.category.CategoryName,
          categoryID: props.history.location.state.category.CategoryID,
          createdDate: props.history.location.state.category.CreatedDate,
          createdBy: props.history.location.state.category.CreatedBy,
          parentID: props.history.location.state.category.ParentID
        }
    }
}),
  handleSubmit: (payload, { props }) => {
    // console.log(payload);
    payload["createdDate"] = moment().format("YYYY-MM-DD HH:mm:ss");
    let vendorID = localStorage.getItem("VendorID");
    payload["createdBy"] = ( ((vendorID === undefined) || (vendorID === 0) || (vendorID === null )) ? 1 : vendorID);
    payload["courseID"] = props.history.location.state.course.courseID; //"James Bond";
    payload["status"] = "Active";
    console.log(payload);
    props.actionCreateQuestionPaper(payload);
   //actions.resetForm();
  },

  displayName: 'CreateQuestionPaper',
})(CreateQuestionPaper);

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({actionGetCourseList, actionGetMaterialSection, actionCreateQuestionPaper}, dispatch)
}

const CreateQuestionPaperForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter(withStyles(combinedStyles)(connect(mapStateToProps, {actionCreateQuestionPaper})(CreateQuestionPaperForm)
))