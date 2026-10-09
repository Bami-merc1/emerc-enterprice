import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import SEO from '../components/SEO';
import { useTestimonials } from '../context/TestimonialsContext';
import { useEffect } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const { submitTestimonial } = useTestimonials();
  const [testimonialForm, setTestimonialForm] = useState({ client_name: '', client_role: '', quote: '' });
  const [testimonialStatus, setTestimonialStatus] = useState('idle');

  const handleTestimonialChange = (e) => {
    setTestimonialForm({ ...testimonialForm, [e.target.name]: e.target.value });
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    setTestimonialStatus('sending');
    try {
      await submitTestimonial(testimonialForm);
      setTestimonialStatus('sent');
      setTestimonialForm({ client_name: '', client_role: '', quote: '' });
    } catch (err) {
      console.error(err);
      setTestimonialStatus('error');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  useEffect(() => {
    if (window.location.hash === '#testimonial-form') {
      const el = document.getElementById('testimonial-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <>
      <SEO title="Contact" description="Get in touch with EMerc Enterprise to discuss your next project." />
      
      <section className="page-header">
        <div className="container">
          <p className="section-label">Contact</p>
          <h1>Let's talk about your project.</h1>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2>Get in touch</h2>
            <p>hello@emerc.site</p>
            <p>Available for remote engagements worldwide.</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </label>

            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>

            <label>
              Message
              <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
            </label>

            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send message'}
            </button>

            {status === 'sent' && (
              <p className="form-success">Message sent — we'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="form-error">Something went wrong — please try again or email us directly.</p>
            )}
          </form>
        </div>
      </section>

      <section className="section section-alt" id="testimonial-form"></section>
      
      <section className="section section-alt">
        <div className="container">
          <p className="section-label">Worked with us?</p>
          <h2>Share your experience</h2>
          <p className="testimonial-intro">
            Your feedback helps others understand what it's like to work with us.
            Submitted testimonials are reviewed before appearing on the site.
          </p>

          <form className="contact-form testimonial-form" onSubmit={handleTestimonialSubmit}>
            <label>
              Your name
              <input
                type="text"
                name="client_name"
                value={testimonialForm.client_name}
                onChange={handleTestimonialChange}
                required
              />
            </label>

            <label>
              Role / company (optional)
              <input
                type="text"
                name="client_role"
                value={testimonialForm.client_role}
                onChange={handleTestimonialChange}
              />
            </label>

            <label>
              Your feedback
              <textarea
                name="quote"
                rows="4"
                value={testimonialForm.quote}
                onChange={handleTestimonialChange}
                required
              />
            </label>

            <button type="submit" className="btn btn-primary" disabled={testimonialStatus === 'sending'}>
              {testimonialStatus === 'sending' ? 'Submitting...' : 'Submit feedback'}
            </button>

            {testimonialStatus === 'sent' && (
              <p className="form-success">Thank you — your feedback is pending review.</p>
            )}
            {testimonialStatus === 'error' && (
              <p className="form-error">Something went wrong — please try again.</p>
            )}
          </form>
        </div>
      </section>


    </>
  );
}