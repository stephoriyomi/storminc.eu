import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-left">
                    <div className="logo">
                        Storminc<span className="dot">.</span>eu
                    </div>
                    <p className="copyright">© {new Date().getFullYear()} Storminc.eu. All rights reserved.</p>
                </div>
                <div className="footer-right">
                    {/* Social icons or links could go here */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
