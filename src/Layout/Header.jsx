import React, { useState, useEffect, useRef } from "react";
import { DeCoLogo } from "../assets";
import { MdMenu } from "react-icons/md";
import { X } from "lucide-react";
import { FiShare2 } from "react-icons/fi";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { gsap } from "gsap";

const navLinks = [
  {
    title: "PORTFOLIO",
    link: "#portfolio",
  },
  {
    title: "STORY",
    link: "#storyblock",
  },
  {
    title: "SOLUTIONS",
    link: "#solutions",
  },
  {
    title: "VOICES",
    link: "#voices",
  },
  {
    title: "APPROACH",
    link: "#approach",
  },
  {
    title: "CONNECT",
    link: "#connect",
  },
];

const Header = () => {
  const [menuClicked, setMenuClicked] = useState(false);
  const listRefs = useRef([]);
  const connectCardRef = useRef(null);
  listRefs.current = [];

  const addToRefs = (el) => {
    if (el && !listRefs.current.includes(el)) {
      listRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (menuClicked) {
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
          duration: 0.8,
          ease: "power2.out",
        },
        "+=0.2" // small delay after last item
      );
    }
  }, [menuClicked]);

  return (
    <div className="w-full p-5 flex justify-between absolute top-0 left-0 z-50 bg-transparent">
      {menuClicked && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black text-white z-[9999999] flex flex-col">
          <div className="flex justify-between items-center p-5">
            <img src={DeCoLogo} alt="Logo" className="w-[80px] invert" />
            <X
              size={30}
              className="text-white hover:scale-110 transition"
              onClick={() => setMenuClicked(false)}
            />
          </div>

          <div className="flex flex-1 md:px-32 py-8  max-md:px-8">
            <div className="text-5xl font-aboreto max-md:text-3xl">
              <ul className="flex flex-col h-full justify-around text-gray-900 max-md:pb-10">
                {navLinks.map((item, index) => (
                  <li key={index} ref={addToRefs}>
                    <a
                      href={item.link}
                      onClick={() => setMenuClicked(false)}
                      className="text-white/60 cursor-none hover:text-white transition-colors duration-300 ease-in-out"
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
                    reachdeco<span className="font-lato">@</span>gmail.com
                  </h1>
                </div>
                <div className="flex gap-4 text-gray-400 w-full justify-between px-8">
                  <FiShare2
                    className="text-gray-400 cursor-none hover:text-white transition-colors duration-300"
                    size={24}
                  />
                  <FaLinkedin
                    size={24}
                    className="cursor-none hover:text-white transition-colors duration-300"
                  />
                  <FaWhatsapp
                    size={24}
                    className="cursor-none hover:text-white transition-colors duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Normal Header */}
      <div>
        <img src={DeCoLogo} alt="Logo" className="w-[80px]" />
      </div>
      <div className="flex items-center gap-8 text-lg font-lato">
        <div className="max-md:hidden">CONTACT</div>
        <div onClick={() => setMenuClicked(true)} className="max-md:hidden">
          MENU
        </div>
        <MdMenu
          onClick={() => setMenuClicked(true)}
          className="hover:scale-150 duration-200 ease-linear"
        />
      </div>
    </div>
  );
};

export default Header;
