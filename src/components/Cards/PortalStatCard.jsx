import { TrendingDown, TrendingUp } from "lucide-react";

const PortalStatCard = ({
  value,
  label,
  stat,
  buttonColor = "#DE4B3D",
  height = "h-[119px]", // Default height
  bgColor = "bg-[#006988]", // Default background color
}) => {
  const numericValue = Number(value);
  const dynamicButtonColor = numericValue < 0 ? "#DE4B3D" : buttonColor;

  const iconSrc =
    numericValue < 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />;

  return (
    <div
      className={`relative mb-4 flex w-full flex-col items-center justify-center rounded-[10px] ${bgColor} px-6 py-3 last:mb-0 sm:w-[252px] ${height}`}
    >
      {value && (
        <div className="mb-3 flex items-center justify-center sm:absolute sm:right-3 sm:top-3 sm:mb-0">
          <div
            className="flex h-[22px] w-[55px] items-center justify-center gap-1 rounded-[46px] px-1 text-[16px] font-[600] leading-[22px] text-[#0A2A3C]"
            style={{ backgroundColor: dynamicButtonColor }}
          >
            {value !== "0" && iconSrc}
            <p>{numericValue}%</p>
          </div>
        </div>
      )}
      <div className="mt-0 flex flex-col items-center sm:mt-5">
        <p className="mb-2 text-[16px] font-[500] leading-[22px] text-white">
          {label}
        </p>
        <p className="text-[24px] font-[700] leading-[34px] text-white">
          {stat}
        </p>
      </div>
    </div>
  );
};

export default PortalStatCard;
