import { useState, useMemo } from 'react';
import { useProjects } from '../context/ProjectsContext';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';
import './Portfolio.css';

export default function Portfolio() {
  const { projects, loading } = useProjects();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const unique = new Set(projects.map((p) => p.category).filter(Boolean));
    return ['All', ...unique];
  }, [projects]);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <SEO title="Portfolio" description="See the tools and platforms built by EMerc Enterprise, including Steganaliz and EmercIntel." />

      <section className="page-header">
        <div className="container">
          <p className="section-label">Portfolio</p>
          <h1>Tools and platforms we've built.</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!loading && categories.length > 2 && (
            <div className="filter-bar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading && <p className="empty-state">Loading projects...</p>}
          {!loading && filtered.length === 0 && (
            <p className="empty-state">
              {projects.length === 0 ? 'Projects will be listed here soon.' : 'No projects in this category yet.'}
            </p>
          )}
          {!loading && filtered.length > 0 && (
            <div className="portfolio-grid">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}