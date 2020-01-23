import React, { useState, useEffect, useCallback } from 'react';

import classes from './Transcript.module.scss';
import Line from './Line/Line';

const Transcript = React.memo((props) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const transcriptJson = require('../../../assets/transcripts/transcript1.json');

    const getCurrentLineIndex = useCallback(
        (seconds) => {
            let index = 0;
            let keyArr = Object.keys(transcriptJson);
            for(let i = 1; i < keyArr.length; i++) {
                if(seconds > keyArr[i-1] && seconds < keyArr[i]) {
                    index = i-1;
                }
            }
            return index;
        },
        [transcriptJson]
    );

    useEffect(() => {
        let currIndex = getCurrentLineIndex(props.currentSecond);
        setCurrentIndex(currIndex);
        props.scrollTo(currIndex, Object.keys(transcriptJson).length);
    }, [getCurrentLineIndex, transcriptJson, props]);

    const onLineClickedHandler = (index) => {
        let keyArr = Object.keys(transcriptJson);

        props.goToSeconds(keyArr[index]);
    }
    
    let content = null;
    content = Object.values(transcriptJson).map((line, index) => {
        return <Line key={index} lineContent={line} isCurrent={index === currentIndex} clicked={() => onLineClickedHandler(index)} />
    });

    return (
        <ul className={classes.Transcript}>
            {content}
        </ul>
    );
});

export default Transcript;