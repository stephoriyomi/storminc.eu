import FadeIn from '../ui/FadeIn';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section section">
            <div className="container">
                <div className="section-label"><span>04</span><span>Approach</span></div>

                <div className="about-grid">
                    <FadeIn>
                        <div className="about-text">
                            <h2 className="section-title">
                                Built for teams that need answers — <em>not architecture astronauts.</em>
                            </h2>
                            <p className="about-lede">
                                Storm Inc. is a small, senior team. We pick the boring, durable choice
                                over the resume-driven one. We write our reasoning down. We hand it back
                                to you with the keys.
                            </p>

                            <ul className="principles">
                                <li>
                                    <div className="principle-num">①</div>
                                    <div>
                                        <strong>Decisions over decks.</strong>
                                        <span> Every architecture choice is a written ADR — alternatives we rejected, and why.</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="principle-num">②</div>
                                    <div>
                                        <strong>Demo-driven delivery.</strong>
                                        <span> Two-week increments, real work running on real data. Not slideware.</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="principle-num">③</div>
                                    <div>
                                        <strong>We leave on purpose.</strong>
                                        <span> Engagements end with runbooks, paired ownership, and a team that can extend the system without us.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.15}>
                        <div className="about-visual">
                            <div className="metric-grid">
                                <div className="metric">
                                    <div className="metric-num">8<span className="metric-plus">+</span></div>
                                    <div className="metric-label">years on the stack</div>
                                </div>
                                <div className="metric">
                                    <div className="metric-num">40<span className="metric-plus">+</span></div>
                                    <div className="metric-label">pipelines shipped</div>
                                </div>
                                <div className="metric">
                                    <div className="metric-num">US<span className="metric-plus">/</span>EU</div>
                                    <div className="metric-label">primary timezones</div>
                                </div>
                                <div className="metric">
                                    <div className="metric-num">2</div>
                                    <div className="metric-label">concurrent engagements (max)</div>
                                </div>
                            </div>

                            <div className="radar-card">
                                <div className="radar-header">
                                    <span className="radar-label">delivery profile</span>
                                    <span className="radar-meta">Self-assessed · Q3 2026</span>
                                </div>
                                <svg className="radar-chart" viewBox="0 0 200 200">
                                    <polygon points="100,20 180,160 20,160" fill="none" stroke="var(--rule-strong)" strokeWidth="1" />
                                    <polygon points="100,55 160,160 40,160" fill="none" stroke="var(--rule)" strokeWidth="1" />
                                    <polygon points="100,90 140,160 60,160" fill="none" stroke="var(--rule)" strokeWidth="1" />

                                    <line x1="100" y1="100" x2="100" y2="20" stroke="var(--rule)" strokeWidth="1" strokeDasharray="3" />
                                    <line x1="100" y1="100" x2="180" y2="160" stroke="var(--rule)" strokeWidth="1" strokeDasharray="3" />
                                    <line x1="100" y1="100" x2="20" y2="160" stroke="var(--rule)" strokeWidth="1" strokeDasharray="3" />

                                    <polygon
                                        points="100,28 168,152 32,156"
                                        fill="rgba(204, 120, 92, 0.18)"
                                        stroke="var(--accent)"
                                        strokeWidth="1.5"
                                        className="radar-poly"
                                    />

                                    <circle cx="100" cy="28" r="3.5" fill="var(--accent)" />
                                    <circle cx="168" cy="152" r="3.5" fill="var(--accent)" />
                                    <circle cx="32" cy="156" r="3.5" fill="var(--accent)" />

                                    <text x="100" y="13" textAnchor="middle" className="radar-text">Speed</text>
                                    <text x="183" y="172" textAnchor="middle" className="radar-text">Scale</text>
                                    <text x="17" y="172" textAnchor="middle" className="radar-text">Clarity</text>
                                </svg>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default About;
