import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



import SessionList from './SessionList';
import { actionGetMaterialByTopic } from '../../actions/Courses/actionGetMaterialByTopic';




export class TopicList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			topicIndex: -1,
		}
	}

	componentDidMount = () => {
		console.log(this.props);

	}

	fetchMaterial = (id) => {
		console.log("fetchMaterial props : ", this.props);
		let courseID = sessionStorage.getItem("courseID");
		let payload = {
			courseID: courseID,
			topicID: id
		};
		console.log(payload);

		// this.props.actionGetMaterialBySession(payload);
		this.props.actionGetMaterialByTopic(payload);
		localStorage.setItem("sectionID", id);
	}

	handleExpansionChange = (index, event, id) => {
		console.log(id);
		console.log(index);
		event.preventDefault();


		if (this.state.topicIndex === index) {
			this.setState({
				topicIndex: -1,
			});
		}
		else {
			this.fetchMaterial(id);
			this.setState({
				topicIndex: index,
			});
		}
	};

	render() {

		console.log(this.props);

		let { getCourseTopicListReducer } = this.props;
		let courseID = sessionStorage.getItem("courseID");
		console.log(courseID);
		
		return (
			<div>

				{
					(courseID === null || courseID === undefined)
						?
						null
						:
						(



							<Fragment>
								<ExpansionPanel
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
										// getMaterialBySectionReducer.MaterialBySectionData.map((item, index) => {
										console.log(item)
										return (
											<ExpansionPanel
												style={{ marginBottom: 5 }}
												square
												key={index}
												expanded={this.state.topicIndex === index ? true : false}
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

								}
							</Fragment>




				 		)
				 }


			</div>
		)
	}
}


const mapStateToProps = state => {
	return state
}

export default (connect(mapStateToProps, { actionGetMaterialByTopic }))(TopicList);