import { useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import { heroVideo, smallHeroVideo } from "../utils";

export const useVideoSrc = () => {
  const { width } = useWindowSize();

  // Set initial video source based on window width
  const [videoSrc, setVideoSrc] = useState(
    width < 760 ? smallHeroVideo : heroVideo
  );

  // Function to handle video source change on window resize
  const handleVideoSrcSet = () => {
    if (width < 760) {
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
