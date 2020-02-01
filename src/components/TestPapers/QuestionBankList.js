import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactTable from "react-table";
import { withStyles } from '@material-ui/core/styles';
import combinedStyles from '../../material-ui';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import EditQuestionBank  from './EditQuestionBank';
import { ToastContainer } from 'react-toastify';
import { actionGetQuestionBankList } from '../../actions/actionGetQuestionBankList';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

export class QuestionBankList extends Component {

constructor(props) {

  super(props);
  this.state = {
        showSuccess: false,
        labelWidth: 0,
        open: false,
        fullWidth: true,
        maxWidth: 'sm',
        singleBank: []
    }

  this.columns = [{
    Header: 'Course Name',
    accessor: 'Name' // String-based value accessors!
  },
  {
    Header: 'Question Bank Name',
    accessor: 'QuestionBankName'
  },{
    Header: 'Category',
    accessor: 'CategoryName'
  },{
    Header: 'No. of Question Papers',
    accessor: 'TotalQuestionPapers'
  },{
    Header: 'Question Bank Visibility',
    accessor: 'QuestionBankVisibility',
    Cell: ({ value }) => { return ( (value === 1 )?"True":"False" ) }
  },
  {
    Header: 'Action',
    Cell: row => (
           <div>
              <IconButton className={props.classes.buttonTableAction}>
      				<Tooltip title="View Question Bank" TransitionComponent={Zoom} placement="top">
                <Icon
                  className={[props.classes.icon, 'fas fa-file-alt']}
                  color="primary"
                  onClick={() => this.handleView(row.original)}
                />
                </Tooltip>
              </IconButton>
              <IconButton className={props.classes.buttonTableAction}>
      				<Tooltip title="Edit Question Bank" TransitionComponent={Zoom} placement="top">
                <Icon
                  className={[props.classes.icon, 'fas fa-pen-square']}
                  color="primary"
                  onClick={(e) => this.handleClickOpen(e, row.original)}

                />
                </Tooltip>
              </IconButton>
              {/* <IconButton className={props.classes.buttonTableAction}>
                  <Assessment
                    color="secondary"
                    onClick={() => this.handleTest(row.original)}
                  />
              </IconButton> */}
           </div>
       )
  }]
}

componentDidMount = () => {
  this.props.actionGetQuestionBankList();
}

handleView = (row) => {
  this.props.history.push({
    pathname:'/questionpaper',
    state:{questionbank:row}
  })
  console.log(row)
}
handleCategoryChange = event => {
  this.setState({ [event.target.name]: event.target.value });
  this.props.setValues({
    ...this.props.values,
    [event.target.name]: event.target.value
  });
};

handleClickOpen = (event, row) => {
  this.setState({
    open: true,
    singleBank: row
  });
};

handleClose = () => {
  this.setState({ open: false });
};

  render() {
    console.log(this.props)
    const {
      fullScreen,
    } = this.props;

    let { getQuestionBankListReducer } = this.props;

    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
          <ToastContainer autoClose={2000} />
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Question Banks</h6>
                </div>
                {/* <div className="col-lg-6 col-5 text-right">
                  <Link to="/createcourse" className="btn btn-sm btn-white">New</Link>
                  <Link to="#" className="btn btn-sm btn-white">Filters</Link>
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
                <h3 className="margin-0 padding-0">Question Banks</h3>
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
                data={getQuestionBankListReducer.QuestionBankData || [] }
                columns={this.columns}
              />
            </div>
          </div>
        </div>
        </div>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          {/* <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
          <DialogContent>
            {/* <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText> */}
            {console.log(this.props)}
            <EditQuestionBank singleBank={this.state.singleBank} handleClose={this.handleClose} />
          </DialogContent>
           <DialogActions>
            {/* <Button onClick={this.handleClose} color="primary" variant="contained" className={[classes.button, classes.buttonSecondary]}>
              Close
            </Button> */}
            {/*
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button> */}
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default withStyles(combinedStyles)(
    connect(mapStateToProps, {actionGetQuestionBankList})(QuestionBankList)
)