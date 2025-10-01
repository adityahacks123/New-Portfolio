import { motion } from 'framer-motion';
import './Landing.css';

const Landing = () => {
  return (
    <div className="hero-container">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="float-element element-1"></div>
        <div className="float-element element-2"></div>
        <div className="float-element element-3"></div>
        <div className="float-element element-4"></div>
        <div className="float-element element-5"></div>
        <div className="float-element element-6"></div>
        <div className="float-element element-7"></div>
        <div className="float-element element-8"></div>
      </div>

      {/* Main Content */}
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.h1 
            className="hero-name"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Aditya Singh
          </motion.h1>
          
          <motion.div 
            className="hero-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="typing-text">
              Full Stack Developer
              <span className="cursor">|</span>
            </span>
          </motion.div>
          
          <motion.p 
            className="hero-description"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            Crafting digital experiences with modern technologies
          </motion.p>
        </motion.div>

        <motion.div 
          className="hero-buttons"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <button className="btn-primary">
            <span>View My Work</span>
            <div className="btn-glow"></div>
          </button>
          <button className="btn-secondary">
            <span>Get In Touch</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;
