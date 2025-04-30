import React from "react";
import { TextHoverEffect } from "./ui/text-hover-effect";
import Countdown from "react-countdown";

const CountdownPage = () => {
  // Set countdown to May 1st, 2025 at 12:00 AM
  const launchDate = new Date(2025, 4, 1, 0, 0, 0, 0);

  // Custom renderer to show days too
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <span className="text-white z-20 text-9xl font-aboreto">Done!</span>
      );
    } else {
      return (
        <div className="flex gap-4 text-white z-20 text-7xl max-md:text-6xl font-aboreto">
          <div className="flex flex-col items-center">
            <span>{String(days).padStart(2, "0")}</span>
            <span className="text-sm">Days</span>
          </div>
          <div className="flex flex-col items-center">
            <span>{String(hours).padStart(2, "0")}</span>
            <span className="text-sm">Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span>{String(minutes).padStart(2, "0")}</span>
            <span className="text-sm">Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span>{String(seconds).padStart(2, "0")}</span>
            <span className="text-sm">Seconds</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-8 relative text-white w-screen h-screen justify-center items-center bg-primaryBlack">
      <div className="w-full absolute text-center">
        <div className="max-md:hidden">
          <TextHoverEffect text="DeCo" />
        </div>
      </div>
      <Countdown
        date={launchDate}
        renderer={renderer}
        className="text-white  z-20"
      />
      <h1 className="z-20 text-3xl font-garet max-md:text-xl">
        A new era begins on MAY 1.
      </h1>
      <div className="bg-[#121212] shadow-black shadow-3xl text-white z-50 absolute bottom-0 left-0 right-0 text-center py-2 text-lg font-garet">
        © DeCo 2025
      </div>
    </div>
  );
};

export default CountdownPage;
