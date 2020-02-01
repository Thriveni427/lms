import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import QuizIntro from './Quiz/QuizIntro';
import Quiz from './Quiz/Quiz';
import Slide from '@material-ui/core/Slide';

import * as GLOBAL from '../../../utils/index';
import combinedStyles from '../../../material-ui';
// import YoutubePlayer from './YoutubePlayer';
import MP4Player from './MP4Player';
import { actionGetMaterialBySection } from '../../../actions/Courses/User/actionGetMaterialBySection';
import { actionGetCourseTopicList } from '../../../actions/actionGetCourseTopicList';

function Transition(props) {
	return <Slide direction="up" {...props} />;
}
// const ExpansionPanel = withStyles({
// 	root: {
// 		border: '1px solid rgba(0,0,0,.125)',
// 		boxShadow: 'none',
// 		'&:not(:last-child)': {
// 			borderBottom: 0,
// 		},
// 		'&:before': {
// 			display: 'none',
// 		},
// 	},
// 	expanded: {
// 		margin: 'auto',
// 	},
// })(MuiExpansionPanel);

// const ExpansionPanelSummary = withStyles({
// 	root: {
// 		backgroundColor: 'rgba(0,0,0,.03)',
// 		borderBottom: '1px solid rgba(0,0,0,.125)',
// 		marginBottom: -1,
// 		minHeight: 56,
// 		'&$expanded': {
// 			minHeight: 56,
// 		},
// 	},
// 	materialItem: {
// 		width: '100%'
// 	},
// 	content: {
// 		'&$expanded': {
// 			margin: '12px 0',
// 		},
// 	},
// 	expanded: {},
// })(props => <MuiExpansionPanelSummary {...props} />);

// ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

// const ExpansionPanelDetails = withStyles(theme => ({
// 	root: {
// 		padding: theme.spacing.unit * 2,
// 	},
// }))(MuiExpansionPanelDetails);


