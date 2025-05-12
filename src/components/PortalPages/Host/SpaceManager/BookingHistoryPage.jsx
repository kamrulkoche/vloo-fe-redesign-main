"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import { DataTable } from "@/components/data-table";
import { DateFormatterType2Function } from "@/components/HelperFunctions/DateFormatterFunctions";
import useBookingHistoryList from "@/hooks/QueryHooks/Host/SpaceManager/useBookingHistoryList";

const BookingHistoryPage = () => {
  const { data } = useBookingHistoryList();

  const columns = [
    {
      accessorKey: "space_id",
      header: "Space Name",
      size: 250,
      cell: ({ row }) => {
        const space_name = row.original.space_id?.space_name || "";
        return <span>{space_name}</span>;
      },
    },
    {
      accessorKey: "booking_start_date",
      header: "Start date",
      cell: ({ row }) => {
        const booking_date = row.original.booking_start_date || "";
        return <span>{DateFormatterType2Function(booking_date)}</span>;
      },
    },
    {
      accessorKey: "booking_end_date",
      header: "End date",
      cell: ({ row }) => {
        const booking_date = row.original.booking_end_date || "";
        return <span>{DateFormatterType2Function(booking_date)}</span>;
      },
    },
    {
      accessorKey: "customer_id",
      header: "Customer",
      size: 150,
      cell: ({ row }) => {
        const full_name =
          row.original.customer_id?.first_name +
            " " +
            row.original.customer_id?.last_name || "";
        return <span>{full_name}</span>;
      },
    },
    {
      accessorKey: "booking_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.booking_status;
        const statusColors = {
          Approve: "#3FAD4A",
          Cancelled: "#CF563F",
          Processing: "#FF9F0E",
        };

        return (
          <div className="flex items-center">
            <span
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: statusColors[status],
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "8px",
              }}
            />
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
      accessorKey: "price",
      header: "Fee",
      cell: ({ row }) => {
        const price = row.original.price || "";
        return <span>{price} NOK</span>;
      },
    },
  ];

  return (
    <div>
      <PortalBackButton title="History" />

      <DataTable columns={columns} data={data?.data || []} />
    </div>
  );
};

export default BookingHistoryPage;
