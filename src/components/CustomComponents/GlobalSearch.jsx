"use client";
import { encodeCityName } from "@/components/HelperFunctions/URLHelperFunction";
import CitiesData from "@/constants/CitiesData";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GlobalSearch() {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const [placeholderText, setPlaceholderText] = useState('Search');

  const handleCityNavigate = (city) => {
    if (!city) return;
    const encodedCity = encodeCityName(city);
    router.push(`/work-space/${encodedCity}`);
  };

  const handleInputFocus = () => setDropdownVisible(true);

  const handleInputBlur = () => {
    setTimeout(() => setDropdownVisible(false), 150); // Delay hiding dropdown
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const matchedCity = CitiesData.find(
        (city) => city.title.toLowerCase() === searchTerm.toLowerCase(),
      );
      if (matchedCity) handleCityNavigate(matchedCity.title);
    }
  };

  const filteredCities = CitiesData.filter((location) =>
    location.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPlaceholderText('Search a location');
      } else {
        setPlaceholderText('Search a location or an office environment');
      }
    };

    handleResize(); // Set initially
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <div className="relative mx-auto w-full ">
        <div className="flex justify-center w-full">
          <div className="relative w-full max-w-[38rem] text-center">
            <Search className="absolute left-8 sm:left-32 top-1/2 h-6 w-6 -translate-y-1/2 transform text-[#006988]" />
            <input
              type="text"
              placeholder={placeholderText}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-3xl border-2 border-[#0091B6] py-3 sm:pl-12 pr-4 font-medium text-[#868686] placeholder-[#868686] focus:outline-none focus:ring-1 focus:ring-[#00A481] sm:py-4 sm:text-base bg-[#E0F7FA] text-center"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
        </div>



        {/* Dropdown */}
        {isDropdownVisible && filteredCities.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 w-full max-w-[38rem] mx-auto shadow-lg rounded-3xl border-2 border-[#0091B6] py-3 bg-[#E0F7FA]">

            <div className="p-4">
              {/* <p className="mb-3 text-xs font-semibold leading-[18px] text-[#0A2A3C] sm:text-[13px]">
                Suggested
              </p> */}
              <ul className="space-y-2">
                {filteredCities.map((location) => (
                  <li
                    key={location.id}
                    className="group cursor-pointer"
                    onMouseDown={() => handleCityNavigate(location.title)}
                  >
                    <div className="flex items-center justify-center w-full h-full rounded-md p-1 transition-colors duration-150">
                      <span className="text-base font-medium text-[#868686] group-hover:text-[#0A2A3C] text-center">
                        {location.title}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
