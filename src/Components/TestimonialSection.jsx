import React from "react";
import TestimonialCard from "./TestimonialCard";

const TestimonialSection = () => {
  return (
    <div
      className="w-screen bg-white px-8 py-16 md:px-5 lg:px-40 md:py-40"
      id="voices"
    >
      <h1
        style={{ lineHeight: 1.3 }}
        className="text-2xl font-bold md:font-normal md:text-4xl lg:text-5xl font-aboreto text-center md:mb-4"
      >
        Your name absolutely belongs in our testimonials (we're not kidding!)
      </h1>

      <TestimonialCard />
    </div>
  );
};

export default TestimonialSection;
