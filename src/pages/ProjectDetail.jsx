import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import SEO from '../components/SEO';
import NotFound from './NotFound';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const { getProjectById } = useProjects();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProjectById(id)
      .then((data) => {
        if (active) setProject(data);
      })
      .catch(() => {
        if (active) setNotFound(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [id]);

  if (loading) {
    return (
      <section className="section">
        <div className="container"><p>Loading project...</p></div>
      </section>
    );
  }

  if (notFound || !project) return <NotFound />;

  const cleanUrl = project.url ? project.url.replace(/^https?:\/\//, '') : '';
  const fullUrl = cleanUrl ? `https://${cleanUrl}` : '';

  return (
    <>
      <SEO title={project.title} description={project.description} />

      <section className="page-header">
        <div className="container">
          <Link to="/portfolio" className="back-link">&larr; Back to portfolio</Link>
          <p className="section-label">{project.category}</p>
          <h1>{project.title}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container project-detail">
          {project.image_url && (
            <img src={project.image_url} alt={project.title} className="project-detail-image" />
          )}

          <div className="project-detail-body">
            <h2>About this project</h2>
            <p>{project.description}</p>

            {project.url && (
              <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Visit {cleanUrl}
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}