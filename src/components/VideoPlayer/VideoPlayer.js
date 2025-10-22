import React, { use, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faCirclePause,
    faCirclePlay,
    faVolumeHigh,
    faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function VideoPlayer() {
    const videoRef = useRef();

    const [muted, setMuted] = useState(true);
    const [pause, setPause] = useState(false);
    const [showIcon, setShowIcon] = useState(false);

    const handleToggleSound = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setMuted(!muted);
        }
    };

    const handlePause = () => {
        if (pause) {
            videoRef.current.play();
            setPause(false);
        } else {
            videoRef.current.pause();
            setPause(true);
        }
        setShowIcon(true);
        if (window._hideIconTimeout) clearTimeout(window._hideIconTimeout);
        window._hideIconTimeout = setTimeout(() => {
            setShowIcon(false);
            window._hideIconTimeout = null;
        }, 1000);
    };

    return (
        <section className={cx('wrapper')}>
            <video
                className={cx('video')}
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                onClick={handlePause}
                src="https://files.fullstack.edu.vn/f8-tiktok/videos/3712-666b02d872740.mp4"
            />
            <div className={cx('audio-control')}>
                <span
                    className={cx('audio-control__icon')}
                    onClick={handleToggleSound}
                >
                    {!muted ? (
                        <FontAwesomeIcon icon={faVolumeHigh} />
                    ) : (
                        <FontAwesomeIcon icon={faVolumeXmark} />
                    )}
                </span>
            </div>
            <div className={cx('caption')}>
                <a href="/">
                    <p className={cx('nickname')}>quangkhonggo</p>
                    <FontAwesomeIcon
                        className={cx('check')}
                        icon={faCheckCircle}
                    />
                </a>
                <div className={cx('video-desc')}>
                    <span className={cx('desc')}>
                        Bánh mì 550k trên Landmark 81
                    </span>
                    <a className={cx('tag')} href="/">
                        #quangkhonggo
                    </a>
                </div>
            </div>
            <div className={cx('video-progress')}></div>

            {showIcon && (
                <FontAwesomeIcon
                    className={cx('icon-pause', 'show')}
                    icon={pause ? faCirclePause : faCirclePlay}
                />
            )}
        </section>
    );
}

export default VideoPlayer;
