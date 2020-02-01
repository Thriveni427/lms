import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Videocam from '@material-ui/icons/Videocam';
import { bindActionCreators } from 'redux';


import combinedStyles from '../../material-ui'
import { actionGetCourseTopicList } from '../../actions/actionGetCourseTopicList';


const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0,0,0,.125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  },
  expanded: {
    margin: 'auto',
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0,0,0,.03)',
    borderBottom: '1px solid rgba(0,0,0,.125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
}))(MuiExpansionPanelDetails);


class CourseTopicList extends React.Component {
  state = {
    expanded: 'panel',
    currentIndex: 0,
  };

  componentDidMount = () => {
    console.log(this.props);
    
    // let courseID = JSON.parse(sessionStorage.getItem('courseID'));
    // if (courseID === null || courseID === undefined) {
    //   sessionStorage.setItem("courseID", this.props.location.state.courseID);
    // }

    this.props.actionGetCourseTopicList(this.props.history.location.state.courseID);
    
    // this.props.actionGetAllSessionByTopic({"courseID": courseID, "topicID": 41});
  }

  handleChange = (index, event) => {
    console.log(index);
    event.preventDefault();
    this.setState({
      currentIndex: index,
    });
    // let courseID = JSON.parse(sessionStorage.getItem('courseID'));
    // if (courseID === null || courseID === undefined) {
    //   sessionStorage.setItem("courseID", this.props.location.state.courseID);
    // }
    // this.props.actionGetAllSessionByTopic({"courseID": courseID, "topicID": 41});
  };

  handleAddSession = (topic) => {
    console.log(topic);
    
    
    this.props.handleAddSession(topic)
  }

  render() {
    const { currentIndex } = this.state;
    const { classes, getCourseTopicListReducer } = this.props;
    return (
      <React.Fragment>
        {
          ((typeof getCourseTopicListReducer.gotCourseTopicListData !== 'undefined' && getCourseTopicListReducer.gotCourseTopicListData.length > 0) ?
            <React.Fragment></React.Fragment> : <h4>No Topic is available in this course</h4>)
        }
        {
          getCourseTopicListReducer.gotCourseTopicListData.map((item, index) => {
            console.log(item);
            
            return (
              <div>
                <ExpansionPanel
                  square
                  // expanded={expanded === 'panel'}
                  expanded={currentIndex === index ? true : false}
                  onChange={(event) => { this.handleChange(index, event) }}
                >
                  <ExpansionPanelSummary>
                    <Typography key={index}
                      style={{ fontSize: 16 }}
                    >{item.TopicName}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="flex-column">

                    {
                      item.Sessions.map((arr) => {
                        return (
                          <React.Fragment>
                            <div style={{ flexDirection: 'column' }} key={1}>
                              <ListItem key={1} style={{
                                borderBottomStyle: 'solid',
                                borderBottomWidth: 1,
                                borderBottomColor: '#e4e4e4'
                              }}>
                                <Videocam />
                                <ListItemText primary={arr.SessionName} />
                                <i className="fas fa-play-circle"></i>&nbsp;
                              </ListItem>
                            </div>

                          </React.Fragment>
                        )
                      })
                    }

                    <div className="d-flex justify-content-center align-items-center">
                      <Button
                        style={{ marginTop: 40, paddingTop: 15, paddingBottom: 15 }}
                        variant="contained"
                        className={["w-25", classes.button, classes.buttonSecondary]}
                        onClick={() => this.handleAddSession(item.TopicID)}
                      >
                        + Add Session
                              </Button>
                    </div>

                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            )
          })
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ actionGetCourseTopicList }, dispatch)
}

export default withRouter(withStyles(
  combinedStyles)(connect(mapStateToProps, mapDispatchToProps)(CourseTopicList)
  ))