import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';
import { DeCoLogo } from '../assets'; // Adjust the path as necessary

const RevealOverlay = forwardRef((props, ref) => {
    const overlayRef = useRef(null);

    // Hide overlay on initial mount
    useEffect(() => {
        gsap.set(overlayRef.current, { y: "100%" });
    }, []);

    useImperativeHandle(ref, () => ({
        revealTo(target, onComplete = () => { }) {
            if (!target) return;

            // Slide overlay in
            gsap.to(overlayRef.current, {
                y: 0,
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: () => {
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            const el = document.querySelector(target);
                            if (el) el.scrollIntoView({ behavior: "auto" });

                            // Slide overlay out
                            gsap.to(overlayRef.current, {
                                y: "-100%",
                                duration: 0.8,
                                delay: 0.2,
                                ease: "power2.inOut",
                                onComplete: () => {
                                    gsap.set(overlayRef.current, { y: "100%" });
                                    onComplete(); // optional callback after animation
                                },
                            });
                        }, 200);
                    });
                },
            });
        },
    }));

    return (
        <div
            ref={overlayRef}
            className="fixed top-0 left-0 w-full h-full bg-black z-[999998] flex items-center justify-center pointer-events-none"
            style={{ transform: "translateY(100%)" }}
        >
            <img src={DeCoLogo} alt="logo" className="w-40 md:w-96 filter invert opacity-50" />

        </div>
    );
});

export default RevealOverlay;
