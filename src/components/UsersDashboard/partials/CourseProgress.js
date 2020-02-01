import React from "react";
export default class CourseProgress extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: 60
    };
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <ProgressBar percentage={this.props.percentage} />
      </div>
    );
  }
}

const ProgressBar = props => {
  return (
    <div className="progress-bar">
      <Filler percentage={props.percentage} />
    </div>
  );
};

const Filler = props => {
  return (
    <div
      className="filler d-flex align-items-center justify-content-center"
      style={{ color: "white", width: `${props.percentage}%` }}
    >
      <span className="pl-2">
        {props.percentage === 0 ? (
          <p className="mt-3 ml-5">0 %</p>
        ) : props.percentage !== 0 ? (
          props.percentage + "%"
        ) : (
          ""
        )}
      </span>
    </div>
  );
};
