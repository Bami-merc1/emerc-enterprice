import { Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';
import './Home.css';
import { useTestimonials } from '../context/TestimonialsContext';

const services = [
  { title: 'Cybersecurity', desc: 'Application & network pentesting, digital forensics, bug bounties.' },
  { title: 'DevOps', desc: 'CI/CD pipelines, infrastructure automation, release engineering.' },
  { title: 'Networking & Infrastructure', desc: 'Design, deployment, and management of resilient network systems.' },
  { title: 'Data Analysis', desc: 'Turning raw data into decisions with clear, actionable reporting.' },
  { title: 'Software Development', desc: 'Web and application development built for real-world use.' },
  { title: 'Graphic Design & Video Editing', desc: 'Visual identity, media production, and post-production.' },
];

const stats = [
  { value: '6', label: 'Service areas covered' },
  { value: '2+', label: 'Platforms built' },
  { value: '100%', label: 'Remote-ready delivery' },
];

export default function Home() {
  const { projects } = useProjects();
  const { testimonials } = useTestimonials();
  const featured = projects.slice(0, 2);

  return (
    <>
      <SEO
        title="Home"
        description="EMerc Enterprise delivers cybersecurity, DevOps, networking, data analysis, software development, and creative media services."
      />

      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <p className="section-label">EMerc Enterprise</p>
            <h1>Tech solutions built for security, scale, and real results.</h1>
            <p className="hero-sub">
              We design, secure, and build the systems organizations run on —
              from network infrastructure to custom software, backed by a
              team that treats security as a first principle, not an afterthought.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">Start a project</Link>
              <Link to="/services" className="btn btn-outline">Our services</Link>
            </div>
          </div>

          <div className="hero-panel" aria-hidden="true">
            <div className="hero-panel-line"><span>$</span> scanning target...</div>
            <div className="hero-panel-line"><span>$</span> forensics: image mounted</div>
            <div className="hero-panel-line"><span>$</span> pipeline: deploy succeeded</div>
            <div className="hero-panel-line"><span>$</span> status: <em>all systems secure</em></div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container stats-inner">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-label">What we do</p>
          <h2>Solutions across the full tech stack</h2>
          <div className="services-grid">
            {services.map((s) => (
              <div key={s.title} className="service-item">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <p className="section-label">Recent work</p>
            <h2>Selected projects</h2>
            <div className="projects-grid">
              {featured.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
            <Link to="/portfolio" className="btn btn-outline-dark view-all">
              View full portfolio
            </Link>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <p className="section-label">What clients say</p>
            <h2>Trusted by the people we've worked with</h2>
            <div className="testimonials-grid">
              {testimonials.map((t) => (
                <div key={t.id} className="testimonial-card">
                  <p className="testimonial-quote">"{t.quote}"</p>
                  <p className="testimonial-name">{t.client_name}</p>
                  {t.client_role && <p className="testimonial-role">{t.client_role}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="cta">
        <div className="container cta-inner">
          <h2>Ready to secure and scale your systems?</h2>
          <Link to="/contact" className="btn btn-primary">Talk to us</Link>
        </div>
      </section>
    </>
  );
}