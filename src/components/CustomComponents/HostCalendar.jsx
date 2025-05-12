"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const HostCalendar = ({
  startDate,
  endDate,
  onDateChange,
  holidays = [],
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModifyingStart, setIsModifyingStart] = useState(false);
  const [isModifyingEnd, setIsModifyingEnd] = useState(false);
  const [tooltipDate, setTooltipDate] = useState(null);

  const handleDateClick = (date) => {
    if (isDisabled(date) || isHoliday(date)) return;

    const clickedStartDate =
      startDate && date.getTime() === new Date(startDate).setHours(0, 0, 0, 0);
    const clickedEndDate =
      endDate && date.getTime() === new Date(endDate).setHours(0, 0, 0, 0);

    setTooltipDate(null);

    if (isModifyingStart) {
      if (!endDate || date < endDate) {
        onDateChange(date, endDate);
        setIsModifyingStart(false);
      }
      return;
    }

    if (isModifyingEnd) {
      if (!startDate || date > startDate) {
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
      onDateChange(date, null);
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

  const canNavigateNext = () => {
    const today = new Date();
    const threeMonthsFromNow = new Date(
      today.getFullYear(),
      today.getMonth() + 2,
      1,
    );
    return currentDate < threeMonthsFromNow;
  };

  const changeMonth = (increment) => {
    if (increment > 0 && !canNavigateNext()) return;
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
            className="flex h-[42px] w-[48px] items-center justify-center text-[18px] font-medium leading-[24px] text-[#0A2A3C]"
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
      const disabled = isDisabled(date);
      const holiday = isHoliday(date);
      const inRange = isInRange(date);
      const isEnd = isRangeEnd(date);

      const isClickedStartDate =
        startDate &&
        date.getTime() === new Date(startDate).setHours(0, 0, 0, 0);
      const isClickedEndDate =
        endDate && date.getTime() === new Date(endDate).setHours(0, 0, 0, 0);

      const dateButton = (
        <button
          onClick={() => handleDateClick(date)}
          disabled={disabled || holiday}
          className={cn(
            "mx-auto flex h-[42px] w-[48px] items-center justify-center rounded-[5px] text-[16px] font-[400] leading-[22px] transition-colors",
            isPastStart
              ? "border border-[#006988] bg-[#F4F4F4] text-[#0A2A3C]"
              : isPastInRange
                ? "cursor-not-allowed border border-[#006988] bg-[#F4F4F4] text-[#0A2A3C]"
                : disabled
                  ? "cursor-not-allowed bg-[#F4F4F4] text-[#13293A66]"
                  : holiday
                    ? "cursor-not-allowed bg-[#DE4D3C] text-[#0A2A3C]"
                    : isEnd
                      ? "bg-[#176880] text-white"
                      : inRange
                        ? "border border-[#006988] text-[#006988] hover:bg-[#F4F4F4]"
                        : "text-[#0A2A3C] hover:bg-[#F4F4F4]",
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

  return (
    <div className="w-full rounded-[10px] bg-white">
      <div className="relative flex items-center justify-center gap-[75px] rounded-tl-[10px] rounded-tr-[10px] bg-[#006988] px-8 py-5">
        <div className="flex items-center gap-8">
          <Button
            className="h-8 w-8 rounded-full bg-white hover:bg-slate-100"
            onClick={() => changeMonth(-1)}
          >
            <ChevronLeft className="h-[10px] w-[6px] text-[#4F4F4F]" />
          </Button>
          <span className="text-xl font-bold text-white">
            {currentDate.toLocaleString("default", { month: "long" })}
          </span>
          <Button
            onClick={() => changeMonth(1)}
            disabled={!canNavigateNext()}
            className={cn(
              "h-8 w-8 rounded-full bg-white hover:bg-slate-100",
              !canNavigateNext() ? "cursor-not-allowed opacity-50" : "",
            )}
          >
            <ChevronRight className="h-[10px] w-[6px] text-[#4F4F4F]" />
          </Button>
        </div>
      </div>

      <div className="mx-8 mb-5 mt-3">{renderCalendar()}</div>

      <div className="flex h-[62px] items-center justify-between rounded-bl-[10px] rounded-br-[10px] bg-[#006988]">
        <div className="w-full">
          <p className="text-center text-[16px] font-semibold leading-[22px] text-[#DEDEDE]">
            Start {">"} {formatDate(startDate)}
          </p>
        </div>

        <div className="text-[21px] text-[#868686]">|</div>

        <div className="w-full">
          <p className="text-center text-[16px] font-semibold leading-[22px] text-[#DEDEDE]">
            End {">"} {formatDate(endDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HostCalendar;
