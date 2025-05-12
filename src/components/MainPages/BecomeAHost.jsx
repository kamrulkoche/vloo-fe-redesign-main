import React from "react";

export default function BecomeAHost() {
  return (
    <div className="mb-4 flex flex-col text-center items-center justify-center rounded-[10px] bg-[#006988] pb-[60px] pt-[51px] sm:mb-8">
      <img
        src="/assets/VLOO-logo-2.png"
        alt="vloo-logo"
        className="mb-[31.5px] h-[30px] w-[171px]"
      />
      <p className="mb-[20px] text-[48px] font-bold leading-[64px] text-white">
        Are you a commercial property owner?
      </p>
      <p className="mb-[65px] text-[20px] font-normal leading-[24.2px] text-[#F3F3F3]">
        Set up a work station and make money on a day to day basis
      </p>
      <button className="h-[51px] w-[200px] rounded-[5px] bg-[#00A481] text-[18px] font-bold leading-[24px] text-white transition duration-200 hover:bg-[#399A79]">
        Become a host
      </button>
    </div>
  );
}
