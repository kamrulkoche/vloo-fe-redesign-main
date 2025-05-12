"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import {
  getUserData,
  getUserType,
} from "@/components/HelperFunctions/GetUserTypeFunction";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import usePrivacySettings from "@/hooks/QueryHooks/Common/Security/usePrivacySettings";
import { useUserSettingsStore } from "@/store/zStore";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PrivacySettingsPage = () => {
  const userType = getUserType();
  const userData = getUserData();
  const updateUserSettings = useUserSettingsStore(
    (state) => state.updateUserSettings,
  );

  const bgColor = userType !== "user" ? "bg-[#006988]" : "bg-[#006988]";

  const { mutate, isPending } = usePrivacySettings(userType);

  // Create default values based on userType
  const defaultValues = useMemo(() => {
    const baseValues = {
      show_name: userData?.show_name === "Yes",
      show_image: userData?.show_image === "Yes",
      get_newsletter: userData?.get_newsletter === "Yes",
      show_contact: userData?.show_contact === "Yes",
    };

    // Add additional fields only for user type
    if (userType === "user") {
      return {
        ...baseValues,
        show_location: userData?.show_location === "Yes",
        personalized_experience: userData?.personalized_experience === "Yes",
      };
    }

    return baseValues;
  }, [userData, userType]);

  const form = useForm({
    defaultValues,
  });

  const handleSubmit = (data) => {
    // Convert boolean values to "Yes"/"No" strings
    const formattedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value ? "Yes" : "No"]),
    );

    // If not user type, remove user-specific fields if they somehow got included
    if (userType !== "user") {
      delete formattedData.show_location;
      delete formattedData.personalized_experience;
    }

    mutate(formattedData, {
      onSuccess: (response) => {
        updateUserSettings(formattedData);
        toast.success(response?.message);
      },
    });
  };

  return (
    <div>
      <PortalBackButton title="Security and Privacy" />

      <div>
        <div className="mt-5 flex items-center justify-start">
          <div className="w-full rounded-[20px] bg-[#0A2A3C] sm:w-[80%]">
            <p className="m-5 text-[16px] font-[600] leading-[22px] text-[#EBF0F3]">
              Privacy settings
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div
                  className={`mx-5 my-5 rounded-[10px] border border-[#FFFFFF] p-5 sm:p-[30px] ${bgColor}`}
                >
                  <p className="mb-5 text-[13px] font-[500] leading-[18px] text-white">
                    We want to make it easy for you to manage and understand
                    your Privacy Settings, so you can use VLOO in the way you
                    want.
                  </p>
                  <div className="space-y-6">
                    {userType === "user" && (
                      <FormField
                        control={form.control}
                        name="show_location"
                        render={({ field }) => (
                          <FormItem className="mb-3 w-full sm:w-3/5">
                            <FormControl>
                              <div className="flex items-center justify-between rounded-[10px] bg-[#0A2A3C] p-3">
                                <Label
                                  htmlFor="show_location"
                                  className="text-[13px] font-[500] leading-[18px] text-white"
                                >
                                  Access to user location
                                </Label>
                                <Switch
                                  className="data-[state=unchecked]:bg-white"
                                  thumbClassName="bg-[#0A2A3C]"
                                  id="show_location"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="show_name"
                      render={({ field }) => (
                        <FormItem className="mb-3 w-full sm:w-3/5">
                          <FormControl>
                            <div className="flex items-center justify-between rounded-[10px] bg-[#0A2A3C] p-3">
                              <Label
                                htmlFor="show_name"
                                className="text-[13px] font-[500] leading-[18px] text-white"
                              >
                                Permission to show your name
                              </Label>
                              <Switch
                                className="data-[state=unchecked]:bg-white"
                                thumbClassName="bg-[#0A2A3C]"
                                id="show_name"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="show_contact"
                      render={({ field }) => (
                        <FormItem className="mb-3 w-full sm:w-3/5">
                          <FormControl>
                            <div className="flex items-center justify-between rounded-[10px] bg-[#0A2A3C] p-3">
                              <Label
                                htmlFor="show_contact"
                                className="text-[13px] font-[500] leading-[18px] text-white"
                              >
                                Hide your contacts from users
                              </Label>
                              <Switch
                                className="data-[state=unchecked]:bg-white"
                                thumbClassName="bg-[#0A2A3C]"
                                id="show_contact"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="show_image"
                      render={({ field }) => (
                        <FormItem className="mb-3 w-full sm:w-3/5">
                          <FormControl>
                            <div className="flex items-center justify-between rounded-[10px] bg-[#0A2A3C] p-3">
                              <Label
                                htmlFor="show_image"
                                className="text-[13px] font-[500] leading-[18px] text-white"
                              >
                                Hide your profile image from users
                              </Label>
                              <Switch
                                className="data-[state=unchecked]:bg-white"
                                thumbClassName="bg-[#0A2A3C]"
                                id="show_image"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="get_newsletter"
                      render={({ field }) => (
                        <FormItem className="mb-3 w-full sm:w-3/5">
                          <FormControl>
                            <div className="flex items-center justify-between rounded-[10px] bg-[#0A2A3C] p-3">
                              <Label
                                htmlFor="get_newsletter"
                                className="text-[13px] font-[500] leading-[18px] text-white"
                              >
                                Get daily newsletter & promotions
                              </Label>
                              <Switch
                                className="data-[state=unchecked]:bg-white"
                                thumbClassName="bg-[#0A2A3C]"
                                id="get_newsletter"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {userType === "user" && (
                      <FormField
                        control={form.control}
                        name="personalized_experience"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <div className="flex items-center justify-between rounded-[10px] bg-[#0A2A3C] p-3">
                                <Label
                                  htmlFor="personalized_experience"
                                  className="text-[13px] font-[500] leading-[18px] text-white"
                                >
                                  Consent turn on settings of more personalized
                                  experience
                                </Label>
                                <Switch
                                  className="data-[state=unchecked]:bg-white"
                                  thumbClassName="bg-[#0A2A3C]"
                                  id="personalized_experience"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className={`mx-5 my-5 h-[50px] w-[117px] rounded-[5px] ${bgColor} text-[14px] font-[500] leading-[20px] text-white ${
                    isPending ? "opacity-50" : ""
                  }`}
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              </form>
            </Form>
          </div>
          <div className="w-0 sm:w-[20%]" />
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingsPage;
