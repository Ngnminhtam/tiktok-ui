import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from '../Home.module.scss';

const cx = classNames.bind(styles);

function Navigation() {
    return (
        <nav className={cx('navigation')}>
            <button className={cx('navigation-btn')}>
                <FontAwesomeIcon icon={faAngleUp} />
            </button>
            <button className={cx('navigation-btn')}>
                <FontAwesomeIcon icon={faAngleDown} />
            </button>
        </nav>
    );
}

export default Navigation;
