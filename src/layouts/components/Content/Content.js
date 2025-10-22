import styles from './Content.module.scss';
import classNames from 'classnames/bind';

import Item from './Item';

const cx = classNames.bind(styles);

function Content() {
    return (
        <div className={cx('wrapper')}>
            <Item />
        </div>
    );
}

export default Content;
