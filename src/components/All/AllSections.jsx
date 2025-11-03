import { Suspense, lazy } from 'react';
import Home from '../Home/Home';
const Projects = lazy(() => import('../Projects/Projects'));
const Skills = lazy(() => import('../Skills/Skills'));
const Socials = lazy(() => import('../Socials/Socials'));
const Contact = lazy(() => import('../Contact/Contact'));

function AllSections() {
  return (
    <div>
      <section id="home" className="section section-border">
        <Home />
      </section>
      <hr className="divider" />
      <section id="projects" className="section section-border">
        <Suspense fallback={<div />}> 
          <Projects />
        </Suspense>
      </section>
      <hr className="divider" />
      <section id="skills" className="section section-border">
        <Suspense fallback={<div />}> 
          <Skills />
        </Suspense>
      </section>
      <hr className="divider" />
      <section id="socials" className="section section-border">
        <Suspense fallback={<div />}> 
          <Socials />
        </Suspense>
      </section>
      <hr className="divider" />
      <section id="contact" className="section section-border">
        <Suspense fallback={<div />}> 
          <Contact />
        </Suspense>
      </section>
    </div>
  );
}

export default AllSections;


