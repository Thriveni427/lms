import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from "react-table";
import { withStyles } from '@material-ui/core/styles';
import combinedStyles from '../../material-ui';
import { actionGetUserDetails } from '../../actions/actionGetUserDetails';
import { Link } from 'react-router-dom';

export class UserListReports extends Component {
 
constructor(props) {

  super(props);
  this.columns = [{
    Header: 'First Name',
    accessor: 'FirstName' // String-based value accessors!
  },
  {
    Header: 'Last Name',
    accessor: 'LastName'
  },
  {
    Header: 'Email ID',
    accessor: 'EmailID'
  },{
    Header: 'Contact No',
    accessor: 'ContactNo'
  },
  {
    Header: 'User Status',
    accessor: 'UserStatus',
    Cell: ({ value }) => ( (value === "1") ? "Active" : "Inactive" )//String(value)
  }]
}

componentDidMount = () => {
  this.props.actionGetUserDetails();
}

handleEdit = (row) => {
  this.props.history.push({
    pathname:'/edituser',
    state:{user:row}
  })
  console.log(row)
}
handleDelete = (row) =>{
  console.log(row)
}

  render() {
    console.log(this.props)
    let { getUsersReducer } = this.props;

    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Reports > Users</h6>
                </div>
                <div className="col-lg-6 col-5 text-right">
                  <Link to="#" className="btn btn-sm btn-white">Filters</Link>
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
                <h3 className="margin-0 padding-0">Users Reports</h3>
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
                data={getUsersReducer.usersData || [] }
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
    connect(mapStateToProps, {actionGetUserDetails})(UserListReports)
)