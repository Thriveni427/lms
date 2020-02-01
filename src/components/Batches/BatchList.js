import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from "react-table";
import { withStyles } from '@material-ui/core/styles';
import combinedStyles from '../../material-ui';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom'
import { actionGetBatchList } from './../../actions/actionGetBatchList';
import { actionDeleteBatch } from '../../actions/actionDeleteBatch';
import { ToastContainer } from 'react-toastify';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';
import moment from 'moment';
import AddLearnersToBatch from "../Courses/AddLearnersToBatch";
import { actionAddLearnersToBatch } from '../../actions/actionAddLearnersToBatch';


export class BatchList extends Component {
  constructor(props) {
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
        if (userinfo === null) userinfo = [];
    super(props);
    this.state = {
      showSuccess: false,
      showAssignModal: false
    };
if(userinfo.userType === "trainer") {
  this.columns = [
    {
      Header: 'Batch Name',
      accessor: 'BatchName'
    }, {
      Header: 'Course Name',
      accessor: 'CourseName'
    },
    {
      Header: 'Total Seats',
      accessor: 'Seats'
    },
    {
      id: "CreatedDate",
      Header: 'Created Date',
      accessor: d => {
        return moment(d.CreatedDate).format("DD-MMM-YYYY hh:mm:ss A")
      }
    },
    {
      id: "StartDate",
      Header: 'Start Date',
      accessor: d => {
        return moment(d.StartDate).format("DD-MMM-YYYY hh:mm:ss A")
      }
    },
    {
      id: 'EndDate',
      Header: 'End Date',
      accessor: d => {
        return moment(d.EndDate).format("DD-MMM-YYYY hh:mm:ss A")
      }
    },
    {
      Header: 'Created By',
      accessor: 'VendorName'
    }
    , {
      Header: 'Batch Status',
      accessor: 'BatchStatus',
      Cell: ({ value }) => String(value)
    },
    {
      Header: 'Action',
      Cell: row => (
        <div >
          <IconButton className={props.classes.buttonTableAction}>
            <Tooltip
              title="Assign"
              TransitionComponent={Zoom}
              placement="top"
            >
              <Icon
                className={[props.classes.icon, "fas fa-random"]}
                color="primary"
                style={{ fontSize: 20, marginLeft: -10 }}
                onClick={() => this.handleAssignClick(row.original.BatchID)}
              />
            </Tooltip>
          </IconButton>
        
          
        </div>
      )
    }
   
  ]
}else
{
 this.columns = [
      {
        Header: 'Batch Name',
        accessor: 'BatchName'
      }, {
        Header: 'Course Name',
        accessor: 'CourseName'
      },
      {
        Header: 'Total Seats',
        accessor: 'Seats'
      },
      {
        id: "CreatedDate",
        Header: 'Created Date',
        accessor: d => {
          return moment(d.CreatedDate).format("DD-MMM-YYYY hh:mm:ss A")
        }
      },
      {
        id: "StartDate",
        Header: 'Start Date',
        accessor: d => {
          return moment(d.StartDate).format("DD-MMM-YYYY hh:mm:ss A")
        }
      },
      {
        id: 'EndDate',
        Header: 'End Date',
        accessor: d => {
          return moment(d.EndDate).format("DD-MMM-YYYY hh:mm:ss A")
        }
      },
      {
        Header: 'Created By',
        accessor: 'VendorName'
      }
      , {
        Header: 'Batch Status',
        accessor: 'BatchStatus',
        Cell: ({ value }) => String(value)
      },
      {
        Header: 'Action',
        Cell: row => (
          <div >
            <IconButton className={props.classes.buttonTableAction}>
              <Tooltip
                title="Assign"
                TransitionComponent={Zoom}
                placement="top"
              >
                <Icon
                  className={[props.classes.icon, "fas fa-random"]}
                  color="primary"
                  style={{ fontSize: 20, marginLeft: -10 }}
                  onClick={() => this.handleAssignClick(row.original.BatchID)}
                />
              </Tooltip>
            </IconButton>
            <IconButton className={props.classes.buttonTableAction}>
              <Tooltip title="View" TransitionComponent={Zoom} placement="top">
                <Icon
                  className={[props.classes.icon, 'far fa-eye']}
                  color="primary"
                  style={{ fontSize: 20, width: 30 }}

                  onClick={() => this.handleView(row.original.BatchID)}
                />
              </Tooltip>
            </IconButton>
            <IconButton className={props.classes.buttonTableAction}>
              <Tooltip title="Edit" TransitionComponent={Zoom} placement="top">
                <Icon
                  style={{ fontSize: 20 }}
                  className={[props.classes.icon, 'fas fa-pen-square']}
                  color="primary"
                  onClick={() => this.handleEdit(row.original)}
                />
              </Tooltip>
            </IconButton>
            <IconButton className={props.classes.buttonTableAction}>
              <Tooltip title="Delete" TransitionComponent={Zoom} placement="top">
                <Icon
                  style={{ fontSize: 20 }}
                  className={[props.classes.icon, 'fas fa-trash-alt']}
                  color="secondary"
                  onClick={() => this.handleDelete(row.original)}
                />
              </Tooltip>
            </IconButton>

            {/* <Button
              variant="contained"
              //color="primary"
              className={[props.classes.button, props.classes.buttonSm, props.classes.buttonPrimary]}
              onClick={() => this.handleEdit(row.original)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              className={[, props.classes.button, props.classes.buttonSm, props.classes.buttonRed]}
              onClick={() => this.handleDelete(row.original)}
            >
              Delete
            </Button> */}
            {/* <button onClick={() => this.handleEdit(row.original)}>Edit</button> */}
            {/* <button onClick={() => this.handleDelete(row.original)}>Delete</button> */}
          </div>
        )
      }]
}
   
  }

