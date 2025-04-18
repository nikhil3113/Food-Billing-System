"use client";

import {
  Home,
  UtensilsCrossed,
  Receipt,
  User,
  Settings,
  LogOut,
  Info,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

// Menu items with improved structure and categories
const mainItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    badge: undefined
  },
  {
    title: "Menu",
    url: "/menu-page",
    icon: UtensilsCrossed,
    badge: undefined
  },
];

const accountItems = [
  {
    title: "Profile",
    url: "/profile",
    icon: User,
    badge: undefined
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    badge: undefined
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
    badge: undefined
  },
];

export function AppSidebar() {
  // Get current pathname for active state
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="h-full flex flex-col">
        {/* Logo and Branding */}
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-500 w-8 h-8 rounded-lg flex items-center justify-center">
              <UtensilsCrossed className="text-black h-5 w-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg">FastFood</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Billing System
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* User Profile Summary */}
        <div className="p-4">
          {status === "authenticated" ? (
            <div className="flex items-center space-x-3">
              <Avatar>
                {session.user?.image ? (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name || "User"}
                  />
                ) : (
                  <AvatarFallback className="bg-sky-100 text-sky-600">
                    {session.user?.name ? getInitials(session.user.name) : "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {session.user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {session.user?.email || ""}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-sky-100 text-sky-600">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="px-2 text-sm"
                >
                  <Link href="/api/auth/signin">Sign in</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        <SidebarContent className="flex-1 py-2">
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 my-2">
              MAIN MENU
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainItems.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`relative group ${
                          isActive
                            ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-500 font-medium"
                            : ""
                        }`}
                      >
                        <Link href={item.url} className="flex items-center">
                          <item.icon
                            className={`h-5 w-5 ${
                              isActive
                                ? "text-yellow-500"
                                : "group-hover:text-yellow-500"
                            }`}
                          />
                          <span className="ml-3">{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto bg-yellow-500 text-xs font-medium text-black py-0.5 px-2 rounded-full">
                              {item.badge}
                            </span>
                          )}
                          {isActive && (
                            <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-yellow-500 dark:bg-yellow-600" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Account Section */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-4 my-2 mt-6">
              YOUR ACCOUNT
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {accountItems.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`relative group ${
                          isActive
                            ? "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-500 font-medium"
                            : ""
                        }`}
                      >
                        <Link href={item.url} className="flex items-center">
                          <item.icon
                            className={`h-5 w-5 ${
                              isActive
                                ? "text-yellow-500"
                                : "group-hover:text-yellow-500"
                            }`}
                          />
                          <span className="ml-3">{item.title}</span>
                          {isActive && (
                            <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-yellow-500 dark:bg-yellow-600" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Promotional Card */}
        <div className="p-4">
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 p-4 text-white">
            <div className="relative z-10">
              <p className="text-sm font-medium">Special Offer</p>
              <p className="text-xs mb-3">Get 20% off on your first order</p>
              <Button
                size="sm"
                className="w-full bg-white text-yellow-600 hover:bg-gray-100 hover:text-yellow-700"
              >
                Get Coupon
              </Button>
            </div>
            <div className="absolute -right-3 -bottom-3 opacity-20">
              <Receipt className="h-16 w-16" />
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="p-4 mt-auto">
          {status === "authenticated" ? (
            <Button
              variant="outline"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full justify-start text-sky-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20"
              asChild
            >
              <Link href="/api/auth/signin">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Sidebar>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}
