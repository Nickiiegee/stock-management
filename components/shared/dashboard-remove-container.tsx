import React, { useState } from "react";
import { Button } from "../ui/button";

type RemoveContainerDialogProps = {
  onConfirm: () => void;
  onCancel?: () => void;
};

const RemoveContainerPopup: React.FC<RemoveContainerDialogProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Remove Container
        </h2>
        <div>
          You are about to delete this container completely. Are you sure about
          this action? This action is irreversible.
        </div>
        <div className="flex justify-end space-x-4">
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="default">
            {/* {isPending ? "Removing..." : "Confirm"} */}
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export const RemoveContainerDialog: React.FC<RemoveContainerDialogProps> = ({
  onConfirm
}) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <>
      <button
        className="w-full px-4 py-2 text-left text-red-600 hover:bg-muted"
        onClick={() => {
          setOpen(true);
        }}
        role="button"
        tabIndex={0}
      >
        Remove
      </button>

      {open && (
        <RemoveContainerPopup
          onConfirm={handleConfirm}
          onCancel={() => setOpen(false)}
        />
      )}
    </>
  );
};
