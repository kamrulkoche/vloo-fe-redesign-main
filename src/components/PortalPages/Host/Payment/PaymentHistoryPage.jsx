"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import { DataTable } from "@/components/data-table";
import { DateFormatterType1Function } from "@/components/HelperFunctions/DateFormatterFunctions";
import usePaymentHistory from "@/hooks/QueryHooks/Host/Payment/PaymentHistory/usePaymentHistory";

const PaymentHistoryPage = () => {
  const { data } = usePaymentHistory();

  const columns = [
    {
      accessorKey: "space_id",
      header: "Space name",
      size: 200,
      cell: ({ row }) => {
        const name = row.original.space_id.space_name;
        return <div>{name}</div>;
      },
    },
    {
      accessorKey: "workspace_id",
      header: "Workspace name",
      size: 200,
      cell: ({ row }) => {
        const name = row.original.workspace_id.workspace_name;
        return <div>{name}</div>;
      },
    },
    {
      accessorKey: "booking_start_date",
      header: "Start date",
      cell: ({ row }) => {
        const date = row.original.booking_start_date;
        return <div>{DateFormatterType1Function(date)}</div>;
      },
    },
    {
      accessorKey: "booking_end_date",
      header: "End date",
      cell: ({ row }) => {
        const date = row.original.booking_end_date;
        return <div>{DateFormatterType1Function(date)}</div>;
      },
    },
    {
      accessorKey: "price",
      header: "Amount",
    },
    {
      accessorKey: "payment_status",
      header: "Payment status",
      size: 200,
      cell: ({ row }) => {
        const status = row.original.payment_status;
        const statusColors = {
          Paid: "#3FAD4A",
          "Not Paid": "#04B0B6",
          Pending: "#FF9F0E",
          Failed: "#868686",
        };

        return (
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-[10px] w-[10px] rounded-full"
              style={{ backgroundColor: statusColors[status] }}
            ></span>
            <span style={{ color: statusColors[status] }}>{status}</span>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PortalBackButton title="Payments" />

      <DataTable columns={columns} data={data?.data || []} />
    </div>
  );
};

export default PaymentHistoryPage;
