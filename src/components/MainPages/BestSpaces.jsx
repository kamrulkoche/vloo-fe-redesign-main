import GlobalSearch from "@/components/CustomComponents/GlobalSearch";
import LocationBox from "@/components/CustomComponents/LocationBox";
import SectionTitle from "@/components/CustomComponents/SectionTitle";

const bgColor = ["#72A1B6", "#457484", "#115B72", "#0A2A3C"];

export default function BestSpaces({ data }) {
  return (
    <div className="mb-4 flex flex-col items-center justify-center rounded-[30px] bg-[#D9F7F0] sm:mb-8">
      <div className="mx-auto w-full sm:w-[763px]">
        <SectionTitle title={data?.section_title} />
      </div>

      <div className="mb-4 mt-5 grid grid-cols-1 gap-3 sm:mb-8 sm:mt-10 sm:grid-cols-2 md:grid-cols-3 md:gap-10 lg:grid-cols-4">
        {data?.sub_section?.map((item, index) => (
          <LocationBox
            key={item?.id}
            title={item?.sub_section_title}
            bgColor={bgColor[index % bgColor.length]}
          />
        ))}
      </div>
      <div className="mb-4 mt-5 sm:mb-8 sm:mt-10">
        <GlobalSearch />
      </div>
    </div>
  );
}
