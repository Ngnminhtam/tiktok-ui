import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';
import VideoElement from './VideoElement';
import AudioControl from './AudioControl';
import VideoProgress from './VideoProgress';
import VideoCaption from './VideoCaption';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePause, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function VideoPlayer({
    data,
    isPlay = false,
    isMuted = false,
    active,
    onError,
}) {
    const videoRef = useRef(null);
    const progressRef = useRef(null);

    const [muted, setMuted] = useState(isMuted);
    const [pause, setPause] = useState(!isPlay);
    const [showIconPause, setShowIconPause] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setMuted(isMuted);
        if (videoRef.current) videoRef.current.muted = isMuted;
    }, [isMuted]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            if (!video.duration) return;
            setProgress((video.currentTime / video.duration) * 100);
        };
        video.addEventListener('timeupdate', updateProgress);
        return () => video.removeEventListener('timeupdate', updateProgress);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Nếu nhấn Space và video đang active
            if (e.code === 'Space' && active) {
                // Chặn cuộn và propagation
                e.preventDefault();
                e.stopPropagation();
                handlePause();
            }
        };

        // Đăng ký lắng nghe ở cấp document thay vì window
        document.addEventListener('keydown', handleKeyDown, { passive: false });
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [active, pause]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (active) {
            const playPromise = video.play();
            if (playPromise?.catch) playPromise.catch(() => {});
            setPause(false);
        } else {
            video.pause();
            setPause(true);
        }
    }, [active]);

    const handlePause = () => {
        const video = videoRef.current;
        if (!video) return;
        if (pause) {
            video.play().catch(() => {});
            setPause(false);
        } else {
            video.pause();
            setPause(true);
        }
        setShowIconPause(true);
        clearTimeout(window._hideIconTimeout);
        window._hideIconTimeout = setTimeout(
            () => setShowIconPause(false),
            1000,
        );
    };

    const handleError = () => {
        console.error(`❌ Video lỗi: ${data.file_url}`);
        if (onError) onError(); // 👈 báo ngược về Item
    };

    return (
        <section className={cx('wrapper')}>
            <VideoElement
                ref={videoRef}
                src={data.file_url}
                muted={muted}
                paused={pause}
                onClick={handlePause}
                onError={handleError}
            />

            <AudioControl muted={muted} onToggle={() => setMuted(!muted)} />

            <VideoCaption user={data.user} description={data.description} />

            <VideoProgress
                ref={progressRef}
                progress={progress}
                videoRef={videoRef}
            />

            {showIconPause && (
                <FontAwesomeIcon
                    className={cx('icon-pause', 'show')}
                    icon={pause ? faCirclePause : faCirclePlay}
                />
            )}
        </section>
    );
}

export default VideoPlayer;
