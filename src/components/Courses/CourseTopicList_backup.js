import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import combinedStyles from '../../material-ui'
import Button from '@material-ui/core/Button';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Videocam from '@material-ui/icons/Videocam';


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
    expanded: 'panel1'
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleAddSession = (topic) => {
    this.props.handleAddSession(topic)
  }

  render() {
    const { expanded } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <ExpansionPanel
          square
          expanded={expanded === 'panel1'}
          onChange={this.handleChange('panel1')}
        >
          <ExpansionPanelSummary>
            <Typography
              style={{fontSize: 16}}
            >Collapsible Group Item #1</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="flex-column">
            <div style={{ flexDirection: 'column' }} key={1}>
              <ListItem key={1} style={{
                borderBottomStyle: 'solid',
                borderBottomWidth: 1,
                borderBottomColor: '#e4e4e4'
              }}>
                <Videocam />
                <ListItemText primary="Introduction" />
                <i className="fas fa-play-circle"></i>&nbsp;
              </ListItem>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <Button
                style={{ marginTop: 40, paddingTop: 15, paddingBottom: 15}}
                variant="contained"
                className={["w-25", classes.button, classes.buttonSecondary]}
                onClick={() => this.handleAddSession(1)}
              >
                + Add Session
              </Button>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default withRouter(withStyles(
  combinedStyles)(connect(mapStateToProps, mapDispatchToProps)(CourseTopicList)
))