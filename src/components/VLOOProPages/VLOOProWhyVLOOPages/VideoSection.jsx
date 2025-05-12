import React from "react";

export default function VideoSection() {
  return (
    <div className="mx-[10px] md:mx-[87.5px] mb-[30px]">
      <div className="w-full">
        <video
          src={"/assets/videos/wyg-1.mp4"}
          autoPlay
          loop
          muted
          className="h-[200px] md:h-[508px] w-[300px] md:w-full object-cover"
        />
      </div>
    </div>
  );
}
