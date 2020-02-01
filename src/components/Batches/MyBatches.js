import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from "react-table";
import { withStyles } from '@material-ui/core/styles';
import combinedStyles from '../../material-ui';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { actionGetBatchList } from './../../actions/actionGetBatchList';
import { actionDeleteBatch } from '../../actions/actionDeleteBatch';
import { ToastContainer } from 'react-toastify';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';
import AddLearnersToBatch from "../Courses/AddLearnersToBatch";
import { getMyAllBatchesAction } from '../../actions/Batches/getMyAllBatchesActions';
import { actionGetCourseDetailsById } from '../../actions/Home/actionGetCourseDetailsById';

export class MyBatches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSuccess: false,
            showAssignModal: false
        };

        this.columns = [
            {
                Header: 'Batch Name',
                accessor: 'Name'
            }, {
                Header: 'Course Name',
                accessor: 'CourseName'
            },
            {
                Header: 'Total Seats',
                accessor: 'Seats'
            },
            {
                Header: 'Batch Status',
                accessor: 'BatchStatus',
                Cell: ({ value }) => String(value)
            },
            {
                Header: 'Action',
                Cell: row => (

                    <div >
                        <IconButton className={props.classes.buttonTableAction}>
                            <Tooltip title="View" TransitionComponent={Zoom} placement="top">
                                <Icon
                                    className={[props.classes.icon, 'far fa-eye']}
                                    color="primary"
                                    style={{ fontSize: 20, width: 30 }}

                                    onClick={() => this.handleView(row.original.CourseID)}
                                />
                            </Tooltip>
                        </IconButton>

                        {/* <Button
                            variant="contained"
                            // className={[classes.button, classes.buttonPrimary]}
                            type="submit"
                            onClick={(e) => this.handleView(e)}
                        >
                            View
                        </Button>          */}
                    </div>
                )
            }]
    }

    componentDidMount = () => {
        // this.props.actionGetBatchList();
        let payload = {
            userID: 3
        }
        this.props.getMyAllBatchesAction(payload);
    }

    handleView = (row) => {
        console.log(row);
        let payload = {};
        payload.courseID = row;
        console.log(this.props.actionGetCourseDetailsById(payload));

        // .then((res) => {
        //     courseDetails = res.data.data;
        //     this.props.history.push({
        //         pathname: '/userscoursecontent',
        //         state: { courseDetail: courseDetails }
        //     })
        // })
        //     .catch((err) => {
        //         console.log(err);
        //     })
        
        // this.props.history.push({
        //     pathname: '/userscoursecontent',
        //     state: { batchID: row }
        // })
    }
    // handleView = (e) => {
    //     e.preventDefault();
    //     this.props.history.push({
    //         pathname: '/userscoursedetails',
    //     })
    // }

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
        console.log(this.props)
        let { getBatchListReducer, getMyAllBatchesReducer, getCourseDetailsByIdReducer } = this.props;
        // let {gotAllBatchesData} = this.props.getBatchListReducer;
        console.log(getBatchListReducer);

        if (getCourseDetailsByIdReducer.fetchedCourseDetails === true) {
            getCourseDetailsByIdReducer.fetchedCourseDetails = false;
            this.props.history.push({
                pathname: '/userscoursecontent',
                state: { courseDetail: getCourseDetailsByIdReducer.CourseDetailsData[0] }
            })
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
                                    <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > MY Batches</h6>
                                </div>
                                {/* <div className="col-lg-6 col-5 text-right">
                                    <Link to="/createbatch" className="btn btn-sm btn-white">Add New</Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid mt--6">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header d-flex align-items-center border-0">
                                    <h3 className="margin-0 padding-0">MY Batches</h3>
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
                                    data={getMyAllBatchesReducer.gotAllBatchesData || []}
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
    connect(mapStateToProps, {
        actionGetBatchList, actionDeleteBatch, getMyAllBatchesAction, actionGetCourseDetailsById
    })(MyBatches)
)