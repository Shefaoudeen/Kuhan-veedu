import {
  ChevronUp,
  Linkedin,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Mail,
} from "lucide-react";
import { FiShare2 } from "react-icons/fi";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import React, { useState, useRef } from "react";
import { TextHoverEffect } from "../Components/ui/text-hover-effect";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { HalfLogo } from "../assets";

const handleCopyToClipboard = (setMessageVisible) => {
  const url = "https://teamdeco.in/";

  navigator.clipboard
    .writeText(url)
    .then(() => {
      // Show custom success message
      setMessageVisible(true);
      // Hide the message after 2 seconds
      setTimeout(() => {
        setMessageVisible(false);
      }, 1000);
    })
    .catch((err) => {
      console.error("Error copying text to clipboard", err);
    });
};

const Footer = () => {
  const [messageVisible, setMessageVisible] = useState(false); // Track visibility of custom message

  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState("*Captcha validation");
  const correctAnswers = [
    " Math whiz",
    "ooh!, Numbers pro",
    "wow!",
    "Math genius, huh?",
    "Got math skills!",
    "Number ninja, nice!",
  ];
  const wrongAnswer = [
    "Numbers not your thing?",
    "Not a fan of numbers?",
    "Math feeling tough?",
    "Is math messing with you?",
    "Number stress",
  ];

  const handleKeyDown = (e) => {
    console.log(num1, num2, userAnswer);
    if (e.key === "Enter") {
      const answer = parseInt(userAnswer);
      if (!isNaN(answer)) {
        const isCorrect = answer === num1 + num2;
        const randomResponse = isCorrect
          ? correctAnswers[Math.floor(Math.random() * correctAnswers.length)]
          : wrongAnswer[Math.floor(Math.random() * wrongAnswer.length)];
        setIsCorrect(randomResponse);
        setNum1(Math.floor(Math.random() * 10) + 1);
        setNum2(Math.floor(Math.random() * 10) + 1);
        setUserAnswer("");
      }
    }
  };

  const overlayRef = useRef();

  const scrollToTopWithOverlay = () => {
    gsap.to(overlayRef.current, {
      y: 0,
      duration: 2,
      ease: "power2.inOut",
      onComplete: () => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "auto" });
            gsap.to(overlayRef.current, {
              y: "-100%",
              duration: 0.7,
              delay: 0.2,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(overlayRef.current, { y: "100%" });
              },
            });
          }, 200);
        });
      },
    });
  };

  useGSAP(() => {
    gsap.to("#main-text", {
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#main-text",
        start: "top bottom",
      },
    });
  }, []);

  return (
    <div className="flex w-screen justify-center items-center bg-[#070707] text-white mt-10">
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-screen bg-black z-[9999] translate-y-full"
      ></div>
      <div className="flex flex-col md:w-[80%] max-md:w-[90%] justify-center items-center">
        <div className="flex flex-col w-full justify-center items-center md:h-[125vh] gap-16">
          <div
            id="main-text"
            className="text-6xl text-center  -translate-y-16 font-aboreto flex flex-col gap-4 max-md:text-xl"
          >
            <h1>Not yet convinced?</h1>
            <h1>Let's Talk</h1>
          </div>
          <div className="w-full">
            <div className="md:px-20 flex flex-col gap-12">
              <div className="flex max-md:flex-col gap-8">
                <div className="relative md:w-[50%]">
                  <input
                    type="text"
                    id="charming-name"
                    name="charming-name"
                    placeholder=" "
                    required
                    className="peer w-full text-white p-2 pt-6 bg-black/90 placeholder-transparent border-b border-[#f5f5f5] focus:outline-none focus:border-white focus:border focus:rounded-xl duration-200 transition-all"
                  />
                  <label
                    htmlFor="charming-name"
                    className="absolute left-2 -top-2 text-sm text-gray-400 bg-black px-1 transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f5f5f5] peer-focus:-top-2 peer-focus:text-sm peer-focus:text-white"
                  >
                    Your charming name
                  </label>
                </div>
                <div className="relative md:w-[50%]">
                  <input
                    type="text"
                    id="email-address"
                    name="email-address"
                    placeholder=" "
                    required
                    className="peer w-full text-white p-2 pt-6 bg-black placeholder-transparent border-b border-[#f5f5f5] focus:outline-none focus:border-white focus:border focus:rounded-xl duration-200 transition-all"
                  />
                  <label
                    htmlFor="email-address"
                    className="absolute left-2 -top-2 text-sm text-gray-400 bg-black px-1 transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f5f5f5] peer-focus:-top-2 peer-focus:text-sm peer-focus:text-white"
                  >
                    Your Email
                  </label>
                </div>
              </div>
              <div className="relative max-md:text-xs">
                <input
                  type="text"
                  id="project-details"
                  name="project-details"
                  placeholder=" "
                  required
                  className="peer w-full text-white p-2 max-md:my-6 pt-6 bg-black placeholder-transparent border-b border-[#f5f5f5] focus:outline-none focus:border-white focus:border focus:rounded-xl duration-200 transition-all"
                />
                <label
                  htmlFor="project-details"
                  className="absolute left-2 -top-2  text-sm  text-gray-400 bg-black px-1 transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f5f5f5] peer-focus:-top-2 peer-focus:text-sm  peer-focus:text-white"
                >
                  We'd love to hear more about your project
                </label>
              </div>
              <div className="flex items-center justify-center gap-2 md:pl-[150px]">
                <div className="bg-white text-black w-[25px] h-[25px] flex items-center justify-center rounded-sm">
                  {num1}
                </div>
                <div>+</div>
                <div className="bg-white text-black w-[25px] h-[25px] flex items-center justify-center rounded-sm">
                  {num2}
                </div>
                <div>=</div>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-white text-black w-[25px] h-[25px] text-center rounded-sm border [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none appearance-none"
                />
                <div className="ml-2 min-w-[250px] max-md:hidden">
                  {isCorrect}
                </div>
              </div>
              <div className="min-w-[250px] text-center -mt-8 md:hidden">
                {isCorrect}
              </div>
              <div className="flex justify-center">
                <button className="bg-white text-black font-semibold px-10 py-2 rounded-full">
                  Send Mail
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col  h-screen w-full items-center justify-between"
          id="connect"
        >
          <div className="w-full flex flex-col justify-center gap-4 items-center py-8 text-center">
            <div>
              <h1 className="text-xl font-aboreto">Ready to work together?</h1>
            </div>
            <div className="flex flex-col w-full justify-center items-center font-lato max-md:hidden">
              <div className="flex w-full justify-between items-center">
                <div className="flex flex-col justify-center items-center">
                  <MapPin size={24} color="#ffffff" />
                  <h1 className="mt-2">
                    Puducherry
                    <br />
                    Bangalore
                  </h1>
                </div>
                <div className="text-5xl font-semibold ml-10">
                  reachus@teamdeco.in
                </div>
                <div className="flex flex-col justify-center items-center">
                  <Phone size={24} color="#ffffff" />
                  <h1 className="mt-2">
                    +91 88254 60719
                    <br />
                    +91 84387 16946
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-screen  font-lato flex-1 md:hidden">
              <div className="flex w-full items-start  flex-col gap-8 p-12 text-sm">
                <div className="flex  justify-center gap-4 items-center">
                  <MapPin size={24} color="#ffffff" />
                  <h1>Puducherry / Bangalore</h1>
                </div>
                <div className="flex  justify-center gap-4 items-center">
                  <Mail size={24} color="#ffffff" />
                  reachus@teamdeco.in
                </div>
                <div className="flex  justify-center items-center gap-4">
                  <Phone size={24} color="#ffffff" />
                  <h1>+91 88254 60719 / +91 84387 16946</h1>
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <img src={HalfLogo} alt="" />
            </div>
          </div>

          <div className="w-full max-md:hidden">
            <TextHoverEffect text="DeCo" />
          </div>
          <div className="flex w-full font-garet md:justify-between py-5 items-center max-md:justify-around">
            <div className="flex gap-4 items-center">
              <div onClick={scrollToTopWithOverlay} className="cursor-pointer">
                <div className="border hover:border-slate-500 rounded-full">
                  <ChevronUp />
                </div>
              </div>
              <div
                onClick={scrollToTopWithOverlay}
                className="cursor-pointer text-sm text-muted-foreground hover:underline max-md:hidden"
              >
                Back Top
              </div>
            </div>
            <div className="md:text-center max-md:text-sm">
              2025 © DeCo. All rights resevered.
            </div>
            <div className="flex gap-4 max-md:hidden">
              <div>
                <FiShare2
                  className="hover:text-white transition cursor-pointer"
                  size={24}
                  onClick={() => handleCopyToClipboard(setMessageVisible)}
                />
              </div>
              <a
                href="https://www.linkedin.com/in/team-deco"
                target="_blank"
                className="cursor-pointer"
              >
                <FaLinkedin className="hover:text-white transition" size={24} />
              </a>
              <a
                className="cursor-pointer"
                href="https://wa.me/+918825460719?text=Hello%2C%20What%20Services%20You%20Offer"
                target="_blank"
              >
                <FaWhatsapp className="hover:text-white transition" size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Custom Message Modal */}
      {messageVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-center p-5 rounded-full shadow-lg text-xl">
            <p className="text-black font-lato">URL copied to clipboard!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
