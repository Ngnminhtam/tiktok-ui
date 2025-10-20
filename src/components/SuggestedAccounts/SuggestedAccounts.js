import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ data, label }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <p className={cx('more-btn')}>Xem thêm</p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    // data: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
