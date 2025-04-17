"use client";

import { useUpdateItems } from "@/utils/useItems";
import { useState } from "react";
import { useAlert } from "../snackbar";
import { Button } from "../ui/button";

interface BulkUpdateModalProps {
  location: string;
  items: any[];
  open: boolean;
  onClose: () => void;
}

export default function BulkUpdateModal({
  location,
  items,
  open,
  onClose,
}: BulkUpdateModalProps) {
  const [quantityChanges, setQuantityChanges] = useState<
    { id: number; quantity: number }[]
  >([]);
  const { mutate: updateItems, isPending } = useUpdateItems(location);
  const showAlert = useAlert();

  const handleClose = () => {
    onClose();
    setQuantityChanges([]);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantityChanges((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
      }
      return [...prev, { id, quantity }];
    });
  };

  const handleUpdate = () => {
    updateItems(quantityChanges, {
      onSuccess: () => {
        showAlert("Updated Successfully.", "success");
        handleClose();
      },
      onError: (err) => {
        console.error(err);
        showAlert("Failed to update items. Please try again.", "error");
      },
    });
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50 ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-lg font-semibold">Bulk Update Stock</h2>
        <div className="p-4 space-y-4 overflow-y-auto max-h-96">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between space-x-4"
            >
              <span className="text-sm font-medium">{item.name}</span>
              <input
                type="number"
                className="w-24 px-2 py-1 border rounded"
                // @ts-ignore
                value={quantityChanges ? quantityChanges[item.quantity]: 0}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-2 border-t px-4 py-2">

        <Button
          onClick={handleClose}
          variant={"outline"}
          disabled={isPending}
          className="px-4 py-2"
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          variant={"default"}
          disabled={isPending}
          className="px-4 py-2"
        >
          {isPending ? "Updating..." : "Update"}
        </Button>
        </div>
      </div>
    </div>
  );
}
