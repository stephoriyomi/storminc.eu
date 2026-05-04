import FadeIn from '../ui/FadeIn';
import './Challenges.css';

const outcomes = [
    {
        label: "Single source of truth",
        desc: "Replace spreadsheet sprawl with governed warehouses your analysts and execs can both trust."
    },
    {
        label: "Defensible decisions",
        desc: "Every metric traceable to its source. Every model versioned. Every change reviewed."
    },
    {
        label: "Foundations that scale",
        desc: "Architecture chosen for your stage — not the AWS keynote. Survives 10x growth without a rebuild."
    },
    {
        label: "Lower platform risk",
        desc: "Compliance, lineage, and observability built in. No black boxes; no on-call surprises."
    }
];

const Challenges = () => {
    return (
        <section className="outcomes section">
            <div className="container">
                <div className="section-label"><span>01</span><span>Outcomes</span></div>
                <h2 className="section-title">
                    Decisions you can defend.<br />
                    Infrastructure that scales without rebuilds.
                </h2>

                <div className="outcomes-grid">
                    {outcomes.map((item, i) => (
                        <FadeIn key={i} delay={i * 0.06}>
                            <article className="outcome">
                                <div className="outcome-num">0{i + 1}</div>
                                <h3 className="outcome-label">{item.label}</h3>
                                <p className="outcome-desc">{item.desc}</p>
                            </article>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Challenges;
