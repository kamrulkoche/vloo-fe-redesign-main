"use client";
import React, { useState } from "react";
import FAQSection2 from "./FAQSection2";

const FaqComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div
        className="relative mb-[40px] h-[304px] w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/faqBanner.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white md:px-8">
          <h1 className="mb-[26px] text-[36px] font-[700] leading-[48px] md:text-[36px]">
            VLOO here, how can we help?
          </h1>
          <p className="mb-[50px] text-[16px] font-[500] leading-[22px] text-[#DEDEDE] md:text-[16px]">
            We believe that shopping should be an enjoyable and hassle-free
            experience.
          </p>
          <div className="w-full max-w-[55rem] rounded-[10px] bg-white p-2 shadow-lg">
            <div className="relative w-full">
              <img
                src="/assets/icons/search-icon.svg"
                alt="Search Icon"
                className="absolute left-4 top-1/2 h-[16px] w-[16px] -translate-y-1/2 transform"
              />
              <input
                type="text"
                placeholder="Search by category"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full rounded-full px-4 py-2 pl-12 text-[13px] font-[500] leading-[18px] text-[#0A2A3C] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
      <FAQSection2 searchQuery={searchQuery} />
    </div>
  );
};

export default FaqComponent;
