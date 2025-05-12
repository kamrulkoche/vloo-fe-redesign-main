import React from "react";
import CommonButton from "../CustomComponents/CommonButton";

const dummyData = [
  { id: 1, label: "Share your space" },
  { id: 2, label: "Connect to stripe" },
  { id: 3, label: "collect rent" },
  { id: 4, label: "grow your network" },
];

export default function GetStarted() {
  return (
    <div className="mx-[25px] mb-[25px] rounded-[10px] bg-[#006688]">
      <p className="pb-[30px] pt-[50px] text-center text-[48px] font-bold leading-[60px] text-white">
        Get started with VLOO today
      </p>
      <div className="flex flex-col items-center justify-center gap-[50px] md:flex-row">
        {dummyData?.map((item, index) => (
          <div
            className="flex flex-col items-center gap-[20px] md:flex-row"
            key={item?.id}
          >
            <div className="flex h-[34px] w-[33px] items-center justify-center rounded-full bg-white">
              <p className="text-[24px] font-bold leading-[34px] text-[#006988]">
                {index + 1}
              </p>
            </div>
            <p className="text-[20px] font-normal leading-[24px] text-[#DEDEDE]">
              {item?.label}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-[76px] pb-[45px] text-center">
        <CommonButton name={"Join"} bgColor="#00A481" hoverColor="#00896D" />
      </div>
    </div>
  );
}
