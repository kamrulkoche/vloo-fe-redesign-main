import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import { getUserType } from "@/components/HelperFunctions/GetUserTypeFunction";

const MembershipPage = () => {
  const userType = getUserType();

  const textColor = userType === "user" ? "text-[#00A481]" : "text-[#006988]";

  return (
    <div>
      <PortalBackButton title="Membership" />

      <div
        className="h-full w-full rounded-[20px] bg-white px-3 py-3 sm:h-[361px] sm:w-[499px] sm:px-10 sm:py-4"
        style={{ boxShadow: "0px 4px 8px 0px #0000001A" }}
      >
        <p className={`text-[24px] font-[500] leading-[34px] ${textColor}`}>
          Current plan
        </p>
        <p className="mb-1 text-[24px] font-[500] leading-[34px] text-[#0A2A3C]">
          Basic
        </p>
        <p className="mb-6 text-[48px] font-[500] leading-[64px] text-[#0A2A3C] sm:mb-12">
          Free
        </p>

        <div>
          <div className="mb-5 flex items-center gap-5">
            <img
              src="/assets/icons/check-icon.svg"
              alt="check-icon"
              className="h-5 w-5"
            />
            <p className="text-[18px] font-[500] leading-[24px] text-[#0A2A3C]">
              Precise location based space
            </p>
          </div>
          <div className="mb-5 flex items-center gap-5">
            <img
              src="/assets/icons/check-icon.svg"
              alt="check-icon"
              className="h-5 w-5"
            />
            <p className="text-[18px] font-[500] leading-[24px] text-[#0A2A3C]">
              Space recommendations based
            </p>
          </div>
          <div className="flex items-center gap-5">
            <img
              src="/assets/icons/check-icon.svg"
              alt="check-icon"
              className="h-5 w-5"
            />
            <p className="text-[18px] font-[500] leading-[24px] text-[#0A2A3C]">
              View booking history
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
