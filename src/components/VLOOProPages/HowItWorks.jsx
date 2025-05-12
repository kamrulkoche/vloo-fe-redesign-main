"use client";
import { useState } from "react";
import HowItWorksCard from "../Cards/HowItWorksCard";

const dummyData = [
  {
    id: 1,
    title: "Share vacant office space.",
    subtitle: "Optimize space utilization and improve your office",
    img: "/assets/images/wyg-1.jpg",
  },
  {
    id: 2,
    title: "In full control of bookings.",
    subtitle: "Optimize space utilization and improve your office",
    img: "/assets/images/wyg-2.jpg",
  },
  {
    id: 3,
    title: "Easy payment",
    subtitle: "Optimize space utilization and improve your office",
    img: "/assets/images/wyg-3.jpg",
  },
  {
    id: 4,
    title: "Grow your space",
    subtitle: "Optimize space utilization and improve your office",
    img: "/assets/images/wyg-4.jpg",
  },
];

export default function HowItWorks({data}) {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleCardClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div
      id="how-it-works"
      className="mx-[25px] mb-[25px] rounded-[10px] bg-[#F3F3F3]"
    >
      <p className="pb-[45px] pt-[50px] text-center text-[36px] font-bold leading-[48px] text-[#0A2A3C]">
        {data?.section_title}
      </p>
      <div
        className={`flex flex-col items-center px-4 pb-[50px] md:flex-row md:px-[45px]`}
      >
        <div className="w-full">
          <div className="mb-3">
            {data?.sub_section?.map((item, index) => (
              <HowItWorksCard
                key={item?.id}
                index={index}
                title={item?.sub_section_title}
                subtitle={item?.sub_section_sub_title}
                isSelected={index === selectedIndex}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
          <div className="pt-3 flex justify-center sm:flex-none">
            <button className="mx-8 mb-4 flex h-[60px] w-[180px] items-center justify-center gap-[25px] rounded-[5px] bg-[#00A481] text-[18px] font-medium leading-[24px] text-white transition duration-200 hover:bg-[#00896D] md:mx-0 md:mb-0">
              Learn more
              <img
                src="/assets/icons/arrow-right.png"
                alt="arrow-right"
                className="w-[28px]"
              />
            </button>
          </div>
        </div>
        <div className="sm:h-[626px] w-full">
          <img
            src={data?.sub_section[selectedIndex]?.upload_files?.[0]?.file_url}
            // alt={dummyData[selectedIndex]?.title}
            className="h-full w-full rounded-[40px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
