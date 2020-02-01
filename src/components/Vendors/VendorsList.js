import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from "react-table";
import { withStyles } from '@material-ui/core/styles';
import combinedStyles from '../../material-ui';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { Link , withRouter } from 'react-router-dom'
import { actionGetVendors } from './../../actions/actionGetVendors';
import { actionDeleteVendor } from "./../../actions/actionDeleteVendor";
import { compose } from 'recompose'
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';
import moment from 'moment';
import { ToastContainer } from "react-toastify";

export class VendorList extends Component {

constructor(props) {

  super(props);
  this.state = {
    showSuccess: false,
  };

  this.columns = [
  {
    Header: 'Vendor Name',
    accessor: 'VendorName' // String-based value accessors!
  },
  {
    Header: 'Email ID',
    accessor: 'EmailID'
  },
  {
    Header: 'Contact No',
    accessor: 'ContactNo'
  },
    {
      id: "Created Date",
      Header: 'Created Date',
      //accessor: `${ moment('CreatedDate').format('MM/DD/YYYY')}`
      accessor: d => {
          return moment(d.CreatedDate).format("DD-MMM-YYYY hh:mm:ss A")
      }
  },
   {
    Header: 'Vendor Status',
    accessor: 'VendorStatus',
    Cell: ({ value }) => {if(value === "1" ){return("Active")}else{return("Inactive")}}//String(value)
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
                  onClick={(e) => this.handleDelete(e, row.original)}
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
  this.props.actionGetVendors();
}

handleEdit = (row) => {
  console.log(this.props.history)
  this.props.history.push({
    pathname:'/editvendor',
    state:{vendor:row}
  })
  console.log(row)
}

handleDelete = (e, row) => {
  e.preventDefault();
  console.log(row);
  let req = {
    vendorID: row.VendorID
  };
  this.props.actionDeleteVendor(req);
  setTimeout(() => {
    console.log("say hi");
    
    this.setState({ showSuccess: true });
  }, 1100);
  this.setState({ showSuccess: false });
};

  render() {
    console.log(this.props)
    let { getVendorReducer, deleteVendorReducer } = this.props;

    if(deleteVendorReducer.deletedVendor === true){
      setTimeout(()=>{
        deleteVendorReducer.deletedVendor = false;
        window.location.reload();
      }, 1100)  
    }
    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
          <ToastContainer autoClose={2000} />
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Vendors</h6>
                </div>
                <div className="col-lg-6 col-5 text-right">
                  <Link to="/addvendor" className="btn btn-sm btn-white">Add New</Link>
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
                <h3 className="margin-0 padding-0">Vendors</h3>
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
                data={getVendorReducer.vendorsData || [] }
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


export default compose(
  connect(mapStateToProps, {actionGetVendors, actionDeleteVendor}),
  withRouter,
  withStyles(combinedStyles)
)(VendorList)



