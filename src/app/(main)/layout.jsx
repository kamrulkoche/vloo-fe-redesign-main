import MainLayoutProvider from "@/components/Layouts/MainLayoutProvider";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({ children }) {
  return (
    <main>
      <MainLayoutProvider>
        {children}
        <Toaster position="top-center" richColors />
      </MainLayoutProvider>
    </main>
  );
}
