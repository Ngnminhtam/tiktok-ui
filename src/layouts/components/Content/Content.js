import { useEffect, useRef, useState } from 'react';
import styles from './Content.module.scss';
import classNames from 'classnames/bind';

import Item from './Item';
import Navigation from '~/layouts/components/Content/Navigation';
import * as videoService from '~/services/videoService';

const cx = classNames.bind(styles);

const TYPE = 'for-you';
const INIT_PAGE = Math.floor(Math.random() * 50) + 1;

function Content() {
    const contentRef = useRef();

    const [page, setPage] = useState(INIT_PAGE);
    const [items, setItems] = useState([]);

    useEffect(() => {
        videoService
            .getVideos({ type: TYPE, page })
            .then((data) => setItems((prevItems) => [...prevItems, ...data]))
            .catch((error) => console.log(error));
    }, [page]);

    return (
        <>
            <div ref={contentRef} className={cx('wrapper')}>
                {items.map((item) => (
                    <Item key={item.id} data={item} />
                ))}
            </div>
            <Navigation contentRef={contentRef} />
        </>
    );
}

export default Content;
