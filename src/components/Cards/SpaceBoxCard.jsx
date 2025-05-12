"use client";

import CommonButton from "@/components/CustomComponents/CommonButton";
import useFavouriteMutate from "@/hooks/QueryHooks/User/useFavouriteMutate";
import { useModalStore } from "@/store/zStore";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import JoinModal from "../Dialogs/JoinModal";
import RenderStars from "../CustomComponents/RenderStars";
import { isAuthenticated } from "../HelperFunctions/GetUserTypeFunction";
import { usePathname } from "next/navigation";

export default function SpaceBoxCard({
  id,
  name,
  company_name,
  rating,
  img,
  favouriteStatus,
  location,
  onClick,
}) {
  const currentRoute = usePathname() || "/";

  const isLoggedIn = isAuthenticated();

  const [isFavorite, setIsFavorite] = useState(false);

  // Update isFavorite when favouriteStatus changes
  useEffect(() => {
    if (favouriteStatus === undefined || favouriteStatus === null) {
      setIsFavorite(false);
    } else {
      setIsFavorite(favouriteStatus === "Like");
    }
  }, [favouriteStatus]);

  const { isModalOpen, toggleModal } = useModalStore();

  const { mutate } = useFavouriteMutate();

  const toggleFavorite = () => {
    if (isLoggedIn) {
      const newStatus = favouriteStatus === "Like" ? "Dislike" : "Like";

      mutate({
        space_id: id,
        favorite_status: newStatus,
      });

      setIsFavorite(!isFavorite);
    } else {
      toggleModal();
    }
  };

  return (
    <div
      style={{ boxShadow: "0px 4px 24px 0px #10688426" }}
      className="w-full rounded-[10px] p-2"
    >
      <div className="relative h-[229px] overflow-hidden rounded-[10px]">
        {img?.endsWith(".mp4") ? (
          <video
            src={img}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={img}
            alt={name}
            priority
            quality={75}
            fill
            className="rounded-[10px] object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      <div className="px-0 pb-[22px] pt-5 sm:px-8">
        <div className="flex items-center justify-between pb-7">
          <p className="text-xl font-bold text-[#0A2A3C] sm:text-2xl">{name}</p>
          <Heart
            className={`h-[20px] w-[22.67px] cursor-pointer ${
              isFavorite ? "text-[#FF0000]" : "text-[#00A481]"
            }`}
            fill={isFavorite ? "currentColor" : "none"}
            onClick={toggleFavorite}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col justify-center gap-[10px]">
            <div className="flex flex-col items-center gap-[10px] sm:flex-row">
              <p className="text-[14px] font-medium leading-[20px] text-[#13293ACC]">
                {company_name}
              </p>
              <div className="flex">
                <RenderStars rating={String(rating)} />
              </div>
            </div>
            <div className="max-w-[250px] rounded-[29px] bg-[#006988] py-1">
              <p className="mx-2 text-center text-[14px] font-medium leading-[20px] text-white">
                {location}
              </p>
            </div>
          </div>
          <div>
            <CommonButton name={"View"} onClick={onClick} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <JoinModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          currentRoute={currentRoute}
        />
      )}
    </div>
  );
}
