"use client";
import CommonButton from "@/components/CustomComponents/CommonButton";
import React from "react";

const dummyData = [
  {
    id: 1,
    title: "Free",
    subtitle:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available",
    img: "/assets/images/vloopro-why-vloo-free.png",
    review: {
      text: "I found VLOO as the best place for workspaces. Their pricing is also much reasonable.",
      clientName: "Lue Vincent",
      clientDesignation: "CEO, ABCD Inc.",
      clientImage: "/assets/images/profile-1.png",
    },
    subSection: [
      {
        id: 1,
        title: "Day to day access",
        subTitle:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the ",
      },
      {
        id: 2,
        title: "Day to day access",
        subTitle:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the ",
      },
      {
        id: 3,
        title: "Day to day access",
        subTitle:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the ",
      },
    ],
  },
  {
    id: 2,
    title: "Secure",
    subtitle:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available",
    img: "/assets/images/vloopro-why-vloo-free.png",
    review: {
      text: "I found VLOO as the best place for workspaces. Their pricing is also much reasonable.",
      clientName: "Lue Vincent",
      clientDesignation: "CEO, ABCD Inc.",
      clientImage: "/assets/images/profile-1.png",
    },
    subSection: [
      {
        id: 1,
        title: "Day to day access",
        subTitle:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the ",
      },
      {
        id: 2,
        title: "Day to day access",
        subTitle:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the ",
      },
      {
        id: 3,
        title: "Day to day access",
        subTitle:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the ",
      },
    ],
  },
  {
    id: 3,
    title: "Trusted",
    subtitle:
      "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available",
    img: "/assets/images/vloopro-why-vloo-free.png",
    review: {
      text: "I found VLOO as the best place for workspaces. Their pricing is also much reasonable.",
      clientName: "Lue Vincent",
      clientDesignation: "CEO, ABCD Inc.",
      clientImage: "/assets/images/profile-1.png",
    },
    subSection: [
      {
        id: 1,
        title: "Day to day access",
        subTitle:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the ",
      },
      {
        id: 2,
        title: "Day to day access",
        subTitle:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the ",
      },
      {
        id: 3,
        title: "Day to day access",
        subTitle:
          "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the ",
      },
    ],
  },
];

const bgColor = [
  "linear-gradient(180deg, #F3F3FE 0%, #FFFFFF 100%)",
  "linear-gradient(180deg, #E1F1F5 0%, #FFFFFF 100%)",
  "linear-gradient(180deg, #D9F7F0 0%, #FFFFFF 100%)",
];

export default function USPSection({ data }) {
  return (
    <>
      {data?.sub_section?.map((sectionData, index) => (
        <section
          key={sectionData.id}
          className="mx-4 mb-6 rounded-lg p-6 md:mx-8 md:mb-[30px] md:rounded-[10px] md:p-[36px] lg:mx-[67.5px]"
          style={{
            background:
              index === 0 ? bgColor[0] : index === 1 ? bgColor[1] : bgColor[2],
          }}
        >
          <div>
            {/* Top Section */}
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-[27px]">
              <div className="order-2 flex-[0_0_35%] lg:order-1">
                <h2 className="mb-4 text-3xl font-bold leading-tight text-[#0A2A3C] md:mb-[20px] md:text-4xl lg:text-[48px] lg:leading-[64px]">
                  {sectionData.sub_section_title}
                </h2>
                <p className="text-base font-medium leading-relaxed text-[#757575] md:text-[18px] md:leading-[24px]">
                  {sectionData.sub_section_sub_title}
                </p>
                <div className="mt-6 md:mt-[41px]">
                  <CommonButton
                    bgColor="#00A481"
                    hoverColor="#00896D"
                    name="Join"
                    className="w-full sm:w-auto"
                  />
                </div>
              </div>

              <div className="order-1 flex-grow lg:order-2">
                <img
                  src={sectionData?.upload_files?.[0]?.file_url}
                  alt={`${sectionData.sub_section_title} Illustration`}
                  className="h-auto w-full rounded-[20px] object-cover"
                />
              </div>
            </div>

            {/* Bottom Section (Static) */}
            <div className="mt-6 flex flex-col gap-6 md:mt-10 lg:flex-row lg:gap-[27px]">
              {/* Review Section */}
              <div
                className="flex-[0_0_33.5%] rounded-[20px] px-[27px] py-[23px]"
                style={{ boxShadow: "0px 2px 4px 0px #0000001A" }}
              >
                <p className="mb-[30px] text-[18px] font-normal leading-[20px] text-[#0A2A3C]">
                  {dummyData[index].review.text}
                </p>
                <div className="flex items-center">
                  <img
                    src={dummyData[index].review.clientImage}
                    alt={dummyData[index].review.clientName}
                    className="mr-4 h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[16px] font-semibold text-[#0A2A3C]">
                      {dummyData[index].review.clientName}
                    </p>
                    <p className="text-[14px] text-[#7A8A98]">
                      {dummyData[index].review.clientDesignation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sub-Sections */}
              <div className="flex flex-wrap items-center gap-6 lg:gap-[27px]">
                {dummyData[index].subSection.map((sub) => (
                  <div
                    key={sub.id}
                    className="min-w-[200px] max-w-full flex-1 rounded-[20px] p-4"
                  >
                    <p className="mb-2 text-[20px] font-bold leading-[28px] text-[#0A2A3C]">
                      {sub.title}
                    </p>
                    <p className="text-[16px] font-normal leading-[19.2px] text-[#757575]">
                      {sub.subTitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
