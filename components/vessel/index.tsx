"use client";

import { useFetchContainers } from "@/utils/useContainerSections";
import React from "react";
import AddContainer from "../shared/dashboard-add-inventory";
import { ContainerCard } from "../shared/dashboard-card";

const VesselDashboard: React.FC = () => {
  const { data, isLoading } = useFetchContainers();

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Vessels</h1>
          <div className="flex items-center">
            <AddContainer containerType="vessel" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 w-full sm:grid-cols-2 lg:grid-cols-3">
          {data
            ?.filter((item) => {
              if (item.container === "vessel") return item;
            })
            .map((tile) => (
              <div typeof="card" key={tile.id}>
                <ContainerCard
                  id={tile.id}
                  name={tile.name}
                  container={tile.container}
                  description={tile.description}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VesselDashboard;
