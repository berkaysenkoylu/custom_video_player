import React, { useState, useEffect, useRef, useCallback } from 'react';

import classes from './Progress.module.scss';

const Progress = (props) => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [posX, setPosX] = useState(0);

    let backgroundRef = useRef(null);

    useEffect(() => {
        if(props.progressValue) {
            setPosX(posX => props.progressValue);
        }
    }, [props.progressValue]);

    const findPosition = (event) => {
        let rect = backgroundRef.current.getBoundingClientRect();
        let rectWidth = rect.width;
        let leftPosPercentage = ((event.pageX - rect.left) / rectWidth) * 100;

        if(leftPosPercentage > 100) {
            leftPosPercentage = 100;
        }

        if(leftPosPercentage < 0) {
            leftPosPercentage = 0;
        }

        return Math.floor(leftPosPercentage);
    }

    const onMouseDownHandlerCB = useCallback((event) => {
        if(event.target !== backgroundRef.current) {
            return;
        }

        setIsMouseDown(isMouseDown => true);
        props.seeking(true);

        let position = findPosition(event);

        setPosX(position);
    }, [props]);

    const onMouseMoveHandlerCB = useCallback((event) => {
        if(isMouseDown) {
            let position = findPosition(event);

            setPosX(position);
        }
    }, [isMouseDown]);

    const onMouseUpHandlerCB = useCallback((event) => {
        if(!isMouseDown) {
            return;
        }

        setIsMouseDown(isMouseDown => false);
        props.seeking(false);

        let position = findPosition(event);
        props.seekTo(position);

        setPosX(position);
    }, [isMouseDown, props]);

    useEffect(() => {
        document.addEventListener('mousedown', onMouseDownHandlerCB);
        document.addEventListener('mouseup', onMouseUpHandlerCB);
        document.addEventListener('mousemove', onMouseMoveHandlerCB);

        return () => {
            document.removeEventListener('mousedown', onMouseDownHandlerCB);
            document.removeEventListener('mouseup', onMouseUpHandlerCB);
            document.removeEventListener('mousemove', onMouseMoveHandlerCB);
        };
    }, [onMouseDownHandlerCB, onMouseMoveHandlerCB, onMouseUpHandlerCB]);

    let foregroundStyle = {
        left: `${0}%`,
        width: `${posX}%`
    }
    return (
        <div className={classes.Progress}>
            <div className={classes.Progress__Background} ref={backgroundRef}></div>
            <div className={classes.Progress__Foreground} style={foregroundStyle}></div>
        </div>
    )
}

export default Progress;