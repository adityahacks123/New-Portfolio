import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('resume');
  
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/adityasingh', icon: 'github' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/adityasingh', icon: 'linkedin' },
    { name: 'Twitter', url: 'https://twitter.com/adityasingh', icon: 'twitter' },
  ];

  const resumeSections = [
    {
      title: 'Experience',
      items: [
        {
          role: 'Frontend Developer',
          company: 'Tech Solutions Inc.',
          period: '2022 - Present',
          description: 'Developed and maintained responsive web applications using React and modern JavaScript.'
        },
        {
          role: 'UI/UX Designer',
          company: 'Digital Creations',
          period: '2020 - 2022',
          description: 'Designed and prototyped user interfaces for web and mobile applications.'
        }
      ]
    },
    {
      title: 'Education',
      items: [
        {
          degree: 'B.Tech in Computer Science',
          institution: 'Delhi Technological University',
          period: '2016 - 2020'
        }
      ]
    },
    {
      title: 'Skills',
      items: [
        { name: 'React', level: '90%' },
        { name: 'JavaScript', level: '85%' },
        { name: 'HTML/CSS', level: '95%' },
        { name: 'Node.js', level: '75%' },
        { name: 'UI/UX Design', level: '80%' }
      ]
    }
  ];

  return (
    <div className="lets-connect">
      <div className="connect-grid">
        {/* Left Section - Contact Form */}
        <div className="contact-section">
          <h2>Let's Connect</h2>
          <p>Feel free to reach out for collaborations or just a friendly hello!</p>
          
          <form className="contact-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <textarea
                placeholder="Your Message"
                rows="4"
                className="form-textarea"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
          
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
        
        {/* Right Section - Resume */}
        <div className="resume-section">
          <div className="resume-tabs">
            <button 
              className={`tab-btn ${activeTab === 'resume' ? 'active' : ''}`}
              onClick={() => setActiveTab('resume')}
            >
              Resume
            </button>
            <button 
              className={`tab-btn ${activeTab === 'cv' ? 'active' : ''}`}
              onClick={() => setActiveTab('cv')}
            >
              Download CV
            </button>
          </div>
          
          {activeTab === 'resume' ? (
            <div className="resume-content">
              {resumeSections.map((section, index) => (
                <div key={index} className="resume-section-item">
                  <h3>{section.title}</h3>
                  {section.items.map((item, i) => (
                    <div key={i} className="resume-item">
                      {item.role && (
                        <div className="resume-header">
                          <h4>{item.role}</h4>
                          {item.company && <span className="company">{item.company}</span>}
                          {item.period && <span className="period">{item.period}</span>}
                        </div>
                      )}
                      {item.degree && (
                        <div className="resume-header">
                          <h4>{item.degree}</h4>
                          <span className="institution">{item.institution}</span>
                          <span className="period">{item.period}</span>
                        </div>
                      )}
                      {item.name && (
                        <div className="skill-item">
                          <span className="skill-name">{item.name}</span>
                          <div className="skill-bar">
                            <div 
                              className="skill-level" 
                              style={{ width: item.level }}
                            ></div>
                          </div>
                        </div>
                      )}
                      {item.description && <p>{item.description}</p>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="cv-download">
              <div className="cv-preview">
                <i className="fas fa-file-pdf"></i>
                <span>My_Resume.pdf</span>
              </div>
              <button className="download-btn">
                <i className="fas fa-download"></i> Download CV
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
