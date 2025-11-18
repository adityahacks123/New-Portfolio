import './Projects.css';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: "Student Management System",
      description: "Developed a role-based web platform for students, faculty, and admins to manage academic data, attendance, and achievements. Integrated AI-driven analytics for performance tracking, portfolio generation, and automated report management.",
      techStack: ["React", "Node.js", "MongoDB","Express","Tailwind CSS","Docker"],
      liveLink: "#",
      githubLink: "https://github.com/adityahacks123/Student-Hub"
    },
    {
      title: "CodeWars",
      description: "A competitive coding platform where users can solve programming challenges, track their progress with detailed statistics, and engage in 1v1 battles with peers. Features include real-time leaderboards, problem difficulty levels, and comprehensive performance analytics.",
      techStack: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
      liveLink: "#",
      githubLink: "https://github.com/adityahacks123/CodeWars"
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather application that provides current weather, forecasts, and interactive maps using external APIs.",
      techStack: ["React", "API Integration", "Chart.js", "CSS3"],
      liveLink: "#",
      githubLink: "#"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="section-title">My Projects</h2>
        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project, index) => (
            <motion.article 
              key={index} 
              className="project-card"
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              <div className="card-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="tech-stack">
                  {project.techStack.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-actions">
                  {project.liveLink && project.liveLink !== "#" ? (
                    <a 
                      href={project.liveLink} 
                      className="project-link primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  ) : null}
                  {project.githubLink && project.githubLink !== "#" ? (
                    <a 
                      href={project.githubLink} 
                      className="project-link secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
