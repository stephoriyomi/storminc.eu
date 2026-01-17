import { useState } from 'react';
import FadeIn from '../ui/FadeIn';
import './Process.css';

const Process = () => {
    const [activeStep, setActiveStep] = useState(null);

    const steps = [
        { num: "01", title: "Discovery", desc: "Current state assessment & data strategy", value: "25%" },
        { num: "02", title: "Design", desc: "Architecture blueprint & roadmap", value: "50%" },
        { num: "03", title: "Implementation", desc: "Agile development & deployment", value: "75%" },
        { num: "04", title: "Evolution", desc: "Continuous optimization & support", value: "100%" }
    ];

    return (
        <section className="process-section">
            <div className="container">
                <h2 className="section-title text-center">Our Approach</h2>

                <div className="process-split">
                    <div className="process-grid">
                        {steps.map((step, index) => (
                            <FadeIn key={index} delay={index * 0.1}>
                                <div
                                    className={`process-step ${activeStep === index ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveStep(index)}
                                    onMouseLeave={() => setActiveStep(null)}
                                >
                                    <div className="step-num">{step.num}</div>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    <div className="process-visual">
                        <FadeIn delay={0.3}>
                            <div className="chart-container">
                                <h3 className="chart-title">Value Generation Over Time</h3>
                                <div className="bar-chart">
                                    {steps.map((step, index) => (
                                        <div
                                            key={index}
                                            className={`bar-wrapper ${activeStep === index ? 'active' : ''}`}
                                            onMouseEnter={() => setActiveStep(index)}
                                            onMouseLeave={() => setActiveStep(null)}
                                        >
                                            <div
                                                className="bar"
                                                style={{ height: step.value, animationDelay: `${0.5 + (index * 0.2)}s` }}
                                            >
                                                <div className="bar-tooltip">{step.value} Value</div>
                                            </div>
                                            <span className="bar-label">Phase {index + 1}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
