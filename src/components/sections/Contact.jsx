import { useState } from 'react';
import FadeIn from '../ui/FadeIn';
import './Contact.css';

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: `New Project Inquiry from ${formData.name}`,
                    from_name: formData.name,
                    ...formData
                })
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
                setErrorMessage(result.message || 'Something went wrong. Please try again.');
            }
        } catch {
            setStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container contact-content">
                <FadeIn>
                    <h2 className="section-title">Start Your Project</h2>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <div className="contact-card">
                        {status === 'success' ? (
                            <div className="form-status form-success">
                                <h3>Message Sent!</h3>
                                <p>Thanks for reaching out! We'll get back to you within 24-48 hours.</p>
                                <button
                                    type="button"
                                    className="btn btn-primary submit-btn"
                                    onClick={() => setStatus('idle')}
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                {status === 'error' && (
                                    <div className="form-status form-error">
                                        <p>{errorMessage}</p>
                                    </div>
                                )}
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        disabled={status === 'loading'}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@company.com"
                                        disabled={status === 'loading'}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        placeholder="Tell us about your data needs..."
                                        disabled={status === 'loading'}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary submit-btn"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Contact;