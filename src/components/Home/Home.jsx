import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="home-page">
      <motion.div 
        className="home-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="home-content">
          <motion.div className="home-text" variants={itemVariants}>
            <h4>Hello, I'm</h4>
            <h1>Aditya Singh</h1>
            <h2>Full Stack Developer</h2>
            <p>I'm a passionate developer who loves to create amazing web experiences. With a strong foundation in both frontend and backend technologies, I build applications that are both beautiful and functional.</p>
            
            <div className="cta-buttons">
              <motion.a 
                href="#projects" 
                className="btn primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a 
                href="#contact" 
                className="btn secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div className="home-image" variants={itemVariants}>
            <div className="profile-image">
              {/* Replace with your actual image */}
              <div className="image-placeholder">
                <span>Your Photo</span>
              </div>
            </div>
            <div className="tech-stack">
              <span>React</span>
              <span>Node.js</span>
              <span>MongoDB</span>
            </div>
          </motion.div>
        </div>
        
        <motion.div className="scroll-indicator" variants={itemVariants}>
          <span>Scroll Down</span>
          <div className="mouse"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
