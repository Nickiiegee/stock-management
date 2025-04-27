'use client';
import AdminDashboard from "@/components/dashboard";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from "react";

export default function Dashboard () {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AdminDashboard />
    </QueryClientProvider>
  );
}