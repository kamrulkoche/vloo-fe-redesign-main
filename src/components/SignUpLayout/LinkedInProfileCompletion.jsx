"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import CompletionForm from "../CustomForms/CompletionForm";

export default function LinkedInProfileCompletion() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full bg-white sm:w-1/2">
        <div className="flex flex-col items-center justify-center pt-5 sm:pt-[33px]">
          <Image
            src={"/assets/VLOO-logo.png"}
            alt="vloo-logo"
            width={179}
            height={32}
          />
          <p className="pt-3 text-[28px] font-[500] leading-[48px] text-[#0A2A3C] sm:pt-[26px]">
            Create an account
          </p>
        </div>

        <div className="mx-auto w-[506px]">
          <div className="my-3 rounded-[10px] bg-gray-100 p-4">
            <p className="text-sm text-gray-600">LinkedIn signing up with:</p>
            <p className="font-medium">{session?.user?.email}</p>
          </div>
          
          <CompletionForm type={"User"} />
        </div>
      </div>
    </div>
  );
}
