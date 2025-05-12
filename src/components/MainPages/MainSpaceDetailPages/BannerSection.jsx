"use client";

import { PauseCircle, PlayCircle } from "lucide-react";
import { useRef, useState } from "react";

const dummyData = [
  { id: 1, img: "/assets/images/user-image/user-image-1.png" },
  { id: 2, img: "/assets/images/user-image/user-image-2.png" },
  { id: 3, img: "/assets/images/user-image/user-image-3.png" },
  { id: 4, img: "/assets/images/user-image/user-image-4.png" },
];

export default function BannerSection({ data }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isVideo = data?.file?.endsWith(".mp4");

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle scroll down when 'Book this space' is clicked
  const handleBookSpaceClick = () => {
    window.scrollBy({
      top: window.innerHeight, // Scroll down by 100vh
      behavior: "smooth", // Smooth scroll
    });
  };

  return (
    <div className="relative h-[380px] w-full sm:h-[511px]">
      {/* Conditional Rendering for Video or Image */}
      {isVideo ? (
        <video
          ref={videoRef}
          src={data.file}
          loop
          muted
          className="h-[380px] w-full object-cover md:h-[511px] rounded-b-[50px]"
        />
      ) : (
        <img
          src={data.file}
          alt={data?.spaceName || "banner"}
          className="h-[380px] w-full object-cover md:h-[511px] rounded-b-[50px]"
        />
      )}

      {/* Opacity Layer */}
      <div className="absolute inset-0 bg-black opacity-40 rounded-b-[50px]" />

      {/* Contents */}
      <div className="absolute inset-0 flex w-full flex-col mt-6 sm:mt-[70px] sm:ml-[73px] mx-4 sm:mx-0 ">
        <p className="mb-3 font-bold text-white text-3xl sm:text-[48px] sm:leading-[64px] mr-4 sm:mr-28">
          {data?.spaceName}
        </p>
        <p className="text-white text-lg sm:text-2xl font-normal mr-4">
          "{data?.unique}"
        </p>
        <div className="mb-2 flex items-center justify-center gap-7 sm:mb-6 sm:flex-row sm:justify-start">
          {/* <button
            className={`h-[60px] w-[120px] rounded-[5px] bg-[#006988] text-[18px] font-medium leading-[24px] text-white transition duration-200 sm:w-[180px]`}
            onClick={handleBookSpaceClick} // Scroll on click
          >
            Book this space
          </button> */}

          {/* Show Play Button Only for Videos */}
          {/* {isVideo && (
            <div onClick={handlePlayPause} className="cursor-pointer">
              {isPlaying ? (
                <PauseCircle
                  color="white"
                  strokeWidth={1}
                  className="h-[40px] w-[40px] sm:h-[60px] sm:w-[60px]"
                />
              ) : (
                <PlayCircle
                  color="white"
                  strokeWidth={1}
                  className="h-[40px] w-[40px] sm:h-[60px] sm:w-[60px]"
                />
              )}
            </div>
          )} */}
        </div>

        {/* Follower Section */}
        <div className="flex items-center gap-2 py-6 justify-start">
          {dummyData?.map((item, index) => (
            <img
              key={item.id}
              src={item.img}
              alt="user-image"
              className={`h-[60px] w-[63.25px] rounded-full object-cover ${index !== 0 ? "-ml-[21px]" : ""}`}
            />
          ))}

          <div className="lg sm:text-2xl font-bold ml-2">
            <p className=" text-[#006988] leading-[34px]">250+</p>
            <p className=" text-white">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
