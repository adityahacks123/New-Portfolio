import React from 'react';
import './Landing.css';

const Landing = ({ onEnterPortfolio }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0a0a0f',
      color: 'white',
      textAlign: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '800px',
        position: 'relative',
        zIndex: 2
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #fff 0%, #a0a0a0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Aditya Singh
        </h1>
        
        <h2 style={{
          fontSize: '1.8rem',
          color: '#a0a0a0',
          marginBottom: '2rem',
          fontWeight: 400
        }}>
          Full Stack Developer | Problem Solver | Tech Enthusiast
        </h2>
        
        <p style={{
          fontSize: '1.2rem',
          color: '#c0c0c0',
          marginBottom: '3rem',
          lineHeight: 1.6,
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '0 20px'
        }}>
          I build experiences, not just websites. I'm a Full Stack Developer who blends design, logic, and creativity to bring ideas to life. From interactive front-ends to powerful back-ends, I create smooth, story-driven digital experiences that connect with people and perform flawlessly.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={onEnterPortfolio}
            style={{
              padding: '0.9rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
            }}
          >
            Explore My Work
          </button>
          
          <button 
            onClick={onEnterPortfolio}
            style={{
              padding: '0.9rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '8px',
              background: 'transparent',
              color: '#e0e0e0',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Contact Me
          </button>
        </div>
      </div>
      
      {/* Simple animated background */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #667eea, #764ba2)',
        filter: 'blur(80px)',
        opacity: 0.4,
        zIndex: 1
      }}></div>
    </div>
  );
};

export default Landing;
