"use client";
import { useFetchUserRole } from "@/utils/useFetchUserRole";
import { useUserProfiles } from "@/utils/useUserProfiles";
import AddUserModal from "./addUser";
import UsersTable from "./table";
import UserTotals from "./userTotals";

const UsersPage = () => {
  const { data: users = [], isLoading } = useUserProfiles();
  const { data: role } = useFetchUserRole();

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (users.length === 0) return <>No users</>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage users and their access</p>
        </div>
        <AddUserModal role={role} />
      </div>
      <UserTotals users={users} />
      <UsersTable users={users} role={role} />
    </div>
  );
};

export default UsersPage;
