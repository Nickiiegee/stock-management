
"use client"

import { useState } from "react"
import { BarChart2, Box, Home, Layers, Settings, Ship, Wrench, Users, ShipWheel, WavesIcon, File } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image";
import seatrenchLogo from "@/utils/assets/logo.jpeg";

interface SidebarItemProps {
  icon: React.ElementType
  title: string
  path: string
  isActive: boolean
  isCollapsed: boolean
}

const SidebarItem = ({ icon: Icon, title, path, isActive, isCollapsed }: SidebarItemProps) => {
  return (
    <Link href={path} className="w-full">
      <div
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all",
          isActive 
            ? "bg-sidebar-accent text-sidebar-accent-foreground" 
            : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )}
      >
        <Icon size={20} />
        {!isCollapsed && <span>{title}</span>}
      </div>
    </Link>
  )
}

export const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = usePathname()

  const menuItems = [
    { title: 'Dashboard', icon: Home, path: '/' },
    { title: 'Warehouse', icon: Box, path: '/warehouse' },
    { title: 'Vessels', icon: ShipWheel, path: '/vessel' },
    { title: 'Diving', icon: WavesIcon, path: '/diving' },
    { title: 'Trencher', icon: Ship, path: '/trencher' },
    { title: 'Surveys', icon: File, path: '/surveys' },
    { title: 'Welding', icon: Wrench, path: '/welding' },
    { title: 'Users', icon: Users, path: '/users' },
    // { title: 'Settings', icon: Settings, path: '/settings' },
  ]

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-b-orange-500 px-3 py-4">
        {!isCollapsed && (
          // <span className="text-lg font-semibold text-sidebar-foreground">Stock Beacon</span>
          <Image
            src={seatrenchLogo}
            alt="Logo"
            width={140}
            height={140}
            className="mr-2"
          />
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "rounded-md p-1.5 text-sidebar-foreground hover:bg-sidebar-accent",
            isCollapsed && "mx-auto"
          )}
        >
          <Layers size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-auto p-3">
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
        </nav>
      </div>
    </aside>
  )
}
