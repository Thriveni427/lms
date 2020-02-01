import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import combinedStyles from '../../../material-ui';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { actionGetLiveClass } from '../../../actions/actionGetLiveClass';

// import { ToastContainer } from 'react-toastify';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import LiveClassDetails from './LiveClassDetails';




export class UserLiveClass extends Component {

    constructor(props) {

        super(props);
        this.state = {
            showSuccess: false,
            labelWidth: 0,
            open: false,
            fullWidth: true,
            maxWidth: 'md',
            liveClassID: '',
            singleLive: [],
        }


    }
    componentDidMount = () => {
        this.props.actionGetLiveClass();
    }

    // handleClickOpen = (event, id) => {
    //     this.setState({ open: true, liveClassID: id });
    //     console.log(event.target);
    //     this.setState({ [event.target.name]: event.target.value });
    // };
    handleClickOpen = (event, row) => {
        this.setState({
            open: true,
            singleLive: row
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        console.log(this.props)
        let { classes,
            getLiveClassReducer,
            fullScreen,
        } = this.props;
        console.log(getLiveClassReducer.LiveClassData)
        if(getLiveClassReducer.LiveClassData === null || getLiveClassReducer.LiveClassData === 'undefinded') getLiveClassReducer.LiveClassData = [];
        return (
            <React.Fragment>
                <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
                    <div className="container-fluid">
                        {/* <ToastContainer autoClose={2000} /> */}
                        <div className="header-body">
                            <div className="row align-items-center py-4">
                                <div className="col-lg-6 col-7">
                                    <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > User> Live Classes</h6>
                                </div>
                                <div className="col-lg-6 col-5 text-right">
                                    {/* <Link to="/createcourse" className="btn btn-sm btn-white">New</Link>
                                    <Link to="#" className="btn btn-sm btn-white">Filters</Link> */}
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

                                <div className="col-md-12">
                                    <div className="row mb-3">

                                        <div className="col-md-4">
                                            <h5>Live Classes</h5>
                                        </div>

                                        <div className="col-md-6">
                                            <h5>Description</h5>
                                        </div>

                                        <div className="col-md-2">
                                            <h5>Status</h5>
                                        </div>

                                    </div>
                                    <hr className="mb-4"></hr>
                                </div>

                                <div className="col-md-12">
                                    {
                                        getLiveClassReducer.LiveClassData.map((arr) => {
                                            console.log(arr);
                                            return (

                                                <div className="row">

                                                    <div className="col-md-4">

                                                        <Card className={classes.card} style={{ width: 200, height: 100 }}>
                                                            <CardActionArea>
                                                                <CardMedia
                                                                    component="img"
                                                                    alt="Contemplative Reptile"
                                                                    // className={classes.media}
                                                                    height="100"
                                                                    // width="10"
                                                                    image={arr.iuploadname == null ? " ": arr.iuploadname.slice(0, -1)}
                                                                    title="Contemplative Reptile"
                                                                    marginLeft="20"
                                                                />

                                                            </CardActionArea>
                                                        </Card>
                                                        <h4 className="mt-2 mb-5" >{arr.ClassName}</h4>


                                                    </div>

                                                    <div className="col-md-6">
                                                        <p>{arr.CourseObjective}</p>

                                                    </div>

                                                    <div className="col-md-2">
                                                        {/* <div className="row"> */}
                                                        <div className="d-flex flex-column">
                                                            <Button
                                                                variant="contained"
                                                                className={[classes.button, classes.buttonPrimary]}
                                                                type="submit"
                                                                onClick={(e) => this.handleClickOpen(e, arr)}

                                                            >
                                                                View / Join
                                                        </Button>
                                                            {/* <Button
                                                                style={{ marginTop: 10 }}
                                                                variant="contained"
                                                                className={[classes.button, classes.buttonPrimary]}
                                                                type="submit"
                                                            >
                                                                Join Class
                                                        </Button> */}
                                                        </div>
                                                        {/* </div> */}
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }

                                </div>
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
                        <LiveClassDetails singleLive={this.state.singleLive} handleClose={this.handleClose} />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleClose}
                            style={{ position: 'absolute', top: 0, right: 0 }}
                            color="primary"
                        	>
                            <Icon>close</Icon>
                        </Button>
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
    connect(mapStateToProps, { actionGetLiveClass })(UserLiveClass)
)