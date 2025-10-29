import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from '../Content.module.scss';
import { useCallback, useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Navigation({ contentRef }) {
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        const content = contentRef?.current;
        if (!content) return;

        const handleScroll = () => {
            const { scrollTop } = content;
            setIsTop(scrollTop === 0);
        };

        content.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            content.removeEventListener('scroll', handleScroll);
        };
    }, [contentRef]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'ArrowUp') {
                e.preventDefault();
                handleScrollUp();
            } else if (e.code === 'ArrowDown') {
                e.preventDefault();
                handleScrollDown();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    const handleScrollUp = useCallback(() => {
        if (contentRef?.current) {
            contentRef.current.scrollBy({
                top: -contentRef.current.clientHeight, // cuộn lên 1 khung
                behavior: 'smooth',
            });
        }
    }, [contentRef]);

    const handleScrollDown = useCallback(() => {
        if (contentRef?.current) {
            contentRef.current.scrollBy({
                top: contentRef.current.clientHeight, // cuộn xuống 1 khung
                behavior: 'smooth',
            });
        }
    }, [contentRef]);

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
