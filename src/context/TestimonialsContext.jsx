import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';

const TestimonialsContext = createContext();

export function TestimonialsProvider({ children }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Public-facing: only approved testimonials
  const fetchApprovedTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false });
    if (!error) setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchApprovedTestimonials();

    const channel = supabase
      .channel('testimonials-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, () => {
        fetchApprovedTestimonials();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // Anyone can submit — always starts unapproved
  const submitTestimonial = async (testimonial) => {
    const { error } = await supabase
      .from('testimonials')
      .insert([{ ...testimonial, approved: false }]);
    if (error) throw error;
  };

  // Admin-only actions
  const addTestimonial = async (testimonial) => {
    const { error } = await supabase
      .from('testimonials')
      .insert([{ ...testimonial, approved: true }]);
    if (error) throw error;
  };

  const approveTestimonial = async (id) => {
    const { error } = await supabase
      .from('testimonials')
      .update({ approved: true })
      .eq('id', id);
    if (error) throw error;
  };

  const removeTestimonial = async (id) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) throw error;
  };

  // Admin-only: fetch everything, approved and pending
  const fetchAllTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  };

  return (
    <TestimonialsContext.Provider
      value={{
        testimonials,
        submitTestimonial,
        addTestimonial,
        approveTestimonial,
        removeTestimonial,
        fetchAllTestimonials,
        loading,
      }}
    >
      {children}
    </TestimonialsContext.Provider>
  );
}

export const useTestimonials = () => useContext(TestimonialsContext);