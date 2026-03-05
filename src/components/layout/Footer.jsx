import './Footer.css';
import StormLogo from '../../assets/Storm Inc Logo.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-left">
                    <div className="logo">
                        <img src={StormLogo} alt="Storm Inc." className="logo-img" />
                    </div>
                    <p className="copyright">© {new Date().getFullYear()} Storm Inc. All rights reserved.</p>
                </div>
                <div className="footer-right">
                    {/* Social icons or links could go here */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
