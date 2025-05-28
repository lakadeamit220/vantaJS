import { useEffect, useRef, useState } from "react";

const VantaGlobe = () => {
  const backgroundRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  // Initialize Vanta effect
  useEffect(() => {
    // Load Three.js
    const loadThreeJs = () => {
      return new Promise((resolve) => {
        if (window.THREE) return resolve();
        
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    // Load Vanta.js Globe
    const loadVantaGlobe = () => {
      return new Promise((resolve) => {
        if (window.VANTA?.GLOBE) return resolve();
        
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js";
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    // Initialize Vanta effect once scripts are loaded
    const initVantaEffect = async () => {
      try {
        await loadThreeJs();
        await loadVantaGlobe();

        if (backgroundRef.current && !vantaEffect && window.VANTA?.GLOBE) {
          const effect = window.VANTA.GLOBE({
            el: backgroundRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: "red",
            color2: "red",
            backgroundColor: "white"
          });

          setVantaEffect(effect);
          setIsBackgroundLoaded(true);
        }
      } catch (error) {
        console.error("Error initializing Vanta Globe:", error);
      }
    };

    initVantaEffect();

    // Cleanup function
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div 
      ref={backgroundRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: isBackgroundLoaded ? 0.3 : 0,
        transition: 'opacity 0.5s ease'
      }}
    />
  );
};

export default VantaGlobe;