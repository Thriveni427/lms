import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  AreaChart, BarChart, Area, Bar, Tooltip, ResponsiveContainer
} from 'recharts';
import { withStyles } from '@material-ui/core/styles'
import combinedStyles from '../../material-ui'
import TopUsers from '../Dashboard/partials/TopUsers';
// import CourseRevenue from './partials/CourseRevenue';
import CourseRevenue from '../Dashboard/partials/CourseRevenue'
import { actionGetLearnerStatus } from '../../actions/Dashboard/actionGetLearnerStatus';
import { actionGetActiveCourseStatus } from '../../actions/Dashboard/actionGetActiveCourseStatus';
import { actoinGetCourseCompletedStatus } from '../../actions/Dashboard/actoinGetCourseCompletedStatus';
import { Link } from 'react-router-dom';
import TrainerStudentMonth from './partial/TrainerStudentMonth';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const data2 = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]

class TrainerDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount = () => {
    this.props.actionGetLearnerStatus();
    this.props.actionGetActiveCourseStatus();
    this.props.actoinGetCourseCompletedStatus();

  }

  // componentDidMount = () => {
  //   this.props.actionGetActiveCourseStatus();
  // }

  // componentDidMount = () => {
  //   this.props.actoinGetCourseCompletedStatus();
  // }

  render() {
    let { getLearnerReducer, getActiveCourseStatusReducer, getCourseCompletedStatusReducer } = this.props;
    console.log(getCourseCompletedStatusReducer)
    let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
        if (userinfo === null) userinfo = [];
        console.log(userinfo)
    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home >&nbsp;&nbsp;{userinfo.userType}&nbsp;&nbsp; Dashboard</h6>
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
        <div className="container-fluid mt--6">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header d-flex align-items-center border-0">
                  <h3 className="margin-0 padding-0">Trainer Dashboard</h3>
                </div>
                <div className="c-dashboard col-md-12">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="d-flex card align-items-center u-bgIndigo">
                        <div className="chartContainer">
                          <ResponsiveContainer>
                            <AreaChart
                              data={data2}
                              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                              <Tooltip />
                              <Area type='monotone' dataKey='uv' stroke="#2d41a8" fill='#2d41a8' />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="chartContent">
                          <div className="chartContent__title mb-4">Learners</div>
                          <h2 className="mb-2 u-fs__xl text-white">
                            {
                              (getLearnerReducer.LearnerStatusData[0] === null || getLearnerReducer.LearnerStatusData[0] === undefined || getLearnerReducer.LearnerStatusData[0].length < 1)
                                ? null
                                :
                                getLearnerReducer.LearnerStatusData[0].TotalLearners
                            }
                          </h2>

                          {/* <p className="mb-0"><span>03%</span> This week</p> */}
                        </div>
                      </div>

                    </div>
                    <div className="col-md-3">
                      <div className="d-flex card align-items-center u-bgPink">
                        <div className="chartContainer">
                          <ResponsiveContainer>
                            {/* <AreaChart
                              // data={data2}
                              margin={{top: 10, right: 0, left: 0, bottom: 0}}>
                              <Tooltip/>
                              <Area type='monotone' dataKey='uv' stroke="#cc1854" fill='#cc1854' />
                            </AreaChart> */}
                            <BarChart
                              width={500}
                              height={300}
                              data={data}
                              margin={{
                                top: 20, right: 0, left: 0, bottom: 0,
                              }}
                            >
                              <Tooltip />
                              <Bar dataKey="pv" stackId="a" fill="#cc1854" />
                              <Bar dataKey="uv" stackId="a" fill="#cc1854" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="chartContent">
                          <div className="chartContent__title mb-4">Active Course</div>
                          <h2 className="mb-2 u-fs__xl text-white">
                            {
                              (getActiveCourseStatusReducer.ActiveCourseStatusData[0] === null || getActiveCourseStatusReducer.ActiveCourseStatusData[0] === undefined || getActiveCourseStatusReducer.ActiveCourseStatusData[0].length < 1)
                                ? null
                                :
                                getActiveCourseStatusReducer.ActiveCourseStatusData[0].TotalActiveCourses
                            }

                          </h2>
                          {/* <p className="mb-0"><span>03%</span> This week</p> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-flex card align-items-center u-bgCyan">
                        <div className="chartContainer">
                          <ResponsiveContainer>
                            <AreaChart
                              data={data2}
                              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                              <Tooltip />
                              <Area type='monotone' dataKey='uv' stroke="#038a99" fill='#038a99' />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="chartContent">
                          <div className="chartContent__title mb-4">Course Completed</div>
                          <h2 className="mb-2 u-fs__xl text-white">

                            {
                              (getCourseCompletedStatusReducer.CourseCompletedStatusData[0] === null || getCourseCompletedStatusReducer.CourseCompletedStatusData[0] === undefined || getCourseCompletedStatusReducer.CourseCompletedStatusData[0].length < 1)
                                ? null
                                :
                                getCourseCompletedStatusReducer.CourseCompletedStatusData[0].TotalCoursesCompleted
                            }

                          </h2>
                          {/* <p className="mb-0"><span>03%</span> This week</p> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-flex card align-items-center u-bgSuccess">
                        <div className="chartContainer">
                          <ResponsiveContainer>
                            <AreaChart
                              data={data}
                              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                              <Tooltip />
                              <Area type='monotone' dataKey='uv' stroke="#277f2a" fill='#277f2a' />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="chartContent">
                          <div className="chartContent__title mb-4">ONLINE LEARNERS</div>
                          <h2 className="mb-2 u-fs__xl text-white">0</h2>
                          <p className="mb-0"><span> Avg. 327 online daily</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="c-dashboard col-md-12 mt-4">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 order-first" style={{ overflow: 'hidden' }}>
                      <h2 class="jr-entry-title d-flex flex-row">
                        Course Revenue
                  
                        <span className=" jr-font-weight-medium jr-fs-md pointer ml-auto d-none d-sm-block">
                          <Link to="/courses" className="text-primary">Go to Course list</Link> 
                          <i class="zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-block align-middle"></i></span>
                      </h2>
                      <CourseRevenue />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-12 order-first" style={{ overflow: 'hidden' }}>
                      <h2 class="jr-entry-title d-flex flex-row">
                        No of Student Registered Per Month
                        <span class=" jr-font-weight-medium jr-fs-md pointer ml-auto d-none d-sm-block">
                          <Link to="/users" className="text-primary">Go to student list</Link>
                          <i class="zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-block align-middle"></i></span>
                      </h2>
                      <TrainerStudentMonth />
                    </div>
                  </div>
                </div>


                <div className="c-dashboard col-md-12">
                  <div className="row">
                    {
                      userinfo.userType === "superadmin" ?
                        <div className="col-xl-8 col-lg-8 col-md-12 col-12 order-first">
                          <h2 class="jr-entry-title d-flex flex-row">
                            Top Vendors
                        <span class="text-primary jr-font-weight-medium jr-fs-md pointer ml-auto d-none d-sm-block">Go to vendors list <i class="zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-block align-middle"></i></span>
                          </h2>
                          <ul className="c-vendorsList">
                            <li className="c-vendorsList__item">
                              <div class="c-vendorsInfo">
                                <div class="c-vendorsInfo__thumb"><img alt=".." src="https://c1.staticflickr.com/1/152/353556247_ec67aad64a_z.jpg" width="100%" height="100" /></div>
                                <div class="c-vendorsInfo__content">
                                  <h5 class="mb-0 text-truncate">Chelsea Johns</h5>
                                  <p class="mb-0 fs-sm text-truncate"><i class="zmdi zmdi-star text-orange"></i> 5.0<span>|</span> 27 Deals</p>
                                </div>
                              </div>
                            </li>
                            <li className="c-vendorsList__item">
                              <div class="c-vendorsInfo">
                                <div class="c-vendorsInfo__thumb"><img alt=".." src="https://images.unsplash.com/photo-1494029722188-672a328c4989?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1382&q=80" width="100%" height="100" /></div>
                                <div class="c-vendorsInfo__content">
                                  <h5 class="mb-0 text-truncate">Jack & Johns</h5>
                                  <p class="mb-0 fs-sm text-truncate"><i class="zmdi zmdi-star text-orange"></i> 5.0<span>|</span> 27 Deals</p>
                                </div>
                              </div>
                            </li>
                            <li className="c-vendorsList__item">
                              <div class="c-vendorsInfo">
                                <div class="c-vendorsInfo__thumb"><img alt=".." src="https://images.unsplash.com/photo-1522097564775-a638360455cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="100%" height="100" /></div>
                                <div class="c-vendorsInfo__content">
                                  <h5 class="mb-0 text-truncate">Jack & Johns</h5>
                                  <p class="mb-0 fs-sm text-truncate"><i class="zmdi zmdi-star text-orange"></i> 5.0<span>|</span> 27 Deals</p>
                                </div>
                              </div>
                            </li>
                            <li className="c-vendorsList__item">
                              <div class="c-vendorsInfo">
                                <div class="c-vendorsInfo__thumb"><img alt=".." src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="100%" height="100" /></div>
                                <div class="c-vendorsInfo__content">
                                  <h5 class="mb-0 text-truncate">Jack & Johns</h5>
                                  <p class="mb-0 fs-sm text-truncate"><i class="zmdi zmdi-star text-orange"></i> 5.0<span>|</span> 27 Deals</p>
                                </div>
                              </div>
                            </li>
                            <li className="c-vendorsList__item">
                              <div class="c-vendorsInfo">
                                <div class="c-vendorsInfo__thumb"><img alt=".." src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="100%" height="100" /></div>
                                <div class="c-vendorsInfo__content">
                                  <h5 class="mb-0 text-truncate">Jack & Johns</h5>
                                  <p class="mb-0 fs-sm text-truncate"><i class="zmdi zmdi-star text-orange"></i> 5.0<span>|</span> 27 Deals</p>
                                </div>
                              </div>
                            </li>
                            <li className="c-vendorsList__item">
                              <div class="c-vendorsInfo">
                                <div class="c-vendorsInfo__thumb"><img alt=".." src="https://images.unsplash.com/photo-1526866428207-a2ffb7d82586?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="100%" height="100" /></div>
                                <div class="c-vendorsInfo__content">
                                  <h5 class="mb-0 text-truncate">Jack & Johns</h5>
                                  <p class="mb-0 fs-sm text-truncate"><i class="zmdi zmdi-star text-orange"></i> 5.0<span>|</span> 27 Deals</p>
                                </div>
                              </div>
                            </li>
                            <li className="c-vendorsList__item">
                              <div class="c-vendorsInfo">
                                <div class="c-vendorsInfo__thumb"><img alt=".." src="https://images.unsplash.com/photo-1518092409783-e3f39409f500?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="100%" height="100" /></div>
                                <div class="c-vendorsInfo__content">
                                  <h5 class="mb-0 text-truncate">Jack & Johns</h5>
                                  <p class="mb-0 fs-sm text-truncate"><i class="zmdi zmdi-star text-orange"></i> 5.0<span>|</span> 27 Deals</p>
                                </div>
                              </div>
                            </li>
                            <li className="c-vendorsList__item">
                              <div class="c-vendorsInfo">
                                <div class="c-vendorsInfo__thumb"><img alt=".." src="https://images.unsplash.com/photo-1541271696563-3be2f555fc4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="100%" height="100" /></div>
                                <div class="c-vendorsInfo__content">
                                  <h5 class="mb-0 text-truncate">Jack & Johns</h5>
                                  <p class="mb-0 fs-sm text-truncate"><i class="zmdi zmdi-star text-orange"></i> 5.0<span>|</span> 27 Deals</p>
                                </div>
                              </div>
                            </li>
                            <li className="c-vendorsList__item">
                              <div class="c-vendorsInfo">
                                <div class="c-vendorsInfo__thumb"><img alt=".." src="https://images.unsplash.com/photo-1496360166961-10a51d5f367a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="100%" height="100" /></div>
                                <div class="c-vendorsInfo__content">
                                  <h5 class="mb-0 text-truncate">Jack & Johns</h5>
                                  <p class="mb-0 fs-sm text-truncate"><i class="zmdi zmdi-star text-orange"></i> 5.0<span>|</span> 27 Deals</p>
                                </div>
                              </div>
                            </li>
                            <li className="c-vendorsList__item">
                              <div class="c-vendorsInfo">
                                <div class="c-vendorsInfo__thumb"><img alt=".." src="https://images.unsplash.com/photo-1531218614045-e596f12f0393?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width="100%" height="100" /></div>
                                <div class="c-vendorsInfo__content">
                                  <h5 class="mb-0 text-truncate">Jack & Johns</h5>
                                  <p class="mb-0 fs-sm text-truncate"><i class="zmdi zmdi-star text-orange"></i> 5.0<span>|</span> 27 Deals</p>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        : null

                    }
                    <div className="col-xl-4 col-lg-4 col-md-12 col-12 order-last">
                      <h2 class="jr-entry-title d-flex flex-row">
                        Recent Students
                      </h2>
                      <TopUsers />
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

// const mapDispatchToProps = {
//   //return bindActionCreators({actionCustomerAuth}, dispatch)
// }
export default withStyles(combinedStyles)(
  connect(mapStateToProps, { actionGetLearnerStatus, actionGetActiveCourseStatus, actoinGetCourseCompletedStatus })(TrainerDashboard)
)