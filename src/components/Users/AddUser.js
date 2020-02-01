import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { addUserAction } from '../../actions/addUserAction';
import { actionGetVendors } from '../../actions/actionGetVendors';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import combinedStyles from '../../material-ui';
import { ToastContainer } from 'react-toastify';
import 'date-fns';
import moment from 'moment';
import { Link } from 'react-router-dom';

let vendorMenu = [
  {value : 1, name: "Administrator"},
  {value : 2, name: "Trainer"},
  {value : 3, name: "Learner"}
]
let administratorMenu = [
  {value : 2, name: "Trainer"},
  {value : 3, name: "Learner"}
]
let trainerMenu = [
  {value : 3, name: "Learner"}
]


export class AddUser extends Component {
    state = {
        labelWidth: 0,
        gender: 'female'
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

      handleDateChange = date => {
        this.setState({ selectedDate: date });
        this.props.setValues({
          ...this.props.values,
          selectedDate: date
        });
      };

    componentDidMount = () => {
        this.props.actionGetVendors();
    }
  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleSubmit,
      classes,
      // getVendorReducer,
    } = this.props;

    console.log("props : ", this.props);

    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    if (userinfo === null) userinfo = [];
    let roleID;
    let vendorName;
    if(userinfo.userType === "admin" || userinfo.userType === "vendor" || userinfo.userType === "trainer"){
    // if(userinfo.userType === "vendor"){
      vendorName = userinfo.vendorName;
      roleID = userinfo.RoleID;
    }

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
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header d-flex align-items-center border-0">
                  <h3 className="margin-0 padding-0">Users</h3>
                </div>
                <div className="content">
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                        <TextField
                          fullWidth
                          error={errors.middlename && touched.middlename ? true : false}
                          id="middlename"
                          label="Middle Name"
                          margin="normal"
                          onChange={handleChange}
                          value={values.middlename}
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.middlename &&
                          touched.middlename && (
                            <div className="errorMsg">
                              {errors.middlename}
                            </div>
                          )}
                      </div>
                      <div className="c-formSection__grid">
                        <TextField
                          fullWidth
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
                      </div>
                      <div className="c-formSection__grid">
                        <TextField
                          fullWidth
                          required
                          error={errors.email && touched.email ? true : false}
                          id="email"
                          label="Email Address"
                          margin="normal"
                          onChange={handleChange}
                          value={values.email}
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.email &&
                          touched.email && (
                            <div className="errorMsg">
                              {errors.email}
                            </div>
                          )}
                      </div>
                      <div className="c-formSection__grid">
                      <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                          aria-label="Gender"
                          name="gender"
                          error={errors.gender && touched.gender ? true : false}
                          className={classes.group}
                          value={this.state.gender}
                          onChange={this.handleChange}
                          row
                        >
                        <FormControlLabel value="female" control={<Radio />} label="Female"  />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                        {errors.gender &&
                          touched.gender && (
                            <div className="errorMsg">
                              {errors.gender}
                            </div>
                          )}
                      </FormControl>

                      </div>
                      <div className="c-formSection__grid">
                        <TextField
                          fullWidth
                          required
                          error={errors.mobile && touched.mobile ? true : false}
                          id="mobile"
                          label="Mobile Number"
                          margin="normal"
                          onChange={handleChange}
                          value={values.mobile}
                          type="mobile"
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.mobile &&
                          touched.mobile && (
                            <div className="errorMsg">
                              {errors.mobile}
                            </div>
                          )}
                      </div>
                      <div className="c-formSection__grid">
                        <FormControl className={classes.formControl} error={errors.role && touched.role ? true : false}>
                          <InputLabel htmlFor="role">Select a role *</InputLabel>
                          <Select
                            fullWidth
                            required
                            error={errors.role && touched.role ? true : false}
                            value={values.role}
                            onChange={handleChange}
                            //onBlur={handleBlur}
                            inputProps={{
                              name: 'role',
                              id: 'role',
                              classes: { select: classes.textField }
                            }}
                          >
                            {/* <MenuItem value={1}>Administrator</MenuItem>
                            <MenuItem value={2}>Trainer</MenuItem>
                            <MenuItem value={3}>Learner</MenuItem> */}

                            {
                             roleID === 1
                             ?
                             administratorMenu.map((item) => {
                               return (
                               <MenuItem value={item.value}>{item.name}</MenuItem>
                               )
                             })
                             :
                             (
                               roleID === 2
                                ?
                                trainerMenu.map((item) => {
                                  return (
                                  <MenuItem value={item.value}>{item.name}</MenuItem>
                                  )
                                })
                                :
                                vendorMenu.map((item) => {
                                  return (
                                  <MenuItem value={item.value}>{item.name}</MenuItem>
                                  )
                                })
                             )
                             
                            }
                            
                          </Select>
                          {errors.role &&
                              touched.role && (
                                <div className="errorMsg">
                                  {errors.role}
                                </div>
                              )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                        <FormControl className={classes.formControl} error={errors.userStatus && touched.userStatus ? true : false}>
                          <InputLabel htmlFor="userStatus">Select Role Status *</InputLabel>
                          <Select
                            fullWidth
                            required
                            error={errors.userStatus && touched.userStatus ? true : false}
                            value={values.userStatus}
                            onChange={handleChange}
                            //onBlur={handleBlur}
                            inputProps={{
                              name: 'userStatus',
                              id: 'userStatus',
                              classes: { select: classes.textField }
                            }}
                          >
                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={0}>InActive</MenuItem>
                          </Select>
                          {errors.userStatus &&
                              touched.userStatus && (
                                <div className="errorMsg">
                                  {errors.userStatus}
                                </div>
                              )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                        <FormControl className={classes.formControl} error={errors.vendor && touched.vendor ? true : false}>
                          

                        <TextField
                            required
                            error={errors.vendor && touched.vendor ? true : false}
                            id="vendor"
                            label="Vendor Name"
                            disabled
                            margin="normal"
                            onChange={handleChange}
                            value={vendorName}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.vendor &&
                            touched.vendor && (
                              <div className="errorMsg">
                                {errors.vendor}
                              </div>
                            )}


                          {/* <InputLabel htmlFor="vendor">Vendor</InputLabel>
                          
                          <Select
                            fullWidth
                            required
                            error={errors.vendor && touched.vendor ? true : false}
                            value={values.vendor}
                            onChange={handleChange}
                            //nBlur={setFieldTouched}
                            // disabled
                            inputProps={{
                              name: 'vendor',
                              id: 'vendor',
                              classes: { select: classes.textField }
                            }}
                          >
                            <MenuItem defaultValue={vendorName} value={vendorID}>{vendorName}</MenuItem>
                            
                          </Select> 
                          {errors.vendor &&
                              touched.vendor && (
                                <div className="errorMsg">
                                  {errors.vendor}
                                </div>
                              )} */}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                        <TextField
                          fullWidth
                          multiline
                          required
                          error={errors.bio && touched.bio ? true : false}
                          id="bio"
                          label="Short description upto 800 charchters"
                          margin="normal"
                          onChange={handleChange}
                          value={values.bio}
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.bio &&
                          touched.bio && (
                            <div className="errorMsg">
                              {errors.bio}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="c-formSection pt-4 pb-4">
                      <Button
                        variant="contained"
                        className={[classes.button, classes.buttonPrimary]}
                        type="submit"
                      >
                        ADD USER
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

// const mapStateToProps = state => {
//   return state
// }

// const mapDispatchToProps = {
//   return bindActionCreators({addUserAction}, dispatch)
// }

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    firstname: Yup.string().required('Please enter first name').matches(/^[A-Za-z\s '-]+$/, { message : "Only characters and spaces are allowed" , excludeEmptyString: false }),
    //middlename: Yup.string().required('Please enter middle name').matches(/^[A-Za-z\s '-]+$/, { message : "Only characters and spaces are allowed" , excludeEmptyString: false }),
    lastname: Yup.string().required('Please enter last name').matches(/^[A-Za-z\s '-]+$/, { message : "Only characters and spaces are allowed" , excludeEmptyString: false }),
    email: Yup.string().email('Please enter a valid email address')
      .required('Please enter email address'),
    mobile: Yup.number('Mobile No must be numerical').required('Please enter personal mobile number'),
    role: Yup.string().required('Please select role'),
    vendor: Yup.string().required('Please select vendor'),
    gender: Yup.string().required('Please choose gender'),
    userStatus: Yup.string().required('Please select role status'),
    bio: Yup.string().required('Please fill the description'),
  }),
  mapPropsToValues: () => ({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    mobile: '',
    role: '',
    vendor: '',
    gender: 'female',
    createdDate:'',
    createdBy:'',
    userStatus: '',
    bio: ''
  }),
  handleSubmit: (payload, { props }) => {
    let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
    if (userinfo === null) userinfo = [];
    console.log(userinfo);
    console.log(payload)
   props.addUserAction(payload)
   payload["createdDate"] = moment().format("YYYY-MM-DD HH:mm:ss");
   payload["createdBy"] = ((userinfo.userType === "admin") ? userinfo.AdminID : (userinfo.userType === "vendor") ? userinfo.vendorId : userinfo.UserID);
   payload["vendor"] = userinfo.vendorId;
  },
  displayName: 'AddUser',
})(AddUser);

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({actionGetVendors, addUserAction}, dispatch)
}

const AddUserForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(AddUserForm)))
