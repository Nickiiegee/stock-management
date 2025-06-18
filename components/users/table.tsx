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
import { Pencil, Search } from "lucide-react";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { useAlert } from "../snackbar";
import { useDeleteUserProfile, useUpdateUserProfile } from "@/utils/useUserProfiles";
import { RemoveUserPopup } from "./remove-user";
import { deleteUserAction } from "@/app/actions";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
  last_active: string;
}

export default function UsersTable({
  users,
  role,
}: {
  users: UserProfile[];
  role: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [editUserData, setEditUserData] = useState<Partial<UserProfile>>({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { mutate: updateUserProfile } = useUpdateUserProfile();
  const { mutate: deleteUserProfile, isPending } = useDeleteUserProfile();
  const showAlert = useAlert();

  const filteredUsers = users.filter(
    (user: UserProfile) =>
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartEdit = (user: UserProfile) => {
    setEditUserId(user.id);
    setEditUserData(user);
  };

  const handleChange = (field: keyof UserProfile, value: any) => {
    setEditUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    if (editUserId && editUserData) {
      updateUserProfile(
        { id: editUserId, ...editUserData },
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
      setEditUserId(null);
      setEditUserData({});
    }
  };

  const handleDelete = async () => {
    if (editUserId) {
      deleteUserProfile(editUserId, {
        onSuccess: () => {
          showAlert("Removed user successfully.", "success");
          handleCancel();
          setIsPopupVisible(false);
        },
        onError: (err) => {
          console.error(err);
          showAlert("Failed to user item. Please try again.", "error");
        },
      });
      await deleteUserAction(editUserId)
    }
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User List</h2>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="w-full bg-white dark:bg-background pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              {/* <TableHead>Status</TableHead> */}
              <TableHead>Last Sign In</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user: UserProfile) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {editUserId === user.id ? (
                    <Input
                      value={editUserData.full_name || ""}
                      onChange={(e) =>
                        handleChange("full_name", e.target.value)
                      }
                    />
                  ) : (
                    user.full_name
                  )}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {editUserId === user.id ? (
                    <select
                      className="border rounded px-2 py-1 bg-white dark:bg-background"
                      value={editUserData.role || ""}
                      onChange={(e) => handleChange("role", e.target.value)}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  ) : (
                    <Badge
                      variant={user.role === "admin" ? "default" : "secondary"}
                    >
                      {user.role}
                    </Badge>
                  )}
                </TableCell>
                {/* <TableCell>
                  <Badge
                    variant={
                      user.status === "Active"
                        ? "default"
                        : user.status === "Pending"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell> */}
                <TableCell>{user.last_active ?? "Never"}</TableCell>
                <TableCell className="text-right">
                  {editUserId === user.id ? (
                    <>
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
                        onClick={() => setEditUserId(null)}
                      >
                        <GiCancel />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={role !== "admin"}
                        onClick={() => {
                          handleStartEdit(user);
                        }}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                      </Button>
                      <Button
                        variant="ghost"
                        disabled={role !== "admin"}
                        onClick={() => {
                          setEditUserId(user.id)
                          setIsPopupVisible(true);
                        }}
                      >
                        <FiTrash className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
            {isPopupVisible && (
              <RemoveUserPopup
                onConfirm={handleDelete}
                onCancel={handleCancel}
                isPending={isPending}
              />
            )}
    </div>
  );
}
