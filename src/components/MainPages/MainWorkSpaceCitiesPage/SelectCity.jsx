"use client";

import { getUserType } from "@/components/HelperFunctions/GetUserTypeFunction";
import { encodeCityName } from "@/components/HelperFunctions/URLHelperFunction";
import LoadingComponent from "@/components/LoadingComponent";
import useCityList from "@/hooks/QueryHooks/Common/useCityList";
import { useRouter } from "next/navigation";

export default function SelectCity({ currentCity }) {
  const router = useRouter();

  const userType = getUserType();

  const { data, isPending } = useCityList(userType);

  const handleCityClick = (city) => {
    const encodedCity = encodeCityName(city);
    router.push(`/work-space/${encodedCity}`);
  };

  const colorClasses = [
    "bg-[#72A1B6] hover:bg-[#5D8A99]",
    "bg-[#457484] hover:bg-[#365F6A]",
    "bg-[#115B72] hover:bg-[#094A56]",
    "bg-[#0A2A3C] hover:bg-[#06202A]",
  ];

  const borderClasses = [
    "border-2 border-[#5D8A99]",
    "border-2 border-[#365F6A]",
    "border-2 border-[#094A56]",
    "border-2 border-[#06202A]",
  ];

  const decodeCityName = (encodedCity) => {
    return decodeURIComponent(encodedCity);
  };

  return (
    <>
      {isPending ? (
        <LoadingComponent />
      ) : (
        <div className="mx-2 mt-4 sm:mx-28 sm:mt-11">
          <p className="mb-2 text-2xl font-bold text-[#0A2A3C]">
            {decodeCityName(currentCity)}
          </p>
          <p className="mb-5 text-xl font-normal text-[#0A2A3C]">
            We are now in these cities
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            {data?.data?.map((item, index) => (
              <div
                key={item.city_name}
                className={`w-full cursor-pointer rounded-[5px] py-3 text-center transition-colors duration-300 ${colorClasses[index]} sm:w-[133px] ${item.city_name === decodeCityName(currentCity) ? borderClasses[index] : ""}`}
                onClick={() => handleCityClick(item.city_name)}
              >
                <p className="text-[14px] font-semibold leading-[20px] text-white">
                  {item.city_name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
