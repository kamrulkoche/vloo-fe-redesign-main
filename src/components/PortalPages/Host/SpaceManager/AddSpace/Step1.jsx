"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputFile } from "@/components/ui/input-file";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import useSpaceCreateMutate from "@/hooks/QueryHooks/Host/SpaceManager/Space/useSpaceCreateMutate";
import useSpaceUpdateMutate from "@/hooks/QueryHooks/Host/SpaceManager/Space/useSpaceUpdateMutate";
import useSpaceLayoutList from "@/hooks/QueryHooks/Host/SpaceManager/useSpaceLayoutList";
import useSpaceStepMutate from "@/hooks/QueryHooks/Host/SpaceManager/useSpaceStepMutate";
import useWorkEnvironmentList from "@/hooks/QueryHooks/Host/SpaceManager/useWorkEnvironmentList";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const benefits = [
  { id: "free_coffee_facility", label: "Free Coffee" },
  { id: "free_snacks", label: "Free Snacks" },
  { id: "lounge_facility", label: "Shared Lounge" },
  { id: "parking", label: "Parking" },
  { id: "phone_booth", label: "Phone Booths" },
  { id: "cafe", label: "Cafe" },
];

const Step1 = ({ onComplete, initialData, showSpace, ShowPending, uuid }) => {
  const [fileUpload, setFileUpload] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [existingFileId, setExistingFileId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: createSpace, isPending: isCreatePending } =
    useSpaceCreateMutate();
  const { mutate: updateSpace, isPending: isUpdatePending } =
    useSpaceUpdateMutate();
  const { mutate: updateStep } = useSpaceStepMutate();
  const { data: WorkEnvironmentList } = useWorkEnvironmentList();
  const { data: SpaceLayoutList } = useSpaceLayoutList();

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setFileUpload(file);
    } else {
      setPreviewUrl(null);
      setFileUpload(null);
    }
  };

  const form = useForm({
    defaultValues: initialData || {
      space_name: "",
      unique_identity_description: "",
      description: "",
      company_name: "",
      location: "",
      work_environment_id: "",
      space_layout_id: "",
      free_coffee_facility: "Inactive",
      free_snacks: "Inactive",
      lounge_facility: "Inactive",
      parking: "Inactive",
      phone_booth: "Inactive",
      cafe: "Inactive",
      status: "Active",
    },
  });

  // Update form with existing data when available
  useEffect(() => {
    if (showSpace?.data && !ShowPending) {
      const data = showSpace.data;
      form.reset({
        space_name: data.space_name || "",
        unique_identity_description: data.unique_identity_description || "",
        description: data.description || "",
        company_name: data.company_name || "",
        location: data.location || "",
        work_environment_id: data.work_environment_id?.id?.toString() || "",
        space_layout_id: data.space_layout_id?.id?.toString() || "",
        free_coffee_facility: data.free_coffee_facility || "Inactive",
        free_snacks: data.free_snacks || "Inactive",
        lounge_facility: data.lounge_facility || "Inactive",
        parking: data.parking || "Inactive",
        phone_booth: data.phone_booth || "Inactive",
        cafe: data.cafe || "Inactive",
        status: data.status || "Active",
      });

      // Set preview URL and file ID if image exists
      if (data.upload_files && data.upload_files.length > 0) {
        const file = data.upload_files[0];
        setPreviewUrl(file.file_url);
        setExistingFileId(file.id);
      }
    }
  }, [showSpace, ShowPending, form]);

  const handleSubmit = (values) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!values.space_name) {
        form.setError("space_name", {
          type: "required",
          message: "Space name is required",
        });
        setIsSubmitting(false);
        return;
      }

      // Create FormData instance
      const formData = new FormData();

      // If updating, add uuid
      if (uuid) {
        formData.append("uuid", uuid);
      }

      formData.append("space_name", values.space_name);
      formData.append(
        "unique_identity_description",
        values.unique_identity_description || "",
      );
      formData.append("description", values.description || "");
      formData.append("company_name", values.company_name || "");
      formData.append("location", values.location || "");
      formData.append("work_environment_id", values.work_environment_id || "");
      formData.append("space_layout_id", values.space_layout_id || "");
      formData.append("free_coffee_facility", values.free_coffee_facility);
      formData.append("free_snacks", values.free_snacks);
      formData.append("lounge_facility", values.lounge_facility);
      formData.append("parking", values.parking);
      formData.append("phone_booth", values.phone_booth);
      formData.append("cafe", values.cafe);
      formData.append("status", values.status);

      // Handle file upload
      if (fileUpload) {
        formData.append("file[]", fileUpload);
      }

      // If updating and there's an existing file
      if (uuid && existingFileId) {
        formData.append("file_id", existingFileId);
      }

      const onSuccess = (response) => {
        if (!response?.data?.id) {
          console.error("No space ID received in response");
          setIsSubmitting(false);
          return;
        }

        form.clearErrors();

        if (!uuid) {
          setFileUpload(null);
          setPreviewUrl(null);

          // Update step for newly created space
          updateStep(
            {
              uuid: response.data.uuid, // Use the UUID from the response
              step: "2", // Move to step 2
            },
            {
              onSuccess: () => {
                onComplete(response.data.id, response.data.uuid, response.data);
              },
            },
          );
        } else {
          onComplete(response.data.id, response.data.uuid, response.data);
        }

        setIsSubmitting(false);
      };

      if (uuid) {
        updateSpace(formData, {
          onSuccess,
          onError: (error) => {
            console.error("Error updating space:", error);
            setIsSubmitting(false);
          },
        });
      } else {
        createSpace(formData, {
          onSuccess,
          onError: (error) => {
            console.error("Error creating space:", error);
            setIsSubmitting(false);
          },
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="mb-7 flex flex-col items-center gap-9 md:flex-row">
            <div className="w-full md:w-[60%]">
              <FormField
                control={form.control}
                name="space_name"
                render={({ field }) => (
                  <FormItem className="mb-7">
                    <FormLabel className="mb-3 text-[14px] font-medium leading-[20px] text-white">
                      Space Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Write your workspace name"
                        className="rounded-[10px] border border-white bg-[#006988] px-5 py-3 text-[14px] font-[500] leading-[20px] text-[#DEDEDE] placeholder:text-[#DEDEDE]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unique_identity_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-3 text-[14px] font-medium leading-[20px] text-white">
                      Write what make your space different from other (25 to 40
                      words)*
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Write what make your space different from other"
                        className="rounded-[10px] border border-white bg-[#006988] px-5 py-3 text-[14px] font-[500] leading-[20px] text-[#DEDEDE] placeholder:text-[#DEDEDE]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full md:w-[40%]">
              <InputFile
                key={fileUpload ? fileUpload.name : "file-upload"}
                label="Upload your cover image or video"
                onChange={(e) => {
                  const file = e.target?.files?.[0];
                  handleImageChange(file);
                }}
                preview={previewUrl}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mb-7">
                <FormLabel className="mb-3 text-[14px] font-medium leading-[20px] text-white">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter description"
                    className="rounded-[10px] border border-white bg-[#006988] px-5 py-3 text-[14px] font-[500] leading-[20px] text-[#DEDEDE] placeholder:text-[#DEDEDE]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-11">
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mb-3 text-[14px] font-medium leading-[20px] text-white">
                    Company name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Write your company name"
                      className="rounded-[10px] border border-white bg-[#006988] px-5 py-3 text-[14px] font-[500] leading-[20px] text-[#DEDEDE] placeholder:text-[#DEDEDE]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mb-3 text-[14px] font-medium leading-[20px] text-white">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Add your space full address"
                      className="rounded-[10px] border border-white bg-[#006988] px-5 py-3 text-[14px] font-[500] leading-[20px] text-[#DEDEDE] placeholder:text-[#DEDEDE]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-7 flex items-center gap-11">
            <FormField
              control={form.control}
              name="work_environment_id"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mb-3 text-[14px] font-medium leading-[20px] text-white">
                    Work environment
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-[10px] border border-white bg-[#006988] px-5 py-3 text-[14px] font-[500] leading-[20px] text-[#DEDEDE] placeholder:text-[#DEDEDE]">
                        <SelectValue placeholder="Select work environment" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-[150px]">
                      {WorkEnvironmentList?.data?.map((item) => (
                        <SelectItem key={item?.id} value={String(item?.id)}>
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
              name="space_layout_id"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="mb-3 text-[14px] font-medium leading-[20px] text-white">
                    Space layout
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-[10px] border border-white bg-[#006988] px-5 py-3 text-[14px] font-[500] leading-[20px] text-[#DEDEDE] placeholder:text-[#DEDEDE]">
                        <SelectValue placeholder="Select space layout" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-[150px]">
                      {SpaceLayoutList?.data?.map((item) => (
                        <SelectItem key={item?.id} value={String(item?.id)}>
                          {item?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid w-full grid-cols-1 gap-x-8 gap-y-7 sm:w-[80%] sm:grid-cols-3">
            {benefits.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={item.id}
                render={({ field }) => (
                  <div className="flex items-center justify-between gap-5 sm:gap-10">
                    <p className="text-[16px] font-[500] leading-[22px] text-[#F3F3F3]">
                      {item.label}
                    </p>
                    <div className="flex w-[60px] items-center gap-3">
                      <Switch
                        id={item.id}
                        checked={field.value === "Active"}
                        onCheckedChange={(checked) => {
                          field.onChange(checked ? "Active" : "Inactive");
                        }}
                        className="data-[state=unchecked]:bg-white"
                        thumbClassName="bg-[#0A2A3C]"
                      />
                      <Label
                        htmlFor={item.id}
                        className="text-[16px] font-[500] leading-[22px] text-[#F3F3F3]"
                      >
                        {field.value === "Active" ? "Yes" : "No"}
                      </Label>
                    </div>
                  </div>
                )}
              />
            ))}
          </div>

          <div className="mt-5 flex justify-start gap-5">
            <button
              type="submit"
              disabled={isSubmitting || isCreatePending || isUpdatePending}
              className="h-[50px] w-[117px] rounded-[5px] bg-[#006988] text-[14px] font-[500] leading-[20px] text-white disabled:bg-opacity-70"
            >
              {isSubmitting || isCreatePending || isUpdatePending
                ? "Submitting..."
                : "Next"}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Step1;
