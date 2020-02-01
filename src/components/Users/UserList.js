import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from "react-table";
import { withStyles } from '@material-ui/core/styles';
import combinedStyles from '../../material-ui';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom'
import { actionGetUserDetails, actionGetUserDetailsByRole } from '../../actions/actionGetUserDetails';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';
import moment from 'moment';

export class UserList extends Component {

    constructor(props) {
        let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
        if (userinfo === null) userinfo = [];

        super(props);
        if (userinfo.userType === "trainer") {
            this.columns = [
                {
                    Header: 'First Name',
                    accessor: 'FirstName' // String-based value accessors!
                },
                {
                    Header: 'Email ID',
                    accessor: 'EmailID'
                }, {
                    Header: 'Contact No',
                    accessor: 'ContactNo'
                }, {
                    id: "CreatedDate",
                    Header: 'Created Date',
                    //accessor: `${ moment('CreatedDate').format('MM/DD/YYYY')}`
                    accessor: d => {
                        return moment(d.CreatedDate).format("DD-MMM-YYYY hh:mm:ss A")
                    }
                },
                {
                    Header: 'Type',
                    accessor: 'RoleID',
                    Cell: ({ value }) => ((value === 1) ? "Admin" : ((value === 2 ? "Trainer" : "Learner")))  //String(value)

                },
                {
                    Header: 'User Status',
                    accessor: 'UserStatus',
                    Cell: ({ value }) => ((value === "1") ? "Active" : "Inactive")//String(value)
                },
            ]
        }
        else {
            this.columns = [
                {
                    Header: 'First Name',
                    accessor: 'FirstName' // String-based value accessors!
                },
                {
                    Header: 'Email ID',
                    accessor: 'EmailID'
                }, {
                    Header: 'Contact No',
                    accessor: 'ContactNo'
                }, {
                    id: "CreatedDate",
                    Header: 'Created Date',
                    //accessor: `${ moment('CreatedDate').format('MM/DD/YYYY')}`
                    accessor: d => {
                        return moment(d.CreatedDate).format("DD-MMM-YYYY hh:mm:ss A")
                    }
                },
                {
                    Header: 'Type',
                    accessor: 'RoleID',
                    Cell: ({ value }) => ((value === 1) ? "Admin" : ((value === 2 ? "Trainer" : "Learner")))  //String(value)

                },
                {
                    Header: 'User Status',
                    accessor: 'UserStatus',
                    Cell: ({ value }) => ((value === "1") ? "Active" : "Inactive")//String(value)
                },

                {
                    Header: 'Action',
                    Cell: row => (
                        <div>
                            <IconButton className={props.classes.buttonTableAction}>
                                <Tooltip title="Edit" TransitionComponent={Zoom} placement="top">
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
                                        className={[props.classes.icon, 'fas fa-minus-square']}
                                        color="secondary"
                                        onClick={() => this.handleDelete(row.original)}
                                    />
                                </Tooltip>
                            </IconButton>
                        </div>
                    )
                }

            ]
        }
    }

    componentDidMount = () => {
        let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
        if (userinfo === null) userinfo = [];
        let payload = {};
        // if (userinfo.userType === "admin" || userinfo.userType === "vendor" || userinfo.userType === "trainer") {
        if (userinfo.userType === "admin" || userinfo.userType === "trainer" || userinfo.userType === "superadmin") {
            payload.vendorID = userinfo.vendorId;
            payload.roleID = userinfo.RoleID;
        }
        else {
            payload.vendorID = userinfo.vendorId;
            payload.roleID = 4;
        }
        // this.props.actionGetUserDetails();
        this.props.actionGetUserDetailsByRole(payload);
    }

    handleEdit = (row) => {
        this.props.history.push({
            pathname: '/edituser',
            state: { user: row }
        })
        console.log(row)
    }
    handleDelete = (row) => {
        console.log(row)
    }

    render() {
        let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
        if (userinfo === null) userinfo = [];
        console.log(this.props)
        let { getUsersReducer } = this.props;

        return (
            <React.Fragment>
                <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
                    <div className="container-fluid">
                        <div className="header-body">
                            <div className="row align-items-center py-4">
                                <div className="col-lg-6 col-7">
                                    <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Users</h6>
                                </div>
                                {
                                    userinfo.userType === "trainer" ?

                                        <div className="col-lg-6 col-5 text-right">
                                            {/* <Link to="/adduser" className="btn btn-sm btn-white">Add New</Link> */}
                                            {/* <Link to="#" className="btn btn-sm btn-white">Filters</Link> */}
                                        </div>
                                        :
                                        <div className="col-lg-6 col-5 text-right">
                                            <Link to="/adduser" className="btn btn-sm btn-white">Add New</Link>
                                            {/* <Link to="#" className="btn btn-sm btn-white">Filters</Link> */}
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid mt--6">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header d-flex align-items-center border-0">
                                    <h3 className="margin-0 padding-0">Users</h3>
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
                                    data={getUsersReducer.usersData || []}
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
    connect(mapStateToProps, { actionGetUserDetails, actionGetUserDetailsByRole })(UserList)
)