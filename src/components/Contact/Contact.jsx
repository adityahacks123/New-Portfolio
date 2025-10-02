import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/adityahacks123', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aditya-singh-ba42b2310', icon: 'linkedin' },
    { name: 'LeetCode', url: 'https://leetcode.com/u/adityahacks123', icon: 'code' },
    { name: 'Codolio', url: 'https://codolio.com/profile/adityahacks123', icon: 'laptop-code' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleDownloadCV = () => {
    setIsDownloading(true);
    
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Replace this path with the actual path to your CV file in the public folder
    const cvPath = '/Aditya_Singh_Resume.pdf'; // Make sure the file exists in the public folder
    
    // Set the link's properties
    link.href = cvPath;
    link.download = 'Aditya_Singh_Resume.pdf'; // Name of the downloaded file
    
    // Append to body, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset the loading state after a short delay
    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };
  
  return (
    <div className="lets-connect">
      <div className="connect-grid">
        {/* Left Section - Contact Form */}
        <div className="contact-section">
          <h2>Let's Connect</h2>
          <p>Feel free to reach out for collaborations or just a friendly hello!</p>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="form-input"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                className="form-textarea"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : 'Send Message'}
            </button>
          </form>
          
          {/* Social Links */}
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={social.name}
              >
                <i className={`fab fa-${social.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
        
        {/* Right Section - Simple Download CV */}
        <div className="cv-section">
          <div className="cv-card">
            <div className="cv-icon">
              <i className="fas fa-file-pdf"></i>
            </div>
            <h3>Download My CV</h3>
            <p>Get a copy of my professional resume in PDF format</p>
            <div className="file-info">
              <i className="fas fa-file-pdf"></i>
              <span>Aditya_Singh_Resume.pdf</span>
              <span className="file-size">(2.4 MB)</span>
            </div>
            <button 
              className={`download-cv-btn ${isDownloading ? 'downloading' : ''}`}
              onClick={handleDownloadCV}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Downloading...
                </>
              ) : (
                <>
                  <i className="fas fa-download"></i> Download CV
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
