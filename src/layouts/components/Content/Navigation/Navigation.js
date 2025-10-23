import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from '../Content.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Navigation({ contentRef }) {
    const [isTop, setIsTop] = useState(true);
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        const content = contentRef?.current;
        if (!content) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = content;
            setIsTop(scrollTop === 0);
            setIsBottom(scrollTop + clientHeight >= scrollHeight - 1);
        };

        content.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            content.removeEventListener('scroll', handleScroll);
        };
    }, [contentRef]);

    const handleScrollUp = () => {
        if (contentRef?.current) {
            contentRef.current.scrollBy({
                top: -contentRef.current.clientHeight, // cuộn lên 1 khung
                behavior: 'smooth',
            });
        }
    };

    const handleScrollDown = () => {
        if (contentRef?.current) {
            contentRef.current.scrollBy({
                top: contentRef.current.clientHeight, // cuộn xuống 1 khung
                behavior: 'smooth',
            });
        }
    };

    return (
        <nav className={cx('navigation')}>
            <button
                className={cx('navigation-btn', { disable: isTop })}
                onClick={handleScrollUp}
            >
                <FontAwesomeIcon icon={faAngleUp} />
            </button>
            <button className={cx('navigation-btn')} onClick={handleScrollDown}>
                <FontAwesomeIcon icon={faAngleDown} />
            </button>
        </nav>
    );
}

export default Navigation;
