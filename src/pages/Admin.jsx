import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectsContext';
import { useTeam } from '../context/TeamContext';
import { useTestimonials } from '../context/TestimonialsContext';
import './Admin.css';
import { useState, useEffect } from 'react';


export default function Admin() {
  const { user, checking, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed — check your email and password.');
    }
  };

  if (checking) {
    return (
      <section className="section admin-login">
        <div className="container"><p>Checking login status...</p></div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="section admin-login">
        <div className="container login-box">
          <h1>Admin login</h1>
          <form onSubmit={handleLogin}>
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit" className="btn btn-primary">Log in</button>
            {error && <p className="admin-error">{error}</p>}
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="admin-topbar">
          <h1>Admin dashboard</h1>
          <button className="btn btn-outline-dark" onClick={logout}>Log out</button>
        </div>

        <ProjectsManager />
        <TeamManager />
        <TestimonialsManager />
      </div>
    </section>
  );
}

function ProjectsManager() {
  const { projects, addProject, updateProject, removeProject } = useProjects();
  const [form, setForm] = useState({ title: '', url: '', category: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editImageFile, setEditImageFile] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setUploading(true);
    try {
      await addProject(form, imageFile);
      setForm({ title: '', url: '', category: '', description: '' });
      setImageFile(null);
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert('Failed to add project — check console for details.');
    } finally {
      setUploading(false);
    }
  };

  const startEdit = (project) => {
    setEditingId(project.id);
    setEditForm({
      title: project.title || '',
      url: project.url || '',
      category: project.category || '',
      description: project.description || '',
      image_url: project.image_url || null,
    });
    setEditImageFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
    setEditImageFile(null);
  };

  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSaveEdit = async (id) => {
    setUploading(true);
    try {
      await updateProject(id, editForm, editImageFile);
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert('Failed to update project — check console for details.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-block">
      <h2 className="admin-subheading">Portfolio projects</h2>

      <form className="admin-form" onSubmit={handleAdd}>
        <label>
          Project title
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          URL (e.g. steganaliz.emerc.site)
          <input type="text" name="url" value={form.url} onChange={handleChange} />
        </label>
        <label>
          Category
          <input type="text" name="category" value={form.category} onChange={handleChange} />
        </label>
        <label>
          Description
          <textarea name="description" rows="3" value={form.description} onChange={handleChange} />
        </label>
        <label>
          Project image
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
        </label>
        <button type="submit" className="btn btn-primary" disabled={uploading}>
          {uploading ? 'Adding...' : 'Add project'}
        </button>
      </form>

      <div className="admin-list">
        {projects.length === 0 && <p>No projects yet.</p>}
        {projects.map((p) =>
          editingId === p.id ? (
            <div key={p.id} className="admin-item admin-item-editing">
              <div className="admin-edit-form">
                <label>
                  Title
                  <input type="text" name="title" value={editForm.title} onChange={handleEditChange} />
                </label>
                <label>
                  URL
                  <input type="text" name="url" value={editForm.url} onChange={handleEditChange} />
                </label>
                <label>
                  Category
                  <input type="text" name="category" value={editForm.category} onChange={handleEditChange} />
                </label>
                <label>
                  Description
                  <textarea name="description" rows="3" value={editForm.description} onChange={handleEditChange} />
                </label>
                <label>
                  Replace image (optional)
                  <input type="file" accept="image/*" onChange={(e) => setEditImageFile(e.target.files[0])} />
                </label>
                <div className="admin-edit-actions">
                  <button className="btn btn-primary" onClick={() => handleSaveEdit(p.id)} disabled={uploading}>
                    {uploading ? 'Saving...' : 'Save changes'}
                  </button>
                  <button className="btn btn-outline-dark" onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            </div>
          ) : (
            <div key={p.id} className="admin-item">
              <div className="admin-item-info">
                {p.image_url && <img src={p.image_url} alt={p.title} className="admin-thumb" />}
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.category}</p>
                </div>
              </div>
              <div className="admin-item-actions">
                <button className="btn-edit" onClick={() => startEdit(p)}>Edit</button>
                <button className="btn-remove" onClick={() => removeProject(p.id)}>Remove</button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function TeamManager() {
  const { team, addMember, updateMember, removeMember } = useTeam();
  const [form, setForm] = useState({ name: '', role: '' });
  const [photoFile, setPhotoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editPhotoFile, setEditPhotoFile] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setUploading(true);
    try {
      await addMember(form, photoFile);
      setForm({ name: '', role: '' });
      setPhotoFile(null);
      e.target.reset();
    } catch (err) {
      console.error(err);
      alert('Failed to add team member — check console for details.');
    } finally {
      setUploading(false);
    }
  };

  const startEdit = (member) => {
    setEditingId(member.id);
    setEditForm({
      name: member.name || '',
      role: member.role || '',
      photo_url: member.photo_url || null,
    });
    setEditPhotoFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
    setEditPhotoFile(null);
  };

  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSaveEdit = async (id) => {
    setUploading(true);
    try {
      await updateMember(id, editForm, editPhotoFile);
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert('Failed to update team member — check console for details.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-block">
      <h2 className="admin-subheading">Team members</h2>

      <form className="admin-form" onSubmit={handleAdd}>
        <label>
          Name
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Role
          <input type="text" name="role" value={form.role} onChange={handleChange} />
        </label>
        <label>
          Photo
          <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files[0])} />
        </label>
        <button type="submit" className="btn btn-primary" disabled={uploading}>
          {uploading ? 'Adding...' : 'Add team member'}
        </button>
      </form>

      <div className="admin-list">
        {team.length === 0 && <p>No team members yet.</p>}
        {team.map((m) =>
          editingId === m.id ? (
            <div key={m.id} className="admin-item admin-item-editing">
              <div className="admin-edit-form">
                <label>
                  Name
                  <input type="text" name="name" value={editForm.name} onChange={handleEditChange} />
                </label>
                <label>
                  Role
                  <input type="text" name="role" value={editForm.role} onChange={handleEditChange} />
                </label>
                <label>
                  Replace photo (optional)
                  <input type="file" accept="image/*" onChange={(e) => setEditPhotoFile(e.target.files[0])} />
                </label>
                <div className="admin-edit-actions">
                  <button className="btn btn-primary" onClick={() => handleSaveEdit(m.id)} disabled={uploading}>
                    {uploading ? 'Saving...' : 'Save changes'}
                  </button>
                  <button className="btn btn-outline-dark" onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            </div>
          ) : (
            <div key={m.id} className="admin-item">
              <div className="admin-item-info">
                {m.photo_url && <img src={m.photo_url} alt={m.name} className="admin-thumb" />}
                <div>
                  <h3>{m.name}</h3>
                  <p>{m.role}</p>
                </div>
              </div>
              <div className="admin-item-actions">
                <button className="btn-edit" onClick={() => startEdit(m)}>Edit</button>
                <button className="btn-remove" onClick={() => removeMember(m.id)}>Remove</button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function TestimonialsManager() {
  const { addTestimonial, approveTestimonial, removeTestimonial, fetchAllTestimonials } = useTestimonials();
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [form, setForm] = useState({ client_name: '', client_role: '', quote: '' });
  const [saving, setSaving] = useState(false);

  const loadAll = async () => {
    try {
      const data = await fetchAllTestimonials();
      setAllTestimonials(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.client_name.trim() || !form.quote.trim()) return;
    setSaving(true);
    try {
      await addTestimonial(form);
      setForm({ client_name: '', client_role: '', quote: '' });
      await loadAll();
    } catch (err) {
      console.error(err);
      alert('Failed to add testimonial — check console for details.');
    } finally {
      setSaving(false);
    }
  };

  const handleApprove = async (id) => {
    await approveTestimonial(id);
    await loadAll();
  };

  const handleRemove = async (id) => {
    await removeTestimonial(id);
    await loadAll();
  };

  const pending = allTestimonials.filter((t) => !t.approved);
  const approved = allTestimonials.filter((t) => t.approved);

  return (
    <div className="admin-block">
      <h2 className="admin-subheading">Testimonials</h2>

      <form className="admin-form" onSubmit={handleAdd}>
        <label>
          Client name
          <input type="text" name="client_name" value={form.client_name} onChange={handleChange} required />
        </label>
        <label>
          Client role / company
          <input type="text" name="client_role" value={form.client_role} onChange={handleChange} />
        </label>
        <label>
          Quote
          <textarea name="quote" rows="3" value={form.quote} onChange={handleChange} required />
        </label>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Adding...' : 'Add testimonial directly (auto-approved)'}
        </button>
      </form>

      {pending.length > 0 && (
        <>
          <h3 className="admin-subheading admin-subheading-small">Pending review ({pending.length})</h3>
          <div className="admin-list">
            {pending.map((t) => (
              <div key={t.id} className="admin-item">
                <div>
                  <h3>{t.client_name}</h3>
                  <p>{t.client_role}</p>
                  <p className="admin-quote-preview">"{t.quote}"</p>
                </div>
                <div className="admin-item-actions">
                  <button className="btn-edit" onClick={() => handleApprove(t.id)}>Approve</button>
                  <button className="btn-remove" onClick={() => handleRemove(t.id)}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <h3 className="admin-subheading admin-subheading-small">Published ({approved.length})</h3>
      <div className="admin-list">
        {approved.length === 0 && <p>No published testimonials yet.</p>}
        {approved.map((t) => (
          <div key={t.id} className="admin-item">
            <div>
              <h3>{t.client_name}</h3>
              <p>{t.client_role}</p>
            </div>
            <button className="btn-remove" onClick={() => handleRemove(t.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}