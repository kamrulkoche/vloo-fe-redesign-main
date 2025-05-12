import React from "react";
import CommonButton from "../CustomComponents/CommonButton";

const dummyData = [
  {
    id: 1,
    title: "Precise location based space",
    img: "/assets/icons/correct-without-bg.png",
  },
  {
    id: 2,
    title: "Space recommendations based ",
    img: "/assets/icons/correct-without-bg.png",
  },
  {
    id: 3,
    title: "View booking history",
    img: "/assets/icons/correct-without-bg.png",
  },
];

export default function PricingSection({ data }) {
  return (
    <div className="xs:mb-8 xs:flex-row xs:text-center mb-4 flex flex-col items-center gap-[30px] md:gap-[220px] rounded-[10px] border border-[#DEDEDE] bg-[#F3F3F3] md:flex-row md:justify-center md:px-[94px] md:py-[65px] md:text-left">
      <div className="p-4 md:p-0">
        <p className="xs:w-full xs:mt-4 xs:text-center text-left text-[48px] font-bold leading-[64px] text-[#0A2A3C] md:w-[403px] md:text-left">
          {data?.section_title}
        </p>
        <p className="xs:w-full text-center mb-[48px] md:text-left text-[48px] font-bold leading-[64px] text-[#0A2A3C] md:w-[403px]">
          {data?.section_sub_title && (
            <>
              <span className="text-[#00A481]">
                {data.section_sub_title.split(" ")[0]}{" "}
              </span>{" "}
              {data.section_sub_title.split(" ").slice(1).join(" ")}{" "}
            </>
          )}
        </p>
        <div className="mx-[70px] md:mx-0">
          <CommonButton name={"Join"} />
        </div>
      </div>
      <div className="xs:w-[499px] xs:pl-[40px] w-full rounded-[20px] bg-[#006688] pb-[29px] pl-[40px] pt-[49px] text-white">
        <p className="pb-[3px] text-[24px] font-medium leading-[34px]">Basic</p>
        <p className="pb-[50px] text-[48px] font-medium leading-[64px]">Free</p>
        {dummyData?.map((item) => (
          <div
            key={item?.id}
            className="mb-[20px] flex items-center gap-[18px]"
          >
            <img
              src={item?.img}
              alt={item?.title}
              className="h-[20px] w-[20px]"
            />
            <p className="pb-[3px] text-[18px] font-medium leading-[24px]">
              {item?.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
