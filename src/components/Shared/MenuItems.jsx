"use client";
import MainMenuItemsData from "@/constants/MainMenuItemsData";
import VLOOProMenuItemsData from "@/constants/VLOOProMenuItemsData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function MenuItems() {
  const [activeMenu, setActiveMenu] = useState(null);
  const dropdownRefs = useRef([]);
  const pathname = usePathname();

  const navbarData = pathname.startsWith("/pro")
    ? VLOOProMenuItemsData
    : MainMenuItemsData;

  const handleMenuClick = (index, event) => {
    event.preventDefault(); // Prevent navigation when clicking the dropdown
    setActiveMenu(activeMenu === index ? null : index);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.current &&
        !dropdownRefs.current.some((ref) => ref && ref.contains(event.target))
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmenuClick = () => {
    setActiveMenu(null);
  };

  return (
    <div className="mr-12 flex items-center gap-12">
      {navbarData.map((item, index) => (
        <div
          key={index}
          className={`relative cursor-pointer text-[18px] font-medium leading-[22px] text-[#071A2B] ${
            activeMenu === index ? "text-[#00A481]" : ""
          }`}
          ref={(el) => (dropdownRefs.current[index] = el)}
        >
          <div
            className={`flex items-center gap-2 transition-all duration-150 ${
              item.hasDropdown
                ? ""
                : "border-b-2 border-transparent hover:border-[#00A481] hover:text-[#00A481]"
            }`}
            onClick={(event) =>
              item.hasDropdown && handleMenuClick(index, event)
            }
          >
            {item.hasDropdown ? (
              <p className="text-[16px] font-semibold leading-[22px] text-[#0A2A3C] transition-all">
                {item.label}
              </p>
            ) : (
              <Link href={item.link} passHref>
                <p className="text-[16px] font-semibold leading-[22px] text-[#0A2A3C] transition-all">
                  {item.label}
                </p>
              </Link>
            )}
            {item.hasDropdown &&
              (activeMenu === index ? (
                <FiChevronUp className="w-4" />
              ) : (
                <FiChevronDown className="w-4" />
              ))}
          </div>

          {/* Dropdown Menu */}
          {item.hasDropdown && (
            <div
              className={`absolute left-0 z-10 mt-2 w-[180px] overflow-hidden p-2 transition-all duration-500 ease-in-out ${
                activeMenu === index
                  ? "max-h-50 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
              style={{
                borderRadius: "10px",
                backgroundColor: "white",
                boxShadow: "0px 0px 25px 0px #00000026",
              }}
            >
              {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                <div
                  key={dropdownIndex}
                  className="group rounded-[10px] px-2 py-2 hover:bg-[#f3f3f3]"
                  onClick={handleSubmenuClick}
                >
                  <Link href={dropdownItem.link} passHref>
                    <div>
                      <p className="text-[16px] font-semibold leading-[22px] text-[#0A2A3C] group-hover:text-[#00A481] group-hover:underline">
                        {dropdownItem.label}
                      </p>
                      <p className="text-[14px] font-medium leading-[22px] text-[#767676] group-hover:text-[#00A481]">
                        {dropdownItem.subtext}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
