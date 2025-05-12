"use client";

import SpaceBoxCard from "@/components/Cards/SpaceBoxCard";
import { useRouter } from "next/navigation";

export default function WeRecommend({ data }) {
  const router = useRouter();

  return (
    <div className="bg-white px-5 pt-5 sm:px-[105px] sm:py-14">
      <p className="mb-5 text-2xl font-bold text-[#000000]">We Recommend</p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {data?.recommend_space?.map((item) => (
          <SpaceBoxCard
            key={item?.id}
            id={item?.id}
            name={item?.space_name}
            rating={item?.rating}
            favouriteStatus={item?.favorite_status}
            img={item?.upload_files?.[0]?.file_url}
            location={item?.location}
            onClick={() => router.push(`/work-space/space/${item?.uuid}`)}
          />
        ))}
      </div>
    </div>
  );
}
