import React from "react";

const dummyData = [
  {
    id: 1,
    img: "/assets/images/space-1.jpg",
    text: "Find your Workspace",
  },
  {
    id: 2,
    img: "/assets/images/space-2.jpg",
    text: "Popular spaces near you",
  },
  {
    id: 3,
    img: "/assets/images/space-3.jpg",
    text: "Get in touch",
  },
];

export default function SpaceSection({ data }) {
  // Check if there is no data available
  if (!data || data.length === 0) {
    return null; // Hide the component if no data
  }

  return (
    <div className="mx-6 mb-8 rounded-xl bg-[#D9F7F0] px-10 py-8">
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div
            key={item?.id}
            className="flex h-full flex-col overflow-hidden rounded-[10px]"
          >
            <div className="w-full overflow-hidden">
              <img
                src={item?.img} // Use the correct image source
                alt={item?.space_name}
                className="h-full w-full rounded-[10px] object-cover"
              />
            </div>
            <div className="flex flex-grow flex-col pt-[26px]">
              <h3 className="mb-4 text-2xl font-semibold leading-7 text-[#13293AE5]">
                {item?.space_name}
              </h3>
              <div className="mt-auto flex cursor-pointer items-center gap-3 font-medium text-[#00A481]">
                <p className="text-[12px] font-normal leading-[17px] text-[#006988]">
                  LEARN MORE
                </p>
                <img
                  src="/assets/icons/right-arrow.svg"
                  alt="right-arrow"
                  className="w-7"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
