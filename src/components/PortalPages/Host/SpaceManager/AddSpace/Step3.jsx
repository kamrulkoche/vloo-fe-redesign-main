"use client";

import HostCalendar from "@/components/CustomComponents/HostCalendar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useSpaceAvailableDateStore from "@/hooks/QueryHooks/Host/SpaceManager/SpaceAvailableDate/useSpaceAvailableDateStore";
import useSpaceAvailableDateUpdate from "@/hooks/QueryHooks/Host/SpaceManager/SpaceAvailableDate/useSpaceAvailableDateUpdate";
import useSpaceStepMutate from "@/hooks/QueryHooks/Host/SpaceManager/useSpaceStepMutate";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const weeks = [
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
];

const Step3 = ({ spaceId, onBack, spaceUuid, initialAvailability }) => {
  const router = useRouter();
  const [isCustomAvailability, setIsCustomAvailability] = useState(true);
  const [isCustomWeeklyHoliday, setIsCustomWeeklyHoliday] = useState(true);
  const [weeklyHolidays, setWeeklyHolidays] = useState(
    weeks.reduce((acc, week) => ({ ...acc, [week.id]: false }), {}),
  );
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [showAlert, setShowAlert] = useState(false);

  const { mutate: createMutate, isPending: createPending } =
    useSpaceAvailableDateStore();
  const { mutate: updateMutate, isPending: updatePending } =
    useSpaceAvailableDateUpdate();
  const { mutate: updateStep } = useSpaceStepMutate();

  const isPending = initialAvailability?.uuid ? updatePending : createPending;

  useEffect(() => {
    if (initialAvailability) {
      // Handle initialAvailability dates
      const start = new Date(initialAvailability.start_date);
      const end = new Date(initialAvailability.end_date);
      setDateRange({ startDate: start, endDate: end });

      setIsCustomAvailability(
        initialAvailability.date_status === "Time Period",
      );

      const holidayState = weeks.reduce(
        (acc, week) => ({
          ...acc,
          [week.id.toLowerCase()]:
            initialAvailability[week.label] === "Holiday",
        }),
        {},
      );
      setWeeklyHolidays(holidayState);
      setIsCustomWeeklyHoliday(
        Object.values(holidayState).some((value) => value),
      );
    } else {
      // Set default one week range if no initial availability
      const today = new Date();
      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(today.getDate() + 6);
      setDateRange({ startDate: today, endDate: oneWeekLater });
    }
  }, [initialAvailability]);

  const handleWeeklyHolidayChange = (day, checked) => {
    setWeeklyHolidays((prev) => ({
      ...prev,
      [day]: checked,
    }));
  };

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    const formData = new FormData();

    if (initialAvailability?.uuid) {
      formData.append("uuid", initialAvailability.uuid);
    }

    formData.append("space_id", spaceId);
    formData.append("start_date", formatDate(dateRange.startDate));
    formData.append("end_date", formatDate(dateRange.endDate));
    formData.append(
      "date_status",
      isCustomAvailability ? "Time Period" : "Only start",
    );

    weeks.forEach((week) => {
      formData.append(
        week.label,
        isCustomWeeklyHoliday && weeklyHolidays[week.id]
          ? "Holiday"
          : "Working Day",
      );
    });

    const handleSuccess = () => {
      setShowAlert(true);
    };

    if (initialAvailability?.uuid) {
      updateMutate(formData, {
        onSuccess: handleSuccess,
      });
    } else {
      createMutate(formData, {
        onSuccess: handleSuccess,
      });
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    if (spaceUuid) {
      updateStep(
        { uuid: spaceUuid, step: "3" },
        {
          onSuccess: () => {
            router.push("/pro/portal/space-manager/space-master");
          },
        },
      );
    } else {
      router.push("/pro/portal/space-manager/space-master");
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="w-[50%]">
          <div className="mb-5 flex items-center gap-3">
            <Checkbox
              checked={isCustomAvailability}
              onCheckedChange={setIsCustomAvailability}
              className={`rounded-[2px] border-none data-[state=checked]:bg-[#006988] data-[state=checked]:text-white`}
            />
            <Label className="text-[16px] font-[500] leading-[22px] text-[#F3F3F3]">
              Select custom availability
            </Label>
          </div>

          <div
            className={`relative ${!isCustomAvailability ? "cursor-not-allowed" : ""}`}
          >
            {!isCustomAvailability && (
              <div className="absolute inset-0 z-10 w-full rounded-[10px] bg-white opacity-50" />
            )}
            <div className={!isCustomAvailability ? "pointer-events-none" : ""}>
              <HostCalendar
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onDateChange={handleDateRangeChange}
                holidays={[]}
              />
            </div>
          </div>
        </div>

        <div className="w-[30%]">
          <div className="mb-5 flex items-center gap-3">
            <Checkbox
              checked={isCustomWeeklyHoliday}
              onCheckedChange={setIsCustomWeeklyHoliday}
              className={`rounded-[2px] border-none data-[state=checked]:bg-[#006988] data-[state=checked]:text-white`}
            />
            <Label className="text-[16px] font-[500] leading-[22px] text-[#F3F3F3]">
              Select the weekly holiday
            </Label>
          </div>

          <div
            className={`relative ${!isCustomWeeklyHoliday ? "cursor-not-allowed" : ""}`}
          >
            {!isCustomWeeklyHoliday && (
              <div className="absolute inset-0 z-10 w-full rounded-[10px] bg-white opacity-50" />
            )}
            <div
              className={!isCustomWeeklyHoliday ? "pointer-events-none" : ""}
            >
              <div className="w-full rounded-[10px] bg-white">
                <div className="flex items-center justify-center rounded-tl-[10px] rounded-tr-[10px] bg-[#006988] px-8 py-6">
                  <p className="text-[20px] font-[700] leading-[28px] text-[#DEDEDE]">
                    Weekly Holidays
                  </p>
                </div>

                <div className="mx-[50px] mt-5 flex flex-col rounded-bl-[10px] rounded-br-[10px]">
                  {weeks.map((item) => (
                    <div
                      key={item?.id}
                      className="mb-8 flex items-center justify-between gap-5 sm:gap-10"
                    >
                      <p className="text-[14px] font-[600] leading-[20px] text-[#868686]">
                        {item?.label}
                      </p>

                      <div className="flex items-center gap-3">
                        <Switch
                          checked={weeklyHolidays[item.id]}
                          onCheckedChange={(checked) =>
                            handleWeeklyHolidayChange(item.id, checked)
                          }
                          className="data-[state=unchecked]:bg-[#13293A66]"
                          thumbClassName="bg-white"
                          id={item?.id}
                        />
                        <Label
                          htmlFor={item?.id}
                          className="w-8 text-[14px] font-[600] leading-[20px] text-[#868686]"
                        >
                          {weeklyHolidays[item.id] ? "Yes" : "No"}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-5">
        <button
          type="button"
          onClick={onBack}
          className="h-[50px] w-[117px] rounded-[5px] border border-[#006988] bg-white text-[#006988]"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="h-[50px] w-[175px] rounded-[5px] bg-[#006988] text-white disabled:bg-opacity-70"
        >
          {initialAvailability ? "Update" : "Add"} Workspace
        </button>
      </div>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="w-full border-none bg-[#0A2A3C] sm:w-[428px]">
          <AlertDialogHeader className="pt-3">
            <p className="text-center text-[20px] font-[700] leading-[28px] text-white">
              Space {initialAvailability ? "updated" : "added"} successfully
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-3 flex w-full items-center justify-center sm:mt-5">
            <AlertDialogAction
              className="h-[44px] w-[85px] rounded-[5px] border-none bg-[#006988] text-[14px] font-[600] leading-[20px] text-white hover:bg-[#006988] hover:text-white"
              onClick={handleAlertClose}
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Step3;
