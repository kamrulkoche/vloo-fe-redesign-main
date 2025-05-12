"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useOptimizedSpaceList from "@/hooks/QueryHooks/Host/SpaceManager/Space/useOptimizedSpaceList";
import useBookingCalendarShow from "@/hooks/QueryHooks/Host/SpaceManager/useBookingCalendarShow";
import { useEffect, useState } from "react";

const BookingCalendarPage = () => {
  const { data: OptimizedSpaceList } = useOptimizedSpaceList();
  const [selectedSpaceId, setSelectedSpaceId] = useState("");
  const { data } = useBookingCalendarShow(selectedSpaceId);

  // Auto-select the first space ID when the list loads
  useEffect(() => {
    if (OptimizedSpaceList?.data?.length > 0) {
      setSelectedSpaceId(OptimizedSpaceList.data[0].id);
    }
  }, [OptimizedSpaceList]);

  if (!OptimizedSpaceList?.data?.length) {
    return (
      <div>
        <PortalBackButton title="Booking Calendar" />
        <div className="w-full rounded-[10px] bg-[#0A2A3C] p-5">
          <div className="flex h-40 items-center justify-center">
            <p className="text-lg font-medium text-white">
              No space is available
            </p>
          </div>
        </div>
      </div>
    );
  }

  const weekData = data?.data || [];

  return (
    <div>
      <PortalBackButton title="Booking Calendar" />

      <div className="w-full rounded-[10px] bg-[#0A2A3C] p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="mb-3 text-[18px] font-[500] leading-[24px] text-white">
            This week
          </p>
          <div className="w-1/5">
            <Select value={selectedSpaceId} onValueChange={setSelectedSpaceId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {OptimizedSpaceList?.data?.map((item) => (
                  <SelectItem key={item?.id} value={item?.id}>
                    {item?.space_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {weekData.map((dayData, index) => {
            const isHoliday = dayData.day_status === "Holiday";
            const date = new Date(dayData.date);
            const dayName = date.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const dayOfMonth = date.getDate();

            return (
              <div
                key={dayData.date}
                className={`flex items-start justify-start gap-3 overflow-x-auto rounded-[10px] border p-3 ${
                  isHoliday
                    ? "border-[#CF563F] bg-[#757575]"
                    : index === 0
                      ? "border-[#106884B2] bg-[#006988]"
                      : "border-[#106884B2] bg-[#DEDEDE]"
                }`}
              >
                {/* Date Box */}
                <div
                  className={`flex h-[82px] w-[80px] flex-shrink-0 flex-col items-center justify-center rounded-[5px] border ${
                    isHoliday
                      ? "border-[#081A28] bg-[#B3261E80]"
                      : index === 0
                        ? "border-[#DEDEDE] bg-[#0A2A3C]"
                        : "border-[#0A2A3C] bg-[#006988]"
                  }`}
                >
                  <p className="mb-1 text-[16px] font-[500] leading-[22px] text-white">
                    {dayName}
                  </p>
                  <p className="text-[24px] font-[700] leading-[20px] text-white">
                    {String(dayOfMonth).padStart(2, "0")}
                  </p>
                </div>

                {isHoliday ? (
                  <p className="mx-11 my-auto text-[16px] font-[600] leading-[22px] text-white">
                    Office Holiday
                  </p>
                ) : (
                  <div className="flex flex-1 flex-wrap gap-3">
                    {dayData.bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className={`flex w-[273px] justify-between gap-4 rounded-[5px] border p-[10px] ${
                          index === 0
                            ? "border-[#DEDEDE] bg-[#0A2A3C]"
                            : "border-[#000000] bg-[#106884B2]"
                        }`}
                      >
                        <div>
                          <p className="text-[16px] font-[600] leading-[22px] text-white">
                            {`${booking.customer_id.first_name} ${booking.customer_id.last_name}`}
                          </p>
                          <p className="mb-[6px] text-[12px] font-[500] leading-[17px] text-[#DEDEDE]">
                            NOK {booking.price}
                          </p>
                          <p className="text-[12px] font-[400] leading-[17px] text-white">
                            {`${booking.workspace_id.number_of_person} Persons | ${booking.workspace_id.workspace_name}`}
                          </p>
                        </div>
                        <button
                          className={`h-[15px] w-[47px] rounded-[25px] text-[8px] font-[500] leading-[10px] ${
                            booking.status === "Ongoing"
                              ? "bg-[#FFF4E3] text-[#FF9F0E]"
                              : "bg-[#CFF7D3] text-[#3FAD4A]"
                          }`}
                        >
                          {booking.status}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendarPage;
