"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function SignUpLayoutProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <main>{children}</main>
      </QueryClientProvider>
    </div>
  );
}
