import { useState } from 'react';
import FadeIn from '../ui/FadeIn';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch("https://formsubmit.co/ajax/support@storminc.eu", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: `New Project Inquiry from ${formData.name}`,
                    _template: 'table' // Optional: Makes email look nicer
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
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
                            <div className="success-message" style={{ textAlign: 'center', padding: '2rem', color: '#10b981' }}>
                                <h3>Message Sent!</h3>
                                <p style={{ color: 'var(--text-main)', marginTop: '0.5rem' }}>
                                    Thanks for reaching out! We'll allow 24-48 hours for a response.
                                </p>
                                <button
                                    onClick={() => setStatus(null)}
                                    className="btn btn-primary"
                                    style={{ marginTop: '1.5rem' }}
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
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
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary submit-btn"
                                    disabled={status === 'sending'}
                                >
                                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                                </button>
                                {status === 'error' && (
                                    <p style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>
                                        Something went wrong. Please try again later.
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Contact;
