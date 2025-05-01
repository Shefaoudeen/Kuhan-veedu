import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { goToContact } from "../utils";
import RevealOverlay from "./RevealOverlay";
gsap.registerPlugin(ScrollTrigger);

const flipContents = [
  "Powering up ideas",
  "Target locked!",
  "Connecting the dots",
  "Your vision, validated",
  "Algorithm in motion",
  "Syncing toward success",
  "Always by your side",
];

const approachSteps = [
  "Consultation",
  "Contract Signing",
  "UX Research & UI Design",
  "Design Approval",
  "Development",
  "On-Time Delivery",
  "After-Support Service",
];

const DecoApproach = () => {
  const mainRef = useRef(null);
  const stepsRefs = useRef([]);
  const numberRef = useRef(null);
  const textRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const prevIndex = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggerRef = useRef(null);
  const overlayRef = useRef(null);

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Update ScrollTrigger when isMobile changes
  useEffect(() => {
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: isMobile ? "+=1500" : "+=3000", // Adjusted scroll distance
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalSteps = approachSteps.length;
        const index = Math.min(
          totalSteps - 1,
          Math.floor(progress * totalSteps)
        );

        if (index !== prevIndex.current) {
          prevIndex.current = index;
          setCurrentStep(index);

          gsap.fromTo(
            textRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1 }
          );
        }
      },
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [isMobile]);

  useGSAP(() => {
    const animations = [
      { selector: "#decoApproach-text", from: { opacity: 0, x: -70 } },
      { selector: "#decoApproach-text-2", from: { opacity: 0, y: -70 } },
      { selector: "#number-text", from: { opacity: 0, x: 70 } },
    ];

    animations.forEach(({ selector, from }) => {
      gsap.fromTo(selector, from, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top center",
        },
      });
    });
  }, []);

  return (
    <>
      <RevealOverlay ref={overlayRef} />

      <div
        id="approach"
        ref={mainRef}
        className="z-50 overflow-hidden md:overflow-auto relative w-screen h-screen md:px-5 lg:px-20 flex md:mt-0 bg-white"
      >
        <div className="relative z-50 h-screen w-screen flex flex-col md:flex-row items-center justify-center md:justify-between">
          <h2
            id="decoApproach-text"
            style={{ writingMode: "vertical-rl", lineHeight: "1" }}
            className="text-2xl hidden md:block md:text-5xl lg:text-8xl font-light min-w-[23vw] md:min-w-[20vw]  text-center font-aboreto rotate-180 px-8 text-primaryBlack"
          >
            The Deco Approach
          </h2>

          <h2
            id="decoApproach-text-2"
            className="absolute text-2xl top-20 md:hidden font-bold min-w-[23vw] md:min-w-[20vw]  text-center font-aboreto px-8 text-primaryBlack"
          >
            The Deco Approach
          </h2>

          <section className="space-y-4 md:space-y-10 md:max-w-[45vw]">
            <div className="space-y-6">
              {approachSteps.map((step, index) => (
                <h3
                  key={index}
                  ref={(el) => (stepsRefs.current[index] = el)}
                  className={`${index === currentStep
                      ? "font-aboreto text-black"
                      : index < currentStep
                        ? "font-lato text-black/70 md:scale-[85%]"
                        : "font-lato text-black/40 md:scale-[85%]"
                    }  text-2xl md:text-4xl lg:text-4xl font-extrabold text-center transition-all duration-300`}
                >
                  {step}
                </h3>
              ))}
            </div>
          </section>

          <div
            id="number-text"
            className="hidden  md:block space-y-4 md:space-y-10 min-w-[23] max-w-[23vw] px-2 lg:min-w-[20vw]"
          >
            <div
              ref={numberRef}
              className="font-lato text-white text-6xl md:text-9xl font-extrabold text-center text-outline"
            >
              {currentStep + 1}
            </div>
            <p ref={textRef} className="md:text-2xl text-center">
              {flipContents[currentStep]}
            </p>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 mt-10">
            <div className="flex flex-col justify-center font-garet items-center gap-10">
              <div className="flex flex-col justify-center sm:flex-row items-center gap-3">
                <p className="text-sm sm:text-base md:text-lg">SETUP A CALL</p>
                <button
                  onClick={() => overlayRef.current.revealTo("#connect")}
                  className="bg-black p-3 sm:p-4 rounded-full text-white group mt-2 sm:mt-0"
                >
                  <FaLongArrowAltRight className=" group-hover:rotate-90 duration-300 text-sm sm:text-base" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DecoApproach;