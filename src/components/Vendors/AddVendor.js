import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import combinedStyles from '../../material-ui';
import { ToastContainer } from 'react-toastify';
import { actionAddVendor } from '../../actions/actionAddVendor';
import { Link } from 'react-router-dom'

import countries from './../../helpers/countries'
import indiaState from './../../helpers/IndiaStates'
import indiaCity from './../../helpers/IndiaCities'
import vendorstatus from '../../helpers/vendorstatus'

import 'date-fns';
import moment from 'moment';


export class AddVendor extends Component {
    state = {
        labelWidth: 0,
        gender: 'female'
      };

      handleDateChange = date => {
        this.setState({ selectedDate: date });
        this.props.setValues({
          ...this.props.values,
          selectedDate: date
        });
      };
      // handleDateChange = date => {
      //   this.setState({ selectedDate: date });
      //   this.props.setValues({
      //     ...this.props.values,
      //     selectedDate: date
      //   });
      // };

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
      history,
      addVendorReducer,
      classes
    } = this.props;

	if (addVendorReducer.addedVendor === true) {

		setTimeout(() => { 
      history.push({ 
        pathname: '/vendors', 
        // state: { VendorID: addVendorReducer.addVendorData } 
      });
       addVendorReducer.addedVendor = false;
       }, 2100);
	  }

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
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Vendor</h6>
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
                <div className="card-header d-flex align-items-center">
                  <h3 className="margin-0 padding-0">Add Vendor</h3>
                </div>
                <div className="content">
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="c-formSection">
                      <div className="c-formSection__grid">
                        <FormControl fullWidth>
                          <TextField
							required
							placeholder="Vendor Name"
                            error={errors.vendorName && touched.vendorName ? true : false}
                            id="vendorName"
                            label="Vendor Name"
                            margin="normal"
                            onChange={handleChange}
                            value={values.vendorName}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.vendorName &&
                            touched.vendorName && (
                              <div className="errorMsg">
                                {errors.vendorName}
                              </div>
                            )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                        <TextField
                          fullWidth
						  required
						  placeholder="Contact Number"
                          error={errors.contactNo && touched.contactNo ? true : false}
                          id="contactNo"
                          label="Contact Number"
                          margin="normal"
                          onChange={handleChange}
                          value={values.contactNo}
                          type="mobile"
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.contactNo &&
                          touched.contactNo && (
                            <div className="errorMsg">
                              {errors.contactNo}
                            </div>
                          )}
                      </div>
                      <div className="c-formSection__grid">
                      <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="vendorStatus">Select vendor status</InputLabel>
                          <Select
                            disabled
                            fullWidth
                            required
                            placeholder="Inactive"
                            value={values.vendorStatus}
                            onChange={handleChange}
                            //onBlur={handleBlur}
                            inputProps={{
                              name: 'vendorStatus',
                              id: 'vendorStatus',
                              classes: { select: classes.textField }
                            }}
                          >
                            {/* <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={0}>Inactive</MenuItem> */}
                            {vendorstatus.map((list,index) =>(
                              <MenuItem key={index} value={list}>
                              {list}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                        <TextField
                          fullWidth
						  required
						  placeholder="Adress Line 1"
                          error={errors.addressLine1 && touched.addressLine1 ? true : false}
                          id="addressLine1"
                          label="Enter Your Address 1"
                          margin="normal"
                          onChange={handleChange}
                          value={values.addressLine1}
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.addressLine1 &&
                          touched.addressLine1 && (
                            <div className="errorMsg">
                              {errors.addressLine1}
                            </div>
                          )}
                      </div>
                      <div className="c-formSection__grid">
                        <TextField
                          fullWidth
                          required
                          error={errors.addressLine2 && touched.addressLine2 ? true : false}
						  id="addressLine2"
						  placeholder="Adress Line 2"
                          label="Enter Your Address 2"
                          margin="normal"
                          onChange={handleChange}
                          value={values.addressLine2}
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.addressLine2 &&
                          touched.addressLine2 && (
                            <div className="errorMsg">
                              {errors.addressLine2}
                            </div>
                          )}
                      </div>
                      {/* <div className="c-formSection__grid">
                      <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                        required
                          aria-label="Gender"
                          name="gender"
                          className={classes.group}
                          value={this.state.gender}
                          onChange={this.handleChange}
                          row
                        >
                        <FormControlLabel value="female" control={<Radio />} label="Female"  />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                      </FormControl>

                      </div> */}
                      <div className="c-formSection__grid">
                      <FormControl className={classes.formControl} error={errors.country && touched.country ? true : false}>
                          <InputLabel htmlFor="country">Select your country *</InputLabel>
                          <Select
                            disabled
                            fullWidth
                            required
                            value={values.country}
                            onChange={handleChange}
                            //onBlur={handleBlur}
                            inputProps={{
                              name: 'country',
                              id: 'country',
                              classes: { select: classes.textField }
                            }}
                          >
                          {countries.map((list,index) =>(
                              <MenuItem key={index} value={list}>
                              {list}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.country &&
                              touched.country && (
                                <div className="errorMsg">
                                  {errors.country}
                                </div>
                              )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                      <FormControl className={classes.formControl} error={errors.state && touched.state ? true : false}>
                          <InputLabel htmlFor="state">Select your state *</InputLabel>
                          <Select
                            fullWidth
                            required
                            value={values.state}
                            onChange={handleChange}
                            //onBlur={handleBlur}
                            inputProps={{
                              name: 'state',
                              id: 'state',
                              classes: { select: classes.textField }
                            }}
                          >
                            {indiaState.map((list,index) =>(
                              <MenuItem key={index} value={list}>
                              {list}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.state &&
                              touched.state && (
                                <div className="errorMsg">
                                  {errors.state}
                                </div>
                              )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                      <FormControl className={classes.formControl} error={errors.city && touched.city ? true : false}>
                          <InputLabel htmlFor="city">Select your city *</InputLabel>
                          <Select
                            fullWidth
                            required
                            value={values.city}
                            onChange={handleChange}
                            //onBlur={handleBlur}
                            inputProps={{
                              name: 'city',
                              id: 'city',
                              classes: { select: classes.textField }
                            }}
                          >
                          {indiaCity.map((list,index) =>(
                              <MenuItem key={index} value={list}>
                              {list}
                              </MenuItem>
                            ))}
                          </Select>
                          {errors.city &&
                              touched.city && (
                                <div className="errorMsg">
                                  {errors.city}
                                </div>
                              )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                        <TextField
                          fullWidth
						  required
						  placeholder="Zip Code"
                          error={errors.zipCode && touched.zipCode ? true : false}
                          id="zipCode"
                          label="Zip Code"
                          margin="normal"
                          onChange={handleChange}
                          value={values.zipCode}
                          type="zipCode"
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.zipCode &&
                          touched.zipCode && (
                            <div className="errorMsg">
                              {errors.zipCode}
                            </div>
                          )}
                      </div>
                      <div className="c-formSection__grid">
                        <TextField
                          fullWidth
                          required
                          error={errors.emailid && touched.emailid ? true : false}
						  id="emailid"
						  placeholder="Email ID"
                          label="Email ID"
                          margin="normal"
                          onChange={handleChange}
                          value={values.emailid}
                          type="email"
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.emailid &&
                          touched.emailid && (
                            <div className="errorMsg">
                              {errors.emailid}
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
                   Create Vendor
                  </Button>
                  <Link to="/vendors" >
                      <Button variant="contained" className={[classes.button, classes.buttonSecondary]}>
                      Cancel
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
    vendorName: Yup.string().required('Please enter vendor name').matches(/^[A-Za-z\s '-]+$/, { message : "Only characters and spaces are allowed" , excludeEmptyString: false }),
    contactNo: Yup.number('Contact No must be numerical').min(100, 'Minimum 3 numbers are required').max(999999999999, 'Maximum 12 numbers are allowed').required('Please enter personal contact number'),
    //vendorStatus: Yup.string().required('Please enter vendor status'),
    emailid: Yup.string().email('Please enter a valid email address')
      .required('Please enter email address'),
    addressLine1: Yup.string().required('Please enter address 1'),
    addressLine2: Yup.string().required('Please enter address 2'),
    country: Yup.string().required('Please select country'),
    vendorStatus: Yup.string().required('Please select vendorStatus'),
    state: Yup.string().required('Please select state'),
    city: Yup.string().required('Please select city'),
    zipCode: Yup.number().min(100000, 'Minimum 6 numbers are required').max(999999, 'max 6 numbers allowed').required('Please enter zipcode'),
  }),
  mapPropsToValues: () => ({
    vendorName: '',
    contactNo: '',
    vendorStatus: 'Active',
    emailid: '',
    addressLine1: '',
    addressLine2: '',
    country: 'India',
    state: '',
    city: '',
    zipCode: '',
    createdDate: '',
    createdBy: ''
  }),
  handleSubmit: (payload, { props }) => {
    payload["createdDate"] = moment().format("YYYY/MM/DD hh:mm");
    payload["createdBy"] = 5;
    payload.vendorStatus = "1";
    console.log(payload)
   props.actionAddVendor(payload)
  },
  displayName: 'AddVendor',
})(AddVendor);

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({actionAddVendor}, dispatch)
}

const AddVendorForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(AddVendorForm)))
