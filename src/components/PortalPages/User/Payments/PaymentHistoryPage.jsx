"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import { DataTable } from "@/components/data-table";

const dummyData = [
  {
    id: 1,
    payment_date: "21 Aug,2024",
    payment_method: "Stripe",
    amount: "NOK 4.65",
    status: "Completed",
  },
  {
    id: 2,
    payment_date: "21 Aug,2024",
    payment_method: "Stripe",
    amount: "NOK 4.65",
    status: "Refunded",
  },
  {
    id: 3,
    payment_date: "21 Aug,2024",
    payment_method: "Stripe",
    amount: "NOK 4.65",
    status: "Refund Pending",
  },
];

const PaymentHistoryPage = () => {
  const columns = [
    {
      accessorKey: "payment_date",
      header: "Payment date",
    },
    {
      accessorKey: "payment_method",
      header: "Payment method",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "status",
      header: "Payment status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusColors = {
          Completed: "#3FAD4A",
          Refunded: "#04B0B6",
          "Refund Pending": "#FF9F0E",
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
    {
      header: "Action",
      id: "actions",
      cell: () => {
        return (
          <button className="h-[25px] w-[92px] rounded-[5px] border border-[#007AFF] text-[14px] font-[400] text-[#007AFF]">
            Download
          </button>
        );
      },
    },
  ];

  return (
    <div>
      <PortalBackButton title="Payment history" />

      <DataTable columns={columns} data={dummyData || []} />
    </div>
  );
};

export default PaymentHistoryPage;
