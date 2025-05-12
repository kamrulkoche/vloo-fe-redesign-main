"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import { DataTable } from "@/components/data-table";
import { DateFormatterType2Function } from "@/components/HelperFunctions/DateFormatterFunctions";
import LoadingComponent from "@/components/LoadingComponent";
import useBookingHistoryList from "@/hooks/QueryHooks/User/useBookingHistoryList";

const BookingHistoryPage = () => {
  const { data, isPending } = useBookingHistoryList();

  const columns = [
    {
      accessorKey: "space_id",
      header: "Space name",
      size: 350,
      cell: ({ row }) => {
        const spaceName = row.original.space_id?.space_name;
        return <div>{spaceName}</div>;
      },
    },
    {
      accessorKey: "booking_start_date",
      header: "Start date",
      cell: ({ row }) => {
        const startDate = row.original.booking_start_date;
        return <div>{DateFormatterType2Function(startDate)}</div>;
      },
    },
    {
      accessorKey: "booking_end_date",
      header: "End date",
      cell: ({ row }) => {
        const endDate = row.original.booking_end_date;
        return <div>{DateFormatterType2Function(endDate)}</div>;
      },
    },
    {
      accessorKey: "price",
      header: "Amount",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusColors = {
          Ongoing: "#FF9F0E",
          Completed: "#1F992B",
        };

        return (
          <div>
            <span
              style={{
                color: statusColors[status],
              }}
            >
              {status}
            </span>
          </div>
        );
      },
    },
    {
      header: "Receipt",
      cell: ({ row }) => {
        return (
          <div>
            <button className="h-[25px] w-[111px] rounded-[5px] border border-[#007AFF] text-[14px] font-[400] leading-[20px] text-[#007AFF]">
              Download
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {isPending ? (
        <LoadingComponent />
      ) : (
        <div>
          <PortalBackButton title="Booking History" />

          <DataTable columns={columns} data={data?.data || []} />
        </div>
      )}
    </>
  );
};

export default BookingHistoryPage;
