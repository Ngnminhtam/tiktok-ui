import React, { useEffect, useRef, useState } from 'react';
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

function VideoPlayer({ data }) {
    const videoRef = useRef();
    const progressRef = useRef(null);

    const [muted, setMuted] = useState(true);
    const [pause, setPause] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            const percent = (video.currentTime / video.duration) * 100;
            setProgress(percent);
        };

        video.addEventListener('timeupdate', updateProgress);

        return () => {
            video.removeEventListener('timeupdate', updateProgress);
        };
    }, []);

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

    const handleSeek = (e) => {
        const rect = progressRef.current.getBoundingClientRect(); // lấy vị trí & kích thước thanh progress
        const x = e.clientX || (e.touches && e.touches[0].clientX); // lấy tọa độ nơi người dùng bấm/chạm
        const percent = (x - rect.left) / rect.width; // tính phần trăm vị trí bấm
        videoRef.current.currentTime = percent * videoRef.current.duration; // tua video tới vị trí tương ứng
    };

    const handleMouseDown = (e) => {
        handleSeek(e);

        const handleMove = (event) => handleSeek(event);
        const handleUp = () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleUp);
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', handleUp);
    };

    return (
        <section className={cx('wrapper')}>
            <video
                ref={videoRef}
                className={cx('video')}
                autoPlay
                loop
                muted
                playsInline
                onClick={handlePause}
                src={data.file_url}
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
                    <p className={cx('nickname')}>{data.user.nickname}</p>
                    {data.user.tick && (
                        <FontAwesomeIcon
                            className={cx('check')}
                            icon={faCheckCircle}
                        />
                    )}
                </a>
                <div className={cx('video-desc')}>
                    <span className={cx('desc')}>{data.description}</span>
                    <a className={cx('tag')} href="/">
                        {data.user.nickname}
                    </a>
                </div>
            </div>
            <div
                ref={progressRef}
                className={cx('video-progress')}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                <div
                    className={cx('video-progress__bar')}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

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
