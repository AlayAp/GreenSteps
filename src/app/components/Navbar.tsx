"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Logger" },
  { href: "/challenge-feed", label: "Challenges" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/info-tips", label: "Eco Tips" },
  { href: "/settings", label: "Settings" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-white text-green-700 px-4 py-3 flex items-center justify-between">
      {/* Left: Logo and Title */}
      <div className="flex items-center gap-2 pl-10">
        <img src="\environmental-icon.svg" alt="icon" className="h-8 w-8"  />
        <span className="font-bold text-xl text-green-700">Green Steps</span>
      </div>
      {/* Right: Navigation Links */}
      <div className="flex gap-4 ">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "px-3 py-1 rounded hover:bg-green-500 hover:text-white",
              pathname === link.href && "bg-green-500 text-white font-bold"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
