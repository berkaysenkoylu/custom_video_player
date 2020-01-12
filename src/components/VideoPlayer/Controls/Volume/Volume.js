import React, { useState } from 'react';

import svg from '../../../../assets/images/sprite.svg';
import classes from './Volume.module.scss';
import Slider from '../../../UI/Slider/Slider';

const Volume = (props) => {
    const [volumeIcon, setValumeIcon] = useState('high');
    const [lastVolume, setLastVolume] = useState(100);
    const [volumeValue, setVolumeValue] = useState(100);

    const onSliderValueChanged = (value) => {
        if (value <= 0) {
            // 0 => MUTE
            setValumeIcon('mute2');
        }
        else if (value > 0 && value <= 40) {
            // 0 - 40 => LOW
            setValumeIcon('low');
        }
        else if (value > 40 && value <= 70) {
            // 40 - 70 => MIDDLE
            setValumeIcon('medium');
        }
        else {
            // 70 - 100 => HIGH
            setValumeIcon('high');
        }
        setVolumeValue(value);
        setLastVolume(value);
    }

    const onToggleMuteHandler = () => {
        // If not muted
        if(volumeValue !== 0) {
            setLastVolume(lastVolume => volumeValue);
            setVolumeValue(0);
            setValumeIcon('mute2');

            // MUTE
        }
        else {
            onSliderValueChanged(lastVolume);

            // UNMUTE
        }
    }

    return (
        <div className={classes.Volume}>
            <svg className={classes.Volume__Icon} onClick={onToggleMuteHandler}>
                <use xlinkHref={`${svg}#icon-volume-${volumeIcon}`}></use>
            </svg>
            
            <div className={classes.Volume__Range}>
                <Slider initialValue={volumeValue} sliderValue={onSliderValueChanged} />
            </div>
        </div>
    )
}

export default Volume;