import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import combinedStyles from '../../material-ui';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css'
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';


// import ViewCourseDetails from './ViewCourseDetails';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SetupCourse from './SetupCourse';
import EditCourse from './EditCourse';
// import CreateCourseStepTwo from './CreateCourseStepTwo';

function TabContainer(props) {
    return (
      <Typography component="div">
        {props.children}
      </Typography>
    );
  }
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const styles = () => ({
    root: {
      flexGrow: 1
    },
  });

export class ViewCourseBar extends Component {
  constructor(props){
    super(props)
      this.state = {
        value: 0
      };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
     <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Setup Course</h6>
                </div>
                <div className="col-lg-6 col-6 text-right">
                <Link to="/courses" className="btn btn-sm btn-white">My Courses</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
        <div className="card">
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="View Course Sessions Topicwise" />
              <Tab label="Edit Course Details" />
              {/* <Tab label="Create Topic" /> */}
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer><SetupCourse/></TabContainer>}
          {value === 1 && <TabContainer><EditCourse/></TabContainer>}
          {/* {value === 2 && <TabContainer><CreateCourseStepTwo/></TabContainer>} */}
        </div>
     </div>

      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = () => {
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({}),
  mapPropsToValues:(function(){}),
  handleSubmit: (payload) => {
  },
  displayName: 'ViewCourseBar',
})(ViewCourseBar);

const ViewCourseBarForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

ViewCourseBarForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withRouter((withStyles(styles, combinedStyles)(ViewCourseBarForm)))
