import React, { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

const VideoElement = forwardRef(
    ({ src, muted, paused, onClick, onError }, ref) => (
        <video
            ref={ref}
            className={cx('video')}
            loop
            autoPlay={!paused}
            muted={muted}
            playsInline
            onClick={onClick}
            onError={onError}
            src={src}
        />
    ),
);

export default VideoElement;
