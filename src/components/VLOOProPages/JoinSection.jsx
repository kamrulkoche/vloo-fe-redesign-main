"use client";
import JoinCard from "@/components/Cards/JoinCard";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const dummyData = [
  {
    id: 1,
    title: "Increased liquidity",
    subTitle: "Improve your bottom line…",
    img: "/assets/images/pro-wyg-1.svg",
  },
  {
    id: 2,
    title: "Automation",
    subTitle: "Improve your bottom line…",
    img: "/assets/images/pro-wyg-2.svg",
  },
  {
    id: 3,
    title: "Flexibility",
    subTitle: "Improve your bottom line…",
    img: "/assets/images/pro-wyg-3.svg",
  },
];

export default function JoinSection({ data }) {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false, // Allow repeated animations
  });

  const [activeIndex, setActiveIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (inView && !isAnimating) {
      setIsAnimating(true);
      let index = 0;

      const interval = setInterval(() => {
        if (index < dummyData?.length) {
          setActiveIndex(index);
          index++;
        } else {
          clearInterval(interval);
          setActiveIndex(-1);
          setIsAnimating(false);
        }
      }, 800); // 800ms delay between each animation

      return () => {
        clearInterval(interval);
        setIsAnimating(false);
      };
    }
  }, [inView]);

  return (
    <div ref={ref} className="mt-[180px] sm:mt-0 mb-[25px] flex flex-col">
      <div className="mx-0 mt-72 pb-[46px] pt-[50px] text-center text-[36px] font-bold leading-[48px] text-[#0A2A3C] md:mx-[300px] md:mt-0">
        {data.section_title}
      </div>
      <div className="mx-8 mb-[46px] grid grid-cols-1 gap-4 sm:grid-cols-2 md:mx-20 lg:grid-cols-3">
        {data?.sub_section?.map((item, index) => (
          <JoinCard
            key={item?.id}
            title={item?.sub_section_title}
            subTitle={item?.sub_section_sub_title}
            img={item?.upload_files?.[0]?.file_url}
            animate={index === activeIndex}
            isProPage={true}
          />
        ))}
      </div>
    </div>
  );
}
