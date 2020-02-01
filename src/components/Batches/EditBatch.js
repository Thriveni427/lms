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
import { ToastContainer } from 'react-toastify';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';


import combinedStyles from '../../material-ui';
import { actionEditBatch } from '../../actions/actionEditBatch';
import { actionGetCourseList } from '../../actions/actionGetCourseList';


export class EditBatch extends Component {
    state = {
        labelWidth: 0,
        StartDate: null,
        EndDate: null,
      };

      componentDidMount = () => {
        this.props.actionGetCourseList();
    }

      handleStartDateChange = date => {
        this.setState({ selectedDate: date });
        this.props.setValues({
          ...this.props.values,
          StartDate: moment(date).format("YYYY-MM-DD HH:mm") 
        });
      };
      
      handleEndDateChange = date => {
        this.setState({ selectedDate: date });
        this.props.setValues({
          ...this.props.values,
          EndDate: moment(date).format("YYYY-MM-DD HH:mm") 
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
      handleNew = (e) => {
        e.preventDefault()
        this.props.history.push({
          pathname: '/batches',
        })
      }
  render() {

    const {
      values,
      touched,
      errors,
      handleChange,
      handleSubmit,
      history,
      editBatchReducer,
      getCourseListReducer,
      classes,
    } = this.props;

    if (editBatchReducer.editedBatch === true) {
      setTimeout(function () {
        history.push({pathname: '/batches',})
        editBatchReducer.editedBatch = false;
      }, 1100);
      
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
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Batchs > Edit Batch</h6>
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
        <ToastContainer
          autoClose={2000}
        />
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header d-flex align-items-center border-0">
                  <h3 className="margin-0 padding-0">Edit Batch</h3>
                </div>
                <div className="content">
                  <form onSubmit={handleSubmit} noValidate autoComplete="off">
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
                    </div>
                    <div className="c-formSection pt-4 pb-4">
                      <Button variant="contained" className={[classes.button, classes.buttonPrimary]} type="submit">
                        Edit Batch
                  </Button>
                      <Button onClick={(e) => this.handleNew(e)} variant="contained" className={[classes.button, classes.buttonSecondary]} type="reset">
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

function mapDispatchToProps(dispatch) {
  return  bindActionCreators({actionGetCourseList,actionEditBatch},dispatch)

}


const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // vendorName: Yup.string().required('Please enter first name'),
    // mi: Yup.string().required('Please enter middle name'),
    // lastname: Yup.string().required('Please enter last name'),
    // emailid: Yup.string().email('Please enter a valid email address').required('Please enter email address'),
    // contactNo: Yup.string().required('Please enter contactno '),
    // createddate: Yup.string().required('Please enter created date'),
    // role: Yup.string().required('Please select a role'),

  }),
  mapPropsToValues:(function(props){
    if(props.history.location.state === undefined){
      return{
        name: '',
        courseID: '',
        seats: '',
        batchStatus: '',
        StartDate: '',
        EndDate: '',
        CreatedDate: '',
        CreatedBy:'',
        BatchID:''
       
      }
    }else{
      return{
        name: props.history.location.state.batch.BatchName,
        courseID: props.history.location.state.batch.CourseID,
        batchStatus:((props.history.location.state.batch.BatchStatus === "Active")?true:false),
        StartDate: props.history.location.state.batch.StartDate,
        EndDate: moment(props.history.location.state.batch.EndDate).format("YYYY-MM-DD HH:mm"),
        seats: props.history.location.state.batch.Seats,
        CreatedDate: props.history.location.state.batch.CreatedDate,
        CreatedBy:props.history.location.state.batch.VendorName,
        BatchID: props.history.location.state.batch.BatchID
      }
  }
}),

  handleSubmit: (payload, { props }) => {
    // payload["StartDate"] = moment(payload.StartDate).format("YYYY/MM/DD HH:mm");
    // payload["EndDate"] = moment(payload.EndDate).format("YYYY/MM/DD HH:mm");
   let x = payload["batchStatus"];
   if(x === true){
    payload["batchStatus"] = "Active";
   }
   else{
    payload["batchStatus"] = "Inactive";
   }
    
    console.log(JSON.stringify(payload))
    props.actionEditBatch(payload);
  },
  displayName: 'EditBatch',
})(EditBatch);

const EditBatchForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(EditBatchForm)))
