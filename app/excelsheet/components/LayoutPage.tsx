import React, { useState } from 'react';
import LiquidityChart from './LiquidityChart';
import ChartConfig from './ChartConfig';

export interface ChartSettings {
  type: 'Curve' | 'Line' | 'Bar';
  marker: 'Dot' | 'None' | 'Square' | 'Star'; 
  dataLabelOption: 'Number' | 'None' | 'Percentage';
  showSeries: boolean;
  color: string;
  dataLabelFontSize: '11px' | '10px' | '9px'; 
}

export const initialSettings: ChartSettings = {
  type: 'Curve',
  marker: 'Dot',
  dataLabelOption: 'Number',
  showSeries: true,
  color: '#4a90e2', 
  dataLabelFontSize: '11px', 
};

const LayoutPage: React.FC = () => {
  const [settings, setSettings] = useState<ChartSettings>(initialSettings);

  const handleSettingsChange = (newSettings: Partial<ChartSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '20px', 
      padding: '20px', 
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
      overflowX: 'auto', 
      justifyContent: 'center',
    }}>
      
      {/* 1. LIQUIDITY MONITOR (Chart) */}
      <div style={{ flexShrink: 0 }}> 
        <LiquidityChart settings={settings} />
      </div>

      {/* 2. ChartConfig (Settings Panel) */}
      <div style={{ flexShrink: 0 }}>
        <ChartConfig 
          currentSettings={settings} 
          onSettingsChange={handleSettingsChange} 
        />
      </div>
    </div>
  );
};

export default LayoutPage;