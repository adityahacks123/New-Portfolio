import './Socials.css';

const Socials = () => {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/adityasingh",
      icon: "🐙",
      description: "Check out my code repositories"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/adityasingh",
      icon: "💼",
      description: "Connect with me professionally"
    },
    {
      name: "Codolio",
      url: "https://codolio.com/adityasingh",
      icon: "👨‍💻",
      description: "View my developer portfolio"
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/adityasingh",
      icon: "💻",
      description: "View my coding solutions"
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
        <h2 className="socials-title">Let's Connect</h2>
        <p className="socials-subtitle">Find me on these platforms</p>
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
