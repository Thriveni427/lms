import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { withFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { ToastContainer } from "react-toastify";


import combinedStyles from "../material-ui";
import Logo from "./images/lms-logo-2.png";
import { loginAction } from "../actions/loginAction";


function SignIn(props) {

  // const [flag, setFlag]
  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    history,
    classes,
    loginReducer
  } = props;
  console.log(props);

  // if (loginReducer.loginAuthenticated === true) {
  //   loginReducer.loginAuthenticated = false;
  //   history.push({
  //     pathname: "/dashboard"
  //   });
  // }
  if (sessionStorage.getItem("loginAuth")) {
    history.push({
      pathname: "/dashboard"
    });
  }
  else {
    console.log("Login failed : ", loginReducer);
  }
  // this.setState({
  //   errors: loginAuth.errors,
  //   flag: false,
  //   msg: props.auth.data
  // });

  // if(sessionStorage.getItem('loginAuth') === true){
  //   history.push({
  //     pathname: '/dashboard',
  //   })
  // }

  // console.log(props.loginReducer.loginAuth.UserID)

  // if(loginReducer.loginAuthenticated === true){

  //   localStorage.clear()

  //   if(loginReducer.loginAuth.VendorID !== undefined){
  //     localStorage.setItem("VendorID", loginReducer.loginAuth.VendorID)
  //   }else{
  //     localStorage.setItem("RoleID", loginReducer.loginAuth.RoleID)
  //     localStorage.setItem("UserID", loginReducer.loginAuth.UserID)
  //   }

  //   history.push({
  //     pathname: '/dashboard',
  //   })
  // }

  return (
    <main className="c-mainContainer h-100vh d-flex justify-content-center align-items-center">
      <ToastContainer autoClose={2000} />
      <div className="c-loginForm d-flex fullwidth">
        <div className="c-loginForm__left">
          <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <img src={Logo} width="130" alt="login" />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
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
            <div className="mb-3 mt-4 d-flex align-items-center justify-content-between">
              <Button
                variant="contained"
                type="submit"
                className={[classes.button, classes.buttonPrimary]}
              >
                Sign in
              </Button>
              <div>
                No account?{" "}
                <Link className="mt-2" to="/login">
                  Create one!
                </Link>
              </div>
            </div>
            {/* <div className="mb-3 mt-4 d-flex align-items-center justify-content-between">
              <div>or connect with</div>
              <div className="c-socialList">
              <IconButton>
                <Icon className={[classes.icon, 'fab fa-facebook-f']} />
              </IconButton>
              <IconButton>
                <Icon className={[classes.icon, 'fab fa-twitter']} />
              </IconButton>
              <IconButton>
                <Icon className={[classes.icon, 'fab fa-linkedin-in']} />
              </IconButton>
              </div>
            </div> */}
          </form>
        </div>
      </div>
      {/* {flag === false && (
        <div align="center" className="error-Lmessage ">
          <h5>{loginReducer.loginAuthError}</h5>
        </div>
      )} */}
    </main>
  );
}

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
    // console.log(payload)
    //props.history.push({pathname: '/users',})
    // console.log(props.loginAction(payload));
    
    props.loginAction(payload);
    // .then(
    //   () => {
    //     props.history.push({
    //       pathname: "/dashboard"
    //     });
    //   }
    // )
    //   .catch((err) => {
    //     console.log(err);

    //   })
  },
  displayName: "SignIn"
})(SignIn);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginAction }, dispatch);
};
const MainLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

export default withRouter(withStyles(combinedStyles)(MainLogin));