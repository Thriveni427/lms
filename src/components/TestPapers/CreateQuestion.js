// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { withFormik } from 'formik';
// import * as Yup from 'yup';
// import { withRouter, Link } from 'react-router-dom';
// import { bindActionCreators } from 'redux';
// import { withStyles } from '@material-ui/core/styles';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import Button from '@material-ui/core/Button';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import CreateQuestionMcq from './CreateQuestionMcq';
// import combinedStyles from '../../material-ui';
// import { actionCreateQuestion } from '../../actions/actionCreateQuestion';
// import { actionGetCourseList } from '../../actions/actionGetCourseList';
// import 'date-fns';
// import moment from 'moment';
// import { EditorState, convertToRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import '../../../node_modules/dropzone/dist/min/dropzone.min.css'
// import '../../../node_modules/react-dropzone-component/styles/filepicker.css';

// export class CreateQuestion extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             labelWidth: 0,
//             startdate: new Date(),
//             enddate: new Date(),
//             editorState: EditorState.createEmpty(),
//             open: false,
//             fullWidth: true,
//             maxWidth: 'lg',
//         };
//     }

//     handleClickOpen = (event) => {
//         this.setState({ open: true });
//         console.log(event.target);

//         this.setState({ [event.target.name]: event.target.value });
//         this.props.setValues({
//             ...this.props.values,
//             [event.target.name]: event.target.value
//         });
//     };

//     handleClose = () => {
//         this.setState({ open: false });
//     };

//     handleCategoryChange = event => {
//         this.setState({ [event.target.name]: event.target.value });
//         //this.handleClickOpen();
//         this.props.setValues({
//             ...this.props.values,
//             [event.target.name]: event.target.value
//         });
//     };


//     handleStatus = name => event => {
//         this.setState({ [name]: event.target.checked });
//         this.props.setValues({ ...this.props.values, [name]: event.target.checked });
//     };

//     componentDidMount = () => {
//         this.props.actionGetCourseList();
//         //this.props.actionGetCategory.getCategoryData;
//     }

//     render() {
//         const {
//             values,
//             touched,
//             errors,
//             handleSubmit,
//             classes,
//             getCourseListReducer,
//             fullScreen
//         } = this.props;
//         console.log(classes)

//         console.log(this.props);
//         console.log(this.state);

//         return (
//             <React.Fragment>
//                 <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
//                     <div className="container-fluid">
//                         <div className="header-body">
//                             <div className="row align-items-center py-4">
//                                 <div className="col-lg-6 col-6">
//                                     <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Create Question</h6>
//                                 </div>
//                                 <div className="col-lg-6 col-6 text-right">
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="container-fluid mt--6">
//                     <div className="row">
//                         <div className="col">
//                             <div className="card">
//                                 <div className="card-header d-flex align-items-center border-0">
//                                     <h3 className="margin-0 padding-0">Create Question</h3>
//                                 </div>
//                                 <div className="content">
//                                     <form noValidate autoComplete="off" onSubmit={handleSubmit}>
//                                         <div className="c-formSection">
//                                             <div className="c-formSection__grid">
//                                                 <FormControl className={classes.formControl} error={errors.course && touched.course ? true : false}>
//                                                     <InputLabel htmlFor="course">Select Course *</InputLabel>
//                                                     <Select
//                                                         error={errors.course && touched.course ? true : false}
//                                                         fullWidth
//                                                         required
//                                                         value={values.course}
//                                                         onChange={this.handleCategoryChange}
//                                                         inputProps={{
//                                                             name: 'course',
//                                                             id: 'course',
//                                                             classes: { select: classes.textField }
//                                                         }}
//                                                     >
//                                                         <MenuItem value=""><em>None</em></MenuItem>
//                                                         {
//                                                             getCourseListReducer.coursesData.map((arr) => {
//                                                                 return (
//                                                                     <MenuItem value={arr.CourseID}>{arr.Name}</MenuItem>
//                                                                 )
//                                                             })
//                                                         }
//                                                     </Select>
//                                                     {errors.course &&
//                                                         touched.course && (
//                                                             <div className="errorMsg">
//                                                                 {errors.course}
//                                                             </div>
//                                                         )}
//                                                 </FormControl>
//                                             </div>
//                                             <div className="c-formSection__grid">
//                                                 <FormControl className={classes.formControl} error={errors.questionType && touched.questionType ? true : false}>
//                                                     <InputLabel htmlFor="questionType">Question Type *</InputLabel>
//                                                     <Select
//                                                         fullWidth
//                                                         required
//                                                         error={errors.questionType && touched.questionType ? true : false}
//                                                         value={values.questionType}
//                                                         onChange={this.handleClickOpen}
//                                                         inputProps={{
//                                                             name: 'questionType',
//                                                             id: 'questionType',
//                                                             classes: { select: classes.textField }
//                                                         }}
//                                                     >
//                                                         <MenuItem value={1}>Essay/Text Entery</MenuItem>
//                                                         <MenuItem value={2}>Fill In The Blank</MenuItem>
//                                                         <MenuItem value={3}>Matching</MenuItem>
//                                                         <MenuItem value={4}>Multiple Choice</MenuItem>
//                                                         <MenuItem value={5}>True Or False</MenuItem>
//                                                     </Select>
//                                                     {errors.courseType &&
//                                                         touched.courseType && (
//                                                             <div className="errorMsg">
//                                                                 {errors.courseType}
//                                                             </div>
//                                                         )}
//                                                 </FormControl>
//                                             </div>
//                                         </div>
//                                         <div className="c-formSection pt-4 pb-4">
//                                             <Link to="/question"><Button variant="contained" className={[classes.button, classes.buttonSecondary]}>
//                                                 Cancel
//                   </Button>
//                                             </Link>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <div>

