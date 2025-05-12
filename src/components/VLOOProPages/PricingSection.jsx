import CommonButton from "../CustomComponents/CommonButton";

const dummyData = [
  {
    id: 1,
    title: "Precise location based space",
    img: "/assets/icons/correct-without-bg.png",
  },
  {
    id: 2,
    title: "Space recommendations based ",
    img: "/assets/icons/correct-without-bg.png",
  },
  {
    id: 3,
    title: "View booking history",
    img: "/assets/icons/correct-without-bg.png",
  },
];

export default function PricingSection({data}) {
  return (
    <div className="mx-[25px] mb-[25px] rounded-[10px] bg-[#F3F3F3]">
      <p className="py-[49px] text-center text-[48px] font-bold leading-[64px] text-[#0A2A3C]">
        {data?.section_title}
      </p>
      <div className="mx-[122px] flex flex-col items-center justify-center gap-[200px] pb-[50px] md:flex-row">
        <div className="w-[250px] rounded-[20px] bg-[#006688] pb-[29px] pl-[20px] pt-[20px] text-white md:w-[499px] md:pl-[40px] md:pt-[49px]">
          <p className="pb-[3px] text-[24px] font-medium leading-[34px] text-[#00A481]">
            Small
          </p>
          <p className="pb-[10px] text-[48px] font-medium leading-[64px] md:pb-[50px]">
            NOK 35{" "}
            <span className="text-[24px] font-medium leading-[34px]">
              per month
            </span>
          </p>
          {dummyData?.map((item) => (
            <div
              key={item?.id}
              className="mb-[20px] flex items-center gap-[18px]"
            >
              <img
                src={item?.img}
                alt={item?.title}
                className="h-[20px] w-[20px]"
              />
              <p className="pb-[3px] text-[18px] font-medium leading-[24px]">
                {item?.title}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-[-165px] md:mt-0">
          <p className="w-full text-[48px] font-bold leading-[64px] text-[#0A2A3C] md:w-[403px]">
            {data?.section_sub_title}
          </p>
          <div className="ml-6 mt-[48px] md:ml-0">
            <CommonButton
              name={"Join"}
              bgColor="#00A481"
              hoverColor="#00896D"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
