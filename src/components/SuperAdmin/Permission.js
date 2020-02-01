// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { withFormik } from 'formik';
// import * as Yup from 'yup';
// import { Link, withRouter } from 'react-router-dom'
// import { bindActionCreators } from 'redux';
// import { withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import FormControl from '@material-ui/core/FormControl';
// import Button from '@material-ui/core/Button';
// import combinedStyles from '../../material-ui';
// //import { actionPermission } from '../../actions/actionPermission';
// import { actionGetCategory } from '../../actions/actionGetCategory';
// import 'date-fns';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import '../../../node_modules/dropzone/dist/min/dropzone.min.css'
// import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
// import { ToastContainer } from 'react-toastify';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

// const styles = theme => ({
//     root: {
//         width: '100%',
//     },
//     heading: {
//         fontSize: theme.typography.pxToRem(15),
//         fontWeight: theme.typography.fontWeightRegular,
//     },
// });


// export class Permission extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             labelWidth: 0
//         };
//     }

//     componentDidMount = () => {
//         this.props.actionGetCategory();
//     }

//     handleCategoryChange = event => {
//         this.setState({ [event.target.name]: event.target.value });
//         this.props.setValues({
//             ...this.props.values,
//             [event.target.name]: event.target.value
//         });
//     };

//     render() {
//         const {
//             values,
//             touched,
//             errors,
//             handleChange,
//             //handleBlur,
//             handleSubmit,
//             classes,
//             editCategoryReducer,
//             getCategoryReducer,
//             history
//         } = this.props;

//         // if (editCategoryReducer.editedCategory === true) {

//         //     setTimeout(function () { history.push({ pathname: '/coursecategory', }); editCategoryReducer.editedCategory = false; }, 2100);
//         // }

//         console.log(this.props);
//         console.log(this.state);
//         return (
//             <React.Fragment>
//                 <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
//                     <div className="container-fluid">
//                         <div className="header-body">
//                             <div className="row align-items-center py-4">
//                                 <div className="col-lg-6 col-6">
//                                     <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Permission</h6>
//                                 </div>
//                                 <div className="col-lg-6 col-6 text-right">
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="container-fluid mt--6">
//                     <ToastContainer autoClose={2000} />
//                     <div className="row">
//                         <div className="col">
//                             <div className="card">
//                                 <div className="card-header d-flex align-items-center border-0">
//                                     <h3 className="margin-0 padding-0">Permission</h3>
//                                 </div>
//                                 <div className="content">
//                                     <form noValidate autoComplete="off" onSubmit={handleSubmit}>
//                                         <div className="c-formSection">
//                                             <div className="c-formSection__grid">
//                                                 <FormControl fullWidth>
//                                                 <FormLabel component="legend">Add </FormLabel>
//                                                     <ExpansionPanel>
//                                                         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//                                                             <Typography className={classes.heading}>Expansion Panel 1</Typography>
//                                                         </ExpansionPanelSummary>
//                                                         <ExpansionPanelDetails>
//                                                         <RadioGroup
//                           aria-label="Gender"
//                           name="gender"
//                           error={errors.gender && touched.gender ? true : false}
//                           className={classes.group}
//                           value={this.state.gender}
//                           onChange={this.handleChange}
//                           row
//                         >
//                         <FormControlLabel value="female" control={<Radio />} label="Female"  />
//                         <FormControlLabel value="male" control={<Radio />} label="Male" />
//                         </RadioGroup>
//                                                         </ExpansionPanelDetails>
//                                                     </ExpansionPanel>
//                                                     {errors.categoryName &&
//                                                         touched.categoryName && (
//                                                             <div classcategoryName="errorMsg">
//                                                                 {errors.categoryName}
//                                                             </div>
//                                                         )}
//                                                 </FormControl>
//                                             </div>

//                                             <div className="c-formSection__grid">
//                                                 <FormControl className={classes.formControl} error={errors.parentID && touched.parentID ? true : false}>
//                                                     <ExpansionPanel>
//                                                         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
//                                                             <Typography className={classes.heading}>Expansion Panel 1</Typography>
//                                                         </ExpansionPanelSummary>
//                                                         <ExpansionPanelDetails>
//                                                             <Typography>
//                                                                 Lorem ipsum dolor
//                                                             </Typography>
//                                                         </ExpansionPanelDetails>
//                                                     </ExpansionPanel>
//                                                     {errors.parentID &&
//                                                         touched.parentID && (
//                                                             <div className="errorMsg">
//                                                                 {errors.parentID}
//                                                             </div>
//                                                         )}
//                                                 </FormControl>
//                                             </div>

//                                         </div>
//                                         <div className="c-formSection pt-4 pb-4">
//                                             <Button
//                                                 variant="contained"
//                                                 className={[classes.button, classes.buttonPrimary]}
//                                                 type="submit"
//                                             >
//                                                 Set Permission
//                                             </Button>
//                                             <Link to="/coursecategory">
//                                                 <Button disabled variant="contained" className={[classes.button, classes.buttonSecondary]}>
//                                                     Cancel
//                                                 </Button>
//                                             </Link>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </React.Fragment>
//         )
//     }
// }

// const mapStateToProps = state => {
//     return state
// }

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({  }, dispatch)   //  actionPermission
// }

// const formikEnhancer = withFormik({
//     validationSchema: Yup.object().shape({
//         // categoryName: Yup.string().required('Please enter category name'),
//         // courseType: Yup.string().required('Please enter category type'),
//         // courseStatus: Yup.string().required('Please enter category status'),
//         // duration: Yup.string().required('Please enter category duration'),
//         // category: Yup.string().required('Please select category category'),
//         // subCategory: Yup.string().required('Please select category sub category'),
//         //startdate: Yup.string().required('Please enter category start date')
//     }),
//     mapPropsToValues: () => ({
//         categoryName: '',
//         parentID: '',
//       }),
//     handleSubmit: (payload, { props }) => {
//         props.actionPermission(payload);
//     },
//     displayName: 'Permission',
// })(Permission);
// const PermissionForm = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(formikEnhancer)

// export default withRouter(withStyles(styles, combinedStyles)(connect(mapStateToProps, { actionGetCategory })(PermissionForm)
// ))