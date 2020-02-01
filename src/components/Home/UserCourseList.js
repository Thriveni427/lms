/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FrontHeader from "../FrontHeader";
import FrontFooter from "../FrontFooter";
import LearningCategorie from './LearningCategorie';
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";


import combinedStyles from "../../material-ui/combineStyles";
import { actionGetCourseList } from "../../actions/actionGetCourseList";
import { actionGetCoursesByCategory } from "../../actions/Home/actionGetCoursesByCategory";


export class UserCourseList extends Component {
	static propTypes = {
		prop: PropTypes
	};

	// handleClickCategoryByCourse = Categoryitem => {
	// 	this.props.history.push({
	// 		pathname: "/coursedetails",
	// 		state: { detail: Categoryitem }
	// 	});
	// 	console.log(Categoryitem);
	// };


	handleClick = item => {
		this.props.history.push({
			pathname: "/coursedetails",
			state: { detail: item }
		});
		console.log(item);
	};

	componentDidMount = () => {
		this.props.actionGetCourseList();
		// this.props.actionGetCoursesByCategory();
		console.log(this.props);

	}

	render() {
		const { getCourseListReducer, getCoursesByCategoryReducer } = this.props;
		console.log(this.props);
		return (
			<div className="homeContainer">
				<FrontHeader />
				<main>
					<div className="container-fluid margin_60_35 mt-5">
						<div className="row">
							<div className="col-md-3" >
								<LearningCategorie />
							</div>
							<div className="col-md-9">
								<div className="row">
									{
										(
											(getCoursesByCategoryReducer.gettingCoursesByCategory === false)
												?
												null
												:
												(
													(getCoursesByCategoryReducer.gettingCoursesByCategoryData.length < 1)
														?
														<h4> No courses are available in this category </h4>
														:
														(
															getCoursesByCategoryReducer.gettingCoursesByCategoryData.map((Categoryitem, k) => {
																let descByCatogory = Categoryitem.CourseSummary;
																if (descByCatogory.length > 50) {
																	descByCatogory = descByCatogory.substring(0, 50);
																} else {
																	descByCatogory = Categoryitem.CourseSummary;
																}
																return (
																	<div className="col-sm-4" key={k}>
																		<div className="box_grid wow">
																			<figure className="block-reveal">
																				<a href="#" className="wish_bt"></a>
																				<div
																					className="card d-flex justify-content-center"
																					style={{
																						height: 150,
																						width: "100%",
																						overflow: "hidden"
																					}}
																				>
																					<a >
																						<img
																							src={
																								Categoryitem.iuploadname == null
																									? " "
																									: Categoryitem.iuploadname.slice(0, -1)
																							}
																							className="img-fluid"
																							alt=""
																						/>
																					</a>
																				</div>
																				<div className="price">$54</div>
																				<div className="preview"><span >Preview course</span></div>
																			</figure>
																			<div className="wrapper">
																				<small>{Categoryitem.CategoryName}</small>
																				<h3>{Categoryitem.Name}</h3>
																				<p>{descByCatogory}
																				</p>
																				<div className="rating"><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star"></i><i className="icon_star"></i> <small>(145)</small></div>
																			</div>
																			<ul>
																				<li><i className="icon_clock_alt"></i> 1h 30min</li>
																				<li><i className="icon_like"></i> 890</li>
																				<li><a  >Preview course</a></li>
																			</ul>
																		</div>
																	</div>
																)
															}
															)
														)
												)
										)
									}
								</div>
								<div className="row">
									{
										(
											(getCoursesByCategoryReducer.gettingCoursesByCategory === false && getCourseListReducer.fetchedCourses === true) &&
											getCourseListReducer.coursesData.map((item, i) => {
												let desc = item.CourseSummary;
												if (desc.length > 50) {
													desc = desc.substring(0, 50);
												} else {
													desc = item.CourseSummary;
												}
												return (
													<div className="col-sm-4" key={i}>
														<div className="box_grid wow">
															<figure className="block-reveal">
																{/* <div className="block-horizzontal"></div> */}
																<a href="#0" className="wish_bt"></a>

																<div
																	className="card d-flex justify-content-center"
																	style={{
																		height: 150,
																		width: "100%",
																		overflow: "hidden"
																	}}
																>
																	<a onClick={() => this.handleClick(item)}>
																		<img
																			src={
																				item.iuploadname == null
																					? " "
																					: item.iuploadname.slice(0, -1)
																			}
																			className="img-fluid"
																			alt=""
																		/>
																	</a>
																</div>
																<div className="price">$54</div>
																<div className="preview"><span onClick={() => this.handleClick(item)}>Preview course</span></div>
															</figure>
															<div className="wrapper">
																<small>{item.CategoryName}</small>
																<h3>{item.CourseName}</h3>
																<p>{desc}
																</p>
																<div className="rating"><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star"></i><i className="icon_star"></i> <small>(145)</small></div>
															</div>
															<ul>
																<li><i className="icon_clock_alt"></i> 1h 30min</li>
																<li><i className="icon_like"></i> 890</li>
																<li><a onClick={() => this.handleClick(item)} >Preview course</a></li>
															</ul>
														</div>
													</div>
												)
											}
											))
									}

								</div>
								{/* <p className="text-center"><a href="#0" className="btn_1 rounded add_top_30">Load more</a></p> */}
							</div>
						</div>
					</div>
				</main>
				<FrontFooter />
			</div>
		);
	}
}



const mapStateToProps = state => {
	return state;
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			actionGetCourseList,
			actionGetCoursesByCategory
		},
		dispatch
	);
};
const formikEnhancer = withFormik({
	mapPropsToValues: () => ({}),
	displayName: "UserCourseList"
})(UserCourseList);

const CoursesForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(formikEnhancer);

export default withRouter(withStyles(combinedStyles)(CoursesForm));
