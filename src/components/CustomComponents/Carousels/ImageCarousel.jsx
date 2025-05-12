"use client";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const ImageCarousel = ({ images }) => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
    >
      {images.map((item) => {
        return (
          <SwiperSlide key={item.id}>
            {item?.file_url?.endsWith(".mp4") ? (
              <video
                src={item?.file_url}
                autoPlay
                loop
                muted
                playsInline
                className="h-[383px] w-full rounded-[10px] object-cover"
              />
            ) : (
              <img
                src={item?.file_url}
                alt="workspace-image"
                className="h-[383px] w-full rounded-[10px] object-cover"
              />
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageCarousel;
