"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BlogDetailCarousel = () => {
  const slides = [
    {
      id: 1,
      image: "/assets/images/blogs/blog-detail-slider-1.png",
      alt: "Image 1",
    },
    {
      id: 2,
      image: "/assets/images/blogs/blog-detail-slider-2.png",
      alt: "Image 2",
    },
    {
      id: 3,
      image: "/assets/images/blogs/blog-detail-slider-3.png",
      alt: "Image 3",
    },
    {
      id: 4,
      image: "/assets/images/blogs/blog-detail-slider-1.png",
      alt: "Image 4",
    },
  ];

  return (
    <div className="relative">
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-4">
        <button className="swiper-button-prev !static !ml-[150px] !mt-[-50px] flex !h-auto !w-auto items-center gap-2 after:hidden">
          <ArrowLeft className="h-4 w-4 text-[#1D1B20]" />
          <span className="text-base font-[500] text-[#1E1E1E]">Previous</span>
        </button>
        <button className="swiper-button-next !static !mr-[180px] !mt-[-50px] flex !h-auto !w-auto items-center gap-2 after:hidden">
          <span className="text-base font-[500] text-[#1E1E1E]">Next</span>
          <ArrowRight className="h-4 w-4 text-[#1D1B20]" />
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        slidesPerView={3}
        centeredSlides={true}
        loop={true}
        slideToClickedSlide={true}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div
                style={{
                  boxShadow: isActive ? "4px 4px 20px 0px #00000080" : "",
                }}
                className={`transition-all duration-300 ${
                  isActive
                    ? "h-[476px] translate-y-0"
                    : "h-[380px] translate-y-12"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogDetailCarousel;
