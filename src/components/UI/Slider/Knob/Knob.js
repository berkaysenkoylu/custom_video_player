import React from 'react';

import classes from './Knob.module.scss';

const Knob = (props) => {
    let left = props.left;

    let style = {
        left: `calc(${left}% - 1.25rem)`
    };

    return (
        <div className={classes.Knob} style={style} onMouseDown={props.clicked} ref={props.knobRef} id={props.id}></div>
    )
}

export default Knob;