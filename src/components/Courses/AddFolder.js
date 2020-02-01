import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import combinedStyles from '../../material-ui'
import { actionMaterialSection } from '../../actions/actionGetMaterial';
import { handleAddFolder, handleHideFolder } from '../../actions/actionSetupCourse';

export class AddFolder extends Component {
  constructor(props){
    super(props)
    this.state = {
      Description: EditorState.createEmpty(),
    }
  }
  onEditorStateChange = (Description) => {
    this.setState({
      Description,
    });
    this.props.setValues({
      ...this.props.values,
      Description
    });
  };
  handleHide = event => {
    console.log("inside handleHide()");
    this.props.handleHideFolder();
  }
  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      classes    } = this.props;
    console.log(this.props)
    return (
      <div className="createFolder col mb-4 mb-4">
        <ToastContainer autoClose={2000} />
        <Card className="createFolder__card">
          <CardContent className="createFolder__content">
            <Typography component="h6" variant="h6" className="createFolder__title">
              NEW SECTION
            </Typography>
              <Paper className="createFolder__paper">
              <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <FormControl fullWidth className="createFolder__formControl mb-4">
                <TextField
                  required
                  error={errors.SectionName && touched.SectionName ? true : false}
                  id="SectionName"
                  label="Section Name"
                  margin="normal"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.SectionName}
                  InputProps={{ classes: { input: classes.textField } }}
                />
                {errors.SectionName &&
                  touched.SectionName && (
                    <div className="errorMsg">
                      {errors.SectionName}
                    </div>
                )}
              </FormControl>
              <div className="createFolder__formControl mb-4">
              <InputLabel htmlFor="Description">Section Summary</InputLabel>
                <Editor
                  name="Description"
                  editorState={this.state.Description}
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
        actionMaterialSection,
        handleAddFolder,
        handleHideFolder,
      }
    , dispatch)
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
  }),
  mapPropsToValues: () => ({
    SectionName: '',
    Description: EditorState.createEmpty(),
  }),
  handleSubmit: (payload, { props, resetForm }) => {
    payload["CourseID"] = props.courseDetail.CourseID;
    payload["sectionID"] = parseInt(localStorage.getItem("sectionID"));
    payload["Description"] = draftToHtml(convertToRaw(payload.Description.getCurrentContent()));
    console.log(payload)
    props.actionMaterialSection(payload)
    resetForm({})
  },
  displayName: 'AddFolder',
})(AddFolder);

// export default compose(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(formikEnhancer),
//   withRouter,
//   withStyles(combinedStyles),
// )(AddFolder)

const AddFolderForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(AddFolderForm)))