import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { loadCSS } from "fg-loadcss/src/loadCSS";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSlidersH,
  faBriefcase,
  faUsers,
  faBook,
  faNewspaper,
  faDesktop,
  faChartArea,
  faCommentAlt
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import theme from "./../material-ui/theme";
import combinedStyles from "../material-ui/index";
import PageNotFound from "./PageNotFound";
import ComingSoon from "./ComingSoon";


// Components
import AdminLogin from "./AdminLogin";
import Home from "./Home/index";
import Events from "./Events/index";
import Layout from "./Layout";

import SuperAdminDashboard from "./SuperAdminDashboard";


import UserList from "./Users/UserList";
import AddUser from "./Users/AddUser";
import EditUser from "./Users/EditUser";
import BulkUpload from "./Users/BulkUpload";
import VendorsList from "./Vendors/VendorsList";
import VendorRegistration from "./Vendors/VendorRegistration";
import AddVendor from "./Vendors/AddVendor";
import EditVendor from "./Vendors/EditVendor";
import Dashboard from "./Dashboard";
import UsersDashboard from "./UsersDashboard";
import CreateCourse from "./Courses/CreateCourse";
import CreateCourseStepTwo from "./Courses/CreateCourseStepTwo";

import AddCategory from "./Category/AddCategory";
import GetCategoryList from "./Category/GetCategoryList";
import EditCategory from "./Category/EditCategory";

import CreateBatch from "./Batches/CreateBatch";
import EditBatch from "./Batches/EditBatch";
import BatchList from "./Batches/BatchList";
import AssignCourse from "./Courses/AssignCourse";
import CourseList from "./Courses/CourseList";
import MyBatches from "./Batches/MyBatches";

import CreateLiveClass from "./LiveClasses/CreateLiveClass";
import LiveClasses from "./LiveClasses/LiveClasses";
import EditLiveClass from "./LiveClasses/EditLiveClass";
import ViewLiveClass from "./LiveClasses/ViewLiveClass";

import EditQuestionBank from "./TestPapers/EditQuestionBank";
import QuestionBankList from "./TestPapers/QuestionBankList";
import QuestionList from "./TestPapers/QuestionList";
import EditQuestion from "./TestPapers/EditQuestion";
import CreateQuestion from "./TestPapers/CreateQuestion";
import CreateQuestionMcq from "./TestPapers/CreateQuestionMcq";
import CreateQuestionPaper from "./TestPapers/CreateQuestionPaper";
import QuestionPaperList from "./TestPapers/QuestionPaperList";
import EditQuestionPaper from "./TestPapers/EditQuestionPaper";
import ViewQuestion from "./TestPapers/ViewQuestion";

import UserListReports from "./Reports/UserListReports";
import ContentLibrary from "./ContentLibrary";
import Courses from "./Courses/Users/Courses";
import UploadCourse from "./Courses/UploadCourse";


import TakeTest from "./Courses/TakeTest";
import TakeTestResult from "./Courses/Users/TakeTestResult";
import TakeTestResultForAdmin from "./Courses/Users/TakeTestResultForAdmin";

import Scorm from "./Courses/Scorm";
import SetupEditBar from "./Courses/SetupEditBar";
import ViewCourseBar from "./Courses/ViewCourseBar";

import Permission from "./SuperAdmin/Permission";

import UsersCourseContent from "./Courses/Users/UsersCourseContent";
import UsersCourseDetails from "./Courses/Users/UsersCourseDetails";

import UserLiveClass from "./LiveClasses/Users/UserLiveClass";
import LiveClassDetails from "./LiveClasses/Users/LiveClassDetails";
import Gamifications from "./Gamifications";

import ManageRole from "./ManageRoles/ManageRoles";

import CourseDetails from "./Home/CourseDetails";
import PopularCourses from "./Home/PopularCourses/PopularCourses";

import UserCourseList from "./Home/UserCourseList";
import ViewBatch from "./Batches/ViewBatch"
import SignIn from "./Login";
import { AddQuestions } from "./Courses/AddQuestions";
import  VendorDashboard  from "../components/VendorDashboard";
import  TrainerDashboard from "../components/TrainerDashboard";


library.add(
  faSlidersH,
  faBriefcase,
  faUsers,
  faBook,
  faNewspaper,
  faDesktop,
  faChartArea,
  faCommentAlt
);

const LoginLayout = ({ children, ...rest }) => {
  return <React.Fragment>{children}</React.Fragment>;
};

const LoginLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <LoginLayout>
          <Component {...matchProps} />
        </LoginLayout>
      )}
    />
  );
};

const HomeLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <LoginLayout>
          <Component {...matchProps} />
        </LoginLayout>
      )}
    />
  );
};

const DashboardLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        sessionStorage.getItem("loginAuth") === "true" ? (
          <Layout>
            {" "}
            <Component {...props} />
          </Layout>
        ) : (
            <Redirect to="/home" />
          )
      }
    />
  );
};

class App extends Component {
  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#insertion-point-jss")
    );
  }

  render() {
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    if (userinfo === null) userinfo = [];
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <LoginLayoutRoute path="/adminlogin" component={AdminLogin} />
            <LoginLayoutRoute exact path="/" component={SignIn} />
            <LoginLayoutRoute path="/login" component={SignIn} />
            {/* <HomeLayoutRoute path="/" exact component={Home} /> */}
            {/* <HomeLayoutRoute path="/" exact component={Home} /> */}
            <HomeLayoutRoute path="/home" component={Home} />
            <HomeLayoutRoute path="/coursedetails" component={CourseDetails} />
            <HomeLayoutRoute
              path="/coursebycategory"
              component={UserCourseList}
            />
            <HomeLayoutRoute
              path="/popularcourses"
              component={PopularCourses}
            />
            <DashboardLayoutRoute path="/users" component={UserList} />
            <DashboardLayoutRoute path="/adduser" component={AddUser} />
            <DashboardLayoutRoute path="/edituser" component={EditUser} />
            {
              userinfo.userType === "vendor" || userinfo.userType === "admin" || userinfo.userType === "trainer" || userinfo.userType === "trainer"
                ?
                <DashboardLayoutRoute path="/batches" component={BatchList} />
                :
                <DashboardLayoutRoute path="/batches" component={MyBatches} />
            }
            <DashboardLayoutRoute path="/createbatch" component={CreateBatch} />
            <DashboardLayoutRoute path="/editbatch" component={EditBatch} />
            <DashboardLayoutRoute path="/viewbatch" component={ViewBatch} />

            <DashboardLayoutRoute path="/vendors" component={VendorsList} />
            <DashboardLayoutRoute path="/addquestions" component={AddQuestions} />
            <DashboardLayoutRoute path="/editvendor" component={EditVendor} />
            <DashboardLayoutRoute path="/addvendor" component={AddVendor} />
            <DashboardLayoutRoute path="/events" component={Events} />
            <DashboardLayoutRoute path="/liveclasses" component={LiveClasses} />
            <DashboardLayoutRoute path="/bulkupload" component={BulkUpload} />
            <DashboardLayoutRoute
              path="/createclass"
              component={CreateLiveClass}
            />
            <DashboardLayoutRoute
              path="/editliveclass"
              component={EditLiveClass}
            />
            {/* <DashboardLayoutRoute path="/dashboard" component={Dashboard} /> */}
            {/* {
              userinfo.userType === "admin" || userinfo.userType === "vendor" || userinfo.userType === "trainer"
                ?
                (
                  <DashboardLayoutRoute path="/dashboard" component={Dashboard} />
                )
                :
                (
                  userinfo.userType === "superadmin"
                  ?
                <DashboardLayoutRoute
                  path="/dashboard"
                  component={SuperAdminDashboard}
                />
                  :
                  <DashboardLayoutRoute
                    path="/dashboard"
                    component={UsersDashboard}
                  />
                )
            } */}
            {
            userinfo.userType === "vendor" &&
            <DashboardLayoutRoute
                  path="/dashboard"
                  component={VendorDashboard}
                />
            }
            {
            userinfo.userType === "admin" &&
            <DashboardLayoutRoute
                  path="/dashboard"
                  component={Dashboard}
                />
            }
            {
            userinfo.userType === "trainer" &&
            <DashboardLayoutRoute
                  path="/dashboard"
                  component={TrainerDashboard}
                />
            }
            {
            userinfo.userType === "superadmin" &&
            <DashboardLayoutRoute
                  path="/dashboard"
                  component={SuperAdminDashboard}
                />
            }
            {
            userinfo.userType === "learner" &&
            <DashboardLayoutRoute
                  path="/dashboard"
                  component={UsersDashboard}
                />
            }
            
            {/* {
              userinfo.userType === "superadmin" 
              ?
              (
                <DashboardLayoutRoute
                  path="/dashboard"
                  component={SuperAdminDashboard}
                />
              )
              :
                ( 
                  userinfo.userType === "admin" || userinfo.userType === "vendor" || userinfo.userType === "trainer"
                  ?
                  <DashboardLayoutRoute path="/dashboard" component={Dashboard} />                 
                :               
                  <DashboardLayoutRoute
                    path="/dashboard"
                    component={UsersDashboard}
                  />
                )

              } */}

            {/* {userinfo.userType === "admin" ||
              userinfo.userType === "vendor" ||
              userinfo.userType === "trainer" ||
              userinfo.userType === "superadmin" ? (
                <DashboardLayoutRoute
                  path="/alltestresults"
                  component={TakeTestResultForAdmin}
                />
              ) : (
                <DashboardLayoutRoute
                  path="/dashboard"
                  component={UsersDashboard}
                />
              )} */}
            <DashboardLayoutRoute
              path="/createcourse"
              component={CreateCourse}
            />
            <DashboardLayoutRoute
              path="/assesments"
              component={CreateCourseStepTwo}
            />

            {userinfo.userType === "admin" ||
              userinfo.userType === "vendor" ||
              userinfo.userType === "trainer" ||
              userinfo.userType === "superadmin" ? (
                <DashboardLayoutRoute path="/courses" component={CourseList} />
              ) : (
                <DashboardLayoutRoute path="/courses" component={Courses} />
              )}

            <DashboardLayoutRoute
              path="/uploadcourse"
              component={UploadCourse}
            />
            <DashboardLayoutRoute
              path="/viewcourse"
              component={ViewCourseBar}
            />
            <DashboardLayoutRoute path="/addcategory" component={AddCategory} />
            <DashboardLayoutRoute
              path="/coursecategory"
              component={GetCategoryList}
            />
            <DashboardLayoutRoute
              path="/editcategory"
              component={EditCategory}
            />
            <DashboardLayoutRoute
              path="/questionbank"
              component={QuestionBankList}
            />
            <DashboardLayoutRoute
              path="/questionpaper"
              component={QuestionPaperList}
            />
            <DashboardLayoutRoute path="/question" component={QuestionList} />
            <DashboardLayoutRoute
              path="/viewquestion"
              component={ViewQuestion}
            />
            <DashboardLayoutRoute
              path="/createquestion"
              component={CreateQuestion}
            />
            <DashboardLayoutRoute
              path="/createquestionmcq"
              component={CreateQuestionMcq}
            />
            <DashboardLayoutRoute
              path="/createquestionpaper"
              component={CreateQuestionPaper}
            />
            <DashboardLayoutRoute
              path="/editquestionpaper"
              component={EditQuestionPaper}
            />
            <DashboardLayoutRoute
              path="/editquestion"
              component={EditQuestion}
            />
            <DashboardLayoutRoute
              path="/register"
              component={VendorRegistration}
            />
            <DashboardLayoutRoute
              path="/contentlibrary"
              component={ContentLibrary}
            />
            <DashboardLayoutRoute
              path="/userlistreports"
              component={UserListReports}
            />
            <DashboardLayoutRoute
              path="/viewliveclass"
              component={ViewLiveClass}
            />
            <DashboardLayoutRoute
              path="/editquestionbank"
              component={EditQuestionBank}
            />
            <DashboardLayoutRoute path="/taketest" component={TakeTest} />

            {userinfo.userType === "admin" ||
              userinfo.userType === "vendor" ||
              userinfo.userType === "trainer" ||
              userinfo.userType === "superadmin"? (
                <DashboardLayoutRoute
                  path="/alltestresult"
                  component={TakeTestResultForAdmin}
                />
              ) : (
                <DashboardLayoutRoute
                  path="/taketestresult"
                  component={TakeTestResult}
                />
              )}

            <DashboardLayoutRoute
              path="/taketestresult"
              component={TakeTestResult}
            />
            <DashboardLayoutRoute path="/scorm" component={Scorm} />
            <DashboardLayoutRoute
              path="/setupeditbar"
              component={SetupEditBar}
            />
            <DashboardLayoutRoute path="/permission" component={Permission} />
            <DashboardLayoutRoute
              path="/userscoursedetails"
              component={UsersCourseDetails}
            />
            <DashboardLayoutRoute
              path="/userscoursecontent"
              component={UsersCourseContent}
            />
            <DashboardLayoutRoute
              path="/userliveclass"
              component={UserLiveClass}
            />
            <DashboardLayoutRoute
              path="/liveclassdetails"
              component={LiveClassDetails}
            />
            <DashboardLayoutRoute
              path="/gamification"
              component={Gamifications}
            />
            <DashboardLayoutRoute
              path="/assigncourse"
              component={AssignCourse}
            />
            <DashboardLayoutRoute path="/comingsoon" component={ComingSoon} />
            <DashboardLayoutRoute path="/managerole" component={ManageRole} />

            <DashboardLayoutRoute component={PageNotFound} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(
  withStyles(combinedStyles, { withTheme: true })(App)
);
