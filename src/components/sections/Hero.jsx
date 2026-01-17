import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background"></div>

      <div className="container hero-content">
        <h1 className="hero-title">
          Data Engineering Services <br /> for Better Decisions
        </h1>
        <p className="hero-subtitle">
          Drive informed decisions with scalable data pipelines, secure data lakes, and future-ready architecture. We turn raw data into your most valuable asset.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            Get a Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
