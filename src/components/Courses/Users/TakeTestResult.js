
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import { PieChart, Pie } from 'recharts';
import * as CanvasJSReact from './../../../js/canvasjs.react';


import combinedStyles from '../../../material-ui';
import { actionGetCurrentTestResult } from '../../../actions/Courses/User/actionGetCurrentTestResult';


var CanvasJSChart = CanvasJSReact.default.CanvasJSChart;
// var CanvasJS = CanvasJSReact.default.CanvasJS;


class TakeTestResult extends Component {
	state = {
		selectedQuestion: [],
		index: -1,
		open: false,
		currentIndex: -1,
		size: '',
		comment: false,
	};

	componentDidMount = () => {

		let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
		console.log(userinfo);

		let payload = {
			testId: this.props.history.location.state.testID,
			userId: userinfo.UserID
		}
		console.log(payload);

		this.props.actionGetCurrentTestResult(payload);
		console.log(this.props);
	}
	handlerChange = (event) => {
		this.setState({
			size: event.target.value
		});
	}
	showCommentHandle = () => {
		this.setState({
			comment: !(this.state.comment),
			// qid: i
		})
	}
	handleChange = (index, event) => {
		console.log(index);
		event.preventDefault();
		if (this.state.currentIndex === index) {
			this.setState({
				currentIndex: -1
			})
		}
		else {
			this.setState({
				currentIndex: index,
			});
		}

	};

