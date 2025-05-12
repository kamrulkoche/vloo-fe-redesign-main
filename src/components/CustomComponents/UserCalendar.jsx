"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import useSpaceBookingMutate from "@/hooks/QueryHooks/User/useSpaceBookingMutate";

const UserCalendar = ({
  startDate,
  endDate,
  onDateChange,
  availableDates,
  onClose,
  isAuthenticated,
  toggleModal,
}) => {
  // Initialize with current date, but will update based on available dates
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModifyingStart, setIsModifyingStart] = useState(false);
  const [isModifyingEnd, setIsModifyingEnd] = useState(false);
  const [tooltipDate, setTooltipDate] = useState(null);
  const [holidays, setHolidays] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);
  const [availableDateRange, setAvailableDateRange] = useState({
    start: null,
    end: null,
  });
  // Add initialization flag to prevent infinite updates
  const initializedRef = useRef(false);

  const { mutate, isPending } = useSpaceBookingMutate();

  // Process available dates, holidays and bookings on component mount or when availableDates changes
  useEffect(() => {
    if (!availableDates || initializedRef.current) return;

    // Set available date range
    const availableStartDate = new Date(
      availableDates.space_available_start_date,
    );
    const availableEndDate = new Date(availableDates.space_available_end_date);
    setAvailableDateRange({
      start: availableStartDate,
      end: availableEndDate,
    });

    // Set current month to match the start date month
    setCurrentDate(
      new Date(
        availableStartDate.getFullYear(),
        availableStartDate.getMonth(),
        1,
      ),
    );

    // Process holidays
    const holidayDays = [];
    const dayMap = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 0,
    };

    // Create a list of holiday days of the week
    const holidayDaysOfWeek = [];
    Object.entries(availableDates).forEach(([key, value]) => {
      if (
        [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].includes(key) &&
        value === "Holiday"
      ) {
        holidayDaysOfWeek.push(dayMap[key]);
      }
    });

    // Generate all dates between available start and end date
    const tempDate = new Date(availableStartDate);
    while (tempDate <= availableEndDate) {
      if (holidayDaysOfWeek.includes(tempDate.getDay())) {
        holidayDays.push(new Date(tempDate));
      }
      tempDate.setDate(tempDate.getDate() + 1);
    }
    setHolidays(holidayDays);

    // Process bookings
    const booked = [];
    if (
      availableDates.work_space_bookings &&
      availableDates.work_space_bookings.length > 0
    ) {
      availableDates.work_space_bookings.forEach((booking) => {
        const bookingStart = new Date(booking.booking_start_date);
        const bookingEnd = new Date(booking.booking_end_date);

        const curDate = new Date(bookingStart);
        while (curDate <= bookingEnd) {
          // Only add if it's not already a holiday
          if (!isDateHoliday(curDate, holidayDays)) {
            booked.push(new Date(curDate));
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      });
    }
    setBookedDates(booked);

    // Find the first available date
    findAndSetDefaultSingleDate(
      availableStartDate,
      availableEndDate,
      booked,
      holidayDays,
    );

    // Mark as initialized to prevent additional unwanted updates
    initializedRef.current = true;
  }, [availableDates]);

  // Helper function to find if a date is a holiday
  const isDateHoliday = (date, holidaysArray) => {
    return holidaysArray.some(
      (holiday) =>
        holiday.getDate() === date.getDate() &&
        holiday.getMonth() === date.getMonth() &&
        holiday.getFullYear() === date.getFullYear(),
    );
  };

  // Helper function to find if a date is booked
  const isDateBooked = (date, bookedDatesArray) => {
    return bookedDatesArray.some(
      (bookedDate) =>
        bookedDate.getDate() === date.getDate() &&
        bookedDate.getMonth() === date.getMonth() &&
        bookedDate.getFullYear() === date.getFullYear(),
    );
  };

  // Function to find and set a single default date
  const findAndSetDefaultSingleDate = (
    availableStartDate,
    availableEndDate,
    bookedDates,
    holidayDays,
  ) => {
    // Find the first available day
    let firstAvailableDate = new Date(availableStartDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Skip past any booked dates, holidays, or dates in the past
    while (
      isDateBooked(firstAvailableDate, bookedDates) ||
      isDateHoliday(firstAvailableDate, holidayDays) ||
      firstAvailableDate < today
    ) {
      firstAvailableDate.setDate(firstAvailableDate.getDate() + 1);

      // If we've gone past the available end date, stop
      if (firstAvailableDate > availableEndDate) {
        return; // No available dates
      }
    }

    // Set the default date - both start and end are the same date
    onDateChange(firstAvailableDate, firstAvailableDate);
  };

  const handleDateClick = (date) => {
    if (isDisabled(date) || isHoliday(date) || isBooked(date)) return;

    const clickedStartDate =
      startDate && date.getTime() === new Date(startDate).setHours(0, 0, 0, 0);
    const clickedEndDate =
      endDate && date.getTime() === new Date(endDate).setHours(0, 0, 0, 0);

    setTooltipDate(null);

    if (isModifyingStart) {
      if (!endDate || date <= endDate) {
        onDateChange(date, endDate);
        setIsModifyingStart(false);
      }
      return;
    }

    if (isModifyingEnd) {
      if (!startDate || date >= startDate) {
        onDateChange(startDate, date);
        setIsModifyingEnd(false);
      }
      return;
    }

    if (clickedStartDate) {
      setIsModifyingStart(true);
      setIsModifyingEnd(false);
      return;
    }

    if (clickedEndDate) {
      setIsModifyingEnd(true);
      setIsModifyingStart(false);
      return;
    }

    if (startDate && endDate && date >= startDate && date <= endDate) {
      setTooltipDate(date.getTime());
      setTimeout(() => setTooltipDate(null), 3000);
      return;
    }

    if (!startDate || (!endDate && !isModifyingStart && !isModifyingEnd)) {
      // If no dates selected or just starting fresh, set both start and end to the same date
      onDateChange(date, date);
    } else if (date < startDate) {
      onDateChange(date, endDate);
    } else if (date > startDate) {
      onDateChange(startDate, date);
    }
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Allow the startDate to be selectable even if it's in the past
    if (
      startDate &&
      date.getTime() === new Date(startDate).setHours(0, 0, 0, 0)
    ) {
      return false;
    }

    // Check holiday first to ensure holiday dates are not marked as disabled
    if (isHoliday(date)) {
      return false;
    }

    // Disable dates outside available range
    if (
      availableDateRange.start &&
      availableDateRange.end &&
      (date < availableDateRange.start || date > availableDateRange.end)
    ) {
      return true;
    }

    // Disable past dates
    return date < today;
  };

  const isHoliday = (date) => {
    return holidays.some(
      (holiday) =>
        holiday.getDate() === date.getDate() &&
        holiday.getMonth() === date.getMonth() &&
        holiday.getFullYear() === date.getFullYear(),
    );
  };

  const isBooked = (date) => {
    return bookedDates.some(
      (bookedDate) =>
        bookedDate.getDate() === date.getDate() &&
        bookedDate.getMonth() === date.getMonth() &&
        bookedDate.getFullYear() === date.getFullYear(),
    );
  };

  const isInRange = (date) => {
    if (!startDate || !endDate) return false;
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    const normalizedStart = new Date(startDate);
    normalizedStart.setHours(0, 0, 0, 0);
    const normalizedEnd = new Date(endDate);
    normalizedEnd.setHours(0, 0, 0, 0);
    return normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd;
  };

  const isRangeEnd = (date) => {
    if (!startDate || !endDate) return false;
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    const normalizedStart = new Date(startDate);
    normalizedStart.setHours(0, 0, 0, 0);
    const normalizedEnd = new Date(endDate);
    normalizedEnd.setHours(0, 0, 0, 0);
    return (
      normalizedDate.getTime() === normalizedStart.getTime() ||
      normalizedDate.getTime() === normalizedEnd.getTime()
    );
  };

  const canNavigatePrevious = () => {
    if (!availableDateRange.start) return true;

    const startMonth = new Date(
      availableDateRange.start.getFullYear(),
      availableDateRange.start.getMonth(),
      1,
    );

    // Compare currentDate and startMonth at month level
    return (
      currentDate.getFullYear() > startMonth.getFullYear() ||
      (currentDate.getFullYear() === startMonth.getFullYear() &&
        currentDate.getMonth() > startMonth.getMonth())
    );
  };

  const canNavigateNext = () => {
    if (!availableDateRange.end) return true;

    const endMonth = new Date(
      availableDateRange.end.getFullYear(),
      availableDateRange.end.getMonth(),
      1,
    );

    // Compare currentDate and endMonth at month level
    return (
      currentDate.getFullYear() < endMonth.getFullYear() ||
      (currentDate.getFullYear() === endMonth.getFullYear() &&
        currentDate.getMonth() < endMonth.getMonth())
    );
  };

  const changeMonth = (increment) => {
    if (increment > 0 && !canNavigateNext()) return;
    if (increment < 0 && !canNavigatePrevious()) return;

    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + increment,
        1,
      ),
    );
  };

  const isPastDateInRange = (date) => {
    if (!startDate || !endDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    const normalizedStart = new Date(startDate);
    normalizedStart.setHours(0, 0, 0, 0);

    const normalizedEnd = new Date(endDate);
    normalizedEnd.setHours(0, 0, 0, 0);

    return (
      normalizedDate >= normalizedStart &&
      normalizedDate <= normalizedEnd &&
      normalizedDate < today &&
      normalizedDate.getTime() !== normalizedStart.getTime() // Exclude start date itself
    );
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    days.push(
      <div key="weekdays" className="mb-3 grid grid-cols-7 gap-3">
        {weekDays.map((day) => (
          <div
            key={day}
            className="flex h-[42px] w-[48px] items-center justify-center text-[18px] font-medium leading-[24px] text-[#071A2B]"
          >
            {day}
          </div>
        ))}
      </div>,
    );

    let cells = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} className="p-4 text-center" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
      );
      date.setHours(0, 0, 0, 0);

      const isPastStart =
        startDate &&
        date.getTime() === new Date(startDate).setHours(0, 0, 0, 0) &&
        date < new Date().setHours(0, 0, 0, 0);

      const isPastInRange = isPastDateInRange(date);
      const holiday = isHoliday(date);
      const booked = isBooked(date);
      const disabled = isDisabled(date) && !holiday && !booked; // Only consider a date disabled if it's not a holiday or booked
      const inRange = isInRange(date);
      const isEnd = isRangeEnd(date);

      const isClickedStartDate =
        startDate &&
        date.getTime() === new Date(startDate).setHours(0, 0, 0, 0);
      const isClickedEndDate =
        endDate && date.getTime() === new Date(endDate).setHours(0, 0, 0, 0);

      // Determine the background color - priority order: holiday > booked > selected > available > disabled
      let bgColorClass = "text-[#0A2A3C] hover:bg-[#F4F4F4]";

      if (holiday) {
        bgColorClass = "cursor-not-allowed bg-[#DE4D3C] text-[#F24822]";
      } else if (booked) {
        bgColorClass = "cursor-not-allowed bg-[#858585] text-[#F24822]";
      } else if (isPastStart || isPastInRange) {
        bgColorClass =
          "cursor-not-allowed border border-[#006988] bg-[#F4F4F4] text-[#F24822]";
      } else if (isEnd || inRange) {
        bgColorClass = "bg-[#006988] text-white";
      } else if (!disabled && !holiday && !booked) {
        bgColorClass = "bg-white text-[#071A2B] border border-[#DEDEDE] hover:bg-";
      } else if (disabled) {
        bgColorClass = "cursor-not-allowed bg-[#F4F4F4] text-[#13293A66]";
      }

      const dateButton = (
        <button
          onClick={() => handleDateClick(date)}
          disabled={disabled || holiday || booked}
          className={cn(
            "mx-auto flex h-[42px] w-[48px] items-center justify-center rounded-[5px] text-[16px] font-[400] leading-[22px] transition-colors",
            bgColorClass,
            (isModifyingStart && isClickedStartDate) ||
              (isModifyingEnd && isClickedEndDate)
              ? "ring-2 ring-[#176880] ring-offset-2"
              : "",
          )}
        >
          {day}
        </button>
      );

      cells.push(
        <div key={day}>
          {inRange || isEnd ? (
            <TooltipProvider>
              <Tooltip open={tooltipDate === date.getTime()}>
                <TooltipTrigger asChild>{dateButton}</TooltipTrigger>
                <TooltipContent>
                  <p>Please select start or end date to change date range</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            dateButton
          )}
        </div>,
      );
    }

    days.push(
      <div key="days" className="grid grid-cols-7 gap-3">
        {cells}
      </div>,
    );

    return days;
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("default", {
      day: "numeric",
      month: "long",
    });
  };

  // Calculate the total price based on selected range
  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;

    // Count all days (including start and end dates) that are not holidays and not booked
    let workingDays = 0;
    const tempDate = new Date(startDate);

    // Make sure to set hours to 0 for accurate comparison
    tempDate.setHours(0, 0, 0, 0);
    const endDateNormalized = new Date(endDate);
    endDateNormalized.setHours(0, 0, 0, 0);

    // Count all days including the end date (use <= for inclusive counting)
    while (tempDate <= endDateNormalized) {
      if (!isHoliday(tempDate) && !isBooked(tempDate)) {
        workingDays++;
      }
      tempDate.setDate(tempDate.getDate() + 1);
    }

    // Return total price based on the number of working days
    return workingDays * (availableDates?.price_per_day || 0);
  };

  const handleBooking = () => {
    // Check if user is logged in
    if (!isAuthenticated()) {
      // Close the calendar dialog
      onClose();
      // Open the login modal
      toggleModal();
      return;
    }

    // Get the total price and working days
    const totalPrice = calculateTotalPrice();

    // Calculate total booked days
    let workingDays = 0;
    if (startDate && endDate) {
      const tempDate = new Date(startDate);
      tempDate.setHours(0, 0, 0, 0);
      const endDateNormalized = new Date(endDate);
      endDateNormalized.setHours(0, 0, 0, 0);

      while (tempDate <= endDateNormalized) {
        if (!isHoliday(tempDate) && !isBooked(tempDate)) {
          workingDays++;
        }
        tempDate.setDate(tempDate.getDate() + 1);
      }
    }

    // Format dates to yyyy-mm-dd
    const formatDateToYYYYMMDD = (date) => {
      if (!date) return "";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Create booking data object
    const bookingData = {
      price: totalPrice,
      booking_start_date: formatDateToYYYYMMDD(startDate),
      booking_end_date: formatDateToYYYYMMDD(endDate),
      booking_status: "Approve",
      payment_status: "",
      status: "Completed",
      space_id: availableDates?.space_id,
      workspace_id: availableDates?.work_space_id,
      total_booked_days: workingDays,
    };

    mutate(bookingData);
  };

  console.log(currentDate);

  return (
    <div className="w-full rounded-full bg-white">
      <div className="relative flex items-center justify-center gap-[75px] rounded-tl-[10px] rounded-tr-[10px] bg-[#E0F7FA] px-8 py-5">
        <div className="flex items-center gap-8">
          <Button
            className={cn(
              "h-8 w-8 rounded-full bg-[#0091B6] hover:bg-[#254f5a]",
              !canNavigatePrevious() ? "cursor-not-allowed opacity-50" : "",
            )}
            onClick={() => changeMonth(-1)}
            disabled={!canNavigatePrevious()}
          >
            <ChevronLeft className="h-[10px] w-[6px] text-white" />
          </Button>
          <span className="text-xl font-bold text-[#071A2B]">
            {currentDate.toLocaleString("default", { month: "long" })}
          </span>

          <Button
            onClick={() => changeMonth(1)}
            disabled={!canNavigateNext()}
            className={cn(
              "h-8 w-8 rounded-full bg-[#0091B6] hover:bg-[#254f5a]",
              !canNavigateNext() ? "cursor-not-allowed opacity-50" : "",
            )}
          >
            <ChevronRight className="h-[10px] w-[6px] text-white" />
          </Button>
        </div>
      </div>

      <div className="mx-8 my-5">
        {/* <div className="mb-4 flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#00A481]"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#176880]"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#DE4D3C]"></div>
            <span className="text-sm">Holiday</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-[#858585]"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div> */}
        {renderCalendar()}
      </div>

      <div className="bg-[#E0F7FA] ">
        <div className="flex h-[62px] items-center justify-between rounded-bl-[0px] rounded-br-[0px] mt-4">
          <div className="w-full">
            <p className="text-center text-[16px] font-semibold leading-[22px] text-[#0091B6]">
              Start {">"} {formatDate(startDate)}
            </p>
          </div>

          <div className="text-[21px] text-[#0091B6]">|</div>

          <div className="w-full">
            <p className="text-center text-[16px] font-semibold leading-[22px] text-[#0091B6]">
              End {">"} {formatDate(endDate)}
            </p>
          </div>
        </div>

        <div className="px-8 flex justify-between items-center">
          <div className="">
            <p className="text-base font-medium">Space Name</p>
            <h2 className="text-[#0091B6] font-semibold text-[32px] ">NOK 42<span className="mt-96 text-[14px] font-normal">/day</span></h2>
          </div>

          <div>
            <button
              disabled={isPending}
              onClick={handleBooking}
              className="h-[44px] w-[130px] rounded-[5px] bg-[#0A2A3C]"
            >
              <p className="text-[16px] font-[600] text-[#F3F3F3]">Book</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCalendar;
