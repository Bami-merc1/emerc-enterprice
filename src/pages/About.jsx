import './About.css';
import SEO from '../components/SEO';

const values = [
  { title: 'Security-first', desc: 'Every system we touch is built and reviewed with security as a baseline requirement, not an add-on.' },
  { title: 'Practical over flashy', desc: 'We ship solutions that hold up in production, not just in demos.' },
  { title: 'Clear communication', desc: 'Clients get straight answers about scope, risk, and timelines.' },
];

export default function About() {
  return (
    <>
      <SEO title="About Us" description="Learn about EMerc Enterprise — a service-driven tech organization built around security, depth, and reliability." />
      
      <section className="page-header">
        <div className="container">
          <p className="section-label">About us</p>
          <h1>A tech solutions company built around depth, not breadth for its own sake.</h1>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div>
            <h2>Who we are</h2>
            <p>
              EMerc Enterprise is a service-driven tech organization. We work
              across cybersecurity, infrastructure, software, data, and media
              production — helping organizations and individuals build systems
              that are secure, functional, and built to last.
            </p>
            <p>
              Our work spans application and network penetration testing,
              digital forensics, DevOps, bug bounty programs, networking and
              infrastructure engineering, data analysis, software application
              development, graphic design, and video editing.
            </p>
          </div>

          <div className="values-list">
            {values.map((v) => (
              <div key={v.title} className="value-item">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}