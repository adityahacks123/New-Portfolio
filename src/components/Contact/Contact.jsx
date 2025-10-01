import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setStatus('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
    
    // Reset status message after 3 seconds
    setTimeout(() => setStatus(''), 3000);
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/adityasingh', icon: 'github' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/adityasingh', icon: 'linkedin' },
    { name: 'Twitter', url: 'https://twitter.com/adityasingh', icon: 'twitter' },
    { name: 'Email', url: 'mailto:aditya@example.com', icon: 'mail' },
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Get In Touch</h2>
          <p>Have a project in mind or want to chat? Feel free to reach out!</p>
        </div>

        <div className="contact-content">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Hi Aditya, I'd like to talk about..."
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>

            {status && <div className="status-message">{status}</div>}
          </form>

          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>Feel free to reach out through any of these platforms:</p>
            
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className={`fab fa-${social.icon}`}></i>
                  <span>{social.name}</span>
                </a>
              ))}
            </div>

            <div className="contact-details">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>aditya@example.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+1 (123) 456-7890</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
