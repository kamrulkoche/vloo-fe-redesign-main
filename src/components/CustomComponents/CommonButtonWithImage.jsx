"use client";
import React from "react";

export default function CommonButtonWithImage({
  name,
  imgSrc,
  bgColor = "#00A481",
  onClick = () => {},
}) {
  return (
    <button
      className={`flex h-[60px] w-[180px] items-center rounded-[30px] px-6 py-[5px] text-[14px] font-medium leading-[24px] text-white transition duration-200`}
      style={{
        backgroundColor: bgColor,
      }}
      onClick={onClick}
    >
      {/* Profile Image */}
      {imgSrc && (
        <img
          src={imgSrc}
          alt="profile"
          className="ml-[-10px] mr-4 h-[36px] w-[36px] rounded-full object-cover"
        />
      )}
      {/* Name */}
      <span>{name}</span>
    </button>
  );
}
