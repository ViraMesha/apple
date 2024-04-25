import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { animateWithGsap } from "../utils/animations";
gsap.registerPlugin(ScrollTrigger);

type ProcessT = "video-reset" | "play" | "pause" | "video-end" | "video-last";

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]); // Reference for video elements
  const videoSpanRef = useRef<HTMLSpanElement[]>([]); // Reference for video span elements
  const videoDivRef = useRef<HTMLDivElement[]>([]); // Reference for video div elements

  const [video, setVideo] = useState({
    // State for managing video properties
    isEnd: false, // Indicates if the video has ended
    startPlay: false, // Indicates if the video has started playing
    videoId: 0, // Index of the current video
    isLastVideo: false, // Indicates if it's the last video
    isPlaying: false, // Indicates if the video is currently playing
  });
  const [loadedData, setLoadedData] = useState<
    React.SyntheticEvent<HTMLVideoElement, Event>[]
  >([]);
  // destructure video properties
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    animateWithGsap("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  // Effect for handling video progress animation
  useEffect(() => {
    let currentProgress = 0; // where we are currently
    let span = videoSpanRef.current; // the span element of the current video

    // if we have the span of the specific video id, then we can animate it
    if (span[videoId]) {
      // animate the progress of the video
      let anim = gsap.to(span[videoId], {
        // what we'll happen once the animation updates
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                    ? "10vw" // tablet
                    : "4vw", // laptop
            });

            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        // what we happens if the animation is complete
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });

            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      // update the progress bar
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate);
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  // Effect for handling video playback
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause(); // if we came to the end and we are not longer playing, then pause it
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // Function to handle video process
  const handleProcess = (type: ProcessT, index?: number) => {
    switch (type) {
      case "video-end":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: true,
          videoId: index! + 1,
        }));
        break;

      case "video-last":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: true,
        }));
        break;

      case "video-reset":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: false,
          videoId: 0,
        }));
        break;

      case "play":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;

      case "pause":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !prevVideo.isPlaying,
        }));
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetadata = (
    index: number,
    event: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    setLoadedData((pre) => [...pre, event]);
  };

  return (
    <>
      {/* Iterate over each slide in the highlightsSlides array */}
      <div className="flex items-center">
        {hightlightsSlides.map((slide, index) => {
          const { id, textLists, video, videoDuration } = slide;
          return (
            <div key={id} id="slider" className="sm:pr-20 pr-10">
              {/* Container for each video carousel */}
              <div className="video-carousel_container">
                {/* Video player */}
                <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                  <video
                    id="video"
                    playsInline={true}
                    preload="auto"
                    muted
                    ref={(el) =>
                      // we are finding a specific index in the videoRefs' array and setting it to this current video element
                      (videoRef.current[index] = el as HTMLVideoElement)
                    }
                    onPlay={() => {
                      // spread all the information about the video, but we set isPlaying to true
                      setVideo((prevVideo) => ({
                        ...prevVideo,
                        isPlaying: true,
                      }));
                    }}
                    onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
                    onEnded={() =>
                      index !== 3
                        ? handleProcess("video-end", index)
                        : handleProcess("video-last")
                    }
                    className={`${id === 2 && "translate-x-44"} pointer-events-none`}
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                </div>
                {/* Text overlay */}
                <div className="absolute top-12 left-[5%] z-10">
                  {/* Render each text element in the textLists array */}
                  {textLists.map((text) => (
                    <p key={text} className="md:text-2xl text-xl font-medium">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress tracking and pause btn */}
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map(
            (
              _,
              index // Map over each video reference
            ) => (
              <span
                key={index}
                ref={(el) =>
                  // whenever we have a new video, we add it to this videoDivRef array
                  (videoDivRef.current[index] = el as HTMLDivElement)
                }
                className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              >
                <span
                  className="absolute h-full w-full rounded-full"
                  ref={(el) =>
                    // whenever we have a new video, we add it to this videoSpanRef array
                    (videoSpanRef.current[index] = el as HTMLSpanElement)
                  }
                />
              </span>
            )
          )}
        </div>
        {/* Play/pause button */}
        <button className="control-btn" type="button">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                  ? () => handleProcess("play")
                  : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
