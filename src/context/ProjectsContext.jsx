import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';

const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setProjects(data);
    setLoading(false);
  };

    const getProjectById = async (id) => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    };

  useEffect(() => {
    fetchProjects();

    const channel = supabase
      .channel('projects-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        fetchProjects();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const uploadProjectImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('project-images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const addProject = async (project, imageFile) => {
    let image_url = null;
    if (imageFile) {
      image_url = await uploadProjectImage(imageFile);
    }
    const { error } = await supabase.from('projects').insert([{ ...project, image_url }]);
    if (error) throw error;
  };

  const updateProject = async (id, updates, imageFile) => {
    let image_url = updates.image_url;
    if (imageFile) {
      image_url = await uploadProjectImage(imageFile);
    }
    const { error } = await supabase
      .from('projects')
      .update({ ...updates, image_url })
      .eq('id', id);
    if (error) throw error;
  };

  const removeProject = async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
  };


  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, updateProject, removeProject, getProjectById, loading }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectsContext);