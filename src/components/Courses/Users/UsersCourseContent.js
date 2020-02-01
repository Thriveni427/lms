import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Videocam from '@material-ui/icons/Videocam';
import Help from '@material-ui/icons/Help';
import Image from '@material-ui/icons/Image';
import Assignment from '@material-ui/icons/Assignment';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom, Icon } from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import combinedStyles from '../../../material-ui';
import QuizIntro from './Quiz/QuizIntro'
import Quiz from './Quiz/Quiz'


import { actionGetMaterialBySection } from '../../../actions/Courses/User/actionGetMaterialBySection';
import { actionGetQuestionPaper } from '../../../actions/actionGetQuestionPaper';
import { actionGetCourseTopicList } from '../../../actions/actionGetCourseTopicList';
import { actionGetMaterialByTopic } from '../../../actions/Courses/actionGetMaterialByTopic';


function Transition(props) {
	return <Slide direction="up" {...props} />;
}
const ExpansionPanel = withStyles({
	root: {
		border: '1px solid rgba(0,0,0,.125)',
		boxShadow: 'none',
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
	},
	expanded: {
		margin: 'auto',
	},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
	root: {
		backgroundColor: 'rgba(0,0,0,.03)',
		borderBottom: '1px solid rgba(0,0,0,.125)',
		marginBottom: -1,
		minHeight: 56,
		'&$expanded': {
			minHeight: 56,
		},
	},
	materialItem: {
		width: '100%'
	},
	content: {
		'&$expanded': {
			margin: '12px 0',
		},
	},
	expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
	root: {
		padding: theme.spacing.unit * 2,
	},
}))(MuiExpansionPanelDetails);


