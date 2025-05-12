"use client";

import PortalBackButton from "@/components/CustomComponents/PortalBackButton";
import LoadingComponent from "@/components/LoadingComponent";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAccountShow from "@/hooks/QueryHooks/Common/Account/useAccountShow";
import useAccountUpdate from "@/hooks/QueryHooks/Common/Account/useAccountUpdate";
import useCityList from "@/hooks/QueryHooks/Common/Account/useCityList";
import useIndustryList from "@/hooks/QueryHooks/Public/Industry/useIndustryList";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const NUMBER_OF_EMPLOYEES = ["1-9", "10-29", "30-50", "Corporate (50+)"];

const formSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  company_name: z.string().min(1, { message: "Company name is required" }),
  organization_number: z.any().optional(),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\+?[\d\s-]+$/, { message: "Invalid phone number format" }),
  location: z.any().optional(),
  number_of_employee: z.any().optional(),
  industry_id: z.any().optional(),
  city_id: z.string().optional(),
  address: z.any().optional(),
  share_data: z.enum(["Active", "Inactive"]).optional().default("Inactive"),
  use_name_image: z.enum(["Active", "Inactive"]).optional().default("Inactive"),
  "file[]": z.any().optional(),
  type: z.any().optional(),
  account_status: z.any().optional(),
  location: z.any().optional(),
  status: z.string().min(1, { message: "Status is required" }),
});

