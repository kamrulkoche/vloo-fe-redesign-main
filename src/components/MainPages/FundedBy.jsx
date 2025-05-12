import React from "react";
import SectionTitle from "@/components/CustomComponents/SectionTitle";

export default function FundedBy() {
  return (
    <div className="mb-4 flex flex-col items-center justify-center sm:mb-8">
      <div className="mx-auto w-full sm:w-[763px]">
        <SectionTitle title={"Funded by"} />
      </div>
      <div className="mt-5 sm:mt-10">
        <img
          src="/assets/images/funded_by.png"
          alt="funded-by-images"
          className="mb-[40px] h-[71px] w-[194px]"
        />
      </div>
    </div>
  );
}
