import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check system preference or saved preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            setIsDark(false);
            document.documentElement.removeAttribute('data-theme');
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        if (newTheme) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-content">
                <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
                    Storminc<span className="dot">.</span>eu
                </div>
                <ul className="nav-links">
                    <li><button onClick={() => scrollToSection('services')}>Services</button></li>
                    <li><button onClick={() => scrollToSection('about')}>Approach</button></li>
                    <li className="theme-toggle">
                        <button onClick={toggleTheme} aria-label="Toggle Dark Mode">
                            {isDark ? '☀️' : '🌙'}
                        </button>
                    </li>
                    <li><button onClick={() => scrollToSection('contact')} className="btn-primary">Contact Us</button></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
