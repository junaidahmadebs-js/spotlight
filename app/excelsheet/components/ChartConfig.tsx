import React, { useState } from 'react';
import { ChartSettings, initialSettings } from './LayoutPage'; 

interface ChartConfigProps {
    currentSettings: ChartSettings; 
    onSettingsChange: (settings: Partial<ChartSettings>) => void; 
}

const TABS = ['Chart', 'Filters', 'Series', 'Formulas'] as const;
type TabName = typeof TABS[number];

interface DropdownSettingProps { label: string; }
const DropdownSetting: React.FC<DropdownSettingProps> = ({ label }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', borderBottom: '1px solid #eee', backgroundColor: 'white', cursor: 'pointer' }}>
      <span>{label}</span>
      <span style={{ fontSize: '18px', color: '#666' }}>&#x25BC;</span> 
    </div>
  );
};


const RenderDropdown = ({
  label,
  settingKey,
  options,
  currentSettings,
  handleDropdownChange,
  labelStyle,
  dropdownWrapperStyle,
  dropdownStyle,
  arrowStyle
}: {
  label: string;
  settingKey: keyof ChartSettings;
  options: string[];
  currentSettings: ChartSettings;
  handleDropdownChange: (e: React.ChangeEvent<HTMLSelectElement>, settingKey: keyof ChartSettings) => void;
  labelStyle: React.CSSProperties;
  dropdownWrapperStyle: React.CSSProperties;
  dropdownStyle: React.CSSProperties;
  arrowStyle: React.CSSProperties;
}) => (
  <div style={{ flexGrow: 1 }}>
    <div style={labelStyle}>{label}</div>
    <div style={dropdownWrapperStyle}>
      <select 
        style={dropdownStyle} 
        value={currentSettings[settingKey] as string} 
        onChange={(e) => handleDropdownChange(e, settingKey)}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <span style={arrowStyle}>&#x25BC;</span>
    </div>
  </div>
);


interface SeriesConfigTabProps {
    currentSettings: ChartSettings;
    onSettingsChange: (settings: Partial<ChartSettings>) => void;
}

const SeriesConfigTab: React.FC<SeriesConfigTabProps> = ({ currentSettings, onSettingsChange }) => {
  
  const inputRowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '15px' }; 
  const labelStyle: React.CSSProperties = { fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px' }; 
  const dropdownWrapperStyle: React.CSSProperties = { position: 'relative', width: '100%' };
  const dropdownStyle: React.CSSProperties = {
    padding: '7px', border: '1px solid #ccc', borderRadius: '3px', width: '100%', 
    backgroundColor: 'white', appearance: 'none', WebkitAppearance: 'none', 
    MozAppearance: 'none', paddingRight: '25px', cursor: 'pointer',
    fontSize: '13px' 
  };
  const arrowStyle: React.CSSProperties = {
    position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', 
    pointerEvents: 'none', fontSize: '12px', color: '#666', 
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>, settingKey: keyof ChartSettings) => {
    // const value = e.target.value as any; 
    const value: string = e.target.value;

    onSettingsChange({ [settingKey]: value });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onSettingsChange({ showSeries: e.target.checked });
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onSettingsChange({ color: e.target.value });
  };

  return (
    <div style={{ padding: '15px', backgroundColor: 'white' }}> 
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', cursor: 'pointer', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#007bff' }}>Liquidity</h3>
          <span style={{ color: '#007bff', fontSize: '10px' }}>&#x25B2;</span> 
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>Display Options</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '12px' }}> 
          <label>
              <input type="checkbox" checked={currentSettings.showSeries} onChange={handleCheckboxChange} /> Show Series 
          </label>
          <label><input type="checkbox" /> Projection</label>
          <label><input type="checkbox" /> Stacked</label>
          <label><input type="checkbox" /> Trend</label>
        </div>
      </div>

      <div style={inputRowStyle}>
        <div style={{ flexGrow: 1 }}>
          <div style={labelStyle}>Title</div>
          <input type="text" defaultValue="Liquidity" style={{ padding: '7px', border: '1px solid #ccc', borderRadius: '3px', width: '100%', fontSize: '13px' }} />
        </div>
        <div style={{ width: '70px' }}> 
          <div style={labelStyle}>Colour</div>
          <input 
              type="color" 
              value={currentSettings.color} 
              onChange={handleColorChange}
              style={{ height: '32px', width: '100%', padding: 0, border: '1px solid #ccc', cursor: 'pointer' }}
          />
        </div>
      </div>

      <div style={inputRowStyle}>
        <RenderDropdown 
          label="Type" 
          settingKey="type" 
          options={['Curve', 'Line', 'Bar']}
          currentSettings={currentSettings}
          handleDropdownChange={handleDropdownChange}
          labelStyle={labelStyle}
          dropdownWrapperStyle={dropdownWrapperStyle}
          dropdownStyle={dropdownStyle}
          arrowStyle={arrowStyle}
        />

        <RenderDropdown 
          label="Marker" 
          settingKey="marker" 
          options={['Dot', 'None', 'Square', 'Star']}
          currentSettings={currentSettings}
          handleDropdownChange={handleDropdownChange}
          labelStyle={labelStyle}
          dropdownWrapperStyle={dropdownWrapperStyle}
          dropdownStyle={dropdownStyle}
          arrowStyle={arrowStyle}
        />
      </div>

      <div style={inputRowStyle}>
        <RenderDropdown 
          label="Data Label Options" 
          settingKey="dataLabelOption" 
          options={['Number', 'None', 'Percentage']}
          currentSettings={currentSettings}
          handleDropdownChange={handleDropdownChange}
          labelStyle={labelStyle}
          dropdownWrapperStyle={dropdownWrapperStyle}
          dropdownStyle={dropdownStyle}
          arrowStyle={arrowStyle}
        />

        <RenderDropdown 
          label="Data Label Font Size" 
          settingKey="dataLabelFontSize" 
          options={['11px', '10px', '9px']}
          currentSettings={currentSettings}
          handleDropdownChange={handleDropdownChange}
          labelStyle={labelStyle}
          dropdownWrapperStyle={dropdownWrapperStyle}
          dropdownStyle={dropdownStyle}
          arrowStyle={arrowStyle}
        />
      </div>

      <div style={{ marginTop: '10px', marginBottom: '5px' }}>
        <a href="#" style={{ color: '#007bff', textDecoration: 'none', fontSize: '12px' }}>Show formula</a>
      </div>
    </div>
  );
};


