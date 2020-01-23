import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactPlayer  from 'react-player';

import classes from './VideoPlayer.module.scss';
import Controls from './Controls/Controls';
import Transcript from './Transcript/Transcript';

// let json = require("../../assets/transcripts/transcript1.json");

const VideoPlayer = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [controlsVisible, setControlsVisible] = useState(false);
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [videoDuration, setVideoDuration] = useState(null);
    const [playedSec, setPlayedSec] = useState(0);
    const [fullScreen, setFullScreen] = useState(false);

    const [playerStyle, setPlayerStyle] = useState({
        playerWidth: "600px",
        playerHeight: "450px",
        transcriptWidth: "250px",
        currTranscriptWidth: "250px",
        currPlayerWidth: "600px",
        currPlayerHeight: "450px",
    });

    let playerRef = useRef(null);
    let scrollRect = useRef(null);
    let timeoutId;

    const updateSize = useCallback(
        () => {
            if(fullScreen) {
                const copiedPlayerStyle = {...playerStyle};
                let newVals = getWidths();
                copiedPlayerStyle.currTranscriptWidth = newVals.transcript;
                copiedPlayerStyle.currPlayerWidth = newVals.player;
                copiedPlayerStyle.currPlayerHeight = window.innerHeight;

                setPlayerStyle(copiedPlayerStyle)
            }
        },
        [fullScreen, playerStyle],
    )

    useEffect(() => {
        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        }
    }, [updateSize])

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId);
        };
    }, [timeoutId])

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
        // console.log(isMouseIn)     
        if(!isMouseIn) {
            timeoutId = setTimeout(() => {
                setControlsVisible(controlsVisible => isMouseIn);
            }, 3000);
        }
        else {
            setControlsVisible(controlsVisible => isMouseIn);
        }
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

    const onGoToSecondsHandler = (seconds) => {
        if(!isPlaying) {
            setIsPlaying(true);
        }

        playerRef.current.seekTo(seconds, 'seconds');
    }

    const onScreenSizeHandler = () => {
        let newScreenValues = {
            ...playerStyle
        }

        if(!fullScreen) {
            let newVals = getWidths();
            newScreenValues.currTranscriptWidth = newVals.transcript;
            newScreenValues.currPlayerWidth = newVals.player;
            newScreenValues.currPlayerHeight = window.innerHeight;
        }
        else {
            newScreenValues.currTranscriptWidth = newScreenValues.transcriptWidth;
            newScreenValues.currPlayerWidth = newScreenValues.playerWidth;
            newScreenValues.currPlayerHeight = newScreenValues.playerHeight;
        }
        setPlayerStyle(newScreenValues);

        setFullScreen(fullScreen => !fullScreen);
    }

    const onScrollToHandler = (index, length) => {
        // TODO: MINOR ADJUSTMENTS ?
        scrollRect.current.scrollTo({ top: scrollRect.current.scrollTopMax / length * index, behavior: 'smooth' });
    }

    const getWidths = () => {
        // 75% video, 25% transcript
        let widths = {
            player: +Math.floor(window.innerWidth * 75 / 100),
            transcript: +Math.floor(window.innerWidth * 25 / 100)
        }
        return widths;
    }

    return (
        // <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing width={800} height={600} />

        <div className={classes.VideoPlayer} style={{height: playerStyle.currPlayerHeight}}>
            <div className={classes.VideoPlayer__Screen} onMouseEnter={() => toggleControlVisibility(true)} onMouseLeave={() => toggleControlVisibility(false)}>
                <div className={classes.VideoScreen} style={{ width: playerStyle.currPlayerWidth, height: playerStyle.currPlayerHeight }}>
                    <ReactPlayer
                        ref={playerRef}
                        url='https://www.youtube.com/watch?v=MYMS1V8GwBk'
                        youtubeConfig={{ playerVars: { fs: 0 } }}
                        volume={volume}
                        onStart={onPlayerStartHandler}
                        onPause={onPlayerPausedHandler}
                        onPlay={onPlayerResumeHandler}
                        onDuration={onGetDuration}
                        onProgress={onGetProgress}
                        playbackRate={playbackRate}
                        playing={isPlaying}
                        width='100%'
                        height='100%'
                    />
                </div>
                {/* isPlaying && controlsVisible */}
                <Controls 
                    visible={controlsVisible}
                    onPlayed={onPlayedHandler}
                    playing={isPlaying}
                    volumeChange={onVolumeChangeHandler}
                    playbackChange={onSetPlaybackHandler}
                    played={playedSec}
                    duration={videoDuration}
                    seeking={onSeekingHandler}
                    seekTo={onSeekToHandler}
                    isFullScreen={fullScreen}
                    onScreenSize={onScreenSizeHandler}
                />
            </div>
            <div className={classes.VideoPlayer__TranscriptWrapper} style={{width: playerStyle.currTranscriptWidth }} ref={scrollRect}>
                <Transcript currentSecond={playedSec} goToSeconds={onGoToSecondsHandler} scrollTo={onScrollToHandler} />
            </div>
        </div>
    )
}

export default VideoPlayer;