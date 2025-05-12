import WhatYouGetCard from "@/components/Cards/WhatYouGetCard";
import CommonButton from "@/components/CustomComponents/CommonButton";
import SectionTitle from "@/components/CustomComponents/SectionTitle";

export default function WhatYouGet({ data }) {
  return (
    <div className="mb-4 sm:mb-8">
      <div className="mx-auto w-full sm:w-[763px]">
        <SectionTitle title={data?.section_title} />
      </div>

      <div className="mx-0 mt-5 sm:mx-24 sm:mt-10">
        {data?.sub_section.map((item, index) => (
          <WhatYouGetCard
            key={item?.id}
            title={item?.sub_section_title}
            desc={item?.sub_section_sub_title}
            file={item?.upload_files?.[0]?.file_url}
            index={index}
          />
        ))}
      </div>

      <div className="mb-4 mt-8 text-center sm:mb-8 sm:mt-16">
        <CommonButton name={"Join"} />
      </div>
    </div>
  );
}
