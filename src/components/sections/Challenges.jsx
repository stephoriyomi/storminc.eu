import FadeIn from '../ui/FadeIn';
import './Challenges.css';

const Challenges = () => {
  const challenges = [
    { title: "Drive Informed Decisions", desc: "Leverage advanced analytics to remove guesswork and act with confidence." },
    { title: "Maximize Data ROI", desc: "Extract value from every byte with efficient storage and processing architectures." },
    { title: "Break Down Data Silos", desc: "Unify disparate systems into a single source of truth for your organization." },
    { title: "Minimize Business Risks", desc: "Ensure compliance, security, and governance with robust frameworks." }
  ];

  return (
    <section className="challenges-section">
      <div className="container">
        <h2 className="challenges-title">Challenges We Solve</h2>
        <div className="challenges-grid">
          {challenges.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="challenge-card">
                <div className="check-circle">✓</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Challenges;


