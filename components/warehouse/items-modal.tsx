"use client";

import { useUpdateItems } from "@/utils/useItems";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface BulkUpdateModalProps {
  country: string;
  items: any[];
  open: boolean;
  onClose: () => void;
}

export default function BulkUpdateModal({
  country,
  items,
  open,
  onClose,
}: BulkUpdateModalProps) {
  const [quantityChanges, setQuantityChanges] = useState<
    { id: number; quantity: number }[]
  >([]);
  const [editedItems, setEditedItems] = useState<
    { id: number; quantity: number }[]
  >([]);
  const { mutate: updateItems, isPending } = useUpdateItems(country);

  const handleClose = () => {
    onClose();
    setQuantityChanges([]);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantityChanges((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
      }
      return [...prev, { id, quantity }];
    });
  };

  const handleUpdate = () => {
    updateItems(quantityChanges, {
        onSuccess: () => {
          alert("Updated successfully");
          handleClose();
        },
        onError: (err) => {
          console.error(err);
          alert("Update failed");
        },
      });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Bulk Update Stock</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2}>
            {items.map((item) => (
              <Box
                key={item.id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body1">{item.name}</Typography>
                <TextField
                  type="number"
                  size="small"
                  sx={{ width: "100px" }}
                  value={quantityChanges[item.quantity]}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            disabled={isPending}
            variant="contained"
          >
            {isPending ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
