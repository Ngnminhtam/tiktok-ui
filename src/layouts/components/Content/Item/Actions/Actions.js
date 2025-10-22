import classNames from 'classnames/bind';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    CommentIcon,
    FavoriteIcon,
    LikeIcon,
    ShareIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import styles from '../Item.module.scss';

const cx = classNames.bind(styles);

function Actions() {
    return (
        <section>
            <nav className={cx('actions')}>
                <a className={cx('wrapper-img', 'wrapper-avatar')} href="/">
                    <Image
                        className={cx('avatar')}
                        src="http://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/6704c51f5c6155ebfcbe7e20ed95608a%7etplv-tiktokx-cropcenter:720:720.jpeg"
                    />
                    <button className={cx('follow-btn')}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </a>
                <button className={cx('action')}>
                    <span className={cx('btn')}>{<LikeIcon />}</span>
                    <strong className={cx('count')}>31.8K</strong>
                </button>

                <button className={cx('action')}>
                    <span className={cx('btn')}>{<CommentIcon />}</span>
                    <strong className={cx('count')}>313</strong>
                </button>

                <button className={cx('action')}>
                    <span className={cx('btn')}>{<FavoriteIcon />}</span>
                    <strong className={cx('count')}>3928</strong>
                </button>

                <button className={cx('action')}>
                    <span className={cx('btn')}>{<ShareIcon />}</span>
                    <strong className={cx('count')}>7926</strong>
                </button>
                <a className={cx('wrapper-img')} href="/">
                    <Image
                        className={cx('music-img')}
                        src="http://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/6704c51f5c6155ebfcbe7e20ed95608a%7etplv-tiktokx-cropcenter:720:720.jpeg"
                    />
                </a>
            </nav>
        </section>
    );
}

export default Actions;
