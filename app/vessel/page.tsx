'use client';
import VesselDashboard from '@/components/vessel';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from "react";

export default function MainVesselDashboard () {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <VesselDashboard />
    </QueryClientProvider>
  );
}