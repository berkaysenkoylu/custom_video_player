import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactPlayer  from 'react-player';

import classes from './VideoPlayer.module.scss';
import Controls from './Controls/Controls';
import Transcript from './Transcript/Transcript';

// let json = require("../../assets/transcripts/transcript1.json");

const VideoPlayer = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    // const [controlsVisible, setControlsVisible] = useState(false);
    const [scrollHeight, setScrollHeight] = useState(null);
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [videoDuration, setVideoDuration] = useState(null);
    const [playedSec, setPlayedSec] = useState(0);
    const [fullScreen, setFullScreen] = useState(false);
    const [playerStyle, setPlayerStyle] = useState({
        playerWidth: 600,
        playerHeight: 450,
        transcriptWidth: 250,
        currTranscriptWidth: 250,
        currPlayerWidth: 600,
        currPlayerHeight: 450,
    });
    const [transcriptIndex, setTranscriptIndex] = useState(0);

    const transcriptJson = require('../../assets/transcripts/transcript1.json');

    let playerRef = useRef(null);
    let scrollRect = useRef(null);
    // let timeoutId;

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
        setScrollHeight(scrollRect.current.clientHeight);

        return () => {
            window.removeEventListener('resize', updateSize);
        }
    }, [updateSize])

    // useEffect(() => {
    //     return () => {
    //         clearTimeout(timeoutId);
    //     };
    // }, [timeoutId]);

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
        // Also get the new transcript index
        let currIndex = getCurrentTranscriptIndex(obj.playedSeconds);
        setTranscriptIndex(currIndex);

        setPlayedSec(playedSec => obj.playedSeconds);
    }

    // const toggleControlVisibility = (isMouseIn) => {   
    //     // console.log(isMouseIn)     
    //     if(!isMouseIn) {
    //         timeoutId = setTimeout(() => {
    //             setControlsVisible(controlsVisible => isMouseIn);
    //         }, 3000);
    //     }
    //     else {
    //         setControlsVisible(controlsVisible => isMouseIn);
    //     }
    // }

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

    const onGoToSecondsHandler = (seconds, index) => {
        if(!isPlaying) {
            setIsPlaying(true);
        }
        setTranscriptIndex(index);

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

    // const scrollingTo = (index, length) => {
    //     scrollRect.current.scrollTo({ top: scrollRect.current.scrollTopMax / length * index + 5, behavior: 'smooth' });
    // }

    const scrollToPositionHandler = (pos) => {
        // TODO: check if isPlaying?

        scrollRect.current.scrollTo({ top: pos, behavior: 'smooth' });
    }

    const getCurrentTranscriptIndex = (seconds) => {
        let index = 0;
        let keyArr = Object.keys(transcriptJson);
        for(let i = 1; i < keyArr.length; i++) {
            if(seconds >= +keyArr[i-1] && seconds < +keyArr[i]) {
                index = i-1;
            }
            else if(seconds >= +keyArr[i]) {
                index = i;
            }
        }

        return index;
    }

    const getWidths = () => {
        // 75% video, 25% transcript
        let widths = {
            player: +Math.floor(window.innerWidth * 75 / 100),
            transcript: +Math.floor(window.innerWidth * 25 / 100)
        }
        return widths;
    }

    // onMouseEnter={() => toggleControlVisibility(true)} onMouseLeave={() => toggleControlVisibility(false)}
    return (
        <div className={classes.VideoPlayer} style={{height: `${playerStyle.currPlayerHeight}px`}}>
            <div className={classes.VideoPlayer__Screen} > 
                <div className={classes.VideoScreen} style={{ width: `${playerStyle.currPlayerWidth}px`, height: `${playerStyle.currPlayerHeight}px` }}>
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
                        height={`${playerStyle.currPlayerHeight - 50}px`}
                    />
                </div>
                <Controls 
                    // visible={controlsVisible}
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
            <div className={classes.VideoPlayer__TranscriptWrapper} style={{width: `${playerStyle.currTranscriptWidth}px` }} ref={scrollRect}>
                <Transcript
                    heightOffset={scrollHeight}
                    transcript={transcriptJson}
                    currentIndex={transcriptIndex}
                    goToSeconds={onGoToSecondsHandler}
                    currentLinePos={scrollToPositionHandler}
                />
            </div>
        </div>
    )
}

export default VideoPlayer;