import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import Actions from './Actions';
import VideoPlayer from '~/components/VideoPlayer';

const cx = classNames.bind(styles);

function Item({ data, index, active }) {
    const [hasError, setHasError] = useState(false);

    // Nếu lỗi → không render gì cả
    if (hasError) return null;

    return (
        <article className={cx('wrapper')} data-index={index}>
            <VideoPlayer
                isPlay={active}
                data={data}
                isMuted={index === 0}
                active={active}
                onError={() => setHasError(true)} // 👈 nhận callback khi video lỗi
            />
            <Actions data={data} />
        </article>
    );
}

export default Item;
