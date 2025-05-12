"use client";
import { useRouter } from "next/navigation";

const PortalBackButton = ({ title = "" }) => {
  const router = useRouter();

  return (
    <div className="mb-9 flex items-center gap-3">
      <img
        src="/assets/icons/portal-back-button.svg"
        alt="portal-back-button"
        className="cursor-pointer"
        onClick={() => router.back()}
      />
      <p className="text-[24px] font-[700] leading-[34px] text-white">
        {title}
      </p>
    </div>
  );
};

export default PortalBackButton;
