import { useEffect, useRef, useState } from 'react';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Socials from './components/Socials/Socials';
import Contact from './components/Contact/Contact';
import './styles/global.css';
import './App.css';

// Debug
console.log('App component is loading...');

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const mainRef = useRef(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);

  // Debug
  console.log('App component rendering, showLanding:', showLanding);

  // Handle enter portfolio from landing page
  const handleEnterPortfolio = () => {
    console.log('Enter portfolio clicked');
    setShowLanding(false);
    document.body.style.overflow = 'auto';
  };

  // Handle scroll events for section detection
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;

      const scrollPosition = window.scrollY + 100;
      const sections = ['home', 'projects', 'skills', 'socials', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    if (isScrolling.current) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      isScrolling.current = true;
      setActiveSection(sectionId);
      
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        if (isScrolling.current) return;
        
        const sections = ['home', 'projects', 'skills', 'socials', 'contact'];
        const currentIndex = sections.indexOf(activeSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
          scrollToSection(sections[currentIndex + 1]);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
          scrollToSection(sections[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  if (showLanding) {
    return <Landing onEnterPortfolio={handleEnterPortfolio} />;
  }

  return (
    <div className="app" ref={mainRef}>
      <div className="smooth-scroll">
        <section id="home" className="section">
          <Home />
        </section>
        
        <section id="projects" className="section">
          <Projects />
        </section>
        
        <section id="skills" className="section">
          <Skills />
        </section>
        
        <section id="socials" className="section">
          <Socials />
        </section>
        
        <section id="contact" className="section">
          <Contact />
        </section>
      </div>
      
      {/* Navigation Dots */}
      <div className="page-indicator">
        {['home', 'projects', 'skills', 'socials', 'contact'].map((section) => (
          <button
            key={section}
            className={`dot ${activeSection === section ? 'active' : ''}`}
            onClick={() => scrollToSection(section)}
            aria-label={`Go to ${section}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
