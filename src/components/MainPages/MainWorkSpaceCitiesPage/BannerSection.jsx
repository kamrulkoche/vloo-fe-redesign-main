"use client";
import GlobalSearch from "@/components/CustomComponents/GlobalSearch";

export default function BannerSection() {
  return (
    <div className="relative h-[300px] w-full md:h-[324px]">
      <video
        src={"/assets/videos/home-page.mp4"}
        autoPlay
        loop
        muted
        className="h-[300px] w-full object-cover md:h-[324px]"
      />
      {/* Opacity */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Contents */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="mt-10 text-center text-[28px] font-bold leading-[80px] text-white md:text-[60px]">
          Now you can book your{" "}
          <span className="text-[#00A481]">VLOO day in...</span>
        </p>
        <div className="mb-20 mt-14">
          <GlobalSearch />
        </div>
      </div>
    </div>
  );
}
