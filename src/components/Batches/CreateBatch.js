import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { createBatchAction } from './../../actions/createBatchAction';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import combinedStyles from '../../material-ui';
import { ToastContainer } from 'react-toastify';
import { actionGetCourseList } from '../../actions/actionGetCourseList';

export class CreateBatch extends Component {
    state = {
        labelWidth: 0,
        gender: 'female',
        StartDate: new Date(),
        EndDate: new Date(),
      };
    componentDidMount = () => {
        this.props.actionGetCourseList();
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
          EndDate: date
        });
      };

      handleStatus = name => event => {
        this.setState({ [name]: event.target.checked });
        this.props.setValues({...this.props.values, [name]: event.target.checked});
      };

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
  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleSubmit,
      getCourseListReducer,
      classes,
      createBatchReducer,
    } = this.props;

    if(createBatchReducer.createdBatch === true){
        setTimeout(() => {
          this.props.history.push('/batches')
          createBatchReducer.createdBatch = false;
        }, 2000);
      }

    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <ToastContainer autoClose={2000} />
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Create &nbsp;Batch</h6>
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
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header d-flex align-items-center border-0">
                  <h3 className="margin-0 padding-0">Create Batch</h3>
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
                            label="Batch Name"
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
                        <FormControl className={classes.formControl} error={errors.courseID && touched.courseID ? true : false}>
                          <InputLabel htmlFor="courseID">Select Course *</InputLabel>
                          <Select
                            fullWidth
                            // error={errors.courseID && touched.courseID ? true : false}
                            required
                            value={values.courseID}
                            onChange={handleChange}
                            //onBlur={handleBlur}
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
                        <FormControl fullWidth>
                          <TextField
                            required
                            error={errors.seats && touched.seats ? true : false}
                            id="seats"
                            label="Total No. of Seats"
                            margin="normal"
                            onChange={handleChange}
                            value={values.seats}
                            type="number"
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.seats &&
                            touched.seats && (
                              <div className="errorMsg">
                                {errors.seats}
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
                                  name="batchStatus"
                                  checked={values.batchStatus}
                                  onChange={this.handleStatus('batchStatus')}
                                  value="batchStatus"
                                />
                              }
                              label="Batch Status"
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
                                  name="StartDate"
                                  ampm={false}
                                  label="Batch Start date & time"
                                  disablePast
                                  value={values.StartDate}
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
                                  name="EndDate"
                                  ampm={false}
                                  label="Batch End date & time"
                                  disablePast
                                  value={values.EndDate}
                                  onChange={this.handleEndDateChange}
                                />
                            </MuiPickersUtilsProvider>
                          </FormControl>
                        </div>
                        <div className="c-formSection__grid__small--full">
                        <FormControl fullWidth>
                          <TextField
                            required
                            error={errors.Description && touched.Description ? true : false}
                            id="Description"
                            label="Batch Description"
                            margin="normal"
                            onChange={handleChange}
                            value={values.Description}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.Description &&
                            touched.Description && (
                              <div className="errorMsg">
                                {errors.Description}
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
                        Create Batch
                        </Button>
                            <Link to="/batches"><Button variant="contained" className={[classes.button, classes.buttonSecondary]}>
                              Cancel
                        </Button></Link>

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

// const mapStateToProps = state => {
//   return state
// }

// const mapDispatchToProps = {
//   return bindActionCreators({addUserAction}, dispatch)
// }

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Please enter first name').matches(/^[A-Za-z0-9\s '-]+$/, { message : "Only characters, numbers and spaces are allowed" , excludeEmptyString: false }),
    batchStatus: Yup.string().required('Please select role'),
    courseID: Yup.string().required('Please Select the course'),
    StartDate: Yup.string().required('Please Select the Start Date'),
    EndDate: Yup.string().required('Please Select the End Date'),
    seats: Yup.number().required('Please enter the total no of seats'),
    Description: Yup.string().required('Please enter Description')
  }),
  mapPropsToValues: () => ({
    name: '',
    batchStatus: true,
    courseID: '',
    StartDate: new Date(),
    EndDate: new Date(),
    seats: '',
    Description: ''
  }),
  handleSubmit: (payload, { props }) => {
   payload["CreatedDate"] = moment().format("YYYY/MM/DD HH:mm");
   payload["StartDate"] = moment(payload.StartDate).format("YYYY/MM/DD HH:mm");
   payload["EndDate"] = moment(payload.EndDate).format("YYYY/MM/DD HH:mm");
   payload["CreatedBy"] = ((localStorage.getItem("VendorID"))? (localStorage.getItem("VendorID")): 21)
   let x = payload["batchStatus"];
   if(x === true){
    payload["batchStatus"] = "Active";
   }
   else{
    payload["batchStatus"] = "Inactive";
   }
   console.log(payload)
   props.createBatchAction(payload)
  },
  displayName: 'CreateBatch',
})(CreateBatch);

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createBatchAction, actionGetCourseList}, dispatch)
}

const CreateBatchForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(CreateBatchForm)))
