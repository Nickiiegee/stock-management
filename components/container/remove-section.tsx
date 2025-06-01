import { useRemoveSection } from "@/utils/useContainerSections";
import { useFetchUserRole } from "@/utils/useFetchUserRole";
import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { useAlert } from "../snackbar";
import { Button } from "../ui/button";

const RemoveSectionPopup: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}> = ({ onConfirm, onCancel, isPending }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Delete Section
        </h2>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete this section? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <Button onClick={onCancel} variant="outline" disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="destructive"
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const RemoveSection = ({ sectionId }: { sectionId: string }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { mutate: removeSection, isPending } = useRemoveSection();
  const { data: role } = useFetchUserRole(); // Assuming you have a hook to fetch user role
  const showAlert = useAlert();

  const handleRemoveSection = () => {
    removeSection(sectionId, {
      onSuccess: () => {
        showAlert("Section deleted successfully.", "success");
        handleCancel();
      },
      onError: (err) => {
        console.error(err);
        showAlert("Failed to delete section. Please try again.", "error");
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
        onClick={() => setIsPopupVisible(true)}
        disabled={role !== "admin"}
        variant="ghost"
        className="px-2 py-2 rounded text-red-700"
      >
        <FiTrash />
      </Button>
      {isPopupVisible && (
        <RemoveSectionPopup
          onConfirm={handleRemoveSection}
          onCancel={handleCancel}
          isPending={isPending}
        />
      )}
    </div>
  );
};

export default RemoveSection;
