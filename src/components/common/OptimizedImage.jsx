import { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({
  src,
  alt = '',
  className = '',
  width,
  height,
  placeholderSrc,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();
  const observerRef = useRef();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const handleIntersect = (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      };

      observerRef.current = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: '200px',
        threshold: 0.01,
      });

      if (imgRef.current) {
        observerRef.current.observe(imgRef.current);
      }
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      setIsInView(true);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Inline styles for better CLS (Cumulative Layout Shift)
  const imageStyle = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : 'auto',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoaded ? 1 : 0,
  };

  const placeholderStyle = {
    ...imageStyle,
    opacity: isLoaded ? 0 : 1,
    filter: 'blur(10px)',
    position: 'absolute',
    top: 0,
    left: 0,
  };

  const containerStyle = {
    position: 'relative',
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : 'auto',
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  };

  // Generate srcSet for responsive images
  const generateSrcSet = (src) => {
    const srcWithoutExt = src.replace(/\.[^/.]+$/, '');
    const ext = src.split('.').pop();
    
    // Define different widths for responsive images
    const widths = [320, 480, 640, 768, 1024, 1280, 1536];
    
    return widths
      .map((width) => `${srcWithoutExt}-${width}w.${ext} ${width}w`)
      .join(', ');
  };

  return (
    <div style={containerStyle} className={className} ref={imgRef}>
      {/* Placeholder (shows while image is loading) */}
      {placeholderSrc && (
        <img
          src={placeholderSrc}
          alt=""
          style={placeholderStyle}
          aria-hidden="true"
          className={className}
        />
      )}

      {/* Actual Image */}
      {isInView && (
        <img
          src={src}
          srcSet={generateSrcSet(src)}
          sizes={`(max-width: 768px) 100vw, 50vw`}
          alt={alt}
          style={imageStyle}
          className={className}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
