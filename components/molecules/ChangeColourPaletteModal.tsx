
"use client";

import * as React from 'react';
import { Button } from "@/components/ui/button";

interface ChangeColourPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; 
}

export default function ChangeColourPaletteModal({
  isOpen,
  onClose,
  onConfirm,
}: ChangeColourPaletteModalProps) {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
      
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4">
        
        <div className="bg-blue-500 text-white p-4 rounded-t-lg">
          <h2 className="text-lg font-semibold">Change Colour Palette</h2>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            You are about to change the colour palette for your report. This process will apply the new colours to all charts and pages in your report, including any charts with customised colours.
          </p>
          
          <div className="flex justify-start space-x-3">
            <Button 
              onClick={onConfirm} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Change Colour Palette
            </Button>
            <Button 
              onClick={onClose} 
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}