import React from "react";
import WhatYouGetCard from "../Cards/WhatYouGetCard";
import CommonButton from "../CustomComponents/CommonButton";
import SectionTitle from "../CustomComponents/SectionTitle";

const dummyData = [
  {
    id: 1,
    title: "Free membership",
    desc: "Automate away routine tasks with the power of generative AI and simplify your workflow with all your favourite apps ready to go in Slack.",
    file: "/assets/videos/wyg-1.mp4",
  },
  {
    id: 2,
    title: "Flexible workdays",
    desc: "Automate away routine tasks with the power of generative AI and simplify your workflow with all your favourite apps ready to go in Slack.",
    file: "/assets/videos/wyg-2.mp4",
  },
  {
    id: 3,
    title: "Reduce rental costs",
    desc: "Automate away routine tasks with the power of generative AI and simplify your workflow with all your favourite apps ready to go in Slack.",
    file: "/assets/videos/wyg-3.mp4",
  },
];

export default function WhatYouGet({ data }) {
  return (
    <>
      <div className="mx-0 mb-[25px] pb-[90px] pt-[37px] text-center text-[36px] font-bold leading-[48px] text-[#0A2A3C]">
        {data?.section_title}
      </div>
      <div className="mx-4 md:mx-32">
        {data?.sub_section?.map((item, index) => (
          <WhatYouGetCard
            key={item?.id}
            title={item?.sub_section_title}
            desc={item?.sub_section_sub_title}
            file={item?.upload_files?.[0]?.file_url}
            index={index}
          />
        ))}
      </div>

      <div className="mt-[66px] pb-[31px] text-center">
        <CommonButton name={"Join"} bgColor="#00A481" hoverColor="#00896D" />
      </div>
    </>
  );
}
