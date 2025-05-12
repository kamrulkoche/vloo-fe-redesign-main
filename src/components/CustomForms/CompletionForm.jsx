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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useSignUpMutate from "@/hooks/QueryHooks/Public/Auth/useSignUpMutate";
import useIndustryList from "@/hooks/QueryHooks/Public/Industry/useIndustryList";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/zStore";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  company_name: z.string().min(1, { message: "Company name is required" }),
  industry_id: z.string().min(1, { message: "Industry is required" }),
  location: z.string().optional(),
});

export default function CompletionForm({ type }) {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const { toggleModal } = useModalStore();
  const { data: IndustryList } = useIndustryList();
  const { mutate: signUpMutate, isPending } = useSignUpMutate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      industry_id: "",
      location: "",
    },
  });

  const onSubmit = (data) => {
    const payload = {
      email: session?.user?.email,
      first_name: session?.user?.first_name,
      last_name: session?.user?.last_name,
      company_name: data.company_name,
      industry_id: data.industry_id,
      location: data.location,
      provider_id: session?.user?.provider_id,
      user_type: type,
      status: "Active",
      type: "LinkedIn",
    };

    signUpMutate(payload, {
      onSuccess: async () => {
        // Update the session to mark completion
        await updateSession({ needsCompletion: false, userType: type });

        // Then proceed with navigation and modal
        router.push(type === "User" ? "/" : "/pro");
        // window.location.href = type === "User" ? "/" : "/pro";

        setTimeout(() => {
          toggleModal();
        }, 1000);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Company Name"
                  {...field}
                  className="rounded-[10px] border border-[#868686]"
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
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Location"
                  {...field}
                  className="rounded-[10px] border border-[#868686]"
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
              <FormLabel>Industry</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="rounded-[10px] border border-[#868686]">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {IndustryList?.data?.map((item) => (
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

        {/* Submit Button */}
        <div className="py-4 text-center">
          <Button
            type="submit"
            disabled={isPending}
            className="h-[54px] w-[237px] rounded-[5px] bg-[#006988] hover:bg-[#0C4C60] disabled:opacity-50"
          >
            {isPending ? "Submitting..." : "Complete Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
