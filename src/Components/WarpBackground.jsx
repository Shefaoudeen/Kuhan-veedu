import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WarpBackground = ({ image }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    // Initialize Three.js scene
    const container = containerRef.current;
    const width = 1280;
    const height = 550;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Create renderer with transparency
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(image, (texture) => {
      // Create shader material for distortion effect
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uTime: { value: 0 },
          uScrollVelocity: { value: 0 }
        },
        vertexShader: `
          varying vec2 vUv;
          uniform float uScrollVelocity;
          
          void main() {
            vUv = uv;
            
            // Calculate position with warp effect
            vec3 pos = position;
            float normalizedX = (position.x / 2.0);
            float warpFactor = uScrollVelocity * 0.05;
            float parabola = normalizedX * normalizedX - 0.25;
            
            // Apply warp to Y position based on X position (parabolic curve)
            pos.y += parabola * warpFactor;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uTexture;
          varying vec2 vUv;
          
          void main() {
            gl_FragColor = texture2D(uTexture, vUv);
          }
        `,
        transparent: true
      });

      // Create mesh with high segment count for smooth bending
      const geometry = new THREE.PlaneGeometry(10, 5, 64, 32); // More segments for smoother curves
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      meshRef.current = mesh;
      
      // Start the animation loop
      animate();
    });

    // Handle scroll events
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      
      // Apply velocity with damping
      scrollVelocity.current += delta * 0.015;
      lastScrollY.current = currentScrollY;
    };

    // Animation loop
    const animate = () => {
      if (meshRef.current && meshRef.current.material.uniforms) {
        // Apply scroll velocity to shader
        meshRef.current.material.uniforms.uScrollVelocity.value = scrollVelocity.current;
        
        // Dampen velocity over time
        scrollVelocity.current *= 0.92;
      }
      
      // Render scene
      renderer.render(scene, camera);
      
      // Continue animation loop
      rafId.current = requestAnimationFrame(animate);
    };

    // Set up GSAP animation for scale effect when scrolling
    gsap.fromTo(
      renderer.domElement,
      { scale: 1 },
      {
        scale: 0.9,
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'top top',
          scrub: 1.2,
          invalidateOnRefresh: true
        },
        ease: 'none',
      }
    );

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (rendererRef.current && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
      }
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        meshRef.current.material.dispose();
      }
    };
  }, [image]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-start pt-40 text-white overflow-visible relative -mb-[2200px]"
    >
      <div className="min-h-[50vh]"></div>
      <div className="relative overflow-hidden px-20">
        <div className="-rotate-12 overflow-visible scale-[55%] transform-gpu">
          {/* Three.js renderer will add the canvas here */}
        </div>
      </div>
    </div>
  );
};

export default WarpBackground;