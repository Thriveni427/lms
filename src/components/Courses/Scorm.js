import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
//import { ScormAction } from '../../actions/ScormAction';
//import { actionGetVendors } from '../../actions/actionGetVendors';
import { withStyles } from '@material-ui/core/styles';
//import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
//import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
import combinedStyles from '../../material-ui';
//import { ToastContainer } from 'react-toastify';
import 'date-fns';
import moment from 'moment';
import MediaUpload from '../ContentLibrary/MediaUpload';
import { IconButton } from '@material-ui/core';
import DesktopWindows from '@material-ui/icons/DesktopWindows';
import Tablet from '@material-ui/icons/Tablet';
import MobileScreenShare from '@material-ui/icons/MobileScreenShare';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
    verticalLine: {
        borderLeft: 6,
        height: 500,
        color: '#00ff00',
    }
});

export class Scorm extends Component {
    state = {
        labelWidth: 0,
        desktop: '',
        tablet: '',
        mobile: '',
        completed: false,
        value: '',
    };

    //   handleChange = event => {
    //     this.setState({ [event.target.name]: event.target.value });
    //     this.props.setValues({
    //         ...this.props.values,
    //         [event.target.name]: event.target.value
    //       });
    //   };


    handleFiles = files => {
        console.log(files)
        this.props.setValues({
            ...this.props.values,
            files: files
        });
    }
    render() {
        const {
            handleSubmit,
            classes,
        } = this.props;

        console.log(this.props);
        return (
            <React.Fragment>
                <div className="createFolder col mb-4 mb-4">
                    <Card className="createFolder__card">
                        <CardContent className="createFolder__content">
                            <Typography component="h5" variant="h5" className="createFolder__title">
                                SCORM
                            </Typography>
                            <Paper className="createFolder__paper player-uploader">
                                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                                    <div className="video-source">
                                        <div className="row mt-5">
                                            <div className="col-md-8 align-items-center">
                                                <MediaUpload
                                                    completed={this.state.completed}
                                                    handleFiles={this.handleFiles}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="c-formSection__grid--full mb-5">


                                                <div className="c-formSection__grid--full">
                                                    <div className="c-formSection__grid__small ">
                                                        <FormControl component="fieldset" >
                                                            <FormLabel component="legend"></FormLabel>

                                                            <h4>
                                                                <IconButton >
                                                                    <DesktopWindows />
                                                                </IconButton>
                                                                Desktop</h4>
                                                            <RadioGroup
                                                                aria-label="Gender"
                                                                name="gender"
                                                                //error={errors.gender && touched.gender ? true : false}
                                                                className={"c-formSection__grid__small--full"}
                                                            //value={values.gender}
                                                            //onChange={this.handleChange}
                                                            //row
                                                            >
                                                                <FormControlLabel value="1" control={<Radio color="primary" />} label="Play inline" />
                                                                <FormControlLabel value="2" control={<Radio color="primary" />} label="Play in Lightbox" />
                                                                <FormControlLabel value="3" control={<Radio color="primary" />} label="Full Screen" />
                                                                <FormControlLabel value="4" control={<Radio color="primary" />} label="Play in new window" />
                                                            </RadioGroup>

                                                        </FormControl>

                                                    </div>

                                                    {/* <hr width="1" size="500"></hr> */}
                                                    <div className="c-formSection__grid__small verticalLine">
                                                        <FormControl component="fieldset" >
                                                            <FormLabel component="legend"></FormLabel>
                                                            <h4>
                                                                <IconButton >
                                                                    <Tablet />
                                                                </IconButton>
                                                                Tablet </h4>
                                                            <RadioGroup
                                                                aria-label="Gender"
                                                                name="gender"
                                                                //error={errors.gender && touched.gender ? true : false}
                                                                className={"c-formSection__grid__small--full"}
                                                            //value={values.gender}
                                                            //onChange={this.handleChange}
                                                            //row
                                                            >
                                                                <FormControlLabel value="5" control={<Radio color="primary" />} label="Full Screen" />
                                                                <FormControlLabel value="6" control={<Radio color="primary" />} label="Play in new window" />
                                                            </RadioGroup>

                                                        </FormControl>

                                                    </div>
                                                    <div className="c-formSection__grid__small">
                                                        <FormControl component="fieldset" >
                                                            <FormLabel component="legend"></FormLabel>
                                                            <h4>
                                                                <IconButton >
                                                                    <MobileScreenShare />
                                                                </IconButton>
                                                                Mobile App</h4>
                                                            <RadioGroup
                                                                aria-label="Gender"
                                                                name="gender"
                                                                //error={errors.gender && touched.gender ? true : false}
                                                                className={"c-formSection__grid__small--full"}
                                                            //value={values.gender}
                                                            //onChange={this.handleChange}
                                                            //row
                                                            >
                                                                <FormControlLabel value="7" control={<Radio color="primary" />} label="Full Screen" />
                                                                <FormControlLabel value="8" control={<Radio color="primary" />} label="Disable Mobile Play" />
                                                            </RadioGroup>

                                                        </FormControl>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        className={[classes.button, classes.buttonPrimary]}
                                    >
                                        UPDATE SCORM
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={[classes.button, classes.buttonSecondary]}
                                    >
                                        CANCEL
                                    </Button>
                                </form>
                            </Paper>
                        </CardContent>
                    </Card>
                </div>

            </React.Fragment>
        )
    }
}

// const mapStateToProps = state => {
//   return state
// }

// const mapDispatchToProps = {
//   return bindActionCreators({ScormAction}, dispatch)
// }

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
        gender: 'female',
        createdDate: '',
        createdBy: '',
        userStatus: '',
        bio: ''
    }),
    handleSubmit: (payload) => {
        console.log(payload)
        //props.actionScorm(payload)
        payload["createdDate"] = moment().format("YYYY-MM-DD HH:mm:ss");
        payload["createdBy"] = localStorage.getItem("VendorID")
    },
    displayName: 'Scorm',
})(Scorm);

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}

const ScormForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(formikEnhancer)

export default withRouter(withStyles(styles, combinedStyles)(ScormForm))
