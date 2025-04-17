import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import {
  AlertColor,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useAddItems } from "@/utils/useItems";
import { useAlert } from "../snackbar";
import { Button } from "../ui/button";

interface BulkUpdateModalProps {
  location: string;
  open: boolean;
  onClose: () => void;
}

export default function AddItemsModal({
  location,
  open,
  onClose,
}: BulkUpdateModalProps) {
  const [items, setItems] = useState<{ name: string; quantity: number }[]>([]);
  const { mutate: addItems, isPending } = useAddItems(location);
  const showAlert = useAlert();

  const handleAddItemToList = () => {
    setItems([...items, { name: "", quantity: 0 }]);
  };

  const handleClose = () => {
    onClose();
    setItems([]);
  };

  const handleAddItems = () => {
    addItems(items, {
      onSuccess: () => {
        showAlert("Added new items successfully.", "success");
        handleClose();
      },
      onError: (err) => {
        console.error(err);
        showAlert("Failed to add new items. Please try again.", "error");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Items</DialogTitle>
        <DialogContent dividers>
          <Button variant={"default"} onClick={handleAddItemToList}>Add Item</Button>
          <div className="flex flex-col gap-4 divide-y divide-gray-300">
            {items.map((item, idx) => (
              <div className="flex flex-col md:flex-row md:items-center md:gap-4" key={idx}>
                <div className="flex-1 mb-2 md:mb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter item name"
                    value={item.name}
                    onChange={(e) => {
                      setItems(
                        items.map((i, index) => {
                          if (index === idx) {
                            return { ...i, name: e.target.value };
                          }
                          return i;
                        })
                      );
                    }}
                  />
                </div>
                <div className="flex-1 mb-2 md:mb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter quantity"
                    value={item.quantity}
                    onChange={(e) => {
                      setItems(
                        items.map((i, index) => {
                          if (index === idx) {
                            return {
                              ...i,
                              quantity: parseInt(e.target.value),
                            };
                          }
                          return i;
                        })
                      );
                    }}
                  />
                </div>
                <div className="flex items-end justify-end md:justify-center self-center">
                  <button
                    type="button"
                    className="hover:text-red-700 p-2"
                    aria-label="Remove item"
                    onClick={() => {
                      setItems(items.filter((i, index) => index !== idx));
                    }}
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}
            variant={"outline"} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleAddItems}
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
