import CommonButton from "../CustomComponents/CommonButton";

const dummyData = [
  {
    id: 1,
    img: "/assets/icons/equinor.svg",
    review:
      "Amazing place to network and connect with some highly motivated and intelligent people.",
    client_name: "Jhone Grimbaldeston",
    position: "Chief Marketing Officer, The private office",
  },
  {
    id: 2,
    img: "/assets/icons/telenor.svg",
    review:
      "Amazing place to network and connect with some highly motivated and intelligent people.",
    client_name: "Jhone Grimbaldeston",
    position: "Chief Marketing Officer, The private office",
  },
  {
    id: 3,
    img: "/assets/icons/quadient.svg",
    review:
      "Amazing place to network and connect with some highly motivated and intelligent people.",
    client_name: "Jhone Grimbaldeston",
    position: "Chief Marketing Officer, The private office",
  },
  {
    id: 4,
    img: "/assets/icons/orkla.svg",
    review:
      "Amazing place to network and connect with some highly motivated and intelligent people.",
    client_name: "Jhone Grimbaldeston",
    position: "Chief Marketing Officer, The private office",
  },
];

export default function ClientReview({data}) {
  return (
    <div className="mx-[25px] mb-[25px] rounded-[10px] bg-[#F3F3FE]">
      <div className="flex flex-col gap-[30px] px-[20px] py-[50px] md:flex-row md:px-[40px]">
        <div className="mt-0 md:mt-[42px]">
          <p className="text-center text-[50px] font-bold leading-[80px] text-[#0A2A3C] md:text-left md:text-[60px]">
            {data?.section_title}
          </p>
          <div className="ml-12 mt-[28px] md:ml-0">
            <CommonButton
              name={"Join"}
              bgColor="#00A481"
              hoverColor="#00896D"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2">
          {data?.sub_section?.map((item) => (
            <div
              key={item?.id}
              style={{ boxShadow: "0px 0px 20px 0px #0000001A" }}
              className="rounded-[10px] bg-white pb-[24px] pl-[20px] pr-[30px] pt-[18px]"
            >
              <img
                src={item?.upload_files?.[0]?.file_url}
                alt="company-logo"
                className="mb-[33px]"
              />
              <p className="mb-[37px] text-[18px] font-semibold italic leading-[24px] text-[#13293ACC]">
                {`${item?.sub_section_title}`}
              </p>
              <p className="mb-[8px] text-[20px] font-bold leading-[28px] text-[#0A2A3C]">
                {item?.client_name}
              </p>
              <p className="text-[16px] font-medium leading-[22px] text-[#7A7A7A]">
                {item?.sub_section_sub_title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
