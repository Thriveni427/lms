import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withFormik } from 'formik';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import combinedStyles from '../../material-ui';

import { actionCreateTopic } from '../../actions/Courses/actionCreateTopic';

export class CreateTopic extends Component {
  state = {
    topicName: ''
  };

  handleAddTopic = data => {
    console.log("Adding Topic");
    console.log(data);
    console.log(this.props);
    console.log("submitting...");

    let courseID = this.props.history.location.state.courseID
    // let courseID = JSON.parse(sessionStorage.getItem('courseID'));
    // if(courseID === null || courseID === undefined){
    //   sessionStorage.setItem("courseID", data.courseID);
    // }
   
    this.props.actionCreateTopic({
      "courseID": courseID,
      "topicName": this.props.values.topicName
    });
  };
  handleChange = event => {
    this.setState({ topicName: event.target.value });
    this.props.setValues({
        ...this.props.values,
        topicName: event.target.value
      });
  };

  componentDidMount = () => {
  }

  render() {
    const { classes, handleSubmit, handleChange, createTopicReducer } = this.props;
    console.log(this.props);
    
    if(createTopicReducer.createdTopic === true){
      createTopicReducer.createdTopic = false;
      this.props.handleCloseAddTopic();
      window.location.reload();
    }
    
    return (
      <div>
        <ToastContainer autoClose={2000} />
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Dialog
            open={this.props.addTopic}
            onClose={this.props.handleCloseAddTopic}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent style={{ width: 500 }}>
              <TextField
                autoFocus
                margin="dense"
                id="topicName"
                label="Enter course topic"
                fullWidth
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.props.handleCloseAddTopic}
                color="primary"
                className={[classes.button, classes.buttonSecondary]}
              >
                Cancel
            </Button>
              <Button
                type="submit"
                className={[classes.button, classes.buttonPrimary]}
                onClick={() => this.handleAddTopic(this.props)}
                color="primary"
              >
                Save Topic
            </Button>

            </DialogActions>
          </Dialog>

        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ actionCreateTopic }, dispatch)
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // topicName: Yup.string().required('Please enter course topicName'),
  }),
  mapPropsToValues: () => ({
    topicName: '',
  }),
  handleSubmit: (payload, { props }) => {
    console.log(props);
    console.log("submitting...");
    payload["courseID"] = props.courseID;
    props.actionCreateTopic(payload);
  },
  displayName: 'CreateTopic',
})(CreateTopic);
const CreateTopicForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(CreateTopicForm)))
