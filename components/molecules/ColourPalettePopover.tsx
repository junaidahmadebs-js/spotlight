"use client";

import * as React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Palette } from "lucide-react";

const palettes = [
    { name: "Standard", colors: ["#FF5733", "#33FF57", "#3357FF", "#FF33F5"], type: "Standard" },
    { name: "Standard (Grey)", colors: ["#888888", "#555555", "#333333", "#111111"], type: "Standard" }, 
    { name: "Monochromatic", colors: [], type: "Monochromatic" },
    { name: "Blue", colors: ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"], type: "Monochromatic" },
    { name: "Green", colors: ["#10B981", "#059669", "#047857", "#065F46"], type: "Monochromatic" },
    { name: "Orange", colors: ["#F97316", "#EA580C", "#C2410C", "#9A3412"], type: "Monochromatic" },
    { name: "Red", colors: ["#EF4444", "#DC2626", "#B91C1C", "#991B1B"], type: "Monochromatic" },
    { name: "Yellow", colors: ["#F59E0B", "#D97706", "#B45309", "#92400E"], type: "Monochromatic" },
    { name: "Purple", colors: ["#8B5CF6", "#7C3AED", "#6D28D9", "#5B21B6"], type: "Monochromatic" },
    { name: "Turquoise", colors: ["#14B8A6", "#0D9488", "#0F766E", "#047857"], type: "Monochromatic" },
];

interface ColourPalettePopoverProps {
    onSelect: (paletteName: string) => void;
    currentPalette: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onTriggerClick: () => void; 
}

export default function ColourPalettePopover({ 
    onSelect, 
    currentPalette = "Green", 
    isOpen,
    onOpenChange,
    onTriggerClick
}: ColourPalettePopoverProps) {
  
    const handleSelect = (paletteName: string) => {
        onSelect(paletteName);
        onOpenChange(false); 
    };

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      
      <PopoverTrigger asChild>
        <div 
            className="text-blue-700 cursor-pointer flex items-center gap-1 text-sm"
            onClick={onTriggerClick} 
        >
          Show colour settings 
          <ChevronDown className="w-4 h-4 transition-transform duration-200" />
        </div>
      </PopoverTrigger>
      
      <PopoverContent className="w-[200px] p-0 shadow-lg border" align="end">
        
        <div className="p-2 border-b text-sm font-medium">Colour Palette</div>
        
        <div className="max-h-60 overflow-y-auto">
          {palettes.map((palette) => (
            <div
              key={palette.name}
              className={`flex items-center justify-between p-2 cursor-pointer text-sm
                ${palette.name === currentPalette ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
              `}
              onClick={() => handleSelect(palette.name)}
            >
              <span className={palette.name.includes("Monochromatic") ? "font-bold" : ""}>
                {palette.name}
              </span>

              <div className="flex space-x-0.5">
                {palette.colors.map((color, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: color }}
                    className="w-3 h-3 rounded-[1px]"
                  ></div>
                ))}
                {palette.type === "Monochromatic" && palette.colors.length === 0 && (
                    <Palette className="w-3 h-3 opacity-50" />
                )}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}