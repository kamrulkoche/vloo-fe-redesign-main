import React from "react";

export default function SubscribeUs() {
  return (
    <div className="mx-[31px] mb-4 flex flex-col items-center justify-center gap-[20px] rounded-[10px] border border-[#DEDEDE] bg-white px-[10px] py-[50px] sm:mb-8 md:flex-row md:gap-[197px] md:px-[70px]">
      <div className="w-[100%] lg:w-[600px]">
        <p className="mb-[35px] text-[45px] sm:text-[55px] font-bold leading-[40px] sm:leading-[80px] text-[#0A2A3C] md:text-[60px]">
          Subscribe to our <span className="text-[#00A481]">Newsletter!</span>
        </p>
        <p className="text-[24px] font-normal leading-[28.8px] text-[#868686]">
          Stay updated for more about Companies and Hosts
        </p>
      </div>
      <div className="ml-0 w-[100%] md:ml-4 md:w-[552px]">
        <p className="mb-[21px] text-[16px] font-semibold leading-[22px] text-[#0A2A3C]">
          Join our Newsletter
        </p>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Enter Your Email"
            className="w-full sm:w-[296px] rounded-bl-[10px] rounded-tl-[10px] border border-[#006988] bg-[#F3F3F3] p-4 placeholder-[#77808B] focus:outline-none focus:ring-0"
          />
          <button className="ml-[-2px] w-[159px] rounded-br-[10px] rounded-tr-[10px] border bg-[#006988] py-[19px] transition duration-200 hover:bg-[#0C4C60]">
            <p className="text-[14px] font-semibold leading-[20px] text-white">
              Subscribe
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