  componentDidMount = () => {
    this.props.actionGetBatchList();
  }

  handleEdit = (row) => {
    this.props.history.push({
      pathname: '/editbatch',
      state: { batch: row }
    })
    console.log(row)
  }
  handleView = (row) => {
    this.props.history.push({
      pathname: '/viewbatch',
      state: { batchID: row }
    })
    console.log(row)
  }

  handleDelete = (row) => {
    console.log(row);
    let req = {
      //courseStatus : "Inactive",
      batchID: row.BatchID
    }
    this.props.actionDeleteBatch(req);
    //setTimeout(() => { this.setState({showSuccess: true }) }, 2100);
    //setTimeout(function(){ this.props.actionGetCourseList(); }, 2100);
    setTimeout(() => { window.location.reload(); }, 1100);
  }

  handleAssignClick = row => {
    this.setState({
      showAssignModal: true,
      BatchID: row
    });
  };

  handleAssignClose = () => {
    this.setState({ showAssignModal: false });
  };


  render() {
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    if (userinfo === null) userinfo = [];
    console.log(this.props)
    let { getBatchListReducer, addLearnersToBatchReducer } = this.props;
    console.log(getBatchListReducer)
    console.log(addLearnersToBatchReducer);


    if (this.props.addLearnersToBatchReducer.addedLearnersToBatch === true && this.state.showLoginModal === true) {
      this.handleAssignClose()
      setTimeout(() => { window.location.reload(); }, 1100);
    }



    //if(getBatchListReducer.batchData === undefined) getBatchListReducer.batchData = []
    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <ToastContainer autoClose={2000} />
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Batches</h6>
                </div>
                {/* {
                  userinfo.userType === "trainer" ? */}
                    <div className="col-lg-6 col-5 text-right">

                      <Link to="/createbatch" className="btn btn-sm btn-white">Add New</Link>
                   
                    </div>
                    {/* :
                    <div className="col-lg-6 col-5 text-right">

                      <Link to="/createbatch" className="btn btn-sm btn-white">Add New</Link>
                    </div>
                } */}
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header d-flex align-items-center border-0">
                  <h3 className="margin-0 padding-0">Batches</h3>
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
                  data={getBatchListReducer.batchData || []}
                  columns={this.columns}
                />
              </div>
            </div>
          </div>
        </div>
        <AddLearnersToBatch
          showAssignModal={this.state.showAssignModal}
          handleAssignClose={this.handleAssignClose}
          BatchID={this.state.BatchID}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default withStyles(combinedStyles)(
  connect(mapStateToProps, { actionGetBatchList, actionDeleteBatch, actionAddLearnersToBatch })(BatchList)
)