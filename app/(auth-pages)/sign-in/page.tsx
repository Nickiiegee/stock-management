import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/ui/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    // flex-1 flex flex-col min-w-64 dark:bg-gray-800 rounded-lg p-8 backdrop-blur-md
    <div className="flex min-h-screen flex-col justify-center dark:bg-gray-800">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-bold text-primary">Seatrench</h1>
          <p className="text-sm text-muted-foreground">
            Advanced Inventory Management System
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <form>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required />
                {/* <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={credentials.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                /> */}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    className="text-xs text-foreground underline"
                    href="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  required
                />
              </div>
            </CardContent>

            <CardFooter>
              <SubmitButton
                pendingText="Signing In..."
                formAction={signInAction}
              >
                Sign in
              </SubmitButton>
              <FormMessage message={searchParams} />
            </CardFooter>
          </form>
        </Card>

        <p className="px-6 text-center text-sm text-muted-foreground">
          Please note that you'll need to be invited by an Admin to access this
          system.
        </p>
      </div>
    </div>
    // <form className="flex-1 flex flex-col min-w-64 dark:bg-gray-800 rounded-lg p-8 backdrop-blur-md">
    // <div className="flex flex-col space-y-2 text-center">
    //   <h1 className="text-3xl font-bold text-primary">Seatrench</h1>
    //   <p className="text-sm text-muted-foreground">
    //     Advanced Inventory Management System
    //   </p>
    // </div>
    //   <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
    //     <Label htmlFor="email">Email</Label>
    //     <Input name="email" placeholder="you@example.com" required />
    //     <div className="flex justify-between items-center">
    //       <Label htmlFor="password">Password</Label>
    //       <Link
    //         className="text-xs text-foreground underline"
    //         href="/forgot-password"
    //       >
    //         Forgot Password?
    //       </Link>
    //     </div>
    //     <Input
    //       type="password"
    //       name="password"
    //       placeholder="Your password"
    //       required
    //     />
    //     <SubmitButton pendingText="Signing In..." formAction={signInAction}>
    //       Sign in
    //     </SubmitButton>
    //     <FormMessage message={searchParams} />
    //   </div>
    // </form>
  );
}