	render() {

		let { index, currentIndex, comment } = this.state;
		const { classes } = this.props;
		const { getCurrentTestResultReducer } = this.props;

		let topicSet = new Set();
		if (getCurrentTestResultReducer.fetchedGetCurrentTestResult === true && topicSet.size === 0) {
			getCurrentTestResultReducer.getCurrentTestResultData[0].Correct.map((item) => {
				topicSet.add(item.TopicID);
				return null;
			})
			getCurrentTestResultReducer.getCurrentTestResultData[0].InCorrect.map((item) => {
				topicSet.add(item.TopicID); return null;
			})
			getCurrentTestResultReducer.getCurrentTestResultData[0].UnAnswered.map((item) => {
				topicSet.add(item.TopicID); return null;
			})
		}

		console.log(topicSet)

		let topics = [];
		// let temp = [];
		let questionsTopicWise = [];
		let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
		if (getCurrentTestResultReducer.fetchedGetCurrentTestResult === true && topicSet.size > 0) {
			for (let item of topicSet)
				topics.push(item);

			topics.map((id, topicIndex) => {

				let p = getCurrentTestResultReducer.getCurrentTestResultData[0].Correct.filter(function (x) {
					return x.TopicID === id;
				})
				let correct = p.length;
				p = p.map(obj => ({ ...obj, type: 'correct' }));

				console.log("p : ", p);

				let q = getCurrentTestResultReducer.getCurrentTestResultData[0].InCorrect.filter(function (x) {
					return x.TopicID === id;
				})
				let incorrect = q.length;
				q = q.map(obj => ({ ...obj, type: 'incorrect' }));

				console.log("q : ", q);

				let r = getCurrentTestResultReducer.getCurrentTestResultData[0].UnAnswered.filter(function (x) {
					return x.TopicID === id;
				})
				let unanswered = r.length;
				r = r.map(obj => ({ ...obj, type: 'unanswered' }));

				console.log("r : ", r);

				console.log(topicIndex);
				let topicName = ((p.length > 0) ? p[0].TopicName : ((q.length > 0) ? q[0].TopicName : r[0].TopicName));
				console.log(topicName);
				let n = [];
				n.push(...p, ...q, ...r);

				let percentage = (correct / (correct + incorrect + unanswered)) * 100;
				let result;

				console.log(percentage);

				if (percentage <= 30) {
					// console.log("fail")
					result = "Too bad";
				}
				else if (percentage > 30 && percentage < 50) {
					result = "Bad";
				}
				else if (percentage >= 50 && percentage < 70) {
					result = "Good";
				}
				else if (percentage >= 70 && percentage < 90) {
					result = "Excellent";
				}
				else if (percentage >= 90) {
					result = "Outstanding";
				}
				else {
					result = "Superman";
				}

				questionsTopicWise.push({ name: topicName, data: n, remark: result });

			})

			console.log(questionsTopicWise);
		}



		return (
			<div className="container-fluid">

				<div className="row">
					<div className="col-md-12">
						<div className="card">
							<div className="row">
								<div className="col-md-12">
									<h3 className="mt-3" align="center">Review Test Result</h3>
								</div>
							</div>
							{
								getCurrentTestResultReducer.getCurrentTestResultData.map((item, i2) => {
									let options = {
										exportEnabled: true,
										animationEnabled: true,
										// title: {
										// 	text: "Test Summary"
										// },
										data: [{
											type: "pie",
											startAngle: 75,
											toolTipContent: "<b>{label}</b>: {y}",
											showInLegend: "true",
											legendText: "{label}",
											indexLabelFontSize: 16,
											indexLabel: "{label} - {y}",
											dataPoints: [
												{ y: item.TotalUnAnswered, label: "Unanswered questions" },
												{ y: item.TotalInCorrect, label: "Incorrect questions" },
												{ y: item.TotalCorrect, label: "Correct questions" },
											]
										}]
									}
									console.log(item)
									return (
										<Fragment>
											<div>
												<div className="percentage_result mt-2">
													<div className="">
														<div className="text_Result">
															<div>
																<p className="quesjustName ">Total questions : </p>
															</div>
															<div className="nameFirst">
																<p>{item.TotalQuestions}</p>
															</div>
														</div>
														<div className="text_Result">
															<div>
																<p className="quesjustName ">Percentage : </p>
															</div>
															<div className="nameFirst">
																<p>{item.Percentage} %</p>
															</div>
														</div>
													</div>
													<div className="mr-4">
														<div className="text_Result">
															<div>
																<h5 className="mar_lefTopic">Result : </h5>
															</div>
															<div className="nameFirst1">
																<p>{item.Result} </p>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="quesU">
												<div className="ml-3 mr-3 mt-2">
													{
														questionsTopicWise.map((myItem, loopIndex) => {

															return (
																<Fragment>
																	<ExpansionPanel
																		square
																		className={"mt-1 mb-1"}
																		expanded={currentIndex === loopIndex ? true : false}
																		onChange={(event) => { this.handleChange(loopIndex, event) }}
																	>
																		<ExpansionPanelSummary>
																			<Typography key={index}>
																				<div className="topicName">
																					<p>{myItem.name}</p>
																				</div>
																			</Typography>
																		</ExpansionPanelSummary>
																		<hr className="under_line" />
																		{
																			myItem.data.map((question, i2) => {
																				return (
																					<ExpansionPanelDetails>

																						<Fragment>
																							<div className={"main_par " + question.type}>
																								<div>
																									<h6 className="quesBst" >
																										{i2 + 1}. {question.QuestionName}
																									</h6>
																								</div>
																								<div className="ans_ForQue">
																									<div className="text_Result">
																										<div>
																											<h6 className="quesjustName mt-2">Correct Answer : </h6>
																										</div>
																										<div className="nameFirstAns">
																											<p>{question.CorrectAnswer}</p>
																										</div>
																									</div>
																									{
																										(question.type === 'correct') &&
																										(
																											<div className="text_Result">
																												<div>
																													<h6 className="correct_ans mt-2">Your Answer : </h6>
																												</div>
																												<div className="user_Ans">
																													<p>{question.UserAnswer}</p>
																												</div>
																											</div>
																										)
																									}
																									{
																										(question.type === 'incorrect') &&
																										(
																											<div className="text_Result">
																												<div>
																													<h6 className="your_ans mt-2">Your Answer : </h6>
																												</div>
																												<div className="user_AnsIncorrect">
																													<p>{question.UserAnswer}</p>
																												</div>
																											</div>
																										)
																									}
																									{
																										(question.type === 'unanswered') &&
																										(
																											<div className="user_notAns">
																												<p>You didn't answer</p>
																											</div>
																										)
																									}

																								</div>
																							</div>
																						</Fragment>
																					</ExpansionPanelDetails>
																				)
																			})
																		}
																		{
																			(userinfo.userType === "admin" || userinfo.userType === "vendor" || userinfo.userType === "trainer")
																				?
																				(
																					<Fragment>
																						<FormControl component="fieldset" className="ml-5" onClick={() => this.showCommentHandle()}>
																							<RadioGroup
																								// aria-label="gender"
																								// name="gender1"
																								className={classes.group}
																								// text={this.state.value}
																								onChange={(event) => { this.handlerChange(event) }}
																							>
																								<div className="radio_btns">
																									<div><FormControlLabel className="pos_btn" value="positive" checked={this.state.size === "positive"} control={<Radio />} label="Positive" /></div>
																									<div><FormControlLabel value="nagative" checked={this.state.size === "nagative"} control={<Radio />} label="Negative" /></div>
																								</div>
																							</RadioGroup>
																						</FormControl>
																						{comment ?
																							<div className="percentage_result mb-4">
																								<div>
																									<textarea className="ml-5" rows="3" cols="60" id="comment"></textarea>
																								</div>
																								<div>
																									<Button
																										style={{ marginTop: 10 }}
																										variant="contained"
																										className={[classes.button, classes.buttonPrimary]}
																										type="submit"
																									>
																										Submit
																																									</Button>
																								</div>
																							</div> : null
																						}
																					</Fragment>
																				)
																				:
																				(

																					<div className="text_Remark" align="center">
																						<div>
																							<h4 className="quesjustNameRemark mt-2">Remark : </h4>
																						</div>
																						<div className="nameFirstAnsRemark">
																							<p>You are <strong>"{myItem.remark}"</strong> in this topic</p>
																						</div>

																					</div>
																				)
																		}
																	</ExpansionPanel>
																</Fragment>
															)
														})
													}
												</div>
											</div>
											<div className="mb-4">
												<h5 className="ml-3 mt-4" align="center" style={{ fontSize: 17 }}>Test Summary</h5>
											</div>
											<div className="mb-5">
												<CanvasJSChart options={options} className="mb-3" />
											</div>
											<div className="col-md-12 mb-4" align="center">
												<Link to="/courses">
													<Button
														style={{ marginTop: 10 }}
														variant="contained"
														className={[classes.button, classes.buttonPrimary]}
														type="submit"
													>
														Go To My Courses
                          </Button>
												</Link>
											</div>
										</Fragment>
									)
								})
							}
							{console.log(questionsTopicWise)}
							{questionsTopicWise.map((myItem) => {
								console.log(myItem.name)
								console.log(myItem.data)

							})}
						</div>
					</div>
				</div>

			</div>

		)
	}
}

const mapStateToProps = state => {
	return state
}

export default withRouter(withStyles(combinedStyles)(connect(mapStateToProps, { actionGetCurrentTestResult })(TakeTestResult)))
