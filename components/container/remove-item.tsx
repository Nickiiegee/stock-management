import { useDeleteStockItem } from "@/utils/useContainerSections";
import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { Button } from "../ui/button";
import { useAlert } from "../snackbar";

const RemoveItemPopup: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}> = ({ onConfirm, onCancel, isPending }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

const RemoveStockItem = ({ item }: { item: any }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { mutate: deleteStockItem, isPending } = useDeleteStockItem();
  const showAlert = useAlert();

  const handleDelete = () => {
    deleteStockItem(item.id, {
        onSuccess: () => {
          showAlert("Removed item successfully.", "success");
          handleCancel();
        },
        onError: (err) => {
          console.error(err);
          showAlert("Failed to remove item. Please try again.", "error");
        },
      });
    setIsPopupVisible(false);
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => setIsPopupVisible(true)}
        className="px-2 py-2 rounded hover:text-red-700"
      >
        <FiTrash />
      </Button>
      {isPopupVisible && (
        <RemoveItemPopup
          onConfirm={handleDelete}
          onCancel={handleCancel}
          isPending={isPending}
        />
      )}
    </div>
  );
};

export default RemoveStockItem;
