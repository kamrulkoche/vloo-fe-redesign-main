"use client";

import BookerCalendar from "@/components/CustomComponents/BookerCalendar";
import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import RenderStars from "@/components/CustomComponents/RenderStars";
import ContactDialog from "@/components/Dialogs/ContactDialog";
import { DateFormatterType2Function } from "@/components/HelperFunctions/DateFormatterFunctions";
import LoadingComponent from "@/components/LoadingComponent";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useActiveBookingList from "@/hooks/QueryHooks/User/useActiveBookingList";
import useFavouriteMutate from "@/hooks/QueryHooks/User/useFavouriteMutate";
import { Heart } from "lucide-react";
import { useState } from "react";

const ActiveBookingsPage = () => {
  const [isOpenContact, setIsOpenContact] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [selectedContact, setSelectedContact] = useState({
    phone: "",
    email: "",
    address: "",
  });

  const handleOpenContactDialog = (booking) => {
    setSelectedContact({
      phone: booking?.phone || "",
      email: booking?.email || "",
      address: booking?.address || "",
    });
    setIsOpenContact(true);
  };

  const { data, isPending, refetch } = useActiveBookingList();
  const { mutate, isPending: FavouritePending } = useFavouriteMutate();

  const handleDialogChange = (open) => {
    setIsOpenContact(open);
  };

  const handleViewCalendar = (booking) => {
    setSelectedBooking(booking);
    setIsCalendarOpen(true);
  };

  const handleFavoriteToggle = (spaceId, currentStatus) => {
    const newStatus = currentStatus === "Dislike" ? "Like" : "Dislike";

    mutate(
      {
        space_id: spaceId,
        favorite_status: newStatus,
      },
      {
        onSuccess: () => {
          refetch();
        },
      },
    );
  };

  return (
    <>
      {isPending || FavouritePending ? (
        <LoadingComponent />
      ) : (
        <div>
          <PortalBackButton title="Active Booking" />

          <Dialog open={isOpenContact} onOpenChange={handleDialogChange}>
            {data?.data?.length > 0 ? (
              <div className="rounded-[20px] bg-[#0A2A3C] p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {data?.data?.map((item) => (
                    <div key={item.id} className="rounded-[20px] bg-[#0A2A3C]">
                      <div className="w-full rounded-[10px] bg-white p-2">
                        <div className="relative">
                          <div className="relative mb-5 h-[229px] w-full overflow-hidden rounded-[10px]">
                            {item?.space_id?.upload_files?.[0]?.file_url?.endsWith(
                              ".mp4",
                            ) ? (
                              <video
                                src={
                                  item?.space_id?.upload_files?.[0]?.file_url
                                }
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <img
                                src={
                                  item?.space_id?.upload_files?.[0]?.file_url
                                }
                                alt={item?.space_id?.space_name}
                                className="h-full w-full object-cover"
                              />
                            )}
                            {/* Black overlay */}
                            <div className="absolute inset-0 bg-black opacity-50" />
                          </div>
                          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-3">
                            <p className="text-[12px] font-medium leading-[20px] text-white sm:text-[14px]">
                              Booked on:{" "}
                              {DateFormatterType2Function(
                                item?.space_id?.created_at,
                              )}
                            </p>
                            <div className="flex h-[20px] w-[84px] items-center justify-center rounded-[10px] border border-[#FF9F0E]">
                              <p className="text-[12px] font-medium leading-[17px] text-[#FF9F0E]">
                                {item.status}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="m-3">
                          <div className="mb-5 flex items-start justify-between sm:mb-10">
                            <div>
                              <p className="mb-3 text-[16px] font-[700] leading-[24px] text-[#0A2A3C] sm:text-[18px]">
                                {item?.space_id?.space_name}
                              </p>

                              <div className="flex flex-col items-center gap-3 sm:flex-row">
                                <div className="flex min-w-[103px] items-center justify-center rounded-[29px] bg-[#006988] px-2">
                                  <p className="text-[14px] font-medium text-white">
                                    {item?.space_id?.location}
                                  </p>
                                </div>
                                <p className="text-[12px] font-medium leading-[20px] text-[#13293ACC] sm:text-[14px]">
                                  {item?.space_id?.company_name}
                                </p>
                                <div className="flex">
                                  <RenderStars
                                    rating={String(item?.space_id?.rating)}
                                  />
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

                          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-[71px]">
                            <DialogTrigger asChild>
                              <button
                                onClick={() => handleOpenContactDialog(item)}
                                className="h-[60px] w-full rounded-[5px] border border-[#00A481] text-[16px] font-[500] leading-[24px] text-[#00A481] sm:w-[180px] sm:text-[18px]"
                              >
                                Contact
                              </button>
                            </DialogTrigger>

                            <button
                              onClick={() => handleViewCalendar(item)}
                              className="h-[60px] w-full rounded-[5px] bg-[#00A481] text-[16px] font-[500] leading-[24px] text-white sm:w-[180px] sm:text-[18px]"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-4 flex items-center justify-center rounded-[20px] bg-[#0A2A3C] py-5 text-white">
                No booking is created yet.
              </div>
            )}

            <ContactDialog
              onOpenChange={handleDialogChange}
              contactData={selectedContact}
            />
          </Dialog>

          <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <DialogContent
              classButton="text-white"
              className="p-0 sm:rounded-[10px]"
            >
              {selectedBooking && (
                <BookerCalendar
                  startDate={selectedBooking.booking_start_date}
                  endDate={selectedBooking.booking_end_date}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default ActiveBookingsPage;
