import { useDeleteItem } from "@/utils/useItems";
import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";

const RemoveItemPopup: React.FC<{ onConfirm: () => void; onCancel: () => void; isPending: boolean }> = ({
    onConfirm,
    onCancel,
    isPending
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this item?</p>
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
                        {isPending ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const RemoveItem = ({ item, location }: {item: any, location: string }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const { mutate: deleteItem, isPending } = useDeleteItem(location);

    const handleDelete = () => {
        console.log("Item deleted");
        deleteItem(item.id);
        setIsPopupVisible(false);
    };

    const handleCancel = () => {
        setIsPopupVisible(false);
    };

    return (
        <div>
            <button
                onClick={() => setIsPopupVisible(true)}
                className="px-4 py-2 rounded hover:text-red-700"
            >
                <FiTrash />
            </button>
            {isPopupVisible && <RemoveItemPopup onConfirm={handleDelete} onCancel={handleCancel} isPending={isPending} />}
        </div>
    );
};

export default RemoveItem;