import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
      liveLink: "#",
      githubLink: "#"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      techStack: ["Next.js", "TypeScript", "Tailwind", "Socket.io"],
      liveLink: "#",
      githubLink: "#"
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather application that provides current weather, forecasts, and interactive maps using external APIs.",
      techStack: ["React", "API Integration", "Chart.js", "CSS3"],
      liveLink: "#",
      githubLink: "#"
    }
  ];

  return (
    <div className="projects-page">
      <div className="projects-container">
        <h2 className="projects-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.techStack.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.liveLink} className="project-link">Live Demo</a>
                  <a href={project.githubLink} className="project-link">GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
