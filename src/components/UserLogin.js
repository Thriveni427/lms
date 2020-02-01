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
import { loginAction } from '../actions/loginAction';


export class UserLogin extends Component {

	state = {
		selectedOption: null,
		fullWidth: false,
		maxWidth: 'sm',
		loginSuccess: false,
	}

	handleChange = (selectedOption) => {
		this.setState({ selectedOption });
	}

	componentDidMount = () => {
		// let userinfo = JSON.parse(sessionStorage.getItem('userinfo'));
		console.log(this.props);
	}

	handleLogin = () => {
		console.log(this.state.selectedOption);
		console.log(this.props);

		let payload = this.props.values;
		console.log(payload);
		this.setState({ showLoginModal: true });
		this.props.loginAction(payload);
	}

	handleLoginClose = () => {
		this.setState({ loginSuccess: true });
		this.props.handleLoginClose();
	};
	handleSignUpForm = () => {
		this.props.handleLoginClose();
		this.props.handleSignUpClick();
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
			this.handleLoginClose();

			// this.props.history.push({
			// 	pathname: this.props.redirectPath,	//'/editbatch',
			// 	// state:{batch:row}
			//   })
		}

		return (
			<div>
				{/* <ToastContainer autoClose={2000} /> */}
				<form onSubmit={handleSubmit} noValidate autoComplete="off">
					<Dialog
						fullWidth={this.state.fullWidth}
						maxWidth={this.state.maxWidth}
						open={this.props.showLoginModal}
						onClose={this.props.handleLoginClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Login</DialogTitle>
						<DialogContent style={{ minHeight: 300 }}>
							<DialogContentText>
								<img src={Logo} width="130" alt="login" />
							</DialogContentText>
							<FormControl fullWidth>
								<TextField
									required
									error={errors.email && touched.email ? true : false}
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
							<div className="mt-5 signBtn d-flex align-items-center justify-content-between">
								<div className="mr-3">
									<Button
										variant="contained"
										type="submit"
										onClick={this.handleLogin}
										className={[classes.button, classes.buttonPrimary]}
									>
										Sign in
              					</Button>
								</div>
								<div className="mt-1" onClick={this.handleSignUpForm}>
									No account?{" "}
									{/* <Link className="mt-2" to="/registerform"> */}
									<strong>Create one!</strong>
									{/* </Link> */}
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
	return bindActionCreators({ loginAction }, dispatch);
};

const formikEnhancer = withFormik({
	validationSchema: Yup.object().shape({
		email: Yup.string()
			.email("Please enter a valid email address")
			.required("Please enter email address"),
		password: Yup.string().required("Please enter password")
	}),
	mapPropsToValues: () => ({
		email: "",
		password: ""
	}),
	handleSubmit: (payload, { props }) => {
		// console.log(props)
		console.log(payload);
		//props.history.push({pathname: '/users',})
		props.loginAction(payload);
	},
	displayName: "UserLogin"
})(UserLogin);

const UserLoginForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(formikEnhancer);

// export default withRouter(withStyles(combinedStyles)(connect(mapStateToProps, mapDispatchToProps)(UserLogin)));
export default withRouter(withStyles(combinedStyles)(UserLoginForm));