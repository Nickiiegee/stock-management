"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useUpdateStockItem } from "@/utils/useContainerSections";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { useAlert } from "../snackbar";
import { Textarea } from "../ui/textarea";
import { MoveStockDialog } from "./move-stock-dialog";
import RowMenu from "./row-menu";

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
  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState("");
  const showAlert = useAlert();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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

  const isLowStock = (quantity: number, threshold: number) =>
    quantity <= threshold;

  const handleChange = (field: keyof StockItem, value: any) => {
    setEditItemData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStartEdit = (item: StockItem) => {
    setEditItemId(item.id);
    setEditItemData(item);
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
      <div className="shadow-md rounded-lg relative overflow-x-auto">
        {data.stock_items.length > 0 ? (
          <TableContainer
            sx={{ maxHeight: 600 }}
            className="sticky mb-4 mt-4 max-h-40"
          >
            <Table stickyHeader>
              <TableHead className="bg-gray-100 dark:bg-gray-800">
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableCell>No</TableCell>
                  <TableCell>Date Amended</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Serial No</TableCell>
                  <TableCell>Lead Time</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell className="text-right">Min Threshold</TableCell>
                  <TableCell className="text-right">Count</TableCell>
                  <TableCell className="text-right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.stock_items.map((item: any, idx: any) => (
                  <TableRow key={item.id}>
                    <CustomTableCell className="">{idx + 1}</CustomTableCell>
                    <CustomTableCell>
                      {/* {item.updated_at} */}
                      {new Date(item.updated_at).toLocaleString("en-CA", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </CustomTableCell>
                    <CustomTableCell>
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
                    </CustomTableCell>
                    <CustomTableCell>
                      {editItemId === item.id ? (
                        <Textarea
                          value={editItemData.item_name || ""}
                          onChange={(e) =>
                            handleChange("item_name", e.target.value)
                          }
                        />
                      ) : (
                        item.item_name
                      )}
                    </CustomTableCell>
                    <CustomTableCell>
                      {editItemId === item.id ? (
                        <Textarea
                          value={editItemData.description || ""}
                          onChange={(e) =>
                            handleChange("description", e.target.value)
                          }
                        />
                      ) : (
                        item.description
                      )}
                    </CustomTableCell>
                    <CustomTableCell>
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
                    </CustomTableCell>
                    <CustomTableCell>
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
                    </CustomTableCell>
                    <CustomTableCell>
                      {editItemId === item.id ? (
                        <Textarea
                          value={editItemData.notes || ""}
                          onChange={(e) =>
                            handleChange("notes", e.target.value)
                          }
                        />
                      ) : (
                        item.notes
                      )}
                    </CustomTableCell>
                    <CustomTableCell className="text-right">
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
                    </CustomTableCell>
                    <CustomTableCell className="text-right">
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
                    </CustomTableCell>
                    <CustomTableCell className="flex items-center justify-end">
                      {editItemId === item.id ? (
                        <div className="w-16 flex items-center justify-end space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleSaveEdit}
                          >
                            <FaSave />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditItemId(null)}
                          >
                            <GiCancel />
                          </Button>
                        </div>
                      ) : (
                        <RowMenu
                          item={item}
                          sections={sections}
                          handleStartEdit={handleStartEdit}
                        />
                      )}
                    </CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="justify-center text-center p-8">
            <h4>No stock added yet</h4>
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


export function CustomTableCell({ className, children, ...props }: any) {
  return (
    <TableCell
      {...props}
      className={cn(
        "p-1 align-middle [&:has([role=checkbox])]:pr-0 text-xs text-black dark:text-white",
        className
      )}
      sx={{
        padding: undefined,
        fontSize: undefined,
        fontWeight: undefined,
        color: undefined,
        backgroundColor: undefined,
      }}
    >
      {children}
    </TableCell>
  );
}
