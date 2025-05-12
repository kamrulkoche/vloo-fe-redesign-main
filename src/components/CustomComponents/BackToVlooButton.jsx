"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackToVlooButton({ source = "User", bgColor }) {
  const router = useRouter();
  const route = source === "User" ? "/" : "/pro";

  return (
    <div>
      <button
        onClick={() => router.push(`${route}`)}
        className="flex w-[116px] items-center justify-between rounded-[5px] bg-[#006988] py-[3px] pl-1 pr-[10px]"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <ChevronLeft className="h-[23px] w-[23px] text-white" />
        <p className="text-[12px] font-[500] leading-[17px] text-white">
          Back to VLOO
        </p>
      </button>
    </div>
  );
}
