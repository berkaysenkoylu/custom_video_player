import React, { useState, useRef } from 'react';
import ReactPlayer  from 'react-player';

import classes from './VideoPlayer.module.scss';
import Controls from './Controls/Controls';

const VideoPlayer = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [controlsVisible, setControlsVisible] = useState(false);
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [videoDuration, setVideoDuration] = useState(null);
    const [playedSec, setPlayedSec] = useState(0);

    let playerStyle={
        width: "640px",
        height: "360px"
    };

    let playerRef = useRef(null);

    const onPlayedHandler = (event) => {
        event.preventDefault();

        setIsPlaying(isPlaying => !isPlaying);
    }

    const onPlayerStartHandler = () => {
        setIsPlaying(isPlaying => true);
    }

    const onPlayerPausedHandler = () => {
        setIsPlaying(isPlaying => false);
    }

    const onPlayerResumeHandler = () => {
        setIsPlaying(isPlaying => true);
    }

    const onSetPlaybackHandler = (rate) => {
        setPlaybackRate(playbackRate => rate);
    }

    const onVolumeChangeHandler = (value) => {
        setVolume(value / 100);
    }

    const onGetDuration = (sec) => {
        setVideoDuration(videoDuration => sec);
    }

    const onGetProgress = (obj) => {
        setPlayedSec(playedSec => obj.playedSeconds);
    }

    const toggleControlVisibility = (isMouseIn) => {
        setControlsVisible(controlsVisible => isMouseIn);
    }

    const onSeekingHandler = (isSeeking) => {
        if(isSeeking) {
            setIsPlaying(isPlaying => false);
        }

        if(!isSeeking) {
            setIsPlaying(isPlaying => true);
        }
    }

    const onSeekToHandler = (val) => {
        playerRef.current.seekTo(val / 100, 'fraction');
    }
    

    return (
        // <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing width={800} height={600} />

        <div className={classes.VideoPlayer} style={{height: "360px"}}>
            <div className={classes.VideoPlayer__Screen} onMouseEnter={() => toggleControlVisibility(true)} onMouseLeave={() => toggleControlVisibility(false)}>
                <div className={classes.VideoScreen} style={playerStyle}>
                    <ReactPlayer
                        ref={playerRef}
                        url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                        volume={volume}
                        onStart={onPlayerStartHandler}
                        onPause={onPlayerPausedHandler}
                        onPlay={onPlayerResumeHandler}
                        onDuration={onGetDuration}
                        onProgress={onGetProgress}
                        playbackRate={playbackRate}
                        playing={isPlaying}
                    />
                </div>
                {/* isPlaying && controlsVisible */}
                <Controls 
                    visible={true}
                    onPlayed={onPlayedHandler}
                    playing={isPlaying}
                    volumeChange={onVolumeChangeHandler}
                    playbackChange={onSetPlaybackHandler}
                    played={playedSec}
                    duration={videoDuration}
                    seeking={onSeekingHandler}
                    seekTo={onSeekToHandler}
                />
            </div>
            <div className={classes.VideoPlayer__Transcript}>
                VIDEO TRANSCRIPT
            </div>
        </div>
    )
}

export default VideoPlayer;