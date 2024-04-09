import { hightlightsSlides } from "../constants";

const VideoCarousel = () => {
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
                  <video id="video" playsInline preload="auto" muted>
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
    </>
  );
};

export default VideoCarousel;
