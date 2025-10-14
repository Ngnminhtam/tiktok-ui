import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <Image
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/6704c51f5c6155ebfcbe7e20ed95608a~tplv-tiktokx-cropcenter:300:300.webp?dr=14577&refresh_token=9d3a2c5c&x-expires=1759982400&x-signature=l%2Be72fLYfmTEFU3KiZVFDOOBC5Y%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=c1333099&idc=sg1"
                alt=""
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Van A</span>
                    <FontAwesomeIcon
                        className={cx('check')}
                        icon={faCheckCircle}
                    />
                </h4>
                <span className={cx('username')}>nguyenvana</span>
            </div>
        </div>
    );
}

export default AccountItem;
