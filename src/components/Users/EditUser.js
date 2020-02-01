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
import { Link } from 'react-router-dom';
import combinedStyles from '../../material-ui';
import { actionEditUserDetails } from './../../actions/actionGetUserDetails';
import { ToastContainer } from 'react-toastify';

export class EditUser extends Component {
  render() {

    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      history,
      editUserReducer,
      classes
    } = this.props;



    if(editUserReducer.editUsers === true){
      history.push({
        pathname: '/users',
      })
    }
    console.log(this.props);
    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Users</h6>
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
                  <h3 className="margin-0 padding-0">Users</h3>
                </div>
                <div className="content">
                  <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <div className="c-formSection">
                      <div className="c-formSection__grid">

                        <FormControl fullWidth>
                          <TextField
                            required
                            error={errors.firstname && touched.firstname ? true : false}
                            id="firstname"
                            label="First Name"
                            margin="normal"
                            onChange={handleChange}
                            value={values.firstname}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.firstname &&
                            touched.firstname && (
                              <div className="errorMsg">
                                {errors.firstname}
                              </div>
                            )}
                        </FormControl>

                      </div>
                      <div className="c-formSection__grid">
                        <FormControl fullWidth>
                          <TextField
                            required
                            error={errors.mi && touched.mi ? true : false}
                            id="mi"
                            label="Middle Name"
                            margin="normal"
                            onChange={handleChange}
                            value={values.mi}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.mi &&
                            touched.mi && (
                              <div className="errorMsg">
                                {errors.mi}
                              </div>
                            )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                        <FormControl fullWidth>
                          <TextField
                            required
                            error={errors.lastname && touched.lastname ? true : false}
                            id="lastname"
                            label="Last Name"
                            margin="normal"
                            onChange={handleChange}
                            value={values.lastname}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.lastname &&
                            touched.lastname && (
                              <div className="errorMsg">
                                {errors.lastname}
                              </div>
                            )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                        <FormControl fullWidth>
                          <TextField
                            required
                            error={errors.emailid && touched.emailid ? true : false}
                            id="emailid"
                            label="Email ID"
                            margin="normal"
                            onChange={handleChange}
                            value={values.emailid}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.emailid &&
                            touched.emailid && (
                              <div className="errorMsg">
                                {errors.emailid}
                              </div>
                            )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                        <FormControl fullWidth>
                          <TextField
                            required
                            error={errors.contactno && touched.contactno ? true : false}
                            id="contactno"
                            label="Contact Number"
                            margin="normal"
                            onChange={handleChange}
                            value={values.contactno}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.contactno &&
                            touched.contactno && (
                              <div className="errorMsg">
                                {errors.contactno}
                              </div>
                            )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                        <FormControl fullWidth>
                          <TextField
                            required
                            error={errors.createddate && touched.createddate ? true : false}
                            id="createddate"
                            label="Created Date"
                            margin="normal"
                            onChange={handleChange}
                            value={values.createddate}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.createddate &&
                            touched.createddate && (
                              <div className="errorMsg">
                                {errors.createddate}
                              </div>
                            )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                        <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="age-simple">Select a role *</InputLabel>
                          <Select
                            required
                            error={errors.role && touched.role ? true : false}
                            onChange={handleChange}
                            value={values.role}
                            onBlur={handleBlur}
                            inputProps={{
                              name: 'role',
                              id: 'role',
                              classes: { select: classes.textField }
                            }}
                          >
                            <MenuItem value={1}>Administrator</MenuItem>
                            <MenuItem value={2}>Trainer</MenuItem>
                            <MenuItem value={3}>Learner</MenuItem>
                          </Select>
                          {errors.role &&
                            touched.role && (
                              <div className="errorMsg">
                                {errors.role}
                              </div>
                            )}
                        </FormControl>
                      </div>
                    </div>
                    <div className="c-formSection pt-4 pb-4">
                      <Button variant="contained" className={[classes.button, classes.buttonPrimary]} type="submit">
                        Edit User
                  </Button>
                  <Link to="/users">
                        <Button variant="contained" className={[classes.button, classes.buttonSecondary]}>
                            CANCEL
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

function mapDispatchToProps(dispatch, state) {
  return  bindActionCreators({actionEditUserDetails},dispatch)

}


const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    firstname: Yup.string().required('Please enter first name'),
    mi: Yup.string().required('Please enter middle name'),
    lastname: Yup.string().required('Please enter last name'),
    emailid: Yup.string().email('Please enter a valid email address')
      .required('Please enter email address'),
    contactno: Yup.string().required('Please enter contactno '),
    createddate: Yup.string().required('Please enter created date'),
    role: Yup.string().required('Please select a role'),

  }),
  mapPropsToValues:(function(props){
    console.log(props.history.location.state.user.RoleID)
    if(props.history.location.state.user === undefined){
      return{
        firstname: '',
        mi: '',
        lastname: '',
        emailid: '',
        contactno: '',
        createddate: '',
        role: ''
      }
    }else{
      return{
        firstname: props.history.location.state.user.FirstName,
        mi: props.history.location.state.user.MI,
        lastname: props.history.location.state.user.LastName,
        emailid: props.history.location.state.user.EmailID,
        contactno: props.history.location.state.user.ContactNo,
        createddate: props.history.location.state.user.CreatedDate,
        // roleid: {
        //   label: props.history.location.state.user.Type,
        //   value:props.history.location.state.user.Type
        // },
        role:props.history.location.state.user.RoleID,
        userid:props.history.location.state.user.UserID
      }
  }
}),

  handleSubmit: (payload, { state, props, setSubmitting, setStatus }) => {
    console.log(JSON.stringify(payload))
    props.actionEditUserDetails(payload);
  },
  displayName: 'EditUser',
})(EditUser);

const EditUserForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(EditUserForm)))
