import CommonButton from "@/components/CustomComponents/CommonButton";
import React from "react";

const dummyDataLeft = [
  { id: 1, label: "Connect" },
  { id: 2, label: "Share" },
  { id: 3, label: "Earn reputation + money" },
  { id: 4, label: "Join" },
];

const dummyDataRight = [
  { id: 1, text: "I love the dashboard…" },
  {
    id: 2,
    text: "Our office has become more vibrant…. My colleagues loves it…",
  },
  { id: 3, text: "Reduced our office costs by 8%" },
];

export default function GetStartedTodaySection({data}) {
  return (
    <div className="mx-5 mb-[30px] flex flex-col justify-between sm:px-[34px] md:flex-row">
          <div className="w-full md:w-1/3">
            <p className="text-center text-5xl font-[700] leading-[64px] text-[#0A2A3C]">
              {data?.section_title.split(" ").map((word, index, arr) => {
                if (index === arr.length - 1) {
                  return (
                    <span key={index} className="text-[#006988]">
                      {word}
                    </span>
                  );
                }
                return <span key={index}>{word} </span>;
              })}
            </p>
    
            <div className="mb-5 rounded-[10px] py-[24px] last:mb-0">
              <p className="text-[20px] font-[400] leading-[28px] text-[#757575]">
                {data?.section_sub_title.split(/(\d+%)/).map((part, index) => {
                  if (part.match(/\d+%/)) {
                    return (
                      <span
                        key={index}
                        className="text-[48px] font-[700] leading-[64px] text-[#006988]"
                      >
                        {part}
                      </span>
                    );
                  }
                  return (
                    <span key={index}>
                      {part}
                      {index > 0 && <br />}{" "}
                    </span>
                  );
                })}
              </p>
            </div>
            <div className="my-4 sm:my-0 flex justify-center sm:flex-none">
              <CommonButton name={"Join"} bgColor="#00A481" hoverColor="#1e7c68" />
            </div>
          </div>
          <div className="rounded-[40px] border-[7px] border-[#00A481] py-[5px] w-full md:w-[60%]">
            {/* <img
              src="/assets/images/get-started-today.png"
              alt="get-started-today"
              className="w-248px h-[351px] rounded-[10px]"
            /> */}
            <video
              src={
                data?.upload_files?.[0]?.file_url ||
                "/assets/videos/corporate-1.mp4"
              }
              autoPlay
              loop
              muted
              className="sm:h-[450px] w-full rounded-[10px]"
            />
            {/* <div className="w-full">
                {dummyDataRight?.map((item, index) => (
                  <div
                    key={item?.id}
                    className={`mb-[46px] rounded-[10px] bg-[#81ECD3] py-[23px] pl-[22px] ${index !== 1 ? "mr-[41px]" : ""} last:mb-[0px] ${index === 1 ? "ml-[41px]" : ""}`}
                  >
                    <p className="text-[24px] font-normal leading-[28.8px] text-[#0A2A3C]">
                      {item?.text}
                    </p>
                  </div>
                ))}
              </div> */}
          </div>
        </div>
  );
}
