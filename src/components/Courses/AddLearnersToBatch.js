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
import { actionAddLearnersToBatch } from '../../actions/actionAddLearnersToBatch';
import { actionGetAllUsers } from '../../actions/Courses/User/actionGetAllUsers';


export class AddLearnersToBatch extends Component {
    state = {
        selectedOption: null,
        fullWidth: true,
        maxWidth: 'sm',
        showLoginModal: false,
        assignedSuccess: false

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

            this.props.actionGetAllUsers();
            //  this.props.actionGetUserDetailsByVendor(data);

        } else if (userinfo.userType === "vendor") {
            data = userinfo.VendorID
            //  this.props.actionGetAllUsers(data);
            this.props.actionGetUserDetailsByVendor(data);
        } else {
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

        let data = {
            users: users,
            batchID: this.props.BatchID
        };
        this.props.actionAddLearnersToBatch(data);

    }

    handleAssignClose = () => {
        this.setState({ showLoginModal: true });
        this.props.handleAssignClose();
    };

    render() {
        const { selectedOption } = this.state;
        let usersOption = [];
        let onClose = []
        // let usersOptionsForAdmin = [];


        console.log(this.props.getAllUsersReducer)
        console.log(this.props.addLearnersToBatchReducer)


        if (this.props.addLearnersToBatchReducer.addedLearnersToBatch === true && this.state.showLoginModal === false) {
            this.handleAssignClose()
            setTimeout(() => { window.location.reload(); }, 1100);
        }

        if (this.props.getUsersReducer.fetchedUsers === true && this.props.getUsersReducer.usersData !== []) {
            usersOption = this.props.getUsersReducer.usersData.map((arr1) => {
                return {
                    label: arr1.FirstName,
                    value: arr1.UserID
                }
            })
        }
        else if (this.props.getAllUsersReducer.fetchedAllUsers === true && this.props.getAllUsersReducer.allUsersData !== []) {
            usersOption = this.props.getAllUsersReducer.allUsersData.map((arr) => {
                return {
                    label: arr.FirstName,
                    value: arr.UserID
                }
            })
        }
        else {
            // usersOption = []
        }





        let { classes } = this.props;
        return (
            <div>
                <Dialog
                    fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth}
                    open={this.props.showAssignModal}
                    onClose={this.props.handleAssignClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Learners To Batch</DialogTitle>
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
                            options={usersOption}

                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.props.handleAssignClose}
                            color="primary"
                            className={[classes.button, classes.buttonSecondary]}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleAssign}
                            color="secondary"
                            className={[classes.button, classes.buttonPrimary]}
                        >
                            Add
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
    connect(mapStateToProps, { actionGetUserDetailsByVendor, actionGetAllUsers, actionAddLearnersToBatch })(AddLearnersToBatch)
)