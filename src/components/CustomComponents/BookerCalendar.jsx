"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const BookerCalendar = ({ startDate, endDate }) => {
  // Convert string dates to Date objects
  const startDateObj = startDate ? new Date(startDate) : null;
  const endDateObj = endDate ? new Date(endDate) : null;

  // Initialize with the month of the start date
  const [currentDate, setCurrentDate] = useState(
    startDateObj
      ? new Date(startDateObj.getFullYear(), startDateObj.getMonth(), 1)
      : new Date(),
  );

  // Determine if we need to show two months
  const [showTwoMonths, setShowTwoMonths] = useState(false);

  // Track if we can navigate to previous or next month
  const [canGoToPrevMonth, setCanGoToPrevMonth] = useState(false);
  const [canGoToNextMonth, setCanGoToNextMonth] = useState(false);

  useEffect(() => {
    if (startDateObj && endDateObj) {
      // Check if dates span different months
      const startMonth = startDateObj.getMonth();
      const startYear = startDateObj.getFullYear();
      const endMonth = endDateObj.getMonth();
      const endYear = endDateObj.getFullYear();

      setShowTwoMonths(startMonth !== endMonth || startYear !== endYear);

      // Reset current date to start date's month
      setCurrentDate(
        new Date(startDateObj.getFullYear(), startDateObj.getMonth(), 1),
      );

      // Determine if navigation is possible
      updateNavigationAvailability(
        new Date(startDateObj.getFullYear(), startDateObj.getMonth(), 1),
      );
    }
  }, [startDate, endDate]);

  // Update navigation buttons availability
  const updateNavigationAvailability = (date) => {
    if (!startDateObj || !endDateObj) {
      setCanGoToPrevMonth(false);
      setCanGoToNextMonth(false);
      return;
    }

    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const startMonth = startDateObj.getMonth();
    const startYear = startDateObj.getFullYear();
    const endMonth = endDateObj.getMonth();
    const endYear = endDateObj.getFullYear();

    // Can only go to previous month if current month is not the start date's month
    setCanGoToPrevMonth(
      !(currentMonth === startMonth && currentYear === startYear),
    );

    // Can only go to next month if showing the start month and there's a different end month
    // OR if current month is not yet the end date's month
    setCanGoToNextMonth(
      (currentMonth === startMonth &&
        currentYear === startYear &&
        (currentMonth !== endMonth || currentYear !== endYear)) ||
        currentYear < endYear ||
        (currentYear === endYear && currentMonth < endMonth),
    );
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isInRange = (date) => {
    if (!startDateObj || !endDateObj) return false;
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    const normalizedStart = new Date(startDateObj);
    normalizedStart.setHours(0, 0, 0, 0);
    const normalizedEnd = new Date(endDateObj);
    normalizedEnd.setHours(0, 0, 0, 0);
    return normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd;
  };

  const isRangeEnd = (date) => {
    if (!startDateObj || !endDateObj) return false;
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    const normalizedStart = new Date(startDateObj);
    normalizedStart.setHours(0, 0, 0, 0);
    const normalizedEnd = new Date(endDateObj);
    normalizedEnd.setHours(0, 0, 0, 0);
    return (
      normalizedDate.getTime() === normalizedStart.getTime() ||
      normalizedDate.getTime() === normalizedEnd.getTime()
    );
  };

  const changeMonth = (increment) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + increment,
      1,
    );
    setCurrentDate(newDate);
    updateNavigationAvailability(newDate);
  };

  const renderCalendar = (date) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDayOfMonth = getFirstDayOfMonth(date);
    const days = [];
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    days.push(
      <div
        key={`weekdays-${date.getMonth()}`}
        className="mb-3 grid grid-cols-7 gap-3"
      >
        {weekDays.map((day) => (
          <div
            key={`${day}-${date.getMonth()}`}
            className="flex h-[42px] w-[48px] items-center justify-center text-[18px] font-medium leading-[24px] text-[#0A2A3C]"
          >
            {day}
          </div>
        ))}
      </div>,
    );

    let cells = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(
        <div
          key={`empty-${i}-${date.getMonth()}`}
          className="p-4 text-center"
        />,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(date.getFullYear(), date.getMonth(), day);
      cellDate.setHours(0, 0, 0, 0);

      const inRange = isInRange(cellDate);
      const isEnd = isRangeEnd(cellDate);

      // Determine the background color
      let bgColorClass = "text-[#0A2A3C]";

      if (isEnd) {
        bgColorClass = "bg-[#176880] text-white";
      } else if (inRange) {
        bgColorClass = "bg-[#176880] text-white";
      }

      cells.push(
        <div key={`day-${day}-${date.getMonth()}`}>
          <div
            className={cn(
              "mx-auto flex h-[42px] w-[48px] items-center justify-center rounded-[5px] text-[16px] font-[400] leading-[22px]",
              bgColorClass,
            )}
          >
            {day}
          </div>
        </div>,
      );
    }

    days.push(
      <div key={`days-${date.getMonth()}`} className="grid grid-cols-7 gap-3">
        {cells}
      </div>,
    );

    return days;
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Render next month calendar only if needed
  const renderNextMonthCalendar = () => {
    // Check if current month is the start month and there's a different end month
    const isStartMonth =
      currentDate.getMonth() === startDateObj.getMonth() &&
      currentDate.getFullYear() === startDateObj.getFullYear();

    if (isStartMonth && showTwoMonths) {
      const nextMonthDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1,
      );
      return (
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-center">
            <span className="text-xl font-bold text-[#006988]">
              {nextMonthDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          {renderCalendar(nextMonthDate)}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full rounded-[10px] bg-white">
      <div className="relative flex items-center justify-center gap-[75px] rounded-tl-[10px] rounded-tr-[10px] bg-[#006988] px-8 py-5">
        <div className="flex items-center gap-8">
          <Button
            className={cn(
              "h-8 w-8 rounded-full",
              canGoToPrevMonth
                ? "bg-white hover:bg-slate-100"
                : "cursor-not-allowed bg-gray-200",
            )}
            onClick={() => canGoToPrevMonth && changeMonth(-1)}
            disabled={!canGoToPrevMonth}
          >
            <ChevronLeft
              className={cn(
                "h-[10px] w-[6px]",
                canGoToPrevMonth ? "text-[#4F4F4F]" : "text-[#9F9F9F]",
              )}
            />
          </Button>
          <span className="text-xl font-bold text-white">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <Button
            onClick={() => canGoToNextMonth && changeMonth(1)}
            className={cn(
              "h-8 w-8 rounded-full",
              canGoToNextMonth
                ? "bg-white hover:bg-slate-100"
                : "cursor-not-allowed bg-gray-200",
            )}
            disabled={!canGoToNextMonth}
          >
            <ChevronRight
              className={cn(
                "h-[10px] w-[6px]",
                canGoToNextMonth ? "text-[#4F4F4F]" : "text-[#9F9F9F]",
              )}
            />
          </Button>
        </div>
      </div>

      <div className="mx-8 my-5">
        {renderCalendar(currentDate)}
        {renderNextMonthCalendar()}
      </div>

      <div className="flex h-[62px] items-center justify-between rounded-bl-[10px] rounded-br-[10px] bg-[#DEDEDE]">
        <div className="w-full">
          <p className="text-center text-[16px] font-semibold leading-[22px] text-[#006988]">
            Start: {formatDate(startDate)}
          </p>
        </div>

        <div className="text-[21px] text-[#868686]">|</div>

        <div className="w-full">
          <p className="text-center text-[16px] font-semibold leading-[22px] text-[#006988]">
            End: {formatDate(endDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookerCalendar;
