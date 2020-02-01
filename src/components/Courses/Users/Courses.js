import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { FormControl, FormLabel, IconButton, Button } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Share from '@material-ui/icons/Share';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';


import combinedStyles from '../../../material-ui';
import UsersShare from '../../Courses/Users/UsersShare';
import {
  handleAllCourse, handleRecommendedCourse, handleAssignedCourse, hideAllCourse,
  hideRecommendedCourse, hideAssignedCourse, actionGetAssignedCourses, actionGetAllCourses
} from '../../../actions/Courses/User/actionGetUserCourses';
import { actionGetCourseList } from '../../../actions/actionGetCourseList';
import { actionSetFavoriteIcon } from '../../../actions/actionSetFavoriteIcon';
//import Assessment from '@material-ui/icons/Assessment'


export class Courses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      courseType: "Enrolled Courses",
      toggle: false,
      // showAllCourses: false,
      showAssignedCourses: true,
      showRecommendedCourses: false,
      favoriteList: {},
      open: false,
      fullWidth: true,
      singleShare: []
    };
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  handleAllCourses = () => {
    this.setState({
      showAllCourses: true,
      showAssignedCourses: false,
      showRecommendedCourses: false
    }, () => {
      this.props.actionGetAllCourses();
      this.props.handleAllCourse(this.state.showAllCourses);
    });
  }
  handleAssignedCourses = () => {
    let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
    if (userinfo === null) userinfo = [];
    this.setState({
      // showAllCourses: false,
      showAssignedCourses: true,
      showRecommendedCourses: false
    }, () => {
      let userID = ((userinfo.UserID !== undefined) ? userinfo.UserID : 159);
      this.props.actionGetAssignedCourses(userID);
      this.props.handleAssignedCourse(this.state.showAssignedCourses);
    });
  }
  handleRecommendedCourses = () => {
    this.setState({
      // showAllCourses: false,
      showAssignedCourses: false,
      showRecommendedCourses: true
    }, () => {
      this.props.handleRecommendedCourse(this.state.showRecommendedCourses);
    });
  }

  handleLike = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.setValues({
      ...this.props.values,
      [event.target.name]: event.target.value
    });
  }

  handleFavaouriteData = (data) => {
    console.log(data);
    let obj = {};
    data.map((course, i) => {
      obj[i] = course.Favorite;
      return null;
    })

    this.setState({
      favoriteList: obj
    }, () => {
      console.log(this.state.favoriteList);
    })

  }

  handleLike = (e, id, EnrolledID) => {
    e.preventDefault();

    let obj = {
      ...this.state.favoriteList,
      [id]: (this.state.favoriteList[id] === 1 ? 0 : 1)
    };

    this.setState({
      favoriteList: obj
    }, () => {
      console.log(obj);
      console.log(this.state);
    });

    let payload = {
      enrolledID: EnrolledID,
      favorite: (this.state.favoriteList[id] === 1 ? 0 : 1)
    }
    console.log(payload);
    this.props.actionSetFavoriteIcon(payload);
  };
  
  handleDetails =(e, row)=> {

    if(e !== undefined || e !== null){
      e.preventDefault();
    }
    // let reqQuery = {
    //   "enrolledID": row.EnrolledID,
    //   "joiningStatus": "Enrolled"
    // }

    if (row.JoiningStatus === 'Assigned') {
      this.props.history.push({
        pathname: '/userscoursecontent',
        state: { courseDetail: row }
      })
      // axios.post(`${GLOBAL.API_HOST}/enrollCourse`, reqQuery)
      //   .then(() => {
      //     toast.success("Enrolled Successfully");
      //     this.props.actionGetAllCourses();
      //     this.setState({
      //       // showAllCourses: true,
      //       showAssignedCourses: true
      //     })
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    }
    else if (row.JoiningStatus === 'Completed') {
      this.props.history.push({
        // pathname: '/userscoursedetails',
        pathname: '/userscoursecontent',
        state: { courseDetail: row }
      })
    }
    else {
      this.props.history.push({
        pathname: '/userscoursecontent',
        state: { courseDetail: row }
      })
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.setValues({
      ...this.props.values,
      [event.target.name]: event.target.value
    });

    switch (event.target.value) {
      case "All Courses":
        this.handleAllCourses();
        break;
      case "Enrolled Courses":
        this.handleAssignedCourses();
        break;
      case "Recommended Courses":
        this.handleRecommendedCourses();
        break;
      default:
        break;
    }
  }
  handleClickOpen = (event, row) => {
    this.setState({
      open: true,
      singleShare: row
    });
  };
  handleCloseBtn = () => {
    this.setState({ open: false });
  };
  componentDidMount = () => {
    // this.props.actionGetCourseList();
    // this.handleAllCourses();
    this.handleAssignedCourses();
  }
  render() {
    const {
      getUserCoursesReducer,
      classes,
      // values,
      fullScreen,

    } = this.props;

    if(getUserCoursesReducer.gotAssignedCourses === true) {
      this.handleFavaouriteData(getUserCoursesReducer.courseData);
      getUserCoursesReducer.gotAssignedCourses = false
    }

    // if (getUserCoursesReducer.gotAllCourses === true) {
    //   this.handleFavaouriteData(getUserCoursesReducer.courseData);
    //   getUserCoursesReducer.gotAllCourses = false
    // }

    let { favoriteList } = this.state;
    console.log(this.props);
    console.log(this.state);

    return (
      <React.Fragment>
        <div className="container-fluid ">
          <ToastContainer autoClose={2000} />
          <div className="row courseSetup">
            <div className="col">
              <div className="">
                <div className="  col-lg-6 align-items-center border-0 mt-3">
                  <div style={{ flexBasis: 150 }}>
                    <div className="row">
                      <div className="col-xs-3 ">  <h2 className="myCouAlign">My Courses</h2></div>
                      {/* <div className="col-xs-7">
                        <div className="mt-2">
                          <FormControl fullWidth className="createFolder__formControl">
                            <RadioGroup
                              aria-label="Gender"
                              name="gender1"
                              row
                              className={classes.group}
                              value={values.gender}
                              defaultValue="All Courses"
                              onChange={this.handleChange}
                            >
                              <FormControlLabel value="All Courses" control={<Radio />} label="All Courses" />
                              <FormControlLabel value="Enrolled Courses" control={<Radio />} label="Enrolled Courses" />
                              <FormControlLabel value="Recommended Courses" control={<Radio />} label="Recommended Courses" />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* {getUserCoursesReducer.showAllCourses && <Scorm courseDetail={1} />}
                                {getUserCoursesReducer.showAssignedCourses && <Scorm courseDetail={1} />}
                                {getUserCoursesReducer.showRecommendedCourses && <Scorm courseDetail={1} />} */}
                <div className=" mt-3">
                  <div className="row  mb-5">
                    {
                      console.log("getUserCoursesReducer : ",  getUserCoursesReducer)
                    }
                    {
                      (this.state.showRecommendedCourses === true)
                        ?
                        <h3 className="pl-2">No Recommended courses are available</h3>
                        :
                        (
                          (getUserCoursesReducer.gotAssignedCourses === true && getUserCoursesReducer.courseData.length < 1)
                            ?
                            <h3 className="pl-2">No courses has been assigned to you</h3>
                            :
                            getUserCoursesReducer.courseData.map((arr, i) => {
                              // console.log(arr)
                              let match = [];
                              if (arr.iuploadname === null || arr.iuploadname === undefined || arr.iuploadname === "") {
                                match[0] = "jgf"//arr.iuploadname;
                              }
                              else {
                                // console.log(arr.iuploadname);
                                //match = arr.iuploadname.replace(',', '');
                                match = arr.iuploadname.split(',');
                              }

                              return (
                                <div className="col-md-3" key={i}>
                                  <div className="card p-4 mb-2 position-relative">
                                    {arr.CourseType === 'New' && <span className="trianglenew">New</span>}
                                    {arr.CourseType === 'New' && <div className="triangle"></div>}
                                    {arr.CourseType === 'Third-Party' && <span className="trianglethirdparty">3rd Party</span>}
                                    {arr.CourseType === 'Third-Party' && <div className="trianglecolor"></div>}
                                    <FormControl component="fieldset" >
                                      <FormLabel component="legend"></FormLabel>
                                      <h4 className=" mb-2">{arr.CourseName}</h4>
                                      <p style={{ color: 'gray', fontSize: 12 }}>{moment(arr.CreatedDate).format('DD/MM/YYYY hh:mm')}</p>
                                      <div className="card d-flex justify-content-center" style={{ height: 220, width: '100%', overflow: 'hidden' }}>
                                        <img title="" width="100%" alt="img" className="img-fluid" src={match[0]} />
                                      </div>

                                      <div className="row mb-2">


                                        {(this.state.showAssignedCourses === true) ?
                                          <div className="col-md-6 mt-4">
                                            <IconButton className={classes.buttonTableAction}
                                              onClick={(e) => { this.handleLike(e, i, arr.EnrolledID) }}
                                            >
                                              {
                                                ((favoriteList[i] === 1) ?
                                                  <Tooltip title="Unlike" TransitionComponent={Zoom} placement="top">
                                                    <Favorite
                                                      color="primary"
                                                    //onClick={() => this.handleTest(row.original)}
                                                    />
                                                  </Tooltip> :
                                                  <Tooltip title="Like" TransitionComponent={Zoom} placement="top">
                                                    <FavoriteBorder
                                                      color="primary"
                                                    //onClick={() => this.handleTest(row.original)}
                                                    />
                                                  </Tooltip>
                                                )
                                              }

                                            </IconButton>
                                          </div> :
                                          <div className="col-md-6 "></div>
                                        }
                                        <div className="col-md-6 mt-4">
                                          <IconButton className={classes.buttonTableActionBtnCurses}>
                                            <Tooltip title="Share" TransitionComponent={Zoom} placement="top">
                                              <Share
                                                color="primary"
                                                onClick={(e) => this.handleClickOpen(e, arr)}
                                              />
                                            </Tooltip>
                                          </IconButton>
                                        </div>
                                      </div>
                                    </FormControl>
                                  </div>

                                  {arr.JoiningStatus === "Enrolled" &&
                                    <div className="row mb-2 mt-1">
                                      <h4 className="col-md-6 mt-3">{arr.CompletionStatus} % Completed</h4>
                                      <div className="col-md-6 mb-2">
                                        <Button
                                          variant="contained"
                                          style={{ marginTop: 10 }}
                                          className={[classes.button, classes.buttonPrimary]}
                                          onClick={(e) => this.handleDetails(e, arr)}
                                        >
                                          Resume
                                            </Button>
                                      </div>
                                    </div>
                                  }
                                  {arr.JoiningStatus === "Completed" &&
                                    <div className="row mb-2 mt-1">
                                      <h4 className="col-md-6 mt-3">{arr.CompletionStatus} % Completed</h4>
                                      <div className="col-md-6 mb-2">
                                        <Button
                                          variant="contained"
                                          style={{ marginTop: 10 }}
                                          className={[classes.button, classes.buttonPrimary]}
                                          onClick={(e) => this.handleDetails(e, arr)}
                                        >
                                          Review
                                            </Button>
                                      </div>
                                    </div>
                                  }
                                  {arr.JoiningStatus === "Assigned" &&
                                    <div className="row mb-2 mt-1">
                                      <h4 className="col-md-6 mt-3">{arr.CompletionStatus} % Completed</h4>
                                      <div className="col-md-6 mb-2">
                                        <Button
                                          variant="contained"
                                          style={{ marginTop: 10 }}
                                          className={[classes.button, classes.buttonPrimary]}
                                          onClick={(e) => this.handleDetails(e, arr)}
                                        >
                                          Start
                                            </Button>
                                      </div>
                                    </div>
                                  }
                                </div>
                              )
                            })
                        )


                    }

                  </div>
                  {/* <div className="clearfix"></div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          onClose={this.handleCloseBtn}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <UsersShare singleShare={this.state.singleShare} handleCloseBtn={this.handleCloseBtn} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCloseBtn}
              style={{ position: 'absolute', top: 0, right: 0 }}
              color="primary"
            >
              <Icon>close</Icon>
            </Button>

          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      handleAllCourse,
      handleAssignedCourse,
      handleRecommendedCourse,
      hideAllCourse,
      hideRecommendedCourse,
      hideAssignedCourse,
      actionGetCourseList,
      actionSetFavoriteIcon,
      actionGetAssignedCourses,
      actionGetAllCourses
    }, dispatch)
}
//  00ooOO
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({}),
  mapPropsToValues: () => ({
    courseType: "Enrolled Courses",

  }),
  handleSubmit: (payload) => {
    payload["createdDate"] = moment().format("YYYY/MM/DD HH:mm");
    let galleryFD = new FormData();
    let galleryFiles = payload.galleryData;
    if (galleryFiles !== undefined) {
      for (var i = 0; i < galleryFiles.length; i++) {
        galleryFD.append("files", galleryFiles[i]);
      }
    }
    //props.actionGetAssignedCourses
    //props.actionEditCourse(payload);

    // axios.post(`/models/uploadImage`, galleryFD)
    // .then(function (response) {
    //   console.log(response)
    //   let imageArray = [];
    //   if(response.status === 200){
    //     response.data.fileDetails.map((arr, index)=>{
    //       imageArray.push({
    //         "location": arr.location
    //       })
    //     })
    //     payload["iuploadname"] = imageArray;
    //     delete payload['galleryData'];
    //     console.log(payload);
    //     props.actionCreateCourse(payload)
    //   }
    // }).catch(function (error) {
    //   console.log("Bad Response");
    // });
  },
  displayName: 'Courses',
})(Courses);

const CoursesForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

// CoursesForm.propTypes = {
//     classes: PropTypes.object.isRequired,
// };
export default withRouter((withStyles(combinedStyles)(CoursesForm)))
