"use client";

import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const ContactDialog = ({ onOpenChange, contactData }) => {
  return (
    <DialogContent
      isClose={false}
      className="w-full rounded-[10px] border-none bg-white p-0 sm:w-[428px]"
    >
      <DialogTitle className="mb-6 mt-4 text-center text-[24px] font-bold leading-[34px] text-[#0A2A3C] sm:mb-11 sm:mt-8">
        Contact Information
      </DialogTitle>

      <DialogDescription className="mx-3 sm:mx-12">
        <div>
          <div className="mb-4 flex items-center gap-5">
            <img
              src="/assets/icons/phone.svg"
              alt="phone-icon"
              className="h-[30px] w-[30px]"
            />
            <p className="text-[16px] font-[400] leading-[22px] text-[#0A2A3C]">
              {contactData?.phone || ""}
            </p>
          </div>
          <div className="mb-4 flex items-center gap-5">
            <img
              src="/assets/icons/mail.svg"
              alt="mail-icon"
              className="h-[30px] w-[30px]"
            />
            <p className="text-[16px] font-[400] leading-[22px] text-[#0A2A3C]">
              {contactData?.email || ""}
            </p>
          </div>
          <div className="mb-4 flex items-center gap-5">
            <img
              src="/assets/icons/location.svg"
              alt="location-icon"
              className="h-[30px] w-[30px]"
            />
            <p className="text-[16px] font-[400] leading-[22px] text-[#0A2A3C]">
              {contactData?.address || ""}
            </p>
          </div>
        </div>

        <div className="my-6 flex items-center justify-center sm:my-11">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-[35px] w-[85px] rounded-[5px] bg-[#00A481] text-[14px] font-[600] leading-[20px] text-white"
          >
            Close
          </button>
        </div>
      </DialogDescription>
    </DialogContent>
  );
};

export default ContactDialog;
