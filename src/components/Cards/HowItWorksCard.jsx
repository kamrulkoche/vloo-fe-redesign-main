import React from "react";
export default function HowItWorksCard({
  index,
  title,
  subtitle,
  isSelected,
  onClick,
}) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-[30px] rounded-bl-[10px] rounded-tl-[10px] px-[18px] py-[24px] sm:gap-[45px] sm:px-[22px] sm:py-[32px] ${
        isSelected ? "bg-white" : "bg-[#F3F3F3]"
      }`}
      onClick={onClick}
    >
      <p
        className={`${
          isSelected ? "text-[#00A481]" : "text-[#0A2A3C]"
        } text-[60px] font-medium leading-[40px] sm:text-[80px] sm:leading-[50px]`}
      >
        {index + 1}
      </p>
      <div className="flex flex-col justify-center gap-1">
        <p className="text-[18px] font-bold leading-[24px] text-[#0A2A3C] sm:text-[20px] sm:leading-[28px]">
          {title}
        </p>
        <p className="text-[14px] font-normal leading-[20px] text-[#868686] sm:text-[16px] sm:leading-[22px]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
