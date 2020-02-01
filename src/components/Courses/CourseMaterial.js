import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Videocam from '@material-ui/icons/Videocam';
import Help from '@material-ui/icons/Help';
import Image from '@material-ui/icons/Image';
import Assignment from '@material-ui/icons/Assignment';


import combinedStyles from '../../material-ui'
import { actionGetMaterial } from '../../actions/actionGetMaterial';
import { actionDeleteMaterial } from '../../actions/Courses/actionDeleteMaterial';
import { actionGetFirstMaterialByCourse } from '../../actions/Courses/actionGetFirstMaterialByCourse';


const options = [
    'Edit',
    'Delete'
];
export class CourseMaterial extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
        }
    }
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (event) => {
        this.setState({ anchorEl: null });
        if (event.target.value === options[1]) {
            console.log("s");
        }
    };

    // handleDelete = (e, data) => {
    //     e.preventDefault();
    //     this.props.actionDeleteMaterial(data);
    // };

    componentDidMount = () => {
        let payload = {
            "courseID": this.props.courseDetail.CourseID
        }
        this.props.actionGetFirstMaterialByCourse(payload);

        if(this.props.getCourseTopicListReducer.gotCourseTopicList === true){
            console.log(this.props.getCourseTopicListReducer.gotCourseTopicListData);
        }
    }

    render() {
        let { getMaterialBySessionReducer } = this.props;
        console.log(getMaterialBySessionReducer.gotMaterialBySessionData);
       
        return (
            <div>
                <Grid item xs={12} md={12}>
                    <div>
                        <List>
                            {
                                (
                                    (typeof getMaterialBySessionReducer.gotMaterialBySessionData !== 'undefined' && getMaterialBySessionReducer.gotMaterialBySessionData.length > 0)
                                        ?
                                        <React.Fragment></React.Fragment>
                                        :
                                        <h4>No Material is available in this section</h4>
                                )
                            }
                            {
                                getMaterialBySessionReducer.gotMaterialBySessionData.map((item, index) => {

                                    return <ListItem key={index} className="materialItem">
                                        <ListItemAvatar>
                                            {
                                                ((item.MaterialType === "video/x-ms-wmv" || item.MaterialType === "video/mp4")
                                                    ?
                                                    <Videocam />
                                                    :
                                                    ((item.MaterialType === "image/jpeg" || item.MaterialType === "image/png")
                                                        ?
                                                        <Image />
                                                        :
                                                        ((item.MaterialType === "video/embed")
                                                            ?
                                                            <img src="https://static.thenounproject.com/png/531904-200.png" width="30px" height="30px" alt="im" />
                                                            :
                                                            ((item.MaterialType === "assignment")
                                                                ?
                                                                <Assignment />
                                                                :
                                                                <Help />
                                                            )
                                                        )
                                                    )
                                                )
                                            }
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.MaterialName}
                                        />
                                        {/* <IconButton className={this.props.classes.buttonTableAction}>
                                            <Tooltip title="Edit" TransitionComponent={Zoom} placement="top">
                                                <Icon
                                                    style={{ fontSize: 19.5 }}
                                                    className={[this.props.classes.icon, 'fas fa-pen-square']}
                                                    color="primary"
                                                    // onClick={(e) => this.handleEdit(e, item.MaterialID)}
                                                />
                                            </Tooltip>
                                        </IconButton> */}
                                        {/* <IconButton className={this.props.classes.buttonTableAction}>
                                            <Tooltip title="Delete" TransitionComponent={Zoom} placement="top">
                                                <Icon
                                                    style={{ fontSize: 18 }}
                                                    className={[this.props.classes.icon, 'fas fa-trash-alt']}
                                                    color="primary"
                                                    onClick={(e) => this.handleDelete(e, item.MaterialID)}
                                                />
                                            </Tooltip>
                                        </IconButton> */}
                                    </ListItem>
                                })
                            }
                        </List>
                    </div>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default withStyles(combinedStyles)(
    connect(mapStateToProps, { actionGetMaterial, actionDeleteMaterial, actionGetFirstMaterialByCourse })(CourseMaterial)
)