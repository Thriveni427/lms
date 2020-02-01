import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import Duration from './Duration'

export default class MP4Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    onEnded = () => {
        console.log(" Video ended here");
        this.props.onEnded();
    }

    render() {
        let { duration, playing, controls } = this.props.options;
        let { video } = this.props;
        console.log(this.props);

        return (
            <div className='player-wrapper'>
                <ReactPlayer
                    playing={playing}
                    controls={controls}
                    url={video}
                    width='100%'
                    height='360px'
                    className='react-player'
                    onEnded={this.onEnded}
                />

                <Duration seconds={duration} />
            </div>
        )
    }
}