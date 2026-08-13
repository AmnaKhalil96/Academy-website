"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  items: string[];
  onClose?: () => void;
}

export function Dropdown({ items, onClose }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="text-yellow-600 hover:text-yellow-300 flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        Courses <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg py-2 border border-purple-100">
          {items.map((item) => (
            <Link
              key={item}
              href={`/Courses/${item.toLowerCase().replace(/ & /g, "-").replace(/\./g, "")}`}
              className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-800 transition-colors duration-200"
              onClick={() => {
                setIsOpen(false);
                onClose?.();
              }}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}