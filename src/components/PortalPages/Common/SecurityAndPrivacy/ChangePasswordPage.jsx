"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import {
  getUserData,
  getUserType,
} from "@/components/HelperFunctions/GetUserTypeFunction";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import useChangePassword from "@/hooks/QueryHooks/Common/Security/useChangePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const passwordSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    new_password: z
      .string()
      .min(8)
      .regex(/[a-zA-Z]/)
      .regex(/[\d!@#$%^&*(),.?":{}|<>]/)
      .regex(/^[^\s]+$/, "Password cannot contain spaces"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

const ChangePasswordPage = () => {
  const userType = getUserType();
  const userData = getUserData();

  const [isEditing, setIsEditing] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const bgColor = userType !== "user" ? "bg-[#006988]" : "bg-[#006988]";
  const hoverBgColor =
    userType !== "user" ? "hover:bg-[#006988]" : "hover:bg-[#006988]";

  const { mutate, isPending } = useChangePassword(userType);

  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    mode: "all", // Changed from onChange to all
    reValidateMode: "onChange",
  });

  const { watch } = form;
  const password = watch("new_password");

  // Password validation states
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumberOrSpecial = /[\d!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= 8;
  const hasNoSpaces = password === "" || !/\s/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowValidationErrors(true);

    const isValid = await form.trigger();

    if (
      !isValid ||
      !hasLetter ||
      !hasNumberOrSpecial ||
      !hasMinLength ||
      !hasNoSpaces
    ) {
      return;
    }

    form.handleSubmit((values) => {
      const payload = {
        current_password: values.current_password,
        new_password: values.new_password,
      };

      mutate(payload, {
        onSuccess: () => {
          setIsSuccessDialogOpen(true);
        },
      });
    })(e);
  };

  const commonInputClasses = `rounded-[10px] border border-white px-5 py-3 text-[14px] font-[500] leading-[20px] text-white placeholder:text-white ${bgColor}`;

  const getValidationLabelClass = (isValid) => {
    if (!showValidationErrors) return "text-white";
    return isValid ? "text-white" : "text-red-500";
  };

  return (
    <div>
      <PortalBackButton title="Security and Privacy" />

      <div>
        <div className="flex items-center justify-start">
          <div className="w-full sm:w-[80%]">
            <div className="rounded-[20px] bg-[#0A2A3C]">
              <p className="px-5 pt-5 text-[16px] font-[600] leading-[22px] text-[#EBF0F3]">
                Change password
              </p>
              <div className="p-5">
                <div
                  className={`flex items-end gap-5 rounded-[10px] border p-5 ${bgColor} sm:p-[30px]`}
                >
                  <div className="flex w-[80%] flex-row sm:flex-col">
                    <div className="mb-5">
                      <p className="mb-3 text-[14px] font-medium leading-[20px] text-white">
                        Current email
                      </p>
                      <Input
                        disabled
                        placeholder={userData?.email}
                        className={commonInputClasses}
                      />
                    </div>

                    {!isEditing ? (
                      <div>
                        <p className="mb-3 text-[14px] font-medium leading-[20px] text-white">
                          Current password
                        </p>
                        <Input
                          disabled
                          placeholder="***************"
                          className={commonInputClasses}
                        />
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={handleSubmit}>
                          <FormField
                            control={form.control}
                            name="current_password"
                            render={({ field }) => (
                              <FormItem className="mb-5">
                                <FormLabel className="text-[14px] font-medium leading-[20px] text-[#DEDEDE]">
                                  Current password
                                </FormLabel>
                                <FormControl>
                                  <InputPassword
                                    type="password"
                                    {...field}
                                    className={commonInputClasses}
                                    placeholder="***************"
                                    onPaste={(e) => {
                                      e.preventDefault(); // Prevent the default paste behavior
                                      const value =
                                        e.clipboardData.getData("text");
                                      field.onChange(value);
                                      form.trigger("current_password");
                                    }}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="new_password"
                            render={({ field }) => (
                              <FormItem className="mb-5">
                                <FormLabel className="text-[14px] font-medium leading-[20px] text-[#DEDEDE]">
                                  New password
                                </FormLabel>
                                <FormControl>
                                  <InputPassword
                                    type="password"
                                    {...field}
                                    className={commonInputClasses}
                                    placeholder="***************"
                                  />
                                </FormControl>
                                <div className="pt-3">
                                  <div className="mb-5 flex items-center gap-3">
                                    <Checkbox
                                      checked={hasLetter}
                                      className="rounded-[4px] border border-[#DEDEDE]"
                                    />
                                    <p
                                      className={`text-[13px] font-[500] leading-[18px] ${getValidationLabelClass(hasLetter)}`}
                                    >
                                      1 letter
                                    </p>
                                  </div>
                                  <div className="mb-5 flex items-center gap-3">
                                    <Checkbox
                                      checked={hasNumberOrSpecial}
                                      className="rounded-[4px] border border-[#DEDEDE]"
                                    />
                                    <p
                                      className={`text-[13px] font-[500] leading-[18px] ${getValidationLabelClass(hasNumberOrSpecial)}`}
                                    >
                                      1 number or special character (example: #
                                      * ^ %)
                                    </p>
                                  </div>
                                  <div className="mb-5 flex items-center gap-3">
                                    <Checkbox
                                      checked={hasMinLength}
                                      className="rounded-[4px] border border-[#DEDEDE]"
                                    />
                                    <p
                                      className={`text-[13px] font-[500] leading-[18px] ${getValidationLabelClass(hasMinLength)}`}
                                    >
                                      8 Characters
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Checkbox
                                      checked={hasNoSpaces}
                                      className="rounded-[4px] border border-[#DEDEDE]"
                                    />
                                    <p
                                      className={`text-[13px] font-[500] leading-[18px] ${hasNoSpaces ? "text-white" : "text-red-500"}`}
                                    >
                                      No spaces allowed
                                    </p>
                                  </div>
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                              <FormItem className="mb-5">
                                <FormLabel className="text-[14px] font-medium leading-[20px] text-[#DEDEDE]">
                                  Confirm password
                                </FormLabel>
                                <FormControl>
                                  <InputPassword
                                    type="password"
                                    {...field}
                                    className={commonInputClasses}
                                    placeholder="***************"
                                    onPaste={(e) => {
                                      e.preventDefault(); // Prevent default paste
                                      const value =
                                        e.clipboardData.getData("text");
                                      field.onChange(value);
                                      form.trigger("confirm_password");
                                    }}
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />

                          <div className="flex items-center justify-between pt-5">
                            <button
                              type="button"
                              onClick={() => {
                                setIsEditing(false);
                                setShowValidationErrors(false);
                                form.reset();
                              }}
                              className="h-[44px] w-[167px] rounded-[5px] bg-[#CF563F] text-[14px] font-[600] leading-[20px] text-white"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={isPending}
                              className={`h-[44px] w-[167px] rounded-[5px] bg-[#0A2A3C] text-[14px] font-[600] leading-[20px] text-white`}
                            >
                              {isPending
                                ? "Changing password..."
                                : "Change password"}
                            </button>
                          </div>
                        </form>
                      </Form>
                    )}
                  </div>
                  <div className="w-[20%]">
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="h-[44px] w-[88px] bg-transparent text-[14px] font-[600] leading-[20px] text-white"
                      >
                        Update
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-0 sm:w-[20%]" />
        </div>
      </div>

      {/* Success Alert Dialog */}
      <AlertDialog
        open={isSuccessDialogOpen}
        onOpenChange={setIsSuccessDialogOpen}
      >
        <AlertDialogContent className="w-full border-none bg-[#0A2A3C] sm:w-[428px]">
          <AlertDialogHeader>
            <p className="text-center text-[20px] font-[700] leading-[28px] text-white">
              Password updated successfully
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex w-full items-center justify-center sm:mt-12">
            <AlertDialogAction
              className={`h-[35px] w-[145px] rounded-[5px] border-none text-[14px] font-[600] leading-[20px] text-white hover:text-white ${bgColor} ${hoverBgColor}`}
              onClick={() => {
                setIsSuccessDialogOpen(false);
                setIsEditing(false);
                setShowValidationErrors(false);
                form.reset();
              }}
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ChangePasswordPage;
