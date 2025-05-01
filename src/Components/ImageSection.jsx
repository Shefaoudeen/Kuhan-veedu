// SolutionsSlider.jsx (parent component)
import { useRef, useState, useEffect } from "react";
import DistortedImage from "./DistortedImage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { imageSectionData } from "../data";
import { FaLongArrowAltRight } from "react-icons/fa";
import { goToContact } from "../utils";
import RevealOverlay from "./RevealOverlay";

const ImageSection = () => {
  const overlayRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const slideTriggersRef = useRef([]);
  const mainTriggerRef = useRef(null);
  const revealOverlayRef = useRef(null);

  // Check for mobile screen size
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

  // GSAP animations
  useGSAP(() => {

    // ✅ Kill only your component's triggers
    slideTriggersRef.current.forEach(trigger => trigger.kill());
    mainTriggerRef.current?.kill();

    gsap.set(overlayRef.current, { autoAlpha: 0 });

    const mainTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: () => isMobile ? '+=300 bottom' : '+=400 bottom',
      end: () => isMobile ? 'bottom bottom' : 'bottom-=200 bottom',
      onEnter: () => gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.5 }),
      onLeave: () => gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.5 }),
      onEnterBack: () => gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.5 }),
      onLeaveBack: () => gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.5 }),
      onRefresh: (self) =>
        gsap.set(overlayRef.current, {
          autoAlpha: self.isActive ? 1 : 0,
        }),
    });
    mainTriggerRef.current = mainTrigger;

    const triggers = imageSectionData.map((_, index) => {
      return ScrollTrigger.create({
        trigger: `#slide-${index}`,
        start: () => isMobile ? "top 70%" : "top 60%",
        end: () => isMobile ? "bottom 30%" : "bottom 40%",

        onEnter: () => setActiveSlide(index),
        onEnterBack: () => setActiveSlide(index),
      });
    });
    slideTriggersRef.current = triggers;

    setIsReady(true);

    return () => {
      mainTriggerRef.current?.kill();
      slideTriggersRef.current.forEach(trigger => trigger.kill());
    };
  }, [isMobile]);


  return (
    <>
      <RevealOverlay ref={revealOverlayRef} />
      <div ref={sectionRef} className="relative bg-primaryBlack" id="solutions">
        <div
          ref={overlayRef}
          className="fixed inset-0 flex flex-col md:flex-row  items-center justify-between w-full px-4 py-6 md:py-10 md:p-0 z-[5] pointer-events-none"
        // Both reduced z-index and explicitly disable pointer events
        >
          {/* Left Side - Slide Counter */}
          <div
            style={{
              writingMode: "vertical-rl",
              lineHeight: "1",
              letterSpacing: "0.1em",
            }}
            className="text-2xl text-white opacity-50 md:opacity-30 sm:text-3xl md:text-5xl lg:text-[7.3rem] font-tommy font-bold rotate-180 md:px-8 flex justify-start md:justify-center w-full md:w-auto mb-2 md:mb-0"
          >
            <span className="max-w-fit">
              {"0" + (activeSlide + 1)}/0{imageSectionData.length}
            </span>
          </div>

          {/* Center - Title Section */}
          <div
            ref={titleRef}
            className="flex flex-col items-center justify-center px-3 py-2 md:py-0 max-md:mt-10"
          >
            <h2 className="text-xl sm:text-2xl md:text-5xl lg:text-7xl drop-shadow-lg font-aboreto text-center text-white max-w-[95%]">
              {imageSectionData[activeSlide].title}
            </h2>
            <h3 className="text-xs sm:text-sm md:text-lg text-center drop-shadow-lg font-lato uppercase text-white mt-2 md:mt-8">
              {imageSectionData[activeSlide].subtitle}
            </h3>
            <h3 className="text-xs sm:text-sm md:text-lg text-center drop-shadow-lg pt-1 md:pt-2 font-garet uppercase text-white">
              {imageSectionData[activeSlide].tags}
            </h3>
          </div>

          {/* Right Side - Solutions Label */}
          <div
            style={{ writingMode: "vertical-rl", lineHeight: "1" }}
            className="text-2xl opacity-50 md:opacity-30 text-white sm:text-3xl md:text-5xl lg:text-[7.3rem] font-tommy font-bold rotate-180 md:px-8 text-primaryBlack flex justify-end items-end md:justify-center w-full md:w-auto mt-2 md:mt-0"
          >
            <span className="max-w-fit">SOLUTIONS</span>
          </div>
        </div>

        {/* Scrollable images */}
        <div className="relative md:pt-0">
          {imageSectionData.map((section, index) => (
            <div
              id={`slide-${index}`}
              key={index}
              className="min-h-[60vh] sm:min-h-[70vh] md:min-h-screen flex flex-col justify-center mb-12 md:mb-32 overflow-x-hidden"
            >
              <DistortedImage isMobile={isMobile} image={section.image} />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="h-auto py-12 md:py-20 relative z-50 flex justify-center items-center">
          {" "}
          <span className="z-50 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 py-8 relative bottom-16 sm:py-28 text-white">
            <p className="text-sm sm:text-base md:text-lg">HOP ON A CALL</p>
            <button
              onClick={() => revealOverlayRef.current.revealTo("#connect")} 
              className="bg-white p-3 sm:p-4 rounded-full text-black group mt-2 sm:mt-0"
            >
              <FaLongArrowAltRight className="group-hover:rotate-90 duration-300 text-sm sm:text-base" />
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default ImageSection;
