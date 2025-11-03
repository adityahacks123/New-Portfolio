import { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import AllSections from './components/All/AllSections';
const Projects = lazy(() => import('./components/Projects/Projects'));
const Skills = lazy(() => import('./components/Skills/Skills'));
const Socials = lazy(() => import('./components/Socials/Socials'));
const Contact = lazy(() => import('./components/Contact/Contact'));
import Navigation from './components/Navigation/Navigation';
import CometCursor from './components/CometCursor/CometCursor';
import './styles/global.css';
import './App.css';
import './styles/CometCursor.css';


function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const mainRef = useRef(null);
  const isScrolling = useRef(false);
  const scrollTimeout = useRef(null);
  const navigate = useNavigate();


  // Remove scroll-based section detection since routing controls views

  // Remove scrollToSection; routing will handle navigation

  // Remove arrow key scroll navigation; use routing

  const handleEnterPortfolio = () => {
    setShowLanding(false);
    document.body.style.overflow = 'auto';
    navigate('/');
  };

  // Removed global clickable class side effect for cleaner semantics

  if (showLanding) {
    return <Landing onEnterPortfolio={handleEnterPortfolio} />;
  }

  return (
    <div className="app" ref={mainRef}>
      <CometCursor />
      <Navigation />
      <Routes>
        <Route path="/" element={<AllSections />} />
        <Route path="/projects" element={<Suspense fallback={<div />}> <Projects /> </Suspense>} />
        <Route path="/skills" element={<Suspense fallback={<div />}> <Skills /> </Suspense>} />
        <Route path="/socials" element={<Suspense fallback={<div />}> <Socials /> </Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<div />}> <Contact /> </Suspense>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
