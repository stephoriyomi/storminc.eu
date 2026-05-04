import './Hero.css';

const Hero = () => {
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section className="hero">
            <div className="container hero-grid">
                <div className="hero-text">
                    <h1 className="hero-title">
                        Data infrastructure that survives <em>contact with reality.</em>
                    </h1>

                    <p className="hero-subtitle">
                        We build the pipelines, warehouses, and analytics layers your team will
                        actually trust — for startups and mid-size companies across the US and EU.
                    </p>

                    <div className="hero-actions">
                        <button className="btn btn-primary btn-arrow" onClick={() => scrollTo('contact')}>
                            Book a discovery call
                        </button>
                        <button className="btn btn-ghost btn-arrow" onClick={() => scrollTo('services')}>
                            See how we work
                        </button>
                    </div>

                    <div className="hero-meta">
                        <span>Available · 2 slots Q3</span>
                        <span aria-hidden="true">·</span>
                        <span>US ET / EU CET</span>
                        <span aria-hidden="true">·</span>
                        <span>Fixed-fee or T&amp;M</span>
                    </div>
                </div>

                <div className="hero-artifact" aria-hidden="true">
                    <div className="artifact-card">
                        <div className="artifact-header">
                            <div className="artifact-dots">
                                <span></span><span></span><span></span>
                            </div>
                            <span className="artifact-filename">pipelines/customer_360.yml</span>
                            <span className="artifact-badge"><span className="dot" /> healthy</span>
                        </div>
                        <pre className="artifact-code"><code>{`source:       postgres.production
destination:  snowflake.analytics
schedule:     "*/15 * * * *"

steps:
  - extract:    cdc → kafka
  - transform:  dbt (124 models)
  - test:       schema · freshness · volume
  - publish:    metrics_layer.v2

sla:          p99 < 90s   ·   uptime 99.97%`}</code></pre>
                    </div>

                    <div className="artifact-stats">
                        <div className="stat">
                            <div className="stat-num">12.4M</div>
                            <div className="stat-label">rows / hour</div>
                        </div>
                        <div className="stat">
                            <div className="stat-num">99.97<span className="stat-pct">%</span></div>
                            <div className="stat-label">uptime · 90d</div>
                        </div>
                        <div className="stat">
                            <div className="stat-num">1.2<span className="stat-pct">s</span></div>
                            <div className="stat-label">p99 latency</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container hero-stack">
                <span className="stack-label">Working primarily with</span>
                <div className="stack-list">
                    <span>Snowflake</span>
                    <span>dbt</span>
                    <span>BigQuery</span>
                    <span>Databricks</span>
                    <span>Airflow</span>
                    <span>Postgres</span>
                    <span>Kafka</span>
                    <span>Looker</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
