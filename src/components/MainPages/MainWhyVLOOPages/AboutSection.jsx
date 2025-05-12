"use client";
import CommonButton from "@/components/CustomComponents/CommonButton";

export default function AboutSection({data}) {
  return (
    <div
      id="about"
      className="mx-[31px] mb-[30px] flex flex-col gap-[20px] pb-[39px] pt-[50px] md:flex-row"
    >
      <div className="relative h-[200px] w-full md:h-[524px] md:w-[567px]">
        <video
          src={
            data?.upload_files?.[0]?.file_url ||
            "/assets/videos/about.mp4"
          }
          autoPlay
          loop
          muted
          className="h-[200px] w-full rounded-[13px] object-cover md:h-[524px] md:w-[567px]"
        />
      </div>
      <div className="flex-1 rounded-[10px] bg-[#00A481] px-[32px] pt-[31px]">
        <p className="mb-[20px] text-[36px] font-bold leading-[48px] text-white">
          {data?.section_title}
        </p>
        <p className="text-[20px] font-normal leading-[28px] text-white">
          {/* Vloo is a super local employee benefit for those that don't like to
          work from home, those who spend a lot of time commuting, or those that
          need more privacy than co-working hubs can offer. Whenever they need
          to work close to home, work privately or meet with the rest of the
          team outside the office, we provide full flexibility. For companies of
          all sizes, we offer top notch daytime access to work spaces where
          employees live. */}
          {data?.section_sub_title}
          <br />
          <br />
          {/* VLOO was founded in 2021 on the idea to create better workplace
          options for employees that would like to work closer to home. Our
          mission is to keep employees happy by improving work-life balance. */}
        </p>
        <div className="mb-[22px] ml-[35px] mt-[63px] md:ml-0">
          <CommonButton
            bgColor="#006988"
            hoverColor="#0A2A3C"
            name="Contact us"
          />
        </div>
      </div>
    </div>
  );
}
