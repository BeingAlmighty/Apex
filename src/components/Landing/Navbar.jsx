"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { Menu as MenuIcon, X, User, LogOut } from "lucide-react";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import { useAuth } from "../../context/AuthContext";

export function NavbarDemo() {
  return <Navbar />;
}

function Navbar() {
  const [active, setActive] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/signin"); // Navigate to sign-in page
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Navigate to home page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-[9999] bg-white dark:bg-black border-b border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black dark:text-white">Apex</h1>
          </div>

          {/* Desktop Menu and Login - Right Side */}
          <div className="hidden md:flex items-center space-x-6">
            <Menu setActive={setActive}>
              <MenuItem setActive={setActive} active={active} item="Services">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/web-dev">Web Development</HoveredLink>
                  <HoveredLink href="/interface-design">Interface Design</HoveredLink>
                  <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
                  <HoveredLink href="/branding">Branding</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Products">
                <div className="text-sm grid grid-cols-1 gap-10 p-4">
                  <ProductItem
                    title="Algochurn"
                    href="https://algochurn.com"
                    src="https://assets.aceternity.com/demos/algochurn.webp"
                    description="Prepare for tech interviews like never before."
                  />
                  <ProductItem
                    title="Tailwind Master Kit"
                    href="https://tailwindmasterkit.com"
                    src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                    description="Production ready Tailwind css components for your next project"
                  />
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Pricing">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/individual">Individual</HoveredLink>
                  <HoveredLink href="/team">Team</HoveredLink>
                  <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                </div>
              </MenuItem>
            </Menu>

            {/* Login Button / Profile Icon */}
            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {user?.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <InteractiveHoverButton
                  text="Login"
                  onClick={handleLoginClick}
                  className="bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                />
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t border-black/10 dark:border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-4 space-y-4">
            {/* Services */}
            <div className="space-y-2">
              <h3 className="font-semibold text-black dark:text-white">Services</h3>
              <div className="pl-4 space-y-2">
                <a href="/web-dev" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Web Development
                </a>
                <a href="/interface-design" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Interface Design
                </a>
                <a href="/seo" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Search Engine Optimization
                </a>
                <a href="/branding" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Branding
                </a>
              </div>
            </div>

            {/* Products */}
            <div className="space-y-2">
              <h3 className="font-semibold text-black dark:text-white">Products</h3>
              <div className="pl-4 space-y-2">
                <a href="https://algochurn.com" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Algochurn
                </a>
                <a href="https://tailwindmasterkit.com" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Tailwind Master Kit
                </a>
                <a href="https://gomoonbeam.com" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Moonbeam
                </a>
                <a href="https://userogue.com" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Rogue
                </a>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <h3 className="font-semibold text-black dark:text-white">Pricing</h3>
              <div className="pl-4 space-y-2">
                <a href="/hobby" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Hobby
                </a>
                <a href="/individual" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Individual
                </a>
                <a href="/team" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Team
                </a>
                <a href="/enterprise" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white">
                  Enterprise
                </a>
              </div>
            </div>

            {/* Login Button / Profile for Mobile */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="text-sm text-gray-700 dark:text-gray-300 text-center mb-2">
                    {user?.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="w-full p-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
