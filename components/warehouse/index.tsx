"use client";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "../ui/button";
import ItemsTable from "./items-table";
import { useEffect, useState } from "react";
import BulkUpdateModal from "./items-modal";
import { useItems } from "@/utils/useItems";
import { IoMdAdd } from "react-icons/io";
import { getUserRole } from "@/app/actions";

export default function WarehouseDetails({ country }: { country: string }) {
  const [openModal, setOpenModal] = useState(false);
  const [role, setRole] = useState("");
  const route = useRouter();
  const { data, isLoading } = useItems(country);

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
      {openModal && (
        <BulkUpdateModal
        country={country}
        /* @ts-ignore */
          items={data}
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
      <div className="flex justify-start">
        <Button variant="link" className="mb-4" onClick={() => route.back()}>
          <IoMdArrowRoundBack />
        </Button>
        <h1 className="text-3xl font-bold mb-4">
          {country.charAt(0).toUpperCase() + country.slice(1)} Stock
        </h1>
        <div className="flex justify-end ml-auto">
          <Button
            type="submit"
            variant={"outline"}
            className="flex items-center"
            onClick={() => setOpenModal(true)}
            disabled={role !== "admin"}
          >
            <span className="hidden sm:block">Update Items</span>
            <IoMdAdd className="block sm:hidden" />
          </Button>
          {/* <Button onClick={() => setOpenModal(true)} disabled={role !== "admin"}>
                Update Items
            </Button> */}
        </div>
      </div>
      {/* @ts-ignore */}
      <ItemsTable data={data} />
    </div>
  );
}
