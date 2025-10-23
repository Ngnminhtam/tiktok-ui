import classNames from 'classnames/bind';

import styles from './Item.module.scss';
import Actions from './Actions';
import VideoPlayer from '~/components/VideoPlayer';

const cx = classNames.bind(styles);

function Item({ data, index }) {
    return (
        <article className={cx('wrapper')}>
            <VideoPlayer
                isPlay={index === 0}
                data={data}
                isMuted={index === 0}
            />
            <Actions data={data} />
        </article>
    );
}

export default Item;
