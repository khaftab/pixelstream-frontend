"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiHandler } from "@/lib/api";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  console.log(user);

  let navLinks = [
    { href: "/", label: "Home" },
    { href: "/signin", label: "Signin" },
    { href: "/signup", label: "Signup" },
    { href: "/dashboard", label: "Dashboard", isButton: true },
  ];

  if (user) {
    delete navLinks[1];
    delete navLinks[2];
  } else {
    delete navLinks[3];
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  type NavLinkProps = {
    href: string;
    label: string;
    isButton?: boolean;
  };

  const getInitials = (email: string) => {
    return email?.split("@")[0]?.slice(0, 2)?.toUpperCase() || "";
  };

  const NavLink = ({ href, label, isButton = false }: NavLinkProps) => {
    if (isButton) {
      return (
        <Link href={href}>
          <button className="bg-gradient-to-r from-emerald-400 to-yellow-300 text-black text-md py-2 px-4 rounded-lg hover:opacity-90 transition-all duration-300 font-medium">
            {label}
          </button>
        </Link>
      );
    }

    return (
      <Link href={href}>
        <span className="flex select-none items-center rounded-full px-4 py-1.5 opacity-100 hover:bg-white/15 hover:text-white">
          {label}
        </span>
      </Link>
    );
  };

  const UserAvatar = () => (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-black font-medium text-sm hover:opacity-90 transition-opacity tracking-widest">
          {getInitials(user?.email || "")}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mr-2 mt-3" align="end">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      {/* Blur Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40 md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
        aria-hidden="true"
      />

      {/* Header */}
      <header className="bg-gray-950/80 backdrop-blur-lg shadow-md fixed h-16 w-full top-0 z-50 border-b border-gray-800">
        <div className="container max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-100">
            <Link href="/">PixelStream</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-blue-50">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}

            {/* Desktop Avatar */}
            {user && <UserAvatar />}
          </nav>

          {/* Mobile Header Right */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Avatar */}
            {user && <UserAvatar />}

            {/* Menu Button */}
            <button
              className="text-blue-100 focus:outline-none z-50"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`md:hidden fixed mt-16 top-0 right-0 h-screen w-[80%] max-w-96 bg-black/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out z-50 border-l border-gray-800 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <nav className="flex flex-col pt-5 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3 px-4 text-blue-50 hover:bg-white/15 rounded-lg transition-colors duration-200 ${
                    link.isButton
                      ? "mt-4 text-center bg-gradient-to-r from-emerald-400 to-yellow-300 text-black hover:opacity-90"
                      : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
