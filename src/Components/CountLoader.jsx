import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const CountLoader = ({ duration = 2 }) => {
  const innerRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    if (!itemRef.current) return;

    const itemHeight = itemRef.current.offsetHeight;
    const totalHeight = itemHeight * (numbers.length - 1);

    gsap.fromTo(
      innerRef.current,
      { y: 0 },
      {
        y: -totalHeight,
        duration,
        ease: "power2.inOut",
      }
    );
  }, [duration]);

  return (
    <div className="flex text-5xl font-bold text-white items-center">
      <div className="overflow-hidden h-14">
        <div ref={innerRef} className="flex flex-col">
          {numbers.map((number, index) => (
            <div
              key={index}
              ref={index === 0 ? itemRef : null} // Use first item to measure height
              className="h-14 flex items-center justify-center"
            >
              {number}
            </div>
          ))}
        </div>
      </div>
      <span className="h-14 flex items-center justify-center ml-1">0</span>
    </div>
  );
};

export default CountLoader;
