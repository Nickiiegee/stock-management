import { useAddItems } from "@/utils/useItems";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
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
  // Replaced MUI components with TailwindCSS styling
  return (
    <div
      className={`fixed inset-0 ight:bg-white dark:bg-slate-900 flex items-center justify-center z-50 ${open ? "block" : "hidden"}`}
    >
      <div className="bg-white dark:bg-black rounded-lg shadow-lg w-full max-w-md">
        <div className="border-b px-4 py-2">
          <h2 className="text-lg font-semibold">Add New Items</h2>
        </div>
        <div className="p-4 space-y-4">
          <Button
            className="px-4 py-2 rounded-md"
            onClick={handleAddItemToList}
          >
            Add Item
          </Button>
          <div className="flex flex-col gap-4 divide-y divide-gray-300">
            {items.map((item, idx) => (
              <div
                className="flex flex-col md:flex-row md:items-center md:gap-4"
                key={idx}
              >
                <div className="flex-1 mb-2 md:mb-0">
                  <label className="block text-sm font-medium mb-1 mt-2">
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
                  <label className="block text-sm font-medium mb-1 mt-2">
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
        </div>
        <div className="border-t px-4 py-2 flex justify-end space-x-2">
          <Button
            className="px-4 py-2 rounded-md"
            variant={"outline"}
            onClick={handleClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            className="px-4 py-2 rounded-md"
            onClick={handleAddItems}
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
}
