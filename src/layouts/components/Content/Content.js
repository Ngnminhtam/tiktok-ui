import { useEffect, useRef, useState } from 'react';
import styles from './Content.module.scss';
import classNames from 'classnames/bind';

import Item from './Item';
import Navigation from '~/layouts/components/Content/Navigation';
import * as videoService from '~/services/videoService';

const cx = classNames.bind(styles);

const TYPE = 'for-you';
const INIT_PAGE = Math.floor(Math.random() * 10) + 1;

function Content() {
    const contentRef = useRef();
    const sentinelRef = useRef(null);

    const [page, setPage] = useState(INIT_PAGE);
    const [items, setItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // fetch items khi page thay đổi
    useEffect(() => {
        let mounted = true;
        setLoading(true);

        videoService
            .getVideos({ type: TYPE, page })
            .then((data) => {
                if (!mounted) return;
                setItems((prevItems) => [...prevItems, ...data]);
                setHasMore(Array.isArray(data) ? data.length > 0 : false);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [page]);

    // Observer để set activeIndex (video hiện thị >= 60%)
    useEffect(() => {
        const rootElement = contentRef.current || null; // <-- use container as root
        const options = { root: rootElement, threshold: 0.6 };

        const observer = new IntersectionObserver((entries) => {
            const visibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visibleEntry) {
                const visibleIndexNumber = Number(
                    visibleEntry.target.dataset.index,
                );
                if (!Number.isNaN(visibleIndexNumber))
                    setActiveIndex(visibleIndexNumber);
            }
        }, options);

        const container = contentRef.current;
        if (!container) return;

        const itemsEls = container.querySelectorAll('[data-index]');
        itemsEls.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, [items]);

    // Observer sentinel để load thêm khi gần đáy
    useEffect(() => {
        const sentinelElement = sentinelRef.current;
        if (!sentinelElement) return;

        const rootElement = contentRef.current || null; // <-- use container as root
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !loading && hasMore) {
                        setPage((previousPage) => previousPage + 1);
                    }
                });
            },
            {
                root: rootElement, // container scroll root
                rootMargin: '400px', // trigger sớm
                threshold: 0,
            },
        );

        observer.observe(sentinelElement);
        return () => observer.disconnect();
    }, [loading, hasMore]);

    return (
        <>
            <div ref={contentRef} className={cx('wrapper')}>
                {items.map((item, index) => (
                    <Item
                        key={item.id}
                        data={item}
                        index={index}
                        active={index === activeIndex}
                    />
                ))}

                {/* sentinel ở cuối danh sách để trigger load thêm */}
                <div
                    ref={sentinelRef}
                    aria-hidden
                    style={{ width: '100%', height: 1 }}
                />

                {loading && <div className={cx('loading')}>Loading...</div>}
            </div>
            <Navigation contentRef={contentRef} />
        </>
    );
}

export default Content;
