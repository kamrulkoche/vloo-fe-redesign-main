"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import RenderStars from "@/components/CustomComponents/RenderStars";
import LoadingComponent from "@/components/LoadingComponent";
import useFavouriteList from "@/hooks/QueryHooks/User/useFavouriteList";
import useFavouriteMutate from "@/hooks/QueryHooks/User/useFavouriteMutate";
import { Heart } from "lucide-react";

const FavoritesPage = () => {
  const { data, isPending } = useFavouriteList();
  const { mutate, isPending: FavouritePending } = useFavouriteMutate();

  const handleFavoriteToggle = (spaceId, currentStatus) => {
    const newStatus = currentStatus === "Dislike" ? "Like" : "Dislike";
    mutate({
      space_id: spaceId,
      favorite_status: newStatus,
    });
  };

  return (
    <>
      {isPending || FavouritePending ? (
        <LoadingComponent />
      ) : (
        <div>
          <PortalBackButton title="Favorites" />

          <div className="rounded-[20px] bg-[#0A2A3C] p-4 sm:p-6">
            {data?.data?.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {data?.data?.map((item) => (
                  <div key={item.id} className="rounded-[20px] bg-[#0A2A3C]">
                    <div className="w-full rounded-[10px] bg-white p-2">
                      {item?.space_id?.upload_files?.[0]?.file_url?.endsWith(
                        ".mp4",
                      ) ? (
                        <video
                          src={item?.space_id?.upload_files?.[0]?.file_url}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="mb-5 h-[229px] w-full rounded-[10px] object-cover"
                        />
                      ) : (
                        <img
                          src={item?.space_id?.upload_files?.[0]?.file_url}
                          alt={item?.space_id?.space_name}
                          className="mb-5 h-[229px] w-full rounded-[10px] object-cover"
                        />
                      )}

                      <div className="m-3 flex items-start justify-between">
                        <div>
                          <p className="mb-3 text-[16px] font-[700] leading-[24px] text-[#0A2A3C] sm:text-[18px]">
                            {item?.space_id?.space_name}
                          </p>

                          <div className="flex flex-col items-center gap-3 sm:flex-row">
                            <div className="flex h-[23px] items-center justify-center rounded-[29px] bg-[#006988] px-2">
                              <p className="text-[14px] font-medium text-white">
                                {item?.space_id?.location}
                              </p>
                            </div>
                            <p className="text-[12px] font-medium leading-[20px] text-[#13293ACC] sm:text-[14px]">
                              {item?.space_id?.company_name}
                            </p>
                            <div className="flex">
                              <RenderStars rating={item?.space_id?.rating} />
                            </div>
                          </div>
                        </div>
                        <Heart
                          className={`h-[20px] w-[22.67px] cursor-pointer ${
                            item.favorite_status === "Like"
                              ? "text-[#FF0000]"
                              : "text-[#00A481]"
                          }`}
                          fill={
                            item.favorite_status === "Like"
                              ? "currentColor"
                              : "none"
                          }
                          onClick={() =>
                            handleFavoriteToggle(
                              item.space_id.id,
                              item.favorite_status,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-white">No data found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FavoritesPage;
