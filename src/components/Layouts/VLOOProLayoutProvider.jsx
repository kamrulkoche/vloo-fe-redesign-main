"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";

export default function VLOOProLayoutProvider({ children }) {
    const [queryClient] = useState(() => new QueryClient());
    const pathname = usePathname();

    const isShowFooter = pathname.includes("/pro/portal");

    return (
        <div className="flex flex-col min-h-screen">
            <QueryClientProvider client={queryClient}>
                <Navbar />
                <main className="flex-grow">{children}</main>
                {!isShowFooter && <Footer />}
            </QueryClientProvider>
        </div>
    );
}
