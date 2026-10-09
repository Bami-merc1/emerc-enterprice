import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h3>EMerc <span>Enterprise</span></h3>
          <p>Tech solutions across security, infrastructure, data, and software.</p>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/team">Team</Link>
        </div>

        <div className="footer-col">
          <h4>Get in touch</h4>
          <Link to="/contact">Contact us</Link>
          <Link to="/contact#testimonial-form">Submit a review</Link>
          <a href="mailto:hello@emerc.site">hello@emerc.site</a>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>&copy; {year} EMerc Enterprise. All rights reserved.</p>
      </div>
    </footer>
  );
}