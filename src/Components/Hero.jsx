import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";

const Hero = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          el: vantaRef.current,
          THREE: THREE, // 🛠 Very important!
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 300.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.5,
          color: 0x0,
          color2: 0x0,
          size: 1.0,
          backgroundColor: "#f5f5f5", // 🛠 add these three lines:
          points: 0.0, // no points (dots)
          spacing: 100.0, // huge spacing (lines very spread out)
          showLines: true, // keep showing the connecting lines
        })
      );
    }
    return () => vantaEffect && vantaEffect.destroy();
  }, [vantaEffect]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 2000); // 2 second overlay duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="portfolio"
      className="relative min-h-screen max-md:py-[20vh] max-md:gap-[20vh] overflow-hidden bg-[#f5f5f5] flex flex-col justify-center items-center select-none"
    >
      {/* Black Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full bg-black z-50"
          />
        )}
      </AnimatePresence>

      {/* Hero Text Content */}
      <div className="z-50 flex flex-col items-center mt-10 max-md:gap-2 max-md:mb-[30vh]">
        <h1 className="font-aboreto font-[500] text-7xl max-md:text-2xl">
          INNOVATING AT THE
        </h1>
        <div className="flex justify-center gap-8 md:mt-6">
          <h1 className="font-aboreto font-[500] text-7xl max-md:text-2xl">
            INTERSECTION OF
          </h1>
          <p className="font-garet max-w-[35%] text-start max-md:hidden">
            Great products are built where design meets code with strategy. At
            Deco, we create seamless digital experiences that don’t just look
            good but perform exceptionally.
          </p>
        </div>
        <h1 className="font-aboreto font-[600] text-7xl max-md:text-3xl md:mt-6">
          DESIGN & CODE
        </h1>
      </div>

      {/* Vanta Globe */}
      <div
        ref={vantaRef}
        className="absolute md:top-0 max-md:bottom-0 left-0 w-full h-screen  max-md:max-h-[50dvh] z-0 opacity-25 pointer-events-none"
      ></div>
    </div>
  );
};

export default Hero;
