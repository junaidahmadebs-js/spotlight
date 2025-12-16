
"use client";

import * as React from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setPalette } from '@/redux/themeSlice';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, Palette } from "lucide-react";

const palettes = [
    { name: "Standard", colors: ["#FF5733", "#33FF57", "#3357FF", "#FF33F5"], type: "Standard" },
    { name: "Standard (Grey)", colors: ["#888888", "#555555", "#333333", "#111111"], type: "Standard" }, 
    { name: "Green", colors: ["#10B981", "#059669", "#047857", "#065F46"], type: "Monochromatic" },
    { name: "Blue", colors: ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"], type: "Monochromatic" },
];

interface ColourPalettePopoverProps {
    currentPalette: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onTriggerClick: () => void;
    isPanelMode?: boolean; 
}


  export default function ColourPalettePopover({ 
    currentPalette = "Green", 
    isOpen,
    onOpenChange,
    onTriggerClick,
    isPanelMode = false 
}: ColourPalettePopoverProps) {
    const dispatch = useAppDispatch(); 

    const handleSelect = (paletteName: string) => {
        dispatch(setPalette(paletteName)); 
        onOpenChange(false); 
    };

    const currentPaletteData = palettes.find(p => p.name === currentPalette) || palettes[0];
    const triggerColors = currentPaletteData.colors.length > 0 
        ? currentPaletteData.colors.slice(0, 4) 
        : palettes[0].colors.slice(0, 4);

    const triggerContent = isPanelMode ? (
        <div className="flex items-center border border-gray-300 p-2 rounded w-[150px] cursor-pointer bg-white">
            <span className="text-sm font-medium">{currentPalette}</span>
            <div className="ml-auto flex space-x-0.5 items-center">
                {triggerColors.map((color, index) => (
                    <div key={index} style={{ backgroundColor: color }} className="w-3 h-3 rounded-[1px]"></div>
                ))}
                <ChevronDown className="w-3 h-3 ml-1" />
            </div>
        </div>
    ) : (
        <div className="text-blue-700 cursor-pointer flex items-center gap-1 text-sm">
            Show colour settings 
            <ChevronDown className="w-4 h-4 transition-transform duration-200" />
        </div>
    );

    return (
        <Popover open={isOpen} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
            <div onClick={onTriggerClick}>
            {triggerContent}
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