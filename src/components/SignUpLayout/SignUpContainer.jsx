"use client";

import BackToVlooButton from "@/components/CustomComponents/BackToVlooButton";
import { signIn } from "next-auth/react";
import Image from "next/image";
import SignUpSpecialProofCarousel from "../CustomComponents/Carousels/SignUpSpecialProofCarousel";
import SignUpForm from "../CustomForms/SignUpForm";
import { useState } from "react";

export default function SignUpContainer({ source, socialProofData = [] }) {
  const bgColor = source === "User" ? "bg-[#00A481]" : "bg-[#0A2A3C]";
  const textColor = source === "User" ? "text-[#0A2A3C]" : "text-[#00A481]";
  const buttonBgColor = source === "User" ? "#006988" : "#00A481";
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSocialLogin = async (provider) => {
    let setIsLoading;
    if (provider === "linkedin") {
      setIsLoading = setIsLinkedInLoading;
    } else {
      setIsLoading = setIsGoogleLoading;
    }

    setIsLoading(true);

    try {
      // Sign in with the provider
      const result = await signIn(provider, {
        callbackUrl: "/login-processing",
      });

      if (result?.error) {
        toast.error(
          `${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed`,
        );
        return;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      {/* Left Section */}
      <div className={`w-full sm:w-1/2 ${bgColor}`}>
        <div className="pl-[22px] pt-[20px]">
          <BackToVlooButton source={source} bgColor={`${buttonBgColor}`} />
        </div>
        <div className="px-5 pt-7 sm:pl-[96px] sm:pt-[80px]">
          <p className="text-center text-[24px] font-[700] leading-[34px] text-white sm:text-left">
            Hear what other <span className={`${textColor}`}>{source}</span> are
            saying
          </p>
          <div className="px-5 pt-5 sm:pl-[50px] sm:pt-[51px]">
            <SignUpSpecialProofCarousel data={socialProofData} />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full bg-white sm:w-1/2">
        <div className="flex flex-col items-center justify-center pb-5 pt-5 sm:pb-[59px] sm:pt-[33px]">
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
          <div className="mb-[30px] flex items-center justify-between">
            <button
              className="flex h-[52px] w-[231px] items-center justify-center gap-2 rounded-[8px] border border-[#447483]"
              onClick={() => handleSocialLogin("google")}
              disabled={isGoogleLoading}
            >
              <Image
                src={"/assets/icons/google-icon.svg"}
                alt="google-icon"
                width={20}
                height={20}
              />
              <p className="text-[12px] font-[500] leading-[17px] text-[#0A2A3C]">
                {isGoogleLoading ? "Signing In..." : "Sign up With Google"}
              </p>
            </button>
            <button
              onClick={() => handleSocialLogin("linkedin")}
              disabled={isLinkedInLoading}
              className="flex h-[52px] w-[231px] items-center justify-center gap-2 rounded-[8px] bg-[#447483]"
            >
              <Image
                src={"/assets/icons/linkedin-icon.svg"}
                alt="linkedin-icon"
                width={20}
                height={20}
              />
              <p className="text-[12px] font-[500] leading-[17px] text-white">
                {isLinkedInLoading ? "Signing In..." : "Sign up With LinkedIn"}
              </p>
            </button>
          </div>
          <p className="mb-[25px] text-center text-[20px] font-[700] leading-[28px] text-[#868686]">
            Or
          </p>
          <div>
            <SignUpForm type={source} />
          </div>
        </div>
      </div>
    </div>
  );
}
