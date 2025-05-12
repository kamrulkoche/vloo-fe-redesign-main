import CommonButton from "@/components/CustomComponents/CommonButton";
import RenderStars from "../CustomComponents/RenderStars";

export default function InterestCard({
  title,
  location,
  rating,
  img,
  bgColor,
}) {
  return (
    <div
      className="relative rounded-[10px] p-2"
      style={{
        backgroundColor: "white",
        boxShadow: "0px 0px 25px 0px #00000026",
      }}
    >
      <div
        className="absolute left-5 top-5 w-[114px] rounded-[16px] py-3"
        style={{ backgroundColor: bgColor }}
      >
        <p className="text-center text-[14px] font-medium leading-[20px] text-white">
          {location}
        </p>
      </div>

      <img src={img} alt={title} className="h-auto w-full" />

      <p className="mb-7 ml-[13px] mt-4 text-[28px] font-semibold leading-[40px] text-[#0A2A3C]">
        {title}
      </p>
      <div className="mb-[14px] ml-[18px] flex items-center justify-between">
        <div className="flex flex-col justify-center gap-[10px]">
          <div className="flex flex-col items-center gap-[10px] sm:flex-row">
            <p className="text-[14px] font-medium leading-[20px] text-[#13293ACC]">
              INC. Works
            </p>
            <div className="flex">
              <RenderStars rating={String(rating)} />
            </div>
          </div>
          <div
            className="w-[73px] rounded-[29px] py-1"
            style={{ backgroundColor: bgColor }}
          >
            <p className="text-center text-[14px] font-medium leading-[20px] text-white">
              {location}
            </p>
          </div>
        </div>
        <div className="text-center">
          <CommonButton name={"Book now"} />
        </div>
      </div>
    </div>
  );
}
