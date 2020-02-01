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
import { Link, withRouter } from 'react-router-dom'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { actionEditVendorDetails } from '../../actions/actionEditVendorDetails';

import countries from './../../helpers/countries'
import indiaState from './../../helpers/IndiaStates'
import indiaCity from './../../helpers/IndiaCities'
// import vendorstatus from '../../helpers/vendorstatus'


import combinedStyles from '../../material-ui';
import { ToastContainer } from 'react-toastify';

export class EditVendor extends Component {
  componentDidMount = () => {
    console.log(this.props.history.location.state);
    
}
  render() {

    const {
      values,
      touched,
      errors,
      handleChange,
      handleSubmit,
      history,
      editVendorReducer,
      classes,
    } = this.props;

    if (editVendorReducer.editedVendors === true) {

      setTimeout(function () { history.push({ pathname: '/vendors', }); editVendorReducer.editedVendors = false; }, 2100);
    }

    console.log(this.props);
    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Vendors > Edit Vendor</h6>
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
                  <h3 className="margin-0 padding-0">Edit Vendor</h3>
                </div>
                <div className="content">
                  <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <div className="c-formSection">
                      <div className="c-formSection__grid">

                        <FormControl fullWidth>
                          <TextField
                            required
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
                          <InputLabel htmlFor="vendorStatus">Select vendor status *</InputLabel>
                          <Select
                            fullWidth
                            required
                            value={values.vendorStatus}
                            onChange={handleChange}
                            //onBlur={handleBlur}
                            inputProps={{
                              name: 'vendorStatus',
                              id: 'vendorStatus',
                              classes: { select: classes.textField }
                            }}
                          >
                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={0}>Inactive</MenuItem>
                          </Select>
                          {errors.vendorStatus &&
                              touched.vendorStatus && (
                                <div className="errorMsg">
                                  {errors.vendorStatus}
                                </div>
                              )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid">
                        <TextField
                          fullWidth
                          required
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
                      <FormControl className={classes.formControl}>
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
                      <FormControl className={classes.formControl}>
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
                      <FormControl className={classes.formControl}>
                          <InputLabel htmlFor="city">Select your city *</InputLabel>
                          <Select
                            fullWidth
                            required
                            error={errors.city && touched.city ? true : false}
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
                          disabled
                          error={errors.emailid && touched.emailid ? true : false}
                          id="emailid"
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
                      <Button variant="contained" className={[classes.button, classes.buttonPrimary]} type="submit">
                        Update
                  </Button>
                  <Link to="/vendors" >
                      <Button variant="contained" className={[classes.button, classes.buttonSecondary]} type="reset">
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

const mapStateToProps = state => {
  return state
}

function mapDispatchToProps(dispatch) {
  return  bindActionCreators({actionEditVendorDetails},dispatch)

}


const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    vendorName: Yup.string().required('Please enter first name'),
    // mi: Yup.string().required('Please enter middle name'),
    // lastname: Yup.string().required('Please enter last name'),
    // emailid: Yup.string().email('Please enter a valid email address').required('Please enter email address'),
    // contactNo: Yup.string().required('Please enter contactno '),
    // createddate: Yup.string().required('Please enter created date'),
    // role: Yup.string().required('Please select a role'),

  }),
  mapPropsToValues:(function(props){
    console.log(props);
    // console.log("props.history.location.state");
    console.log(props.history.location.state.vendor);
    if(props.history.location.state === undefined){
      return{
        vendorName: '',
        vendorStatus: '',
        addressLine1: '',
        addressLine2: '',
        country:'',
        state:'',
        city: '',
        zipCode:'',
        emailid: '',
        contactNo: '',
        VendorID: ''
      }
    }else{
      return{
        vendorName: props.history.location.state.vendor.VendorName,
        vendorStatus: ((props.history.location.state.vendor.VendorStatus === "1") ? "Active" : "Inactive"),
        addressLine1:props.history.location.state.vendor.AddressLine1,
        addressLine2:props.history.location.state.vendor.AddressLine2,
        country:props.history.location.state.vendor.Country,
        state:props.history.location.state.vendor.State,
        city:props.history.location.state.vendor.City,
        zipCode:props.history.location.state.vendor.ZipCode,
        emailid: props.history.location.state.vendor.EmailID,
        contactNo: props.history.location.state.vendor.ContactNo,
        // createddate: props.history.location.state.vendor.CreatedDate,
        // roleid: {
        //   label: props.history.location.state.vendor.Type,
        //   value:props.history.location.state.vendor.Type
        // },
        // role:props.history.location.state.vendor.RoleID,
        VendorID:props.history.location.state.vendor.VendorID
      }
  }
}),

  handleSubmit: (payload, { props }) => {
    let x = payload["vendorStatus"];
    delete payload["vendorStatus"];
    payload["vendorStatus"] = ((x === "Active") ? "1" : "0");
    console.log(JSON.stringify(payload))
    props.actionEditVendorDetails(payload);
  },
  displayName: 'EditVendor',
})(EditVendor);

const EditVendorForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(EditVendorForm)))