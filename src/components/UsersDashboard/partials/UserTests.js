import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'


import { actionGetAssignedPapers } from '../../../actions/Courses/User/actionGetAssignedPapers';


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

export class UserTests extends Component {
  constructor() {
    super();
    this.state = {
      percent: 0,
      color: '#3FC7FA'
    };
  }

  componentDidMount = () => {
    let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
    if (userinfo === null) userinfo = [];
    if(userinfo.UserID !== undefined){
        this.props.actionGetAssignedPapers(userinfo.UserID);
    }
  }

  render() {
    const { getQuestionPaperReducer } = this.props;
    console.log(this.props)
    return (
      <div className="w-100">
          <div className="col-md-12">
            {
             getQuestionPaperReducer.QuestionPaperDataUser !== undefined || getQuestionPaperReducer.QuestionPaperDataUser !== null ?             
                getQuestionPaperReducer.QuestionPaperDataUser.map((arr) => {
                    return(
                    <div className="d-md-flex justify-content-center align-items-center mb-5">
                        {/* <div className="mr-4" style={{flexBasis: 200}}>
                            <img className="card" src={arr.iuploadname == null ? "": arr.iuploadname.slice(0, -1)} width="200" />
                            <img alt="imag" className="card mb-0" src={require('../../images/514204-amazon-web-services-logo.jpg')} width="200" />
                        </div> */}
                        <div className="mr-4" style={{flexBasis: '60%'}}>
                            <h2>{arr.QuestionPaperName}</h2>
                            {/* <p>Lorem ipsum dolor sit amet, quis sanctus instructior ad vix, id quis semper meisea altera option senserit ei. Oportere splendide in qui, an ius definiebas reprimique temporibus,</p> */}
                        </div>
                        <div className="mr-4" style={{flexBasis: 400}}>
                            {/* <CourseProgress percentage={arr.CompletionStatus}/> */}
                        </div>
                        <div className="mb-0" style={{flexBasis: 80}}>
                          {arr.Duration}
                            {/* <Button
                                variant="contained"
                                className={[classes.button, classes.buttonPrimary]}
                                type="submit"
                                color="primary"
                            >
                            {
                                ((arr.Status === "Active") ? "Start" : ((arr.Status === "Completed") ? "Review" : "Enroll"))
                            }
                            </Button> */}
                        </div>
                    </div>
                    )
                })
            
            :<h5>you have not joined any course yet</h5>
            }
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default withStyles(styles)(
    connect(mapStateToProps, { actionGetAssignedPapers })(UserTests)
)
