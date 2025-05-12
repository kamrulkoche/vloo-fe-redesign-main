"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useLeadMutate from "@/hooks/QueryHooks/Public/useLeadMutate";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const dummyData = [
  {
    id: 1,
    title: "Where can I watch?",
    desc: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. Fermentum sulla craspor ttitore ismod nulla.",
  },
  {
    id: 2,
    title: "Where can I watch?",
    desc: "Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. Fermentum sulla craspor ttitore ismod nulla.",
  },
];

export default function HelpPageComponent({ type }) {
  const [openAccordion, setOpenAccordion] = useState(String(null));

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    details: "",
  });

  const { mutate, isPending } = useLeadMutate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      {
        email: formData.email,
        phone: formData.phone,
        details: formData.details,
        lead_user: type,
        status: "Pending",
      },
      {
        onSuccess: () => {
          setFormData({ email: "", phone: "", details: "" });
        },
        onError: () => {
          console.log("Failed to submit the form. Please try again.");
        },
      },
    );
  };

  return (
    <div className="bg-[#F3F3F3]">
      {/* Banner Section */}
      <div
        className="relative mb-[40px] h-[296px] w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/images/banner-images/help-page-banner.png')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <h1 className="text-[36px] font-[700] leading-[48px] sm:text-[60px] sm:leading-[80px]">
            Hello, how can we help
          </h1>
        </div>
      </div>

      {/* Contact form */}
      <div className="mx-5 my-5 rounded-[20px] bg-[#006988] p-5 sm:mx-[130px] sm:my-12 sm:p-12">
        <div className="flex flex-col justify-center gap-5 sm:flex-row sm:gap-[77px]">
          <div className="w-full sm:w-1/2">
            <p className="mb-5 text-[32px] font-[500] leading-[48px] text-white sm:mb-11 sm:text-[48px] sm:leading-[64px]">
              Get in touch !
            </p>
            <p className="text-[24px] font-[400] leading-[28px] text-white">
              Got any questions about VLOO and our services, we would love to
              hear from you.
              <br />
              <br />
              Write us a message or add your phone number and we will get back
              to you shortly.
            </p>
          </div>
          <div className="w-full sm:w-1/2">
            <form onSubmit={handleSubmit}>
              <div className="mb-[30px]">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="bg-[#F3F3F3]"
                  required
                />
              </div>
              <div className="mb-[30px]">
                <Input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="bg-[#F3F3F3]"
                  required
                />
              </div>
              <div className="mb-[30px]">
                <Textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Write your message.........."
                  className="rounded-[5px] bg-[#F3F3F3]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-[5px] bg-[#0A2A3C]"
                disabled={isPending}
              >
                <p className="py-4 text-[16px] font-[500] leading-[22px] text-white">
                  {isPending ? "Submitting..." : "Submit"}
                </p>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-5 mt-5 flex flex-col items-center gap-3 pb-5 sm:mx-[130px] sm:mt-14 sm:flex-row sm:gap-12 sm:pb-[88px]">
        <div
          style={{ boxShadow: "0px 0px 10px 0px #0000001A" }}
          className="w-full rounded-[10px] bg-[#00A481] p-5 sm:w-2/5"
        >
          <p className="mb-7 text-[24px] font-[700] leading-[34px] text-white">
            Contact Information
          </p>
          <div className="mb-[10px] flex items-center gap-5">
            <Image
              src={"/assets/icons/contact/location.svg"}
              alt="location-icon"
              width={30}
              height={30}
            />
            <p className="text-[16px] font-[400] leading-[22px] text-[#FAF7F0]">
              8819 Ohio St. South Gate, CA 90280
            </p>
          </div>
          <div className="mb-[10px] flex items-center gap-5">
            <Image
              src={"/assets/icons/contact/mail.svg"}
              alt="mail-icon"
              width={30}
              height={30}
            />
            <p className="text-[16px] font-[400] leading-[22px] text-[#FAF7F0]">
              vloo@hello.com
            </p>
          </div>
          <div className="mb-[10px] flex items-center gap-5">
            <Image
              src={"/assets/icons/contact/phone.svg"}
              alt="phone-icon"
              width={30}
              height={30}
            />
            <p className="text-[16px] font-[400] leading-[22px] text-[#FAF7F0]">
              +1 386-688-3295
            </p>
          </div>
          <div className="mb-[10px] flex items-center gap-5">
            <Image
              src={"/assets/icons/contact/instagram.svg"}
              alt="instagram-icon"
              width={30}
              height={30}
            />
            <p className="text-[16px] font-[400] leading-[22px] text-[#FAF7F0]">
              Follow us on Instagram
            </p>
          </div>
          <div className="mb-7 flex items-center gap-5">
            <Image
              src={"/assets/icons/contact/linkedin.svg"}
              alt="linkedin-icon"
              width={30}
              height={30}
            />
            <p className="text-[16px] font-[400] leading-[22px] text-[#FAF7F0]">
              Find us on LinkedIn
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button className="h-[60px] w-[250px] rounded-[5px] bg-[#006988]">
              <p className="text-[18px] font-[700] leading-[24px] text-white">
                Email us
              </p>
            </button>
          </div>
        </div>
        <div
          style={{ boxShadow: "0px 0px 10px 0px #0000001A" }}
          className="w-full rounded-[10px] bg-white p-5 sm:w-3/5 sm:p-10"
        >
          <p className="mb-7 text-[24px] font-[700] leading-[34px] text-[#0A2A3C]">
            Check out our FAQ
          </p>

          <Accordion type="single" collapsible onValueChange={setOpenAccordion}>
            {dummyData?.map((item) => (
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
                  {item?.desc}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-[44px] flex items-center justify-center">
            <button className="h-[60px] w-[250px] rounded-[5px] bg-[#00A481]">
              <p className="text-[18px] font-[700] leading-[24px] text-white">
                Go to FAQ
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
