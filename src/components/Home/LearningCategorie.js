import React, { Component } from "react";
import { connect } from "react-redux";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";

import combinedStyles from "../../material-ui/combineStyles";
import { actionGetNestedCategory } from "../../actions/Home/actionGetNestedCategory";
import { actionGetLearningPathByCategory } from "../../actions/Home/actionGetLearningPathByCategory";
import { actionGetCoursesByCategory } from "../../actions/Home/actionGetCoursesByCategory"

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0,0,0,.03)",
    borderBottom: "1px solid rgba(0,0,0,.125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = "ExpansionPanelSummary";

class LearningCategorie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      parentCategoryIndex: 0,
      childCategoryIndex: 0,
    }
  }

  handleClickCategoryByCourse = (e, id, i, j) => {
    e.preventDefault();
    console.log(i, " , ", j, " , ", id);
    this.setState({
      parentCategoryIndex: i,
      childCategoryIndex: j
    })

    this.props.actionGetCoursesByCategory(id);
  };

  // handleClickNestedCategoryByCourse = (e, id) => {
  //   this.props.actionGetNestedCategory(id);
  // };

  handleGetLearningPath = (e, i) => {
    e.preventDefault();
    console.log(i);

    this.props.actionGetLearningPathByCategory(i);
  };

  componentDidMount = () => {
    this.props.actionGetNestedCategory();
    // this.props.actionGetLearningPathByCategory();
  };

  render() {
    let {
      getNestedCategoryReducer,
      getCoursesByCategoryReducer,
    } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          {/* {getLearningPathByCategoryReducer.gotLearningPathByCategory &&
            getLearningPathByCategoryReducer.gotLearningPathByCategoryData.map(
              (main, h) => {
                console.log(main);
              }
            )} */}

          {
            getNestedCategoryReducer.gotNestedCategory === true &&
            getNestedCategoryReducer.gotNestedCategoryData.map((item, i) => {
              return (
                <ExpansionPanel key={i} style={{ backgroundColor: 'white' }}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header "
                  >
                    <Typography className=" leftCatogaryMainHedding  ">
                      {item.CategoryName}
                      <span className="TotalCourceValue" />
                    </Typography>
                    <span className="mt-1 mainIconTopRight">
                      {/* <Icon color="action" >
													add_circle
													</Icon> */}
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" /></svg> */}
                    </span>
                  </ExpansionPanelSummary>
                  <div className="ml-2 mainPaddingHead">
                    <div className="row xs-3 mt-2 mb-4 ml-3" href="#">
                      <div className="col-xs-3 mr-3 mt-1">
                        <i
                          className="fa fa-check fafaIconSizeAlign LearningIcon"
                          aria-hidden="true"
                        />
                      </div>
                      <div
                        className="col-xs-8 CatogartMainTextLeft"
                        onClick={e => {
                          this.handleGetLearningPath(e, item.CategoryID);
                        }}
                      >
                        Learning Paths
                          <span className="TotalCourceValueTextC"></span>
                      </div>
                    </div>
                    <div className="row xs-3 mt-2 mb-4 ml-3" href="#">
                      <div className="col-xs-3 mr-3 mt-1">
                        <i
                          className="fa fa-link fafaIconSizeAlign qizzIcon"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="col-xs-8 CatogartMainTextLeft">
                        Quizzes
                          <span className="TotalCourceValueTextC"></span>
                      </div>
                    </div>
                    <div className="row xs-1 mt-2 ml-3" href="#">
                      <div className="col-xs-3 mr-3 mt-1">
                        <i
                          className="fa fa-film fafaIconSizeAlign CoursesIconAlign"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="col-xs-8 CatogartMainTextLeft"
                        onClick={(e) => this.handleClickCategoryByCourse(e, item.CategoryID, i, -1)}
                      >
                        Courses{" "}
                        <span className="TotalCourceValueTextC">{
                          (getCoursesByCategoryReducer.gettingCoursesByCategory === true && this.state.parentCategoryIndex === i) &&
                          getCoursesByCategoryReducer.gettingCoursesByCategoryData.length
                        }</span>{" "}
                      </div>
                    </div>
                  </div>
                  {item.SubCategories.length < 1
                    ? null
                    : item.SubCategories.map((subItem, j) => {
                      return (
                        <ExpansionPanel key={j} style={{ marginTop: '2px' }}>
                          <ExpansionPanelSummary
                            style={{ backgroundColor: '#027c6e' }}
                            expandIcon={<ExpandMoreIcon style={{ color: "#FFFFFF" }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className="leftCatogaryMainCource">
                              {subItem.CategoryName}{" "}
                              <span className="TotalCourceValue" />
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <div className="ml-3 subMainHead">
                              <div
                                className="row xs-3 mt-2 mb-4 ml-3"
                                href="#"
                              >
                                <div className="col-xs-3 mr-3 mt-1">
                                  <i
                                    className="fa fa-check fafaIconSizeAlign LearningIcon"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div
                                  className="col-xs-8 CatogartMainTextLeft"
                                  onClick={e => { this.handleGetLearningPath(e, subItem.CategoryID) }}
                                >
                                  Learning Paths
                                      <span className="TotalCourceValueTextC">
                                  </span>
                                </div>
                              </div>
                              <div
                                className="row xs-3 mt-2 mb-4 ml-3"
                                href="#"
                              >
                                <div className="col-xs-3 mr-3 mt-1">
                                  <i
                                    className="fa fa-link fafaIconSizeAlign qizzIcon"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div className="col-xs-8 CatogartMainTextLeft">
                                  Quizzes
                                      <span className="TotalCourceValueTextC">
                                  </span>
                                </div>
                              </div>
                              <div className="row xs-1 mt-2 ml-3" href="#">
                                <div className="col-xs-3 mr-3 mt-1">
                                  <i
                                    className="fa fa-film fafaIconSizeAlign CoursesIconAlign"
                                    aria-hidden="true"
                                  />
                                </div>
                                {
                                  console.log(subItem)
                                }
                                <div className="col-xs-8 CatogartMainTextLeft"
                                  onClick={(e) => this.handleClickCategoryByCourse(e, subItem.CategoryID, i, j)}
                                >
                                  Courses{" "}
                                  <span className="TotalCourceValueTextC">
                                    {
                                      (getCoursesByCategoryReducer.gettingCoursesByCategory === true && this.state.childCategoryIndex === j) &&
                                      getCoursesByCategoryReducer.gettingCoursesByCategoryData.length}
                                  </span>{" "}
                                </div>
                              </div>
                            </div>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      );
                    })}
                </ExpansionPanel>
              );
            })}

        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionGetNestedCategory,
      actionGetLearningPathByCategory,
      actionGetCoursesByCategory
    },
    dispatch
  );
};
const formikEnhancer = withFormik({
  mapPropsToValues: () => ({}),

  displayName: "LearningCategorie"
})(LearningCategorie);

const CoursesForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

export default withRouter(withStyles(combinedStyles)(CoursesForm));
