import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';
import Videocam from '@material-ui/icons/Videocam';
import Help from '@material-ui/icons/Help';
import Image from '@material-ui/icons/Image';
import Assignment from '@material-ui/icons/Assignment';


export class SessionList extends Component {

	render() {

		let { getMaterialByTopicReducer } = this.props;

		return (
			<div>
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
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}

export default (connect(mapStateToProps))(SessionList);
// export default (connect(mapStateToProps, { actionGetCourseTopicList, actionGetMaterialByTopic, actionUserEnrollCourse, actionGetCourseDetailsById, actionGetCourseList, actionGetAssignedCourses, actionJoinCourse })(SessionList));
