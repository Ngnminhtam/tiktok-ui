import classNames from 'classnames/bind';

import styles from './Item.module.scss';
import Actions from './Actions';
import VideoPlayer from '~/components/VideoPlayer';

const cx = classNames.bind(styles);

function Item({ index }) {
    return (
        <article className={cx('wrapper')}>
            <VideoPlayer />
            <Actions />
        </article>
    );
}

export default Item;
