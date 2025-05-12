"use client";

import FooterItemsData from "@/constants/FooterItemsData";
import FooterProItemsData from "@/constants/FooterProItemsData";
import useWebsiteSettingsList from "@/hooks/QueryHooks/Public/WebsiteSettings/useWebsiteSettingsList";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const year = new Date().getFullYear();
  const navbarData = pathname.startsWith("/pro")
    ? FooterProItemsData
    : FooterItemsData;

  const { data: WebsiteSettings } = useWebsiteSettingsList();

  return (
    <div className="bg-[#0A2A3C] px-0 py-0 text-white sm:px-[100px] sm:py-20">
      <div className="flex flex-col justify-between sm:flex-row">
        {/* Footer Info */}
        <div className="flex flex-col items-center py-10 sm:items-start sm:py-0">
          <a href="/">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={
                WebsiteSettings?.data?.[0]?.upload_files?.[0]?.file_url ||
                "/assets/VLOO-logo-2.png"
              }
              alt="vloo-logo"
              className="mb-3 h-[30px] w-[171px] sm:mb-[41.5px]"
            />
          </a>
          <p className="w-full text-center text-[14px] font-normal leading-[20px] text-white sm:w-[271px] sm:text-left md:text-[16px] md:leading-[22px]">
            Maximize Your Business Potential with Premium Office Space Rentals
          </p>
        </div>

        {/* Footer Menus */}
        <div className="flex flex-col gap-10 sm:flex-row sm:gap-[106px]">
          {navbarData.map((menu) => (
            <div key={menu.id}>
              <ul className="list-none text-center sm:text-left">
                <li>
                  <p className="mb-5 text-[16px] font-semibold leading-[22px] text-[#00A481] sm:mb-[26px]">
                    {menu.mainMenu}
                  </p>
                </li>
              </ul>
              <ul className="list-none text-center sm:text-left">
                {menu.subMenus.map((subMenu) => (
                  <li
                    key={subMenu.id}
                    className="mb-3 last:mb-0 sm:mb-[22px] sm:last:mb-0"
                  >
                    <motion.a
                      href={subMenu.link}
                      className="text-[16px] font-medium leading-[22px]"
                      style={{ color: "white" }}
                      whileHover={{ color: "#00A481" }}
                    >
                      {subMenu.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center justify-center gap-[20px] py-10 sm:py-0">
          {["instagram", "linkedin"]
            .filter(
              (social) =>
                WebsiteSettings?.data?.[0]?.[`${social}_link_show`] === "Yes",
            ) // Show only if "Yes"
            .map((social) => (
              <a
                key={social}
                href={WebsiteSettings?.data?.[0]?.[`${social}_link`]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={`/assets/icons/${social}-footer.svg`}
                  alt={`${social}-logo`}
                  className="h-[40px] w-[40px]"
                />
              </a>
            ))}
        </div>
      </div>

      <div className="mb-5 mt-5 border border-[#76AEFF] sm:mb-[44px] sm:mt-[72px]" />

      <p className="pb-5 text-center text-[12px] font-medium leading-[17px] text-[#CFD3D7] sm:pb-0 md:text-[14px] md:leading-[20px]">
        Copyright © Vloo {year}. All Rights Reserved. Org nr.{" "}
        {WebsiteSettings?.data?.[0]?.phone}
        <Link
          href="/privacy-policy"
          className="ml-1 text-white hover:underline"
        >
          Privacy policy
        </Link>
        <span className="mx-1">|</span>
        <Link
          href="/sustainability-policy"
          className="text-white hover:underline"
        >
          Sustainability policy
        </Link>
      </p>
    </div>
  );
}
