import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import combinedStyles from '../../../material-ui';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import * as GLOBAL from '../../../utils/index';
import { actionGetMaterialBySection } from '../../../actions/Courses/User/actionGetMaterialBySection';
import axios from 'axios';
import YoutubePlayer from './YoutubePlayer';
import MP4Player from './MP4Player';
import { actionGetCourseTopicList } from '../../../actions/actionGetCourseTopicList';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, ListItemText } from '@material-ui/core';

export class UsersCourseDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      Videos: [],
      Materials: [],
      url: "",
      options: {
        playing: true,
        duration: 0,
        playing: true,
        controls: true
      },
    }
  }

  componentDidMount = () => {
    let CourseID = this.props.history.location.state.courseDetail.CourseID;
    this.props.actionGetCourseTopicList(CourseID);
    //  brings only topic and session list
    let video = [];
    let url = [];
    let type = [];
    let material = [];
    //  brings coursematerial by course
    axios.get(`${GLOBAL.API_HOST}/getTopicDetails?courseID=${CourseID}`)
      .then(res => {
        console.log(res);

        console.log(res.data.data[0].Sessions[0]);
        this.handlePlay(res.data.data[0].Sessions[0]);
        // res.data.data.map((arr, index) => {
        //   console.log(arr);


        //   url.push(arr.MaterialLoc);
        //   video.push(arr.MaterialName);
        //   // url.push(arr.MaterialLoc);
        //   type.push(arr.MaterialType);
        // })
        // this.setState({
        //   Videos: video,
        //   url: url,
        //   type: type
        // })

      })
      .catch(err => {
        console.log(err);
      })
  }

  handlePlay = (arr) => {

    console.log(arr);

    let video = [];
    let url = [];
    let type = [];
    let material = [];
    let payload = {};
    payload["sessionID"] = arr.SessionID;
    console.log(payload);
    //  brings coursematerial by session
    axios.post(`${GLOBAL.API_HOST}/getMaterialBySession`, payload)
      .then(res => {
        console.log(res);
        res.data.data.map((arr, index) => {
          // video.push(arr.MaterialName);
          // type.push(arr.MaterialType);
          // url.push(arr.MaterialLoc);
          // material.push(arr.MaterialID);
          this.setState({
            Videos: arr.MaterialName,
            Materials: arr.MaterialID,
            url: arr.MaterialLoc,
            type: arr.MaterialType
          })
        })

      })
      .catch(err => {
        console.log(err)
      })
  }

  handleChange = (index, event) => {
    console.log(index);
    event.preventDefault();

    this.setState({
      currentIndex: index,
    });
  };

  render() {
    const {
      classes,
      getCourseTopicListReducer,
    } = this.props;
    let { courseDetail } = this.props.history.location.state;
    let { duration, playing, controls } = this.state.options;
    let { currentIndex } = this.state;
    let video = []
    let url = [];
    let type = [];
    if (getCourseTopicListReducer.gotCourseTopicList === true && getCourseTopicListReducer.gotCourseTopicListData !== null && getCourseTopicListReducer.gotCourseTopicListData !== undefined) {
      console.log(getCourseTopicListReducer.gotCourseTopicListData);

      // video.push(getCourseTopicListReducer.gotCourseTopicListData.MaterialName);
      // url.push(getCourseTopicListReducer.gotCourseTopicListData.MaterialLoc);
      // type.push(getCourseTopicListReducer.gotCourseTopicListData.MaterialType);
    }
    console.log(this.state);
    return (
      <React.Fragment>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header d-flex flex-row  justify-content-between">
                  <div className="mr-5">
                    <img alt="img1" className="card" src={courseDetail.iuploadname == null ? "" : courseDetail.iuploadname.slice(0, -1)} width="250" />
                  </div>
                  <div className="mr-4" style={{ flexBasis: '65%' }}>
                    <h2>{courseDetail.CourseName}</h2>
                    <p>{courseDetail.CourseSummary}</p>
                    {/* <p className="mt-2"><strong>Course Duration</strong> : {courseDetail.Duration} days</p> */}
                  </div>
                  <div style={{ flexBasis: 180 }}>
                    <Button
                      variant="contained"
                      className={[classes.button, classes.buttonPrimary]}
                      style={{ marginBottom: 20, marginTop: 40 }}
                      onClick={this.props.history.goBack}
                    >
                      My Courses
                    </Button>
                  </div>
                </div>
                <div className="row content mt-4">

                  <div className="col-md-8">
                    {/* //style={{ flex: 1 }}> */}
                    {/* { this.state.type === "video/embed" && <YoutubePlayer video={this.state.url} /> } */}
                    <MP4Player
                      video={this.state.url}
                      options={this.state.options}
                    />
                  </div>
                  <div className="col-md-4">
                    {/* {
                      ((getCourseTopicListReducer.gotCourseTopicList === false && getCourseTopicListReducer.gettingCourseTopicList === true) ?
                        <React.Fragment></React.Fragment> : <h4>Loading content...</h4>)
                    } */}
                    {
                      ((typeof getCourseTopicListReducer.gotCourseTopicListData !== 'undefined' && getCourseTopicListReducer.gotCourseTopicListData.length > 0) ?
                        <React.Fragment></React.Fragment> : <h4>No Topic is available in this course</h4>)
                    }
                    {
                      getCourseTopicListReducer.gotCourseTopicListData.map((item, index) => {
                        console.log(item);

                        return (
                          <div className="">


                            <ExpansionPanel
                              square
                              // expanded={expanded === 'panel'}
                              expanded={currentIndex === index ? true : false}
                              onChange={(event) => { this.handleChange(index, event, item.TopicID) }}
                            >
                              <ExpansionPanelSummary>
                                <Typography key={index}
                                  style={{ fontSize: 16 }}
                                >{item.TopicName}</Typography>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails className="">

                                {
                                  item.Sessions.map((arr, i) => {
                                    return (
                                      <React.Fragment>
                                        <div className="" key={i}>
                                          <ListItem key={i} onClick={(e) => { this.handlePlay(arr) }} >
                                            <Typography key={i}
                                              style={{ fontSize: 13 }}
                                            >{arr.SessionName}</Typography>
                                            {/* <ListItemText primary={arr.SessionName} /> */}
                                            <i className="fas fa-play-circle"></i>&nbsp;
                                          </ListItem>
                                        </div>
                                        <div >
                                          {/* <div className="">
                                            <div className="" style={{ height: 360, overflowX: 'auto' }}>
                                              {
                                                item.Sessions.map((arr, index) => {
                                                  return (
                                                    <Typography key={index}
                                                    onClick={(e) => { this.handlePlay(arr.SessionID) }}
                                                      style={{ fontSize: 16 }}
                                                    >{arr.SessionName}
                                                    </Typography>
                                                    )
                                              })
                                               
                                              }
                                            </div>
                                          </div> */}
                                        </div>
                                      </React.Fragment>
                                    )
                                  })
                                }

                                {/* <div className="d-flex justify-content-center align-items-center">
                                      <Button
                                        style={{ marginTop: 40, paddingTop: 15, paddingBottom: 15 }}
                                        variant="contained"
                                        className={["w-25", classes.button, classes.buttonSecondary]}
                                        onClick={() => this.handleAddSession(item.TopicID)}
                                      >
                                        + Add Session
                                              </Button>
                                    </div> */}

                              </ExpansionPanelDetails>
                            </ExpansionPanel>
                          </div>
                        )
                      })
                    }
                  </div>


                  <div className="col-md-12">

                    <h3>Downloads</h3>
                    <hr />
                    {/* <React.Fragment>
                      <div className="d-flex p-3">
                        <div style={{ flexBasis: '100%', textTransform: 'uppercase' }}><strong>File name</strong></div>
                        <div style={{ flexBasis: 150, textTransform: 'uppercase' }}><strong>File type</strong></div>
                        <div style={{ flexBasis: 100, textTransform: 'uppercase' }}><strong>Size</strong></div>
                        <div style={{ flexBasis: 100, textTransform: 'uppercase' }}><strong>Download</strong></div>
                      </div>
                    </React.Fragment> */}
                    {/* {
                      this.state.Materials.map((arr, index) => {
                        return (
                          <React.Fragment>
                            <div className="d-flex p-3">
                              <div style={{ flexBasis: '100%' }}>{arr.MaterialName}</div>
                              <div style={{ flexBasis: 150 }}>{arr.MaterialType}</div>
                              <div style={{ flexBasis: 100 }}>20 KB</div>
                              <div style={{ flexBasis: 100 }}><a href={arr.MaterialLoc}><i className="fas fa-download"></i></a></div>
                            </div>
                          </React.Fragment>
                        )
                      })
                    } */}
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

// const mapStateToProps = (state) => ({

// })

// const mapDispatchToProps = {

// }
const mapStateToProps = state => {
  return state
}

export default withRouter(withStyles(
  combinedStyles)(connect(mapStateToProps, { actionGetMaterialBySection, actionGetCourseTopicList })(UsersCourseDetails)
  ))
