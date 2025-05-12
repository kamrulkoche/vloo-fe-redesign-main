"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import MainMenuItemsData from "@/constants/MainMenuItemsData";
import VLOOProMenuItemsData from "@/constants/VLOOProMenuItemsData";
import useWebsiteSettingsList from "@/hooks/QueryHooks/Public/WebsiteSettings/useWebsiteSettingsList";
import { useModalStore } from "@/store/zStore";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import JoinModal from "../Dialogs/JoinModal";
import {
  getUserData,
  getUserType,
} from "../HelperFunctions/GetUserTypeFunction";
// import handleLogout from "../HelperFunctions/HandleLogoutFunction";
import LoadingComponent from "../LoadingComponent";
import MenuItems from "./MenuItems";
import { useAuth } from "@/contexts/AuthContext";

// Animation variants moved outside component to prevent recreation on each render
const ANIMATION_VARIANTS = {
  header1: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  header2: {
    sticky: {
      backgroundColor: "#ffffff",
      // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      scale: 1.02,
    },
  },
  dropdown: {
    hidden: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.2 },
    },
  },
};

const ProfileButton = ({
  userData,
  profileButtonText,
  profileButtonBG,
  dropdownIcon,
  openDropdown,
  setOpenDropdown,
}) => (
  <div
    onClick={() =>
      setOpenDropdown((prev) => (prev === "profile" ? null : "profile"))
    }
    className={`flex cursor-pointer items-center justify-between rounded-[25px] ${profileButtonBG} border border-[#0A2A3C] py-[6px] pl-[7px] pr-4 transition-all duration-150`}
  >
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 text-[#0A2A3C]">
      {userData?.upload_files?.[0]?.file_url ? (
        <img
          src={userData?.upload_files?.[0]?.file_url}
          alt="user"
          className="h-9 w-9 rounded-full"
        />
      ) : (
        userData?.first_name?.charAt(0)?.toUpperCase() || "?"
      )}
    </div>
    <p
      className={`pl-2 pr-4 text-[14px] font-[500] leading-[20px] ${profileButtonText}`}
    >
      {`${userData?.first_name || ""} ${userData?.last_name || ""}`}
    </p>
    <img
      src={dropdownIcon}
      alt="dropdown"
      className={`transform transition-transform duration-200 ${openDropdown === "profile" ? "rotate-180" : "rotate-0"
        }`}
    />
  </div>
);

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { userType, userData, isAuthenticated, handleLogout, accessToken } =
    useAuth();
  // const userType = getUserType();
  // const userData = getUserData();
  // console.log({ userType });
  // console.log({ accessToken });
  // console.log({ userData });
  const profileRef = useRef(null);
  const { isModalOpen, toggleModal } = useModalStore();

  const { data: WebsiteSettings } = useWebsiteSettingsList();

  const [isMounted, setIsMounted] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Memoized values
  const navbarData = useMemo(
    () =>
      pathname.startsWith("/pro") ? VLOOProMenuItemsData : MainMenuItemsData,
    [pathname],
  );

  const bgColor = useMemo(
    () => (pathname.startsWith("/pro") ? "bg-[#00A481]" : "bg-[#0A2A3C]"),
    [pathname],
  );

  const profileButtonText = useMemo(
    () => (pathname.startsWith("/pro") ? "text-white" : "text-[#0A2A3C]"),
    [pathname],
  );

  const profileButtonBG = useMemo(
    () => (pathname.startsWith("/pro") ? "bg-[#00A481]" : "bg-[#83E5EF]"),
    [pathname],
  );

  const dropdownIcon = useMemo(
    () =>
      pathname.startsWith("/pro")
        ? "/assets/icons/user-down-white-icon.svg"
        : "/assets/icons/user-down-black-icon.svg",
    [pathname],
  );

  const isShowFooter = useMemo(
    () => pathname.includes("/portal" || "/pro/portal"),
    [pathname],
  );

  const profileItems = useMemo(
    () => [
      {
        label: "Account",
        link: userType === "user" ? "/portal/account" : "/pro/portal/account",
      },
      {
        label: "Portal",
        link: userType === "user" ? "/portal" : "/pro/portal",
      },
      { label: "Logout", link: "/" },
    ],
    [userType],
  );

  // Handlers
  const handleScroll = useCallback(() => {
    if (window.scrollY > 80) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setOpenDropdown(null);
    }
  }, []);

  const handleNavigation = useCallback(
    (path, isLogout) => {
      if (isLogout) {
        handleLogout();
      } else {
        router.push(path);
      }
    },
    [router],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMounted, handleScroll, handleClickOutside]);

  if (!isMounted) return <LoadingComponent />;

  return (
    <div className="relative">
      {/* Top Bar */}
      {!isShowFooter && userType !== "user" && userType !== "host" && (
        <motion.div
          className={`flex h-[43px] items-center justify-between ${bgColor} px-4 lg:px-16`}
          initial="visible"
          animate={isSticky ? "hidden" : "visible"}
          variants={ANIMATION_VARIANTS.header1}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {pathname.startsWith("/pro") ? (
            <p
              onClick={() => router.push("/")}
              className="cursor-pointer text-sm font-medium leading-[22px] text-white lg:text-[15px]"
            >
              Looking for a VLOO office{" "}
              <span className="text-[#0A2A3C]">space?</span>
            </p>
          ) : (
            <p
              onClick={() => router.push("/pro")}
              className="cursor-pointer text-sm font-semibold leading-[22px] text-white lg:text-[16px]"
            >
              Are you a Host? Go to VLOO{" "}
              <span className="text-[#00A481]">pro</span>
            </p>
          )}

          <button
            onClick={toggleModal}
            className="cursor-pointer text-[18px] font-medium leading-[24px] text-white"
          >
            Sign in
          </button>
        </motion.div>
      )}

      {/* Main Header */}
      <motion.div
        className={`flex h-16 items-center justify-between bg-white px-4 lg:h-[71px] lg:px-16 border border-1  ${isSticky && !isShowFooter ? "fixed left-0 top-0 z-10 w-full" : ""
          }`}
        initial="normal"
        animate={isSticky && !isShowFooter ? "sticky" : "normal"}
        variants={!isShowFooter ? ANIMATION_VARIANTS.header2 : null}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.a
          href={pathname.startsWith("/pro") ? "/pro" : "/"}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src="/assets/VLOO-logo.png"
            alt="vloo-logo"
            className="h-[17px] w-[95px]  "
          />
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-4 lg:flex">
          <MenuItems />

          {["instagram", "linkedin"]
            .filter(
              (social) =>
                WebsiteSettings?.data?.[0]?.[`${social}_link_show`] === "Yes",
            )
            .map((social) => (
              <a
                key={social}
                href={WebsiteSettings?.data?.[0]?.[`${social}_link`]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={`/assets/icons/${social}.svg`}
                  alt={`${social}-icon`}
                  className="h-[30px] w-[30px]"
                /> */}
              </a>
            ))}

          {userType === "user" || userType === "host" ? (
            <div className="relative" ref={profileRef}>
              <ProfileButton
                userData={userData}
                profileButtonText={profileButtonText}
                profileButtonBG={profileButtonBG}
                dropdownIcon={dropdownIcon}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
              <div
                className={`absolute right-0 z-10 mt-2 w-[197px] overflow-hidden rounded-[10px] bg-white p-2 transition-all duration-500 ease-in-out ${openDropdown === "profile"
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
                  }`}
                style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
              >
                {profileItems.map((item, index) => (
                  <div key={index}>
                    <button
                      className="block w-full rounded-md px-3 py-2 text-left text-[14px] font-[500] leading-[20px] text-[#0A2A3C] transition-all hover:bg-gray-100"
                      onClick={() => {
                        setOpenDropdown(null);
                        handleNavigation(item.link, item.label === "Logout");
                      }}
                    >
                      {item.label}
                    </button>
                    {index < profileItems.length - 1 && (
                      <div className="mx-2 border-t border-[#DEDEDE]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <motion.button
              whileHover={{
                backgroundColor: "#115B72",
                color: "white",
                scale: 1.02,
              }}
              transition={{ duration: 0.2 }}
              className="ml-1 rounded-md border border-[#006988] px-16 py-2.5 text-[16px] font-medium leading-[22px] text-[#071A2B]"
              onClick={() =>
                router.push(
                  pathname.startsWith("/pro")
                    ? "/host-sign-up"
                    : "/user-sign-up",
                )
              }
            >
              Join
            </motion.button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-[#0A2A3C] lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] overflow-y-auto bg-[#032031] p-0 pt-8"
          >
            <div className="flex flex-col space-y-2 p-6">
              {navbarData.map((item, index) => (
                <div key={index} className="w-full">
                  {item.hasDropdown ? (
                    <div className="w-full">
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === index ? null : index)
                        }
                        className="flex w-full items-center justify-between rounded-md p-2 text-white hover:bg-[#0A2A3C]/50"
                      >
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                        {openDropdown === index ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                      <AnimatePresence>
                        {openDropdown === index && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={ANIMATION_VARIANTS.dropdown}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 space-y-2 pt-2">
                              {item.dropdownItems.map((dropItem, dropIndex) => (
                                <SheetClose asChild key={dropIndex}>
                                  <Link
                                    href={dropItem.link}
                                    className="flex flex-col rounded-md p-2 text-white hover:bg-[#0A2A3C]/50"
                                  >
                                    <span className="text-sm font-medium">
                                      {dropItem.label}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      {dropItem.subtext}
                                    </span>
                                  </Link>
                                </SheetClose>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        href={item.link}
                        className="flex w-full items-center rounded-md p-2 text-white hover:bg-[#0A2A3C]/50"
                      >
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </Link>
                    </SheetClose>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <SheetClose asChild>
                  <button
                    onClick={toggleModal}
                    className="w-full rounded-md bg-white border border-[#006988] px-4 py-2 text-sm font-medium text-#071A2B hover:bg-[#115B72]"
                  >
                    Join
                  </button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>

      {isModalOpen && <JoinModal isOpen={isModalOpen} onClose={toggleModal} />}
    </div>
  );
}
