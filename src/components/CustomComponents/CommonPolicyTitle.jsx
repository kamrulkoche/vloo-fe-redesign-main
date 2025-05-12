"use client";
import React from "react";

export default function CommonButton({
  title , subtitle
}) {
  return (
    <>
      <div className="mb-[57px] text-center">
        <p className="text-[48px] font-[700] leading-[64px] text-[#00A481]">
          {title}
        </p>
        <p className="text-[16px] font-[500] leading-[22px] text-[#13293ACC]">
          {subtitle}
        </p>
      </div>
      
    </>
  );
}
