import { useGSAP } from "@gsap/react";
import { useVideoSrc } from "../hooks";
import { animateWithGsap } from "../utils/animations";

const Hero = () => {
  const videoSrc = useVideoSrc();

  // Use GSAP for animation when component mounts
  useGSAP(() => {
    animateWithGsap("#hero", {
      opacity: 1,
      delay: 2,
    });

    animateWithGsap("#cta", {
      opacity: 1,
      y: -50,
      delay: 2,
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
            playsInline
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
