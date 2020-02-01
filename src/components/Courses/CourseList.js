import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { ToastContainer } from "react-toastify";
import Tooltip from "@material-ui/core/Tooltip";
import { Zoom } from "@material-ui/core";
import moment from "moment";
import { Link } from 'react-router-dom';

import combinedStyles from "../../material-ui";
import AssignCourse from "./AssignCourse";
import { actionGetCourseList } from "./../../actions/actionGetCourseList";
import { actionDeleteCourse } from "./../../actions/actionDeleteCourse";


export class CourseList extends Component {
  constructor(props) {
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    if (userinfo === null) userinfo = [];
    super(props);
    this.state = {
      showSuccess: false,
      showAssignModal: false
    };
if(userinfo.userType === "trainer")
{
  this.columns = [
    {
      Header: "Name",
      accessor: "CourseName" // String-based value accessors!
    },
    {
      Header: "Category",
      accessor: "CategoryName"
    },
    {
      id: "Expiry Date",
      Header: "Expiry Date",
      accessor: x => {
        return moment(x.EndDate).format("DD-MMM-YYYY hh:mm:ss A");
      }
    },
    {
      Header: "Course Type",
      accessor: "CourseType"
    },
    {
      Header: "Role",
      accessor: "Role"
    },
    {
      Header: "Course Status",
      accessor: "CourseStatus",
      Cell: ({ value }) => (value === "1" ? "Active" : "Inactive")
    },
    {
      id: "CreatedDate",
      Header: "Created Date",
      //accessor: `${ moment('CreatedDate').format('MM/DD/YYYY')}`
      accessor: d => {
        return moment(d.CreatedDate).format("DD-MMM-YYYY hh:mm:ss A");
      }
    },
    {
      Header: "Action",
      Cell: row => (
        <div style={{ width: 300 }}>

          {/* <IconButton className={props.classes.buttonTableAction}>
            <Tooltip
              title="Assign"
              TransitionComponent={Zoom}
              placement="top"
            >
              <Icon
                className={[props.classes.icon, "fas fa-random"]}
                color="primary"
                style={{ fontSize: 20, width: 30 }}
                onClick={() => this.handleAssignClick(row.original.CourseID)}
              />
            </Tooltip>
          </IconButton> */}

          <IconButton className={props.classes.buttonTableAction}>
            <Tooltip title="View" TransitionComponent={Zoom} placement="top">
              <Icon
                className={[props.classes.icon, "far fa-eye"]}
                color="primary"
                style={{ fontSize: 20, width: 30 }}
                onClick={() => this.handleView(row.original)}
              />
            </Tooltip>
          </IconButton>
    
        </div>
      )
    }
  ];
}else
{
  this.columns = [
    {
      Header: "Name",
      accessor: "CourseName" // String-based value accessors!
    },
    {
      Header: "Category",
      accessor: "CategoryName"
    },
    {
      id: "Expiry Date",
      Header: "Expiry Date",
      accessor: x => {
        return moment(x.EndDate).format("DD-MMM-YYYY hh:mm:ss A");
      }
    },
    {
      Header: "Course Type",
      accessor: "CourseType"
    },
    {
      Header: "Role",
      accessor: "Role"
    },
    {
      Header: "Course Status",
      accessor: "CourseStatus",
      Cell: ({ value }) => (value === "1" ? "Active" : "Inactive")
    },
    {
      id: "CreatedDate",
      Header: "Created Date",
      //accessor: `${ moment('CreatedDate').format('MM/DD/YYYY')}`
      accessor: d => {
        return moment(d.CreatedDate).format("DD-MMM-YYYY hh:mm:ss A");
      }
    },
    {
      Header: "Action",
      Cell: row => (
        <div style={{ width: 300 }}>

          {/* <IconButton className={props.classes.buttonTableAction}>
            <Tooltip
              title="Assign"
              TransitionComponent={Zoom}
              placement="top"
            >
              <Icon
                className={[props.classes.icon, "fas fa-random"]}
                color="primary"
                style={{ fontSize: 20, width: 30 }}
                onClick={() => this.handleAssignClick(row.original.CourseID)}
              />
            </Tooltip>
          </IconButton> */}

          <IconButton className={props.classes.buttonTableAction}>
            <Tooltip title="View" TransitionComponent={Zoom} placement="top">
              <Icon
                className={[props.classes.icon, "far fa-eye"]}
                color="primary"
                style={{ fontSize: 20, width: 30 }}
                onClick={() => this.handleView(row.original)}
              />
            </Tooltip>
          </IconButton>
      
             
              <IconButton className={props.classes.buttonTableAction}>
                <Tooltip title="Edit" TransitionComponent={Zoom} placement="top">
                  <Icon
                    style={{ fontSize: 20 }}
                    className={[props.classes.icon, "fas fa-pen-square"]}
                    color="primary"
                    onClick={() => this.handleEdit(row.original)}
                  />
                </Tooltip>
              </IconButton>
              <IconButton className={props.classes.buttonTableAction}>
                <Tooltip
                  title="Delete"
                  TransitionComponent={Zoom}
                  placement="top"
                >
                  <Icon
                    style={{ fontSize: 20 }}
                    className={[props.classes.icon, "fas fa-trash-alt"]}
                    color="secondary"
                    onClick={(e) => { this.handleDelete(e, row.original) }}
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
    }
  ];
}
    
  }

  componentDidMount = () => {
    this.props.actionGetCourseList();
  };

  handleEdit = row => {
    this.props.history.push({
      pathname: "/viewcourse",
      state: { course: row }
    });
  };

  handleView = row => {
    this.props.history.push({
      pathname: "/viewcourse",
      state: { course: row }
    });
  };

  handleTest = row => {
    this.props.history.push({
      pathname: "/taketest",
      state: { course: row }
    });
  };

  handleDelete = (e, row) => {
    e.preventDefault();
    console.log(row);
    let req = {
      //courseStatus : "Inactive",
      courseID: row.CourseID
    };
    this.props.actionDeleteCourse(req);
    setTimeout(() => {
      console.log("say hi");

      this.setState({ showSuccess: true });
    }, 1100);
    this.setState({ showSuccess: false });
    //setTimeout(function(){ this.props.actionGetCourseList(); }, 2100);
    //setTimeout(() => { window.location.reload(); }, 2100);
  };
  handleAssignClick = row => {
    this.setState({
      showAssignModal: true,
      courseID: row
    });
  };

  handleAssignClose = () => {
    this.setState({ showAssignModal: false });
  };

  // handleUploadExcel = (e) => {
  //   e.preventdefault();
  //   console.log("Got file");

  // }

  render() {
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    if (userinfo === null) userinfo = [];
    console.log(this.props);
    let {
      getCourseListReducer,
      //deleteCourseReducer,
      history
    } = this.props;

    if (this.state.showSuccess === true) {
      setTimeout(function () {
        history.push({ pathname: "/courses" });
      }, 2100);
    }

    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <ToastContainer autoClose={2000} />
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">
                    Home > Courses
                  </h6>
                </div>
                {
                  userinfo.userType === "trainer"
                    ?
                    null
                    :
                    <div className="col-lg-6 row">
                      <div className="col-6 text-right">
                        <Link to="/uploadcourse" className="btn btn-sm btn-white">
                          Upload Course
                           </Link>
                      </div>
                      <div className="col-6 text-left">
                        <Link to="/createcourse" className="btn btn-sm btn-white">
                          Add Course
                          </Link>
                      </div>
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
        <AssignCourse
          showAssignModal={this.state.showAssignModal}
          handleAssignClose={this.handleAssignClose}

          courseID={this.state.courseID}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default withStyles(combinedStyles)(
  connect(
    mapStateToProps,
    { actionGetCourseList, actionDeleteCourse }
  )(CourseList)
);
