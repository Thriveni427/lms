import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom'
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';


import combinedStyles from '../../material-ui'
import { actionSetGamification } from '../../actions/actionSetGamification';


export class Gamifications extends Component {
  state = {
    name: '',
    points: [],
    levels: [],
    badges: [],
    enablesettings: true,
    enablepoints: true,
    enablebadges: true,
    enablelevels: true,
    eachlogin: true,
    eachunit: true,
    coursecompletion: true,
    certification: true,
    testpassed: true,
    assignmentcompletion: true,
    eachdisscussioncomment: true,
    eachlikeondiscussion: true,
    activitybadge: true,
    learningbadge: true,
    testbadge: true,
    assignmentbadge: true,
    certificationbadge: true,
    socialactivitybadge: true,
    surveybadge: true,
    upgradepoints: true,
    upgradecourse: true,
    upgradebadges: true,
  };

  toggleSettings = name => event => {
    this.setState({ [name]: event.target.checked });
  }

  togglePoints = name => event => {
    let arr = [];
    if (name === "enablepoints") {
      let setallpoints;
      if (event.target.checked === true) {
        setallpoints = true;
        console.log(setallpoints);
        arr = ["eachlogin", "eachunit", "coursecompletion", "certification", "testpassed", "assignmentcompletion", "eachdisscussioncomment", "eachlikeondiscussion"];
      }
      else if (event.target.checked === false) {
        setallpoints = false;
        console.log(setallpoints);
      }
      this.setState({
        [name]: event.target.checked,
        eachlogin: setallpoints,
        eachunit: setallpoints,
        coursecompletion: setallpoints,
        certification: setallpoints,
        testpassed: setallpoints,
        assignmentcompletion: setallpoints,
        eachdisscussioncomment: setallpoints,
        eachlikeondiscussion: setallpoints,
        points: arr,
      });
    }
    else {
      let arr = []; let myenablepoints;
      arr.push(...this.state.points);
      console.log(arr);
      ((event.target.checked === true) ? arr.push(name) : arr.pop(name))
      myenablepoints = ((arr.length === 0) ? false : true);
      console.log(myenablepoints);
      this.setState({
        [name]: event.target.checked,
        points: arr,
        enablepoints: myenablepoints,
      });
    }
  };

  toggleBadges = name => event => {
    let arr = [];
    if (name === "enablebadges") {
      let setallbadges;
      if (event.target.checked === true) {
        setallbadges = true;
        //console.log(setallbadges);
        arr = ["activitybadge", "learningbadge", "testbadge", "assignmentbadge", "certificationbadge", "socialactivitybadge", "surveybadge"];
      }
      else if (event.target.checked === false) {
        setallbadges = false;
        //console.log(setallbadges);
      }
      this.setState({
        [name]: event.target.checked,
        activitybadge: setallbadges,
        learningbadge: setallbadges,
        testbadge: setallbadges,
        assignmentbadge: setallbadges,
        certificationbadge: setallbadges,
        socialactivitybadge: setallbadges,
        surveybadge: setallbadges,
        badges: arr,
      });
    }
    else {
      let arr = []; let myenablebadges;
      arr.push(...this.state.badges);
      //console.log(arr);
      ((event.target.checked === true) ? arr.push(name) : arr.pop(name))
      myenablebadges = ((arr.length === 0) ? false : true);
      //console.log(myenablebadges);
      this.setState({
        [name]: event.target.checked,
        badges: arr,
        enablebadges: myenablebadges,
      });
    }
  };

