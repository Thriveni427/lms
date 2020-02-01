import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import combinedStyles from '../../material-ui'
import { actionAddAssignment } from '../../actions/actionAddAssignment';
import { handleAddAssignment, handleHideAssignment } from '../../actions/actionSetupCourse'
import moment from 'moment';

export class AddAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materialDescription: EditorState.createEmpty(),
    }
  }
  onEditorStateChange = (materialDescription) => {
    this.setState({
      materialDescription,
    });
    this.props.setValues({
      ...this.props.values,
      materialDescription
    });
  };

  handleHide = event => {
    console.log("inside handleHide()");
    this.props.handleHideAssignment();
  }
  render() {
    const {
      touched,
      errors,
      handleSubmit,
      classes,
      handleBlur,
      handleChange,
      values
    } = this.props;
    console.log(this.props)

    return (
      <div className="createFolder col mb-4 mb-4">
        <ToastContainer autoClose={2000} />
        <Card className="createFolder__card">
          <CardContent className="createFolder__content">
            <Typography component="h6" variant="h6" className="createFolder__title">
              NEW ASSIGNMENT
            </Typography>
            <Paper className="createFolder__paper">
              <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <FormControl fullWidth className="createFolder__formControl mb-4">
                  <TextField
                    required
                    error={errors.materialName && touched.materialName ? true : false}
                    id="materialName"
                    label="Assignment Title"
                    margin="normal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.materialName}
                    InputProps={{ classes: { input: classes.textField } }}
                  />
                  {errors.materialName &&
                    touched.materialName && (
                      <div className="errorMsg">
                        {errors.materialName}
                      </div>
                    )}
                </FormControl>
                <div className="createFolder__formControl mb-4">
                  <Editor
                    name="materialDescription"
                    editorState={this.state.materialDescription}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={this.onEditorStateChange}
                  />
                  {errors.editorState &&
                    touched.editorState && (
                      <div className="errorMsg">
                        {errors.editorState}
                      </div>
                    )}
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={[classes.button, classes.buttonPrimary]}
                >
                  SAVE CHANGES
            </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={[classes.button, classes.buttonSecondary]}
                  onClick={(event) => this.handleHide()}
                >
                  CANCEL
            </Button>
              </form>
            </Paper>
          </CardContent>
        </Card>
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
      actionAddAssignment,
      handleAddAssignment,
      handleHideAssignment,
    }
    , dispatch)
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
  }),
  mapPropsToValues: () => ({
    materialName: '',
    materialDescription: EditorState.createEmpty(),
  }),
  handleSubmit: (payload, { props, resetForm }) => {
    console.log(props);
    payload["courseID"] = props.courseDetail.CourseID;
    payload["sectionID"] = localStorage.getItem("sectionID"); //  props.courseDetail.CourseID;
    payload["creationDate"] = moment().format("YYYY/MM/DD HH:mm");
    payload["modifiedDate"] = null; //    moment().format("YYYY/MM/DD HH:mm");
    //payload["materialName"] =  "Section Assignment";
    payload["materialTitle"] = payload["materialName"];
    payload["materialType"] = "assignment";
    payload["materialDescription"] = draftToHtml(convertToRaw(payload.materialDescription.getCurrentContent()));

    console.log(props);
    props.actionAddAssignment(payload)
    resetForm({})
  },
  displayName: 'AddAssignment',
})(AddAssignment);

const AddAssignmentForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(AddAssignmentForm)))