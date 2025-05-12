"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const router = useRouter();

  const handleRedirect = () => {
    // For Host users, redirect to /pro
    // For normal users, redirect to /
    router.back();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="max-w-md p-8 text-center">
        <div className="mb-4 flex justify-center">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="mb-6 text-gray-600">
          Sorry, you don't have permission to access this page. Please check
          your user type and try again.
        </p>
        <Button onClick={handleRedirect} className="w-full">
          Go Back
        </Button>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
