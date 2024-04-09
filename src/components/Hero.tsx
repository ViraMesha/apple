import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../utils";
import { useEffect, useState } from "react";

const Hero = () => {
  // Set initial video source based on window width
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  // Function to handle video source change on window resize
  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  // Add resize event listener on component mount
  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, []);

  // Use GSAP for animation when component mounts
  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 3,
    });

    gsap.to("#cta", {
      opacity: 1,
      y: -50,
      delay: 3,
    });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        {/* Title with fade-in animation */}
        <p id="hero" className="hero-title">
          IPhone 15 Pro
        </p>
        <div className="md:w-5/6 w-3/4">
          {/* Video element with autoplay and muted */}
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
          >
            {/* Source based on video source state */}
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* A call-to-action btn */}
      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
