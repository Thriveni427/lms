import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from "react-table";
import { withStyles } from '@material-ui/core/styles';
import combinedStyles from '../../material-ui';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom'
import { actionGetLiveClass } from '../../actions/actionGetLiveClass';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';
import { actionDeleteLiveClass } from '../../actions/actionDeleteLiveClass';
import moment from 'moment';
import { AssignLiveClass } from './AssignLiveClass';



export class LiveClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccess: false,
      showAssignModal: false
    };
    this.columns = [{
      Header: 'Class Name',
      accessor: 'ClassName' // String-based value accessors!
    },
    {
      id: "StartDate",
      Header: 'Class Date/Time',
      accessor: d => {
        return moment(d.StartDate).format("DD-MMM-YYYY hh:mm:ss A")
      }
    }, {
      Header: 'Available Seats',
      accessor: 'AvailableSeats'
    }, {
      Header: 'Total Duration',
      accessor: 'Duration'
    },
    {
      Header: 'Action',
      Cell: row => (
        <div>
          <IconButton className={props.classes.buttonTableAction}>
              <Tooltip
                title="Assign"
                TransitionComponent={Zoom}
                placement="top"
              >
                <Icon
                  className={[props.classes.icon, "fas fa-random"]}
                  color="primary"
                  style={{ fontSize: 20, width: 30 }}
                  onClick={() => this.handleAssignLiveClick()}
                  // onClick={() => this.handleAssignLiveClick(row.original.CourseID)}

                />
              </Tooltip>
            </IconButton>
          <IconButton className={props.classes.buttonTableAction}>
            <Tooltip title="View" TransitionComponent={Zoom} placement="top">
              <Icon
                className={[props.classes.icon, 'far fa-eye']}
                color="primary"
                style={{ fontSize: 24, width: 30 }}
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
          <IconButton className={props.classes.buttonTableAction}>
            <Tooltip title="Delete" TransitionComponent={Zoom} placement="top">
              <Icon
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

  componentDidMount = () => {
    this.props.actionGetLiveClass();
  }

  handleAssignLiveClick = (row) => {
    this.setState({
      showAssignModal: true,
      courseID: row
    });
  }

  handleAssignClose = () => {
    this.setState({ showAssignModal: false });
  };

  handleView = (row) => {
    this.props.history.push({
      pathname: '/viewliveclass',
      state: { class: row }
    })
    console.log(row)
  }

  handleEdit = (row) => {
    this.props.history.push({
      pathname: '/editliveclass',
      state: { class: row }
    })
    console.log(row)
  }
  handleDelete = (row) => {
    console.log(row)
    let req = {
      LiveClassID: row.LiveClassID
    }
    this.props.actionDeleteLiveClass(req);
    setTimeout(() => {
      this.setState({ showSuccess: true })
      window.location.reload();
    }, 1100);
  }

  render() {
    console.log(this.props)
    let { getLiveClassReducer } = this.props;
    // console.log(getBatchListReducer)
    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Live Classes</h6>
                </div>
                <div className="col-lg-6 col-5 text-right">
                  <Link to="/createclass" className="btn btn-sm btn-white">Add New</Link>
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
                  <h3 className="margin-0 padding-0">Live Classes</h3>
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
                  data={getLiveClassReducer.LiveClassData || []}
                  columns={this.columns}
                />
              </div>
            </div>
          </div>
        </div>
        <AssignLiveClass
          showAssignModal={this.state.showAssignModal}
          handleAssignClose={this.handleAssignClose}
          getUsersReducer={this.props.getUsersReducer}
          courseID={this.state.courseID}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default withStyles(combinedStyles)(
  connect(mapStateToProps, { actionGetLiveClass, actionDeleteLiveClass })(LiveClasses)
)