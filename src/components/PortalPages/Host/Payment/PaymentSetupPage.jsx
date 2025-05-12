"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import { DataTable } from "@/components/data-table";
import AddStripeDialog from "@/components/Dialogs/AddStripeDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import usePaymentSetupList from "@/hooks/QueryHooks/Host/Payment/PaymentSetup/usePaymentSetupList";
import { useState } from "react";

const PaymentSetupPage = () => {
  const [open, setOpen] = useState(false);

  const { data } = usePaymentSetupList();

  const handleDialogChange = (isOpen) => {
    setOpen(isOpen);
  };

  const columns = [
    {
      accessorKey: "account_type",
      header: "Payment method",
      size: 180,
    },
    {
      accessorKey: "stripe_email",
      header: "Account name",
      size: 200,
    },
    {
      accessorKey: "stripe_type",
      header: "Account type",
      cell: ({ row }) => {
        const stripe_type = row.original.stripe_type;
        return (
          <div>
            Stripe {stripe_type.charAt(0).toUpperCase() + stripe_type.slice(1)}
          </div>
        );
      },
    },
    {
      accessorKey: "country_full_name",
      header: "Country",
    },
    {
      accessorKey: "total_paid_amount",
      header: "Paid amount",
    },
    {
      accessorKey: "account_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.account_status;
        const statusColors = {
          Verified: "#3FAD4A",
          Pending: "#868686",
          Rejected: "#CF563F",
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

      <Dialog open={open} onOpenChange={handleDialogChange}>
        <DataTable
          columns={columns}
          data={data?.data || []}
          customContent={
            <DialogTrigger asChild>
              <button className="h-[35px] w-[129px] rounded-[5px] bg-[#AF52DE] text-[14px] font-[600] leading-[20px] text-white">
                Add stripe
              </button>
            </DialogTrigger>
          }
        />

        <AddStripeDialog open={open} onOpenChange={handleDialogChange} />
      </Dialog>
    </div>
  );
};

export default PaymentSetupPage;
