"use client";
import React from "react";
import { Check } from "lucide-react";
import CommonButton from "@/components/CustomComponents/CommonButton";


const JoinNowSection = ({data}) => {
  return (
    <div className="bg-gradient-to-b from-[rgba(217,247,240,0.5)] to-white">
      <p className="pb-7 pt-12 text-center text-6xl font-bold leading-[80px] text-[#0A2A3C]">
        {data?.section_title.split(" ").map((word, index) => {
          if (index === 0 || index === 1) {
            return (
              <span key={index} className="text-[#00A481]">
                {word}{" "}
              </span>
            );
          }
          return <span key={index}>{word} </span>;
        })}
      </p>

      <p className="mx-auto max-w-[719px] pb-12 text-center text-xl font-normal leading-7 text-[#757575]">
        {data?.section_sub_title}
      </p>

      <div className="flex flex-col gap-5 px-8 md:flex-row">
        {data?.sub_section?.map((section) => (
          <div
            key={section.id}
            className={`w-full rounded-lg ${section.id % 2 !== 0 ? "bg-[#0A2A3C]" : "bg-[#006988]"} px-6 py-4 md:px-14 md:py-10`}
          >
            <p className="pb-14 text-center text-2xl font-semibold leading-10 text-white">
              {section.sub_section_title}
            </p>
            <div className="h-3/5">
              {section.sub_section_sub_title
                .split("\r\n")
                .map((line, index) => (
                  <div
                    key={index}
                    className="mb-10 flex items-start gap-4 last:mb-0"
                  >
                    <Check className="h-6 w-6 flex-shrink-0 text-white" />
                    <p className="text-xl font-normal leading-6 text-white">
                      {line}
                    </p>
                  </div>
                ))}
            </div>

            <div className="mb-12 mt-16 text-center">
              <CommonButton
                bgColor="#00A481"
                hoverColor="#00896D"
                name="Join"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinNowSection;
