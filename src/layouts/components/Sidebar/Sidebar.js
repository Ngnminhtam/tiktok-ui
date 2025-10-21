import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Menu, { MenuItem } from './Menu';
import styles from './Sidebar.module.scss';
import config from '~/config';
import {
    FollowActiveIcon,
    FollowIcon,
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import Footer from '../Footer';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Sidebar() {
    const [page, setPage] = useState(INIT_PAGE);
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    useEffect(() => {
        userService
            .getSuggested({ page, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUsers((prevUsers) => [...prevUsers, ...data]);
            })
            .catch((error) => console.log(error));
    }, [page]);

    const handleSeeMore = useCallback(() => {
        setPage(page + 1);
    }, [page]);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="Đề xuất"
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                />
                <MenuItem
                    title="Đã follow"
                    to={config.routes.following}
                    icon={<FollowIcon />}
                    activeIcon={<FollowActiveIcon />}
                />
                <MenuItem
                    title="Live"
                    to={config.routes.live}
                    icon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                />
            </Menu>
            {/* <SuggestedAccounts label="Các tài khoản Đã follow"></SuggestedAccounts> */}
            <SuggestedAccounts
                label="Tài khoản được đề xuất"
                data={suggestedUsers}
                onSeeMore={handleSeeMore}
            ></SuggestedAccounts>
            <Footer />
        </aside>
    );
}

export default Sidebar;
