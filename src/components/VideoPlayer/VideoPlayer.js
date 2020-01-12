import React, { useState } from 'react';
import ReactPlayer  from 'react-player';

import classes from './VideoPlayer.module.scss';
import Controls from './Controls/Controls';

const VideoPlayer = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [controlsVisible, setControlsVisible] = useState(false);

    let playerStyle={
        width: "640px",
        height: "360px"
    };

    const onPlayerStartHandler = () => {
        setIsPlaying(isPlaying => true);
    }

    const onPlayerPausedHandler = () => {
        setIsPlaying(isPlaying => false);
    }

    const onPlayerResumeHandler = () => {
        setIsPlaying(isPlaying => true);
    }

    const toggleControlVisibility = (isMouseIn) => {
        setControlsVisible(controlsVisible => isMouseIn);
    }

    return (
        // <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing width={800} height={600} />

        <div className={classes.VideoPlayer} style={{height: "360px"}}>
            <div className={classes.VideoPlayer__Screen} onMouseEnter={() =>toggleControlVisibility(true)} onMouseLeave={() =>toggleControlVisibility(false)}>
                <div className={classes.VideoScreen} style={playerStyle}>
                    <ReactPlayer 
                        url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                        onStart={onPlayerStartHandler}
                        onPause={onPlayerPausedHandler}
                        onPlay={onPlayerResumeHandler}
                    />
                </div>
                {/* isPlaying && controlsVisible */}
                <Controls 
                    visible={true}
                    playing={isPlaying}
                />
            </div>
            <div className={classes.VideoPlayer__Transcript}>
                VIDEO TRANSCRIPT
            </div>
        </div>
    )
}

export default VideoPlayer;