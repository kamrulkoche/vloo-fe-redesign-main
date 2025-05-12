import React from "react";

const dummyData = [
  {
    id: 1,
    img: "/assets/images/user-why-vloo-image-1.jpg",
    text: "Office access to cool companies in different industries.",
  },
  {
    id: 2,
    img: "/assets/images/user-why-vloo-image-2.jpg",
    text: "Grow your network and while promoting sustainability",
  },
];

export default function OnDemandSection({data}) {
  return (
    <div className="mx-8 mb-8">
      <p className="px-0 pb-12 text-center text-5xl font-bold leading-[64px] text-[#0A2A3C] md:px-24">
        {data?.section_title}
      </p>
      {data?.sub_section.map((item, index) => (
        <div
          key={item.id}
          className={`mb-12 flex flex-col items-center justify-center gap-16 md:flex-row ${
            index === data?.sub_section.length - 1 ? "mb-0" : ""
          }`}
        >
          {index % 2 === 1 && (
            <img
              src={item?.upload_files?.[0]?.file_url}
              alt="on-demand-image"
              className="h-[366px] w-[460px]"
            />
          )}
          <div
            className={`w-[110%] rounded-[50px] md:w-[784px] ${
              index % 2 === 0
                ? "bg-[#006988] px-[30px] py-[30px] md:px-[54.5px] md:py-[87px]"
                : "bg-[#81ECD3] px-[30px] py-[30px] md:px-[60px] md:py-[119px]"
            }`}
          >
            <p
              className={`text-4xl font-bold leading-[64px] md:text-5xl ${
                index % 2 === 0 ? "text-white" : "text-[#0A2A3C]"
              }`}
            >
              {item.sub_section_title}
            </p>
          </div>
          {index % 2 === 0 && (
            <img
              src={item?.upload_files?.[0]?.file_url}
              alt="on-demand-image"
              className="h-[366px] w-[460px]"
            />
          )}
        </div>
      ))}
    </div>
  );
}
