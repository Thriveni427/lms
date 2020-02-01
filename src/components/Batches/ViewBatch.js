import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import combinedStyles from '../../material-ui';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';
import ReactTable from "react-table";
import { actionGetUsersFromBatch } from '../../actions/actionGetUsersFromBatch';
import { actionGetBatchById } from "../../actions/actionGetBatchById"

export class ViewBatch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSuccess: false,
      showAssignModal: false
    };

    this.columns = [
      {
        Header: 'User Name',
        accessor: 'FirstName'
      }, {
        Header: 'Email ID',
        accessor: 'EmailID'
      },
      {
        Header: 'Contact No',
        accessor: 'ContactNo'
      },


      {
        Header: 'UserStatus',
        accessor: 'UserStatus',
        // Cell: ({ value }) => String(value)
        Cell: ({ value }) => (value === "1" ? "Active" : "Inactive")
      },
      {
        Header: 'Action',
        Cell: row => (
          <div >

            <IconButton className={props.classes.buttonTableAction}>
              <Tooltip title="Delete" TransitionComponent={Zoom} placement="top">
                <Icon
                  style={{ fontSize: 20 }}
                  className={[props.classes.icon, 'fas fa-trash-alt']}
                  color="secondary"
                // onClick={() => this.handleDelete(row.original)}
                />
              </Tooltip>
            </IconButton>

            {/* <Button
              variant="contained"
              //color="primary"
              className={[props.classes.button, props.classes.buttonSm, props.classes.buttonPrimary]}
              // onClick={() => this.handleEdit(row.original)}
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

  componentDidMount = () => {
    console.log(this.props.history.location.state.batchID);
    this.props.actionGetBatchById(this.props.history.location.state.batchID);
    this.props.actionGetUsersFromBatch(this.props.history.location.state.batchID);
  }

  render() {
    let { getBatchByIdReducer, getUsersFromBatchReducer } = this.props
    console.log(getBatchByIdReducer);
    console.log(getUsersFromBatchReducer);



    return (
      <div>
        <React.Fragment>
          <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
            <div className="container-fluid">
              <div className="header-body">
                <div className="row align-items-center py-4">
                  <div className="col-lg-6 col-6">
                    <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Batches > View Batch</h6>
                  </div>
                  <div className="col-lg-6 col-6 text-right">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid mt--6">
            <ToastContainer
              autoClose={2000}
            />
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header d-flex align-items-center border-0">
                    {/* <h3 className="margin-0 padding-0">View Batch</h3> */}
                  </div>
                  <div className="content" style={{ marginLeft: 10 }}>
                    {this.props.getBatchByIdReducer.gotBatchByIdData.map((item, i) => {
                      return (
                        <div style={{ marginLeft: 10 }}>
                          <h3 className="mb-4">{item.CourseName}</h3>
                          <div style={{width:'70%'}}>
                          <p className="mt-2" style={{fontFamily:"sans-serif"}}><strong >{item.Description} </strong></p>
                          </div>
                          <p style={{fontFamily:"sans-serif"}}><strong >Batch : {item.BatchName}</strong></p>
                          <p style={{fontFamily:"sans-serif"}}><strong>Batch Status : {item.BatchStatus}</strong></p>
                          <p style={{fontFamily:"sans-serif"}}><strong>Start Date : {moment(item.StartDate).format('L')}</strong></p>
                          <p style={{fontFamily:"sans-serif"}}><strong>End Date: {moment(item.EndDate).format('L')}</strong></p>
                          <p style={{fontFamily:"sans-serif"}}><strong>Seats: {item.Seats}</strong></p>
                        </div>
                      )
                    })}
                  </div>
                  <div>
                    <h5 className="ml-4 mt-4">Uesrs List ></h5>
                    {

                      (getUsersFromBatchReducer.gotUsersFromBatch === true && getUsersFromBatchReducer.gotUsersFromBatchData !== undefined && getUsersFromBatchReducer.gotUsersFromBatchData.length > 0 && getUsersFromBatchReducer.gotUsersFromBatchData[0].UserData !== undefined && getUsersFromBatchReducer.gotUsersFromBatchData[0].UserData !== null)
                      &&
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

                        data={getUsersFromBatchReducer.gotUsersFromBatchData[0].UserData || []}
                        columns={this.columns}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

        </React.Fragment>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return state
}

export default withStyles(combinedStyles)(
  connect(mapStateToProps, { actionGetBatchById, actionGetUsersFromBatch })(ViewBatch)
)
