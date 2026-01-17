import FadeIn from '../ui/FadeIn';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container about-content">
                <FadeIn>
                    <div className="about-text">
                        <h2 className="section-title">Built for Growth</h2>
                        <p>
                            At Stormin.eu, we bridge the gap between complex data technologies and business value.
                            We specialize in helping startups and mid-size businesses establish their data foundations without the overhead of massive enterprise solutions.
                        </p>
                        <ul className="feature-list">
                            <li>🚀 <strong>Rapid Deployment:</strong> Get insights in weeks, not months.</li>
                            <li>🔍 <strong>Transparent Process:</strong> No black boxes. We build with you.</li>
                            <li>📈 <strong>Scalable Architecture:</strong> Solutions that grow as you grow.</li>
                        </ul>
                    </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <div className="about-visual">
                        <div className="visual-card radar-container">
                            <svg className="radar-chart" viewBox="0 0 200 200">
                                {/* Background Grid (Triangles) */}
                                <polygon points="100,20 180,160 20,160" fill="none" stroke="var(--border-light)" strokeWidth="1" />
                                <polygon points="100,55 160,160 40,160" fill="none" stroke="var(--border-light)" strokeWidth="1" />
                                <polygon points="100,90 140,160 60,160" fill="none" stroke="var(--border-light)" strokeWidth="1" />

                                {/* Axes */}
                                <line x1="100" y1="100" x2="100" y2="20" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4" />
                                <line x1="100" y1="100" x2="180" y2="160" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4" />
                                <line x1="100" y1="100" x2="20" y2="160" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4" />

                                {/* Data Area (Efficiency: 95%, Scalability: 88%, Clarity: 100%) 
                                    Top: (100, 20-ish)
                                    Right: (170-ish, 160)
                                    Left: (20, 160)
                                    
                                    Calculated approximate points for visual impact:
                                    Efficiency (95%): 100, 25
                                    Scalability (90%): 172, 154
                                    Clarity (100%): 20, 160
                                */}
                                <polygon
                                    points="100,25 172,154 20,160"
                                    fill="rgba(0, 168, 232, 0.2)"
                                    stroke="var(--color-secondary)"
                                    strokeWidth="2"
                                    className="radar-poly"
                                />

                                {/* Points */}
                                <g className="radar-point" style={{ animationDelay: '0.2s' }}>
                                    <circle cx="100" cy="25" r="4" fill="var(--color-secondary)" />
                                    <text x="100" y="15" textAnchor="middle" fill="var(--text-main)" fontSize="10" fontWeight="bold">Efficiency</text>
                                </g>
                                <g className="radar-point" style={{ animationDelay: '0.4s' }}>
                                    <circle cx="172" cy="154" r="4" fill="var(--color-secondary)" />
                                    <text x="180" y="175" textAnchor="middle" fill="var(--text-main)" fontSize="10" fontWeight="bold">Scalability</text>
                                </g>
                                <g className="radar-point" style={{ animationDelay: '0.6s' }}>
                                    <circle cx="20" cy="160" r="4" fill="var(--color-secondary)" />
                                    <text x="20" y="175" textAnchor="middle" fill="var(--text-main)" fontSize="10" fontWeight="bold">Clarity</text>
                                </g>
                            </svg>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default About;
