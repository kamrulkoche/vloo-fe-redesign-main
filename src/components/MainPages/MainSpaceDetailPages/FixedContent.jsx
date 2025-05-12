"use client";

import RenderStars from "@/components/CustomComponents/RenderStars";
import UserCalendar from "@/components/CustomComponents/UserCalendar";
import { isAuthenticated } from "@/components/HelperFunctions/GetUserTypeFunction";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useSpaceAvailability from "@/hooks/QueryHooks/Public/Space/useSpaceAvailability";
import { useModalStore } from "@/store/zStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function FixedContent({ data }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHighlight, setShowHighlight] = useState(false);

  const { toggleModal } = useModalStore();

  const { data: availableDates } = useSpaceAvailability(selectedBox);

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  const handleBoxSelect = (id) => {
    setSelectedBox(id);
    setShowHighlight(false); // Turn off highlight animation once a selection is made
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 2 : data?.work_space.length - 2,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < data?.work_space.length - 2 ? prevIndex + 2 : 0,
    );
  };

  const handleCalendarOpen = () => {
    // if (!selectedBox) {
    //   // Show toast notification if no workspace is selected
    //   toast.error("Please select a workspace");

    //   // Highlight the first workspace box briefly
    //   setShowHighlight(true);
    //   setTimeout(() => setShowHighlight(false), 1500);
    // } else {
    //   setIsCalendarOpen(true);
    // }
    setIsCalendarOpen(true);
  };

  // Get current visible items
  const visibleItems = data?.work_space.slice(currentIndex, currentIndex + 2);
  // If we need to wrap around to complete two items
  if (visibleItems?.length < 2 && data?.work_space.length > 1) {
    visibleItems?.push(...data?.work_space.slice(0, 2 - visibleItems?.length));
  }

  return (
    <>
      {/* Left Section */}
      {/* <div>
          <p className="mb-1 text-xs font-bold text-[#006988] sm:mb-4 sm:text-2xl">
            {data?.spaceName}
          </p>
          <div className="mb-1 flex items-center gap-4 sm:mb-[10px]">
            <Image
              src="/assets/icons/space-location.svg"
              alt="space-location"
              width={10.21}
              height={16}
            />
            <p className="text-[10px] font-semibold leading-[20px] text-[#006988] sm:text-[14px]">
              {data?.location}
            </p>
            <div className="flex items-center gap-3">
              <RenderStars rating={String(data?.rating)} />
            </div>
          </div>
          <button className="ml-0 flex h-[23px] w-[73px] items-center justify-center rounded-[30px] bg-[#006988] sm:ml-7">
            <p className="text-[14px] font-semibold leading-[20px] text-white">
              Oslo
            </p>
          </button>
        </div> */}

      {/* Middle Section (Carousel) */}
      {/* <div className="flex-1">
          <div className="flex items-center justify-center gap-2">
            
            <button onClick={handlePrev}>
              <ChevronLeft size={20} color="#006988" />
            </button>

            {visibleItems?.map((item, index) => (
              <div
                key={item?.id}
                className={`max-w-[180px] cursor-pointer rounded-[10px] bg-[#F3F3F3] p-2 transition-all hover:bg-gray-300 ${selectedBox === item.id ? "border-2 border-[#006988]" : ""} ${showHighlight && index === 0 && currentIndex === 0 ? "animate-pulse bg-gray-300" : ""}`}
                onClick={() => handleBoxSelect(item.id)}
              >
                <p className="mb-2 text-[13px] font-medium leading-[18px] text-[#0A2A3C]">
                  {item.workspace_name}
                </p>
                <div className="flex items-center gap-4 py-2">
                  <div className="flex items-center gap-1">
                    <Image
                      src={"/assets/icons/person-icon.svg"}
                      alt="person-icon"
                      width={12}
                      height={12}
                    />
                    <p className="text-[13px] font-normal leading-[18px] text-[#868686]">
                      {item.number_of_person} person
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src={"/assets/icons/desk.svg"}
                      alt="person-icon"
                      width={12}
                      height={12}
                    />
                    <p className="text-[13px] font-normal leading-[18px] text-[#868686]">
                      {item.number_of_available_desks} desk
                    </p>
                  </div>
                </div>
                <p className="text-[13px] font-semibold leading-[18px] text-[#00A481]">
                  NOK {item.price_per_day}/{" "}
                  <span className="text-[10px] font-medium leading-[14px] text-[#868686]">
                    day
                  </span>
                </p>
              </div>
            ))}

            
            <button onClick={handleNext}>
              <ChevronRight size={20} color="#006988" />
            </button>
          </div>
        </div> */}

      {/* Right Section */}
      <div className="bg-[#E0F7FA] rounded-[35px] w-full sm:w-[306px] border border-[#B4E6EA] p-4 pb-7 mx-auto ">
        <div className="flex">
          <h2 className="text-2xl font-bold text-[#071A2B]">INC. Works</h2>
          <ul className="flex gap-2 ml-6">
            <img src="/assets/icons/star-blue.svg" alt="" className="w-5" />
            <img src="/assets/icons/star-blue.svg" alt="" className="w-5" />
            <img src="/assets/icons/star-blue.svg" alt="" className="w-5" />
            <img src="/assets/icons/star-blue.svg" alt="" className="w-5" />
            <img src="/assets/icons/star-black.svg" alt="" className="w-5" />
          </ul>
        </div>
        <h2 className="text-base font-medium mt-1.5">115 W 30th St, Partial 10th floor</h2>
        <p className="text-[#FFFFFF] bg-[#0091B6] text-[14px] font-medium px-6 py-2 rounded-3xl w-20 mt-[14px]">Oslo</p>
        <h2 className="mt-[50px] font-semibold text-lg text-[#0A2A3C]">Want to book this office space?</h2>
        <button
          onClick={handleCalendarOpen}
          className="mt-4 font-semibold text-[20px] bg-[#006988] py-2.5 px-6 text-white rounded-2xl w-full"
        >
          Booking calendar
        </button>
      </div>


      <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <DialogContent
          classButton="text-white"
          className="p-0 sm:rounded-[10px]"
        >
          <UserCalendar
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onDateChange={handleDateRangeChange}
            availableDates={availableDates?.data}
            onClose={() => setIsCalendarOpen(false)}
            isAuthenticated={isAuthenticated}
            toggleModal={toggleModal}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
