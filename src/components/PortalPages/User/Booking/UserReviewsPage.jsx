"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import { DataTable } from "@/components/data-table";
import AddReviewDialog from "@/components/Dialogs/AddReviewDialog";
import { DateFormatterType2Function } from "@/components/HelperFunctions/DateFormatterFunctions";
import LoadingComponent from "@/components/LoadingComponent";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useReviewList from "@/hooks/QueryHooks/User/useReviewList";
import { useState } from "react";

const UserReviewsPage = () => {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [selectedSpaceId, setSelectedSpaceId] = useState(null);

  const { data, isPending } = useReviewList();

  const handleDialogChange = (isOpen) => {
    setReviewDialogOpen(isOpen);
    // If dialog is closing and not showing alert, reset selected space ID
    if (!isOpen && !alertDialogOpen) {
      setSelectedSpaceId(null);
    }
  };

  const handleAlertClose = () => {
    setAlertDialogOpen(false);
    setSelectedSpaceId(null);
  };

  const handleReviewSuccess = () => {
    setReviewDialogOpen(false);
    setAlertDialogOpen(true);
  };

  const columns = [
    {
      accessorKey: "space_name",
      header: "Space",
      size: 250,
    },
    {
      accessorKey: "company_name",
      header: "Company",
    },
    {
      accessorKey: "start_date",
      header: "Start date",
      cell: ({ row }) => {
        const startDate = row.original.start_date;
        return <div>{DateFormatterType2Function(startDate)}</div>;
      },
    },
    {
      accessorKey: "end_date",
      header: "End date",
      cell: ({ row }) => {
        const endDate = row.original.end_date;
        return <div>{DateFormatterType2Function(endDate)}</div>;
      },
    },
    {
      accessorKey: "comment",
      header: "Comment",
      size: 250,
      cell: ({ row }) => {
        const comment = row.original.comment;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="text-center text-[14px] text-white">
                  {comment.length > 25
                    ? `${comment.substring(0, 25)}...`
                    : comment}
                </span>
              </TooltipTrigger>
              {comment.length > 25 && (
                <TooltipContent>
                  <p className="text-center text-[14px]">{comment}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => {
        const rating = row.original.rating;

        return (
          <span className="text-[14px] text-[#00A481]">
            {rating ? rating : "- - -"}
          </span>
        );
      },
    },
    {
      header: "Status",
      cell: ({ row }) => {
        const comment = row.original.comment;
        const spaceId = row.original.id;

        return comment === "" ? (
          <DialogTrigger asChild>
            <button
              className="h-[30px] w-[68px] rounded-[5px] border border-[#00A481] text-[14px] font-[400] leading-[20px] text-[#00A481]"
              onClick={() => setSelectedSpaceId(spaceId)}
            >
              Review
            </button>
          </DialogTrigger>
        ) : (
          <span className="text-[14px] text-[#868686]">Reviewed</span>
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
          <PortalBackButton title="User Review" />

          <Dialog open={reviewDialogOpen} onOpenChange={handleDialogChange}>
            <DataTable columns={columns} data={data?.data || []} />
            <AddReviewDialog
              open={reviewDialogOpen}
              spaceId={selectedSpaceId}
              onReviewSuccess={handleReviewSuccess}
            />
          </Dialog>

          <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
            <AlertDialogContent className="w-full border-none bg-[#0A2A3C] sm:w-[428px]">
              <AlertDialogHeader>
                <p className="text-center text-[20px] font-[700] leading-[28px] text-white">
                  Your review has been successfully submitted
                </p>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-6 flex w-full items-center justify-center sm:mt-12">
                <AlertDialogAction
                  className="h-[35px] w-[145px] rounded-[5px] border-none bg-[#00A481] text-[14px] font-[600] leading-[20px] text-white hover:bg-[#00A481] hover:text-white"
                  onClick={handleAlertClose}
                >
                  Close
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </>
  );
};

export default UserReviewsPage;
