import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import MediaUpload from './MediaUpload'
import combinedStyles from '../../material-ui'

export class ContentLibrary extends Component {
  state = {
    completed: 0,
  };
  static propTypes = {
    prop: PropTypes,
  }
  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed === 100) {
      this.setState({ completed: 0 });
    } else {
      const diff = Math.random() * 10;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  };

  render() {
    return (
      <React.Fragment>
      <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Users</h6>
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
                  <h3 className="margin-0 padding-0">Content Library</h3>
                </div>
                <div className="content">
                  <MediaUpload completed={this.state.completed} />
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
  return state;
}

const mapDispatchToProps = {

}
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(combinedStyles)
)(ContentLibrary)
