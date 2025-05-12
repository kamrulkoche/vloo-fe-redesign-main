"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

export default function FAQSection({ data }) {
  const [openAccordion, setOpenAccordion] = useState(String(null));

  return (
    <div className="mb-8 px-4 pt-10 md:pt-[46px]">
      <p className="mb-6 text-center text-[24px] font-bold leading-[30px] text-[#0A2A3C] md:mb-[26px] md:text-[36px] md:leading-[48px]">
        Frequently Asked Questions
      </p>

      <p className="mb-4 text-center text-[14px] font-medium leading-[20px] text-[#868686] md:mb-[22.5px] md:text-[16px] md:leading-[22px]">
        We believe that shopping should be an enjoyable and hassle-free
        experience.
      </p>

      <div className="pb-8 md:px-[292px] md:pb-[69px]">
        <Accordion type="single" collapsible onValueChange={setOpenAccordion}>
          {data?.map((item) => (
            <AccordionItem
              key={item?.id}
              value={String(item?.id)}
              className={`mb-4 rounded-lg border px-4 py-2 md:mb-[14px] md:rounded-[10px] md:px-[24px] md:py-[2px] ${
                openAccordion === String(item?.id)
                  ? "bg-[#447483]"
                  : "border-[#447483]"
              }`}
            >
              <AccordionTrigger
                className={`${
                  openAccordion === String(item?.id)
                    ? "text-white"
                    : "text-[#0A2A3C]"
                } text-[16px] font-bold leading-[20px] hover:no-underline md:text-[18px] md:leading-[24px]`}
              >
                {item?.title}
              </AccordionTrigger>

              <AccordionContent
                className={`${
                  openAccordion === String(item?.id)
                    ? "text-[#DEDEDE]"
                    : "text-[#0A2A3C]"
                } text-[14px] font-normal leading-[20px] md:text-[18px] md:leading-[24px]`}
              >
                {item?.details}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
