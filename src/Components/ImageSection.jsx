// SolutionsSlider.jsx (parent component)
import { useRef, useState, useEffect } from "react";
import DistortedImage from "./DistortedImage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { imageSectionData } from "../data";
import { FaLongArrowAltRight } from "react-icons/fa";

const ImageSection = () => {
  const overlayRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    // Force hide initially (important!)
    gsap.set(overlayRef.current, { autoAlpha: 0 });

    const mainTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: isMobile ? 'top 90%' : '+=400 bottom',
      end: isMobile ? 'bottom+=50% top' : 'bottom-=200 bottom',


      // markers: true,
      onEnter: () =>
        gsap.to(overlayRef.current, {
          autoAlpha: 1,
          duration: 0.5,
        }),
      onLeave: () =>
        gsap.to(overlayRef.current, {
          autoAlpha: 0,
          duration: 0.5,
        }),
      onEnterBack: () =>
        gsap.to(overlayRef.current, {
          autoAlpha: 1,
          duration: 0.5,
        }),
      onLeaveBack: () =>
        gsap.to(overlayRef.current, {
          autoAlpha: 0,
          duration: 0.5,
        }),
      onRefresh: (self) => {
        const visible = self.isActive;
        gsap.set(overlayRef.current, {
          autoAlpha: visible ? 1 : 0,
        });
      },
    });

    // Adjust scroll trigger based on screen size
    // Inside your useGSAP hook where you create the triggers
    const triggers = imageSectionData.map((_, index) => {
      const isLastSlide = index === imageSectionData.length - 1;
      
      return ScrollTrigger.create({
        trigger: `#slide-${index}`,
        start: isMobile ? 
          (isLastSlide ? "top 80%" : "top 70%") : 
          "top 60%",
        end: isMobile ? 
          (isLastSlide ? "bottom 20%" : "bottom 30%") : 
          "bottom 40%",
        onEnter: () => setActiveSlide(index),
        onEnterBack: () => setActiveSlide(index),
      });
    });


    setIsReady(true);

    return () => {
      mainTrigger?.kill();
      // triggers.forEach(trigger => trigger.kill());
    };
  }, [isMobile]); // Re-run when screen size changes

  // Title animation
  useGSAP(() => {
    if (!isReady) return;

    const tl = gsap.timeline();

    if (titleRef.current.getAttribute("data-initialized") === "true") {
      tl.set(titleRef.current, {
        opacity: 0,
        filter: "blur(5px)",
        duration: 0.5,
      }).to(titleRef.current, {
        delay: 0.5,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
      });
    } else {
      titleRef.current.setAttribute("data-initialized", "true");
    }
  }, [activeSlide, isReady]);

  return (
    <div ref={sectionRef} className="relative bg-primaryBlack " id="solutions">
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
          className="flex flex-col items-center justify-center px-3 py-2 md:py-0"
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
            className="min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-center md:min-h-screen mb-12 md:mb-32 overflow-x-hidden"
          >
            <DistortedImage image={section.image} />
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="h-auto py-12 md:py-20 relative z-50 flex justify-center items-center bg-gradient-tb from-primaryBlack/50 to-primaryBlack">
        {" "}
        <span className="relative bottom-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 py-8 sm:py-28 text-white">
          <p className="text-sm sm:text-base md:text-lg relative">HOP ON A CALL</p>
          <a
            href="#connect"
            className="bg-white p-3 sm:p-4 rounded-full text-black group mt-2 sm:mt-0"
          >
            <FaLongArrowAltRight className="group-hover:rotate-90 duration-300 text-sm sm:text-base" />
          </a>
        </span>
      </div>
    </div>
  );
};

export default ImageSection;
