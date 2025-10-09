import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import './Home.css';

const Home = () => {
  const controls = useAnimation();

  useEffect(() => {
    // Only run animations on desktop to improve mobile performance
    if (window.innerWidth > 768) {
      controls.start('visible');
    } else {
      // For mobile, set initial state to visible without animations
      controls.set('visible');
    }
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        when: 'beforeChildren'
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
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  // Check if mobile device
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <section id="home" className="home-page">
      <motion.div 
        className="home-container"
        initial={isMobile ? 'visible' : 'hidden'}
        animate={controls}
        variants={containerVariants}
        aria-label="Home Section"
      >
        <div className="home-content">
          <motion.div 
            className="home-text" 
            variants={!isMobile ? itemVariants : null}
          >
            <h4>Hello, I'm</h4>
            <h1>Aditya Singh</h1>
            <h2>Full Stack Developer</h2>
            <p className="about-text">
              I love creating web experiences that feel alive — <span className="highlight">fast, functional, and beautifully designed</span>. With expertise in both frontend and backend development, I turn ideas into <span className="highlight">real-world products</span> that make an impact. I'm always exploring new tools, taking on challenges, and pushing my limits to build something better every day.
            </p>
            
            <div className="cta-buttons">
              <motion.a 
                href="#projects" 
                className="btn primary"
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                whileTap={!isMobile ? { scale: 0.95 } : {}}
                aria-label="View my work"
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
              <img 
                src="/WhatsApp Image 2025-10-09 at 5.50.39 PM copy.jpeg"
                alt="Aditya Singh"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '10px'
                }}
              />
            </div>
            {/* <div className="tech-stack">
              <span>React</span>
              <span>Node.js</span>
              <span>MongoDB</span>
            </div> */}
          </motion.div>
        </div>
        
        {/* <motion.div className="scroll-indicator" variants={itemVariants}>
          <span>Scroll Down</span>
          <div className="mouse"></div>
        </motion.div> */}
      </motion.div>
    </section>
  );
};

export default Home;
