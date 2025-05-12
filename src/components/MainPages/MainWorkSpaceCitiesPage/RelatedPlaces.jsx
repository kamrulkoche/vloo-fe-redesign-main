"use client";

import SpaceBoxCard from "@/components/Cards/SpaceBoxCard";
import GoogleMap from "@/components/GoogleMap";
import { getUserType } from "@/components/HelperFunctions/GetUserTypeFunction";
import useCitySpaceShow from "@/hooks/QueryHooks/Common/useCitySpaceShow";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RelatedPlaces({ currentCity }) {
  const router = useRouter();
  const userType = getUserType();

  const { data, isPending } = useCitySpaceShow(userType, currentCity);

  const spaces = data?.data || [];

  const [currentPage, setCurrentPage] = useState(1);
  const spacesPerPage = 5;
  const totalSpaces = spaces.length;
  const totalPages = Math.ceil(totalSpaces / spacesPerPage);

  const startIndex = (currentPage - 1) * spacesPerPage;
  const endIndex = startIndex + spacesPerPage;
  const currentSpaces = spaces.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mx-2 mt-4 sm:mx-28 sm:mt-8">
      <p className="mb-3 text-2xl font-bold text-[#0A2A3C]">
        Over {totalSpaces} places within map area
      </p>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="scrollbar-none flex w-full flex-col gap-4 bg-transparent sm:max-h-[897px] sm:gap-[30px] sm:overflow-y-auto">
          {isPending ? (
            <div>Loading spaces...</div>
          ) : (
            currentSpaces.map((item) => (
              <SpaceBoxCard
                key={item?.id}
                name={item?.space_name}
                rating={item?.rating}
                img={item?.upload_files?.[0]?.file_url}
                location={item?.location}
                onClick={() => router.push(`/work-space/space/${item?.uuid}`)}
              />
            ))
          )}
        </div>
        <div className="h-[897px] w-full">
          <GoogleMap
            locations={spaces.map((space) => space.location)}
            height="100%"
          />
        </div>
      </div>

      {/* Pagination */}
      {!isPending && totalSpaces > 0 && (
        <div className="mb-16 flex items-center gap-2 sm:mb-32">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-[10px] border"
            >
              &lt;
            </button>
          )}

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${
                currentPage === index + 1
                  ? "bg-[#2C2C2C] text-white"
                  : "border text-[#2C2C2C]"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-[10px] border"
            >
              &gt;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
