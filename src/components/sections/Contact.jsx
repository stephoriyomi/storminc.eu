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

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thanks for reaching out! We will get back to you soon.");
    };

    return (
        <section id="contact" className="contact-section">
            <div className="container contact-content">
                <FadeIn>
                    <h2 className="section-title">Start Your Project</h2>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <div className="contact-card">
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
                            <button type="submit" className="btn btn-primary submit-btn">Send Message</button>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Contact;
