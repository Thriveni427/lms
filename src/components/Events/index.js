import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Events extends Component {
  render(){
    return(
      <div>
        Events
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default withRouter(connect(mapStateToProps)(Events))