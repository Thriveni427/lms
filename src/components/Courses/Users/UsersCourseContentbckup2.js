import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import combinedStyles from '../../../material-ui';

import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Videocam from '@material-ui/icons/Videocam';
import Help from '@material-ui/icons/Help';
import Image from '@material-ui/icons/Image';
import Assignment from '@material-ui/icons/Assignment';

//import { actionDeleteMaterial } from '../../actions/Courses/actionDeleteMaterial';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { Zoom } from '@material-ui/core';

import { actionGetMaterialBySection } from '../../../actions/Courses/User/actionGetMaterialBySection';


export class UsersCourseContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            openCourse: true
        }
    }

    componentDidMount = () => {
        console.log(this.props);

        console.log("this.props.history.location.state.courseDetail");
        console.log(this.props.history.location.state.courseDetail);
        localStorage.setItem("sectionID", null)
        this.props.actionGetMaterialBySection({ "courseID": this.props.history.location.state.courseDetail.CourseID });
    }

  render() {
        const {
            classes,
            history,
            getMaterialBySectionReducer,
        } = this.props;
    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Users</h6>
                </div>
                <div className="col-lg-6 col-6 text-right">
                  {/* <Button
                    variant="contained"
                    color="primary"
                    className={[classes.button, classes.buttonWhite, classes.buttonSm]}
                  >
                    New
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={[classes.button, classes.buttonWhite, classes.buttonSm]}
                  >
                    Filters
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header d-flex flex-row align-items-center justify-content-between">
                    <div className="mr-5">
                        <img className="card" src={require('../../images/514204-amazon-web-services-logo.jpg')} width="250" />
                    </div>
                    <div className="mr-2">
                        <h2>Amazon Web Services - AWS</h2>
                        <p>Lorem ipsum dolor sit amet, quis sanctus instructior ad vix, id quis semper meisea altera option senserit ei. Oportere splendide in qui, an ius definiebas reprimique temporibus,</p>
                    </div>
                    <div style={{flexBasis: 180}}>
                        <Button
                            variant="contained"
                            className={[classes.button, classes.buttonPrimary]}
                            type="submit"
                        >
                            Start
                        </Button>
                        <Button
                            style={{marginTop: 10}}
                            variant="contained"
                            className={[classes.button, classes.buttonSecondary]}
                            type="submit"
                        >
                            My Courses
                        </Button>
                    </div>
                </div>
                <div className="content mt-4">
                    <div className="col-md-12">
                        <div className="d-flex flex-column">
                          <span className="mb-2">Lesson plan</span>

                          {
                                               getMaterialBySectionReducer.MaterialBySectionData.map((item, index) => {
                                                    console.log("item");
                                                    console.log(item);
                                                    //this.fetchMaterial(item.Section.Section.SectionID);
                                                    return (
                                                        <React.Fragment>
                                                            <MenuItem
                                                                to="/"
                                                                key={index}
                                                                button
                                                                // onClick={() => { this.fetchMaterial(item.SectionID) }}
                                                                className={classes.Coursenested}
                                                            >

                                                                {/* <ListItemText className={classes.nestedItems} inset primary={} /> */}
                                                            </MenuItem>
                                                            <div className="col-md-10">
                                                                <h2 className="courseSetup__title">{item.Section.SectionName}</h2>
                                                                {
                                                                    ((typeof item.Section.material !== 'undefined' && item.Section.material.length > 0) ?
                                                                    item.Section.material.map((material, index) => {
                                                                        return <ListItem key={index} className="">
                                                                            <ListItemAvatar>
                                                                                {((material.MaterialType === "video/x-ms-wmv" || material.MaterialType === "video/mp4") ? <Videocam /> : ((material.MaterialType === "image/jpeg" || material.MaterialType === "image/png") ? <Image /> : ((material.MaterialType === "video/embed") ? <img src="https://static.thenounproject.com/png/531904-200.png" width="30px" height="30px" alt="im" /> : ((material.MaterialType === "assignment") ? <Assignment /> : <Help />))))}
                                                                            </ListItemAvatar>
                                                                            <ListItemText
                                                                                primary={material.MaterialName}
                                                                            />
                                                                            <IconButton className={this.props.classes.buttonTableAction}>
                                                                                <Tooltip title="Edit" TransitionComponent={Zoom} placement="top">
                                                                                    <Icon
                                                                                        style={{ fontSize: 19.5 }}
                                                                                        className={[this.props.classes.icon, 'fas fa-pen-square']}
                                                                                        color="primary"
                                                                                    // onClick={(e) => this.handleEdit(e, material.MaterialID)}
                                                                                    />
                                                                                </Tooltip>
                                                                            </IconButton>
                                                                        </ListItem>
                                                                    }) : <h4>No Material is available in this section</h4>)
                                                                }
                                                              
                                                                {/* <CourseMaterial courseDetail={this.props.history.location.state.courseDetail} /> */}
                                                            </div>
                                                        </React.Fragment>
                                                    )

                                                })

                                            }

                          <div className="mb-4">
                            <h4>SESSION 1: UNDERSTANDING THE BIG DATA PROBLEM</h4>
                            <ul>
                              <li>Identifying Big Data Symptoms</li>
                              <li>Understanding the Big Data Projects Ecosystem</li>
                              <li>Creating the foundation of a long-term Big Data Architecture</li>
                            </ul>
                          </div>

                          <span className="mb-2">Duration - 01 Hr 30 mins</span>
                        </div>
                    </div>
                </div>
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

const mapDispatchToProps = {

}
export default withRouter(withStyles(combinedStyles)(connect(mapStateToProps, { actionGetMaterialBySection })(UsersCourseContent)
))
