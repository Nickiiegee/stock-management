import { signOutAction } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { Search } from "lucide-react";
import { FiLogOut } from "react-icons/fi";
import { ThemeSwitcher } from "../theme/theme-switcher";
import { Button } from "../ui/button";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    user && (
      <nav className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur border-b-orange-500">
        <div className="w-full flex items-center p-3 px-5 text-sm">
          <div className="hidden flex-1 md:flex md:gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search inventory..."
                className="w-full bg-background pl-8"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-1 items-center gap-4 md:flex-initial md:justify-end">
              <ThemeSwitcher />
              <form action={signOutAction}>
                <Button
                  type="submit"
                  variant={"default"}
                  className="flex items-center"
                >
                  <span className="hidden sm:block">Sign out</span>
                  <FiLogOut className="block sm:hidden" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>
    )
  );
}
