import React from "react";
import { quoteShape } from "../assets";

const TestimonialCard = ({ quote, author }) => {
  return (
    <div className="relative max-w-lg mx-auto my-16 px-8 py-12">
      {/* Large quotation mark background */}
      <div className="relative top-0 left-0 text-gray-100 dark:text-gray-700 z-2">
        <img
          src={quoteShape}
          alt="background"
          className="w-[600px] color-white"
        />
      </div>

      {/* Content */}
      <div className="absolute top-20 left-0 z-10">
        <blockquote className="text-2xl md:text-3xl font-light italic text-gray-100 mb-6 leading-snug">
          {quote}
        </blockquote>
        <p className="text-lg text-gray-200 text-right">{author}</p>
      </div>
    </div>
  );
};

const TestimonialMarquee = () => {
  return (
    <div>
      {/* <TestimonialCard
        quote="This is the best service I've ever used! Highly recommend to everyone."
        author="John Doe"
        className="bg-gray-100"
      /> */}
      {/* <TestimonialCard
        quote="A game changer for our business. The team is fantastic!"
        author="Jane Smith"
        className="bg-gray-200"
      /> */}

      <h1 className="text-center mt-20 text-xl py-16 bg-gray-100 rounded-xl">
        Testimonials goes here
      </h1>
    </div>
  );
};

export default TestimonialMarquee;
