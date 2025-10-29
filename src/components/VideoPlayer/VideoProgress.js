import React, { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

const VideoProgress = forwardRef(({ progress, videoRef }, ref) => {
    const handleSeek = (event) => {
        const rect = ref.current.getBoundingClientRect();
        const clientX = event.clientX ?? event.touches?.[0]?.clientX;
        const percent = (clientX - rect.left) / rect.width;
        if (!videoRef.current?.duration) return;
        videoRef.current.currentTime =
            Math.max(0, Math.min(1, percent)) * videoRef.current.duration;
    };

    return (
        <div
            ref={ref}
            className={cx('video-progress')}
            onMouseDown={handleSeek}
            onTouchStart={handleSeek}
        >
            <div
                className={cx('video-progress__bar')}
                style={{ width: `${progress}%` }}
            />
        </div>
    );
});

export default VideoProgress;
