"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function TrenchingDashboard() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-full text-center justify-center">
        <h2 className="text-2xl">Development still to be discussed</h2>
        <p>This is for demonstration purposes only!</p>
      </div>
    </QueryClientProvider>
  );
}
