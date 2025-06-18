import { useAddContainer } from "@/utils/useContainerSections";
import { useFetchUserRole } from "@/utils/useFetchUserRole";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useAlert } from "../snackbar";
import { Button } from "../ui/button";

const AddContainerPopup: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
  setContainer: any;
  container: string;
  isPending: boolean;
}> = ({ onConfirm, onCancel, container, setContainer, isPending }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Add Container</h2>
        <input
          type="text"
          placeholder="New Container Name"
          value={container}
          onChange={(e) => setContainer(e.target.value)}
          disabled={isPending}
          style={{
            padding: "0.5rem",
            marginRight: "0.5rem",
            marginBottom: "12px",
          }}
        />
        <div className="flex justify-end space-x-4">
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="default">
            Add
            {/* {isPending ? 'Deleting...' : 'Delete'} */}
          </Button>
        </div>
      </div>
    </div>
  );
};

const AddContainer = ({ containerType }: { containerType: string }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [container, setContainer] = useState("");
  const { mutate: addContainer, isPending } = useAddContainer(containerType);
  const { data: role } = useFetchUserRole();
  const showAlert = useAlert();

  const handleAddContainer = () => {
    addContainer(container, {
      onSuccess: () => {
        showAlert("Added new container successfully.", "success");
        handleCancel();
      },
      onError: (err: any) => {
        console.error(err);
        showAlert("Failed to add new container. Please try again.", "error");
      },
    });
    setContainer("");
    setIsPopupVisible(false);
  };

  const handleCancel = () => {
    setContainer("");
    setIsPopupVisible(false);
  };

  return (
    <div>
      <Button
        onClick={() => setIsPopupVisible(true)}
        disabled={role !== "admin"}
      >
        <span className="hidden sm:block">Add Container</span>
        <IoMdAdd className="block sm:hidden" />
      </Button>
      {isPopupVisible && (
        <AddContainerPopup
          onConfirm={handleAddContainer}
          onCancel={handleCancel}
          container={container}
          setContainer={setContainer}
          isPending={isPending}
        />
      )}
    </div>
  );
};

export default AddContainer;
