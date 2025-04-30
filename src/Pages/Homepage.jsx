import React from "react";
import ImageSection from "../Components/ImageSection";
import TestimonialSection from "../Components/TestimonialSection";
import DecoApproach from "../Components/DecoApproach";
import Hero from "../Components/Hero";
import OurStory from "../Components/OurStory";
import StrongBrand from "../Components/StrongBrand";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

const Homepage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <OurStory />

      <ImageSection />
      <div className="relative">
        {/* <TestimonialSection /> */}
        {/* <div className="min-h-60 md:min-h-0 bg-white"></div>{" "} */}
        {/* Spacer for mobile only */}
        <DecoApproach />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
