import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." />
      <section className="not-found">
        <div className="container">
          <p className="section-label">404</p>
          <h1>This page doesn't exist.</h1>
          <p>The link may be broken, or the page may have moved.</p>
          <Link to="/" className="btn btn-primary">Back to home</Link>
        </div>
      </section>
    </>
  );
}