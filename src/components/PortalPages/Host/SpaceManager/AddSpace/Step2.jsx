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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSpaceStepMutate from "@/hooks/QueryHooks/Host/SpaceManager/useSpaceStepMutate";
import useWorkSpaceDelete from "@/hooks/QueryHooks/Host/SpaceManager/WorkSpace/useWorkSpaceDelete";
import useWorkSpaceDeleteFile from "@/hooks/QueryHooks/Host/SpaceManager/WorkSpace/useWorkSpaceDeleteFile";
import useWorkSpaceUpdate from "@/hooks/QueryHooks/Host/SpaceManager/WorkSpace/useWorkSpaceUpdate";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, Trash2, XCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const workspaceSchema = z.object({
  workspaces: z.array(
    z.object({
      workspace_name: z
        .string()
        .min(1, { message: "Workspace name is required" }),
      number_of_available_desks: z
        .string()
        .min(1, { message: "Number of available desk is required" }),
      number_of_person: z
        .string()
        .min(1, { message: "Number of available desk is required" }),
      price_per_day: z
        .string()
        .min(1, { message: "Number of available desk is required" }),
      status: z.string(),
      files: z.array(z.any()).optional(),
    }),
  ),
});

const Step2 = ({
  spaceId,
  spaceUuid,
  onBack,
  onComplete,
  initialWorkspaces,
}) => {
  const [workspaceCount, setWorkspaceCount] = useState(
    initialWorkspaces?.length || 1,
  );
  const [fileUploads, setFileUploads] = useState({});
  const [previewImages, setPreviewImages] = useState(() => {
    // Initialize with only existing files from API
    const initialPreviews = {};
    const count = initialWorkspaces?.length || 1;

    for (let i = 0; i < count; i++) {
      initialPreviews[i] = {
        existing: initialWorkspaces?.[i]?.upload_files || [],
        new: [],
      };
    }
    return initialPreviews;
  });

  const { mutate: createWorkspace, isPending } = useWorkSpaceUpdate();
  const { mutate: deleteWorkspaceMutation } = useWorkSpaceDelete();
  const { mutate: deleteFile } = useWorkSpaceDeleteFile();
  const { mutate: updateStep } = useSpaceStepMutate();

  const form = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      workspaces: initialWorkspaces?.length
        ? initialWorkspaces.map((workspace) => ({
            workspace_name: workspace.workspace_name || "",
            number_of_available_desks:
              workspace.number_of_available_desks?.toString() || "",
            number_of_person: workspace.number_of_person?.toString() || "",
            price_per_day: workspace.price_per_day?.toString() || "",
            status: workspace.status || "Active",
            files: [], // Don't initialize with upload_files here
            uuid: workspace.uuid || "new",
          }))
        : Array(workspaceCount).fill({
            workspace_name: "",
            number_of_available_desks: "",
            number_of_person: "",
            price_per_day: "",
            status: "Active",
            files: [],
            uuid: "new",
          }),
    },
  });

  const handleSubmit = (values) => {
    const formData = new FormData();

    values.workspaces.forEach((workspace, index) => {
      // Get the workspace's original data if it exists
      const originalWorkspace = initialWorkspaces?.[index];

      // Use original UUID if it exists, otherwise use "new"
      const uuid = originalWorkspace?.uuid || "new";

      formData.append(`uuid[]`, uuid);

      // Rest of the form data
      formData.append(`workspace_name[]`, workspace.workspace_name);
      formData.append(
        `number_of_available_desks[]`,
        workspace.number_of_available_desks,
      );
      formData.append(`number_of_person[]`, workspace.number_of_person);
      formData.append(`price_per_day[]`, workspace.price_per_day);
      formData.append(`space_id[]`, spaceId);
      formData.append(`status[]`, workspace.status);

      // Handle file uploads
      const workspaceFiles = fileUploads[index] || [];
      if (workspaceFiles.length > 0) {
        workspaceFiles.forEach((file) => {
          formData.append(`file${index + 1}[]`, file);
        });
      }
    });

    createWorkspace(formData, {
      onSuccess: () => {
        updateStep(
          {
            uuid: spaceUuid,
            step: "3", // Move to step 3
          },
          {
            onSuccess: () => {
              onComplete();
            },
          },
        );
      },
      onError: (error) => {
        console.error("Error creating/updating workspaces:", error);
      },
    });
  };

  const handleImageChange = (files, index) => {
    if (files && files.length) {
      const filesArray = Array.from(files);

      // Update fileUploads state for form submission
      setFileUploads((prev) => ({
        ...prev,
        [index]: [...(prev[index] || []), ...filesArray],
      }));

      // Read files and update preview state
      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImages((prev) => {
            const currentPreviews = prev[index] || { existing: [], new: [] };
            return {
              ...prev,
              [index]: {
                ...currentPreviews,
                new: [...currentPreviews.new, reader.result],
              },
            };
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (workspaceIndex, imageIndex, type, fileId = null) => {
    if (type === "existing" && fileId) {
      deleteFile(
        { file_id: fileId },
        {
          onSuccess: () => {
            setPreviewImages((prev) => {
              const updatedPreviews = { ...prev };
              updatedPreviews[workspaceIndex].existing = updatedPreviews[
                workspaceIndex
              ].existing.filter((_, idx) => idx !== imageIndex);
              return updatedPreviews;
            });
          },
          onError: (error) => {
            console.error("Error deleting file:", error);
          },
        },
      );
    } else {
      // Remove from preview state
      setPreviewImages((prev) => {
        const updatedPreviews = { ...prev };
        updatedPreviews[workspaceIndex].new = updatedPreviews[
          workspaceIndex
        ].new.filter((_, idx) => idx !== imageIndex);
        return updatedPreviews;
      });

      // Remove from fileUploads
      setFileUploads((prev) => {
        const updatedFiles = { ...prev };
        if (updatedFiles[workspaceIndex]) {
          updatedFiles[workspaceIndex] = updatedFiles[workspaceIndex].filter(
            (_, idx) => idx !== imageIndex,
          );
        }
        return updatedFiles;
      });
    }
  };

  // Modified addWorkspace function
  const addWorkspace = () => {
    const currentWorkspaces = form.getValues("workspaces") || [];
    const newIndex = workspaceCount;

    setWorkspaceCount((prev) => prev + 1);

    // Initialize preview state for new workspace
    setPreviewImages((prev) => ({
      ...prev,
      [newIndex]: { existing: [], new: [] },
    }));

    const newWorkspace = {
      workspace_name: "",
      number_of_available_desks: "",
      number_of_person: "",
      price_per_day: "",
      status: "Active",
      files: [],
      uuid: "new",
    };

    form.setValue("workspaces", [...currentWorkspaces, newWorkspace]);
  };

  const deleteWorkspace = (indexToDelete) => {
    if (workspaceCount > 1) {
      const currentWorkspaces = form.getValues("workspaces");
      const workspaceToDelete = currentWorkspaces[indexToDelete];

      // If workspace has UUID, call delete mutation
      if (workspaceToDelete.uuid) {
        deleteWorkspaceMutation(
          { uuid: workspaceToDelete.uuid },
          {
            onSuccess: () => {
              updateWorkspaceState(indexToDelete);
            },
            onError: (error) => {
              console.error("Error deleting workspace:", error);
            },
          },
        );
      } else {
        // If no UUID (new workspace), just update state
        updateWorkspaceState(indexToDelete);
      }
    }
  };

  const updateWorkspaceState = (indexToDelete) => {
    const currentWorkspaces = form.getValues("workspaces");
    const updatedWorkspaces = currentWorkspaces.filter(
      (_, index) => index !== indexToDelete,
    );

    setWorkspaceCount((prev) => prev - 1);
    form.setValue("workspaces", updatedWorkspaces);

    setPreviewImages((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[indexToDelete];
      return newPreviews;
    });

    setFileUploads((prev) => {
      const newFiles = { ...prev };
      delete newFiles[indexToDelete];
      return newFiles;
    });
  };

  const renderWorkspaceSection = (index) => {
    const previews = previewImages[index] || { existing: [], new: [] };

    return (
      <div key={index}>
        <p className="mb-6 flex items-center gap-3 text-[14px] font-[500] leading-[20px] text-white">
          {index + 1}. Workspace
          <hr className="flex-grow border-t border-[#DEDEDE]" />
          {workspaceCount > 1 && (
            <Trash2
              size={16}
              color="red"
              className="cursor-pointer"
              onClick={() => deleteWorkspace(index)}
            />
          )}
        </p>
        <div className="mb-7 flex flex-col gap-9 md:flex-row">
          <div className="w-full md:w-[60%]">
            <div className="mb-5 flex items-center gap-3">
              <FormField
                control={form.control}
                name={`workspaces.${index}.workspace_name`}
                render={({ field: inputField }) => (
                  <FormItem className="w-full">
                    <FormLabel className="mb-3 text-[14px] font-medium leading-[20px] text-white">
                      Workspace Name
                      {<span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...inputField}
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
                name={`workspaces.${index}.number_of_available_desks`}
                render={({ field: selectField }) => (
                  <FormItem className="w-full">
                    <FormLabel className="mb-3 text-[14px] font-medium leading-[20px] text-white">
                      Number of available desks
                      {<span className="text-red-500">*</span>}
                    </FormLabel>
                    <Select
                      onValueChange={selectField.onChange}
                      defaultValue={selectField.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-[10px] border border-white bg-[#006988] px-5 py-3 text-[14px] font-[500] leading-[20px] text-[#DEDEDE] placeholder:text-[#DEDEDE]">
                          <SelectValue placeholder="Select workspace size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-3">
              <FormField
                control={form.control}
                name={`workspaces.${index}.number_of_person`}
                render={({ field: selectField }) => (
                  <FormItem className="w-full">
                    <FormLabel className="mb-3 text-[14px] font-medium leading-[20px] text-white">
                      Number of person
                      {<span className="text-red-500">*</span>}
                    </FormLabel>
                    <Select
                      onValueChange={selectField.onChange}
                      defaultValue={selectField.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-[10px] border border-white bg-[#006988] px-5 py-3 text-[14px] font-[500] leading-[20px] text-[#DEDEDE] placeholder:text-[#DEDEDE]">
                          <SelectValue placeholder="Select your number of person" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="1-2">1-2</SelectItem>
                        <SelectItem value="1-5">1-5</SelectItem>
                        <SelectItem value="8+">8+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`workspaces.${index}.price_per_day`}
                render={({ field: inputField }) => (
                  <FormItem className="w-full">
                    <FormLabel className="mb-3 text-[14px] font-medium leading-[20px] text-white">
                      Price / day
                      {<span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...inputField}
                        placeholder="Write your price"
                        className="rounded-[10px] border border-white bg-[#006988] px-5 py-3 text-[14px] font-[500] leading-[20px] text-[#DEDEDE] placeholder:text-[#DEDEDE]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full md:w-[40%]">
            <InputFile
              height="h-36"
              label="Add Multiple Images or Videos"
              multiple
              onChange={(e) => {
                const files = e.target?.files;
                if (files) handleImageChange(files, index);
              }}
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {/* Existing files */}
              {previews.existing.map((file, imgIndex) => {
                const isVideo = file.file_url?.match(
                  /\.(mp4|mov|avi|wmv|mkv|webm)$/i,
                );
                return (
                  <div key={`existing-${imgIndex}`} className="relative">
                    {isVideo ? (
                      <video
                        src={file.file_url}
                        className="h-20 w-20 rounded object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={file.file_url}
                        alt={`Existing ${imgIndex}`}
                        className="h-20 w-20 rounded object-cover"
                      />
                    )}
                    <XCircle
                      color="red"
                      size={20}
                      onClick={() =>
                        removeImage(index, imgIndex, "existing", file.id)
                      }
                      className="absolute right-0 top-0 flex cursor-pointer items-center justify-center rounded-full"
                    />
                  </div>
                );
              })}

              {/* New files */}
              {previews.new.map((preview, imgIndex) => {
                // For new files, we need to check if the original file is a video
                const originalFile = fileUploads[index]?.[imgIndex];
                const isVideo = originalFile?.type.startsWith("video/");

                return (
                  <div key={`new-${imgIndex}`} className="relative">
                    {isVideo ? (
                      <video
                        src={preview}
                        className="h-20 w-20 rounded object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={preview}
                        alt={`Preview ${imgIndex}`}
                        className="h-20 w-20 rounded object-cover"
                      />
                    )}
                    <XCircle
                      color="red"
                      size={20}
                      onClick={() => removeImage(index, imgIndex, "new")}
                      className="absolute right-0 top-0 flex cursor-pointer items-center justify-center rounded-full bg-white"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {Array.from({ length: workspaceCount }).map((_, index) =>
          renderWorkspaceSection(index),
        )}

        <button
          type="button"
          onClick={addWorkspace}
          className="mb-5 flex h-[35px] w-[180px] items-center justify-center gap-3 rounded-[5px] bg-[#006988] text-[14px] font-[600] leading-[20px] text-white sm:mb-16"
        >
          Add more workspace
          <CirclePlus className="h-4 w-4 text-white" />
        </button>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={() => {
              form.reset();
              onBack();
            }}
            className="h-[50px] w-[117px] rounded-[5px] border border-[#006988] bg-white text-[#006988]"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="h-[50px] w-[117px] rounded-[5px] bg-[#006988] text-white disabled:bg-opacity-70"
          >
            {isPending ? "Submitting..." : "Next"}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default Step2;
