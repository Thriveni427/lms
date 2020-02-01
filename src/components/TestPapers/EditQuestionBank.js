import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import combinedStyles from '../../material-ui';
import { ToastContainer } from 'react-toastify';
import { actionEditQuestionBank } from '../../actions/actionEditQuestionBank';

export class EditQuestionBank extends Component {
  handleStatus = name => event => {
    this.setState({ questionBankVisibility: event.target.checked });
    this.props.setValues({ ...this.props.values, questionBankVisibility: event.target.checked });
  };
  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleSubmit,
      editQuestionBankReducer,
      classes,
    } = this.props;

    if (editQuestionBankReducer.editedQuestionBank === true) {
      setTimeout(() => {
        window.location.reload();
        editQuestionBankReducer.editedQuestionBank = false;
      }, 2000);
    }

    return (
      <React.Fragment>
          <ToastContainer
            autoClose={2000}
          />
                  <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <div className="c-formSection">
                      <div className="c-formSection__grid--full">
                        <FormControl fullWidth >
                          <TextField
                            required
                            error={errors.questionBankName && touched.questionBankName ? true : false}
                            id="questionBankName"
                            label="Question Bank Name"
                            margin="normal"
                            onChange={handleChange}
                            value={values.questionBankName}
                            InputProps={{ classes: { input: classes.textField } }}
                          />
                          {errors.questionBankName &&
                            touched.questionBankName && (
                              <div className="errorMsg">
                                {errors.questionBankName}
                              </div>
                            )}
                        </FormControl>
                      </div>
                      <div className="c-formSection__grid--full">
                        <FormControl className={classes.formControl}>
                          <FormGroup row>
                            <FormControlLabel
                              control={
                                <Switch
                                  color="primary"
                                  checked={values.questionBankVisibility}
                                  onChange={this.handleStatus('questionBankVisibility')}
                                  value={values.questionBankVisibility}
                                />
                              }
                              label="Question Bank Visibility"
                            />
                          </FormGroup>
                        </FormControl>
                      </div>
                    </div>
                    <div className="c-formSection pt-4 pb-4">
                      <Button
                        variant="contained"
                        className={[classes.button, classes.buttonPrimary]}
                        type="submit">
                        Update
                      </Button>
                      <Button variant="contained" className={[classes.button, classes.buttonSecondary]}
                        onClick={this.props.handleClose}
                      >
                        CANCEL
                      </Button>
                    </div>
                  </form>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state
}

function mapDispatchToProps(dispatch) {
  return  bindActionCreators({actionEditQuestionBank}, dispatch)

}


const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    questionBankName: Yup.string().required('Please enter Question Bank name'),
  }),
  mapPropsToValues: (function (props) {
    if (props.singleBank === undefined) {
      return {
        questionBankName: '',
        questionBankVisibility: '',
        courseID: ''
      }
    } else {
      return {
        questionBankName: props.singleBank.QuestionBankName,
        questionBankVisibility: props.singleBank.QuestionBankVisibility === 1 ? true : false,
        courseID: props.singleBank.QuestionBankID,
      }
    }
  }),

  handleSubmit: (payload, { props }) => {
    let value = payload["questionBankVisibility"];
    payload["questionBankVisibility"] = ((value === true) ? 1 : 0);
    props.actionEditQuestionBank(payload);
  },
  displayName: 'EditQuestionBank',
})(EditQuestionBank);

const EditQuestionBankForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter((withStyles(combinedStyles)(EditQuestionBankForm)))
