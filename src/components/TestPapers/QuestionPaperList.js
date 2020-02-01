import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from "react-table";
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';


import combinedStyles from '../../material-ui';
import { actionGetQuestionPaper } from '../../actions/actionGetQuestionPaper';


export class QuestionPaperList extends Component {

  constructor(props) {

    super(props);
    this.state = {
      showSuccess: false,
      courseID: null,
      course: [],
      open:false,
    }

    this.columns = [{
      Header: 'Question Paper Name',
      accessor: 'QuestionPaperName' // String-based value accessors!
    },
    {
      Header: 'Marks',
      accessor: 'Marks'
    }, {
      Header: 'Duration',
      accessor: 'Duration'
    }, {
      Header: 'Number of Question',
      accessor: 'TotalQuestions'
    }, {
      Header: 'Status',
      accessor: 'Status'
    },

    {
      Header: 'Action',
      Cell: row => (
        <div>
          <IconButton className={props.classes.buttonTableAction}>
          <Tooltip title="View Questions" TransitionComponent={Zoom} placement="top">
            <Icon
              className={[props.classes.icon, 'fas fa-file-alt']}
              color="primary"
              onClick={() => this.handleView(row.original)}
            />
            </Tooltip>
          </IconButton>
          <IconButton className={props.classes.buttonTableAction}>
          <Tooltip title="Edit" TransitionComponent={Zoom} placement="top">
            <Icon
              className={[props.classes.icon, 'fas fa-pen-square']}
              color="primary"
              onClick={() => this.handleEdit(row.original)}
            />
            </Tooltip>
          </IconButton>
        </div>
      )
    }]
  }

  componentDidMount = () => {
    console.log(this.props);
    let payload = { "courseID": this.props.history.location.state.questionbank.QuestionBankID };
    this.props.actionGetQuestionPaper(payload);
    this.setState({
      courseID:payload
    })
  }

  handleView = (row) => {
    this.props.history.push({
      pathname: '/question',
      state: { questionpaper: row }
    })
    console.log(row);
  }

  handleNew = (e) => {
    e.preventDefault()
    this.props.history.push({
      pathname: '/createquestionpaper',
      state: {course: this.state.courseID}
    })
    console.log(this.state.courseID);
  }
  
  handleEdit = (row) => {
    this.props.history.push({
      pathname:'/editquestionpaper',
      state:{questionpaper:row}
    })
    console.log(row)
  }

  render() {
    console.log(this.props)
    let { getQuestionPaperReducer } = this.props;

    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <ToastContainer autoClose={2000} />
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Question Paper</h6>
                </div>
                <div className="col-lg-6 col-5 text-right">
                <Link to="/createquestionpaper" onClick={(e) => this.handleNew(e)} className="btn btn-sm btn-white">Add New</Link>
                  {/* <Button onClick={this.handleNew}  className={[classes.button, classes.buttonPrimaryMenu2, classes.buttonSm]}>Add New</Button> */}
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
                  <h3 className="margin-0 padding-0">Question Paper</h3>
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
                  data={getQuestionPaperReducer.QuestionPaperData || []}
                  columns={this.columns}
                />
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

export default withStyles(combinedStyles)(
  connect(mapStateToProps, { actionGetQuestionPaper })(QuestionPaperList)
)