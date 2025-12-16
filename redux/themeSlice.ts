

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColorVars {
    '--color-primary': string;
    '--color-secondary': string;
    '--color-button-bg': string;
    '--color-button-hover': string;
    [key: string]: string; 
}

const PALETTE_MAPPING: Record<string, ColorVars> = {
    'Green': { 
        '--color-primary': '#10B981', 
        '--color-secondary': '#047857',
        '--color-button-bg': '#2563EB', 
        '--color-button-hover': '#1D4ED8' 
    },
    'Blue': { 
        '--color-primary': '#2563EB', 
        '--color-secondary': '#1D4ED8',
        '--color-button-bg': '#2563EB',
        '--color-button-hover': '#1D4ED8'
    },
    'Orange': { 
        '--color-primary': '#F97316', 
        '--color-secondary': '#C2410C',
        '--color-button-bg': '#F97316',
        '--color-button-hover': '#EA580C'
    },
    'Standard': { 
        '--color-primary': '#FF5733', 
        '--color-secondary': '#33FF57',
        '--color-button-bg': '#2563EB',
        '--color-button-hover': '#1D4ED8'
    },
};

interface ThemeState {
    selectedPalette: string;
    colorVars: ColorVars;
}

const initialState: ThemeState = {
    selectedPalette: 'Green',
    colorVars: PALETTE_MAPPING['Green'],
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setPalette: (state, action: PayloadAction<string>) => {
            const newPalette = action.payload;
            state.selectedPalette = newPalette;
            state.colorVars = PALETTE_MAPPING[newPalette] || PALETTE_MAPPING['Green'];
        },
    },
});

export const { setPalette } = themeSlice.actions;

export default themeSlice.reducer;