const AccountPage = () => {
  const fileInputRef = useRef(null);
  const { userType, userData } = useAuth();

  const bgColor = userType === "user" ? "bg-[#83E5EF]" : "bg-[#18A382]";
  const textColor = userType === "user" ? "text-[#0A2A3C]" : "text-[#F3F3F3]";

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [existingFileId, setExistingFileId] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "/assets/images/default-image.jpg",
  );

  const { mutate } = useAccountUpdate(userType);
  const { data, isPending: AccountPending } = useAccountShow(
    userType,
    userData?.uuid,
  );
  const { data: IndustryList } = useIndustryList();
  const { data: CityList } = useCityList(userType);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      company_name: "",
      organization_number: "",
      phone: "",
      type: "Manual",
      account_status: "Active",
      location: "",
      number_of_employee: "",
      industry_id: "",
      city_id: "",
      address: "",
      share_data: "Inactive",
      use_name_image: "Inactive",
      status: "Active",
    },
  });

  // Pre-fill form with existing data when it's loaded
  useEffect(() => {
    if (data?.data && !AccountPending) {
      const userData = data?.data;

      form.reset({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        company_name: userData.company_name || "",
        organization_number: userData.organization_number || "",
        phone: userData.phone || "",
        type: userData.type || "",
        location: userData.location || "",
        account_status: userData.account_status || "",
        number_of_employee: userData.number_of_employee || "",
        industry_id: userData.industry_id?.id?.toString() || "",
        city_id: userData.city_id?.id?.toString() || "",
        address: userData.address || "",
        share_data: userData.share_data || "Inactive",
        use_name_image: userData.use_name_image || "Inactive",
        status: userData?.status || "Active",
      });

      // Set preview image if available
      if (userData.upload_files && userData.upload_files.length > 0) {
        setPreviewImage(userData?.upload_files?.[0]?.file_url || previewImage);
        setExistingFileId(userData?.upload_files?.[0]?.id);
      }
    }
  }, [data, AccountPending, form]);

  const handleImageClick = () => {
    if (isEditMode) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description:
            "Please upload a valid image file (JPEG, JPG, PNG, or WEBP)",
        });
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast({
          variant: "destructive",
          title: "File Too Large",
          description: "File size must be less than 5MB",
        });
        return;
      }

      form.setValue("file[]", file);
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "file[]") {
        formData.append(key, data[key]);
      }
    });

    formData.append("uuid", userData?.uuid);

    if (selectedFile) {
      formData.append("file[]", selectedFile);
    }

    if (existingFileId) {
      formData.append("file_id", existingFileId);
    }

    mutate(formData, {
      onSuccess: () => {
        setIsEditMode(false);
      },
    });
  };

  const handleCancel = () => {
    form.reset(); // Reset to API data
    setIsEditMode(false);
  };

  // Common classes for form elements
  const commonInputClasses = `rounded-[10px] border border-[#13293A99] bg-[#006988] px-5 py-3 text-[14px] font-[500] leading-[20px] text-white placeholder:text-white ${!isEditMode ? "cursor-not-allowed" : ""}`;

  if (AccountPending) {
    return <LoadingComponent />;
  }

  return (
    <div className="flex items-center justify-start">
      <div className="w-full sm:w-[80%]">
        <PortalBackButton title="Account" />

        <div className="mb-5 flex flex-col items-center justify-between gap-3 rounded-[20px] bg-[#006988] px-10 py-5 sm:flex-row sm:items-end">
          <div
            className={`text-center ${isEditMode ? "cursor-pointer" : "cursor-not-allowed"}`}
            onClick={handleImageClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              disabled={!isEditMode}
            />
            <img
              src={previewImage}
              alt="user-image"
              className="mb-3 flex h-[134px] w-[134px] items-center justify-center rounded-full object-cover"
            />
            <p className="text-[16px] font-[500] leading-[22px] text-white">
              {isEditMode ? "Edit image" : "Profile image"}
            </p>
          </div>

          <div className="flex items-end">
            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className={`h-[40px] w-[124px] rounded-[5px] text-[16px] font-[600] leading-[22px] ${textColor} ${bgColor}`}
              >
                Edit Account
              </button>
            )}
          </div>
        </div>

        <div className="rounded-[20px] bg-[#006988] p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        {...field}
                        disabled={!isEditMode}
                        className={commonInputClasses}
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
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        {...field}
                        disabled={!isEditMode}
                        className={commonInputClasses}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        disabled={!isEditMode}
                        className={commonInputClasses}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Company Name"
                        {...field}
                        disabled={!isEditMode}
                        className={commonInputClasses}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry_id"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <select
                        className={`w-full rounded-[10px] border border-[#13293A99] bg-[#006988] px-4 py-3 text-[14px] font-[500] leading-[20px] text-white placeholder:text-white focus:outline-none ${!isEditMode ? "cursor-not-allowed" : ""} ${!isEditMode ? "opacity-50" : ""}`}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        disabled={!isEditMode}
                      >
                        <option value="">Select Industry</option>
                        {IndustryList?.data?.map((item) => (
                          <option key={item?.id} value={String(item?.id)}>
                            {item?.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-5 sm:flex-row sm:gap-11">
                {userType === "host" && (
                  <FormField
                    control={form.control}
                    name="organization_number"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Organization Number"
                            {...field}
                            disabled={!isEditMode}
                            className={commonInputClasses}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {userType === "user" && (
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Location"
                            {...field}
                            disabled={!isEditMode}
                            className={commonInputClasses}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Phone Number"
                          {...field}
                          disabled={!isEditMode}
                          className={commonInputClasses}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {userType === "host" && (
                <>
                  <FormField
                    control={form.control}
                    name="number_of_employee"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <select
                            className={`w-full rounded-[10px] border border-[#13293A99] bg-[#006988] px-4 py-3 text-[14px] font-[500] leading-[20px] text-white placeholder:text-white focus:outline-none ${!isEditMode ? "cursor-not-allowed" : ""} ${!isEditMode ? "opacity-50" : ""}`}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            disabled={!isEditMode}
                          >
                            <option value="">Number of Employees</option>
                            {NUMBER_OF_EMPLOYEES?.map((employeeRange) => (
                              <option key={employeeRange} value={employeeRange}>
                                {employeeRange}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col gap-5 sm:flex-row sm:gap-11">
                    <FormField
                      control={form.control}
                      name="city_id"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <select
                              className={`w-full rounded-[10px] border border-[#13293A99] bg-[#006988] px-4 py-3 text-[14px] font-[500] leading-[20px] text-white placeholder:text-white focus:outline-none ${!isEditMode ? "cursor-not-allowed" : ""} ${!isEditMode ? "opacity-50" : ""}`}
                              value={field.value || ""}
                              onChange={(e) => field.onChange(e.target.value)}
                              disabled={!isEditMode}
                            >
                              <option value="">City</option>
                              {CityList?.data?.map((item) => (
                                <option key={item?.id} value={String(item?.id)}>
                                  {item?.name}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="Address"
                              {...field}
                              disabled={!isEditMode}
                              className={commonInputClasses}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="share_data"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-start space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value === "Active"}
                            onCheckedChange={(checked) =>
                              field.onChange(checked ? "Active" : "Inactive")
                            }
                            disabled={!isEditMode}
                            className={`rounded-[4px] border border-[#DEDEDE] ${!isEditMode ? "cursor-not-allowed" : ""}`}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <label className="text-[13px] font-[500] leading-[18px] text-[#DEDEDE]">
                            Consent to share my data
                          </label>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="use_name_image"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-row items-start space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value === "Active"}
                            onCheckedChange={(checked) =>
                              field.onChange(checked ? "Active" : "Inactive")
                            }
                            disabled={!isEditMode}
                            className={`rounded-[4px] border border-[#DEDEDE] ${!isEditMode ? "cursor-not-allowed" : ""}`}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <label className="text-[13px] font-[500] leading-[18px] text-[#DEDEDE]">
                            Use of name and image for marketing purposes
                          </label>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {isEditMode && (
                <div className="flex items-center gap-5 pt-8">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="h-[50px] w-[117px] rounded-[5px] border border-[#006988] bg-white text-[14px] font-[500] leading-[20px] text-[#0A2A3C]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`h-[50px] w-[117px] rounded-[5px] ${textColor} ${bgColor} text-[14px] font-[500] leading-[20px]`}
                  >
                    Save
                  </button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>

      <div className="w-0 sm:w-[20%]" />
    </div>
  );
};

export default AccountPage;
