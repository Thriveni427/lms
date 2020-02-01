import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from 'react-select';

import combinedStyles from '../../material-ui'
import { actionGetUserDetailsByVendor } from '../../actions/actionGetUserDetails';
import { actionGetAllUsers } from '../../actions/Courses/User/actionGetAllUsers';
// console.log(actionGetUserDetailsByVendor)

const userNames = [
  { value: 'Learner', label: 'Learner' },
  { value: 'Umesh', label: 'Umesh' },
  { value: 'Abhishek', label: 'Abhishek' },
  { value: 'Anurag', label: 'Anurag' },
  { value: 'Parth', label: 'Parth' },
  { value: 'Ranga', label: 'Ranga' },
]

export class AssignLiveClass extends Component {



    state = {
        selectedOption: null,
        fullWidth: true,
        maxWidth: 'sm',
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    componentDidMount = () => {
        let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
        if (userinfo === null) userinfo = [];
        let data; // = ((userinfo.userType === "admin") ? userinfo.AdminID : (userinfo.userType === "vendor") ? userinfo.VendorID : userinfo.UserID);
        console.log(userinfo.userType);

        if (userinfo.userType === "admin") {
          data = userinfo.AdminID;
          //  console.log(data);

          // this.props.actionGetAllUsers();
          //  this.props.actionGetUserDetailsByVendor(data);

      }
        else if (userinfo.userType === "vendor") {
            data = userinfo.VendorID
            //  this.props.actionGetAllUsers(data);
            // this.props.actionGetUserDetailsByVendor(data);
        }
        else {
            data = userinfo.UserID
        }
        console.log(data);
    }

    handleAssign = () => {
        console.log(this.state.selectedOption);
        console.log(this.props);
        let users = [];
        let arr = [];
        arr.push(...this.state.selectedOption);
        arr.map((user) => {
            console.log(user);
            users.push(user.value);
            return 0;
        })
        console.log(users);

        let reqQuery = {
            users: users,
            courseID: this.props.courseID
        };
        this.props.actionAssignCourse(reqQuery);
    }

    render() {
        const { selectedOption } = this.state;
        // let usersOptionsForAdmin = [];

        console.log("cooooooooo", this.props);
        
        return (
            <div>
                <Dialog
                    fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth}
                    open={this.props.showAssignModal}
                    onClose={this.props.handleAssignClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Assign</DialogTitle>
                    <DialogContent style={{ minHeight: 300 }}>
                        <DialogContentText>
                            Select User.
                        </DialogContentText>
                        <Select
                            menuContainerStyle={{ 'zIndex': 999 }}
                            isMulti
                            isSearchable={true}
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={userNames}

                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.props.handleAssignClose}
                            // color="primary"
                            // className={[classes.button, classes.buttonSecondary]}
                            //  className={[classes.buttonSecondary]}
                            style={{backgroundColor:"orange", color:"white"}}


                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.props.handleAssignClose}
                            // color="secondary"
                            // className={[classes.button, classes.buttonPrimary]}
                            style={{backgroundColor:"#3A7C6E", color:"white"}}
                            // className={[ classes.buttonPrimary]}
                        >
                            Assign
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


const mapStateToProps = state => {
  return state
}
export default withStyles(combinedStyles)(
  connect(
    mapStateToProps,
    { actionGetUserDetailsByVendor, actionGetAllUsers}
  )(AssignLiveClass)
);
// export default connect(mapStateToProps, {actionGetUserDetailsByVendor})(withStyles(combinedStyles)(AssignLiveClass))
// export default connect(mapStateToProps, {actionGetUserDetailsByVendor})(withStyles(combinedStyles)(AssignLiveClass));