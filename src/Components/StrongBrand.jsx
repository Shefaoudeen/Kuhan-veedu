import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import React from "react";

const StrongBrand = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const brand = gsap.timeline({
      scrollTrigger: {
        trigger: "#brand-text",
        start: "bottom-=300 bottom",
      },
    });

    brand.from(
      ".strong-text",
      {
        scale: 1.25,
        opacity: 0,
        duration: 1,
      },
      0.5
    );
  });

  return (
    <div className="md:h-screen overflow-hidden max-md:py-8 relative flex gap-12 font-a text-white justify-center items-center bg-primaryBlack md:mt-[15vh] max-md:mt-[dvh] max-md:h-[100dvh]">
      <div
        id="brand-text"
        className="text-center text-5xl font-aboreto flex flex-col gap-8 z-50 max-md:text-xl max-md:px-8"
      >
        <h1 className="max-md:hidden strong-text">
          Strong brands start with powerful design.
        </h1>
        <h1 className="max-md:hidden strong-text">
          Let’s create one that lasts.
        </h1>
        <h1 className="max-md:hidden strong-text">
          “pixel by pixel, just for you”
        </h1>
        <h1 className="md:hidden strong-text">
          Strong brands start with powerful design.Let’s create one that
          lasts.“pixel by pixel, just for you”
        </h1>
      </div>
      <div className="absolute">
        <h2 className="text-[30.3rem] max-md:text-[12rem] opacity-50 font-lato font-bold  px-8 text-black/60 text-outline max-md:rotate-[90deg]">
          DECO
        </h2>
      </div>
    </div>
  );
};

export default StrongBrand;
