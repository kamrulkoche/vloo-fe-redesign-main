"use client";

import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { getUserType } from "../HelperFunctions/GetUserTypeFunction";

const PaymentHistoryDialog = ({ onOpenChange, selectedUuid }) => {
  const userType = getUserType();

  const bgColor = userType === "user" ? "bg-[#006988]" : "bg-[#00A481]";

  return (
    <DialogContent
      isClose={false}
      className="w-full rounded-[10px] border-none bg-[#0A2A3C] p-0 sm:w-[398px]"
    >
      <DialogTitle
        className={`flex h-[45px] items-center justify-center rounded-tl-[10px] rounded-tr-[10px] text-[20px] font-bold leading-[28px] text-white ${bgColor}`}
      >
        Payment detail
      </DialogTitle>

      <DialogDescription className="mx-3 my-5 sm:mx-12">
        <div className="mb-9">
          <div className="mb-4 flex items-center">
            <p className="w-1/2 text-[16px] font-[600] leading-[22px] text-white">
              Date
            </p>
            <p className="w-1/2 text-left text-[16px] font-[500] leading-[22px] text-[#DEDEDE]">
              24 April 2024
            </p>
          </div>
          <div className="mb-4 flex items-center">
            <p className="w-1/2 text-[16px] font-[600] leading-[22px] text-white">
              Invoice ID
            </p>
            <p className="w-1/2 text-left text-[16px] font-[500] leading-[22px] text-[#DEDEDE]">
              ase56437
            </p>
          </div>
          <div className="mb-4 flex items-center">
            <p className="w-1/2 text-[16px] font-[600] leading-[22px] text-white">
              Status
            </p>
            <p className="w-1/2 text-left text-[16px] font-[500] leading-[22px] text-[#3FAD4A]">
              Complete
            </p>
          </div>
          <div className="mb-4 flex items-center">
            <p className="w-1/2 text-[16px] font-[600] leading-[22px] text-white">
              Method
            </p>
            <p className="w-1/2 text-left text-[16px] font-[500] leading-[22px] text-[#DEDEDE]">
              Stripe
            </p>
          </div>
          <div className="mb-4 flex items-center">
            <p className="w-1/2 text-[16px] font-[600] leading-[22px] text-white">
              Card no
            </p>
            <p className="w-1/2 text-left text-[16px] font-[500] leading-[22px] text-[#DEDEDE]">
              XXXX XXX XXXX 6581
            </p>
          </div>
          <div className="flex items-center">
            <p className="w-1/2 text-[16px] font-[600] leading-[22px] text-white">
              Amount
            </p>
            <p className="w-1/2 text-left text-[16px] font-[500] leading-[22px] text-[#DEDEDE]">
              NOK 102.00
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-[91px]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-[35px] w-[85px] rounded-[5px] border border-[#006988] bg-white text-[14px] font-[600] leading-[20px] text-[#006988]"
          >
            Cancel
          </button>
          <button
            className={`h-[35px] w-[85px] rounded-[5px] text-[14px] font-[600] leading-[20px] text-white ${bgColor}`}
          >
            Download
          </button>
        </div>
      </DialogDescription>
    </DialogContent>
  );
};

export default PaymentHistoryDialog;
