import { useState } from 'react';
import FadeIn from '../ui/FadeIn';
import './Contact.css';

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        scope: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');
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
                setFormData({ name: '', email: '', company: '', scope: '', message: '' });
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
        <section id="contact" className="contact-section section">
            <div className="container">
                <div className="contact-grid">
                    <FadeIn>
                        <div className="contact-intro">
                            <div className="section-label"><span>05</span><span>Contact</span></div>
                            <h2 className="section-title contact-title">
                                Let's talk about what you're trying to build.
                            </h2>
                            <p className="contact-lede">
                                Tell us a little about the work. We'll reply within one business day
                                with whether we're a good fit, and a few questions to scope a discovery call.
                            </p>

                            <div className="contact-meta">
                                <div className="meta-row">
                                    <span className="meta-label">Available</span>
                                    <span className="meta-value">2 slots · Q3 2026</span>
                                </div>
                                <div className="meta-row">
                                    <span className="meta-label">Timezones</span>
                                    <span className="meta-value">US ET · EU CET overlap</span>
                                </div>
                                <div className="meta-row">
                                    <span className="meta-label">Engagements</span>
                                    <span className="meta-value">8–14 wk · fixed-fee or T&amp;M</span>
                                </div>
                                <div className="meta-row">
                                    <span className="meta-label">Email</span>
                                    <span className="meta-value">support@storminc.eu</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.15}>
                        <div className="contact-card">
                            {status === 'success' ? (
                                <div className="form-status form-success">
                                    <h3>Message received.</h3>
                                    <p>We'll be in touch within one business day.</p>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => setStatus('idle')}
                                    >
                                        Send another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    {status === 'error' && (
                                        <div className="form-status form-error">
                                            <p>{errorMessage}</p>
                                        </div>
                                    )}
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                disabled={status === 'loading'}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="company">Company</label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                disabled={status === 'loading'}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Work email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            disabled={status === 'loading'}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="scope">What are you looking to build?</label>
                                        <select
                                            id="scope"
                                            name="scope"
                                            value={formData.scope}
                                            onChange={handleChange}
                                            disabled={status === 'loading'}
                                        >
                                            <option value="">Select a scope...</option>
                                            <option>Pipelines & ingestion</option>
                                            <option>Warehouse / lake migration</option>
                                            <option>dbt + metrics layer</option>
                                            <option>Analytics / dashboards</option>
                                            <option>Observability / governance</option>
                                            <option>ML / feature engineering</option>
                                            <option>Not sure yet</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">A bit of context</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            placeholder="What's the data, what's the goal, what's the constraint?"
                                            disabled={status === 'loading'}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-arrow submit-btn"
                                        disabled={status === 'loading'}
                                    >
                                        {status === 'loading' ? 'Sending...' : 'Send'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default Contact;
