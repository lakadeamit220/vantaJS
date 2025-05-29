import React, { useEffect, useRef } from 'react';

const VantaNet = ({
  children,
  // Container styling
  containerStyle = {},
  // Vanta.js NET parameters
  color = 0x3a7bd5,
  backgroundColor = 0x07121d,
  points = 12,
  maxDistance = 22,
  spacing = 18,
  showDots = true,
  // Animation controls
  mouseControls = true,
  touchControls = true,
  gyroControls = false,
  scale = 1.0,
  scaleMobile = 1.0
}) => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          existingScript.onload = resolve;
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
            mouseControls,
            touchControls,
            gyroControls,
            minHeight: 200,
            minWidth: 200,
            scale,
            scaleMobile,
            color,
            backgroundColor,
            points,
            maxDistance,
            spacing,
            showDots
          });
        }
      } catch (error) {
        console.error('Vanta initialization failed:', error);
      }
    };

    initVanta();

    return () => {
      vantaEffect.current?.destroy();
      // Optional: Remove dynamically added scripts
      // document.querySelectorAll('script[src*="three.js"], script[src*="vanta.net"]')
      //   .forEach(script => script.remove());
    };
  }, [
    color,
    backgroundColor,
    points,
    maxDistance,
    spacing,
    showDots,
    mouseControls,
    touchControls,
    gyroControls,
    scale,
    scaleMobile
  ]);

  const defaultContainerStyle = {
    width: '100%',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <div
      ref={vantaRef}
      style={{ ...defaultContainerStyle, ...containerStyle }}
    >
      {children}
    </div>
  );
};

export default VantaNet;