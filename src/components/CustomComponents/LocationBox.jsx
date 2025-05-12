import React from "react";

export default function LocationBox({ title, bgColor }) {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="flex items-center justify-center gap-2 rounded-[29px] px-5 py-3 w-[90%]"
    >
      <img
        src="/assets/icons/location.png"
        alt="location-icon"
        className="h-[16px] w-[13px]"
      />
      <p className="text-center text-[13px] font-medium leading-[18px] text-white">
        {title}
      </p>
    </div>
  );
}
