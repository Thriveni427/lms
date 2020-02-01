import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Select from 'react-select';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { withFormik } from "formik";
import * as Yup from "yup";
import { bindActionCreators } from "redux";

import Logo from "./images/lms-logo-2.png";


import combinedStyles from '../material-ui'
import { guestUserRegistrationAction } from '../actions/guestUserRegistrationAction';


export class RegisterForm extends Component {

	state = {
		selectedOption: null,
		fullWidth: false,
		maxWidth: 'sm',
	}

	handleChange = (selectedOption) => {
		this.setState({ selectedOption });
	}

	componentDidMount = () => {
		// let userinfo = JSON.parse(sessionStorage.getItem('userinfo'));
		console.log(this.props);
	}

	handleSignUp = () => {
		console.log(this.state.selectedOption);
		console.log(this.props);

		let payload = this.props.values;
		console.log(payload);

		this.props.guestUserRegistrationAction(payload);
	}

	handleSignUpClose = () => {
		this.setState({ loginSuccess: true });
		this.props.handleSignUpClose();
	};

	handleGetLoginForm = () => {
		this.props.handleSignUpClose();
		this.props.handleLoginClick();
	}

	render() {

		let {
			values,
			touched,
			errors,
			handleChange,
			handleSubmit,
			classes,
			loginReducer
		} = this.props;

		if (loginReducer.loginAuthenticated === true && this.state.loginSuccess === false) {
			this.handleSignUpClose();
			this.props.history.push({
				pathname: this.props.redirectPath,	//'/editbatch',
				// state:{batch:row}
			})
		}

		return (
			<div>
				<form onSubmit={handleSubmit} noValidate autoComplete="off">
					<Dialog
						fullWidth={this.state.fullWidth}
						maxWidth={this.state.maxWidth}
						open={this.props.showRegisterModal}
						onClose={this.props.handleSignUpClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
						<DialogContent style={{ minHeight: 300 }}>
							<DialogContentText>
								<img src={Logo} width="130" alt="login" />
							</DialogContentText>
							<FormControl fullWidth>
								<TextField
									required
									id="fullname"
									label="Fullname"
									margin="normal"
									// type="firstname"
									onChange={handleChange}
									value={values.fullname}
									InputProps={{ classes: { input: classes.textField } }}
									error={errors.fullname && touched.fullname ? true : false}
								/>
								{errors.fullname && touched.fullname && (
									<div className="errorMsg">{errors.fullname}</div>
								)}
							</FormControl>
							<FormControl fullWidth>
								<TextField
									required
									// error={errors.email && touched.email ? true : false}
									id="email"
									label="Email Address"
									margin="normal"
									onChange={handleChange}
									value={values.email}
									InputProps={{ classes: { input: classes.textField } }}
								/>
								{errors.email && touched.email && (
									<div className="errorMsg">{errors.email}</div>
								)}
							</FormControl>
							<FormControl fullWidth>
								<TextField
									required
									id="password"
									label="Password"
									margin="normal"
									type="password"
									autoComplete="current-password"
									onChange={handleChange}
									value={values.password}
									InputProps={{ classes: { input: classes.textField } }}
									error={errors.password && touched.password ? true : false}
								/>
								{errors.password && touched.password && (
									<div className="errorMsg">{errors.password}</div>
								)}
							</FormControl>
							{/* </DialogContent>
						<DialogActions> */}
							<div className="mt-4 mb-2 d-flex align-items-center justify-content-between">
								<Button
									variant="contained"
									onClick={this.handleSignUp}
									// type="submit"
									className={[classes.button, classes.buttonPrimary]}
								>
									Register
              					</Button>
								<div className="mt-1 ml-2" onClick={this.handleGetLoginForm}>
									Already have an account? {" "}
									<strong>Log In</strong>
								</div>
								<div>
								</div>
							</div>
						</DialogContent>
					</Dialog>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ guestUserRegistrationAction }, dispatch);
};

const formikEnhancer = withFormik({
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email("Please enter a valid email address")
			.required("Please enter email address"),
		fullname: Yup.string().required("Please enter fullname"),
		// 	.fullname("Please enter a fullname ")

		password: Yup.string().required("Please enter password")
	}),
	mapPropsToValues: () => ({
		email: "",
		password: "",
		fullname: "",
	}),
	handleSubmit: (payload) => {
		// console.log(props)
		console.log(payload);
		//props.history.push({pathname: '/users',})
		// props.guestUserRegistrationAction(payload);
	},
	displayName: "RegisterForm"
})(RegisterForm);

const userRegisterForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(formikEnhancer);


export default withRouter(withStyles(combinedStyles)(userRegisterForm));