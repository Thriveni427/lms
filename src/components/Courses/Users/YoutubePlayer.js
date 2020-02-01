import React from 'react'
import YouTubePlayer from 'react-player/lib/players/YouTube'

const YoutubePlayer = (props) => {
    return (
      <div>
        <YouTubePlayer
            url={props.video}
            playing
            controls
        />
        {/* <iframe
            width="100%"
            height="368"
            src={props.video}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe> */}
      </div>
    )
}
export default YoutubePlayer;
