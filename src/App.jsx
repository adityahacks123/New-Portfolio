import { useEffect, useRef, useState, useCallback } from 'react';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Socials from './components/Socials/Socials';
import Contact from './components/Contact/Contact';
import Navigation from './components/Navigation/Navigation';
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
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.pageYOffset;
          const elementBottom = elementTop + rect.height;
          
          if (scrollPosition >= elementTop - 200 && scrollPosition < elementBottom - 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll to section with callback
  const scrollToSection = useCallback((sectionId) => {
    if (isScrolling.current) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      isScrolling.current = true;
      setActiveSection(sectionId);
      
      // Close mobile menu if open
      document.body.classList.remove('menu-open');
      
      // Scroll to the element
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    }
  }, []);

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
  }, [activeSection, scrollToSection]);

  if (showLanding) {
    return <Landing onEnterPortfolio={handleEnterPortfolio} />;
  }

  return (
    <div className="app" ref={mainRef}>
      {/* Navigation */}
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
      
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
    </div>
  );
}

export default App;
