import React, { Component} from 'react';

import classes from './Slider.module.scss';
import Knob from './Knob/Knob';

class Slider extends Component {
    constructor(props) {
        super(props);

        this.sliderRef = React.createRef(null);
        this.knobRef = React.createRef(null);
        this.positionX = props.initialValue;

        this.state = {
            dragStarted: false,
            isMouseButtonDown: false,
            posX: props.initialValue
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.onMouseDownHandler);
        document.addEventListener('mouseup', this.onMouseUpHandler);
        document.addEventListener('mousemove', this.onMouseMoveHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onMouseDownHandler);
        document.removeEventListener('mouseup', this.onMouseUpHandler);
        document.removeEventListener('mousemove', this.onMouseMoveHandler);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.initialValue !== this.props.initialValue) {
            this.positionX = this.props.initialValue;
            this.setState(prevState => {
                return {
                    ...prevState,
                    posX: this.props.initialValue
                }
            })
        }
    }

    onMouseDownHandler = (event) => {
        if(event.target === this.sliderRef.current || event.target === this.knobRef.current) {
            this.positionX = this.findPosition(event);
            this.setState({
                dragStarted: true,
                isMouseButtonDown: true,
                posX: this.positionX
            });
        }
        else {
            return;
        }
    }

    onMouseUpHandler = (event) => {
        if(!this.state.dragStarted) {
            return;
        }
        
        this.positionX = this.findPosition(event);
        this.props.sliderValue(this.positionX);
        this.setState(oldState => {
            return {
                dragStarted: !oldState.dragStarted,
                isMouseButtonDown: !oldState.isMouseButtonDown,
                posX: this.positionX
        }});
    }

    onMouseMoveHandler = (event) => {
        if(!this.state.isMouseButtonDown) {
            return;
        }

        this.positionX = this.findPosition(event);
        this.props.sliderValue(this.positionX);
        this.setState({
            posX: this.positionX
        });
    }

    findPosition = (event) => {
        let rect = this.sliderRef.current.getBoundingClientRect();
        let rectWidth = Math.floor(rect.width);
        let leftPosPercentage = ((event.pageX - rect.left) / rectWidth) * 100;
        if(leftPosPercentage > 100) {
            leftPosPercentage = 100;
        }
        else if(leftPosPercentage < 0) {
            leftPosPercentage = 0;
        }

        return Math.floor(leftPosPercentage);
    }

    render() {
        let backFullStyle = {
            left: `${0}%`,
            width: `${this.state.posX}%`
        }

        return (
            <div className={classes.Slider}>
                <Knob left={this.positionX} knobRef={this.knobRef} clicked={this.onMouseDownHandler} />
                <div className={classes.Slider__Background} ref={this.sliderRef}></div>
                <div className={classes.Slider__BackgroundFull} style={backFullStyle}></div>
            </div>
        )
    }
}

export default Slider;



/*

import React, { useEffect, useRef, useState } from 'react';

import classes from './Slider.module.scss';
import Knob from './Knob/Knob';

const Slider = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [mouseButtonHoldDown, setMouseButtonHoldDown] = useState(false);
    const [posX, setPosX] = useState(0);

    const sliderRef = useRef(null);
    const knobRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', onMouseDownHandler);
        document.addEventListener('mouseup', onMouseUpHandler);
        document.addEventListener('mousemove', onMouseMoveHandler);

        return () => {
            document.removeEventListener('mousedown', onMouseDownHandler);
            document.removeEventListener('mouseup', onMouseUpHandler);
            document.removeEventListener('mousemove', onMouseMoveHandler);
        };
    }, []);

    const onMouseDownHandler = (event) => {
        if(event.target !== sliderRef.current) {
            return;
        }
        setIsDragging(isDragging => true);
        setMouseButtonHoldDown(mouseButtonHoldDown => true);

        let mouseClickPos = findPosition(event);

        setPosX(posX => Math.floor(mouseClickPos));
    }

    const onMouseUpHandler = (event) => {
        // if(event.target !== sliderRef.current) {
        //     return;
        // }

        setMouseButtonHoldDown(false);

        let mouseClickPos = findPosition(event);

        setPosX(posX => Math.floor(mouseClickPos));
    }

    const onMouseMoveHandler = (event) => {
        if(mouseButtonHoldDown) {
            console.log("Hey listen")
        }
    }

    const findPosition = (event) => {
        let rect = sliderRef.current.getBoundingClientRect();
        let rectWidth = Math.floor(rect.width);
        let leftPosPercentage = ((event.pageX - rect.left) / rectWidth) * 100;

        return leftPosPercentage;
    }

    let backFullStyle = {
        left: `${0}%`,
        width: `${posX}%`
    }

    return (
        <div className={classes.Slider}>
            <Knob left={posX} knobRef={knobRef} />
            <div className={classes.Slider__Background} ref={sliderRef}></div>
            <div className={classes.Slider__BackgroundFull} style={backFullStyle}></div>
        </div>
    )
}

export default Slider;

*/