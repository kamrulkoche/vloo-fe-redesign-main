import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ErrorDisplayComponent = ({
  title = "Something went wrong",
  message = "Please contact your system administrator for assistance.",
  error,
}) => {
  console.error("Error details:", error);

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Alert
        variant="destructive"
        className="max-w-md border-red-500 bg-[#032031]"
      >
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-semibold text-red-500">
          {title}
        </AlertTitle>
        <AlertDescription className="mt-2 text-gray-300">
          {message}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ErrorDisplayComponent;
