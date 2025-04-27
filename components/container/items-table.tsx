"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteStockItem,
  useUpdateStockItem,
} from "@/utils/useContainerSections";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { MdOutlineDriveFileMove } from "react-icons/md";
import { useAlert } from "../snackbar";
import { MoveStockDialog } from "./move-stock-dialog";
import RemoveStockItem from "./remove-item";

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

export default function StockTable({
  data,
  sections,
}: {
  data: any;
  sections: any[];
}) {
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editItemData, setEditItemData] = useState<Partial<StockItem>>({});
  const { mutate: updateStockItem } = useUpdateStockItem();
  const { mutate: deleteStockItem } = useDeleteStockItem();
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState("");
  const showAlert = useAlert();

  const handleOpenMoveDialog = (stockItem: string) => {
    setSelectedStockItem(stockItem);
    setMoveDialogOpen(true);
  };

  const isLowStock = (quantity: number, threshold: number) =>
    quantity <= threshold;

  const handleChange = (field: keyof StockItem, value: any) => {
    setEditItemData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStartEdit = (item: StockItem) => {
    setEditItemId(item.id);
    setEditItemData(item);
  };

  const handleDeleteStock = (item: StockItem) => {
    deleteStockItem(item.id, {
      onSuccess: () => {
        showAlert("Removed stock successfully.", "success");
      },
      onError: (err: any) => {
        console.error(err);
        showAlert("Failed to remove stock. Please try again.", "error");
      },
    });
  };

  const handleSaveEdit = () => {
    if (editItemId && editItemData) {
      updateStockItem(
        { id: editItemId, ...editItemData },
        {
          onSuccess: () => {
            showAlert("Updated stock successfully.", "success");
          },
          onError: (err: any) => {
            console.error(err);
            showAlert("Failed to update stock. Please try again.", "error");
          },
        }
      );
      setEditItemId(null);
      setEditItemData({});
    }
  };

  return (
    <div className="overflow-auto">
      <div className="bg-white shadow-md rounded-lg relative overflow-x-auto">
        {data.stock_items.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Date Amended</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Serial No</TableHead>
                  <TableHead>Lead Time</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Min Threshold</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.stock_items.map((item: any, idx: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell className="font-medium">
                      {item.updated_at}
                    </TableCell>
                    <TableCell className="font-medium">
                      {editItemId === item.id ? (
                        <Input
                          value={editItemData.priority || ""}
                          onChange={(e) =>
                            handleChange("priority", e.target.value)
                          }
                        />
                      ) : (
                        item.priority
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {editItemId === item.id ? (
                        <Input
                          value={editItemData.item_name || ""}
                          onChange={(e) =>
                            handleChange("item_name", e.target.value)
                          }
                        />
                      ) : (
                        item.item_name
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {editItemId === item.id ? (
                        <Input
                          value={editItemData.description || ""}
                          onChange={(e) =>
                            handleChange("description", e.target.value)
                          }
                        />
                      ) : (
                        item.description
                      )}
                    </TableCell>
                    <TableCell>
                      {editItemId === item.id ? (
                        <Input
                          value={editItemData.serial_no || ""}
                          onChange={(e) =>
                            handleChange("serial_no", e.target.value)
                          }
                        />
                      ) : (
                        item.serial_no
                      )}
                    </TableCell>
                    <TableCell>
                      {editItemId === item.id ? (
                        <Input
                          value={editItemData.lead_time || ""}
                          onChange={(e) =>
                            handleChange("lead_time", e.target.value)
                          }
                        />
                      ) : (
                        item.lead_time
                      )}
                    </TableCell>
                    <TableCell>
                      {editItemId === item.id ? (
                        <Input
                          value={editItemData.notes || ""}
                          onChange={(e) =>
                            handleChange("notes", e.target.value)
                          }
                        />
                      ) : (
                        item.notes
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editItemId === item.id ? (
                        <Input
                          type="number"
                          value={editItemData.threshold}
                          min="0"
                          onChange={(e) =>
                            handleChange("threshold", Number(e.target.value))
                          }
                          className="w-24 ml-auto"
                        />
                      ) : (
                        item.threshold
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editItemId === item.id ? (
                        <Input
                          type="number"
                          value={editItemData.stock_on_hand}
                          min="0"
                          onChange={(e) =>
                            handleChange(
                              "stock_on_hand",
                              Number(e.target.value)
                            )
                          }
                          className="w-24 ml-auto"
                        />
                      ) : (
                        <div className="text-right">
                          {isLowStock(item.stock_on_hand, item.threshold) ? (
                            <Badge variant="destructive">
                              {item.stock_on_hand}
                            </Badge>
                          ) : (
                            item.stock_on_hand
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="flex items-center justify-end">
                      {editItemId === item.id ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleSaveEdit}
                          >
                            <FaSave />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditItemId(null)}
                          >
                            <GiCancel />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleStartEdit(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenMoveDialog(item.id)}
                          >
                            <MdOutlineDriveFileMove className="h-4 w-4" />
                          </Button>
                          <RemoveStockItem item={item} />
                          {/* <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteStock(item)}
                          >
                            <FiTrash className="h-4 w-4" />
                          </Button> */}
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <div className="justify-center text-center p-8 dark:text-black">
            <h4>No data found</h4>
          </div>
        )}
      </div>
      {moveDialogOpen && (
        <MoveStockDialog
          open={moveDialogOpen}
          onClose={() => setMoveDialogOpen(false)}
          stockItem={selectedStockItem}
          sections={sections}
        />
      )}
    </div>
  );
}
