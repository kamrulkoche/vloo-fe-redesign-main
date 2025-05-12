"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function JoinSection({ data }) {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false, // Allow repeated animations
  });

  console.log(data);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (inView && !isAnimating) {
      setIsAnimating(true);
      let index = 0;

      const interval = setInterval(() => {
        if (index < data?.sub_section?.length) {
          setActiveIndex(index);
          index++;
        } else {
          clearInterval(interval);
          setActiveIndex(-1);
          setIsAnimating(false);
        }
      }, 800); // 800ms delay between each animation

      return () => {
        clearInterval(interval);
        setIsAnimating(false);
      };
    }
  }, [inView]);

  return (
    <div ref={ref} className="mt-10 sm:mt-24 mx-6">
      <div className="mx-auto w-full ">
        {/* <SectionTitle title={data?.section_title} /> */}
        <h2 className="text-[24px] sm:text[36px] lg:text-[48px] font-bold text-center">Office <span className="text-[#0091B6]">space</span> on your terms</h2>
        <p className="text-[#757575] font-normal text-lg sm:text-xl lg:text-2xl text-center">See what VLOO offers compared to others on the market</p>
      </div>
      {/* <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {data?.sub_section?.map((item, index) => (
          <JoinCard
            key={item?.id}
            title={item?.sub_section_title}
            subTitle={item?.sub_section_sub_title}
            img={item?.upload_files?.[0]?.file_url}
            animate={index === activeIndex}
          />
        ))}
      </div> */}

      <div className="mt-4 sm:mt-14 ">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-[#F7F7F7] p-6">
            <h2 className="text-[#13293AE5] text-xl sm:text-[40px] font-semibold text-center">Traditional Co-working</h2>
            <div className="flex justify-start mt-6 sm:mt-10">
              <h2 className="font-medium text-lg text-[#071A2B] bg-[#D9D9D9] py-2.5 px-4 rounded-2xl sm:w-[241px] text-center">
                Longer leases
              </h2>
            </div>

            <div className="flex justify-end mt-6">
              <h2 className="font-medium text-lg text-[#071A2B] bg-[#D9D9D9] py-2.5 px-4 rounded-2xl sm:w-[241px] text-center">
                Everything costs extra
              </h2>
            </div>
            <div className="flex justify-start mt-6">
              <h2 className="font-medium text-lg text-[#071A2B] bg-[#D9D9D9] py-2.5 px-4 rounded-2xl w-[9rem] sm:w-[241px] text-center">
                No charm
              </h2>
            </div>
          </div>


          <div className="rounded-3xl bg-[#0091B6] py-6 px-10">
            <h2 className="text-[#FFFFFF] text-xl sm:text-[40px] font-semibold text-center ">VLOO</h2>
            <div className="flex justify-end mt-6 sm:mt-10">
              <h2 className="font-medium text-lg text-[#071A2B] bg-[#FFD8C2] py-2.5 px-4 rounded-2xl w-[232px] text-center">
                Renounced companies
              </h2>
            </div>
            <div className="flex justify-start mt-6 sm:-mt-8">
              <h2 className="font-medium text-lg text-[#071A2B] bg-[#7FE5F0] py-2.5 px-4 rounded-2xl w-[217px] text-center">
                Day to day flexibility
              </h2>
            </div>
            <div className="flex justify-end mt-6 sm:mr-16">
              <h2 className="font-medium text-lg text-[#071A2B] bg-[#D9D9D9] py-2.5 px-4 rounded-2xl w-[198px] text-center">
                No charm
              </h2>
            </div>
            <div className="flex justify-start mt-6 sm:-mt-4 sm:mr-16">
              <h2 className="font-medium text-lg text-[#071A2B] bg-[#F0A3A3] py-2.5 px-4 rounded-2xl w-[198px] text-center">
                Grow your network
              </h2>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
