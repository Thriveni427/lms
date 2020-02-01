import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubdirectoryArrowRight from '@material-ui/icons/SubdirectoryArrowRight';


import combinedStyles from '../../material-ui'
import { actionGetCourseTopicList } from '../../actions/actionGetCourseTopicList';
import { actionGetMaterialBySession } from '../../actions/Courses/actionGetMaterialBySession';


export class CourseMaterialSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      openCourse: true
    }
  }
  
  componentDidMount = () => {
    console.log("this.props.courseDetail");
    console.log(this.props.courseDetail);

    localStorage.setItem("sectionID", null);

    this.props.actionGetCourseTopicList(this.props.courseDetail.CourseID);

  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  fetchMaterial = (e, id) => {
    e.preventDefault();
    let payload = {
      courseID: 1,
      sessionID: id
    };

    this.props.actionGetMaterialBySession(payload);

    localStorage.setItem("sectionID", id);
  }

  render() {
    let {
      classes,
      getCourseTopicListReducer,
      courseDetail
    } = this.props;
    console.log(this.props)

    return (
      <div className="col-md-3">
        <h2 className="courseSetup__title">Topic & Sessions</h2>
        <MenuList className={classes.CourseMenuList}>
          <MenuItem className={classes.CoursemenuItem} onClick={() => this.setState({ openCourse: !this.state.openCourse })}>
            <ListItemIcon className={classes.Coursenavicon}>
              <FontAwesomeIcon icon="sliders-h" />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary={courseDetail.Name} />
            {this.state.openCourse ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
          <Collapse
            in={this.state.openCourse}
            timeout="auto"
            unmountOnExit
            className={classes.Coursenavcollapse}
          >
            <List component="div" disablePadding>
              {
                getCourseTopicListReducer.gotCourseTopicListData.map((item, index) => {

                  return <List component="div" disablePadding>
                    <MenuItem
                      to="/"
                      key={index}
                      button
                      onClick={() => { this.fetchMaterial(item.TopicID) }}
                      className={classes.Coursenested}
                    >
                      <ListItemIcon className={classes.icon}>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText className={classes.nestedItems} inset primary={item.TopicName} />
                    </MenuItem>

                    {
                      (item.Sessions.length > 0) &&
                      item.Sessions.map((subitem, index2) => {
                        return <MenuItem
                          to="/"
                          key={index2}
                          button
                          onClick={(e) => { this.fetchMaterial(e, subitem.SessionID) }}
                          className={classes.Coursenested}
                        >
                          <ListItemIcon className={classes.icon}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <SubdirectoryArrowRight />
                          </ListItemIcon>
                          <ListItemText className={classes.nestedItems} inset primary={subitem.SessionName} />
                        </MenuItem>
                      })
                    }

                  </List>

                })}
            </List>
          </Collapse>
        </MenuList>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ actionGetCourseTopicList, actionGetMaterialBySession }, dispatch)
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(combinedStyles)
)(CourseMaterialSection)
