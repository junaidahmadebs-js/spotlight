
"use client";

import React, { useState } from 'react';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

import ChangeColourPaletteModal from './ChangeColourPaletteModal'; 
import ColourPalettePopover from './ColourPalettePopover'; 


export default function ReportHeader() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
    const [selectedPalette, setSelectedPalette] = useState<string>("Green");


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const handleConfirmChange = () => {
        setIsModalOpen(false);   
        setIsPopoverOpen(true);  
    };

    const handlePaletteSelect = (paletteName: string) => {
        setSelectedPalette(paletteName);
        setIsPopoverOpen(false); 
        console.log(`Palette changed to: ${paletteName}`);
    };

  return (
    <>
        <div className="flex items-center gap-4 p-4 border-b bg-white">
        
            <div className="flex flex-col">
                <label className="text-sm font-medium">Report Date</label>
                <Input type="text" defaultValue="31 October 2025" className="w-[180px]" />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium">Template</label>
                <Select defaultValue="ebs">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ebs">EBS AED</SelectItem>
                    <SelectItem value="s4">SAP S4</SelectItem>
                  </SelectContent>
                </Select>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-6">
                Add Page
            </Button>


            <div 
                className="ml-auto mt-6"
            >
          
                <ColourPalettePopover 
                    onSelect={handlePaletteSelect}
                    currentPalette={selectedPalette}
                    isOpen={isPopoverOpen} 
                    onOpenChange={setIsPopoverOpen} 
                    onTriggerClick={openModal} 
                />
            </div>
        </div>

        <ChangeColourPaletteModal 
            isOpen={isModalOpen}
            onClose={closeModal} 
            onConfirm={handleConfirmChange} 
        />
    </>
  )
}