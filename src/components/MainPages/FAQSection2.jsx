"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";

const dummyData = [
  {
    id: 1,
    title: "Where can I watch?",
    desc: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.",
  },
  {
    id: 2,
    title: "How can I watch?",
    desc: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.",
  },
  {
    id: 3,
    title: "What can I watch?",
    desc: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.",
  },
  {
    id: 4,
    title: "Where can I watch?",
    desc: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.",
  },
  {
    id: 5,
    title: "Where can I watch?",
    desc: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.",
  },
  {
    id: 6,
    title: "Where can I watch?",
    desc: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.",
  },
  {
    id: 7,
    title: "Where can I watch?",
    desc: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.",
  },
];

export default function FAQSection2({ searchQuery }) {
  const [openAccordion, setOpenAccordion] = useState(String(null));

  const filteredData = dummyData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <AccordionItem
                key={item.id}
                value={String(item.id)}
                className={`mb-4 rounded-lg border px-4 py-2 md:mb-[14px] md:rounded-[10px] md:px-[24px] md:py-[2px] ${
                  openAccordion === String(item.id)
                    ? "bg-[#447483]"
                    : "border-[#447483]"
                }`}
              >
                <AccordionTrigger
                  className={`${
                    openAccordion === String(item.id)
                      ? "text-white"
                      : "text-[#0A2A3C]"
                  } text-[16px] font-bold leading-[20px] hover:no-underline md:text-[18px] md:leading-[24px]`}
                >
                  {item.title}
                </AccordionTrigger>

                <AccordionContent
                  className={`${
                    openAccordion === String(item.id)
                      ? "text-[#DEDEDE]"
                      : "text-[#0A2A3C]"
                  } text-[14px] font-normal leading-[20px] md:text-[18px] md:leading-[24px]`}
                >
                  {item.desc}
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <p className="text-center text-[16px] font-medium text-[#868686]">
              No FAQs found for your search.
            </p>
          )}
        </Accordion>
      </div>
    </div>
  );
}
