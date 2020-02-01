import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { actionStartTest } from '../../actions/actionStartTest';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import combinedStyles from '../../material-ui';
import { ToastContainer } from 'react-toastify';
import 'date-fns';
import moment from 'moment';



export class TakeTest extends Component {
    state = {
        labelWidth: 0,
        gender: 'female'
      };

      componentWillMount = () => {
        console.log(this.props);
        let payload = { "courseID": 104,
        // this.props.history.location.state.course.CourseID,
                        "questionPaperID": 1
                     };
        this.props.actionStartTest(payload);
      }

      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        this.props.setValues({
            ...this.props.values,
            [event.target.name]: event.target.value
          });
      };
      handleGenderChange = event => {
        this.setState({ gender: event.target.value });
      };

      handleDateChange = date => {
        this.setState({ selectedDate: date });
        this.props.setValues({
          ...this.props.values,
          selectedDate: date
        });
      };

  render() {
    const {
      touched,
      errors,
      handleSubmit,
      classes    } = this.props;
    let { startTestReducer } = this.props;
    console.log(this.props);
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
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Courses > Take Test</h6>
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
                  <h3 className="margin-0 padding-0">Question {/*qnumber*/}</h3>
                </div>
                <div className="content">
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="c-formSection">
                    {console.log(startTestReducer.testData)}
                      <div className="c-formSection__grid">
                      <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Q : startTestReducer.testData[0].QuestionName {/*startTestReducer.testData[0].QuestionName*/}</FormLabel>
                        <RadioGroup
                          aria-label="Gender"
                          name="gender"
                          error={errors.gender && touched.gender ? true : false}
                          className={classes.group}
                          value={this.state.gender}
                          onChange={this.handleChange}
                          row
                        >
                        <FormControlLabel value="1" control={<Radio />} label="1"   />
                        <FormControlLabel value= "2" control={<Radio />} label="2"  />
                        {/* <FormControlLabel value="2" {startTestReducer.testData[0].Option3} control={<Radio />} label={startTestReducer.testData[0].Option3}  />
                        <FormControlLabel value= {startTestReducer.testData[0].Option4} control={<Radio />} label={startTestReducer.testData[0].Option4}  /> */}
                        </RadioGroup>
                        {errors.gender &&
                          touched.gender && (
                            <div className="errorMsg">
                              {errors.gender}
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
                        Submit Test
                  </Button>
                    <Button variant="contained" className={[classes.button, classes.buttonSecondary]}>
                        Previous
                    </Button>
                    <Button variant="contained" className={[classes.button, classes.buttonSecondary]}>
                        Review
                    </Button>
                    <Button variant="contained" className={[classes.button, classes.buttonSecondary]}>
                        Next
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

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // firstname: Yup.string().required('Please enter first name').matches(/^[A-Za-z\s '-]+$/, { message : "Only characters and spaces are allowed" , excludeEmptyString: false }),
    // middlename: Yup.string().required('Please enter middle name').matches(/^[A-Za-z\s '-]+$/, { message : "Only characters and spaces are allowed" , excludeEmptyString: false }),
    // lastname: Yup.string().required('Please enter last name').matches(/^[A-Za-z\s '-]+$/, { message : "Only characters and spaces are allowed" , excludeEmptyString: false }),
    // email: Yup.string().email('Please enter a valid email address')
    //   .required('Please enter email address'),
    // mobile: Yup.number('Mobile No must be numerical').required('Please enter personal mobile number'),
    // role: Yup.string().required('Please select role'),
    // vendor: Yup.string().required('Please select vendor'),
    // gender: Yup.string().required('Please choose gender'),
    // userStatus: Yup.string().required('Please select role status'),
    // bio: Yup.string().required('Please fill the description'),
  }),
  mapPropsToValues: () => ({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    mobile: '',
    role: '',
    vendor: '',
    gender: '',
    createdDate:'',
    createdBy:'',
    userStatus: '',
    bio: ''
  }),
  handleSubmit: (payload) => {
    console.log(payload)
   //props.actionStartTest(payload)
   payload["createdDate"] = moment().format("YYYY-MM-DD HH:mm:ss");
   //payload["createdBy"] = localStorage.getItem("VendorID")
  },
  displayName: 'TakeTest',
})(TakeTest);

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({actionStartTest}, dispatch)
}

const TakeTestForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(TakeTestForm)))