export class UsersCourseDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Videos: [],
      Materials: [],
      url: "",
      open: false,
      currentIndex: 0,
      videoIndex: 0,
      showInfo: true,
      options: {
        playing: true,
        duration: 0,
        // playing: true,
        controls: true
      },
    }
  }

  componentDidMount = () => {
    if (this.props.history.location.state !== undefined) {
      let CourseID = this.props.history.location.state.courseDetail.CourseID;
      // this.props.actionGetMaterialBySection({ "courseID": CourseId });
      this.props.actionGetCourseTopicList(CourseID);
    }
  }

  handleChange = (index, event) => {
    console.log(index);
    event.preventDefault();

    this.setState({
      currentIndex: index,
    });
  };
  handleStartTest = () => {
		let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
		let CourseID = this.props.location.state.courseDetail.CourseID;

		this.props.history.push({
			pathname: '/TakeTest',
			state: { courseID: CourseID, userId: userinfo.UserID }
		})
		console.log(this.props)
		this.setState({
			showInfo: !this.state.showInfo
		})
	}
  handlePlay = (data) => {
    console.log(data);

    let payload = {
      courseID: this.props.location.state.courseDetail.CourseID,
      sessionID: data
    };

    console.log(payload);
    //  brings coursematerial by session

    axios.post(`${GLOBAL.API_HOST}/getMaterialByType`, payload)
      .then(res => {
        console.log("material : ", res);
        res.data.data.map((arr) => {
          // video.push(arr.MaterialName);
          // type.push(arr.MaterialType);
          // url.push(arr.MaterialLoc);
          // material.push(arr.MaterialID);
          // this.setState({
          //   Videos: arr.MaterialName,
          //   Materials: arr.MaterialID,
          //   url: arr.MaterialLoc,
          //   type: arr.MaterialType
          // })
          this.setState({
            Videos: arr.Videos,
            Materials: arr.Items,
            url: arr.Videos[0].MaterialLoc,
            type: arr.Videos[0].MaterialType
          })
          return null;
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleOnCompletion = () => {
    console.log("Video ended there");
    this.setState({
      videoIndex: this.state.videoIndex + 1
    }, () => {
      console.log(this.state.videoIndex)
    })
    // this.handlePlay(getCourseTopicListReducer.gotCourseTopicListData[0].Sessions[0].SessionID)
  }
  handleClose = () => {
		this.setState({ open: false });
	};
  handleTakeTest = () => {
    // let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    // if (this.props.location.state !== undefined) {
    //   let CourseID = this.props.location.state.courseDetail.CourseID;
    //   this.props.history.push({
    //     pathname: '/TakeTest',
    //     state: { courseID: CourseID, userId: userinfo.UserID }
    //   })
    // }
    this.setState({
			open: true,
		});
  }

  render() {
    const {
      classes,
      getCourseTopicListReducer,
    } = this.props;
    let { currentIndex, showInfo } = this.state;
    let { courseDetail } = this.props.history.location.state;
    // let { videoLength } = getCourseTopicListReducer.gotCourseTopicListData[0].Sessions[0]

    if (getCourseTopicListReducer.gotCourseTopicList === true && this.props.history.location.state !== undefined) {
      getCourseTopicListReducer.gotCourseTopicList = false;
      if (getCourseTopicListReducer.gotCourseTopicListData[0].Sessions[0] !== undefined && getCourseTopicListReducer.gotCourseTopicListData[0].Sessions[0].SessionID !== undefined)
      this.handlePlay(getCourseTopicListReducer.gotCourseTopicListData[0].Sessions[0].SessionID)
      // this.handleTakeTest(getCourseTopicListReducer.gotCourseTopicListData[0].Sessions[0].SessionID > videoIndex )
    }
    console.log(this.props)
    console.log(courseDetail);
    console.log(getCourseTopicListReducer);
    

    return (
      <React.Fragment>
        {
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Users</h6>
                </div>
                <div className="col-lg-6 col-6 text-right">
                </div>
              </div>
            </div>
          </div>
        </div>
        }
        <div className="container-fluid mt--6">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header d-flex flex-row  justify-content-between">
                  <div className="mr-5">

                    <img alt="img1" className="card" src={courseDetail.iuploadname == null ? "" : courseDetail.iuploadname.slice(0, -1)} width="250" />

                    {/* <img alt="img1" className="card" src={courseDetail.iuploadname == null ? "" : courseDetail.iuploadname.slice(0, -1)} width="250" /> */}
                  </div>
                  <div className="mr-4" style={{ flexBasis: '65%' }}>
                    {
                      this.props.history.location.state !== undefined ?
                        <div>
                          <h2>{courseDetail.CourseName}</h2>
                          <p>{courseDetail.CourseSummary}</p></div> :
                        null
                    }
                    {/* <h2>{courseDetail.CourseName}</h2>
                    <p>{courseDetail.CourseSummary}</p> */}
                  </div>
                  <div style={{ flexBasis: 180 }}>
                    <Link to="/courses">
                      <Button
                        variant="contained"
                        className={[classes.button, classes.buttonPrimary]}
                        style={{ marginBottom: 20, marginTop: 40 }}>
                        My Courses
                    </Button>
                    </Link>
                  </div>
                </div>
                <div className="content mt-4">
                  <div className="col-md-12">
                    <div className="d-flex">
                      <div style={{ flex: 1 }}>
                        {/* { this.state.type === "video/embed" && <YoutubePlayer video={this.state.url} /> } */}
                        {
                          this.state.type === "video/embed" || this.state.type === "video/mp4"
                            ?
                            <MP4Player
                              video={this.state.url}
                              options={this.state.options}
                              onEnded={this.handleOnCompletion}
                            />
                            :
                            null
                        }
                      </div>
                      <div style={{ flex: 1 }} className="card">
                        <div className="p-3" style={{ height: 360, overflowX: 'auto' }}>
                          {
                            getCourseTopicListReducer.gotCourseTopicListData.map((item, index) => {
                              return (
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
                                  <ExpansionPanelDetails>
                                    <div className="d-flex flex-column w-100">
                                      {
                                        item.Sessions.map((arr, i) => {
                                          return (
                                            <ListItem
                                              disabled={((this.state.videoIndex < index) ? true : false)}
                                              key={i}
                                              onClick={() => { this.handlePlay(arr.SessionID) }}
                                              button
                                              className="d-flex justify-content-between p-3"
                                              style={{
                                                borderTopStyle: 'solid',
                                                borderTopWidth: 1,
                                                borderTopColor: '#e4e4e4'
                                              }}
                                            >
                                              <div style={{ flexBasis: 30 }}><i className="fas fa-play"></i></div>
                                              <div style={{ flexBasis: 40 }}>{index}</div>
                                              <div style={{ flexBasis: '100%', color: '#0000ff' }}>{arr.SessionName}</div>
                                              <div style={{ flexBasis: 40 }}>0:04</div>
                                              <hr />
                                            </ListItem>
                                          )
                                        })
                                      }
                                    </div>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                    {/* <Link to={'/TakeTest'} className="link_text">
                     <h5>TakeTest</h5> 
                    </Link> */}
                    <div className="taketest_btn">                        
                                      <Button
                                      //  disabled={(( === index) ? true : false)}
                                        variant="contained"
                                        style={{ marginTop: 10 }}
                                        className={[classes.button, classes.buttonPrimary]}
                                        onClick={this.handleTakeTest}
                                      >
                                        Take Test
                                      </Button>                                
                    </div>
                    <h3>Downloads</h3>
                    <hr />
                    <React.Fragment>
                      <div className="d-flex p-3">
                        <div style={{ flexBasis: '100%', textTransform: 'uppercase' }}><strong>File name</strong></div>
                        <div style={{ flexBasis: 150, textTransform: 'uppercase' }}><strong>File type</strong></div>
                        <div style={{ flexBasis: 100, textTransform: 'uppercase' }}><strong>Size</strong></div>
                        <div style={{ flexBasis: 100, textTransform: 'uppercase' }}><strong>Download</strong></div>
                      </div>
                    </React.Fragment>

                    {
                      this.state.Materials.map((arr) => {
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
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog
					fullScreen
					open={this.state.open}
					onClose={this.handleClose}
					TransitionComponent={Transition}
				>
					{console.log(this.state.open)}
					
					<AppBar className={classes.appBar}>
						<Toolbar>
							<Typography variant="h6" color="inherit" className={classes.flex}>
								{this.props.history.location.state.courseDetail.CourseName}
							</Typography>
							<IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
								<CloseIcon />
							</IconButton>
						</Toolbar>
					</AppBar>
					<div className="container quizDetails">
						{showInfo &&
							<QuizIntro />
						}
						{!showInfo && <React.Fragment>
							<Quiz/>
						</React.Fragment>}
					</div>
					{showInfo && <div className="d-flex justify-content-center">
						<Button
							variant="contained"
							style={{ width: 220, padding: 12, fontSize: 16 }}
							className={["mb-5", classes.button, classes.buttonPrimary]}
							type="submit"
							onClick={() => this.handleStartTest()}
						>
							Start Test
            </Button>
					</div>
					}
				</Dialog>
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
