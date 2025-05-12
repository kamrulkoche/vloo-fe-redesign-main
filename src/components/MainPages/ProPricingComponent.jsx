"use client";
import React, { useState } from "react";
import ProPricingCard from "../Cards/ProPricingCard";

const PricingComponent = () => {
  const pricingPlans = [
    {
      planName: "Basic",
      price: "Free",
      features: [
        "Post your spaces from any location in Norway",
        "Completely customize your Host profile",
        "Post your space with multiple sections (Suites and Desks)",
        "View a detailed stats on your earnings and yearly revenue.",
        "A membership where hosts have full freedom",
        "Post your space with complete optimization",
        "A complete 24-hour schedule for all space",
        "Get verified reviews from all users",
        "Get your spaces in the recommended section",
        "5+ posts per day",
        "A membership where hosts have full freedom",
        "Post your space with complete optimization",
        "A complete 24-hour schedule for all space",
        "Get verified reviews from all users",
      ],
      visibleFeaturesCount: 4,
      bgColor: "bg-white",
      textColor: "text-[#006988]",
      buttonText: "Get Started",
      buttonTextBg: "text-[#006988]",
      buttonBg: "bg-[#1068844D]",
      topBg: "bg-[#006988]",
      topText: "text-white",
    },
    {
      planName: "Small",
      price: "NOK 35",
      features: [
        "Post your spaces from any location in Norway",
        "Completely customize your Host profile",
        "Post your space with multiple sections (Suites and Desks)",
        "View a detailed stats on your earnings and yearly revenue.",
        "A membership where hosts have full freedom",
        "Post your space with complete optimization",
        "A complete 24-hour schedule for all space",
        "Get verified reviews from all users",
        "Get your spaces in the recommended section",
        "5+ posts per day",
        "A membership where hosts have full freedom",
        "Post your space with complete optimization",
        "A complete 24-hour schedule for all space",
        "Get verified reviews from all users",
      ],
      visibleFeaturesCount: 8,
      bgColor: "bg-[#D9F7F0]",
      textColor: "text-[#0A2A3C]",
      buttonText: "Start trial",
      buttonTextBg: "text-[#006988]",
      buttonBg: "bg-[#1068844D]",
      topBg: "bg-[#DE7A62]",
      topText: "text-[#0A2A3C]",
    },
    {
      planName: "Medium",
      price: "NOK 70",
      features: [
        "Post your spaces from any location in Norway",
        "Completely customize your Host profile",
        "Post your space with multiple sections (Suites and Desks)",
        "View a detailed stats on your earnings and yearly revenue.",
        "A membership where hosts have full freedom",
        "Post your space with complete optimization",
        "A complete 24-hour schedule for all space",
        "Get verified reviews from all users",
        "Get your spaces in the recommended section",
        "5+ posts per day",
        "A membership where hosts have full freedom",
        "Post your space with complete optimization",
        "A complete 24-hour schedule for all space",
        "Get verified reviews from all users",
      ],
      visibleFeaturesCount: 14,
      bgColor: "bg-[#00A481]",
      textColor: "text-[#0A2A3C]",
      buttonText: "Start trial",
      buttonTextBg: "text-white",
      buttonBg: "bg-[#006988]",
      topBg: "bg-[#EBB000]",
      topText: "text-[#0A2A3C]",
    },
  ];
  const [isYearly, setIsYearly] = useState(false); // Default to Monthly

  // Toggle between Yearly and Monthly
  const handleSwitch = () => {
    setIsYearly((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f3f3f3]">
      <div className="mt-[40px] px-4 text-center md:mt-[80px]">
        <h1 className="mb-4 text-[36px] font-[700] leading-[32px] text-[#0A2A3C] md:mb-[26px] md:text-[36px] md:leading-[48px]">
          We Have The Most Affordable Pricing
        </h1>
        <h2 className="mx-auto mb-8 mt-2 text-[14px] font-[500] leading-[20px] text-[#868686] sm:w-[90%] md:mb-[88px] md:w-[611px] md:text-[16px] md:leading-[22px]">
          Lorem ipsum dolor sit amet consectetur. Vestibulum amet consectetur
          eget fermentum nulla aliquet eleifend at.
        </h2>
      </div>

      <div
        className="relative flex h-[40px] w-[200px] cursor-pointer items-center justify-between rounded-[10px] bg-[#00A481]"
        onClick={handleSwitch}
      >
        <div
          className={`absolute bottom-[3px] left-[3px] top-[2px] h-[91%] w-[50%] rounded-[10px] bg-white shadow-md transition-transform duration-300 ${
            !isYearly ? "translate-x-[95%]" : "translate-x-[0px]"
          }`}
        ></div>
        <span
          className={`z-10 flex-1 text-center text-[14px] font-[500] ${
            isYearly ? "text-[#006988]" : "text-white"
          }`}
        >
          Get Yearly
        </span>
        <span
          className={`z-10 flex-1 text-center text-[14px] font-[500] ${
            !isYearly ? "text-[#006988]" : "text-white"
          }`}
        >
          Monthly
        </span>
      </div>

      <div className="flex flex-wrap items-start justify-around gap-6 p-8 md:w-full">
        {pricingPlans.map((plan, index) => (
          <ProPricingCard key={index} {...plan} isYearly={isYearly} />
        ))}
      </div>
    </div>
  );
};

export default PricingComponent;
