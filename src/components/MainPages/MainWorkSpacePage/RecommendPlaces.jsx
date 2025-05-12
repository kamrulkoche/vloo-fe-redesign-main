"use client";

import SpaceBoxCard from "@/components/Cards/SpaceBoxCard";
import { getUserType } from "@/components/HelperFunctions/GetUserTypeFunction";
import useSpaceList from "@/hooks/QueryHooks/Public/Space/useSpaceList";
import { useRouter } from "next/navigation";

export default function RecommendPlaces() {
  const router = useRouter();
  const userType = getUserType();

  const { data } = useSpaceList(userType);

  return (
    <div className="mx-2 mb-12 mt-11 sm:mx-12 lg:mx-28">
      <p className="mb-8 text-xl font-bold text-[#0A2A3C] sm:text-2xl">
        Recommend Places
      </p>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {data?.data?.map((item) => (
          <SpaceBoxCard
            key={item?.id}
            id={item?.id}
            name={item?.space_name}
            company_name={item?.company_name}
            favouriteStatus={item?.favorite_status}
            rating={item?.rating || "0"}
            img={
              item?.upload_files?.[0]?.file_url ||
              "/assets/images/default-image.jpg"
            }
            location={item?.location}
            onClick={() => router.push(`/work-space/space/${item?.uuid}`)}
          />
        ))}
      </div>
    </div>
  );
}
