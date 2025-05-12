"use client";
import LocationBox from "@/components/CustomComponents/LocationBox";
import CitiesData from "@/constants/CitiesData";

const bgColor = ["#72A1B6", "#457484", "#115B72", "#0A2A3C"];

export default function BannerSection({data}) {
  return (
    <div className="flex flex-col items-center justify-evenly bg-white pb-[68px] pl-[60px] pr-[62px] pt-[47px] md:flex-row">
      {/* Left Section */}
      <div>
        <div className="w-full md:w-[570px]">
          {/* <p className="mb-[30px] text-[48px] font-bold leading-[64px] text-[#0A2A3C]">
            Private <span className="text-[#00A481]">workspaces</span> where
            your <span className="text-[#006988]">employees</span> live.
          </p> */}
          <p className="mb-[30px] text-[48px] font-bold leading-[64px] text-[#0A2A3C]">
            {data.section_title.split(" ").map((word, index, arr) => {
              if (index === 1) {
                return (
                  <span key={index} className="text-[#00A481]">
                    {word}{" "}
                  </span>
                );
              }
              if (index === arr.length - 2) {
                return (
                  <span key={index} className="text-[#006988]">
                    {word}{" "}
                  </span>
                );
              }
              return <span key={index}>{word} </span>;
            })}
          </p>
        </div>

        <p className="mb-[76px] text-[18px] font-medium leading-[24px] text-[#757575]">
          {data.section_sub_title}
        </p>

        <div className="mb-[30px] flex items-center gap-3">
          <p className="text-[16px] font-medium leading-[22px] text-[#868686]">
            Now Available in
          </p>
          <div className="w-[176px] border border-[#DEDEDE]" />
        </div>

        <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {CitiesData?.map((item, index) => (
            <LocationBox
              key={item?.id}
              title={item?.title}
              bgColor={bgColor[index % bgColor.length]}
            />
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="relative mt-2 h-[200px] w-[150%] md:mt-0 md:h-[475px] md:w-[566px]">
        <video
          src={
            data?.upload_files?.[0]?.file_url ||
            "/assets/videos/corporate-1.mp4"
          }
          autoPlay
          loop
          muted
          className="h-[200px] w-[150%] rounded-[13px] object-cover md:h-[475px] md:w-[566px]"
        />
      </div>
    </div>
  );
}
