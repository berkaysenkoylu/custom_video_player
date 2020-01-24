import React, { useEffect, useRef } from 'react';

import classes from './Transcript.module.scss';
import Line from './Line/Line';

const Transcript = React.memo((props) => {
    let lineRef = useRef(null);

    useEffect(() => {
        props.currentLinePos(lineRef.current.offsetTop);
    }, [props]);

    const onLineClickedHandler = (index) => {
        let keyArr = Object.keys(props.transcript);

        props.goToSeconds(keyArr[index], index);
    }
    
    let content = null;
    content = Object.values(props.transcript).map((line, index) => {
        return <Line
            key={index}
            lineContent={line}
            isCurrent={index === props.currentIndex}
            clicked={() => onLineClickedHandler(index)}
            ref={index === props.currentIndex ? lineRef : null}
        />
    });


    let style = {
        transform: `translateY(${props.heightOffset / 2 - 50 || 175}px)`
    }

    return (
        <ul className={classes.Transcript} style={style}>
            {content}
        </ul>
    );
});

export default Transcript;