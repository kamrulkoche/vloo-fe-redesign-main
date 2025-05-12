"use client";

import BenefitCard from "@/components/CustomComponents/BenefitCardComponent";
import Slider from "@/components/CustomComponents/SliderComponent";
import usePageContentShow from "@/hooks/QueryHooks/Public/PageContent/usePageContentShow";
import { useState } from "react";
import LoadingComponent from "../LoadingComponent";

const ROI = () => {
  const [deskAvg, setDeskAvg] = useState(3);
  const [pricePerDesk, setPricePerDesk] = useState(30);
  const [coverage, setCoverage] = useState(50);

  const { data, isFetched } = usePageContentShow(7);

  const heroData = data?.data?.page_section.find(
    (section) => section.section_header === "Header Section",
  );
  const usp1Data = data?.data?.page_section.find(
    (section) => section.section_header === "USP 1",
  );

  const calculateIncome = () => {
    return (deskAvg * pricePerDesk * (coverage / 100) * 52).toFixed(2);
  };

  const calculateMonthlyIncome = () => {
    return ((deskAvg * pricePerDesk * (coverage / 100) * 365) / 12).toFixed(2);
  };

  if (!isFetched || !data?.data?.page_section) return <LoadingComponent />;

  return (
    <div className="min-h-screen bg-[#F3F3FE] p-6 md:p-12">
      <section className="mx-auto flex max-w-full flex-col gap-12 rounded-lg bg-[#F3F3FE] md:flex-row md:gap-[10%] md:px-8 md:py-8">
        <div className="w-full md:w-[50%]">
          <h2 className="mb-2 text-[24px] font-[400] leading-[28.8px] text-[#0A2A3C]">
            {heroData?.section_title}
          </h2>
          <p className="mb-4 text-[36px] font-[700] leading-[48px] text-[#0A2A3C]">
            NOK {calculateIncome()} <span className="text-[16px]">a year.</span>
          </p>
          <p className="mb-6 text-[20px] font-[400] leading-[28px] text-[#6B7280]">
            {heroData?.section_sub_title}
          </p>
          <button className="rounded-md bg-[#00A481] px-[40px] py-[16px] text-[18px] font-[500] leading-[24px] text-white transition hover:bg-[#007a63]">
            Become a host
          </button>
        </div>

        <div className="w-full space-y-[1px] md:w-[40%]">
          <Slider
            label="Desk avg"
            value={deskAvg}
            min={1}
            max={10}
            setValue={setDeskAvg}
          />
          <Slider
            label="Net daily price per desk"
            value={pricePerDesk}
            min={10}
            max={100}
            step={0.5}
            setValue={setPricePerDesk}
          />
          <Slider
            label="Coverage% per week"
            value={coverage}
            min={10}
            max={100}
            setValue={setCoverage}
          />
          <Slider
            label="Monthly extra income"
            value={calculateMonthlyIncome()}
            min={0}
            max={5000}
            readOnly
            setValue={() => {}}
          />
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-[1219px]">
        <h3 className="mb-6 text-center text-[36px] font-[500] leading-[48px] text-[#0A2A3C]">
          {usp1Data?.section_title}
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {usp1Data?.sub_section?.map((item) => (
            <div key={item?.id}>
              <BenefitCard
                image={item?.upload_files?.[0]?.file_url}
                title={item?.sub_section_title}
                description={item?.sub_section_sub_title}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ROI;
