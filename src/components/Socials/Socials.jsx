import './Socials.css';

const Socials = () => {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/adityahacks123",
      icon: "🐙",
      description: "Check out my code repositories"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/aditya-singh-ba42b2310",
      icon: "💼",
      description: "Connect with me professionally"
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/adityahacks123",
      icon: "💻",
      description: "View my coding solutions"
    },
    {
      name: "Codolio",
      url: "https://codolio.com/profile/adityahacks123",
      icon: "👨‍💻",
      description: "View my complete profile - coding, web development & more"
    },
    {
      name: "Resume",
      url: "/resume.pdf",
      icon: "📄",
      description: "Download my resume"
    }
  ];

  return (
    <div className="socials-page">
      <div className="socials-container">
        <h2 className="socials-title">My Coding Profiles</h2>
        <p className="socials-subtitle">Connect with me across platforms</p>
        <div className="socials-grid">
          {socialLinks.map((social, index) => (
            <a 
              key={index} 
              href={social.url} 
              className="social-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="social-icon">{social.icon}</div>
              <h3 className="social-name">{social.name}</h3>
              <p className="social-description">{social.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Socials;
