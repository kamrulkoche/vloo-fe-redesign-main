"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const menus = [
  { name: "Space Master", path: "space-master" },
  { name: "Add Space", path: "add-space" },
  { name: "Booking Calendar", path: "booking-calender" },
  { name: "Booking History", path: "booking-history" },
  { name: "Reviews", path: "reviews" },
];

const SpaceManagerPage = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(`/pro/portal/space-manager/${path}`);
  };

  return (
    <div className="flex items-center justify-start">
      <div className="w-full rounded-[10px] bg-[#0A2A3C] p-4 sm:w-[80%]">
        <p className="mb-9 text-[24px] font-semibold leading-[32px] text-white md:text-[32px] md:leading-[44px]">
          Space manager
        </p>

        <div className={"rounded-[10px] bg-[#006988] px-7 py-5"}>
          {menus.map((menu) => (
            <div
              key={menu.path}
              onClick={() => handleNavigation(menu.path)}
              className={
                "mb-4 flex cursor-pointer items-center justify-between rounded-[10px] border border-[#13293A99] p-4 transition-colors duration-200 ease-in-out last:mb-0 hover:bg-[#0A2A3C]"
              }
            >
              <p className="text-[16px] font-[600] leading-[22px] text-[#DEDEDE]">
                {menu.name}
              </p>
              <ChevronRight className="h-[22px] w-[22px] text-white" />
            </div>
          ))}
        </div>
      </div>
      <div className="w-0 sm:w-[20%]" />
    </div>
  );
};

export default SpaceManagerPage;
