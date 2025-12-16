
"use client";

import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';


export default function ThemeInitializer() {
    
    const colorVars = useAppSelector((state) => state.theme.colorVars);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const root = document.documentElement;
            
            if (colorVars) {
                for (const [key, value] of Object.entries(colorVars)) {
                    root.style.setProperty(key, value);
                }
            }
        }
    }, [colorVars]); 
    return null; 
}