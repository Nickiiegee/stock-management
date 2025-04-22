"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStockSections } from "@/utils/useStockSections";
import { useWarehouses } from "@/utils/useWarehouses";
import React from "react";
import { StockSectionCard } from "./stock-section-card";
import { WarehouseCard } from "./warehouse-card";

const AdminDashboard: React.FC = () => {
  const { data: warehouses = [], isLoading: loadingWarehouses } =
    useWarehouses();
  // Stock Sections (vessels & equipment)
  const { data: sections = [], isLoading: loadingSections } =
    useStockSections();

  // Filter sections by type
  const vessels = sections.filter((section: any) => section.type === "vessel");
  const diveEquipment = sections.filter(
    (section: any) => section.type === "equipment"
  );

  return (
    <div className="">
      <Tabs defaultValue="warehouses" className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
            <TabsTrigger value="vessels">Vessels</TabsTrigger>
            <TabsTrigger value="equipment">Dive Equipment</TabsTrigger>
          </TabsList>
          <a href="#" className="text-sm text-primary hover:underline">
            View All
          </a>
        </div>

        <TabsContent value="warehouses" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loadingWarehouses ? (
              <div>Loading warehouses...</div>
            ) : (
              warehouses.map((w: any) => (
                <WarehouseCard
                  key={w.id}
                  id={w.id}
                  name={w.name}
                  location={w.location}
                  itemCount={w.itemCount ?? 0}
                  capacityUsed={
                    w.capacity
                      ? Math.round(((w.itemCount ?? 0) / w.capacity) * 100)
                      : 0
                  }
                  lowStockCount={w.lowStockCount ?? 0}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="vessels" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loadingSections ? (
              <div>Loading vessels...</div>
            ) : (
              vessels.map((v: any) => <StockSectionCard key={v.id} {...v} />)
            )}
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loadingSections ? (
              <div>Loading equipment...</div>
            ) : (
              diveEquipment.map((e: any) => (
                <StockSectionCard key={e.id} {...e} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
      {/* {tiles.map((tile) => (
        <div
          typeof="card"
          key={tile.id}
          className="p-4 rounded-lg shadow-md border border-gray-200 justify-center text-center"
        >
          <Link href={`/dashboard/${tile.page}`}>
            <h3 className="text-lg font-semibold mb-2">{tile.title}</h3>
          </Link>
        </div>
      ))} */}
    </div>
  );
};

export default AdminDashboard;
