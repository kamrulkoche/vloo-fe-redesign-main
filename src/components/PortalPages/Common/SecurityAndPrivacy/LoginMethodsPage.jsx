"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import OtpFormDialog from "@/components/Dialogs/OtpFormDialog";
import { getUserType } from "@/components/HelperFunctions/GetUserTypeFunction";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const LoginMethodsPage = () => {
  const [open, setOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const userType = getUserType();

  const bgColor = userType !== "user" ? "bg-[#006988]" : "bg-[#006988]";
  const hoverBgColor =
    userType !== "user" ? "hover:bg-[#006988]" : "hover:bg-[#006988]";

  const handleDialogChange = (isOpen) => {
    setOpen(isOpen);
  };

  const handleVerificationSuccess = () => {
    setIsSuccessDialogOpen(true);
    setOpen(false);
  };

  return (
    <div>
      <PortalBackButton title="Security and Privacy" />

      <Dialog open={open} onOpenChange={handleDialogChange}>
        <div className="flex items-center justify-start">
          <div className="w-full sm:w-[80%]">
            <div className="rounded-[20px] bg-[#0A2A3C] p-5">
              <p className="mb-5 text-[16px] font-[600] leading-[22px] text-[#EBF0F3]">
                Available login methods
              </p>
              <div
                className={`rounded-[10px] border border-[#FFFFFF] p-5 ${bgColor}`}
              >
                <div className="mb-3 flex justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/icons/linkedin-icon.svg"
                      alt="linkedin"
                      className="h-5 w-5"
                    />
                    <p className="text-[12px] font-[500] leading-[17px] text-white">
                      LinkedIn Account
                    </p>
                  </div>
                  <DialogTrigger asChild>
                    <button className="h-[44px] w-[88px] bg-transparent text-[14px] font-[600] leading-[20px] text-white">
                      Add
                    </button>
                  </DialogTrigger>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/icons/google-icon.svg"
                      alt="google"
                      className="h-5 w-5"
                    />
                    <p className="text-[12px] font-[500] leading-[17px] text-white">
                      Google Account
                    </p>
                  </div>
                  <DialogTrigger asChild>
                    <button className="h-[44px] w-[88px] bg-transparent text-[14px] font-[600] leading-[20px] text-white">
                      Add
                    </button>
                  </DialogTrigger>
                </div>
              </div>
            </div>
          </div>
          <div className="w-0 sm:w-[20%]" />
        </div>

        <OtpFormDialog onVerificationSuccess={handleVerificationSuccess} />

        <AlertDialog
          open={isSuccessDialogOpen}
          onOpenChange={setIsSuccessDialogOpen}
        >
          <AlertDialogContent className="w-full border-none bg-[#0A2A3C] sm:w-[428px]">
            <AlertDialogHeader>
              <p className="text-center text-[20px] font-[700] leading-[28px] text-white">
                Your email has been successfully changed
              </p>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 flex w-full items-center justify-center sm:mt-12">
              <AlertDialogAction
                className={`h-[35px] w-[145px] rounded-[5px] border-none text-[14px] font-[600] leading-[20px] text-white hover:text-white ${bgColor} ${hoverBgColor}`}
                onClick={() => setIsSuccessDialogOpen(false)}
              >
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Dialog>
    </div>
  );
};

export default LoginMethodsPage;
