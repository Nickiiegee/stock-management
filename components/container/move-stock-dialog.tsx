import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useMoveStock } from '@/utils/useContainerSections';
import { useAlert } from '../snackbar';

interface MoveStockProps {
    open: any;
    onClose: any;
    stockItem:string;
    sections: any[];
}

export function MoveStockDialog({ open, onClose, stockItem, sections }:MoveStockProps) {
  const [targetSectionId, setTargetSectionId] = useState('');
    const {mutate: moveStockSection} = useMoveStock();
    const showAlert = useAlert();

  const handleMove = () => {
    if (targetSectionId) {
        handleMoveStock(stockItem, targetSectionId);
      setTargetSectionId('');
      onClose();
    }
  };

  const handleMoveStock = async (stockItemId:string, newSectionId:string) => {
    // Call Supabase to move the stock
    moveStockSection({ newSectionId: newSectionId, itemId: stockItemId }, {
        onSuccess: () => {
          showAlert("Updated stock successfully.", "success");
        },
        onError: (err:any) => {
          console.error(err);
          showAlert("Failed to update stock. Please try again.", "error");
        },
      });
      setTargetSectionId('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Move Stock Item</DialogTitle>
      <DialogContent sx={{ minWidth: 300 }}>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="select-section-label">New Section</InputLabel>
          <Select
            labelId="select-section-label"
            value={targetSectionId}
            onChange={(e) => setTargetSectionId(e.target.value)}
            label="New Section"
          >
            {sections.map((section) => (
              <MenuItem key={section.section_id} value={section.section_id}>
                {section.section_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleMove} disabled={!targetSectionId} variant="contained">
          Move
        </Button>
      </DialogActions>
    </Dialog>
  );
}
