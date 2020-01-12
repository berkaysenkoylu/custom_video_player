import React from 'react';

import classes from './Speed.module.scss';

const Speed = (props) => {
    return (
        <div className={classes.Speed}>
            <span className={classes.SelectedSpeed}> Speed 1.0x</span>
        </div>
    )
}

export default Speed;