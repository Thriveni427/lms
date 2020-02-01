import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from "react-table";
import { withStyles } from '@material-ui/core/styles';
import combinedStyles from '../../material-ui';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom'
import { actionGetCourseList } from './../../actions/actionGetCourseList';
import { actionDeleteCourse } from './../../actions/actionDeleteCourse';
import { ToastContainer } from 'react-toastify';
//import Assessment from '@material-ui/icons/Assessment'

import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';

export class CourseList extends Component {

    constructor(props) {

        super(props);
        this.state = {
            showSuccess: false
        }

        this.columns = [{
            Header: 'Course Name',
            accessor: 'CourseName' // String-based value accessors!
        },
        {
            Header: 'Category',
            accessor: 'CategoryName'
        }, {
            Header: 'Sub Category',
            accessor: 'SubCategory'
        }, {
            Header: 'Duration',
            accessor: 'Duration'
        },
        {
            Header: 'Course Type',
            accessor: 'CourseType'
        }, {
            Header: 'Vendor Name',
            accessor: 'VendorName'
        }, {
            Header: 'Course Status',
            accessor: 'CourseStatus'
        }, {
            Header: 'Created Date',
            accessor: 'CreatedDate',
            Cell: ({ value }) => String(value)
        },
        {
            Header: 'Action',
            Cell: row => (
                <div>
                    <IconButton className={props.classes.buttonTableAction}>
                        <Tooltip title="View" TransitionComponent={Zoom} placement="top">
                            <Icon
                                className={[props.classes.icon, 'far fa-eye']}
                                color="primary"
                                style={{ fontSize: 24, width: 30 }}
                                onClick={() => this.handleEdit(row.original)}
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
                    <IconButton className={props.classes.buttonTableAction}>
                        <Tooltip title="Delete" TransitionComponent={Zoom} placement="top">
                            <Icon
                                style={{ fontSize: 23 }}
                                className={[props.classes.icon, 'fas fa-trash-alt']}
                                color="secondary"
                                onClick={() => this.handleDelete(row.original)}
                            />
                        </Tooltip>
                    </IconButton>
                    {/* <IconButton className={props.classes.buttonTableAction}>
              <Tooltip title="Delete" TransitionComponent={Zoom} placement="top">
                  <Assessment
                    color="secondary"
                    onClick={() => this.handleTest(row.original)}
                  />
                  </Tooltip>
              </IconButton> */}
                </div>
            )
        }]
    }

    componentDidMount = () => {
        this.props.actionGetCourseList();
    }

    handleEdit = (row) => {
        this.props.history.push({
            pathname: '/setupeditbar',
            state: { course: row }
        })
        console.log(row)
    }

    handleTest = (row) => {
        this.props.history.push({
            pathname: '/taketest',
            state: { course: row }
        })
        console.log(row)
    }

    handleDelete = (row) => {
        let req = {
            courseID: row.CourseID
        }
        this.props.actionDeleteCourse(req);
    }

    render() {
        let { getCourseListReducer } = this.props;
        return (
            <React.Fragment>
                <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
                    <div className="container-fluid">
                        <ToastContainer autoClose={2000} />
                        <div className="header-body">
                            <div className="row align-items-center py-4">
                                <div className="col-lg-6 col-7">
                                    <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Courses</h6>
                                </div>
                                <div className="col-lg-6 col-5 text-right">
                                    <Link to="/createcourse" className="btn btn-sm btn-white">New</Link>
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
                                    <h3 className="margin-0 padding-0">Courses</h3>
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
                                    data={getCourseListReducer.coursesData || []}
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
    connect(mapStateToProps, { actionGetCourseList, actionDeleteCourse })(CourseList)
)