import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';


import combinedStyles from '../../material-ui';


export class AddQuestions extends Component {

  handleAddSessionClose = () => {
    this.props.handleAddSessionClose()
  }
   handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
  const {
    values,
    touched,
    errors,
    handleChange,
    classes,
    questions
  } = this.props;

    return (
      <React.Fragment>
          <Typography component="h6" variant="h6" className="createFolder__title mb-4">
            Add Questions
          </Typography>
          {
            questions.map((arr, index) => {
              console.log(arr);
              
              return(
                <Card className="pl-3 pr-3 pb-4 mb-4">
                  <div className="row pb-4">
                    <div className="col-lg-12">
                      <FormControl fullWidth>
                        <TextField
                          fullWidth
                          required
                          error={ errors.questionName && touched.questionName ? true : false }
                          id={`questionName${index}`}
                          label="Question Title"
                          margin="normal"
                          onChange={ handleChange }
                          value={ values.questionName }
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.questionName &&
                        touched.questionName && (
                            <div className="errorMsg">
                              { errors.questionName }
                            </div>
                        )}
                      </FormControl>
                    </div>
                    <div className="col-lg-6">
                      <FormControl fullWidth>
                        <TextField
                          fullWidth
                          required
                          error={errors.option1 && touched.option1 ? true : false}
                          id="option1"
                          label="Write Option A here"
                          margin="normal"
                          onChange={handleChange}
                          value={values.option1}
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.option1 &&
                        touched.option1 && (
                            <div className="errorMsg">
                            {errors.option1}
                            </div>
                        )}
                      </FormControl>
                    </div>
                    <div className="col-lg-6">
                      <FormControl fullWidth>
                        <TextField
                          fullWidth
                          required
                          error={errors.option2 && touched.option2 ? true : false}
                          id="option2"
                          label="Write Option A here"
                          margin="normal"
                          onChange={handleChange}
                          value={values.option2}
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.option2 &&
                        touched.option2 && (
                            <div className="errorMsg">
                            {errors.option2}
                            </div>
                        )}
                      </FormControl>
                    </div>
                    <div className="col-lg-6">
                      <FormControl fullWidth>
                        <TextField
                          fullWidth
                          required
                          error={errors.option3 && touched.option3 ? true : false}
                          id="option3"
                          label="Write Option A here"
                          margin="normal"
                          onChange={handleChange}
                          value={values.option3}
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.option3 &&
                        touched.option3 && (
                            <div className="errorMsg">
                            {errors.option3}
                            </div>
                        )}
                      </FormControl>
                    </div>
                    <div className="col-lg-6">
                      <FormControl fullWidth>
                        <TextField
                          fullWidth
                          required
                          error={errors.option4 && touched.option4 ? true : false}
                          id="option4"
                          label="Write Option A here"
                          margin="normal"
                          onChange={handleChange}
                          value={values.option4}
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.option4 &&
                        touched.option4 && (
                            <div className="errorMsg">
                            {errors.option4}
                            </div>
                        )}
                      </FormControl>
                    </div>
                    <div className="col-lg-12">
                      <FormControl fullWidth>
                        <TextField
                          fullWidth
                          required
                          error={errors.answer1 && touched.answer1 ? true : false}
                          id="answer1"
                          label="Write answer here"
                          margin="normal"
                          onChange={handleChange}
                          value={values.answer1}
                          InputProps={{ classes: { input: classes.textField } }}
                        />
                        {errors.answer1 &&
                        touched.answer1 && (
                          <div className="errorMsg">
                            {errors.answer1}
                          </div>
                        )}
                      </FormControl>
                    </div>
                    <div className="col-lg-12">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.checkedA}
                            onChange={this.handleChange('checkedA')}
                            value="checkedA"
                          />
                        }
                        label="Remarks"
                      />
                    </div>
                </div>
                </Card>
              )
            })
          }
        </React.Fragment>
    )
  }
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = {
}
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Please enter course name'),
    courseType: Yup.string().required('Please enter course type'),
    courseSummary: Yup.string().required('Please enter course summary'),
    courseLevel: Yup.string().required('Please select course level'),
    category: Yup.string().required('Please select course category'),
    ioriginalname: Yup.string().required('Please upload course image'),
  }),

  mapPropsToValues: () => ({
    name: '',
    courseType: 'General',
    category: '',
    courseLevel: '',
    courseSummary: "",
    galleryData: [],
    ioriginalname: []
  }),

  handleSubmit: (payload) => {
    let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
    if (userinfo === null) userinfo = [];
    payload["createdDate"] = moment().format("YYYY/MM/DD HH:mm");
    payload["createdBy"] = ((userinfo.userType === "admin") ? userinfo.AdminID : (userinfo.userType === "vendor") ? userinfo.VendorID : userinfo.UserID);
    payload["RoleID"] = ((userinfo.userType === "admin") ? 1 : (userinfo.userType === "vendor") ? 4 : 2);
  },

  displayName: 'AddQuestions',
})(AddQuestions);
const AddQuestionsForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)
export default withRouter((withStyles(combinedStyles)(AddQuestionsForm)))
