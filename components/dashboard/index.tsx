"use client";
import React from "react";
import { ContainerCard } from "../shared/dashboard-card";
import AddSection from "./add-container";
import { useFetchContainers } from "@/utils/useContainerSections";
import AddContainer from "./add-container";

const AdminDashboard: React.FC = () => {
  const { data, isLoading } = useFetchContainers();

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center">
            <AddContainer containerType="container" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 w-full sm:grid-cols-2 lg:grid-cols-3">
          {data
            ?.filter((item) => {
              if (
                item.container === "warehouse" ||
                item.container === "container"
              )
                return item;
            })
            .map((tile) => (
              <div typeof="card" key={tile.id}>
                <ContainerCard
                  id={tile.id}
                  name={tile.name}
                  container={tile.container}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
