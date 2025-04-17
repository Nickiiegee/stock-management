"use client";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "../ui/button";
import ItemsTable from "./items-table";
import { useEffect, useState } from "react";
import BulkUpdateModal from "./items-modal";
import { useItems } from "@/utils/useItems";
import { IoMdAdd } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";
import { getUserRole } from "@/app/actions";
import AddItemsModal from "./items-add-modal";

export default function WarehouseDetails({ location }: { location: string }) {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [role, setRole] = useState("");
  const route = useRouter();
  const { data, isLoading } = useItems(location);

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole();
      if (role === "admin") {
        setRole("admin");
      }
    };
    fetchUserRole();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {openUpdateModal && (
        <BulkUpdateModal
          location={location}
          /* @ts-ignore */
          items={data}
          open={openUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
        />
      )}
      {openAddModal && (
        <AddItemsModal
          location={location}
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
        />
      )}
      <div className="flex justify-start">
        <Button variant="link" className="mb-4" onClick={() => route.back()}>
          <IoMdArrowRoundBack />
        </Button>
        <h1 className="text-3xl font-bold mb-4">
          {location.charAt(0).toUpperCase() + location.slice(1)} Stock
        </h1>
        <div className="flex justify-end ml-auto">
          <Button
            type="submit"
            variant={"outline"}
            className="flex items-center"
            onClick={() => setOpenAddModal(true)}
            disabled={role !== "admin"}
          >
            <span className="hidden sm:block">Add Items</span>
            <IoMdAdd className="block sm:hidden" />
          </Button>
          <Button
            type="submit"
            variant={"outline"}
            className="flex items-center"
            onClick={() => setOpenUpdateModal(true)}
            disabled={role !== "admin"}
          >
            <span className="hidden sm:block">Update Items</span>
            <GrUpdate className="block sm:hidden" />
          </Button>
        </div>
      </div>
      {/* @ts-ignore */}
      <ItemsTable data={data} location={location} />
    </div>
  );
}