  toggleLevels = name => event => {
    let arr = [];
    if (name === "enablelevels") {
      let setalllevels;
      if (event.target.checked === true) {
        setalllevels = true;
        // console.log(setalllevels);
        arr = ["upgradepoints", "upgradecourse", "upgradebadges"];
      }
      else if (event.target.checked === false) {
        setalllevels = false;
        // console.log(setalllevels);
      }
      this.setState({
        [name]: event.target.checked,
        upgradepoints: setalllevels,
        upgradecourse: setalllevels,
        upgradebadges: setalllevels,
        levels: arr,
      });
    }
    else {
      let arr = []; let myenablelevels;
      arr.push(...this.state.levels);
      console.log(arr);
      ((event.target.checked === true) ? arr.push(name) : arr.pop(name))
      myenablelevels = ((arr.length === 0) ? false : true);
      console.log(myenablelevels);
      this.setState({
        [name]: event.target.checked,
        levels: arr,
        enablelevels: myenablelevels,
      });
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const {
      enablesettings,
      eachlogin,
      eachunit,
      coursecompletion,
      certification,
      testpassed,
      assignmentcompletion,
      eachdisscussioncomment,
      eachlikeondiscussion,
      activitybadge,
      learningbadge,
      testbadge,
      assignmentbadge,
      certificationbadge,
      socialactivitybadge,
      surveybadge,
      upgradepoints,
      upgradecourse,
      upgradebadges,
    } = this.state;

    const {
      handleSubmit,
      classes
    } = this.props;

    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Gamification</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--6">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between border-0">
                  <h3 className="margin-0 padding-0">Gamifications settings</h3>
                  <Switch
                    checked={enablesettings}
                    onChange={this.toggleSettings('enablesettings')}
                    value="enablesettings"
                    color="primary"
                  />
                </div>
                <div className="content">

                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="p-3 pointsContainer">
                      <div className="col-md-12 d-flex align-items-center">
                        <div>Points</div>
                        <div>
                          <Switch
                            checked={this.state.enablepoints}
                            onChange={this.togglePoints('enablepoints')}
                            value="enablepoints"
                            color="primary"
                          />
                        </div>
                      </div>

                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={eachlogin}
                            onChange={this.togglePoints('eachlogin')}
                            value="eachlogin"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "50%" }}>Each login(once in a day)</div>
                        <div style={{ flexBasis: 200 }} >
                          <TextField
                            name="name-1"
                            id="eachLoginValue"
                            // value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            type="number"
                            style={{ margin: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: 100 }} >points</div>
                      </div>
                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }} >
                          <Checkbox
                            checked={eachunit}
                            onChange={this.togglePoints('eachunit')}
                            //value="eachunit"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "50%" }}>Each unit/section compeletion</div>
                        <div style={{ flexBasis: 200 }} >
                          <TextField
                            name="name-2"
                            id="eachUnitValue"
                            // value={this.state.name}
                            //onChange={this.handleChange('name')}
                            margin="normal"
                            type="number"
                            style={{ margin: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: 100 }} >points</div>
                      </div>
                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={coursecompletion}
                            onChange={this.togglePoints('coursecompletion')}
                            value="coursecompletion"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "50%" }}>Course compeletion</div>
                        <div style={{ flexBasis: 200 }} >
                          <TextField
                            name="name-3"
                            id="courseCompeletionValue"
                            // value={this.state.name}
                            // onChange={this.handleChange('name')}
                            margin="normal"
                            type="number"
                            style={{ margin: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: 100 }}>points</div>
                      </div>

                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={certification}
                            onChange={this.togglePoints('certification')}
                            value="certification"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "50%" }}>Certification</div>
                        <div style={{ flexBasis: 200 }} >
                          <TextField
                            id="certificationValue"
                            // value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            type="number"
                            style={{ margin: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: 100 }} >points</div>
                      </div>

                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div
                          style={{ flexBasis: 50 }}
                        >
                          <Checkbox
                            checked={testpassed}
                            onChange={this.togglePoints('testpassed')}
                            value="testpassed"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "50%" }}>Each successful test compeletion</div>
                        <div style={{ flexBasis: 200 }} >
                          <TextField
                            id="testCompeletionValue"
                            // value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            type="number"
                            style={{ margin: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: 100 }} >points</div>
                      </div>

                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={assignmentcompletion}
                            onChange={this.togglePoints('assignmentcompletion')}
                            value="assignmentcompletion"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "50%" }}>Each successful assignment compeletion</div>
                        <div style={{ flexBasis: 200 }} >
                          <TextField
                            id="asssignmentCompeletionValue"
                            // value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            type="number"
                            style={{ margin: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: 100 }}>points</div>
                      </div>

                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={eachdisscussioncomment}
                            onChange={this.togglePoints('eachdisscussioncomment')}
                            value="eachdisscussioncomment"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "50%" }}>Each disscussion topics or comments</div>
                        <div style={{ flexBasis: 200 }} >
                          <TextField
                            id="topicsOrCommentsValue"
                            // value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            type="number"
                            style={{ margin: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: 100 }}>points</div>
                      </div>
                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={eachlikeondiscussion}
                            onChange={this.togglePoints('eachlikeondiscussion')}
                            value="eachlikeondiscussion"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "50%" }}>Each likes on disscussion</div>
                        <div style={{ flexBasis: 200 }} >
                          <TextField
                            id="likesOnDisscussionValue"
                            // value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            type="number"
                            style={{ margin: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: 100 }}>points</div>
                      </div>
                    </div>
                    <div className="p-3 pointsContainer">
                      <div className="col-md-12 d-flex align-items-center">
                        <div>Badges</div>
                        <div>
                          <Switch
                            checked={this.state.enablebadges}
                            onChange={this.toggleBadges('enablebadges')}
                            value="enablebadges"
                            color="primary"
                          />
                        </div>
                      </div>

                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={activitybadge}
                            onChange={this.toggleBadges('activitybadge')}
                            value="activitybadge"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "100%" }}>Activity badges(1,3,9,27,81,243,729,2187 logins)</div>
                      </div>
                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={learningbadge}
                            onChange={this.toggleBadges('learningbadge')}
                            value="learningbadge"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "100%" }}>Learning badges(1,2,4,8,16,32,64,128 course compeletion)</div>
                      </div>
                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={testbadge}
                            onChange={this.toggleBadges('testbadge')}
                            value="testbadge"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "100%" }}>Test badges(1,3,9,27,81,243,729,2187 passed tests)</div>
                      </div>

                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={assignmentbadge}
                            onChange={this.toggleBadges('assignmentbadge')}
                            value="assignmentbadge"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "100%" }}>Assigment badges(1,3,9,27,81,243,729,2187 assignment compeletion)</div>
                      </div>

                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={certificationbadge}
                            onChange={this.toggleBadges('certificationbadge')}
                            value="certificationbadge"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "100%" }}>Certification badges(1,2,4,8,16,32,64,128 certifications)</div>
                      </div>

                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={socialactivitybadge}
                            onChange={this.toggleBadges('socialactivitybadge')}
                            value="socialactivitybadge"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "100%" }}>Social activity badges(1,2,4,8,16,32,64,128 topics or comments) </div>
                      </div>

                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={surveybadge}
                            onChange={this.toggleBadges('surveybadge')}
                            value="surveybadge"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "100%" }}>Survey badges(1,2,4,8,16,32,64,128 compeleted surveys)</div>
                      </div>
                    </div>
                    <div className="p-3 pointsContainer">
                      <div className="col-md-12 d-flex align-items-center">
                        <div>Levels</div>
                        <div>
                          <Switch
                            checked={this.state.enablelevels}
                            onChange={this.toggleLevels('enablelevels')}
                            value="enablelevels"
                            color="primary"
                          />
                        </div>
                      </div>

                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={upgradepoints}
                            onChange={this.toggleLevels('upgradepoints')}
                            value="upgradepoints"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "40%" }}>Upgrade to next level after every</div>
                        <div style={{ flexBasis: 200 }}>
                          <TextField
                            id="upgradelevel"
                            // value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            type="number"
                            style={{ margin: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: 200 }}>Points Earned</div>
                      </div>
                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={upgradecourse}
                            onChange={this.toggleLevels('upgradecourse')}
                            value="upgradecourse"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "40%" }}>Upgrade to next level after every</div>
                        <div style={{ flexBasis: 200 }}>
                          <TextField
                            id="upgradelevel1"
                            // value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            type="number"
                            style={{ margin: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: 200 }}>Course Completion</div>
                      </div>
                      <div className="col-md-8 points d-flex align-items-center mb-3">
                        <div style={{ flexBasis: 50 }}>
                          <Checkbox
                            checked={upgradebadges}
                            onChange={this.toggleLevels('upgradebadges')}
                            value="upgradebadges"
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: "40%" }}>Upgrade to next level after every</div>
                        <div style={{ flexBasis: 200 }}>
                          <TextField
                            id="upgradelevel2"
                            // value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            type="number"
                            style={{ margin: 0 }}
                          />
                        </div>
                        <div style={{ flexBasis: 200 }}>Badges Rewarded</div>
                      </div>

                      <div className="c-formSection pt-4 pb-4">
                        <Button
                          variant="contained"
                          className={[classes.button, classes.buttonPrimary]}
                          type="submit"
                        >
                          Set Gamification
                      </Button>
                        <Link to="/coursecategory"><Button variant="contained" className={[classes.button, classes.buttonSecondary]}>
                          Cancel
                      </Button>
                        </Link>
                      </div>

                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // categoryName: Yup.string().required('Please enter first name').matches(/^[A-Za-z\s '-]+$/, { message : "Only characters and spaces are allowed" , excludeEmptyString: false }),
    // categoryID: Yup.string().required('Please select Parent')
  }),
  mapPropsToValues: () => ({
    enablesettings: "",
    enablepoints: "",
    enablebadges: "",
    enablelevels: "",
    eachlogin: "",
    eachunit: "",
    coursecompletion: "",
    certification: "",
    testpassed: "",
    assignmentcompletion: "",
    eachdisscussioncomment: "",
    eachlikeondiscussion: "",
    activitybadge: "",
    learningbadge: "",
    testbadge: "",
    assignmentbadge: "",
    certificationbadge: "",
    socialactivitybadge: "",
    surveybadge: "",
    upgradepoints: "",
    upgradecourse: "",
    upgradebadges: "",
    eachLoginValue: "",
    eachUnitValue: "",
    courseCompeletionValue: "",
    certificationValue: "",
    testCompeletionValue: "",
    asssignmentCompeletionValue: "",
    topicsOrCommentsValue: "",
    likesOnDisscussionValue: "",
    activityBadges: "",
    learningBadges: "",
    testBadges: "",
    assigmentBadges: "",
    certificationBadges: "",
    socialActivityBadges: "",
    surveyBadges: "",
    upgradelevel: "",
    upgradelevel1: "",
    upgradelevel2: "",
  }),
  handleSubmit: (payload, { props }) => {
    console.log(payload);
    props.actionSetGamification(payload);
    //actions.resetForm();  ||
  },

  displayName: 'Gamifications',
})(Gamifications);

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ actionSetGamification }, dispatch)
}
const GamificationsForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

// export default compose(
//     withRouter,
//     connect(mapStateToProps, mapDispatchToProps),
//     withStyles(combinedStyles)
// )(Gamifications)
export default withRouter(withStyles(combinedStyles)(connect(mapStateToProps, { actionSetGamification })(GamificationsForm)
))