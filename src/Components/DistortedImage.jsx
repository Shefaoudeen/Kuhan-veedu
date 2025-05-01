import { useEffect, useRef, useState, useCallback } from "react";
import { Curtains, Plane } from "curtainsjs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DistortedImage = ({ image, isMobile }) => {
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const scrollEffect = useRef(0);
  const targetScrollEffect = useRef(0);
  const lastScroll = useRef(0);
  const rafID = useRef(null);
  const connectLabelRef = useRef(null);
  const curtainsRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Vertex shader with parabolic distortion
  const vertexShader = `
    precision mediump float;
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    uniform float uScrollEffect;
    varying vec2 vTextureCoord;

    void main() {
      vec3 vertexPosition = aVertexPosition;
      float normalizedX = (vertexPosition.x + 1.0) * 0.5;
      float parabola = normalizedX * (1.0 - normalizedX);
      float distortion = parabola * 3.8 * uScrollEffect;
      vertexPosition.y += distortion;
      vertexPosition.x *= 1.0 - abs(distortion) * 0.3;
      gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
      vTextureCoord = aTextureCoord;
    }
  `;

  // Fragment shader with chromatic aberration
  const fragmentShader = `
    precision mediump float;
    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;

    void main() {
      vec2 uv = vTextureCoord;
      float r = texture2D(uSampler, uv * 0.995).r;
      float g = texture2D(uSampler, uv).g;
      float b = texture2D(uSampler, uv * 1.005).b;
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `;

  // Initialize Curtains and plane
  const initCurtains = useCallback(() => {
    if (!curtainsRef.current && containerRef.current) {
      curtainsRef.current = new Curtains({
        container: containerRef.current,
        watchScroll: false,
        pixelRatio: Math.min(1.5, window.devicePixelRatio),
        premultipliedAlpha: true,
        autoRender: true, // Set to true for automatic rendering
      });

      const params = {
        vertexShader,
        fragmentShader,
        widthSegments: 20,
        heightSegments: 10,
        uniforms: {
          uScrollEffect: {
            name: "uScrollEffect",
            type: "1f",
            value: 0,
          },
        },
      };

      planeRef.current = new Plane(
        curtainsRef.current,
        containerRef.current,
        params
      );

      // Set up onReady callback to handle when the plane is ready
      planeRef.current.onReady(() => {
        // Force an initial render
        curtainsRef.current.needRender();
        scrollEffect.current = 0.01; // Small initial value to trigger animation
        manageAnimation();
      });

      // Set up onLoading callback to handle when the texture is ready
      planeRef.current.onLoading(() => {
        curtainsRef.current.needRender();
      });

      // Handle rendering on every frame if needed
      curtainsRef.current.onRender(() => {
        // Always update the uniform here
        if (planeRef.current?.uniforms?.uScrollEffect) {
          planeRef.current.uniforms.uScrollEffect.value = scrollEffect.current;
        }
      });

      // Handle errors
      curtainsRef.current.onError(() => {
        console.error("An error occurred with CurtainsJS");
        // Maybe add fallback here
      });

      // Handle resizing
      curtainsRef.current.onAfterResize(() => {
        curtainsRef.current.needRender();
      });
    }
  }, []);

  // Scroll handler
  const handleScroll = useCallback(() => {
    if (!curtainsRef.current) return;

    const currentScroll = window.scrollY;
    const delta = (currentScroll - lastScroll.current) * 0.02;
    lastScroll.current = currentScroll;
    targetScrollEffect.current = Math.max(Math.min(delta, 1.0), -1.0);

    // Make sure we render on scroll
    curtainsRef.current.needRender();
    manageAnimation();
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    scrollEffect.current +=
      (targetScrollEffect.current - scrollEffect.current) * 0.08;

    if (planeRef.current?.uniforms?.uScrollEffect) {
      planeRef.current.uniforms.uScrollEffect.value = scrollEffect.current;
    }

    targetScrollEffect.current *= 0.92;

    // Force rendering during animation
    if (curtainsRef.current) {
      curtainsRef.current.needRender();
    }

    if (
      Math.abs(scrollEffect.current) > 0.001 ||
      Math.abs(targetScrollEffect.current) > 0.001
    ) {
      rafID.current = requestAnimationFrame(animate);
    } else {
      rafID.current = null;

      // Ensure one final render when animation stops
      if (curtainsRef.current) {
        curtainsRef.current.needRender();
      }
    }
  }, []);

  const manageAnimation = useCallback(() => {
    if (
      !rafID.current &&
      (Math.abs(scrollEffect.current) > 0.001 ||
        Math.abs(targetScrollEffect.current) > 0.001)
    ) {
      rafID.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  useEffect(() => {
    initCurtains();
    lastScroll.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial small effect to trigger animation
    setTimeout(() => {
      targetScrollEffect.current = 0.05;
      manageAnimation();
    }, 100);

    return () => {
      if (rafID.current) {
        cancelAnimationFrame(rafID.current);
        rafID.current = null;
      }
      window.removeEventListener("scroll", handleScroll);

      if (planeRef.current?.remove) {
        planeRef.current.remove();
        planeRef.current = null;
      }

      if (curtainsRef.current?.dispose) {
        curtainsRef.current.dispose();
        curtainsRef.current = null;
      }
    };
  }, [initCurtains, handleScroll, manageAnimation]);

  // GSAP Scale Animation
  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { scale: 0.8 },
      {
        scale: isMobile ? 1.6 :  1.4,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
        ease: "none",
      }
    );
  }, [isMobile]);

  return (
    <div className="relative py-10 md:py-[250px] h-full max-w-[88vw] overflow-hidden left-8 top-5 md:top-0 -rotate-12 md:left-20">
    <div
      ref={containerRef}
      style={{
        margin: "0 auto",
        position: "relative",
        zIndex: 20,
        transform: "translateZ(0)",
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      className="h-[40vh] md:h-[50vh] mt-10 md:mt-0 md:w-[60vw] flex items-center justify-center"
    >
      <img
        src={image}
        alt="Parabolic distortion effect"
        crossOrigin="anonymous"
        data-sampler="uSampler"
        id="distorted-image"
        className="opacity-0 absolute w-full min-h-[40vh] min-w-[100%] md:min-w-[140vw] object-center object-cover"
      />

      {/* CONNECT label that follows mouse */}
      <div
        ref={connectLabelRef}
        className="absolute z-60 pointer-events-none bg-black bg-opacity-75 px-3 py-1 rounded-full"
        style={{
          position: "absolute",
          left: `${mousePosRef.current.x + 10}px`,
          top: `${mousePosRef.current.y}px`,
          opacity: 0,
          transform: "translate(10px, -50%)",
        }}
      >
        <span className="text-white font-semibold text-sm whitespace-nowrap">
          CONNECT
        </span>
      </div>

      {/* Transparent hover capture layer */}
      <a
        className="absolute inset-0 z-50 cursor-pointer"
        style={{
          pointerEvents: "auto",
          backgroundColor: "transparent",
        }}
        href="#connect"
      />
    </div>
  </div>
  );
};

export default DistortedImage;
