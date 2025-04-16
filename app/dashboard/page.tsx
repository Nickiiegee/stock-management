'use client';
import AdminDashboard from "@/components/dashboard";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from "react";

export default function Dashboard () {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-4">Stock Dashboard</h1>
        <AdminDashboard />
      </div>
    </div>
    </QueryClientProvider>
  );
}