"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import OTPVerification from "../ProSignUpLayout/OTPVerification";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent } from "../ui/dialog";
import { InputPassword } from "../ui/input-password";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),
    company_name: z.string().min(1, { message: "Company name is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter (A-Z)",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter (a-z)",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message:
          'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)',
      }),
    confirm_password: z
      .string()
      .min(1, { message: "Confirm password is required" }),
    industry: z.string().optional(),
    location: z.string().optional(),
    terms_and_conditions: z.literal(true, {
      errorMap: () => ({ message: "Please accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export default function ProSignUpForm() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      company_name: "",
      password: "",
      confirm_password: "",
      industry: "",
      location: "",
      terms_and_conditions: false,
    },
  });

  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (data) => {
    setEmail(data.email);
    setOtpModalOpen(true);
  };

  const handleOTPSubmit = (otp) => {
    setOtpModalOpen(false);
    router.push("/");
  };

  const handleResendCode = () => {
    console.log("Resend code to", email);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-[20px]">
                <FormLabel>
                  Email address <span className="text-[#CF563F]">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email address"
                    type="email"
                    required
                    {...field}
                    className="rounded-[10px] border border-[#868686]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* First Name and Last Name Fields */}
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="mb-[20px]">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      type="text"
                      {...field}
                      className="!w-[238px] rounded-[10px] border border-[#868686]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="mb-[20px]">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      type="text"
                      {...field}
                      className="!w-[238px] rounded-[10px] border border-[#868686]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Company Name Field */}
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem className="mb-[20px]">
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Company Name"
                    type="text"
                    {...field}
                    className="rounded-[10px] border border-[#868686]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location Field */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="mb-[20px]">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Location"
                    type="text"
                    {...field}
                    className="rounded-[10px] border border-[#868686]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Industry Field */}
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem className="mb-[20px]">
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger className="rounded-[10px] border border-[#868686]">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Creative, design">
                        Creative, design
                      </SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Consulting">Consulting</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password and Confirm Password Fields */}
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-[20px]">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPassword
                      placeholder="Password"
                      type="password"
                      {...field}
                      className="!w-[238px] rounded-[10px] border border-[#868686]"
                    />
                  </FormControl>
                  <FormMessage className="!w-[238px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem className="mb-[20px]">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <InputPassword
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                      className="!w-[238px] rounded-[10px] border border-[#868686]"
                    />
                  </FormControl>
                  <FormMessage className="!w-[238px]" />
                </FormItem>
              )}
            />
          </div>

          {/* Checkbox Terms */}
          <div className="mb-5 mt-4">
            <div className="mb-[10px] flex items-start gap-[14px]">
              <Checkbox
                className="rounded-[4px] border border-[#DEDEDE]"
                id="checkbox-1"
              />
              <label
                htmlFor="checkbox-1"
                className="text-[12px] font-[400] leading-[17px] text-[#868686]"
              >
                I would like to receive email updates and communications from
                VLOO. You can unsubscribe anytime.
              </label>
            </div>
            <FormField
              control={form.control}
              name="terms_and_conditions"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start gap-[14px]">
                    <FormControl>
                      <Checkbox
                        className="rounded-[4px] border border-[#DEDEDE]"
                        id="checkbox-2"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <label
                      htmlFor="checkbox-2"
                      className="text-[12px] font-[400] leading-[17px] text-[#868686]"
                    >
                      I accept the VLOO terms and conditions and understand that
                      I can update my preferences or settings any time in my
                      account.
                    </label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="mb-6 text-center">
            <Button
              type="submit"
              className="h-[54px] w-[237px] rounded-[5px] bg-[#00A481] hover:bg-[#1f7563]"
            >
              <p className="text-[16px] font-semibold leading-[22px] text-white">
                Continue
              </p>
            </Button>
          </div>
        </form>
      </Form>

      {/* OTP Verification Modal */}
      <Dialog open={otpModalOpen} onOpenChange={setOtpModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <OTPVerification
            onSubmit={handleOTPSubmit}
            resendCode={handleResendCode}
            email={email}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
