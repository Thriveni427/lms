import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";


import rolePermissions1 from "../../helpers/rolePermissions1.js";

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0,0,0,.125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    }
  },
  expanded: {
    margin: "auto"
  }
})(MuiExpansionPanel);

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

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    display: "block"
  }
}))(MuiExpansionPanelDetails);
export class ManageRoles extends React.Component {
  state = {
    expanded: "",
    expandedinner: ""
  };
  handleChangeOuter = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  handleChangeInner = panel1 => (event, expanded) => {
    this.setState({
      expandedinner: expanded ? panel1 : false
    });
  };

  render() {
    const { expanded, expandedinner } = this.state;
    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">
                    Home > Manage Roles
                  </h6>
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
                  <h3 className="margin-0 padding-0">Manage Roles</h3>
                </div>
                <div className="col-md-12 my-4">
                  {rolePermissions1.map((list, index) => {
                    return (
                      <div>
                        <ExpansionPanel
                          square
                          expanded={expanded === `panel${index}`}
                          onChange={this.handleChangeOuter(`panel${index}`)}
                        >
                          <ExpansionPanelSummary>
                            <Typography>{list.module}</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            {list.subModules.map((arr, index) => {
                              return (
                                <ExpansionPanel
                                  square
                                  fullwdith
                                  expanded={
                                    expandedinner === `panelinner${index}`
                                  }
                                  onChange={this.handleChangeInner(
                                    `panelinner${index}`
                                  )}
                                  className=""
                                >
                                  <ExpansionPanelSummary>
                                    <Typography>{arr.name}</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails>
                                    <Typography>
                                      {/* <div className="row"> */}
                                      {/* <div className="col-md-3"> */}
                                      Read :{" "}
                                      {arr.permissions.Read === false
                                        ? "falseaaaaaaaaaa"
                                        : true}
                                      {/* </div> */}
                                      {/* <div className="col-md-3"> */}
                                      Create : {arr.permissions.Create}
                                      {/* </div> */}
                                      {/* <div className="col-md-3"> */}
                                      Edit : {arr.permissions.Edit}
                                      {/* </div> */}
                                      {/* <div className="col-md-3"> */}
                                      Delete : {arr.permissions.Delete}
                                      {/* </div> */}
                                      {/* </div> */}
                                    </Typography>
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>
                              );
                            })}

                            {/* <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                        ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                      </Typography> */}
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                        {/* <ExpansionPanel
                    square
                    expanded={expanded === 'panel2'}
                    onChange={this.handleChange('panel2')}
                  >
                    <ExpansionPanelSummary>
                      <Typography>Collapsible Group Item #2</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                        ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel
                    square
                    expanded={expanded === 'panel3'}
                    onChange={this.handleChange('panel3')}
                  >
                    <ExpansionPanelSummary>
                      <Typography>Collapsible Group Item #3</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                        ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel> */}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ManageRoles;
