"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ShoppingBag,
  BarChart2,
  Package,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/", icon: <LayoutDashboard size={20} /> },
  { label: "Products", href: "/products", icon: <Package size={20} /> },
  { label: "Sales", href: "/sales", icon: <BarChart2 size={20} /> },
  { label: "Orders", href: "/orders", icon: <ShoppingBag size={20} /> },
];

export const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <aside
      className={`relative flex flex-col py-8 min-h-screen border-r border-sidebar-border
        transition-[width] duration-300 ease-in-out
        ${expanded ? "w-60" : "w-20"}
      `}
    >
      {/* Company Name and Toggle */}
      <div
        className={`
          flex items-center justify-center
          mb-8
          transition-all duration-300
          ${expanded ? "mx-4" : "mx-0"}
        `}
        style={{
          minHeight: "40px",
        }}
      >
        <span
          className={`
            font-bold text-xl text-[var(--color-sidebar-primary)]
            transition-all duration-300
            ${
              expanded
                ? "opacity-100 scale-x-100"
                : "opacity-0 scale-x-0 pointer-events-none"
            }
            whitespace-nowrap origin-left
          `}
          style={{
            minWidth: expanded ? "unset" : 0,
            maxWidth: expanded ? "180px" : 0,
          }}
        >
          CompanyPH Inc.
        </span>
        {!expanded && (
          <span className="w-2 h-2 bg-[var(--color-sidebar-primary)] rounded-full mx-auto opacity-80 transition-all duration-300"></span>
        )}
        {/* Toggle button at the right side of the company name */}
        <button
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => setExpanded((e) => !e)}
          className={`
            ml-2
            z-10
            rounded-md p-2
            hover:bg-[var(--color-sidebar-accent)]
            transition-colors
            ${expanded ? "" : "mx-auto"}
          `}
          tabIndex={0}
          type="button"
        >
          {expanded ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
        </button>
      </div>
      <nav
        className={`
          flex flex-col gap-2
          mt-4
          px-2
          transition-all duration-300
          ${expanded ? "items-start" : "items-center"}
        `}
      >
        {sidebarLinks.map((link) => {
          // Active logic: highlight if pathname is exactly the href, or if pathname starts with href (for non-root pages)
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center gap-3
                px-3 py-2
                rounded-md
                ${
                  isActive
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--color-sidebar-foreground)] hover:bg-[var(--color-sidebar-accent)] hover:text-[var(--color-sidebar-accent-foreground)]"
                }
                transition-colors
                group
                ${!expanded ? "justify-center" : "w-4/5"}
                relative
              `}
              aria-current={isActive ? "page" : undefined}
            >
              <span>{link.icon}</span>
              <span
                className={`
                  whitespace-nowrap
                  transition-all duration-300
                  origin-left
                  ${
                    expanded
                      ? "opacity-100 ml-0 scale-x-100"
                      : "opacity-0 ml-[-14px] scale-x-0 pointer-events-none"
                  }
                `}
                style={{
                  minWidth: expanded ? "unset" : 0,
                  maxWidth: expanded ? "160px" : 0,
                }}
              >
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
