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
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { getUserType } from "../HelperFunctions/GetUserTypeFunction";

const formSchema = z.object({
  pin: z.string().min(4, "Please enter the complete OTP code"),
});

const OtpFormDialog = ({ onVerificationSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const userType = getUserType();

  const bgColor = userType === "user" ? "bg-[#00A481]" : "bg-[#006988]";
  const hoverBgColor =
    userType === "user" ? "hover:bg-[#00A481]" : "hover:bg-[#006988]";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleOtpSubmit = async (values) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call - replace with actual verification
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Verify OTP - replace with actual verification logic
      if (values.pin === "1234") {
        form.reset();
        setError("");
        onVerificationSuccess();
      } else {
        setError("Invalid OTP code. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual resend logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      form.reset();
      setError("");
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent
      isClose={false}
      className="w-full rounded-[10px] border-none bg-[#0A2A3C] p-0 sm:w-[428px]"
    >
      <DialogTitle
        className={`flex h-[45px] items-center justify-center rounded-tl-[10px] rounded-tr-[10px] text-[20px] font-bold leading-[28px] text-white ${bgColor}`}
      >
        Change email
      </DialogTitle>

      <DialogDescription className="mx-3 my-5 sm:mx-12">
        <p className="mb-10 mt-5 text-center text-[18px] font-[500] leading-[24px] text-white">
          Please enter the OTP sent to your Email
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOtpSubmit)}
            className="flex flex-col items-center justify-center"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={4} {...field}>
                      <InputOTPGroup className="mb-2">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            {error && (
              <p className="mb-4 text-center text-sm text-red-500">{error}</p>
            )}
            <div className="mb-[52px] mt-[68px] flex items-center gap-[63.5px]">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isLoading}
                className="cursor-pointer text-[14px] font-bold leading-[20px] text-[#3A52E7] underline disabled:opacity-50"
              >
                Resend Code
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`h-[44px] w-[158px] rounded-[5px] text-[12px] font-medium leading-[17px] text-white disabled:opacity-50 ${bgColor} ${hoverBgColor}`}
              >
                {isLoading ? "Verifying..." : "Verify Account"}
              </button>
            </div>
          </form>
        </Form>
      </DialogDescription>
    </DialogContent>
  );
};

export default OtpFormDialog;