const styles = { 
  container: {
    maxWidth: '420px', 
    border: '1px solid #ccc', borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif', overflow: 'hidden',
  },
  tabHeader: { display: 'flex', borderBottom: '1px solid #ccc', backgroundColor: '#f7f7f7' },
  tab: (isActive: boolean): React.CSSProperties => ({
    padding: '8px 15px', 
    cursor: 'pointer', borderRight: '1px solid #eee',
    borderBottom: isActive ? '3px solid #007bff' : '3px solid transparent',
    backgroundColor: isActive ? 'white' : 'transparent',
    fontWeight: isActive ? 'bold' : 'normal', color: isActive ? '#007bff' : '#333',
    fontSize: '13px', 
  }),
  buttonContainer: {
    padding: '10px', 
    backgroundColor: '#f9f9f9', display: 'flex',
    justifyContent: 'flex-end', gap: '8px', 
  },
  button: (isPrimary: boolean): React.CSSProperties => ({
    padding: '6px 12px', 
    border: isPrimary ? 'none' : '1px solid #ccc',
    borderRadius: '3px', backgroundColor: isPrimary ? '#007bff' : 'white',
    color: isPrimary ? 'white' : '#333', cursor: 'pointer', fontWeight: 'bold',
    fontSize: '12px', 
  }),
};

const ChartConfig: React.FC<ChartConfigProps> = ({ currentSettings, onSettingsChange }) => {
  const [activeTab, setActiveTab] = useState<TabName>('Series'); 

  const handleReset = () => {
      onSettingsChange(initialSettings);
      console.log('Chart Reset to initial settings.');
  };

  const handleUpdate = () => {
      console.log('Update Clicked. Changes are already live on the chart.');
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabHeader}>
        {TABS.map((tab) => (
          <div
            key={tab}
            style={styles.tab(activeTab === tab)}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div style={{ minHeight: '350px' }}>
          {activeTab === 'Chart' && (
            <>
              <DropdownSetting label="Title" />
              <DropdownSetting label="X Axis" />
              <DropdownSetting label="Y Axis" />
              <DropdownSetting label="Narration" />
              <div style={{ height: '20px', backgroundColor: 'white' }}></div>
            </>
          )}

          {activeTab === 'Series' && (
             <SeriesConfigTab 
                currentSettings={currentSettings} 
                onSettingsChange={onSettingsChange} 
             /> 
          )}
          
          {['Filters', 'Formulas'].includes(activeTab) && (
            <div style={{ padding: '10px', height: '180px', backgroundColor: 'white', fontSize: '12px' }}>
              Content for {activeTab} tab...
            </div>
          )}
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.button(false)} onClick={handleReset}>
          Reset
        </button>
        <button style={styles.button(true)} onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default ChartConfig;
