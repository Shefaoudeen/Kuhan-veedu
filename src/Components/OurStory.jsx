import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import StrongBrand from "./StrongBrand";

const OurStory = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.to(".story-title1", {
      translateX: -10,
      duration: 0.8,
      ease: "linear",
      scrollTrigger: {
        trigger: "#storyblock",
        start: "top center",
      },
    });

    gsap.to(".story-title2", {
      translateX: 10,
      duration: 0.8,
      ease: "linear",
      scrollTrigger: {
        trigger: "#storyblock",
        start: "top center",
      },
    });

    gsap.to("#storyTitle", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "linear",
      scrollTrigger: {
        trigger: "#storyTitle",
        start: "top center",
      },
    });

    gsap.to("#storydescription", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "linear",
      scrollTrigger: {
        trigger: "#storydescription",
        start: "top center",
      },
    });

    gsap.from("#verticalText", {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: "#story",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <div id="storyblock">
      <div className="h-screen flex max-md:min-h-screen max-md:flex-col gap-12 justify-center items-center bg-[#f5f5f5] sticky top-0">
        <div id="story" className="md:w-[60%] max-md:px-8 flex flex-col gap-8">
          <div className="font-aboreto text-2xl text-center flex flex-col gap-4 md:hidden">
            <h1 className="story-title1">OUR STORY AND</h1>
            <h1 className="story-title2">WHAT WE DO</h1>
          </div>
          <h1
            id="storyTitle"
            className="font-semibold text-4xl leading-[150%] font-lato max-md:text-xl -translate-y-16 opacity-0"
          >
            HOW DOES DECO DRIVE
            <span className="max-md:hidden">
              <br />
            </span>{" "}
            YOUR BUSINESS FORWARD?
          </h1>
          <p
            id="storydescription"
            className="font-garet text-justify md:pr-20 text-lg max-md:text-sm -translate-y-16 opacity-0"
          >
            No fluff, no exaggeration — At Deco, we blend design, code, and
            innovation to craft seamless, high—performance digital experiences.
            From intuitive user interfaces and scalable applications to
            enterprise software and AI—powered solutions, we build products that
            don’t just look great—they deliver results. With a sharp focus on
            scalability, automation, and emerging technologies, we help
            businesses stay ahead in an ever-evolving digital landscape. Whether
            you're launching something new or transforming an existing vision,
            we turn bold ideas into powerful digital realities.
          </p>
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-[500] font-lato">SOLUTIONS</h1>
            <div>
              <button className="bg-black p-4 rounded-full text-white group">
                <FaLongArrowAltRight className="group-hover:translate-x-1 duration-300" />
              </button>
            </div>
          </div>
        </div>
        <div
          id="verticalText"
          style={{ writingMode: "vertical-rl", lineHeight: "1" }}
          className="font-aboreto text-6xl text-end flex flex-col gap-8 max-md:hidden -translate-y-28"
        >
          <h1>OUR STORY AND</h1>
          <h1>WHAT WE DO</h1>
        </div>
      </div>
      <StrongBrand />
    </div>
  );
};

export default OurStory;
