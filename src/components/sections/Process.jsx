import { useState } from 'react';
import FadeIn from '../ui/FadeIn';
import './Process.css';

const steps = [
    {
        num: "01",
        title: "Discovery",
        weeks: "1-2",
        desc: "Audit current state. Map systems, stakeholders, and data flows. Output: a prioritized roadmap with effort + impact estimates.",
        deliverable: "Strategy memo + RACI"
    },
    {
        num: "02",
        title: "Design",
        weeks: "2-3",
        desc: "Architecture blueprint with explicit tradeoffs. We argue with you, not at you. Decision logs become onboarding docs later.",
        deliverable: "Architecture diagrams + ADRs"
    },
    {
        num: "03",
        title: "Build",
        weeks: "4-8",
        desc: "Iterative delivery in two-week increments. Demo-driven. Tests, lineage, and documentation ship with the code.",
        deliverable: "Production pipelines + CI/CD"
    },
    {
        num: "04",
        title: "Hand-off",
        weeks: "1-2",
        desc: "Runbooks, on-call playbooks, and pair programming. We leave when your team can extend the system without us.",
        deliverable: "Runbooks + 30-day support"
    }
];

const Process = () => {
    const [active, setActive] = useState(0);

    return (
        <section className="process-section section">
            <div className="container">
                <div className="section-label"><span>03</span><span>Process</span></div>
                <h2 className="section-title">
                    A predictable path from kickoff to hand-off.
                </h2>
                <p className="process-intro">
                    Engagements typically run 8–14 weeks. You'll know what's shipping, when,
                    and what 'done' looks like — at every step.
                </p>

                <div className="timeline">
                    <div className="timeline-track" aria-hidden="true" />
                    <div className="timeline-steps">
                        {steps.map((step, i) => (
                            <button
                                key={i}
                                className={`timeline-node ${active === i ? 'active' : ''}`}
                                onMouseEnter={() => setActive(i)}
                                onFocus={() => setActive(i)}
                                onClick={() => setActive(i)}
                            >
                                <div className="node-marker" />
                                <div className="node-num">{step.num}</div>
                                <div className="node-title">{step.title}</div>
                                <div className="node-weeks">wk {step.weeks}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <FadeIn>
                    <div className="step-detail" key={active}>
                        <div className="detail-left">
                            <div className="detail-eyebrow">
                                {steps[active].num} &middot; {steps[active].title}
                            </div>
                            <p className="detail-desc">{steps[active].desc}</p>
                        </div>
                        <div className="detail-right">
                            <div>
                                <div className="detail-eyebrow">Deliverable</div>
                                <div className="detail-deliverable">{steps[active].deliverable}</div>
                            </div>
                            <div>
                                <div className="detail-eyebrow">Duration</div>
                                <div className="detail-duration">{steps[active].weeks} weeks</div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default Process;
