import { TrendingDown, TrendingUp } from "lucide-react";

const SpaceStats = ({ spaceData }) => {
  const stats = [
    {
      value: spaceData.Visitors_Rate || 0,
      label: "Visitors",
      subtitle: "Total clicks (weekly)",
      stat: spaceData.Visitors || 0,
    },
    {
      value: spaceData.visits_Rate || 0,
      label: "Visits",
      subtitle: "Last 3 months",
      stat: spaceData.Visits || 0,
    },
    {
      value: spaceData.Favorites_Rate || 0,
      label: "Favorites",
      subtitle: "Weekly conversion",
      stat: spaceData.Favorites || 0,
    },
    {
      value: spaceData.Bookings_Rate || 0,
      label: "Bookings",
      subtitle: "Weekly bookings",
      stat: spaceData.Bookings || 0,
    },
    {
      value: spaceData.Earning_Rate || 0,
      label: "Price",
      subtitle: "Space pricing per day",
      stat: `${spaceData.Earning || 0} NOK`,
    },

    {
      value: spaceData.Price_Rate || 0,
      label: "Earning",
      subtitle: "Space pricing per day",
      stat: `${spaceData.Price || 0} NOK`,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-x-3 gap-y-7 sm:w-1/2 sm:grid-cols-2">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="w-full rounded-[10px] border border-[#DEDEDE] bg-[#006988] p-4"
        >
          <div className="mb-8 flex items-start justify-between">
            <div>
              <p className="text-[14px] font-[500] leading-[22px] text-white sm:text-[16px]">
                {stat.label}
              </p>
              <p className="text-[10px] font-[500] leading-[17px] text-[#DEDEDE] sm:text-[12px]">
                {stat.subtitle}
              </p>
            </div>

            <button className="flex h-[24px] w-[60px] items-center justify-center gap-2 rounded-[46px] bg-[#F3F3F3] text-[10px] font-[500] leading-[17px] text-[#0A2A3C] sm:text-[12px]">
              {stat.value >= 0 ? (
                <TrendingUp className="text-[#00A481]" size={12} />
              ) : (
                <TrendingDown className="text-[#CF563F]" size={12} />
              )}
              <p>{stat.value}%</p>
            </button>
          </div>
          <div>
            <p className="text-[20px] font-[700] leading-[34px] text-white sm:text-[24px]">
              {stat.stat}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpaceStats;
