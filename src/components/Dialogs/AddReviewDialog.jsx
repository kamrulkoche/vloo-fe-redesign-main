"use client";

import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import useAddReviewMutate from "@/hooks/QueryHooks/User/useAddReviewMutate";

const AddReviewDialog = ({ open, spaceId, onReviewSuccess }) => {
  const [averageRating, setAverageRating] = useState(0);

  const { mutate, isPending } = useAddReviewMutate();

  const form = useForm({
    defaultValues: {
      final_rate: "",
      impression: "",
      comment: "",
      service_rate: 0,
      location_rate: 0,
      facilities_rate: 0,
      valueOfMoney_rate: 0,
      cleanliness_rate: 0,
      status: "Active",
      space_id: "",
    },
  });

  // Use watch to update UI when form values change
  const watchedRatings = form.watch([
    "service_rate",
    "location_rate",
    "facilities_rate",
    "valueOfMoney_rate",
    "cleanliness_rate",
  ]);

  useEffect(() => {
    if (!open) {
      form.reset({
        impression: "",
        comment: "",
        service_rate: 0,
        location_rate: 0,
        facilities_rate: 0,
        valueOfMoney_rate: 0,
        cleanliness_rate: 0,
        status: "Active",
        space_id: "",
      });
      setAverageRating(0);
    } else if (spaceId) {
      form.setValue("space_id", spaceId);
    }
  }, [open, form, spaceId]);

  // Update average rating whenever any rating changes
  useEffect(() => {
    const ratings = {
      service_rate: form.getValues("service_rate"),
      location_rate: form.getValues("location_rate"),
      facilities_rate: form.getValues("facilities_rate"),
      valueOfMoney_rate: form.getValues("valueOfMoney_rate"),
      cleanliness_rate: form.getValues("cleanliness_rate"),
    };

    const validRatings = Object.values(ratings).filter((r) => r > 0);
    const newAverage =
      validRatings.length > 0
        ? validRatings.reduce((a, b) => a + b, 0) / validRatings.length
        : 0;

    setAverageRating(Number(newAverage.toFixed(1)));
  }, [watchedRatings, form]);

  const handleRatingChange = (criteria, value) => {
    form.setValue(criteria, value);
  };

  const handleSubmit = (values) => {
    const submissionValues = {
      ...values,
      // final_rate: averageRating,
      space_id: spaceId,
    };

    mutate(submissionValues, {
      onSuccess: () => {
        if (onReviewSuccess) {
          onReviewSuccess();
        }
      },
    });
  };

  const commonInputClasses =
    "rounded-[10px] border border-white bg-[#00A481] px-5 py-3 text-[14px] font-[500] leading-[20px] text-white placeholder:text-white";

  const RatingCriteria = ({ label, name }) => {
    const currentValue = form.watch(name);

    return (
      <div className="mb-7 flex items-center justify-between last:mb-0">
        <p className="text-[14px] font-[500] leading-[20px] text-[#0A2A3C]">
          {label}
        </p>
        <div className="flex w-[200px] items-center gap-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleRatingChange(name, value)}
              className={`flex h-6 w-8 items-center justify-center rounded-[5px] ${
                currentValue === value
                  ? "bg-[#00A481] text-white"
                  : "bg-white text-[#13293A99]"
              } text-[14px] font-[600] leading-[20px]`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <DialogContent className="h-4/5 w-full overflow-auto rounded-[10px] border-none bg-[#0A2A3C] p-0 sm:w-[428px]">
      <DialogTitle className="flex h-[45px] items-center justify-center rounded-tl-[10px] rounded-tr-[10px] bg-[#00A481] text-[20px] font-bold leading-[28px] text-white">
        Add review
      </DialogTitle>

      <p className="border-b border-[#F2F2F2] pb-4 text-center text-[18px] font-[700] leading-[24px] text-white">
        2 Seat Comfortable Sharing Workspace
      </p>

      <DialogDescription className="mx-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="mb-1 text-[16px] font-[500] leading-[22px] text-white">
              Rate space
            </p>
            <p className="text-[10px] font-[400] leading-[14px] text-white">
              How satisfied are you after using this space?
            </p>
          </div>
          <div className="flex h-[36px] w-[52px] items-center justify-center rounded-[5px] bg-[#006988]">
            <p className="text-[20px] font-[700] leading-[28px] text-white">
              {averageRating}
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-[10px] bg-[#F3F3F3] px-5 py-6">
          <RatingCriteria label="Service" name="service_rate" />
          <RatingCriteria label="Location" name="location_rate" />
          <RatingCriteria label="Facilities" name="facilities_rate" />
          <RatingCriteria label="Value for Money" name="valueOfMoney_rate" />
          <RatingCriteria label="Cleanliness" name="cleanliness_rate" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="impression"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel className="text-[14px] font-medium leading-[20px] text-[#DEDEDE]">
                    What is your impression about this space?
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={commonInputClasses}
                      placeholder="Write"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="mb-[46px]">
                  <FormLabel className="text-[14px] font-medium leading-[20px] text-[#DEDEDE]">
                    Comment
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className={commonInputClasses}
                      placeholder="Write your comment"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mb-5 flex items-center justify-center">
              <button
                type="submit"
                className="h-[35px] w-[105px] rounded-[5px] bg-[#00A481] text-[14px] font-[600] leading-[20px] text-white"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </Form>
      </DialogDescription>
    </DialogContent>
  );
};

export default AddReviewDialog;
