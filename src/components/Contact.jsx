import React, { useRef, useState, forwardRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Mail, Loader2, Github, Instagram, Linkedin, Twitter, ExternalLink } from 'lucide-react';

const Contact = forwardRef(({ scrollPosition }, ref) => {
  // Remove the ref || useRef() logic since we're using forwardRef
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const formOpacity = Math.min(Math.max((scrollPosition - window.innerHeight * 2.3) / 500, 0), 1);

  // Rest of your validation logic remains the same
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
          formRef.current, // Use formRef here
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
            toast.error('Failed to send message. Please try again.');
          }
        )
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // Social links remain the same
  const socialLinks = [
    { icon: Github, href: 'https://github.com/msdharani1', label: 'GitHub' },
    { icon: Instagram, href: 'https://instagram.com/msdharani1', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/in/tharanimca', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/msdharani007', label: 'Twitter' },
    { icon: ExternalLink, href: 'https://msdharani.com', label: 'Portfolio' }
  ];

  return (
    <section
      ref={ref} // This ref is for the section
      className="relative min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 py-20 px-4 md:px-8 overflow-hidden"
      style={{
        opacity: formOpacity,
        transition: 'opacity 0.5s ease'
      }}
    >
      {/* Background Elements and Header remain the same */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="inline-block text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-6">
            Get in Touch
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-20">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Contact Form</h3>
            </div>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              {/* Form inputs remain the same */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500/50 text-white placeholder-gray-400 transition-colors"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500/50 text-white placeholder-gray-400 transition-colors"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-500/50 text-white placeholder-gray-400 transition-colors resize-none"
                ></textarea>
                {errors.message && (
                  <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer remains the same */}
        <footer className="relative mt-auto pt-12 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center gap-6 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-500 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>

            <div className="text-gray-400 text-sm pb-8">
              <p>© {new Date().getFullYear()} Tharani M. All rights reserved.</p>
              <p className="mt-2">
                Made with passion and{' '}
                <span className="text-cyan-500">{'<code />'}</span>
              </p>
            </div>
          </div>
        </footer>
      </div>

      <ToastContainer
        position="bottom-right"
        theme="dark"
        className="!bg-slate-800/90 !text-white"
      />
    </section>
  );
});

export default Contact;