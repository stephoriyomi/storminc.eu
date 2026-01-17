import FadeIn from '../ui/FadeIn';
import './Services.css';

const services = [
  {
    title: "ETL & ELT Pipelines",
    description: "Extract and transform historical data from diverse sources including APIs, databases, and legacy systems.",
    items: ["Batch processing", "Real-time streaming", "Scalable architecture"]
  },
  {
    title: "Data Warehousing",
    description: "Centralize structured quality data enabling complex querying and reporting for enterprise-wide intelligence.",
    items: ["Schema design", "Migration & optimization", "Data integration"]
  },
  {
    title: "Data Lakes",
    description: "Store, safeguard, and analyze vast datasets and data types from various sources in a raw format.",
    items: ["Data ingestion", "Security & governance", "Metadata management"]
  },
  {
    title: "Data Mesh",
    description: "Empower domain experts by distributing data ownership within a scalable, decentralized framework.",
    items: ["Federated learning", "Data transformation", "Domain-driven design"]
  },
  {
    title: "Big Data Platforms",
    description: "Cloud-native and on-premises platforms handling large-scale processing needs efficiently.",
    items: ["Data cleaning", "Pipeline orchestration", "Cloud-agnostic solutions"]
  },
  {
    title: "Data Governance",
    description: "Create a unified virtual layer for management and self-service access across distributed environments.",
    items: ["Knowledge graphs", "Data catalogs", "DataOps"]
  }
];

const Services = () => {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <FadeIn>
          <div className="section-header">
            <h2 className="section-title">End-to-End Data Engineering Services</h2>
            <p className="section-intro">
              We create robust data ecosystems that centralize and organize your information, transforming raw inputs into actionable business value.
            </p>
          </div>
        </FadeIn>

        <div className="services-grid">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="service-card">
                <h3>{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <ul className="service-items">
                  {service.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
