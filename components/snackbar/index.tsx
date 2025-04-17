import React, { createContext, useState, useContext } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

// Define the alert object structure
interface Alert {
  type: "error" | "warning" | "info" | "success";
  message: string;
  title?: string; // Optional title
}

// Define the type for the context function
type AlertContextType = (message: string, type?: Alert["type"]) => void;

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState<Alert>({ type: "error", message: "", title: "" });

  const showAlert: AlertContextType = (message, type = "error") => {
    setAlert({ message, type });
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={alert.type === "warning" ? null : 6000}
        onClose={close}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert onClose={close} severity={alert.type} sx={{ width: "100%" }}>
          {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
