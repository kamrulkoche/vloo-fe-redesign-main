"use client";
import HowItWorksCard from "@/components/Cards/HowItWorksCard";
import SectionTitle from "@/components/CustomComponents/SectionTitle";
import { useState } from "react";

export default function HowItWorks({ data }) {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleCardClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div id="how-it-works" className="mb-4 rounded-[10px] bg-[#F3F3F3] sm:mb-8">
      <div className="mx-auto w-full sm:w-[763px]">
        <SectionTitle title={data?.section_title} />
      </div>

      <div className="mt-5 flex flex-col items-center px-4 pb-4 sm:mt-10 sm:flex-row sm:px-11 sm:pb-8">
        <div className="w-full sm:w-1/2">
          <div className="mb-3">
            {data?.sub_section?.map((item, index) => (
              <HowItWorksCard
                key={item?.id}
                index={index}
                title={item?.sub_section_title}
                subtitle={item?.sub_section_sub_title}
                isSelected={index === selectedIndex}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
          <div className="pt-3">
            <button className="flex h-[50px] w-full items-center justify-center gap-[20px] rounded-[5px] bg-[#006988] text-[16px] font-medium leading-[24px] text-white transition duration-200 hover:bg-[#0C4C60] sm:h-[60px] sm:w-[180px] sm:gap-[25px] sm:text-[18px]">
              Learn more
              <img
                src="/assets/icons/arrow-right.png"
                alt="arrow-right"
                className="w-[24px] sm:w-[28px]"
              />
            </button>
          </div>
        </div>
        <div className="mt-4 h-[400px] w-full sm:mt-0 sm:h-[626px] sm:w-1/2">
          <video
            src={data?.sub_section[selectedIndex]?.upload_files?.[0]?.file_url}
            autoPlay
            loop
            muted
            className="h-full w-full rounded-[40px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
