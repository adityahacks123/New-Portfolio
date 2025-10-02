import { useEffect, useLayoutEffect } from 'react';
import Navbar from '../shared/Navbar';
import Projects from '../Projects/Projects';
import './Portfolio.css';
const Portfolio = () => {
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual';
        }
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        // Temporarily disable smooth scroll to avoid browser anchoring quirks
        const root = document.documentElement;
        const prevBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        const homeEl = document.getElementById('home');
        if (homeEl) {
          homeEl.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
        // Restore smooth behavior next tick
        setTimeout(() => {
          const homeLater = document.getElementById('home');
          if (homeLater) {
            homeLater.scrollIntoView({ behavior: 'auto', block: 'start' });
          }
          root.style.scrollBehavior = prevBehavior || '';
        }, 0);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onLoad = () => {
      // After all assets load, do a final snap to home
      const root = document.documentElement;
      const prevBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      const homeEl = document.getElementById('home');
      if (homeEl) {
        homeEl.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
      setTimeout(() => {
        root.style.scrollBehavior = prevBehavior || '';
      }, 50);
    };
    window.addEventListener('load', onLoad);
    const t = setTimeout(onLoad, 100);
    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(t);
    };
  }, []);
  return (
    <div className="portfolio-container">
      <Navbar />

      <section id="home" className="portfolio-section home-section">
        <div className="home-container">
          <div className="home-layout">
            {/* Left Side - Image */}
            <div className="home-image-section">
              <div className="image-container">
                <div className="image-placeholder">
                  <span>Your Photo</span>
                </div>
                <div className="image-glow"></div>
              </div>
            </div>
            {/* Right Side - Intro */}
            <div className="home-intro-section">
              <div className="intro-content">
                <h1 className="intro-greeting">
                  Hi, I'm <span className="name-highlight">Aditya Singh</span>
                </h1>
                <h2 className="intro-title">Full Stack Developer</h2>
                <p className="intro-description">
                  I'm passionate about creating digital experiences that combine beautiful design with powerful functionality. With expertise in modern web technologies, I build applications that make a difference.
                </p>
                <div className="intro-buttons">
                  <button className="btn-primary">
                    <span>View My Work</span>
                  </button>
                  <button className="btn-secondary">
                    <span>Download CV</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Rendered directly by Projects component */}
      <Projects />

      <section id="skills" className="portfolio-section skills-section">
        <div className="section-content">
          <h2>Skills</h2>
          <p>This is where your skills will be showcased...</p>
        </div>
      </section>

      <section id="socials" className="portfolio-section socials-section">
        <div className="section-content">
          <h2>Social Links</h2>
          <p>This is where your social media links will go...</p>
        </div>
      </section>

      <section id="contact" className="portfolio-section contact-section">
        <div className="section-content">
          <h2>Contact Me</h2>
          <p>This is where your contact information will be...</p>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
