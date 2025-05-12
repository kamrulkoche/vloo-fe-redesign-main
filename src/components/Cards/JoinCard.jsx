"use client";
import { motion, useAnimation } from "framer-motion";
import React from "react";

export default function JoinCard({
  title,
  subTitle,
  img,
  animate,
  isProPage = false,
}) {
  const controls = useAnimation();

  React.useEffect(() => {
    if (animate) {
      controls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.5 },
      });
    }
  }, [animate, controls]);

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-[16px] bg-[#DBEDE7] p-6 shadow-sm sm:p-8 ${
        isProPage ? "bg-[#F3F3FE]" : ""
      }`}
    >
      <motion.img
        src={img}
        alt={title}
        className="mb-6 mt-2 h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] lg:h-[120px] lg:w-[120px]"
        animate={controls}
      />
      <p
        className={`mb-2 text-center text-[18px] font-semibold leading-[22px] sm:mb-[10px] sm:text-[24px] sm:leading-[28px] lg:text-[28px] lg:leading-[33.6px] ${
          isProPage ? "text-[#00A481]" : "text-[#006988]"
        }`}
      >
        {title}
      </p>
      <p className="text-center text-[14px] font-normal leading-[18px] text-[#868686] sm:text-[16px] sm:leading-[20px] lg:text-[20px] lg:leading-[24px]">
        {subTitle}
      </p>
    </div>
  );
}
