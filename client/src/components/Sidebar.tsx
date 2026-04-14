"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  Home,
  FolderOpen,
  Video,
  LogOut,
  User as UserIcon,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const navLinks = [
    { name: "Home", href: "/dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "Studio", href: "/studio/default-studio", icon: <Video className="w-5 h-5" /> },
  ];

  return (
    <aside
      className={cn(
        "h-full border-r border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between",
        isCollapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {!isCollapsed && (
            <Link href="/dashboard" className="text-xl font-bold tracking-widest text-[#ededed]">
              RECORA
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className={cn("p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors",
              isCollapsed && "mx-auto"
            )}
          >
            {isCollapsed ? <ChevronsRight className="w-5 h-5" /> : <ChevronsLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="p-3 space-y-2 mt-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                  isActive
                    ? "bg-primary/20 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white",
                  isCollapsed && "justify-center px-0"
                )}
                title={isCollapsed ? link.name : undefined}
              >
                <div className={cn("shrink-0", isActive && "text-primary")}>
                  {link.icon}
                </div>
                {!isCollapsed && (
                  <span className="font-medium whitespace-nowrap overflow-hidden">
                    {link.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-white/10 relative">
        {isProfileMenuOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl overflow-hidden py-1 z-50">
            <button
              onClick={() => {
                setIsProfileMenuOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-white/5 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        )}

        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors overflow-hidden",
            isCollapsed && "justify-center px-0"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
          </div>
          {!isCollapsed && (
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {user?.name || "Profile"}
              </div>
              <div className="text-xs text-gray-400 truncate">
                {user?.email || "Options"}
              </div>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
