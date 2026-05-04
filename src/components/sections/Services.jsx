import FadeIn from '../ui/FadeIn';
import './Services.css';

const services = [
    {
        num: "01",
        title: "Pipelines & ingestion",
        description: "Connect anything to anywhere. Batch and streaming, CDC from production databases, schema evolution that doesn't break downstream.",
        stack: ["Airflow", "Kafka", "Fivetran", "dbt"]
    },
    {
        num: "02",
        title: "Warehouses & lakes",
        description: "Cloud warehouse, lakehouse, or hybrid — chosen for your stage. Migration, optimization, and cost engineering included.",
        stack: ["Snowflake", "BigQuery", "Databricks", "Postgres"]
    },
    {
        num: "03",
        title: "Modeling & metrics",
        description: "Versioned dbt models with tests, lineage, and a metrics layer your BI tools can rely on. End the 'whose number is right' debate.",
        stack: ["dbt", "Cube", "MetricFlow", "Looker"]
    },
    {
        num: "04",
        title: "Analytics & dashboards",
        description: "From self-service exploration to executive dashboards. Built once, embedded everywhere — permissions and lineage handled.",
        stack: ["Looker", "Hex", "Metabase", "Streamlit"]
    },
    {
        num: "05",
        title: "Observability & governance",
        description: "Lineage, freshness, and cost monitoring. Catalogs your team will actually use. SOC 2 / GDPR-ready foundations.",
        stack: ["Monte Carlo", "DataHub", "OpenLineage", "Terraform"]
    },
    {
        num: "06",
        title: "ML & feature engineering",
        description: "Production-ready feature stores, training pipelines, and model serving. Pragmatic ML — not a data-science museum exhibit.",
        stack: ["Feast", "MLflow", "Sagemaker", "Vertex"]
    }
];

const Services = () => {
    return (
        <section id="services" className="services-section section">
            <div className="container">
                <div className="section-label"><span>02</span><span>Services</span></div>
                <h2 className="section-title">
                    A focused toolkit. Specialists, <em>not generalists.</em>
                </h2>
                <p className="services-intro">
                    Six practice areas, each led by senior engineers who've shipped this in production at scale.
                </p>

                <div className="services-grid">
                    {services.map((service, i) => (
                        <FadeIn key={i} delay={i * 0.04}>
                            <article className="service-card">
                                <div className="service-num">{service.num}</div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-desc">{service.description}</p>
                                <div className="service-stack">
                                    {service.stack.map((tech) => (
                                        <span key={tech} className="stack-tag">{tech}</span>
                                    ))}
                                </div>
                            </article>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
