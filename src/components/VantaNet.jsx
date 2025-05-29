import React, { useEffect, useRef } from 'react';

const VantaNet = ({ 
  children,
  style = {},
  color = 0x3a7bd5,
  backgroundColor = 0x07121d,
  points = 12,
  maxDistance = 22,
  spacing = 18,
  showDots = true,
  showLines = true
}) => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    // Load three.js from CDN
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initVanta = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js');

        if (window.VANTA?.NET && window.THREE) {
          vantaEffect.current = window.VANTA.NET({
            el: vantaRef.current,
            THREE: window.THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1.0,
            scaleMobile: 1.0,
            
            // Customizable properties
            color: typeof color === 'string' ? parseInt(color.replace('#', '0x')) : color,
            backgroundColor: typeof backgroundColor === 'string' 
              ? parseInt(backgroundColor.replace('#', '0x')) 
              : backgroundColor,
            points: points,
            maxDistance: maxDistance,
            spacing: spacing,
            showDots: showDots,
            showLines: showLines
          });
        }
      } catch (error) {
        console.error('Error initializing Vanta:', error);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, [color, backgroundColor, points, maxDistance, spacing, showDots, showLines]);

  return (
    <div
      ref={vantaRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default VantaNet;