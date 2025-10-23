import Content from '~/layouts/components/Content';

import styles from './Home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Content />
        </div>
    );
}

export default Home;
