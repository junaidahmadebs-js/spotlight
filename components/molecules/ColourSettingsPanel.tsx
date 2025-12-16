"use client";

import React, { useState } from 'react';

import { useAppSelector } from '@/redux/hooks'; 
import ChangeColourPaletteModal from './ChangeColourPaletteModal'; 
import ColourPalettePopover from './ColourPalettePopover'; 


export default function ColourSettingsPanel() {
    
    const selectedPalette = useAppSelector((state) => state.theme.selectedPalette);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsPopoverOpen(false); 
        setIsModalOpen(true);    
    };
    
    const closeModal = () => setIsModalOpen(false);

    const handleModalConfirm = () => { 
        setIsModalOpen(false);   
        setIsPopoverOpen(true);  
    };

    return (
        <>
            <div className="px-4 py-6 bg-gray-50 border-b">
                <h2 className="text-lg font-semibold mb-2">Colour settings</h2>
                <p className="text-sm text-gray-700 mb-4">
                    You can use colour palettes to apply a consistent colour scheme to all of the charts and pages in your report, without the need to edit individual charts. Simply choose the colour palette you want to use from the drop-down list to apply it to your report.
                </p>
                
                <h3 className="text-sm font-medium mb-2">Colour Palette</h3>
                
                <ColourPalettePopover 
                    currentPalette={selectedPalette} 
                    isOpen={isPopoverOpen}
                    onOpenChange={setIsPopoverOpen}
                    onTriggerClick={openModal}
                    isPanelMode={true} 
                />
            </div>

            <ChangeColourPaletteModal 
                isOpen={isModalOpen}
                onClose={closeModal} 
                onConfirm={handleModalConfirm} 
            />
        </>
    );
}