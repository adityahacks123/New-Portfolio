import React, { useEffect, useState } from 'react';
import '../../styles/CometCursor.css';

const CometCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Check if it's a touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Handle mouse movement
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add a slight delay to the trail for a comet effect
      setTimeout(() => {
        setTrailPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    // Check if hovering over clickable elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button' ||
        target.onclick !== null ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Handle scroll state
    let scrollTimer;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, [isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) {
    return null;
  }

  // Calculate cursor size based on state
  const cursorSize = isHovering ? 30 : 20;
  const trailSize = isHovering ? 60 : 40;
  const cursorBlur = isHovering ? '0 0 25px rgba(102, 126, 234, 0.8)' : '0 0 15px rgba(102, 126, 234, 0.5)';
  
  // Add pulsing effect when scrolling
  const pulseEffect = isScrolling ? {
    animation: 'pulse 0.5s infinite alternate',
    background: 'radial-gradient(circle, #ff6b6b 0%, #feca57 100%)',
    boxShadow: '0 0 20px rgba(255, 107, 107, 0.7)'
  } : {};

  return (
    <>
      {/* Main cursor */}
      <div 
        className="cursor-comet"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${cursorSize}px`,
          height: `${cursorSize}px`,
          boxShadow: cursorBlur,
          ...pulseEffect
        }}
      />
      
      {/* Trail effect */}
      <div 
        className="cursor-trail"
        style={{
          left: `${trailPosition.x}px`,
          top: `${trailPosition.y}px`,
          width: `${trailSize}px`,
          height: `${trailSize}px`,
          opacity: isHovering ? 0.5 : 0.3,
          transition: isHovering ? 'all 0.2s ease-out' : 'all 0.3s ease-out'
        }}
      />
      
      {/* Add keyframes for pulse animation */}
      <style jsx global>{`
        @keyframes pulse {
          from {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          to {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.8;
          }
        }
      `}</style>
    </>
  );
};

export default CometCursor;
