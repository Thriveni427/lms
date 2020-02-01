import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTable from "react-table";
import { withStyles } from "@material-ui/core/styles";
import combinedStyles from "../../material-ui";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import { actionGetCategoryList } from "./../../actions/actionGetCategoryList";
import { ToastContainer } from "react-toastify";
import Tooltip from "@material-ui/core/Tooltip";
import { Zoom } from "@material-ui/core";
import moment from "moment";

export class GetCategoryList extends Component {
  constructor(props) {
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    if (userinfo === null) userinfo = [];
    super(props);

    this.state = {
      showSuccess: false
    };

    if(userinfo.userType === "trainer")
    {
      this.columns = [
        {
          Header: "Category Name",
          accessor: "CategoryName" // String-based value accessors!
        },
        {
          id: "CreatedDate",
          Header: "Created Date",
          accessor: d => {
            return moment(d.CreatedDate).format("DD-MMM-YYYY hh:mm:ss A");
          }
        },
        {
          Header: "Total Courses",
          accessor: "TotalCourses",
          Cell: ({ value }) => String(value)
        },
   
      ];
    }else{
      this.columns = [
        {
          Header: "Category Name",
          accessor: "CategoryName" // String-based value accessors!
        },
        {
          id: "CreatedDate",
          Header: "Created Date",
          accessor: d => {
            return moment(d.CreatedDate).format("DD-MMM-YYYY hh:mm:ss A");
          }
        },
        {
          Header: "Total Courses",
          accessor: "TotalCourses",
          Cell: ({ value }) => String(value)
        },
        {
          Header: "Action",
          Cell: row => (
            <div>
              <IconButton className={props.classes.buttonTableAction}>
                <Tooltip title="Edit" TransitionComponent={Zoom} placement="top">
                  <Icon
                    className={[props.classes.icon, "fas fa-pen-square"]}
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
  
                  />
                </Tooltip>
              </IconButton>
            </div>
          )
        }
      ];
    }
    
  }

  componentDidMount = () => {
    this.props.actionGetCategoryList();
  };

  handleEdit = row => {
    this.props.history.push({
      pathname: "/editcategory",
      state: { category: row }
    });
    console.log(row);
  };

  handleDelete = () => {
    // console.log(row);
    // let req = {
    //     //courseStatus : "Inactive",
    //     CourseID : row.CourseID
    // }
    // this.props.actionDeleteCourse(req);
    // setTimeout(() => { this.setState({showSuccess: true }) }, 2100);
    //setTimeout(function(){ this.props.actionGetGetCategoryList(); }, 2100);
    //setTimeout(() => { window.location.reload(); }, 2100);
  };

  render() {
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    if (userinfo === null) userinfo = [];
    console.log(this.props);
    let { getCategoryListReducer } = this.props;

    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">
                    Home > Categories
                  </h6>
                </div>
                {
                  userinfo.userType === "trainer"
                    ?
                    null
                    :
                    <div className="col-lg-6 col-5 text-right">
                      <Link to="/addcategory" className="btn btn-sm btn-white">
                        Add Category
                      </Link>
                      {/* <Link to="#" className="btn btn-sm btn-white">Filters</Link> */}
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <ToastContainer autoClose={2000} />
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header d-flex align-items-center border-0">
                  <h3 className="margin-0 padding-0">Categories</h3>
                </div>
                <ReactTable
                  //filterable
                  defaultPageSize={10}
                  className="-striped -highlight"
                  defaultSorted={[
                    {
                      id: "CategoryName",
                      asc: true
                    }
                  ]}
                  data={getCategoryListReducer.getCategoryListData || []}
                  columns={this.columns}
                />
              </div>
            </div>
          </div>
        </div>
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
    { actionGetCategoryList }
  )(GetCategoryList)
);
