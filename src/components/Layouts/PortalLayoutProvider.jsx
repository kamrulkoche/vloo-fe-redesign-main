"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import HostPortalSidebarMenuItems from "@/constants/HostPortalSidebarMenuItems";
import UserPortalSidebarMenuItems from "@/constants/UserPortalSidebarMenuItems";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getUserType } from "../HelperFunctions/GetUserTypeFunction";
import handleLogout from "../HelperFunctions/HandleLogoutFunction";
import LoadingComponent from "../LoadingComponent";

export default function PortalLayoutProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Add client-side mounting state
  const [isMounted, setIsMounted] = useState(false);
  const [currentUserType, setCurrentUserType] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
    const type = getUserType();
    setCurrentUserType(type);
  }, []);

  const hostPortalSidebar = HostPortalSidebarMenuItems;
  const userPortalSidebar = UserPortalSidebarMenuItems;

  const sidebarMenus =
    currentUserType === "user" ? userPortalSidebar : hostPortalSidebar;

  const bgColor = currentUserType === "user" ? "bg-[#83E5EF]" : "bg-[#00A481]";
  const hoverBgColor =
    currentUserType === "user" ? "hover:bg-[#83E5EF]" : "hover:bg-[#00A481]";

  const handleNavigation = (path, isLogout) => {
    if (isLogout) {
      handleLogout();
    } else {
      router.push(path);
    }
    setIsSheetOpen(false); // Close the sheet after navigation
  };

  const isMenuItemActive = (itemPath) => {
    const currentPath = pathname.split("?")[0];
    return currentPath.startsWith(itemPath);
  };

  // Return a loader before client-side hydration
  if (!isMounted) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex min-h-screen w-screen gap-4 bg-[#0D4362] px-2 py-2 sm:px-[51px] sm:py-6">
      {/* Sidebar for Desktop */}
      <div className="hidden sm:block">
        <aside className="sticky top-[71px] h-fit min-w-[227px] rounded-[10px] bg-[#0A2A3C] text-white">
          <ul className="p-4">
            <div
              onClick={() =>
                router.push(
                  currentUserType === "user" ? "/portal" : "/pro/portal",
                )
              }
              className="mb-[30px] cursor-pointer rounded-[15px] bg-[#071F2D] p-[5px]"
            >
              <div
                className={`flex h-10 items-center justify-center rounded-[10px] ${bgColor} transition-colors duration-200 ease-in-out`}
              >
                <img
                  src={
                    currentUserType === "user"
                      ? "/assets/VLOO-logo-new.svg"
                      : "/assets/VLOOPro-logo.png"
                  }
                  alt="sidebar-logo"
                  className="h-[15px] w-[100px]"
                />
              </div>
            </div>
            <div className="mb-3">
              {sidebarMenus?.map((item, index) => (
                <li
                  onClick={() =>
                    handleNavigation(item.path, item.name === "Log out")
                  }
                  key={index}
                  className={`mb-4 flex h-10 cursor-pointer items-center gap-4 rounded-md px-3 transition-colors last:mb-0 ${hoverBgColor} ${isMenuItemActive(item.path) ? bgColor : ""} ${isMenuItemActive(item.path) && currentUserType === "user" ? "text-[#0A2A3C]" : ""} ${currentUserType === "user" ? "hover:text-[#0A2A3C]" : ""} group`}
                >
                  <div className="relative h-5 w-5">
                    {currentUserType === "user" ? (
                      <img
                        src={
                          isMenuItemActive(item.path)
                            ? item?.icon
                            : item?.iconHover
                        }
                        alt={item?.name}
                        className={"absolute h-full w-full transition-opacity"}
                      />
                    ) : (
                      <img
                        src={item?.iconHover}
                        alt={item?.name}
                        className={"absolute h-full w-full transition-opacity"}
                      />
                    )}
                    {currentUserType === "user" && (
                      <img
                        src={item?.icon}
                        alt={item?.name}
                        className="absolute h-full w-full opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    )}
                  </div>

                  <p className="text-[14px] font-[500] leading-[15px]">
                    {item?.name}
                  </p>
                </li>
              ))}
            </div>
          </ul>
        </aside>
      </div>

      {/* Main Content */}
      <main className="w-1 flex-grow">
        {/* Mobile Header */}
        <div className="mb-7 flex items-center justify-between rounded-[10px] bg-[#0A2A3C] px-3 py-2 sm:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger>
              <Menu className="h-6 w-6 text-white" />
            </SheetTrigger>
            <SheetContent
              position="left"
              size="sm"
              className="bg-[#0A2A3C] text-white"
            >
              <div className="h-full overflow-y-auto">
                <ul className="p-4">
                  <div
                    onClick={() => {
                      router.push(
                        currentUserType === "user" ? "/portal" : "/pro/portal",
                      );
                      setIsSheetOpen(false);
                    }}
                    className="mb-8 cursor-pointer rounded-[5px] p-[5px]"
                    style={{
                      backgroundColor:
                        currentUserType === "user" ? "#096C5794" : "#071F2D",
                    }}
                  >
                    <div className="flex items-center justify-center rounded-[5px] bg-[#0A2A3C] py-3">
                      <img
                        src={
                          currentUserType === "user"
                            ? "/assets/VLOO-logo.svg"
                            : "/assets/VLOOPro-logo.png"
                        }
                        alt="sidebar-logo"
                        className="h-[15px] w-[100px]"
                      />
                    </div>
                  </div>
                  <div className="mb-7">
                    {sidebarMenus?.map((item, index) => (
                      <li
                        onClick={() =>
                          handleNavigation(item.path, item.name === "Log out")
                        }
                        key={index}
                        className={`mb-4 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-colors last:mb-0 ${
                          currentUserType === "user"
                            ? "hover:bg-[#00A481]"
                            : "hover:bg-[#10688466]"
                        } ${
                          isMenuItemActive(item.path)
                            ? currentUserType === "user"
                              ? "bg-[#00A481]"
                              : "bg-[#10688466]"
                            : ""
                        }`}
                      >
                        <img
                          src={item?.icon}
                          alt={item?.name}
                          className="h-4 w-4"
                        />
                        <p className="text-[14px] font-[500] leading-[15px] text-[#F3F3F3]">
                          {item?.name}
                        </p>
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            </SheetContent>
          </Sheet>
          <p className="text-[16px] font-[600] leading-[22px] text-white">
            Welcome, Andreas Grostead
          </p>
          <img
            src="/assets/images/user.png"
            alt="user-image"
            className="h-6 w-6 rounded-full"
          />
        </div>
        {children}
      </main>
    </div>
  );
}
