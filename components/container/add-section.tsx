import { useAddSection } from "@/utils/useContainerSections";
import { useFetchUserRole } from "@/utils/useFetchUserRole";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useAlert } from "../snackbar";
import { Button } from "../ui/button";

const AddSectionPopup: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
  stockName: string;
  setStockName: Dispatch<SetStateAction<string>>;
  isPending: boolean;
}> = ({ onConfirm, onCancel, stockName, setStockName, isPending }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
      <div className=" rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold  mb-4">
          Add Section
        </h2>
        <input
          type="text"
          placeholder="New section name"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          disabled={isPending}
          style={{ padding: "0.5rem", marginRight: "0.5rem", marginBottom: "1rem" }}
          className="border rounded px-2 py-1 w-full"
        />
        <div className="flex justify-end space-x-4">
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="default">
            {isPending ? "Adding..." : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const AddSection = ({ containerId }: any) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [stockName, setStockName] = useState("");
  const { mutate: addSection, isPending } = useAddSection(containerId);
  const { data: role } = useFetchUserRole(); // Assuming you have a hook to fetch user role
  const showAlert = useAlert();

  const handleAddSection = () => {
    addSection(stockName, {
      onSuccess: () => {
        showAlert("Added new section successfully.", "success");
        handleCancel();
      },
      onError: (err) => {
        console.error(err);
        showAlert("Failed to add new section. Please try again.", "error");
      },
    });
    setStockName("");
    setIsPopupVisible(false);
  };

  const handleCancel = () => {
    setStockName("");
    setIsPopupVisible(false);
  };

  return (
    <div>
      <Button
        onClick={() => setIsPopupVisible(true)}
        disabled={role !== "admin"}
      >
        <span className="hidden sm:block">Add Section</span>
        <IoMdAdd className="block sm:hidden" />
      </Button>
      {isPopupVisible && (
        <AddSectionPopup
          onConfirm={handleAddSection}
          onCancel={handleCancel}
          stockName={stockName}
          setStockName={setStockName}
          isPending={isPending}
        />
      )}
    </div>
  );
};

export default AddSection;
