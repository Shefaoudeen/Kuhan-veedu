import React, { useState, useEffect, useRef } from "react";
import { DeCoLogo } from "../assets";
import { MdMenu } from "react-icons/md";
import { X } from "lucide-react";
import { FiShare2 } from "react-icons/fi";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { gsap } from "gsap";
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

const navLinks = [
  { title: "PORTFOLIO", link: "#portfolio" },
  { title: "STORY", link: "#storyblock" },
  { title: "SOLUTIONS", link: "#solutions" },
  { title: "APPROACH", link: "#approach" },
  { title: "CONNECT", link: "#connect" },
];

const Header = () => {
  const [menuClicked, setMenuClicked] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false); // Track visibility of custom message
  const listRefs = useRef([]);
  const connectCardRef = useRef(null);
  const overlayRef = useRef(null);
  listRefs.current = [];

  const addToRefs = (el) => {
    if (el && !listRefs.current.includes(el)) {
      listRefs.current.push(el);
    }
  };

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (menuClicked) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.height = "100vh";

      const tl = gsap.timeline();
      tl.fromTo(
        listRefs.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        }
      ).fromTo(
        connectCardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    } else {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
      body.style.height = "auto";
    }

    return () => {
      html.style.overflow = "auto";
      body.style.overflow = "auto";
      body.style.height = "auto";
    };
  }, [menuClicked]);

  useEffect(() => {
    // Ensure overlay is hidden on mount
    gsap.set(overlayRef.current, { y: "100%" });
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();

    setMenuClicked(false)
    overlayRef.current.revealTo(target);

  };

  return (
    <>
      {/* Overlay Animation Div */}
      <RevealOverlay ref={overlayRef} />

      {/* Header */}
      <div className="w-full p-5 flex justify-between absolute top-0 left-0 z-50 bg-transparent">
        {menuClicked && (
          <div className="fixed top-0 left-0 w-full h-full bg-black text-white z-[999999] flex flex-col">
            <div className="flex justify-between items-center p-5">
              <a href="http://teamdeco.in/">
                <img src={DeCoLogo} alt="Logo" className="w-[80px] invert" />
              </a>
              <X
                size={30}
                className="text-white hover:scale-110 transition cursor-pointer"
                onClick={() => setMenuClicked(false)}
              />
            </div>

            <div className="flex flex-1 md:px-32 py-8 max-md:px-8 overflow-hidden">
              <div className="text-5xl font-aboreto max-md:text-3xl">
                <ul className="flex flex-col h-full justify-around text-gray-900 max-md:pb-10">
                  {navLinks.map((item, index) => (
                    <li key={index} ref={addToRefs}>
                      <a
                        href={item.link}
                        onClick={(e) => handleNavClick(e, item.link)}
                        className="text-white/60 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="w-full flex flex-col items-end justify-end p-4 text-2xl max-md:hidden"
                ref={connectCardRef}
              >
                <div className="flex flex-col gap-5">
                  <div className="font-lato flex flex-col gap-3 text-gray-400">
                    <h1 className="font-garet text-white">Connect Now</h1>
                    <h1>+91 84387 16946</h1>
                    <h1>+91 88254 60719</h1>
                    <h1 className="font-garet">
                      reachus<span className="font-lato">@</span>teamdeco.in
                    </h1>
                  </div>
                  <div className="flex gap-4 text-gray-400 w-full justify-between px-8">
                    <button>
                      <FiShare2
                        className="hover:text-white transition cursor-pointer"
                        size={24}
                        onClick={() => handleCopyToClipboard(setMessageVisible)}
                      />
                    </button>
                    <a
                      href="https://www.linkedin.com/in/team-deco"
                      target="_blank"
                      className="cursor-pointer"
                    >
                      <FaLinkedin
                        className="hover:text-white transition"
                        size={24}
                      />
                    </a>
                    <a
                      className="cursor-pointer"
                      href="https://wa.me/+918825460719?text=Hello%2C%20What%20Services%20You%20Offer"
                      target="_blank"
                    >
                      <FaWhatsapp
                        className="hover:text-white transition"
                        size={24}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Bar */}
        <div>
          <a href="http://teamdeco.in/">
            <img src={DeCoLogo} alt="Logo" className="w-[80px]" />
          </a>
        </div>
        <div className="flex items-center gap-8 text-lg font-lato">
          <a
            className="max-md:hidden cursor-pointer"
            onClick={(e) => handleNavClick(e, "#connect")}
          >
            CONTACT
          </a>
          <a
            className="max-md:hidden cursor-pointer"
            onClick={() => setMenuClicked(true)}
          >
            MENU
          </a>
          <button onClick={() => setMenuClicked(true)}>
            <MdMenu
              className="hover:scale-150 duration-200 ease-linear cursor-pointer"
            />
          </button>
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
    </>
  );
};

export default Header;
