"use client";

import { signOutAction } from "@/app/actions";
import { cn } from "@/lib/utils";
import seatrenchLogo from "@/utils/assets/logo.jpeg";
import {
  BarChart2,
  Box,
  File,
  Home,
  Layers,
  Settings,
  Ship,
  ShipWheel,
  Users,
  WavesIcon,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

interface SidebarItemProps {
  icon: React.ElementType;
  title: string;
  path: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarItem = ({
  icon: Icon,
  title,
  path,
  isActive,
  isCollapsed,
}: SidebarItemProps) => {
  return (
    <Link href={path} className="w-full">
      <div
        className={cn(
          "flex gap-3 rounded-md px-3 py-2 text-sm transition-all",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )}
      >
        <Icon size={20} />
        {isCollapsed && <span>{title}</span>}
      </div>
    </Link>
  );
};

export const MobileSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = usePathname();

  const menuItems = [
    { title: 'Dashboard', icon: Home, path: '/' },
    { title: 'Warehouse', icon: Box, path: '/warehouse' },
    { title: 'Vessels', icon: ShipWheel, path: '/vessel' },
    { title: 'Diving', icon: WavesIcon, path: '/diving' },
    { title: 'Trencher', icon: Ship, path: '/trencher' },
    { title: 'Surveys', icon: File, path: '/surveys' },
    { title: 'Welding', icon: Wrench, path: '/welding' },
    { title: 'Users', icon: Users, path: '/users' },
  ];

  return (
    <>
      <div
        className={cn(
          "flex h-14 items-center justify-between border-b border-b-orange-500 px-3 py-4"
        )}
      >
        <Image
          src={seatrenchLogo}
          alt="Logo"
          width={140}
          height={140}
          className="mr-2"
        />
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "rounded-md p-1.5 dark:text-sidebar-foreground hover:bg-sidebar-accent"
          )}
        >
          <Layers size={20} />
        </button>
      </div>
      {isCollapsed && (
        <div className="fixed top-14 left-0 z-50 h-full w-full bg-sidebar-accent dark:bg-background overflow-auto p-3">
          <nav className="grid gap-1 text-sidebar-foreground">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.path}
                icon={item.icon}
                title={item.title}
                path={item.path}
                isActive={location === item.path}
                isCollapsed={isCollapsed}
              />
            ))}
            <form action={signOutAction}>
              <Button
                type="submit"
                variant={"default"}
                className="fixed bottom-4 left-6"
              >
                Sign out
              </Button>
            </form>
          </nav>
        </div>
      )}
    </>
  );
};
