"use client";

import useAllReviewShow from "@/hooks/QueryHooks/Public/useAllReviewShow";
import ReviewCard from "../Cards/ReviewCard";
import { DateFormatterType1Function } from "../HelperFunctions/DateFormatterFunctions";

const getRatingText = (rating) => {
  if (rating === 0) {
    return "No review found yet!"; // Return empty string if rating is 0
  } else if (rating >= 4) {
    return "Excellent";
  } else if (rating >= 3) {
    return "Good";
  } else if (rating >= 2) {
    return "Average";
  } else if (rating >= 1) {
    return "Below Average";
  } else {
    return "Poor";
  }
};

const ReviewComponent = ({ spaceId }) => {
  const { data } = useAllReviewShow(spaceId);

  return (
    <div className="bg-[#f3f3f3]">
      <div className="px-4 pt-[33px] sm:px-6 md:px-12 lg:px-[104px]">
        <p className="pb-[33px] text-[24px] font-[700] leading-[34px] text-[#0A2A3C]">
          Reviews
        </p>
        <div>
          {data?.data?.map((item) => (
            <ReviewCard
              key={item?.id}
              index={item?.id}
              status={getRatingText(item?.final_rate)}
              date={DateFormatterType1Function(item?.created_at)}
              rating={item?.final_rate}
              img={item?.customer_id?.upload_files?.[0]?.file_url}
              name={
                item?.customer_id?.first_name +
                " " +
                item?.customer_id?.last_name
              }
              title={item?.impression}
              description={item?.comment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
