import { Suspense, lazy } from 'react';
import Home from '../Home/Home';
import AnimatedSection from '../common/AnimatedSection';
const Projects = lazy(() => import('../Projects/Projects'));
const Skills = lazy(() => import('../Skills/Skills'));
const Socials = lazy(() => import('../Socials/Socials'));
const Contact = lazy(() => import('../Contact/Contact'));

function AllSections() {
  return (
    <div>
      <AnimatedSection id="home" className="section section-border">
        <Home />
      </AnimatedSection>
      <hr className="divider" />
      <AnimatedSection id="projects" className="section section-border">
        <Suspense fallback={<div />}> 
          <Projects />
        </Suspense>
      </AnimatedSection>
      <hr className="divider" />
      <AnimatedSection id="skills" className="section section-border">
        <Suspense fallback={<div />}> 
          <Skills />
        </Suspense>
      </AnimatedSection>
      <hr className="divider" />
      <AnimatedSection id="socials" className="section section-border">
        <Suspense fallback={<div />}> 
          <Socials />
        </Suspense>
      </AnimatedSection>
      <hr className="divider" />
      <AnimatedSection id="contact" className="section section-border">
        <Suspense fallback={<div />}> 
          <Contact />
        </Suspense>
      </AnimatedSection>
    </div>
  );
}

export default AllSections;


