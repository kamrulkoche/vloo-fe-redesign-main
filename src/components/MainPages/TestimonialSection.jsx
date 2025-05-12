"use client";
import { useEffect, useRef, useState } from "react";
import TestimonialCarousel from "../CustomComponents/Carousels/TestimonialCarousel";

export function TestimonialSection({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(2);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const calculateVisibleCards = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const cardWidth = 468; // 438px + 30px gap
        const fullVisibleCards = Math.floor(containerWidth / cardWidth);
        setVisibleCards(fullVisibleCards);
      }
    };

    calculateVisibleCards();
    window.addEventListener("resize", calculateVisibleCards);

    return () => {
      window.removeEventListener("resize", calculateVisibleCards);
    };
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data?.sub_section?.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="mx-8 my-8 ml-4 w-[93%] rounded-[10px] bg-[#D9F7F0] pl-[10px] md:w-[97%] md:pl-[47px]">
      <p className="px-4 pb-[40px] pt-[10px] text-center text-[32px] font-semibold leading-[44px] text-[#0A2A3C] md:pt-[43px] md:text-left">
        {data?.section_title}
      </p>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden pb-[30px]"
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
      >
        <div
          className="flex gap-[30px] transition-transform duration-700"
          style={{
            transform: `translateX(-${currentIndex * 468}px)`,
          }}
        >
          {data?.sub_section?.map((item, index) => {
            const isLastVisible = index === currentIndex + visibleCards;
            return (
              <div
                key={item.id}
                className={`min-w-[438px] transition-opacity duration-700 ${
                  isLastVisible
                    ? "opacity-100 blur-none md:opacity-50 md:blur-[2px]"
                    : ""
                }`}
              >
                <TestimonialCarousel
                  desc={item.sub_section_title}
                  img={item.upload_files?.[0]?.file_url}
                  name={item.client_name}
                  designation={item.sub_section_sub_title}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
