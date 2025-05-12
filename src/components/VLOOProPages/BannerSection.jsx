import Image from "next/image";
import CommonButton from "../CustomComponents/CommonButton";

const dummyData = [
  { id: 1, img: "/assets/icons/location-oslo.png", location: "Oslo" },
  { id: 2, img: "/assets/icons/location-bergen.png", location: "Bergen" },
  { id: 3, img: "/assets/icons/location-tromso.png", location: "Tromso" },
  { id: 4, img: "/assets/icons/location-lofoten.png", location: "Lofoten" },
];

export default function BannerSection({ data }) {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #F3F3FE 53.52%, #FFFFFF 100%)",
      }}
      className="mb-[25px] flex h-[300px] w-full flex-col items-center justify-between pb-[44px] px-8 sm:pl-[107px] sm:pr-[94px] pt-[80px] md:h-[537px] md:flex-row"
    >
      {/* Left Section */}
      <div>
        <div className="w-full md:w-[497px]">
          <p className="mb-[11px] text-[50px] font-bold leading-[80px] text-[#0A2A3C] md:text-[60px]">
            {data.section_title.split(" ").map((word, index, arr) => {
              if (index === arr.length - 2 || index === arr.length - 1) {
                return (
                  <span key={index} className="text-[#00A481]">
                    {word}{" "}
                  </span>
                );
              }
              return <span key={index}>{word} </span>;
            })}
          </p>
          <p className="mb-[26px] text-[18px] font-medium leading-[24px] text-[#757575]">
            {data.section_sub_title}
          </p>
        </div>
        <div className="mb-[39px]">
          <CommonButton name={"Join"} bgColor="#00A481" hoverColor="#00896D" />
        </div>

        <p className="mb-[10px] text-[16px] font-medium leading-[22px] text-[#868686]">
          Share your spaces in the most popular cities in Norway
        </p>
        <div className="flex items-center gap-[30px]">
          {dummyData?.map((item) => (
            <div key={item?.id} className="flex items-center gap-[7px]">
              <img
                src={item?.img}
                alt={item?.location}
                className="h-[16px] w-[13px]"
                loading="lazy"
              />
              <p className="text-[13px] font-medium leading-[18px] text-[#0A2A3C]">
                {item?.location}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="relative mt-4 h-[200px] w-[100%] sm:mt-0 sm:h-[475px] sm:w-[566px]">
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
