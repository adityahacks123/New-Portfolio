import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function scrollToId(hash) {
  const id = hash?.startsWith('#') ? hash.slice(1) : hash;
  if (!id) return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    // Try immediately, then after a short delay in case content is lazy-loaded
    scrollToId(location.hash);
    const t = setTimeout(() => scrollToId(location.hash), 80);
    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  return null;
}

export default ScrollToHash;


