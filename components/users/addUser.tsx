"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip } from "@mui/material";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AddUserModal({ role }: { role: string }) {
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });

  const handleInviteUser = async () => {
    // Simulate sending invite (in real app you would use a backend function)
    console.log("Inviting user:", newUser);
    // Optionally: call a mutation to insert into user_profiles and send email
    setNewUser({ name: "", email: "", role: "User" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Tooltip title="Future implementation">
          <span>
            <Button
            // disabled={role !== "admin"}
            disabled={true}
            >
              <Plus className="mr-2 h-4 w-4" />
              Invite User
            </Button>

          </span>

        </Tooltip>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite New User</DialogTitle>
          <DialogDescription>
            Enter the details of the user you want to invite to the system.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Full name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@company.com"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={newUser.role}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  role: e.target.value as "Admin" | "User",
                })
              }
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleInviteUser}>
            Send Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
