import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';


import combinedStyles from '../../../material-ui';
import { actionGetLiveClassDetails } from '../../../actions/LiveClasses/Users/actionGetLiveClassDetails';
// import { actionEditUserDetails } from './../../actions/actionGetUserDetails';
// import { actionEditQuestionBank } from '../../actions/actionEditQuestionBank';


export class LiveClassDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            match:[],
            
        }
    }

    componentDidMount = () => {
        console.log(this.props);
        this.props.actionGetLiveClassDetails(this.props.singleLive);
        //{GLOBAL.IMAGE_HOST + arr.ioriginalname}
    }

		render() {

		const {
				handleSubmit,
				getLiveClassDetailsReducer,
				classes,
				singleLive,
		} = this.props;

		console.log(getLiveClassDetailsReducer.LiveClassDetailData);
		return (
		<React.Fragment>
			<ToastContainer
				autoClose={2000}
			/>
	<div className="row">
		<div className="col">
			<div className="">
				<div className="content">
					<form onSubmit={handleSubmit} noValidate autoComplete="off">
						<div className="c-formSection mt-4">
							<div className="col-md-12">
								<div className="row">
									<div className="col-md-9">
										<div className="row">
											<div className="col-md-6">Live Class Name</div>
												<div className="col-md-6">
													<p>{singleLive.ClassName}</p>
												</div>
										</div>

									<div className="row">
											<div className="col-md-6">Instructor Name</div>
											<div className="col-md-6"><p>2zxc</p></div>
									</div>

									<div className="row">
											<div className="col-md-6">Number Of Participants</div>
											<div className="col-md-6"><p>{singleLive.AllocatedSeats}</p></div>
									</div>

									<div className="row">
											<div className="col-md-6">Mode of Training</div>
											<div className="col-md-6"><p>{singleLive.Medium}</p></div>
									</div>

									<div className="row">
											<div className="col-md-6">Live Class Objective</div>
											<div className="col-md-6"><p>{singleLive.CourseObjective}</p></div>
									</div>

									</div>
																														
																														<div className="col-md-3">
																																<Card className={classes.imgShadow} style={{ width:200 , height:'auto' }}>
																																		<CardActionArea>
																																				<CardMedia
																																						component="img"
																																						alt="Contemplative Reptile"
																																						// className={classes.media}
																																						height="100"
																																						// width="10"
																																						image={singleLive.iuploadname == null ? " ": singleLive.iuploadname.slice(0, -1)} 
																																						title="Contemplative Reptile"
																																						marginLeft="20"
																																				/>
																																		</CardActionArea>
																																</Card>
																														</div>


																												</div>
																										
																				</div>

																		</div>
																		<div className="c-formSection pt-4 pb-4" style={{justifyContent:'center'}}>
																				<Button
																						variant="contained"
																						className={[classes.button, classes.buttonPrimary]}
																						type="submit">
																						Join Now
																				</Button>

																				<Button variant="contained" className={[classes.button, classes.buttonSecondary]}
																						onClick={this.props.handleClose}
																				>
																						CANCEL
																				</Button>

																		</div>
																</form>
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

function mapDispatchToProps(dispatch) {
    return  bindActionCreators({actionGetLiveClassDetails},dispatch)

}


const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        // firstname: Yup.string().required('Please enter first name'),
        // mi: Yup.string().required('Please enter middle name'),
        // lastname: Yup.string().required('Please enter last name'),
        // emailid: Yup.string().email('Please enter a valid email address')
        //   .required('Please enter email address'),
        // contactno: Yup.string().required('Please enter contactno '),
        // createddate: Yup.string().required('Please enter created date'),
        // role: Yup.string().required('Please select a role'),

    }),
    mapPropsToValues: (function () {
        //console.log(props.singleBank);
        // console.log(typeof props.singleBank.QuestionBankVisibility);
        //console.log(props.singleBank.QuestionBankID);
        //     if(props.singleBank === undefined){
        //       return{
        //         questionBankName: '',
        // 		questionBankVisibility:'',
        // 		courseID:''
        //       }
        //     }else{
        //       return{
        //         questionBankName: props.singleBank.QuestionBankName,
        // 		questionBankVisibility: props.singleBank.QuestionBankVisibility === 1 ? true : false,
        // 	    courseID:props.singleBank.QuestionBankID,


        //       }
        //   }
    }),

    handleSubmit: (payload) => {
        console.log(JSON.stringify(payload))
        let value = payload["questionBankVisibility"];
        payload["questionBankVisibility"] = ((value === true) ? 1 : 0);
        // props.actionEditQuestionBank(payload);
    },
    displayName: 'LiveClassDetails',
})(LiveClassDetails);

const LiveClassDetailsForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(LiveClassDetailsForm)))
