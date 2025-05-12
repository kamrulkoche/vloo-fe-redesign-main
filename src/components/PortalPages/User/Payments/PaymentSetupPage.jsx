"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import { DataTable } from "@/components/data-table";

const dummyData = [
  {
    id: 1,
    payment_method: "Stripe",
    account_name: "Andeas@vloo.co",
    account_type: "Stripe Express",
    country: "Norway",
    balance: "NOK 4.65",
    status: "Active",
  },
  {
    id: 2,
    payment_method: "Stripe",
    account_name: "Andeas@vloo.co",
    account_type: "Stripe Express",
    country: "Norway",
    balance: "NOK 4.65",
    status: "Active",
  },
  {
    id: 3,
    payment_method: "Stripe",
    account_name: "Andeas@vloo.co",
    account_type: "Stripe Express",
    country: "Norway",
    balance: "NOK 4.65",
    status: "Active",
  },
];

const PaymentSetupPage = () => {
  const columns = [
    {
      accessorKey: "payment_method",
      header: "Payment method",
      size: 200,
    },
    {
      accessorKey: "account_name",
      header: "Account name",
      size: 200,
    },
    {
      accessorKey: "account_type",
      header: "Account type",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "balance",
      header: "Balance",
    },
    {
      accessorKey: "status",
      header: "Status",

      cell: ({ row }) => {
        const status = row.original.status;
        const statusColors = {
          Active: "#3FAD4A",
          Inactive: "#868686",
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
      header: "Action",
      id: "actions",
      cell: ({ row }) => {
        return (
          <div onClick={() => DeleteMutate({ uuid: row.original.uuid })}>
            <img
              src="/assets/icons/delete-icon.svg"
              alt="delete-icon"
              className="h-[30px] w-[36px] cursor-pointer"
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <PortalBackButton title="Payment Setup" />

      <DataTable
        columns={columns}
        data={dummyData || []}
        customContent={
          <div className="flex items-center gap-5">
            <button className="h-[35px] w-[129px] rounded-[5px] bg-[#AF52DE] text-[14px] font-[600] leading-[20px] text-white">
              Add stripe
            </button>
          </div>
        }
      />
    </div>
  );
};

export default PaymentSetupPage;
