import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserTotals({ users }: { users: any[] }) {
  return (
    <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Total Users</CardTitle>
          <CardDescription>Active and pending users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{users.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Admins</CardTitle>
          <CardDescription>Users with admin privileges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {users.filter((user: any) => user.role === "admin").length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
