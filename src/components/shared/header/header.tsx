"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Logo from "../../ui/Logo";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import { Menu, X } from "lucide-react";
import { useScroll } from "@/hooks/useScroll";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScroll(20);

  return (
    <nav
      className={`fixed z-50 transition-all duration-300 h-18 flex items-center ${
        scrolled
          ? "bg-card/80 backdrop-blur shadow-sm w-[90%] md:w-[80%] lg:w-[70%] rounded-full left-[50%] top-3 -translate-x-[50%] py-3"
          : "w-full bg-transparent left-0 top-0 py-2"
      }`}>
      <div className="container">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto">
          <Logo />
          <DesktopNav />

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 rounded-lg justify-center text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring md:hidden transition">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>{isOpen && <MobileMenu setIsOpen={setIsOpen} />}</AnimatePresence>
    </nav>
  );
};

export default Header;
