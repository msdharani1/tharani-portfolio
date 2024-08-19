import React, { useRef, useState, useEffect, forwardRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = forwardRef(({ scrollPosition }, ref) => {
  const form = ref || useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const formOpacity = Math.min(Math.max((scrollPosition - window.innerHeight * 2.3) / 500, 0), 1);

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      emailjs
        .sendForm(
          'service_aw3ot9o',
          'template_jzdikba',
          form.current,
          'CpEYd3IAjVQ4bb09T'
        )
        .then(
          (result) => {
            console.log('SUCCESS!', result.text);
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
          },
          (error) => {
            console.log('FAILED...', error);
            toast.error(`Failed to send message: ${error.text}. Please try again or contact the administrator.`);
          }
        )
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="contact">
      <div 
        className="contact-container" 
        style={{ 
          opacity: formOpacity,
        }}
      >
        <form ref={form} onSubmit={sendEmail}>
          <h2>Contact Me</h2>
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="c-error-message">{errors.name}</p>}
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="c-error-message">{errors.email}</p>}
          <textarea 
            name="message" 
            placeholder="Message" 
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          {errors.message && <p className="c-error-message">{errors.message}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              'Send'
            )}
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-right" className="custom-toast-container" />
    </div>
  );
});

export default Contact;
