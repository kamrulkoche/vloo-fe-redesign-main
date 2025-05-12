"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { useAuth } from "@/contexts/AuthContext";

export default function MainLayoutProvider({ children }) {
    useAuth();
    const [queryClient] = useState(() => new QueryClient());
    const pathname = usePathname();

    const isShowFooter = pathname.includes("/portal");

    return (
        <div className="container flex flex-col mx-auto max-w-[90rem]">
            <QueryClientProvider client={queryClient}>
                <Navbar />
                <main className="flex-grow ">{children}</main>
                {!isShowFooter && <Footer />}
            </QueryClientProvider>
        </div>
    );
}
