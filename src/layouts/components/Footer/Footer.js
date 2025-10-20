import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import FooterSection from './FooterSection';

const cx = classNames.bind(styles);

const sections = [
    {
        title: 'Công ty',
        links: [
            { label: 'Giới thiệu', href: '#' },
            { label: 'Phòng tin tức', href: '#' },
            { label: 'Liên hệ', href: '#' },
            { label: 'Nghề nghiệp', href: '#' },
        ],
    },
    {
        title: 'Chương trình',
        links: [
            { label: 'TikTok for Good', href: '#' },
            { label: 'Quảng cáo', href: '#' },
            { label: 'Bán hàng trên TikTok Shop', href: '#' },
            { label: 'Đại lý TikTok LIVE', href: '#' },
            { label: 'Nhà phát triển', href: '#' },
            { label: 'Minh bạch', href: '#' },
            { label: 'Nội dung được nhúng từ TikTok', href: '#' },
            { label: 'SoundOn Music Distribution', href: '#' },
            { label: 'TikTok Live', href: '#' },
            { label: 'TikTok Shop', href: '#' },
        ],
    },
    {
        title: 'Điều khoản và chính sách',
        links: [
            { label: 'Trợ giúp', href: '#' },
            { label: 'An toàn', href: '#' },
            { label: 'Điều khoản', href: '#' },
            { label: 'Chính sách quyền riêng tư', href: '#' },
            { label: 'Trợ năng', href: '#' },
            { label: 'Trung tâm quyền riêng tư', href: '#' },
            { label: 'Học viện cho nhà sáng tạo', href: '#' },
            { label: 'Nguyên tắc Cộng đồng', href: '#' },
            { label: 'Bản quyền', href: '#' },
            { label: 'Nguyên tắc thực thi pháp luật', href: '#' },
        ],
    },
];

function Footer() {
    console.log('re-render Footer');

    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        //     // Nếu click lại cùng 1 mục thì đóng, còn nếu click mục khác thì mở cái mới
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <footer className={cx('footer')}>
            {sections.map((section, index) => (
                <FooterSection
                    key={section.title}
                    title={section.title}
                    links={section.links}
                    isOpen={activeIndex === index}
                    onClick={() => handleToggle(index)}
                />
            ))}
            <span className={cx('copyright')}>© 2025 TikTok</span>
        </footer>
    );
}

export default Footer;
