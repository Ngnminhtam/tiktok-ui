import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';

const cx = classNames.bind(styles);

function VideoCaption({ user, description }) {
    return (
        <div className={cx('caption')}>
            <a href={`/@${user.nickname}`}>
                <p className={cx('nickname')}>{user.nickname}</p>
                {user.tick && (
                    <FontAwesomeIcon
                        className={cx('check')}
                        icon={faCheckCircle}
                    />
                )}
            </a>
            <div className={cx('video-desc')}>
                <span className={cx('desc')}>{description}</span>
            </div>
        </div>
    );
}

export default VideoCaption;
