import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

function AudioControl({ muted, onToggle }) {
    return (
        <div className={cx('audio-control')}>
            <span className={cx('audio-control__icon')} onClick={onToggle}>
                <FontAwesomeIcon icon={muted ? faVolumeXmark : faVolumeHigh} />
            </span>
        </div>
    );
}

export default AudioControl;
