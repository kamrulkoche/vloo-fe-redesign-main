"use client";
import CommonButton from "@/components/CustomComponents/CommonButton";

export default function USP1Section({ data }) {
  return (
    <div
      className="mx-[31px] rounded-[10px]"
      style={{
        background:
          "linear-gradient(180deg, rgba(217, 247, 240, 0.5) 0%, #FFFFFF 100%)",
      }}
    >
      <p className="px-[10px] pb-[84px] pt-[43px] text-center text-[48px] font-bold leading-[64px] text-[#0A2A3C] md:px-[67px]">
        {data?.section_title.split(" ").map((word, index, arr) => {
          if (index === 5) {
            return (
              <span key={index} className="text-[#00A481]">
                {word}{" "}
              </span>
            );
          }
          if (index === 13) {
            return (
              <span key={index} className="text-[#006988]">
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

      <div className="mx-[60px] flex flex-col items-center justify-between pb-[74px] md:flex-row">
        <div className="scrollbar-none h-[528px] w-[150%] overflow-y-scroll px-0 pt-[21px] md:w-[611px] md:px-[10px]">
          {data?.sub_section?.map((item) => (
            <div key={item?.id} className="mb-[91px] last:mb-[0px]">
              <p className="mb-[15px] text-[36px] font-bold leading-[48px] text-[#0A2A3C]">
                {item?.sub_section_title}
              </p>
              <p className="mb-[40px] text-[20px] font-normal leading-[28px] text-[#757575]">
                {item?.sub_section_sub_title}
              </p>
              <div>
                <CommonButton name={"Join"} />
              </div>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="mb-4 mt-4 h-[200px] w-[300px] md:mt-0 md:h-[528px] md:w-[516px]">
          <video
            src={data?.upload_files?.[0]?.file_url}
            autoPlay
            loop
            muted
            className="h-[200px] w-[300px] rounded-[10px] object-cover md:h-[528px] md:w-[516px]"
          />
        </div>
      </div>
    </div>
  );
}
