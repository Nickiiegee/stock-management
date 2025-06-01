import { useAddStockItems } from "@/utils/useContainerSections";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useAlert } from "../snackbar";
import { Button } from "../ui/button";

interface BulkUpdateModalProps {
  sectionId: string;
  open: boolean;
  onClose: () => void;
}

const ModalContent = ({ sectionId, open, onClose }: BulkUpdateModalProps) => {
  const [items, setItems] = useState<any[]>([]);
  const { mutate: addStock, isPending } = useAddStockItems();
  const showAlert = useAlert();

  const handleAddItemToList = () => {
    setItems([...items, { section_id: sectionId }]);
  };

  const handleClose = () => {
    onClose();
    setItems([]);
  };

  const handleAddStock = () => {
    addStock(items, {
      onSuccess: () => {
        showAlert("Added new stock successfully.", "success");
        handleClose();
      },
      onError: (err) => {
        console.error(err);
        showAlert("Failed to add new stock. Please try again.", "error");
        // showAlert(`${err?.message}`, "error");
      },
    });
  };
  // Replaced MUI components with TailwindCSS styling
  return (
    <div
      className={`fixed bg-black bg-opacity-50 inset-0 flex items-center justify-center z-50 ${open ? "block" : "hidden"}`}
    >
      <div className="bg-white dark:bg-black rounded-lg shadow-lg w-full max-w-4xl">
        <div className="px-5 py-2">
          <div className="flex justify-between border-b px-4 mb-6">
            <h2 className="text-lg font-semibold mt-4">Add New Items</h2>
            <div className="p-1 justify-end">
              <Button
                variant="outline"
                className="flex justify-end ml-auto"
                onClick={handleAddItemToList}
              >
                <IoMdAdd />
                Add Item
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 divide-y divide-gray-300 max-h-[65vh] overflow-y-auto">
            {items.map((item, idx) => (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                key={idx}
              >
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1 mt-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter item name"
                    value={item.item_name}
                    onChange={(e) => {
                      setItems(
                        items.map((i, index) => {
                          if (index === idx) {
                            return { ...i, item_name: e.target.value };
                          }
                          return i;
                        })
                      );
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1 mt-2">
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                    value={item.description || ""}
                    onChange={(e) => {
                      setItems(
                        items.map((i, index) => {
                          if (index === idx) {
                            return { ...i, description: e.target.value };
                          }
                          return i;
                        })
                      );
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1 mt-2">
                    Serial No
                  </label>
                  <input
                    type="text"
                    id="serial_no"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter serial number"
                    value={item.serial_no || ""}
                    onChange={(e) => {
                      setItems(
                        items.map((i, index) => {
                          if (index === idx) {
                            return { ...i, serial_no: e.target.value };
                          }
                          return i;
                        })
                      );
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1 mt-2">
                    Count
                  </label>
                  <input
                    type="number"
                    id="stock_on_hand"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter stock count"
                    value={item.stock_on_hand}
                    onChange={(e) => {
                      setItems(
                        items.map((i, index) => {
                          if (index === idx) {
                            return {
                              ...i,
                              stock_on_hand: parseInt(e.target.value),
                            };
                          }
                          return i;
                        })
                      );
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1 mt-2">
                    Min Threshold
                  </label>
                  <input
                    type="number"
                    id="threshold"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter threshold"
                    value={item.threshold}
                    onChange={(e) => {
                      setItems(
                        items.map((i, index) => {
                          if (index === idx) {
                            return {
                              ...i,
                              threshold: parseInt(e.target.value),
                            };
                          }
                          return i;
                        })
                      );
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1 mt-2">
                    Lead Time
                  </label>
                  <input
                    type="text"
                    id="lead_time"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter lead time"
                    value={item.lead_time || ""}
                    onChange={(e) => {
                      setItems(
                        items.map((i, index) => {
                          if (index === idx) {
                            return { ...i, lead_time: e.target.value };
                          }
                          return i;
                        })
                      );
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1 mt-2">
                    Priority
                  </label>
                  <input
                    type="text"
                    id="priority"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter priority"
                    value={item.priority || ""}
                    onChange={(e) => {
                      setItems(
                        items.map((i, index) => {
                          if (index === idx) {
                            return { ...i, priority: e.target.value };
                          }
                          return i;
                        })
                      );
                    }}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1 mt-2">
                    Notes
                  </label>
                  <input
                    type="text"
                    id="notes"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                    value={item.notes || ""}
                    onChange={(e) => {
                      setItems(
                        items.map((i, index) => {
                          if (index === idx) {
                            return { ...i, notes: e.target.value };
                          }
                          return i;
                        })
                      );
                    }}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <Button
                    aria-label="Remove item"
                    onClick={() => {
                      setItems(items.filter((i, index) => index !== idx));
                    }}
                  >
                    {/* <FiTrash /> */}
                    <span>Remove Item</span>
                  </Button>
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
            onClick={handleAddStock}
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function AddStockModal({ sectionId }: { sectionId: string }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  return (
    <div>
      <Button variant="ghost" onClick={() => setIsPopupVisible(true)}>
        <IoMdAdd />
        {/* Add Stock */}
      </Button>
      {isPopupVisible && (
        <ModalContent
          sectionId={sectionId}
          open={isPopupVisible}
          onClose={handleCancel}
        />
      )}
    </div>
  );
}
