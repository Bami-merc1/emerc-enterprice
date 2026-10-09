import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';

const TeamContext = createContext();

export function TeamProvider({ children }) {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeam = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('team')
      .select('*')
      .order('created_at', { ascending: true });
    if (!error) setTeam(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTeam();

    const channel = supabase
      .channel('team-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'team' }, () => {
        fetchTeam();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const uploadTeamPhoto = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('team-photos')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('team-photos').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const addMember = async (member, photoFile) => {
    let photo_url = null;
    if (photoFile) {
      photo_url = await uploadTeamPhoto(photoFile);
    }
    const { error } = await supabase.from('team').insert([{ ...member, photo_url }]);
    if (error) throw error;
  };

  const updateMember = async (id, updates, photoFile) => {
    let photo_url = updates.photo_url;
    if (photoFile) {
      photo_url = await uploadTeamPhoto(photoFile);
    }
    const { error } = await supabase
      .from('team')
      .update({ ...updates, photo_url })
      .eq('id', id);
    if (error) throw error;
  };

  const removeMember = async (id) => {
    const { error } = await supabase.from('team').delete().eq('id', id);
    if (error) throw error;
  };

  return (
    <TeamContext.Provider value={{ team, addMember, updateMember, removeMember, loading }}>
      {children}
    </TeamContext.Provider>
  );
}

export const useTeam = () => useContext(TeamContext);