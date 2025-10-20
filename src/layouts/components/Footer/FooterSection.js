import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function FooterSection({ title, links, isOpen, onClick }) {
    console.log('re-render FooterSection');

    return (
        <div className={cx('wrapper')}>
            <h3
                className={cx('title', {
                    active: isOpen,
                })}
                onClick={onClick}
            >
                {title}
            </h3>
            {isOpen && (
                <ul className={cx('list-links')}>
                    {links.map((link, index) => (
                        <li className={cx('link')} key={index}>
                            <a className={cx('label')} href={link.href}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

FooterSection.propTypes = {
    title: PropTypes.string.isRequired,
    links: PropTypes.array,
};

export default FooterSection;
