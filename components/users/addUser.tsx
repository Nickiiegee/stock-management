"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { inviteUserAction } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInviteUser } from "@/utils/useUserProfiles";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useAlert } from "../snackbar";

export default function AddUserModal({ role }: { role: string }) {
  const [newUser, setNewUser] = useState({
    full_name: "",
    email: "",
    role: "user",
    tempPassword: "",
  });
  const [open, setOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutate: inviteUser, isPending, error } = useInviteUser();
  const showAlert = useAlert();

  const handleInviteUser = async () => {
    // Simulate sending invite (in real app you would use a backend function)
    console.log("Inviting user:", newUser);
    const addedUser = await inviteUserAction(newUser);
    // Optionally: call a mutation to insert into user_profiles and send email
    inviteUser(addedUser, {
      onSuccess: () => {
        showAlert("Invited user successfully.", "success");
        setNewUser({
          full_name: "",
          email: "",
          role: "user",
          tempPassword: "",
        }); // Reset form
        setOpen(false);
      },
      onError: (err) => {
        console.error(err);
        showAlert("Failed to invite user. Please try again.", "error");
        // showAlert(`${err?.message}`, "error");
      },
    });
  };

  return (
    <Dialog open={open}>
      <Button
        disabled={role !== "admin"}
        // disabled={true}
        onClick={() => setOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" />
        Invite User
      </Button>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite New User</DialogTitle>
          <DialogDescription>
            Enter the details of the user you want to invite to the system.
          </DialogDescription>
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" onClick={() => setOpen(false)} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Full name"
              value={newUser.full_name}
              onChange={(e) =>
                setNewUser({ ...newUser, full_name: e.target.value })
              }
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
                  role: e.target.value as "admin" | "user",
                })
              }
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tempPassword">Temporary Password</Label>
            <div className="relative">
              <Input
                id="tempPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Ensure you save the password before creating user!"
                value={newUser.tempPassword}
                onChange={(e) =>
                  setNewUser({ ...newUser, tempPassword: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.94 17.94A10.06 10.06 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.02-2.53 2.84-4.66 5.06-6.06M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47M1 1l22 22" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleInviteUser} disabled={isPending}>
            Send Invitation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
