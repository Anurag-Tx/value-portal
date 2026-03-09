"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Lightbulb,
  Target,
  ClipboardList,
  Trophy,
  Bell,
  Settings,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Accounts", href: "/accounts", icon: Building2 },
  { title: "Leads", href: "/leads", icon: Target },
  { title: "Value Ideas", href: "/ideas", icon: Lightbulb },
  { title: "My Assignments", href: "/assignments", icon: ClipboardList },
];

const insightsNav = [
  { title: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { title: "Reports", href: "/reports", icon: BarChart3 },
  { title: "Reviews", href: "/reviews", icon: ShieldCheck },
];

const systemNav = [
  { title: "Notifications", href: "/notifications", icon: Bell },
  { title: "Admin", href: "/admin/users", icon: Settings },
];

function NavGroup({
  label,
  items,
  pathname,
}: {
  label: string;
  items: typeof mainNav;
  pathname: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                isActive={pathname === item.href}
                render={<Link href={item.href} />}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            VP
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">Value Portal</p>
            <p className="text-xs text-muted-foreground">
              Delivery Intelligence
            </p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <NavGroup label="Main" items={mainNav} pathname={pathname} />
        <NavGroup label="Insights" items={insightsNav} pathname={pathname} />
        <NavGroup label="System" items={systemNav} pathname={pathname} />
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <p className="text-xs text-muted-foreground">v0.1.0</p>
      </SidebarFooter>
    </Sidebar>
  );
}
