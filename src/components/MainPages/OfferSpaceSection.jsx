"use client";
import SectionTitle from "@/components/CustomComponents/SectionTitle";
import { motion, useAnimation } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";

const OfficeSpaceSection = ({ data }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  React.useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.5 },
    });
  }, [inView, controls]);

  return (
    <div
      className="mb-4 rounded-[10px] bg-white sm:mb-8 sm:bg-[#F3F3F3]"
      ref={ref}
    >
      <div className="mx-auto w-full sm:w-[763px]">
        <SectionTitle title={data?.section_title} />
      </div>

      <div className="mt-5 flex flex-col items-center justify-center pb-4 sm:mt-10 sm:pb-8 md:flex-row">
        <div className="flex flex-col items-center gap-[20px] rounded-bl-[10px] rounded-tl-[10px] bg-white pl-0 pr-0 sm:pl-12 sm:pr-16 md:mt-[48px] md:flex-row md:gap-[129px]">
          <div className="mt-[0px] flex w-full flex-col items-center md:mt-[92px]">
            <ul>
              {data?.sub_section?.map((item) => (
                <li key={item.id} className="mb-[20px]">
                  <div>
                    <h3 className="mb-[9px] text-[24px] font-semibold leading-[28px] text-[#0A2A3C]">
                      {item.sub_section_title}
                    </h3>
                    <p className="text-[16px] font-normal leading-[22px] text-[#868686]">
                      {item.sub_section_sub_title}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-full flex-col items-center">
            <h3 className="my-7 w-[241px] text-center text-[24px] font-medium leading-[25px] text-[#0A2A3C]">
              Traditional co-working spaces
            </h3>
            <ul>
              {data?.sub_section?.map((item) => (
                <li key={item.id} className="mb-[44px]">
                  <img
                    src="/assets/icons/close.png"
                    alt="close-icon"
                    className="h-[30px] w-[30px]"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          animate={controls}
          className="h-[568px] w-full rounded-[10px] bg-[#006988] md:w-[227px]"
        >
          <h3 className="pb-[58px] pt-[75px] text-center text-[28px] font-semibold leading-[40px] text-white">
            VLOO
          </h3>
          <ul>
            {data?.sub_section?.map((item) => (
              <li
                key={item.id}
                className="mb-[45px] flex items-center justify-center"
              >
                <img
                  src="/assets/icons/correct.png"
                  alt="correct-icon"
                  className="h-[30px] w-[30px]"
                />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default OfficeSpaceSection;
