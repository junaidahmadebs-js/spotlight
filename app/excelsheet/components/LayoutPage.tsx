import React, { useState } from 'react';
import LiquidityChart from './LiquidityChart';
import ChartConfig from './ChartConfig';
import PLPage from '@/components/molecules/profitlosspage';

export interface ChartSettings {
  period: 'Monthly' | 'Quarterly' | 'Yearly' | 'Daily';
  showGridlines: boolean;
  highlightReportDate: boolean;
  fromDate: string;
  toDate: string;
  yAxisTitle: string;
  yAxisMin: string;
  yAxisMax: string;
  yAxisShowGridlines: boolean;
  yAxisPosition: 'Left' | 'Right';
  showSeries: boolean;
  color: string;
  type: 'Curve' | 'Line' | 'Bar';
  marker: 'Dot' | 'None' | 'Square' | 'Star';
  dataLabelOption: 'Number' | 'None' | 'Percentage';
  dataLabelFontSize: '11px' | '10px' | '9px';
}

export const initialSettings: ChartSettings = {
  period: 'Monthly',
  showGridlines: false,
  highlightReportDate: true,
  fromDate: 'Auto',
  toDate: 'Auto',
  yAxisTitle: 'Value',
  yAxisMin: 'Auto',
  yAxisMax: 'Auto',
  yAxisShowGridlines: true,
  yAxisPosition: 'Left',
  showSeries: true,
  color: '#4a90e2',
  type: 'Curve',
  marker: 'Dot',
  dataLabelOption: 'Number',
  dataLabelFontSize: '11px',
};

const stableWidth = '1020px';

const LayoutPage: React.FC = () => {
  const [settings, setSettings] = useState<ChartSettings>(initialSettings);

  const handleSettingsChange = (newSettings: Partial<ChartSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '20px',
      padding: '20px',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
      overflowX: 'auto',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '20px',
      }}>
        <div style={{ flexShrink: 0 }}> 
          <LiquidityChart settings={settings} />
        </div>

        <div style={{ flexShrink: 0 }}>
          <ChartConfig 
            currentSettings={settings} 
            onSettingsChange={handleSettingsChange} 
          />
        </div>
      </div>
      
      <div style={{ width: stableWidth }} >
        <PLPage/>
      </div>
    </div>
  );
};

export default LayoutPage;