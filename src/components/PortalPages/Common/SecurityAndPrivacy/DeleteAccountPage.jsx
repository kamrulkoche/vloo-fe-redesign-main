"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import {
  clearUserData,
  getUserData,
  getUserType,
} from "@/components/HelperFunctions/GetUserTypeFunction";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useDeleteAccount from "@/hooks/QueryHooks/Common/Security/useDeleteAccount";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteAccountPage = () => {
  const userType = getUserType();
  const userData = getUserData();
  const router = useRouter();

  const { mutate, isPending } = useDeleteAccount(userType);

  const [isConfirmDelete, setIsConfirmDelete] = useState(false);

  const bgColor = userType !== "user" ? "bg-[#006988]" : "bg-[#006988]";
  const hoverBgColor =
    userType !== "user" ? "hover:bg-[#006988]" : "hover:bg-[#006988]";

  const handleDeleteAccount = () => {
    if (!userData?.uuid) return;

    mutate(
      { uuid: userData.uuid },
      {
        onSuccess: () => {
          clearUserData();
          setIsConfirmDelete(true);
        },
        onError: (error) => {
          console.error("Error deleting account:", error);
        },
      },
    );
  };

  return (
    <div>
      <PortalBackButton title="Security and Privacy" />

      <div>
        <div className="flex items-center justify-start">
          <div className="w-full sm:w-[80%]">
            <div className="w-full rounded-[20px] bg-[#0A2A3C] p-5 sm:w-[80%]">
              <p className="pb-5 text-[16px] font-[600] leading-[22px] text-[#EBF0F3]">
                Delete account
              </p>
              <div
                className={`rounded-[10px] border border-[#FFFFFF] p-5 sm:p-[30px] ${bgColor}`}
              >
                <p className="mb-5 text-[13px] font-[500] leading-[18px] text-white">
                  By deleting your account you will lose all your user data (
                  which you will not be able to recover)
                </p>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      disabled={isPending}
                      className="h-[40px] w-[113px] rounded-[5px] border border-[#CF563F] bg-[#CF563F] text-[14px] font-[500] leading-[20px] text-white disabled:opacity-50"
                    >
                      {isPending ? "Deleting..." : "Delete account"}
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-full border-none bg-[#0A2A3C] sm:w-[428px]">
                    <AlertDialogHeader>
                      <p className="text-center text-[20px] font-[700] leading-[28px] text-white">
                        Do you want to delete your account?
                      </p>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mx-7 mt-6 flex items-center justify-between sm:mt-12">
                      <AlertDialogCancel className="h-[35px] w-[85px] rounded-[5px] border border-white bg-transparent text-[14px] font-[600] leading-[20px] text-white hover:bg-transparent hover:text-white">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="h-[35px] w-[110px] rounded-[5px] border border-[#CF563F] bg-[#CF563F] text-[14px] font-[600] leading-[20px] text-white hover:bg-[#CF563F] hover:text-white"
                        onClick={handleDeleteAccount}
                        disabled={isPending}
                      >
                        {isPending ? "Deleting..." : "Delete account"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
          <div className="w-0 sm:w-[20%]" />
        </div>
      </div>

      <AlertDialog open={isConfirmDelete} onOpenChange={setIsConfirmDelete}>
        <AlertDialogContent className="w-full border-none bg-[#0A2A3C] sm:w-[428px]">
          <AlertDialogHeader>
            <p className="text-center text-[20px] font-[700] leading-[28px] text-white">
              Account successfully deleted
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex w-full items-center justify-center sm:mt-12">
            <AlertDialogAction
              className={`h-[44px] w-[85px] rounded-[5px] border-none text-[14px] font-[600] leading-[20px] text-white hover:text-white ${bgColor} ${hoverBgColor}`}
              onClick={() => {
                setIsConfirmDelete(false);
                router.push("/");
              }}
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteAccountPage;
