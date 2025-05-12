import SignUpLayoutProvider from "@/components/SignUpLayout/SignUpLayoutProvider";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function SignUpLayout({ children }) {
  return (
    <main className="flex min-h-screen flex-col">
      <SignUpLayoutProvider>
        {children}
        <Toaster position="top-center" richColors />
      </SignUpLayoutProvider>
    </main>
  );
}
