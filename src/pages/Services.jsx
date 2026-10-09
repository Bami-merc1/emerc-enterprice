import { Link } from 'react-router-dom';
import './Services.css';
import SEO from '../components/SEO';

const services = [
  {
    title: 'Cybersecurity',
    items: ['Application penetration testing', 'Network penetration testing', 'Digital forensics', 'Bug bounty programs'],
  },
  {
    title: 'DevOps',
    items: ['CI/CD pipeline design', 'Infrastructure automation', 'Release & deployment engineering'],
  },
  {
    title: 'Networking & Infrastructure Engineering',
    items: ['Network design & deployment', 'Infrastructure management', 'System reliability & monitoring'],
  },
  {
    title: 'Data Analysis',
    items: ['Data cleaning & processing', 'Reporting & dashboards', 'Insight-driven recommendations'],
  },
  {
    title: 'Software Application Development',
    items: ['Web applications', 'Custom internal tools', 'API design & integration'],
  },
  {
    title: 'Graphic Design & Video Editing',
    items: ['Brand & visual identity', 'Marketing graphics', 'Video production & editing'],
  },
];

export default function Services() {
  return (
    <>
      <SEO title="Services" description="Explore EMerc Enterprise's full range of services: cybersecurity, DevOps, networking, data analysis, software development, and media production." />
      
      <section className="page-header">
        <div className="container">
          <p className="section-label">Our services</p>
          <h1>Full-stack technology services, delivered end to end.</h1>
        </div>
      </section>

      <section className="section">
        <div className="container services-list">
          {services.map((s) => (
            <div key={s.title} className="service-block">
              <h2>{s.title}</h2>
              <ul>
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="container services-cta">
          <p>Not sure which service fits your need?</p>
          <Link to="/contact" className="btn btn-primary">Talk to our team</Link>
        </div>
      </section>
    </>
  );
}