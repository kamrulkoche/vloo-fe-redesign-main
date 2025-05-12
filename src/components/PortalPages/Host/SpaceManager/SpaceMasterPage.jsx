"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import RenderStars from "@/components/CustomComponents/RenderStars";
import SpaceStats from "@/components/CustomComponents/SpaceStats";
import {
  DateFormatterType1Function,
  DateFormatterType2Function,
} from "@/components/HelperFunctions/DateFormatterFunctions";
import LoadingComponent from "@/components/LoadingComponent";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useSpaceDelete from "@/hooks/QueryHooks/Host/SpaceManager/Space/useSpaceDelete";
import useSpaceMasterDashboard from "@/hooks/QueryHooks/Host/SpaceManager/useSpaceMasterDashboard";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SpaceMasterPage = () => {
  const router = useRouter();
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const { data, refetch, isPending: SpacePending } = useSpaceMasterDashboard();
  const { mutate, isPending } = useSpaceDelete();

  const handleDeleteSpace = (uuid) => {
    mutate(
      { uuid },
      {
        onSuccess: () => {
          setIsSuccessDialogOpen(true);
          refetch();
        },
      },
    );
  };

  return (
    <>
      {SpacePending || isPending ? (
        <LoadingComponent />
      ) : (
        <div>
          <PortalBackButton title="Space Master" />

          <div className="mb-3 flex justify-center sm:justify-end">
            <button
              onClick={() => router.push("/pro/portal/space-manager/add-space")}
              className="h-[50px] w-full rounded-[5px] bg-[#006988] text-[14px] font-[500] leading-[20px] text-white sm:w-[140px]"
            >
              Add space
            </button>
          </div>

          {data?.data?.Space?.length > 0 ? (
            data?.data?.Space?.map((item) => (
              <div
                key={item?.id}
                className="mb-4 flex flex-col gap-5 rounded-[20px] bg-[#0A2A3C] p-4 sm:flex-row sm:p-6"
              >
                {/* Left Section */}
                <div className="w-full rounded-[10px] bg-white p-2 sm:w-1/2">
                  <div className="relative">
                    {item?.upload_files?.[0]?.file_url?.endsWith(".mp4") ? (
                      <video
                        src={item.upload_files[0].file_url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="mb-5 h-[229px] w-full rounded-[10px] object-cover"
                      />
                    ) : (
                      <img
                        src={item?.upload_files?.[0]?.file_url}
                        alt="space"
                        className="mb-5 h-[229px] w-full rounded-[10px] object-cover"
                      />
                    )}
                    <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-3">
                      <p className="text-[12px] font-medium leading-[20px] text-white sm:text-[14px]">
                        Date added:{" "}
                        {DateFormatterType2Function(item?.created_at)}
                      </p>
                      <div className="h-[23px] w-[63px] rounded-[29px] bg-[#AFF4C6]">
                        <p className="text-center text-[12px] font-medium text-[#1F992B] sm:text-[14px]">
                          {item?.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="m-3 mb-4">
                    <p className="mb-3 text-[16px] font-[700] leading-[24px] text-[#0A2A3C] sm:text-[18px]">
                      {item?.space_name}
                    </p>

                    <div className="mb-3 flex flex-col items-center gap-3 sm:mb-14 sm:flex-row">
                      <div className="max-w-[130px] rounded-[29px] bg-[#006988]">
                        <p className="px-2 text-center text-[12px] font-medium text-white sm:text-[14px]">
                          {item?.location}
                        </p>
                      </div>
                      <p className="text-[12px] font-medium leading-[20px] text-[#13293ACC] sm:text-[14px]">
                        {item?.company_name}
                      </p>
                      <div className="flex items-center">
                        <RenderStars rating={String(item?.Rating)} />
                        <span className="ml-3">({item?.Rating})</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            disabled={isPending}
                            className="h-[60px] w-full rounded-[5px] border border-[#CF563F] text-[16px] font-[500] leading-[24px] text-[#CF563F] sm:w-[180px] sm:text-[18px]"
                          >
                            {isPending ? "Deleting..." : "Delete"}
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="w-full border-none bg-[#0A2A3C] sm:w-[428px]">
                          <AlertDialogHeader>
                            <p className="text-center text-[20px] font-[700] leading-[28px] text-white">
                              Do you want to delete this space?
                            </p>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-6 flex w-full items-center justify-between sm:mt-12">
                            <AlertDialogCancel className="h-[35px] w-[145px] rounded-[5px] border-none bg-[#006988] text-[14px] font-[600] leading-[20px] text-white hover:bg-[#006988] hover:text-white">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="h-[35px] w-[145px] rounded-[5px] border border-[#CF563F] bg-transparent text-[14px] font-[600] leading-[20px] text-[#CF563F] hover:bg-transparent"
                              onClick={() => handleDeleteSpace(item?.uuid)}
                              disabled={isPending}
                            >
                              {isPending ? "Deleting..." : "Delete space"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <button
                        onClick={() =>
                          router.push(
                            `/pro/portal/space-manager/add-space?uuid=${item?.uuid}&step=${item?.step}`,
                          )
                        }
                        className="h-[60px] w-full rounded-[5px] bg-[#006988] text-[16px] font-[500] leading-[24px] text-white sm:w-[180px] sm:text-[18px]"
                      >
                        Edit space
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <SpaceStats spaceData={item} />
              </div>
            ))
          ) : (
            <div className="mb-4 flex items-center justify-center rounded-[20px] bg-[#0A2A3C] py-5 text-white">
              No space is created yet
            </div>
          )}

          {data?.data?.Upcoming_booking?.length > 0 ? (
            <div className="rounded-[20px] bg-[#0A2A3C] p-4 sm:p-6">
              <p className="mb-5 text-[16px] font-[500] leading-[22px] text-white">
                Upcoming booking
              </p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-12">
                {data?.data?.Upcoming_booking?.map((item) => (
                  <div
                    key={item?.id}
                    className="w-full rounded-[10px] border border-[#DEDEDE] bg-[#457480] px-6 py-4 sm:w-auto"
                  >
                    <p className="mb-5 text-[24px] font-[700] leading-[34px] text-white">
                      {DateFormatterType1Function(item.booking_date)}
                    </p>
                    <p className="mb-1 text-[14px] font-[500] leading-[20px] text-white">
                      {item?.booking?.space_id?.space_name}
                    </p>
                    <div className="mb-5 flex items-center gap-2">
                      <img
                        src="/assets/icons/location.png"
                        alt="location"
                        className="h-[16px] w-[13px]"
                      />
                      <p className="text-[14px] font-[500] leading-[20px] text-white">
                        {item?.booking?.space_id?.location || ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          item?.booking?.customer_id?.upload_files?.[0]
                            ?.file_url || "/assets/images/default-image.jpg"
                        }
                        alt="user-image"
                        className="w-9 rounded-full"
                      />
                      <div>
                        <p className="text-[14px] font-[500] leading-[20px] text-white">
                          {item?.booking?.customer_id?.first_name +
                            " " +
                            item?.booking?.customer_id?.last_name}
                        </p>
                        <p className="text-[10px] font-[500] leading-[20px] text-[#DEDEDE]">
                          {item?.booking?.customer_id?.company_name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-[20px] bg-[#0A2A3C] p-4 sm:p-6">
              <p className="mb-5 text-[16px] font-[500] leading-[22px] text-white">
                Upcoming booking
              </p>
              <p className="text-center text-white">No data found.</p>
            </div>
          )}

          {/* Success Alert Dialog */}
          <AlertDialog
            open={isSuccessDialogOpen}
            onOpenChange={setIsSuccessDialogOpen}
          >
            <AlertDialogContent className="w-full border-none bg-[#0A2A3C] sm:w-[428px]">
              <AlertDialogHeader>
                <p className="text-center text-[20px] font-[700] leading-[28px] text-white">
                  Your space has been deleted
                </p>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-6 flex w-full items-center justify-center sm:mt-12">
                <AlertDialogAction
                  className="h-[35px] w-[145px] rounded-[5px] border-none bg-[#006988] text-[14px] font-[600] leading-[20px] text-white hover:bg-[#006988] hover:text-white"
                  onClick={() => {
                    setIsSuccessDialogOpen(false);
                  }}
                >
                  Close
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </>
  );
};

export default SpaceMasterPage;
