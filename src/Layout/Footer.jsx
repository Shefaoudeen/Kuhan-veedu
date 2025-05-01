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
import React, { useState, useRef, useEffect } from "react";
import { TextHoverEffect } from "../Components/ui/text-hover-effect";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { HalfLogo } from "../assets";
import emailjs from '@emailjs/browser';
import { meta } from "@eslint/js";
import RevealOverlay from "../Components/RevealOverlay";

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
  const [statusMessage, setStatusMessage] = useState(""); // Message for form submission status
  const [showStatus, setShowStatus] = useState(false); // Show status message

  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState("*Captcha validation");
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const overlayRef = useRef(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateCaptcha = () => {
    const answer = parseInt(userAnswer);
    if (!isNaN(answer)) {
      const isAnswerCorrect = answer === num1 + num2;

      if (isAnswerCorrect) {
        const randomResponse = correctAnswers[Math.floor(Math.random() * correctAnswers.length)];
        setIsCorrect(randomResponse);
        setCaptchaPassed(true);
        return true;
      } else {
        const randomResponse = wrongAnswer[Math.floor(Math.random() * wrongAnswer.length)];
        setIsCorrect(randomResponse);
        setUserAnswer("");
        setCaptchaPassed(false);
        return false;
      }
    }
    return false;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      validateCaptcha();
      // Generate new captcha after validation
      setNum1(Math.floor(Math.random() * 10) + 1);
      setNum2(Math.floor(Math.random() * 10) + 1);
    }
  };

  const resetCaptcha = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setUserAnswer("");
    setCaptchaPassed(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsEmailSending(true);

    // Validate captcha before sending email
    if (!captchaPassed && !validateCaptcha()) {
      setStatusMessage("Please complete the captcha correctly first");
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
      return;
    }

    // Check if required fields are filled
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage("Please fill in all required fields");
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
      return;
    }

    // EmailJS service, template, and user IDs (replace with your actual IDs)
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: `
      From: ${formData.name}
      Email: ${formData.email}
      ${formData.message}`
    };

    // Send email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        setStatusMessage("Email sent successfully!");
        setShowStatus(true);
        setTimeout(() => setShowStatus(false), 3000);

        // Reset form
        setFormData({
          name: "",
          email: "",
          message: ""
        });
        resetCaptcha();

      }, (error) => {
        console.error('Failed to send email:', error);
        console.log(publicKey, serviceId, templateId);
        setStatusMessage("Failed to send email. Please try again.")
        setShowStatus(true);
        setTimeout(() => setShowStatus(false), 3000);
      })
      .finally(() => {
        setIsEmailSending(false);
      })
  };


  const scrollToTopWithOverlay = () => {
      overlayRef.current.revealTo('#portfolio')
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
    <>
      <RevealOverlay ref={overlayRef} />
      <div className="flex w-screen justify-center items-center bg-[#070707] text-white mt-10">
        <div
          ref={overlayRef}
          className="fixed top-0 left-0 w-full h-screen bg-black z-[9999] translate-y-full "
        ></div>
        <div className="flex flex-col md:w-[80%] max-md:w-[90%] justify-center items-center">
          <div className="flex flex-col w-full justify-center items-center md:h-[125vh] gap-16 max-md:py-[5vh]">
            <div
              id="main-text"
              className="text-6xl text-center -translate-y-16 font-aboreto flex flex-col gap-4 max-md:text-xl"
            >
              <h1>Not yet convinced?</h1>
              <h1>Let's Talk</h1>
            </div>
            <div className="w-full">
              <form ref={formRef} onSubmit={(e) => sendEmail(e)} className="md:px-20 flex flex-col gap-12 max-md:gap-8">
                <div className="flex max-md:flex-col gap-8">
                  <div className="relative md:w-[50%]">
                    <input
                      type="text"
                      id="charming-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
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
                      type="email"
                      id="email-address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
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
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                    className="peer w-full text-white p-2 max-md:my-6 pt-6 bg-black placeholder-transparent border-b border-[#f5f5f5] focus:outline-none focus:border-white focus:border focus:rounded-xl duration-200 transition-all"
                  />
                  <label
                    htmlFor="project-details"
                    className="absolute left-2 -top-2 text-sm text-gray-400 bg-black px-1 transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#f5f5f5] peer-focus:-top-2 peer-focus:text-sm peer-focus:text-white"
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
                <div className="min-w-[250px] text-center md:hidden">
                  {isCorrect}
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-white text-black font-semibold px-10 py-2 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {isEmailSending ? "Sending..." : "Send Mail"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div
            className="flex flex-col md:h-screen w-full items-center justify-between"
            id="connect"
          >
            <div className="w-full flex flex-col justify-center md:gap-4 items-center py-4 text-center">
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
              <div className="flex flex-col w-screen font-lato flex-1 md:hidden">
                <div className="flex w-full items-start flex-col gap-4 px-12 py-8 text-sm">
                  <div className="flex justify-center gap-4 items-center">
                    <MapPin size={24} color="#ffffff" />
                    <h1>Puducherry / Bangalore</h1>
                  </div>
                  <div className="flex justify-center gap-4 items-center">
                    <Mail size={24} color="#ffffff" />
                    reachus@teamdeco.in
                  </div>
                  <div className="flex justify-center items-center gap-4">
                    <Phone size={24} color="#ffffff" />
                    <h1>+91 88254 60719 / +91 84387 16946</h1>
                  </div>
                </div>
              </div>
              <div className="hidden">
                <img src={HalfLogo} alt="" className="scale-[80%]" />
              </div>
            </div>

            <div className="w-full max-md:hidden">
              <TextHoverEffect text="DeCo" />
            </div>
            <div className="flex w-full font-garet md:justify-between py-5 items-center max-md:justify-around">
              <div className="flex gap-4 items-center max-md:hidden">
                <button onClick={scrollToTopWithOverlay} className="cursor-pointer">
                  <div className="border hover:border-slate-500 rounded-full">
                    <ChevronUp />
                  </div>
                </button>
                <div
                  onClick={scrollToTopWithOverlay}
                  className="cursor-pointer text-sm text-muted-foreground hover:underline max-md:hidden"
                >
                  Back To Top
                </div>
              </div>
              <div className="md:text-center max-md:text-sm font-garet text-sm text-stone-400">
                2025 © DeCo. All rights reserved.
              </div>
              <div className="flex gap-4 max-md:hidden">
                <a>
                  <FiShare2
                    className="hover:text-white transition cursor-pointer"
                    size={24}
                    onClick={() => handleCopyToClipboard(setMessageVisible)}
                  />
                </a>
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

        {/* Custom Message Modal for URL Copy */}
        {messageVisible && (
          <div className="fixed inset-0 duration-700 transform bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white text-center px-5 py-2 rounded-full shadow-lg text-lg">
              <p className="text-black font-lato">URL copied to clipboard!</p>
            </div>
          </div>
        )}

        {/* Status Message for Form Submission */}
        {showStatus && (
          <div className="fixed inset-0 duration-700 transform bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white text-center px-5 py-2 rounded-full shadow-lg text-lg">
              <p className="text-black font-lato">{statusMessage}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Footer;