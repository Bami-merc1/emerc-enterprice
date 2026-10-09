import { useTeam } from '../context/TeamContext';
import './Team.css';
import SEO from '../components/SEO';

export default function Team() {
  const { team, loading } = useTeam();

  return (
    <>
      <SEO title="Our Team" description="Meet the people behind EMerc Enterprise." />
      
      <section className="page-header">
        <div className="container">
          <p className="section-label">Our team</p>
          <h1>The people behind EMerc Enterprise.</h1>
        </div>
      </section>

      <section className="section">
        <div className="container team-grid">
          {loading && <p>Loading team...</p>}
          {!loading && team.length === 0 && <p>Team members will be listed here soon.</p>}
          {team.map((member) => (
            <div key={member.id} className="team-card">
              {member.photo_url ? (
                <img src={member.photo_url} alt={member.name} className="team-photo" />
              ) : (
                <div className="team-avatar" aria-hidden="true">
                  {member.name?.charAt(0) || '?'}
                </div>
              )}
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}