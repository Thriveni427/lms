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

// import { actionGetAllCourses } from '../../actions/Courses/User/actionGetUserCourses';
import combinedStyles from '../../material-ui/combineStyles';
import UsersShare from '../../components/Courses/Users/UsersShare';

import { actionGetLearningPathByCategory } from '../../actions/Home/actionGetLearningPathByCategory'

export class LearningPath extends Component {

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
    this.props.actionGetLearningPathByCategory();
  };


  render() {
    const {
      getLearningPathByCategoryReducer,
      classes,
      fullScreen,
    } = this.props;
    console.log(this.props);
    return (
      <div className="col-md-9 ">
        <div className="row mt-3">
          {(
            // getLearningPathByCategoryReducer.gotLearningPathByCategory &&
            getLearningPathByCategoryReducer.gotLearningPathByCategoryData.map((main, h) => {
              console.log(main)
              return (

                < div className="col-md-3" key={h} >
                  <div className="card p-4 mb-2 position-relative">
                    <span>Learning Path</span>
                  </div>
                </div>
              )


            })
          )}
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
      // actionGetAllCourses
      actionGetLearningPathByCategory,
    }, dispatch)
}
const formikEnhancer = withFormik({
  displayName: 'LearningPath',
})(LearningPath);

const CoursesForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(CoursesForm)))
