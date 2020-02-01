import React, { Component } from 'react'

export class ComingSoon extends Component {

  render() {

    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-7">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Coming Soon</h6>
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
                <h1 className="margin-0 padding-0">Coming Soon. . .</h1>
              </div>
            </div>
          </div>
        </div>
        </div>
      </React.Fragment>
    )
  }
}

export default ComingSoon;
