"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MinimalCustomCursor() {
  const [mousePosition, setMousePosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [cursorPosition, setCursorPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    // Add hover detection to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, [role='button'], select, textarea"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, []);

  // Update cursor position with easing effect
  useEffect(() => {
    const cursorLag = 0.15; // Adjust for more or less lag (0.1 to 0.2 is usually good)

    const updateCursorPosition = () => {
      const dx = mousePosition.x - cursorPosition.x;
      const dy = mousePosition.y - cursorPosition.y;

      setCursorPosition({
        x: cursorPosition.x + dx * cursorLag,
        y: cursorPosition.y + dy * cursorLag,
      });

      requestAnimationFrame(updateCursorPosition);
    };

    const animationId = requestAnimationFrame(updateCursorPosition);

    return () => cancelAnimationFrame(animationId);
  }, [mousePosition, cursorPosition]);

  return (
    <motion.div
      className="max-md:hidden"
      style={{
        width: 18,
        height: 18,
        borderRadius: "50%",
        backgroundColor: "#fff",
        mixBlendMode: "difference",
        position: "fixed",
        left: cursorPosition.x - 17.5,
        top: cursorPosition.y - 17.5,
        pointerEvents: "none",
        zIndex: 9999,
        transform: `scale(${isHovering ? 1.5 : 1})`,
        transition: "transform 0.2s ease-out",
      }}
    />
  );
}
