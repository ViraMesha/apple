import { useEffect, useState } from "react";
import { heroVideo, smallHeroVideo } from "../utils";

export const useVideoSrc = () => {
  // Set initial video source based on window width
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 540 ? smallHeroVideo : heroVideo
  );

  // Function to handle video source change on window resize
  const handleVideoSrcSet = () => {
    if (window.innerWidth < 540) {
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

  return videoSrc;
};
