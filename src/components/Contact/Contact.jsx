import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Input limits
  const limits = {
    name: { max: 100 },
    email: { max: 100 },
    message: { min: 10, max: 1000 }
  };
  
  // Validation function
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (name === 'email' && !value) {
      newErrors.email = 'Email is required';
    } else if (name === 'email' && value.length > limits.email.max) {
      newErrors.email = `Email must be less than ${limits.email.max} characters`;
    } else if (name === 'email') {
      delete newErrors.email;
    }
    
    if (name === 'name' && !value.trim()) {
      newErrors.name = 'Name is required';
    } else if (name === 'name' && value.length > limits.name.max) {
      newErrors.name = `Name must be less than ${limits.name.max} characters`;
    } else if (name === 'name') {
      delete newErrors.name;
    }
    
    if (name === 'message' && value.length < limits.message.min) {
      newErrors.message = `Message must be at least ${limits.message.min} characters`;
    } else if (name === 'message' && value.length > limits.message.max) {
      newErrors.message = `Message must be less than ${limits.message.max} characters`;
    } else if (name === 'message' && !value.trim()) {
      newErrors.message = 'Message is required';
    } else if (name === 'message') {
      delete newErrors.message;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.message &&
      formData.name.length <= limits.name.max &&
      formData.email.length <= limits.email.max &&
      formData.message.length >= limits.message.min &&
      formData.message.length <= limits.message.max &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    );
  };
  
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/adityahacks123', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/aditya-singh-ba42b2310', icon: 'linkedin' },
    { name: 'LeetCode', url: 'https://leetcode.com/u/adityahacks123', icon: 'code' },
    { name: 'Codolio', url: 'https://codolio.com/profile/adityahacks123', icon: 'laptop-code' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Validate the field that changed
      if (touched[name]) {
        validateField(name, value);
      }
      
      return newData;
    });
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched to show errors
    const newTouched = {};
    Object.keys(formData).forEach(key => {
      newTouched[key] = true;
    });
    setTouched(newTouched);
    
    // Validate all fields
    let isValid = true;
    Object.entries(formData).forEach(([key, value]) => {
      if (!validateField(key, value)) {
        isValid = false;
      }
    });
    
    if (!isValid || !isFormValid()) {
      return; // Don't submit if validation fails
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mvgwqrrk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });
      
      if (response.ok) {
        alert('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Oops! Something went wrong. Please try again later or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCV = () => {
    setIsDownloading(true);
    
    // Create a temporary link element
    const link = document.createElement('a');
    
  // Path to the CV file in the public folder (unified filename)
  const cvPath = '/resume.pdf'; // Make sure the file exists in the public folder

  // Set the link's properties
  link.href = cvPath;
  link.download = 'Aditya_Singh_Resume.pdf'; // Download will save as this filename
    
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
          
          {/* Contact Info */}
          <div className="contact-info">
            <a href="tel:+919569595568" className="contact-info-item">
              <i className="fas fa-phone"></i>
              <div className="contact-info-text">
                <span className="contact-label">Phone Number</span>
                <span className="contact-value">+91 9569595568</span>
              </div>
            </a>
            <a href="mailto:adityasingh30112020@gmail.com" className="contact-info-item">
              <i className="fas fa-envelope"></i>
              <div className="contact-info-text">
                <span className="contact-label">Email Address</span>
                <span className="contact-value">adityasingh30112020@gmail.com</span>
              </div>
            </a>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="input-container">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className={`form-input ${touched.name && errors.name ? 'error' : ''}`}
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  maxLength={limits.name.max}
                  required
                />
                {touched.name && (
                  <div className="input-helper">
                    <span className={`char-count ${formData.name.length > limits.name.max * 0.8 ? 'warning' : ''}`}>
                      {formData.name.length}/{limits.name.max}
                    </span>
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>
                )}
              </div>
            </div>
            
            <div className="form-group">
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className={`form-input ${touched.email && errors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  maxLength={limits.email.max}
                  required
                />
                {touched.email && (
                  <div className="input-helper">
                    <span className={`char-count ${formData.email.length > limits.email.max * 0.8 ? 'warning' : ''}`}>
                      {formData.email.length}/{limits.email.max}
                    </span>
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                )}
              </div>
            </div>
            
            <div className="form-group">
              <div className="input-container">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  className={`form-textarea ${touched.message && errors.message ? 'error' : ''}`}
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  minLength={limits.message.min}
                  maxLength={limits.message.max}
                  required
                ></textarea>
                <div className="input-helper">
                  <span className={`char-count ${formData.message.length > limits.message.max * 0.8 ? 'warning' : ''}`}>
                    {formData.message.length}/{limits.message.max}
                  </span>
                  {touched.message && errors.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting || !isFormValid()}
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
              <span>resume.pdf</span>
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
