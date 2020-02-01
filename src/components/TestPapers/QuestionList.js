import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from "react-table";
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';


import combinedStyles from '../../material-ui';
import CreateQuestionMcq from './CreateQuestionMcq';
import { actionGetQuestions } from '../../actions/actionGetQuestions';
import { actionDeleteQuestion } from './../../actions/TestPapers/actionDeleteQuestion';


export class QuestionList extends Component {

  constructor(props) {

    super(props);
    this.state = {
      showSuccess: false,
      labelWidth: 0,
      open: false,
      fullWidth: true,
      maxWidth: 'lg',
    }

    this.columns = [{
      Header: 'Question Name',
      accessor: 'QuestionName' // String-based value accessors!
    },
    {
      Header: 'Question Type',
      accessor: 'QuestionType'
    }, {
      Header: 'Difficulty Level',
      accessor: 'DifficultyLevel'
    }, {
      Header: 'Weightage',
      accessor: 'ScoreForCorrect'
    },
    {
      Header: 'Action',
      Cell: (row) => (
        <div>
          <IconButton className={props.classes.buttonTableAction}>
            <Tooltip title="View Question" TransitionComponent={Zoom} placement="top">
              <Icon
                className={[props.classes.icon, 'far fa-eye']}
                color="primary"
                style={{ fontSize: 24, width: 30 }}
                onClick={() => this.handleView(row.original)}
              />
            </Tooltip>
          </IconButton>
          <IconButton className={props.classes.buttonTableAction}>
            <Tooltip title="Edit Question" TransitionComponent={Zoom} placement="top">
              <Icon
                className={[props.classes.icon, 'fas fa-pen-square']}
                color="primary"
                onClick={() => this.handleEdit(row.original)}
              />
            </Tooltip>
          </IconButton>
          <IconButton className={props.classes.buttonTableAction}>
            <Tooltip title="Delete" TransitionComponent={Zoom} placement="top">
              <Icon
                className={[props.classes.icon, 'fas fa-trash-alt']}
                color="secondary"
                onClick={() => this.handleDelete(row.original)}
              />
            </Tooltip>
          </IconButton>
        </div>
      )
    }]
  }

  handleClickOpen = (event) => {
    event.preventDefault()
    this.setState({ open: true });
    console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount = () => {
    console.log(this.props);
    let payload = { "questionPaperID": this.props.history.location.state.questionpaper.QuestionPaperID };
    this.props.actionGetQuestions(payload);
  }

  handleEdit = (row) => {
    this.props.history.push({
      pathname: '/editquestion',
      state: { question: row }
    })
    console.log(row)
  }

  handleView = (row) => {
    this.props.history.push({
      pathname: '/viewquestion',
      state: { question: row }
    })
    console.log(row)
  }

  handleDelete = (row) => {
    console.log(row);
    let req = {
      questionID: row.QuestionID
    }
    this.props.actionDeleteQuestion(req);
    //setTimeout(() => { this.setState({showSuccess: true }) }, 2100);
  }

  render() {
    console.log(this.props)
    const {
      fullScreen,
      getQuestionReducer,
      deleteQuestionReducer,
    } = this.props;

    //
    if (deleteQuestionReducer.deletedQuestion === true) {
      setTimeout(function () {
        window.location.reload();
        deleteQuestionReducer.deletedQuestion = false;
      }, 1000);
    }
    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <ToastContainer autoClose={2000} />
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Questions</h6>
                </div>
                <div className="col-lg-6 col-5 text-right">
                  {/* <Link to="/createquestion" className="btn btn-sm btn-white">Add New</Link> */}
                  <Link to="" className="btn btn-sm btn-white" onClick={(e) => this.handleClickOpen(e)}>
                    Add New
                    </Link>
                  {/* <Link to="#" className="btn btn-sm btn-white">Filters</Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header d-flex align-items-center border-0">
                  <h3 className="margin-0 padding-0">Questions</h3>
                </div>
                <ReactTable
                  //filterable
                  defaultPageSize={10}
                  className="-striped -highlight"
                  defaultSorted={[
                    {
                      id: "Name",
                      asc: true
                    }
                  ]}
                  data={getQuestionReducer.QuestionData || []}
                  columns={this.columns}
                />
              </div>
            </div>
          </div>
        </div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          {/* <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
          <DialogContent>
            {/* <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText> */}
            <CreateQuestionMcq />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              style={{ position: 'absolute', top: 0, right: 0 }}
              color="primary"
            >
              <Icon>close</Icon>
            </Button>
            {/*
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button> */}
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default withStyles(combinedStyles)(
  connect(mapStateToProps, { actionGetQuestions, actionDeleteQuestion })(QuestionList)
)
