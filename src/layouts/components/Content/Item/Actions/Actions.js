import classNames from 'classnames/bind';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import {
    CommentIcon,
    FavoriteIcon,
    LikeIcon,
    ShareIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import styles from './Actions.module.scss';

const cx = classNames.bind(styles);

function Actions({ data }) {
    const [follow, setFollow] = useState(data.user.is_followed);
    const [like, setLike] = useState(data.is_liked);
    const [favorite, setFavorite] = useState(false);

    return (
        <section>
            <nav className={cx('actions')}>
                <a
                    className={cx('wrapper-img', 'wrapper-avatar')}
                    href={`/@${data.user.nickname}`}
                >
                    <Image className={cx('avatar')} src={data.user.avatar} />
                    <button
                        className={cx('follow-btn', {
                            active: follow,
                        })}
                        onClick={(e) => {
                            e.preventDefault();
                            setFollow(!follow);
                        }}
                    >
                        <FontAwesomeIcon icon={follow ? faCheck : faPlus} />
                    </button>
                </a>
                <button
                    className={cx('action')}
                    onClick={() => {
                        setLike(!like);
                    }}
                >
                    <span className={cx('btn', { like })}>{<LikeIcon />}</span>
                    <strong className={cx('count')}>{data.likes_count}</strong>
                </button>

                <button className={cx('action')}>
                    <span className={cx('btn')}>{<CommentIcon />}</span>
                    <strong className={cx('count')}>
                        {data.comments_count}
                    </strong>
                </button>

                <button
                    className={cx('action')}
                    onClick={() => {
                        setFavorite(!favorite);
                    }}
                >
                    <span className={cx('btn', { favorite })}>
                        {<FavoriteIcon />}
                    </span>
                    <strong className={cx('count')}>{data.shares_count}</strong>
                </button>

                <button className={cx('action')}>
                    <span className={cx('btn')}>{<ShareIcon />}</span>
                    <strong className={cx('count')}>{data.shares_count}</strong>
                </button>
                {!!data.music && (
                    <a className={cx('wrapper-img')} href={`#${data.music}`}>
                        <Image
                            className={cx('music-img')}
                            src={data.user.avatar}
                        />
                    </a>
                )}
            </nav>
        </section>
    );
}

export default Actions;
