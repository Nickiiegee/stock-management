import { useDeleteStockItem } from "@/utils/useContainerSections";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { MdOutlineDriveFileMove } from "react-icons/md";
import { useAlert } from "../snackbar";
import { MoveStockDialog } from "./move-stock-dialog";
import { RemoveItemPopup } from "./remove-item";
import { useFetchUserRole } from "@/utils/useFetchUserRole";

interface StockItem {
  id: string;
  item_name: string;
  serial_no: string;
  description: string;
  priority: any;
  lead_time: any;
  notes: string;
  stock_on_hand: number;
  threshold: number;
  editing?: boolean;
}

const RowMenu = ({ item, sections, handleStartEdit }: any) => {
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
    const { data: role } = useFetchUserRole();
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

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenMoveDialog = (stockItem: string) => {
    setSelectedStockItem(stockItem);
    setMoveDialogOpen(true);
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        className="text-gray-600 dark:text-gray-50 hover:text-black"
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            handleStartEdit(item);
          }}
          disabled={role !== 'admin'}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenMoveDialog(item.id);
          }}
          disabled={role !== 'admin'}
        >
          <MdOutlineDriveFileMove className="h-4 w-4 mr-2" />
          Move
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setIsPopupVisible(true);
          }}
          disabled={role !== 'admin'}
        >
          <FiTrash className="h-4 w-4 mr-2" /> Remove
        </MenuItem>
      </Menu>
      {moveDialogOpen && (
        <MoveStockDialog
          open={moveDialogOpen}
          onClose={() => setMoveDialogOpen(false)}
          stockItem={selectedStockItem}
          sections={sections}
        />
      )}
      {isPopupVisible && (
        <RemoveItemPopup
          onConfirm={handleDelete}
          onCancel={handleCancel}
          isPending={isPending}
        />
      )}
    </>
  );
};

export default RowMenu;
