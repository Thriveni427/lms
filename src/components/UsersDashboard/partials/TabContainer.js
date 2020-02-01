import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import UserCourses from "./UserCourses";
import UserTests from "./UserTests";

function TabComponent(props) {
  return (
    <React.Fragment>
      <h2 style={{ fontSize: 18 }}>{props.title}</h2>
      <div>{props.subtitle}</div>
    </React.Fragment>
  );
}
function TabsContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
const styles = () => ({
  bigIndicator: {
    height: 0
  },
  tabNav: {
    backgroundColor: "#d9d9d9"
  },
  tabRoot: {
    padding: 20,
    "&:hover": {
      backgroundColor: "#61C9C5",
      color: "#FFFFFF",
      opacity: 1
    },
    "&$tabSelected": {
      color: "#FFFFFF",
      backgroundColor: "#61C9C5"
    },
    "&:focus": {
      color: "#FFFFFF"
    }
  },
  tabSelected: { border: 0 }
});
export class TabContainer extends Component {
  state = {
    value: "one"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    console.log(this.props);

    const { value } = this.state;
    return (
      <div className="w-100">
        <div className={classes.tabNav}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="fullWidth"
            classes={{
              indicator: classes.bigIndicator
            }}
          >
            <Tab
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              value="one"
              icon={
                <TabComponent title="Courses" subtitle="Your recent courses" />
              }
            />
            <Tab
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              value="two"
              icon={
                <TabComponent title="Quizzes" subtitle="Your recent quizzes" />
              }
            />
            <Tab
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              value="three"
              icon={
                <TabComponent
                  title="Forum Activities"
                  subtitle="Latest forum topics and comments"
                />
              }
            />
          </Tabs>
        </div>
        {value === "one" && (
          <TabsContainer>
            <UserCourses history={this.props.history} />
          </TabsContainer>
        )}
        {value === "two" && (
          <TabsContainer>
            <UserTests />
          </TabsContainer>
        )}
        {value === "three" && <TabsContainer><h5>Item Three</h5></TabsContainer>}
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TabContainer)
);
