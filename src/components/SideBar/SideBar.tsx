"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  HomeLine,
  BarChartSquare02,
  Rows01,
  CheckDone01,
  PieChart03,
  Users01,
  Settings01,
  LifeBuoy01,
  Grid03,
  Package,
  CurrencyDollarCircle,
  UsersPlus,
  UserSquare,
  NotificationBox,
} from "@untitledui/icons";

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: HomeLine,
      sub: [
        { label: "Overview", href: "/overview", icon: Grid03 },
        { label: "Products", href: "/products", icon: Package },
        { label: "Orders", href: "/orders", icon: CurrencyDollarCircle },
      ],
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: BarChartSquare02,
      sub: [
        { label: "Analytics", href: "/dashboard/analytics", icon: NotificationBox },
        { label: "Reports", href: "/dashboard/reports", icon: UserSquare },
      ],
    },
    {
      label: "Projects",
      href: "/projects",
      icon: Rows01,
      sub: [
        { label: "Team", href: "/projects/team", icon: UsersPlus },
        { label: "Users", href: "/projects/users", icon: Users01 },
      ],
    },
    { label: "Tasks", href: "/tasks", icon: CheckDone01 },
    { label: "Reporting", href: "/reporting", icon: PieChart03 },
    { label: "Users", href: "/users", icon: Users01 },
  ];

  const footerItems = [
    { label: "Support", href: "/support", icon: LifeBuoy01 },
    { label: "Settings", href: "/settings", icon: Settings01 },
  ];

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <aside className=" h-screen bg-white border-r border-gray-200 flex flex-col justify-between">
      {/* Main Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <div key={item.label}>
              <button
                onClick={() => toggleMenu(item.label)}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.sub && (
                  <span className="text-gray-400">
                    {openMenu === item.label ? "−" : "+"}
                  </span>
                )}
              </button>

              {/* Submenu */}
              {openMenu === item.label && item.sub && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.sub.map((sub) => {
                    const SubIcon = sub.icon;
                    const subActive = pathname === sub.href;
                    return (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition ${
                          subActive
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <SubIcon className="w-4 h-4" />
                        {sub.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Links */}
      <div className="border-t border-gray-200 p-4 space-y-2">
        {footerItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded-md text-sm transition ${
                active
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </a>
          );
        })}
      </div>
    </aside>
  );
}
