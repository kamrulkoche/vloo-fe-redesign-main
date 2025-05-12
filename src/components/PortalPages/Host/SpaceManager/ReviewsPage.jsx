"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import { DateFormatterType1Function } from "@/components/HelperFunctions/DateFormatterFunctions";
import useReviewList from "@/hooks/QueryHooks/Host/SpaceManager/Review/useReviewList";
import useReviewStatusUpdate from "@/hooks/QueryHooks/Host/SpaceManager/Review/useReviewStatusUpdate";
import { Eye, EyeClosed } from "lucide-react";

const ReviewsPage = () => {
  const { data } = useReviewList();
  const { mutate } = useReviewStatusUpdate();

  const handleStatusUpdate = (uuid, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    mutate({
      uuid: uuid,
      status: newStatus,
    });
  };

  return (
    <div>
      <PortalBackButton title="Reviews" />

      <div className="w-full rounded-[10px] bg-[#0A2A3C] px-4 py-5 sm:px-6">
        {data?.data?.length > 0 ? (
          data?.data?.map((item) => (
            <div
              key={item?.id}
              className="mb-4 flex flex-col items-center justify-center gap-6 rounded-[10px] bg-[#0F5B76] px-4 py-5 last:mb-0 sm:flex-row sm:gap-10 sm:px-6 lg:gap-16"
            >
              <div className="flex flex-col items-center justify-center">
                <p className="mb-1 text-[20px] font-[700] leading-[30px] text-[#00A481] sm:text-[24px] sm:leading-[34px]">
                  {item?.final_rate || ""}
                </p>
                <p className="mb-2 text-[12px] font-[500] leading-[17px] text-[#DEDEDE]">
                  {DateFormatterType1Function(item?.created_at)}
                </p>
                <div className="flex h-[36px] w-full max-w-[146px] items-center rounded-[25px] bg-[#006988] sm:w-[146px]">
                  <img
                    src={
                      item?.customer_id?.upload_files?.[0]?.file_url ||
                      "/assets/images/default-image.jpg"
                    }
                    alt="user-image"
                    className="mx-2 h-[26px] w-[26px] rounded-full"
                  />
                  <p className="pl-3 text-[14px] font-[500] leading-[20px] text-white">
                    {item?.customer_id?.first_name +
                      " " +
                      item?.customer_id?.last_name}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:w-full">
                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                  <p className="text-center text-[16px] font-[700] leading-[22px] text-white sm:text-[20px] sm:leading-[28px]">
                    "{item?.impression || ""}"
                  </p>
                  <button
                    className="flex h-[35px] w-full max-w-[140px] items-center justify-center gap-3 rounded-[5px] border border-[#00A481] px-4 sm:w-[104px]"
                    onClick={() => handleStatusUpdate(item?.uuid, item?.status)}
                  >
                    {item?.status === "Active" ? (
                      <>
                        <Eye className="h-5 w-5 text-[#00A481]" />
                        <p className="text-[14px] font-[600] leading-[20px] text-[#00A481]">
                          Hide
                        </p>
                      </>
                    ) : (
                      <>
                        <EyeClosed className="h-5 w-5 text-[#00A481]" />
                        <p className="text-[14px] font-[600] leading-[20px] text-[#00A481]">
                          Unhide
                        </p>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-justify text-[14px] font-[400] leading-[20px] text-[#DEDEDE]">
                  {item?.comment || ""}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No data found.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
