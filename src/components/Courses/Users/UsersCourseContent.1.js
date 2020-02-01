import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import combinedStyles from '../../../material-ui';
import * as GLOBAL from '../../../utils/index';//IMAGE_HOST
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Videocam from '@material-ui/icons/Videocam';
import Help from '@material-ui/icons/Help';
import Image from '@material-ui/icons/Image';
import Assignment from '@material-ui/icons/Assignment';

import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';
import { actionGetMaterialBySection } from '../../../actions/Courses/User/actionGetMaterialBySection';
var ReactDOMServer = require('react-dom/server');
var HtmlToReactParser = require('html-to-react').Parser;
var htmlToReactParser = new HtmlToReactParser();

export class UsersCourseContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      openCourse: true
    }
  }

  // fetchMaterial = (id) => {
  //     this.props.actionGetMaterial({ "sectionID": id })
  //     localStorage.setItem("sectionID", id)
  // }

  handleBack = () => {
    this.props.history.goBack();
  }
  componentDidMount = () => {
    console.log(typeof('<h1>sdfsdf</h1>'));

    console.log("this.props.history.location.state.courseDetail");
    console.log(this.props.history.location.state.courseDetail);
    localStorage.setItem("sectionID", null)
    this.props.actionGetMaterialBySection({ "courseID": this.props.history.location.state.courseDetail.CourseID });
  }
  handlePlay = (row) => {
    this.props.history.push({
      pathname:'/userscoursedetails',
      state:{course:row}
    })
    console.log(row)
  }
  render() {
    const {
      classes,
      getMaterialBySectionReducer,
      //courseDetail
    } = this.props;

    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Courses</h6>
                </div>
                <div className="col-lg-6 col-6 text-right">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header d-flex flex-row align-items-center justify-content-between">
                  <div className="mr-5">
                    <img className="card" src={GLOBAL.IMAGE_HOST + this.props.history.location.state.courseDetail.ioriginalname} alt="logo" width="250" />
                  </div>
                  <div className="mr-2">
                    <h2>{this.props.history.location.state.courseDetail.CourseName}</h2>
                    <div dangerouslySetInnerHTML={{ __html: this.props.history.location.state.courseDetail.CourseSummary }} />
                    Course Summary :  {this.props.history.location.state.courseDetail.CourseSummary}
                    <p>Course Duration : {this.props.history.location.state.courseDetail.Duration}</p>
                  </div>
                  <div style={{ flexBasis: 180 }}>

                    <Button
                      style={{ marginTop: 10 }}
                      variant="contained"
                      className={[classes.button, classes.buttonSecondary]}
                      onClick={() => this.handleBack()}
                      type="submit"
                    >
                      My Courses
                    </Button>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col-md-12">
                      {
                        getMaterialBySectionReducer.MaterialBySectionData.map((item, index) => {
                          console.log("item");
                          console.log(item);
                          //this.fetchMaterial(item.Section.Section.SectionID);
                          return (
                            <React.Fragment>
                              <MenuItem
                                to="/"
                                key={index}
                                button
                                // onClick={() => { this.fetchMaterial(item.SectionID) }}
                                className={classes.Coursenested}
                              >

                                <ListItemText inset primary={item.Section.SectionName} />
                                <Button
                                  variant="contained"
                                  className={[classes.button, classes.buttonPrimary]}
                                  type="submit"
                                  onClick={() => this.handlePlay(this.props.history.location.state.courseDetail)}
                                >
                                  Play
                              </Button>
                              </MenuItem>
                              <div className="col-md-10">

                                {
                                  ((typeof item.Section.material !== 'undefined' && item.Section.material.length > 0) ?
                                    item.Section.material.map((material, index) => {
                                      return <ListItem key={index} className="materialItem">
                                        <Tooltip title={material.MaterialType} TransitionComponent={Zoom} placement="top">
                                          <ListItemAvatar>
                                            {((material.MaterialType === "video/x-ms-wmv" || material.MaterialType === "video/mp4") ? <Videocam /> : ((material.MaterialType === "image/jpeg" || material.MaterialType === "image/png") ? <Image /> : ((material.MaterialType === "video/embed") ? <img src="https://static.thenounproject.com/png/531904-200.png" width="30px" height="30px" alt="im" /> : ((material.MaterialType === "assignment") ? <Assignment /> : <Help />))))}
                                          </ListItemAvatar>
                                        </Tooltip>

                                        <ListItemText
                                          primary={material.MaterialName}
                                        />

                                      </ListItem>
                                    }) : <h6>No Material is available in this section</h6>)
                                }
                                {/* <CourseMaterial courseDetail={this.props.history.location.state.courseDetail} /> */}
                              </div>
                            </React.Fragment>
                          )

                        })

                      }
                    </div>
                    {/* <CourseMaterialSection courseDetail={courseDetail} /> */}


                  </div>
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

export default withRouter(withStyles(combinedStyles)(connect(mapStateToProps, { actionGetMaterialBySection })(UsersCourseContent)
))
