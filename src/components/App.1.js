import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSlidersH, faBriefcase, faUsers, faBook, faNewspaper, faDesktop, faChartArea, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// Components
import SignIn from './Login'
import Home from './Home/index';
import Events from './Events/index';
import Layout from './Layout';

import UserList from './Users/UserList';
import AddUser from './Users/AddUser';
import EditUser from './Users/EditUser';

import VendorsList from './Vendors/VendorsList';
import VendorRegistration from './Vendors/VendorRegistration';
import AddVendor from './Vendors/AddVendor';
import EditVendor from './Vendors/EditVendor';
import BulkUpload from './Users/BulkUpload';
import Dashboard from './Dashboard';
import UsersDashboard from './UsersDashboard';
import CreateCourse from './Courses/CreateCourse';

import AddCategory from './Category/AddCategory';
import GetCategoryList from './Category/GetCategoryList';
import EditCategory from './Category/EditCategory';

import CreateBatch from './Batches/CreateBatch';
import EditBatch from './Batches/EditBatch';
import BatchList from './Batches/BatchList';

import SetupCourse from './Courses/SetupCourse';
import EditCourse from './Courses/EditCourse';
import CourseList from './Courses/CourseList';

import CreateLiveClass from './LiveClasses/CreateLiveClass';
import LiveClasses from './LiveClasses/LiveClasses';
import EditLiveClass from './LiveClasses/EditLiveClass';
import ViewLiveClass from './LiveClasses/ViewLiveClass';

import EditQuestionBank from './TestPapers/EditQuestionBank';
import QuestionBankList from './TestPapers/QuestionBankList';
import QuestionList from './TestPapers/QuestionList';
import EditQuestion from './TestPapers/EditQuestion';
import CreateQuestion from './TestPapers/CreateQuestion';
import CreateQuestionMcq from './TestPapers/CreateQuestionMcq';
import CreateQuestionPaper from './TestPapers/CreateQuestionPaper';
import QuestionPaperList from './TestPapers/QuestionPaperList';
import EditQuestionPaper from './TestPapers/EditQuestionPaper';
import ViewQuestion from './TestPapers/ViewQuestion';

import UserListReports from './Reports/UserListReports';

import ContentLibrary from './ContentLibrary';

import Courses from './Courses/Users/Courses';

import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import theme from './../material-ui/theme';
import combinedStyles from '../material-ui/index';
//import VendorMenu from '../helpers/menus';
import PageNotFound from './PageNotFound'
import TakeTest from './Courses/TakeTest';
import TakeTestResult from './Courses/TakeTestResult';
import Scorm from './Courses/Scorm';
import SetupEditBar from "./Courses/SetupEditBar";
import Permission from './SuperAdmin/Permission';

import UsersCourseContent from './Courses/Users/UsersCourseContent';
import UsersCourseDetails from './Courses/Users/UsersCourseDetails';

import UserLiveClass from './LiveClasses/Users/UserLiveClass';
import LiveClassDetails from './LiveClasses/Users/LiveClassDetails';
import Gamifications from './Gamifications';

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

const Auth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}


const LoginLayout = ({ children, ...rest }) => {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

const LoginLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <LoginLayout>
                <Component {...matchProps} />
            </LoginLayout>
        )} />
    )
};

// const HomeLayoutRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     sessionStorage.getItem('loginAuth') == true
//       ? <Component {...props} />
//       : <Redirect to='/login' />
//   )} />
// )

const HomeLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            sessionStorage.getItem('loginAuth') === 'true'
            ?<Layout> <Component {...props} /></Layout>
            : <Redirect to="/login" />
        )} />
    )
};

