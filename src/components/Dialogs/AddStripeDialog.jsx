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
import usePaymentSetupMutate from "@/hooks/QueryHooks/Host/Payment/PaymentSetup/usePaymentSetupMutate";
import useCountryList from "@/hooks/QueryHooks/Host/useCountryList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import LoadingComponent from "../LoadingComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AddStripeDialog = ({ open, onOpenChange }) => {
  const { data, isPending: PendingCountry } = useCountryList();
  const { mutate, isPending } = usePaymentSetupMutate();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      account_type: "Stripe",
      stripe_email: "",
      account_setup_type: "Individual",
      stripe_country: "",
      stripe_type: "",
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset({
        account_type: "Stripe",
        stripe_email: "",
        account_setup_type: "Individual",
        stripe_country: "",
        stripe_type: "",
      });
    }
  }, [open, form]);

  const handleSubmit = (values) => {
    mutate(values, {
      onSuccess: (response) => {
        onOpenChange(false);
        toast.success("Success! Please add your stripe account.");
        if (response?.data?.original?.onboarding_url) {
          router.replace(response?.data?.original?.onboarding_url);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      },
    });
  };

  // Common classes for form elements
  const commonInputClasses =
    "rounded-[10px] border border-[#DEDEDE] bg-white px-5 py-3 text-[14px] font-[500] leading-[20px] text-[#868686] placeholder:text-[#868686]";

  return (
    <>
      {PendingCountry ? (
        <LoadingComponent />
      ) : (
        <DialogContent
          isClose={false}
          className="w-full rounded-[10px] border-none bg-[#0A2A3C] p-0 sm:w-[428px]"
        >
          <DialogTitle
            className={
              "flex h-[45px] items-center justify-center rounded-tl-[10px] rounded-tr-[10px] bg-[#00A481] text-[20px] font-bold leading-[28px] text-white"
            }
          >
            Add Payment Method
          </DialogTitle>

          <DialogDescription className="mx-3 my-5 sm:mx-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  control={form.control}
                  name="account_type"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel className="text-[14px] font-medium leading-[20px] text-[#DEDEDE]">
                        Payment Method
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="rounded-[10px] border border-[#868686]">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Stripe">Stripe</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stripe_email"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel className="text-[14px] font-medium leading-[20px] text-[#DEDEDE]">
                        Account Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className={commonInputClasses}
                          placeholder="Write your account email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stripe_country"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel className="text-[14px] font-medium leading-[20px] text-[#DEDEDE]">
                        Country
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="rounded-[10px] border border-[#868686]">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.data?.map((item) => (
                            <SelectItem key={item?.id} value={item?.short_name}>
                              {item?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stripe_type"
                  render={({ field }) => (
                    <FormItem className="mb-10">
                      <FormLabel className="text-[14px] font-medium leading-[20px] text-[#DEDEDE]">
                        Account type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="rounded-[10px] border border-[#868686]">
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">
                            Stripe Standard
                          </SelectItem>
                          <SelectItem value="express">
                            Stripe Express
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="h-[35px] w-[145px] rounded-[5px] border border-[#006988] bg-white text-[14px] font-[600] leading-[20px] text-[#006988]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className={
                      "h-[35px] w-[145px] rounded-[5px] bg-[#00A481] text-[14px] font-[600] leading-[20px] text-white"
                    }
                  >
                    Save
                  </button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogContent>
      )}
    </>
  );
};

export default AddStripeDialog;
