import React, { useEffect, useRef } from 'react';
import './Skills.css';
import { 
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, 
  FaPython, FaDocker, FaAws, FaFigma, FaGithub 
} from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiExpress, SiMongodb, SiPostgresql, SiTailwindcss } from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend",
      icon: "💻",
      skills: [
        { name: "React", level: 90, icon: <FaReact /> },
        { name: "JavaScript", level: 92, icon: <FaJs /> },
        { name: "TypeScript", level: 85, icon: <SiTypescript /> },
        { name: "HTML5", level: 95, icon: <FaHtml5 /> },
        { name: "CSS3", level: 90, icon: <FaCss3Alt /> },
        { name: "Tailwind CSS", level: 88, icon: <SiTailwindcss /> },
        { name: "Next.js", level: 85, icon: <SiNextdotjs /> }
      ]
    },
    {
      category: "Backend",
      icon: "⚙️",
      skills: [
        { name: "Node.js", level: 88, icon: <FaNodeJs /> },
        { name: "Express.js", level: 85, icon: <SiExpress /> },
        { name: "Python", level: 80, icon: <FaPython /> },
        { name: "MongoDB", level: 83, icon: <SiMongodb /> },
        { name: "PostgreSQL", level: 78, icon: <SiPostgresql /> },
        { name: "REST APIs", level: 87, icon: "🌐" }
      ]
    },
    {
      category: "Tools & Others",
      icon: "🔧",
      skills: [
        { name: "Git", level: 90, icon: <FaGithub /> },
        { name: "Docker", level: 75, icon: <FaDocker /> },
        { name: "AWS", level: 70, icon: <FaAws /> },
        { name: "Figma", level: 80, icon: <FaFigma /> },
        { name: "VS Code", level: 95, icon: "💻" },
        { name: "Postman", level: 88, icon: "📡" }
      ]
    }
  ];

  const progressRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector('.progress-fill');
          if (progressBar) {
            progressBar.style.width = progressBar.parentElement.getAttribute('data-level') + '%';
          }
        }
      });
    }, { threshold: 0.1 });

    progressRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      progressRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !progressRefs.current.includes(el)) {
      progressRefs.current.push(el);
    }
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My <span className="highlight">Skills</span></h2>
          <p className="section-subtitle">Technologies I work with</p>
        </div>
        
        <div className="skills-container">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex} className="skill-category">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-title">{category.category}</h3>
              </div>
              
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className="skill-item"
                    ref={addToRefs}
                    data-level={skill.level}
                    style={{ '--index': skillIndex }}
                  >
                    <div className="skill-info">
                      <span className="skill-icon">
                        {skill.icon}
                      </span>
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percent">{skill.level}%</span>
                    </div>
                    <div className="progress-bar" data-level={skill.level}>
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: '0%',
                          background: `linear-gradient(90deg, ${getGradientColor(skill.level)})`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const getGradientColor = (level) => {
  if (level >= 85) {
    return '#3b82f6, #8b5cf6, #ec4899';
  } else if (level >= 70) {
    return '#3b82f6, #6366f1';
  } else {
    return '#60a5fa, #3b82f6';
  }
};

export default Skills;
