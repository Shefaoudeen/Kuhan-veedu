import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Homepage from "./Pages/Homepage";
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CountLoader from "./Components/CountLoader";
import { preloadAssets } from "./utils";
import CustomCursor from "./Components/CustomCursor";
import CountdownPage from "./Components/CountdownPage";

export default function App() {
  const [isLoading, setLoading] = useState(false);
  const [isCountUpFinished, setIsCountupFinished] = useState(false);
  useGSAP(() => {
    if (isCountUpFinished) {
      gsap.to("#wait-text", {
        y: 0,
        duration: 1,
        opacity: 1,
        ease: "power2.out",
      });
    }
  }, [isCountUpFinished]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      smooth: true,
      wheelMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  });

  useEffect(() => {
    let timer;
    if (isCountUpFinished) {
      timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [isCountUpFinished]);

  useEffect(() => {
    const runPreloader = async () => {
      const preloadPromise = preloadAssets();
      const timerPromise = new Promise((resolve) => setTimeout(resolve, 4000));

      await Promise.all([preloadPromise, timerPromise]);

      setIsCountupFinished(true); // Trigger transition/text change immediately

      // Wait an extra 1 second before removing the loader
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    runPreloader();
  }, []);

  return (
    <BrowserRouter>
      <CustomCursor />
      {isLoading ? (
        <div className="w-screen h-screen flex flex-col gap-1 text-center items-center justify-center bg-black z-50">
          <h2
            className={`text-4xl font-bold font-aboreto duration-300 ease-in-out text-white ${
              isCountUpFinished
                ? "opacity-0 translate-y-20"
                : "opacity-100 translate-y-0"
            }`}
          >
            WAIT
          </h2>
          <CountLoader duration={4} />
          <h2
            className={`text-4xl font-bold font-aboreto duration-300 ease-in-out text-white ${
              isCountUpFinished
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            Let's Go
          </h2>
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<CountdownPage />} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/counting" element={<CountdownPage />} />
            </Route>
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}
