import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useDeleteContainer,
  useUpdateContainerDescription,
} from "@/utils/useContainerSections";
import { CardContent } from "@mui/material";
import {
  ArrowRight,
  Box,
  File,
  Ship,
  ShipWheel,
  WavesIcon,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { createElement, useEffect, useState } from "react";
import { useAlert } from "../snackbar";
import { Button } from "../ui/button";
import { RemoveContainerDialog } from "./dashboard-remove-container";
import { useFetchUserRole } from "@/utils/useFetchUserRole";

export interface WarehouseCardProps {
  id: string;
  name: string;
  container: string;
  description: string;
}

export const ContainerCard = ({
  id,
  name,
  container,
  description,
}: WarehouseCardProps) => {
  // const [role, setRole] = useState("");
  const { data: role } = useFetchUserRole();
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(description || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { mutate: updateContainerDescription } =
    useUpdateContainerDescription();
  const { mutate: removeContainer } = useDeleteContainer();
  const showAlert = useAlert();

  const getIcon = () => {
    switch (container) {
      case "warehouse":
        return Box;
      case "vessel":
        return ShipWheel;
      case "diving":
        return WavesIcon;
      case "trencher":
        return Ship;
      case "survey":
        return File;
      case "welding":
        return Wrench;
      default:
        return Box;
    }
  };

  const handleContainerDescriptionUpdate = async (
    id: string,
    description: string
  ) => {
    updateContainerDescription(
      { id, description },
      {
        onSuccess: () => {
          showAlert("Updated container description.", "success");
        },
        onError: (err: any) => {
          console.error(err);
          showAlert(
            "Failed to update container description. Please try again.",
            "error"
          );
        },
      }
    );
    setIsEditing(false);
    setEditDescription(description);
  };

  const handleRemoveContainer = (id: string) => {
    removeContainer(id, {
      onSuccess: () => {
        showAlert("Successfully removed container.", "success");
      },
      onError: (err: any) => {
        console.error(err);
        showAlert("Failed to removed container. Please try again.", "error");
      },
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{name}</CardTitle>
          {role === "admin" ? (
            <div className="relative">
              <Button
                type="button"
                className="group"
                variant="ghost"
                size="icon"
                aria-label="Container actions"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                {createElement(getIcon())}
              </Button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-black border rounded shadow-lg z-10">
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-muted"
                    onClick={() => {
                      setIsEditing(true);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Edit
                  </button>
                  <RemoveContainerDialog
                    onConfirm={() => handleRemoveContainer(id)}
                  />
                  {/* </button> */}
                </div>
              )}
            </div>
          ) : (
            <div>{createElement(getIcon())}</div>
          )}
        </div>
        {role === "admin" && isEditing ? (
          <form
            className="flex flex-col gap-2"
            onSubmit={async (e) => {
              e.preventDefault();
              setIsSaving(true);
              handleContainerDescriptionUpdate(id, editDescription);
              setIsSaving(false);
            }}
          >
            <input
              className="border rounded px-2 py-1"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              disabled={isSaving}
              autoFocus
            />
            <div className="flex gap-2">
              <Button type="submit" size="sm" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => {
                  setIsEditing(false);
                  setEditDescription(description);
                }}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent />
      <CardFooter className="border-t bg-muted/50 p-2">
        <Link
          href={
            container === "warehouse"
              ? "/warehouse"
              : container === "container"
                ? `/dashboard/${id}`
                : `/${container}/${id}`
          }
          className="flex w-full items-center justify-center gap-1 rounded-sm px-3 py-2 text-sm font-medium text-primary hover:underline"
        >
          View {container}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};
