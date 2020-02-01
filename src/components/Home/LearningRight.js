import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { IconButton, Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';
import Share from '@material-ui/icons/Share';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

import { actionGetAllCourses } from '../../actions/Courses/User/actionGetUserCourses';
import combinedStyles from '../../material-ui/combineStyles';
import UsersShare from '../../components/Courses/Users/UsersShare';

export class LearningRight extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      fullWidth: true,
      singleShare: []
    };
  }

  handleClickOpen = (event, row) => {
    this.setState({
      open: true,
      singleShare: row
    });
  };
  handleCloseBtn = () => {
    this.setState({ open: false });
  };
  componentDidMount = () => {
    this.props.actionGetAllCourses();
  }

  render() {
    const {
      getUserCoursesReducer,
      classes,
      fullScreen,
    } = this.props;
    return (
      <div className="col-md-9 ">
        <div className="row mt-3">
          {
            (
              getUserCoursesReducer.courseData.map((arr, i) => {
                let match = [];
                if (arr.iuploadname === null || arr.iuploadname === undefined || arr.iuploadname === "") {
                  match[0] = "jgf"
                }
                else {
                  match = arr.iuploadname.split(',');
                }
                return (
                  <div className="col-md-3" key={i}>
                    <div className="card p-4 mb-2 position-relative">
                      <h4 className=" mb-2">{arr.CourseName}</h4>
                      <div className="card d-flex justify-content-center" style={{ height: 150, width: '100%', overflow: 'hidden' }}>
                        <img title="" width="100%" alt="img" className="img-fluid" src={match[0]} />
                      </div>
                    </div>
                  </div>
                )
              })
            )
          }
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      actionGetAllCourses
    }, dispatch)
}
const formikEnhancer = withFormik({
  displayName: 'LearningRight',
})(LearningRight);

const CoursesForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(CoursesForm)))
