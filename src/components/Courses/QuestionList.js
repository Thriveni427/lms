import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import combinedStyles from '../../material-ui';
import { actionCreateQuestionMcq } from '../../actions/actionCreateQuestionMcq';
import { actionGetCourseList } from '../../actions/actionGetCourseList';
import { actionGetMaterialSection } from '../../actions/actionGetMaterial';
import { actionGetQuestionPaper } from '../../actions/actionGetQuestionPaper';
import { handleShowMcq, handleShowEssay, handleShowFillBlank, handleShowTrueFalse, handleShowMatch } from '../../actions/actionCreateQuestionMcq';
import 'date-fns';
import '../../../node_modules/dropzone/dist/min/dropzone.min.css'
import '../../../node_modules/react-dropzone-component/styles/filepicker.css';
import { Typography } from '@material-ui/core';

export class QuestionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labelWidth: 0,
      questionList: [],
    };
  }

  componentDidMount = () => {
    this.props.actionGetCourseList();
    this.props.actionGetMaterialSection({ "courseID": this.props.history.location.state.questionpaper.QuestionBankID });
  }

  render() {

    const {
      values,
      touched,
      errors,
      handleChange,
      classes,
      questionList,
      createQuestionEsaayReducer,
    } = this.props;

    console.log(this.props);
    console.log(this.state);
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="header-body">
            <div className="col-lg-6 col-6 text-right">
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="">
              <div className="card-header d-flex align-items-center border-0">
                <h3 className="margin-0 padding-0">Question List</h3>
              </div>
              <div className="content">

                <div className="c-formSection">

                  {
                    //<QuestionList singleBank={this.state.singleBank} />
                    questionList.map((arr) => {
                      return (
                        <React.Fragment>
                          <div className="c-formSection__grid--full mt-5 mb-1">
                            <h5 className="margin-0 padding-0">Multiple Choice Question</h5>
                          </div>
                          <div className="c-formSection__grid--full">
                            <Typography variant="h6" gutterBottom>{questionList.QuestionName}</Typography>
                          </div>

                          <div className="c-formSection__grid--full">
                            <div className="c-formSection__grid">
                              <Typography variant="body1" gutterBottom> {questionList.Option1} </Typography>
                            </div>
                            <div className="c-formSection__grid">
                              <Typography variant="body1" gutterBottom> {questionList.Option2} </Typography>
                            </div>
                          </div>
                          <div className="c-formSection__grid--full">
                            <div className="c-formSection__grid">
                              <Typography variant="body1" gutterBottom> {questionList.Option3} </Typography>
                            </div>
                            <div className="c-formSection__grid">
                              <Typography variant="body1" gutterBottom> {questionList.Option4} </Typography>
                            </div>
                          </div>
                          <div className="c-formSection__grid--full">
                            <Typography variant="body1" gutterBottom> {questionList.Answer} </Typography>
                          </div>
                        </React.Fragment>
                      )
                    })

                  }

                </div>


              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      actionCreateQuestionMcq,
      actionGetCourseList,
      actionGetMaterialSection,
      actionGetQuestionPaper,
      handleShowMcq,
      handleShowEssay,
      handleShowFillBlank,
      handleShowTrueFalse,
      handleShowMatch,
    }, dispatch)
}

export default withRouter(withStyles(combinedStyles)(connect(mapStateToProps, mapDispatchToProps)(QuestionList)
))
