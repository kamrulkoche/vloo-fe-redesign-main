"use client";
import CommonButton from "@/components/CustomComponents/CommonButton";

const dummyData = [
  { id: 1, label: "Share your space" },
  { id: 2, label: "Connect to stripe" },
  { id: 3, label: "Collect rent" },
  { id: 4, label: "Grow your network" },
];

export default function GetStarted() {
  return (
    <div className="bg-[#006688]">
      <p className="pb-6 pt-12 text-center text-[28px] font-bold leading-[34px] text-white sm:text-[48px] sm:leading-[60px]">
        Get started with VLOO today
      </p>

      <div className="flex flex-col items-center gap-6 px-4 sm:flex-row sm:justify-center sm:gap-12">
        {dummyData?.map((item, index) => (
          <div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            key={item?.id}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white sm:h-[34px] sm:w-[33px]">
              <p className="text-base font-bold leading-none text-[#006988] sm:text-[24px] sm:leading-[34px]">
                {index + 1}
              </p>
            </div>
            <p className="text-sm font-normal leading-6 text-[#DEDEDE] sm:text-[20px] sm:leading-[24px]">
              {item?.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 pb-8 text-center sm:mt-[76px] sm:pb-[45px]">
        <CommonButton name={"Join"} bgColor="#00A481" hoverColor="#00896D" />
      </div>
    </div>
  );
}
