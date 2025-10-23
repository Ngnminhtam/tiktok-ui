import classNames from 'classnames/bind';

import styles from './Item.module.scss';
import Actions from './Actions';
import VideoPlayer from '~/components/VideoPlayer';

const cx = classNames.bind(styles);

function Item({ data }) {
    return (
        <article className={cx('wrapper')}>
            <VideoPlayer data={data} />
            <Actions data={data} />
        </article>
    );
}

export default Item;
