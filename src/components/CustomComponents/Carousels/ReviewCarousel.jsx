"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const ReviewCarousel = ({ reviews }) => {
  const maxReviewLength = 40;

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      breakpoints={{
        640: {
          slidesPerView: 1, // Only 1 slide visible
          spaceBetween: 0, // No space between slides
        },
        641: {
          slidesPerView: 1.2,
          spaceBetween: -82,
        },
      }}
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {reviews.map((review) => {
        // Truncate the comment if it exceeds the max length
        const truncatedComment =
          review.comment.length > maxReviewLength
            ? review.comment.slice(0, maxReviewLength) + "..."
            : review.comment;

        // Get the profile picture URL (if available)
        const profilePic = review?.customer_id?.upload_files?.[0]?.file_url;

        return (
          <SwiperSlide
            key={review.id}
            className={reviews.length > 1 ? "carousel-item" : ""}
          >
            <div className="flex items-center gap-4">
              <div className="carousel-content w-full sm:w-[312px]">
                {/* Display the truncated comment */}
                <p className="mb-3 text-[16px] font-semibold leading-[22px] text-[#13293ACC]">
                  {truncatedComment}
                </p>
                {/* Display the reviewer's name and profile picture */}
                <div className="flex w-36 items-center gap-5 rounded-[25px] bg-[#00A481] p-[6px]">
                  {profilePic && (
                    <Image
                      src={profilePic}
                      alt={`${review.customer_id.first_name} ${review.customer_id.last_name}`}
                      width={26}
                      height={26}
                      className="rounded-full"
                    />
                  )}
                  <p className="text-[14px] font-medium leading-[20px] text-white">
                    {`${review.customer_id.first_name} ${review.customer_id.last_name}`}
                  </p>
                </div>
              </div>
              {reviews.length > 2 && (
                <div className="h-14 border-l border-[#00000033]" />
              )}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ReviewCarousel;
