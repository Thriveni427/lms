/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
// import { loginAction } from '../actions/loginAction';
import { loginAction } from "../../actions/loginAction"

import UserLogin from "../UserLogin";
import RegisterForm from "../RegisterForm";
import FrontHeader from "../FrontHeader";
import FrontFooter from "../FrontFooter";
import TopicList from "../Courses/TopicList";
import { actionGetCourseDetailsById } from '../../actions/Home/actionGetCourseDetailsById';
import { actionGetCourseList } from '../../actions/actionGetCourseList';
import { actionGetAssignedCourses } from '../../actions/Courses/User/actionGetUserCourses'
import { actionGetCourseTopicList } from "../../actions/actionGetCourseTopicList";
import { actionGetMaterialByTopic } from "../../actions/Courses/actionGetMaterialByTopic";
import { actionUserEnrollCourse } from "../../actions/Courses/User/actionUserEnrollCourse"
import { actionJoinCourse } from "../../actions/Courses/User/actionJoinCourse";
import { actionAddCourseToWishList } from "../../actions/Home/actionAddCourseToWishList";


export class CourseDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			topicIndex: -1,
			showLoginModal: false,
		}
	}

	componentDidMount = () => {
		this.props.actionGetCourseTopicList(1);
		// this.props.actionGetMaterialByTopic();
		console.log(this.props);
		if (this.props.history.location.state !== undefined) {
			let payload = {
				"courseID": this.props.history.location.state.detail.CourseID
			};
			console.log(payload);
			sessionStorage.setItem("courseID", payload.courseID);
			this.props.actionGetCourseDetailsById(payload);
		}
		// this.props.actionGetCourseList();
		// console.log(this.props.history.location.state.detail);
		this.getAssignedCourses()
	}

	getAssignedCourses = () => {
		let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
		if (userinfo === null) userinfo = [];
		if (userinfo.UserID !== undefined) {
			this.props.actionGetAssignedCourses(userinfo.UserID);
		}
	};

	// fetchMaterial = (id) => {
	// 	let payload = {
	// 		courseID: this.props.history.location.state.detail.CourseID,
	// 		topicID: id
	// 	};
	// 	// this.props.actionGetMaterialBySession(payload);
	// 	this.props.actionGetMaterialByTopic(payload);
	// 	localStorage.setItem("sectionID", id);
	// }

	// handleExpansionChange = (index, event, id) => {
	// 	console.log(id);
	// 	console.log(index);
	// 	event.preventDefault();
	// 	this.fetchMaterial(id);

	// 	if (this.state.topicIndex === index) {
	// 		this.setState({
	// 			topicIndex: -1,
	// 		});
	// 	}
	// 	else {
	// 		this.setState({
	// 			topicIndex: index,
	// 		});
	// 	}
	// };

	handlePurchase = (e) => {
		e.preventDefault();
		if (this.props.history.location.state !== undefined) {
			// if (this.props.loginReducer.loginAuthenticated === true) {
			console.log(this.props.loginReducer);

			console.log(this.props.history.location.state.detail.CourseID);

			let courseId = this.props.history.location.state.detail.CourseID;
			let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
			if (userinfo === null) userinfo = [];
			if (userinfo.UserID !== undefined) {
				let payload = {
					userID: userinfo.UserID,
					courseID: courseId,
				}
				console.log(payload);
				sessionStorage.setItem("courseID", payload.courseID);

				this.props.actionJoinCourse(payload);
				// this.props.history.push({
				// 	pathname: "/userscoursedetails",
				// 	state: { courseDetail: courseId }
				// });
			}

			else {
				console.log(this.props.loginReducer);
				this.handleLoginClick();
			}
			// let payload = {
			// 	userID: userinfo.UserID,
			// 	courseID: courseId,
			// }
			// console.log(payload);
			// this.props.actionJoinCourse(payload);
			// this.props.history.push({
			//   pathname: "/userscoursedetails",
			//   state: { courseDetail: courseId }
			// });
			// }
			// else{
			// 	console.log(this.props.loginReducer);
			// 	this.handleLoginClick();
		}
	}



	handlerAddWishList = (event) => {
		event.preventDefault();
		console.log(this.props.history.location.state.detail.CourseID);

		let courseId = this.props.history.location.state.detail.CourseID;
		let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));

		let payload = {
			userID: userinfo.UserID,
			courseID: courseId,
		}
		console.log(payload);
		this.props.actionAddCourseToWishList(payload);
	}

	handleLoginClick = (id = 1) => {
		this.setState({
			showLoginModal: true,
			courseID: id,

		});
	};

	handleLoginClose = () => {
		// if (this.props.history.location.state !== undefined) {
		// 	let payload = {
		// 		"courseID": this.props.history.location.state.detail.CourseID
		// 	};
		// 	this.props.actionGetCourseDetailsById(payload);
		// 	this.props.history.push({
		// 		pathname: "/userscoursedetails",
		// 		state: {
		// 			courseDetail: this.props.history.location.state.detail
		// 		}
		// 	});

		// }
		this.setState({ showLoginModal: false });
	};
	redirectHandle = (e) => {
		// if (this.props.joinCourseReducer.joinedCourse === true && this.props.history.location.state !== undefined) {
		// 	this.props.joinCourseReducer.joinedCourse = false;
		this.props.history.push({
			pathname: "/userscoursedetails",
			state: {
				courseDetail: this.props.history.location.state.detail
			}
		});
	}
	// }

	handleSignUpClick = (id = 1) => {
		this.setState({
			showRegisterModal: true,
			courseID: id
		});
	};

	handleSignUpClose = () => {
		this.setState({ showRegisterModal: false });
	};

	render() {

		let { joinCourseReducer, getCourseDetailsByIdReducer, getUserCoursesReducer, loginReducer, addCourseToWishListReducer } = this.props;

		// console.log(userEnrollCourseReducer);
		let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
		// console.log(userinfo.UserID);

		if (loginReducer.loginAuthenticated === true && this.state.showLoginModal === true) {
			//  && this.props.history.location.state !== undefined) {
			this.handleLoginClose();
			// this.props.history.push({
			// 	pathname: this.props.redirectPath,
			// 	state: {
			// 		detail: this.props.history.location.state.detail
			// 	}
			// })

			// console.log(this.props.state);

		}

		console.log(userinfo);
		console.log(getUserCoursesReducer.courseData);

		console.log(this.props.history.location.state);

		console.log(getCourseDetailsByIdReducer);

		console.log(joinCourseReducer.joinedCourseData);

		if (this.props.joinCourseReducer.joinedCourse === true && this.props.history.location.state !== undefined) {
			this.props.joinCourseReducer.joinedCourse = false;

			this.props.history.push({
				pathname: "/userscoursedetails",
				state: {
					courseDetail: this.props.history.location.state.detail
				}
			});
			window.location.reload();
		}

		return (
			<div className="homeContainer">
				{
					(this.props.history.location.state === undefined || this.props.history.location.state === null || this.props.history.location.state.detail === undefined)
						?
						null :
						<FrontHeader
							handleLoginClick={this.handleLoginClick}
							courseID={this.props.history.location.state.detail.courseID}
							handleSignUpClick={this.handleSignUpClick}
						// courseID={this.state.courseID}
						/>
				}
				<main>
					<div class="bg_color_1">
						{/* <nav class="secondary_nav sticky_horizontal">
			<div class="container">
				<ul class="clearfix">
					<li><a href="#description" class="active">Description</a></li>
					<li><a href="#lessons">Lessons</a></li>
					<li><a href="#reviews">Reviews</a></li>
				</ul>
			</div>
		</nav> */}
						<div class="container margin_60_35 mt-5">
							<div class="row">
								<div class="col-lg-8">
									<section id="description">
										{
											getCourseDetailsByIdReducer.CourseDetailsData.map((courseDetails) => {
												return (
													<Fragment>
														<h2>{courseDetails.CourseName}</h2>
														<p>{courseDetails.CourseSummary}</p>
													</Fragment>
												)
											})
										}
										<h5>What will you learn</h5>
										<ul class="list_ok">
											<li>
												<h6>Suas summo id sed erat erant oporteat</h6>
												<p>Ut unum diceret eos, mel cu velit principes, ut quo inani dolorem mediocritatem. Mea in justo posidonium necessitatibus.</p>
											</li>
											<li>
												<h6>Illud singulis indoctum ad sed</h6>
												<p>Ut unum diceret eos, mel cu velit principes, ut quo inani dolorem mediocritatem. Mea in justo posidonium necessitatibus.</p>
											</li>
											<li>
												<h6>Alterum bonorum mentitum an mel</h6>
												<p>Ut unum diceret eos, mel cu velit principes, ut quo inani dolorem mediocritatem. Mea in justo posidonium necessitatibus.</p>
											</li>
										</ul>
										<hr />
										<p>Mea appareat omittantur eloquentiam ad, nam ei quas oportere democritum. Prima causae admodum id est, ei timeam inimicus sed. Sit an meis aliquam, cetero inermis vel ut. An sit illum euismod facilisis, tamquam vulputate pertinacia eum at.</p>
										<div class="row">
											<div class="col-lg-6">
												<ul class="bullets">
													<li>Dolorem mediocritatem</li>
													<li>Mea appareat</li>
													<li>Prima causae</li>
													<li>Singulis indoctum</li>
												</ul>
											</div>
											<div class="col-lg-6">
												<ul class="bullets">
													<li>Timeam inimicus</li>
													<li>Oportere democritum</li>
													<li>Cetero inermis</li>
													<li>Pertinacia eum</li>
												</ul>
											</div>
										</div>
									</section>

									{
										(this.props.history.location.state === undefined || this.props.history.location.state === null || this.props.history.location.state.detail === undefined)
											?
											null
											:
											<TopicList courseID={this.props.history.location.state.detail.courseID} />
									}


									{/* <ExpansionPanel
										style={{ marginBottom: 5, marginTop: 40 }}
										square
										//color="primary"
										//key={index}
										expanded={true}
									// onChange={this.handleChange(`panel${index}`)}
									>
										<ExpansionPanelSummary style={{ backgroundColor: "#18a595" }}>
											<Typography style={{ color: "#ffffff" }} >Available Contents</Typography>
										</ExpansionPanelSummary>
									</ExpansionPanel>
									{
										getCourseTopicListReducer.gotCourseTopicList === true &&
										getCourseTopicListReducer.gotCourseTopicListData.map((item, index) => {
											
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
													<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
														<Typography>{item.TopicName}</Typography>
													</ExpansionPanelSummary>
													<ExpansionPanelDetails style={{ flexDirection: 'column' }}>

												<SessionList />


													</ExpansionPanelDetails>
												</ExpansionPanel>
											)
										})

									} */}



									<section id="reviews" className="mt-5">
										<h2>Reviews</h2>
										<div class="reviews-container">
											<div class="row">
												<div class="col-lg-3">
													<div id="review_summary">
														<strong>4.7</strong>
														<div class="rating">
															<i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star"></i>
														</div>
														<small>Based on 4 reviews</small>
													</div>
												</div>
												<div class="col-lg-9">
													<div class="row">
														<div class="col-lg-10 col-9">
															<div class="progress">
																<div class="progress-bar" role="progressbar" style={{ width: '90%' }} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
															</div>
														</div>
														<div class="col-lg-2 col-3"><small><strong>5 stars</strong></small></div>
													</div>
													<div class="row">
														<div class="col-lg-10 col-9">
															<div class="progress">
																<div class="progress-bar" role="progressbar" style={{ width: '95%' }} aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
															</div>
														</div>
														<div class="col-lg-2 col-3"><small><strong>4 stars</strong></small></div>
													</div>
													<div class="row">
														<div class="col-lg-10 col-9">
															<div class="progress">
																<div class="progress-bar" role="progressbar" style={{ width: '60%' }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
															</div>
														</div>
														<div class="col-lg-2 col-3"><small><strong>3 stars</strong></small></div>
													</div>
													<div class="row">
														<div class="col-lg-10 col-9">
															<div class="progress">
																<div class="progress-bar" role="progressbar" style={{ width: '20%' }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
															</div>
														</div>
														<div class="col-lg-2 col-3"><small><strong>2 stars</strong></small></div>
													</div>
													<div class="row">
														<div class="col-lg-10 col-9">
															<div class="progress">
																<div class="progress-bar" role="progressbar" style={{ width: 0 }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
															</div>
														</div>
														<div class="col-lg-2 col-3"><small><strong>1 stars</strong></small></div>
													</div>
												</div>
											</div>
										</div>
										<hr />
										<div class="reviews-container">
											<div class="review-box clearfix">
												<figure class="rev-thumb"><img src="http://via.placeholder.com/150x150/ccc/fff/avatar1.jpg" alt="" />
												</figure>
												<div class="rev-content">
													<div class="rating">
														<i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star"></i>
													</div>
													<div class="rev-info">
														Admin – April 03, 2016:
									</div>
													<div class="rev-text">
														<p>
															Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
										</p>
													</div>
												</div>
											</div>
											<div class="review-box clearfix">
												<figure class="rev-thumb"><img src="http://via.placeholder.com/150x150/ccc/fff/avatar2.jpg" alt="" />
												</figure>
												<div class="rev-content">
													<div class="rating">
														<i class="icon-star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star"></i>
													</div>
													<div class="rev-info">
														Ahsan – April 01, 2016:
													</div>
													<div class="rev-text">
														<p>
															Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
														</p>
													</div>
												</div>
											</div>
											<div class="review-box clearfix">
												<figure class="rev-thumb"><img src="http://via.placeholder.com/150x150/ccc/fff/avatar3.jpg" alt="" />
												</figure>
												<div class="rev-content">
													<div class="rating">
														<i class="icon-star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star"></i>
													</div>
													<div class="rev-info">
														Sara – March 31, 2016:
												</div>
													<div class="rev-text">
														<p>
															Sed eget turpis a pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
												</p>
													</div>
												</div>
											</div>
										</div>
									</section>
								</div>

								<aside class="col-lg-4" id="sidebar">
									{
										getCourseDetailsByIdReducer.CourseDetailsData.map((courseDetails) => {
											return (
												<Fragment>
													<div class="box_detail">
														<figure>
															<a href="https://www.youtube.com/watch?v=LDgd_gUcqCw" class="video"><i class="arrow_triangle-right"></i>
																{/* <img src="http://via.placeholder.com/800x533/ccc/fff/course_1.jpg" alt="" class="img-fluid" /> */}
																<img src={courseDetails.iuploadname} alt="" className="courseImg" />
																<span>View course preview</span></a>
														</figure>
														<div class="price">
															<h5><strong>Rs</strong>&nbsp;{courseDetails.Price}</h5>
															{/* <span class="original_price"><em>$49</em>60% discount price</span> */}
														</div>
														{/* <a href="#0" class="btn_1 full-width" type="submit" onClick={(e) => { this.handlePurchase(e) }}> */}
														{
															(getUserCoursesReducer.gotAssignedCourses === true && getUserCoursesReducer.courseData.length > 0 && this.props.history.location.state !== undefined && this.props.history.location.state !== null)
																?
																(
																	getUserCoursesReducer.courseData.map((course) => {
																		return (
																			(course.CourseID === this.props.history.location.state.detail.CourseID)
																				?
																				<a href="" class="btn_1 full-width" type="submit" onClick={(e) => { this.redirectHandle(e) }}>Go to Course</a>
																				:
																				<a href="#0" class="btn_1 full-width" type="submit" onClick={(e) => { this.handlePurchase(e) }}>Purchase</a>
																		)
																	})
																)
																:
																<a href="#0" class="btn_1 full-width" type="submit" onClick={(e) => { this.handlePurchase(e) }}>Purchase</a>
														}
														{/* Purchase
														</a> */}
														{/* <a href="#0" class="btn_1 full-width outline"><i class="icon_heart"></i> Add to wishlist</a> */}


														<a href="#0" class="btn_1 full-width outline" onClick={(event) => { this.handlerAddWishList(event) }}><i class="icon_heart"></i>
															{
																(addCourseToWishListReducer.addedCourseToWishList === true)
																	?
																	" Already added to Wishlist"
																	:
																	" Add to Wishlist"
															}
														</a>
														<div id="list_feat">
															<h3>What's includes</h3>
															<ul>
																<li><i class="icon_mobile"></i>Mobile support</li>
																<li><i class="icon_archive_alt"></i>Lesson archive</li>
																<li><i class="icon_mobile"></i>Mobile support</li>
																<li><i class="icon_chat_alt"></i>Tutor chat</li>
																<li><i class="icon_document_alt"></i>Course certificate</li>
															</ul>
														</div>
													</div>
												</Fragment>
											)
										})
									}
								</aside>
							</div>
						</div>
					</div>
				</main>
				{/* {
					this.props.history.location.state !== undefined ? */}
				{/* : null
				} */}
				<UserLogin
					showLoginModal={this.state.showLoginModal}
					handleLoginClose={this.handleLoginClose}
					courseID={this.state.courseID}
					redirectPath={'/coursedetails'}
				/>
				<RegisterForm
					showRegisterModal={this.state.showRegisterModal}
					handleSignUpClose={this.handleSignUpClose}
					courseID={this.state.courseID}
					redirectPath={'/coursedetails'}
				/>
				<FrontFooter />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return state
}

export default (connect(mapStateToProps, { actionGetCourseTopicList, actionGetMaterialByTopic, actionUserEnrollCourse, actionGetCourseDetailsById, actionGetCourseList, actionGetAssignedCourses, actionJoinCourse, loginAction, actionAddCourseToWishList })(CourseDetails));

					// {
					// 											(getUserCoursesReducer.gotAssignedCourses === true && getUserCoursesReducer.courseData.length > 0)
					// 												?
					// 												(
					// 													getUserCoursesReducer.courseData.map((course) => {
					// 														return (
					// 															(course.CourseID === this.props.history.location.state.detail.CourseID)
					// 																?
					// 																"Go to Course"
					// 																:
					// 																"Purchase"
					// 														)
					// 													})
					// 												)
					// 												:
					// 												"Purchase"
					//
