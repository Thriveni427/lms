import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
// Material
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
import { actionAddContent } from '../../actions/actionAddContent';
import { handleAddContent } from '../../actions/actionSetupCourse'
//import axios from 'axios';
import moment from 'moment';
import { handleHideContent } from '../../actions/actionSetupCourse';

export class AddContent extends Component {
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
    this.props.handleHideContent();
  }
  render() {
    const {
      touched,
      errors,
      handleSubmit,
      classes } = this.props;
    console.log(this.props)

    return (
      <div className="createFolder col mb-4 mb-4">
        <ToastContainer autoClose={2000} />
        <Card className="createFolder__card">
          <CardContent className="createFolder__content">
            <Typography component="h6" variant="h6" className="createFolder__title">
              NEW CONTENT
            </Typography>
            <Paper className="createFolder__paper">
              <form onSubmit={handleSubmit} noValidate autoComplete="off">
                {/* <FormControl fullWidth className="createFolder__formControl mb-4">
                <TextField
                  required
                  error={errors.materialName && touched.materialName ? true : false}
                  id="materialName"
                  label="Material Title"
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
              </FormControl> */}
                <div className="createFolder__formControl mb-4">
                  {/* <InputLabel htmlFor="materialDescription">Material Description</InputLabel> */}
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
      actionAddContent,
      handleAddContent,
      handleHideContent
    }
    , dispatch)
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
  }),
  mapPropsToValues: () => ({
    // materialName: '',
    materialDescription: EditorState.createEmpty(),
  }),
  handleSubmit: (payload, { props, resetForm }) => {
    console.log(props);
    payload["courseID"] = props.courseDetail.CourseID;
    payload["sectionID"] = localStorage.getItem("sectionID"); //  props.courseDetail.CourseID;
    payload["creationDate"] = moment().format("YYYY/MM/DD HH:mm");
    payload["modifiedDate"] = null; //    moment().format("YYYY/MM/DD HH:mm");
    payload["materialName"] = "Section Introduction";
    payload["materialTitle"] = "Section Introduction";
    payload["materialType"] = "content";
    payload["materialDescription"] = draftToHtml(convertToRaw(payload.materialDescription.getCurrentContent()));

    console.log(props);
    props.actionAddContent(payload)
    resetForm({})
  },
  displayName: 'AddContent',
})(AddContent);

const AddContentForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(AddContentForm)))