class App extends Component {
    componentDidMount() {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#insertion-point-jss'),
        );
    }

    render() {
        let userinfo  = JSON.parse(sessionStorage.getItem('userinfo'))
        if(userinfo === null) userinfo = [];
        console.log(userinfo)
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <LoginLayoutRoute path="/login" component={ SignIn } />
                        <HomeLayoutRoute path="/home" component={Home} />
                        <HomeLayoutRoute path="/users" component={UserList} />
                        <HomeLayoutRoute path="/adduser" component={AddUser} />
                        <HomeLayoutRoute path="/edituser" component={EditUser} />
                        <HomeLayoutRoute path="/batches" component={BatchList} />
                        <HomeLayoutRoute path="/createbatch" component={CreateBatch} />
                        <HomeLayoutRoute path="/editbatch" component={EditBatch} />
                        <HomeLayoutRoute path="/vendors" component={VendorsList} />
                        <HomeLayoutRoute path="/editvendor" component={EditVendor} />
                        <HomeLayoutRoute path="/addvendor" component={AddVendor} />
                        <HomeLayoutRoute path="/bulkupload" component={BulkUpload} />
                        <HomeLayoutRoute path="/events" component={Events} />
                        <HomeLayoutRoute path="/liveclasses" component={LiveClasses} />
                        <HomeLayoutRoute path="/createclass" component={CreateLiveClass} />
                        <HomeLayoutRoute path="/editliveclass" component={EditLiveClass} />
                        { userinfo.userType === "admin" ||  userinfo.userType === "vendor"
                            ? <HomeLayoutRoute path="/dashboard" component={Dashboard} />
                            : <HomeLayoutRoute path="/dashboard" component={UsersDashboard} />
                        }
                        <HomeLayoutRoute path="/createcourse" component={CreateCourse} />
                        { userinfo.userType === "admin" ||  userinfo.userType === "vendor"
                            ? <HomeLayoutRoute path="/courses" component={CourseList} />
                            : <HomeLayoutRoute path="/courses" component={Courses} />
                        }

                        <HomeLayoutRoute path="/addcategory" component={AddCategory} />
                        <HomeLayoutRoute path="/coursecategory" component={GetCategoryList} />
                        <HomeLayoutRoute path="/editcategory" component={EditCategory} />
                        <HomeLayoutRoute path="/questionbank" component={QuestionBankList} />
                        <HomeLayoutRoute path="/questionpaper" component={QuestionPaperList} />
                        <HomeLayoutRoute path="/question" component={QuestionList} />
                        <HomeLayoutRoute path="/viewquestion" component={ViewQuestion} />
                        <HomeLayoutRoute path="/createquestion" component={CreateQuestion} />
                        <HomeLayoutRoute path="/createquestionmcq" component={CreateQuestionMcq} />
                        <HomeLayoutRoute path="/createquestionpaper" component={CreateQuestionPaper} />
                        <HomeLayoutRoute path="/editquestionpaper" component={EditQuestionPaper} />
                        <HomeLayoutRoute path="/editquestion" component={EditQuestion} />
                        <HomeLayoutRoute path="/register" component={VendorRegistration} />
                        <HomeLayoutRoute path="/contentlibrary" component={ContentLibrary} />
                        <HomeLayoutRoute path="/userlistreports" component={UserListReports} />
                        <HomeLayoutRoute path="/viewliveclass" component={ViewLiveClass} />
                        <HomeLayoutRoute path="/editquestionbank" component={EditQuestionBank} />
                        <HomeLayoutRoute path="/taketest" component={TakeTest} />
                        <HomeLayoutRoute path="/taketestresult" component={TakeTestResult} />
                        <HomeLayoutRoute path="/scorm" component={Scorm} />
                        <HomeLayoutRoute path="/setupeditbar" component={SetupEditBar} />
                        <HomeLayoutRoute path="/permission" component={Permission} />
                        <HomeLayoutRoute component={ UsersCourseDetails } path="/userscoursedetails" />
                        <HomeLayoutRoute component={ UsersCourseContent } path="/userscoursecontent" />
                        <HomeLayoutRoute component={ UserLiveClass } path="/userliveclass" />
                        <HomeLayoutRoute component={ LiveClassDetails } path="/liveclassdetails" />
                        <HomeLayoutRoute component={ Gamifications } path="/gamification" />
                        <HomeLayoutRoute component={ PageNotFound } />
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}
const mapStateToProps = state => {
  return state
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(withStyles(combinedStyles, { withTheme: true })(App));