export class UsersCourseContent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			anchorEl: null,
			openCourse: true,
			expanded: false,
			open: false,
			showInfo: true,
			questionPaperID: "",
			topicIndex: -1,
			status: ""
		}
	}
	handleClickOpen = (questionPaperID) => {

		this.setState({
			open: true,
			questionPaperID: questionPaperID
		});
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleBack = () => {
		this.props.history.goBack();
	}

	componentDidMount = () => {
		// this.props.actionGetMaterialBySection({ "courseID": this.props.history.location.state.courseDetail.CourseID });
		let payload = { courseID : this.props.location.state.courseDetail.CourseID };
		this.props.actionGetQuestionPaper(payload);

		this.props.actionGetCourseTopicList(payload.courseID);

		console.log(payload);
		console.log("coursedetail : ", this.props.location.state.courseDetail);
		let joiningStatus = this.props.history.location.state.courseDetail.JoiningStatus;
		let status;
		if(joiningStatus === "Enrolled"){
			status = "Resume";
		}
		else if(joiningStatus === "Assigned"){
			status = "Start";
		}
		else if(joiningStatus === "Completed"){
			status = "Review";
		}
		else{
			status = "Start";
		}

		this.setState({
			status: status
		});
	}

	handleCourseDetails = (row) => {
		this.props.history.push({
			pathname: '/userscoursedetails',
			state: { courseDetail: row }
		})
	}

	handlePlay = (row) => {
		this.props.history.push({
			pathname: '/userscoursedetails',
			state: { course: row }
		})
	}

	handleChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : false,
		});
	}
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

	fetchMaterial = (id) => {
		let payload = {
			courseID: this.props.location.state.courseDetail.CourseID,
			topicID: id
		};
		// this.props.actionGetMaterialBySession(payload);
		this.props.actionGetMaterialByTopic(payload);
		localStorage.setItem("sectionID", id);
	}

	handleExpansionChange = (index, event, id) => {
		console.log(id);
		console.log(index);
		event.preventDefault();
		this.fetchMaterial(id);

		if (this.state.topicIndex === index) {
			this.setState({
				topicIndex: -1,
			});
		}
		else {
			this.setState({
				topicIndex: index,
			});
		}

	};


	render() {
		const { classes, getQuestionPaperReducer, getCourseTopicListReducer, getMaterialByTopicReducer } = this.props;
		const { showInfo, questionPaperID, topicIndex, status } = this.state;
		console.log(this.props);
		
		return (
			<React.Fragment>
				<div className="container-fluid mt-4">
					<div className="row">
						<div className="col">
							<div className="card">
								<div className="card-header d-flex flex-row justify-content-between">
									<div className="mr-2 d-flex justify-content-center align-items-center" style={{ flexBasis: 270 }}>
										<img className="card" src={this.props.location.state.courseDetail.iuploadname.slice(0, -1)} alt="logo" width="250" />
									</div>
									<div className="mr-2" style={{ flexBasis: '65%' }}>
										<h2>{this.props.history.location.state.courseDetail.CourseName}</h2>
										{this.props.history.location.state.courseDetail.CourseSummary}
										<p className="mt-2"><strong>Course Duration</strong> : {this.props.history.location.state.courseDetail.Duration} days</p>
									</div>
									<div style={{ flexBasis: 140 }}>
										<Button
											style={{ marginTop: 40 }}
											variant="contained"
											className={[classes.button, classes.buttonPrimary]}
											onClick={() => this.handleCourseDetails(this.props.history.location.state.courseDetail)}
										>
											{status} Course
                    </Button>
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
								<div className="col pt-4">
									<div className="row">
										<div className="col-md-12">
											<ExpansionPanel
												style={{ marginBottom: 5, marginTop: 40 }}
												square
												//color="primary"
												//key={index}
												expanded={true}
											// onChange={this.handleChange(`panel${index}`)}
											>
												<ExpansionPanelSummary style={{ backgroundColor: "#18a595", minHeight: 50 }}>
													<Typography style={{ color: "#ffffff" }} >Available Contents</Typography>
												</ExpansionPanelSummary>
											</ExpansionPanel>
											{
												getCourseTopicListReducer.gotCourseTopicList === true &&
												getCourseTopicListReducer.gotCourseTopicListData.map((item, index) => {
													// getMaterialBySectionReducer.MaterialBySectionData.map((item, index) => {
													console.log(item)
													return (
														<ExpansionPanel
															style={{ marginBottom: 5 }}
															square
															key={index}
															expanded={topicIndex === index ? true : false}
															// onChange={this.handleChange(`panel${index}`)}
															onClick={(event) => { this.handleExpansionChange(index, event, item.TopicID) }}
														>
															<ExpansionPanelSummary style={{ minHeight: 18 }} expandIcon={<ExpandMoreIcon />}>
																<Typography>{item.TopicName}</Typography>
															</ExpansionPanelSummary>
															<ExpansionPanelDetails style={{ flexDirection: 'column' }}>
																{
																	getMaterialByTopicReducer.gotMaterialByTopic === true &&
																	(
																		(getMaterialByTopicReducer.gotMaterialByTopicData === undefined || getMaterialByTopicReducer.gotMaterialByTopicData === null || getMaterialByTopicReducer.gotMaterialByTopicData.length < 1)
																			?
																			<h4>No Material is available in this topic</h4>
																			:
																			(
																				getMaterialByTopicReducer.gotMaterialByTopicData.map((material, index2) => {
																					console.log(material)
																					return (
																						<div style={{ flexDirection: 'column' }} key={index2 + 300}>
																							<ListItem key={index2 + 100} style={{
																								borderBottomStyle: 'solid',
																								borderBottomWidth: 1,
																								borderBottomColor: '#e4e4e4'
																							}}>
																								<Tooltip title={material.MaterialType} TransitionComponent={Zoom} placement="top">
																									{((material.MaterialType === "video/x-ms-wmv" || material.MaterialType === "video/mp4") ? <Videocam /> : ((material.MaterialType === "image/jpeg" || material.MaterialType === "image/png") ? <Image /> : ((material.MaterialType === "video/embed") ? <img src="https://static.thenounproject.com/png/531904-200.png" width="30px" height="30px" alt="im" /> : ((material.MaterialType === "assignment") ? <Assignment /> : <Help />))))}
																								</Tooltip>

																								<ListItemText
																									primary={material.MaterialName}
																								/>
																								<i className="fas fa-play-circle"></i>&nbsp;
																									{/* <Button
																										variant="contained"
																										className={[classes.button, classes.buttonPrimary]}
																										type="submit"
																										onClick={() => this.handleClickOpen()}
																									>
																										<i class="fas fa-play-circle"></i>&nbsp;
																									{((material.MaterialType === "video/x-ms-wmv" || material.MaterialType === "video/mp4") ? "Play" : ((material.MaterialType === "image/jpeg" || material.MaterialType === "image/png") ? "View" : ((material.MaterialType === "video/embed") ? "Watch" : ((material.MaterialType === "assignment") ? "View" : "View"))))}
																									</Button> */}
																							</ListItem>
																						</div>
																					)
																				})
																			)
																	)
																}

															</ExpansionPanelDetails>
														</ExpansionPanel>
													)
												})

											}

											{
												<ExpansionPanel
													style={{ marginBottom: 5, marginTop: 40 }}
													square
													//color="primary"
													//key={index}
													expanded={true}//{expanded === `panel${index}`}
												// onChange={this.handleChange(`panel${index}`)}
												>
													<ExpansionPanelSummary style={{ backgroundColor: "#18a595" }}>
														<Typography style={{ color: "#ffffff" }} >Available Test</Typography>
													</ExpansionPanelSummary>
													<ExpansionPanelDetails style={{ flexDirection: 'column' }}>
														{
															((typeof getQuestionPaperReducer.QuestionPaperData !== 'undefined' && getQuestionPaperReducer.QuestionPaperData.length > 0) ?
																getQuestionPaperReducer.QuestionPaperData.map((material, index) => {
																	console.log(getQuestionPaperReducer.QuestionPaperData);
																	
																	return <div style={{ flexDirection: 'column' }} key={index}>
																		<ListItem key={index} className={classes.materialItem}>
																			<Tooltip title={material.MaterialType} TransitionComponent={Zoom} placement="top">
																				<Icon
																					className={[this.props.classes.icon, 'fas fa-vial']}
																				/>
																			</Tooltip>

																			<ListItemText
																				primary={material.QuestionPaperName}
																			/>
																			<Button
																				variant="contained"
																				className={[classes.button, classes.buttonPrimary]}
																				type="submit"
																				onClick={() => this.handleClickOpen(material.QuestionPaperID)}
																			//onClick={this.handleClickOpen}
																			>

																				Take a Test
                                    </Button>
																		</ListItem>
																	</div>
																}) : <h6>No Test is available in this section</h6>
															)}

													</ExpansionPanelDetails>
												</ExpansionPanel>
											}
										</div>
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
							<Quiz questionPaperID={questionPaperID} />
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

const mapStateToProps = state => {
	return state
}
export default withRouter(withStyles(combinedStyles)(connect(mapStateToProps, { actionGetMaterialBySection, actionGetQuestionPaper, actionGetCourseTopicList, actionGetMaterialByTopic })(UsersCourseContent)
))
