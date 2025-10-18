import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('account-item')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/8f912daa36576b89cd5764c307af5ca5~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=a4e6f7db&x-expires=1760918400&x-signature=16jUu2e%2FeWcENus%2BMNSlGl0ScZU%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=sg1"
                alt=""
            />
            <div className={cx('item-info')}>
                <p className={cx('name')}>
                    <strong>Vật Vờ Studio</strong>
                    <FontAwesomeIcon
                        className={cx('check')}
                        icon={faCheckCircle}
                    />
                </p>
                <p className={cx('nickname')}>vatvostudio</p>
            </div>
        </div>
    );
}
AccountItem.propTypes = {};

export default AccountItem;
