import React from 'react';

import classes from './Line.module.scss';

const Line = (props) => {
    let classList = [classes.Line];

    if(props.isCurrent) {
        classList = [classes.Line, classes.Line__Current];
    }

    return (
        <li className={classList.join(' ')} onClick={props.clicked}>
            {props.lineContent}
        </li>
    )
}

export default Line;