//                         <Dialog
//                             fullScreen={fullScreen}
//                             open={this.state.open}
//                             fullWidth={this.state.fullWidth}
//                             maxWidth={this.state.maxWidth}
//                             onClose={this.handleClose}
//                             aria-labelledby="responsive-dialog-title"
//                         >
//                             {/* <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
//                             <DialogContent>
//                                 {/* <DialogContentText>
//               Let Google help apps determine location. This means sending anonymous location data to
//               Google, even when no apps are running.
//             </DialogContentText> */}
//                                 <CreateQuestionMcq />
//                             </DialogContent>
//                             <DialogActions>
//                                 <Button onClick={this.handleClose} color="primary" variant="contained" className={[classes.button, classes.buttonSecondary]}>
//                                     Bhai
//             </Button>
//                                 {/*
//             <Button onClick={this.handleClose} color="primary" autoFocus>
//               Agree
//             </Button> */}
//                             </DialogActions>
//                         </Dialog>
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
//     return bindActionCreators({ actionCreateQuestion, actionGetCourseList }, dispatch)
// }

// const formikEnhancer = withFormik({
//     validationSchema: Yup.object().shape({

//     }),

//     mapPropsToValues: () => ({
//         course: '',
//         questionType: ''
//     }),
//     //   mapPropsToValues: (function (props) {
//     //     if (props.history.location.state === undefined) {
//     //       return {
//     //          course: '',
//     //          questionType: ''
//     //       }
//     //     }
//     //     else {
//     //       return {
//     //         course: props.history.location.state.question.course,
//     //         // questionType: props.history.location.state.question.CourseObjective,
//     //       }
//     //     }
//     //   }),
//     handleSubmit: (payload, { props }) => {
//         payload["editorState"] = draftToHtml(convertToRaw(payload.editorState.getCurrentContent()));
//         payload["createdDate"] = moment().format("YYYY/MM/DD HH:mm");
//         payload["createdBy"] = localStorage.getItem("VendorID")
//         console.log(payload);
//         // let date1 = payload["startdate"];
//         // payload["startdate"] = moment(date1).format("YYYY/MM/DD HH:mm");
//         props.actionCreateQuestion(payload)
//     },
//     displayName: 'CreateQuestion',
// })(CreateQuestion);
// const CreateQuestionForm = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(formikEnhancer)

// export default withRouter((withStyles(combinedStyles)(CreateQuestionForm)))
