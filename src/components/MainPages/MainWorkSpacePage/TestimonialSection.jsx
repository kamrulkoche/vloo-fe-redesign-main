"use client";
import { useEffect, useRef, useState } from "react";
import TestimonialCarousel from "@/components/CustomComponents/Carousels/TestimonialCarousel";

const dummyData = [
  {
    id: 1,
    desc: "I found VLOO as the best place for workspaces. Their pricing is also much reasonable.",
    img: "/assets/images/profile-1.png",
    name: "Lue Vincent",
    designation: "CEO, ABCD Inc.",
  },
  {
    id: 2,
    desc: "VLOO is the best. I prefer to work on their shared workspaces, much reliable!",
    img: "/assets/images/profile-2.png",
    name: "Hamish Marshall",
    designation: "CEO, XYZ Inc.",
  },
  {
    id: 3,
    desc: "VLOO is the best. I prefer to work on their shared workspaces, much reliable!",
    img: "/assets/images/profile-1.png",
    name: "John Doe",
    designation: "CEO, ABC Inc.",
  },
  {
    id: 4,
    desc: "VLOO is the best. I prefer to work on their shared workspaces, much reliable!",
    img: "/assets/images/profile-1.png",
    name: "John Doe",
    designation: "CEO, ABC Inc.",
  },
];

export function TestimonialSection() {
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
        prevIndex === dummyData?.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="mx-8 my-8 rounded-[10px] bg-[#D9F7F0] pl-[47px]">
      <p className="pb-[40px] pt-[43px] text-left text-[32px] font-semibold leading-[44px] text-[#0A2A3C]">
        Trusted Customers
      </p>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden pb-[77px]"
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
      >
        <div
          className="flex gap-[30px] transition-transform duration-700"
          style={{
            transform: `translateX(-${currentIndex * 468}px)`,
          }}
        >
          {dummyData?.map((item, index) => {
            const isLastVisible = index === currentIndex + visibleCards;
            return (
              <div
                key={item.id}
                className={`min-w-[438px] transition-opacity duration-700 ${
                  isLastVisible ? "opacity-50 blur-[2px]" : ""
                }`}
              >
                <TestimonialCarousel
                  desc={item.desc}
                  img={item.img}
                  name={item.name}
                  designation={item.designation}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
