import React from "react";

const PricingCard = ({
  bgColor,
  textColor,
  planName,
  price,
  features,
  buttonText,
  visibleFeaturesCount,
  buttonBg,
  isYearly,
}) => {
  const adjustedPrice = isYearly
    ? price !== "Free"
      ? `NOK ${parseFloat(price.split(" ")[1]) * 12}`
      : "Free"
    : price;

  return (
    <div
      className={`flex h-full w-[70%] flex-col justify-between rounded-lg p-6 shadow-lg md:w-[410px] ${bgColor} ${textColor}`}
    >
      <div>
        <div className="mb-4 flex justify-between text-[24px] font-[400] leading-[28.8px]">
          {planName}
          {planName !== "Basic" && (
            <>
              <p className="ml-[20px] mt-[5px] h-[18px] w-[130px] rounded-[5px] bg-[#1068844D] text-center text-[10px] font-[600] leading-[14px] text-[#1E2E3A] md:ml-[100px] md:mt-[5px] md:w-[81px]">
                7-day free trial
              </p>
              <p className="ml-[10px] mt-[5px] h-[18px] w-[151px] rounded-[5px] bg-[#00A481] text-center text-[10px] font-[600] leading-[14px] text-white md:ml-[0px] md:mt-[5px] md:w-[101px]">
                Save 90 NOK/Year
              </p>
            </>
          )}
        </div>

        <p className="mb-6 text-[32px] font-[500] leading-[44px]">
          {adjustedPrice}
          {adjustedPrice !== "Free" && (
            <span className="ml-2 text-[16px] font-[400] leading-[22px]">
              per {isYearly ? "year" : "month"}
              <span className="mt-1 block text-[10px] font-[400] leading-[11.85px]">
                + 5% transaction fee
              </span>
            </span>
          )}
        </p>

        <div className={`${adjustedPrice === "Free" ? "mt-[38px]" : ""}`}>
          <h4 className="mb-4 text-[13px] font-[500] text-[#1E2E3ACC]">
            Benefits:
          </h4>
          <ul className="mb-6 space-y-4 text-[13px] font-[500] leading-[18px]">
            {features.map((feature, index) => (
              <li
                key={index}
                className={`flex items-center ${
                  index >= visibleFeaturesCount
                    ? "text-[#868686] opacity-70"
                    : ""
                }`}
              >
                <img
                  src="/assets/icons/checkIcon.png"
                  alt="Check"
                  className="mr-2 h-[14px] w-[14px]"
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Button */}
      <button
        className={`rounded px-6 py-2 text-[16px] font-[600] text-white ${buttonBg} transition hover:opacity-90`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard ;