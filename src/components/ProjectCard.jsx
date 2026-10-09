import { Link } from 'react-router-dom';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  return (
    <Link to={`/portfolio/${project.id}`} className="project-card">
      {project.image_url && (
        <img src={project.image_url} alt={project.title} className="project-image" />
      )}
      <p className="project-category">{project.category}</p>
      <h3>{project.title}</h3>
      <p className="project-desc">{project.description}</p>
      <span className="project-link">View case study</span>
    </Link>
  );
}