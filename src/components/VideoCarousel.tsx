import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";

interface VideoCarouselProps {
  id: string;
  textLists: string[];
  video: string;
  videoDuration: number;
}

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLDivElement[]>([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState<VideoCarouselProps[]>([]);
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animate the progress of the video
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {},
        onComplete: () => {},
      });
    }
  }, [videoId, startPlay]);

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
                    playsInline
                    preload="auto"
                    muted
                    ref={(el) =>
                      (videoRef.current[index] = el as HTMLVideoElement)
                    }
                    onPlay={() => {
                      setVideo((prevVideo) => ({
                        ...prevVideo,
                        isPlaying: true,
                      }));
                    }}
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
          {videoRef.current.map((_, index) => (
            <span
              key={index}
              ref={(el) => (videoDivRef.current[index] = el as HTMLDivElement)}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) =>
                  (videoSpanRef.current[index] = el as HTMLSpanElement)
                }
              ></span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoCarousel;
