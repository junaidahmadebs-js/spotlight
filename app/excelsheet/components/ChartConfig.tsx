import React, { useState } from 'react';

interface ChartSettings {
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

const initialSettings: ChartSettings = {
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
    color: '#007bff',
    type: 'Curve',
    marker: 'Dot',
    dataLabelOption: 'Number',
    dataLabelFontSize: '11px',
};

interface ChartConfigProps {
    currentSettings: ChartSettings;
    onSettingsChange: (settings: Partial<ChartSettings>) => void;
}

const TABS = ['Chart', 'Filters', 'Series', 'Formulas'] as const;
type TabName = typeof TABS[number];

interface DropdownSettingProps {
    label: string;
    children?: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

const DropdownSetting: React.FC<DropdownSettingProps> = ({ label, children, isOpen, onToggle }) => {
  const arrow = isOpen ? <span>&#x25B2;</span> : <span>&#x25BC;</span>;

  return (
    <div style={{ borderBottom: '1px solid #eee', backgroundColor: 'white' }}>
      <div
        onClick={onToggle}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 15px',
          cursor: 'pointer'
        }}
      >
        <span style={{ fontWeight: isOpen ? 'bold' : 'normal', color: isOpen ? '#007bff' : '#333' }}>{label}</span>
        <span style={{ fontSize: '12px', color: isOpen ? '#007bff' : '#666' }}>{arrow}</span>
      </div>
      {isOpen && <div style={{ padding: '0 15px 15px 15px' }}>{children}</div>}
    </div>
  );
};


interface AxisConfigProps {
    currentSettings: ChartSettings;
    onSettingsChange: (settings: Partial<ChartSettings>) => void;
}

const inputStyle: React.CSSProperties = {
  padding: '7px',
  border: '1px solid #ccc',
  borderRadius: '3px',
  width: '100%',
  fontSize: '13px',
  boxSizing: 'border-box'
};
const labelStyle: React.CSSProperties = { fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px' };
const dropdownWrapperStyle: React.CSSProperties = { position: 'relative', width: '100%' };

const YAxisConfig: React.FC<AxisConfigProps> = ({ currentSettings, onSettingsChange }) => {
    const handleTextChange = (settingKey: 'yAxisTitle' | 'yAxisMin' | 'yAxisMax') => (e: React.ChangeEvent<HTMLInputElement>) => {
        onSettingsChange({ [settingKey]: e.target.value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSettingsChange({ yAxisShowGridlines: e.target.checked });
    };

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSettingsChange({ yAxisPosition: e.target.value as ChartSettings['yAxisPosition'] });
    };

    return (
        <div>
            <div style={{ marginBottom: '15px' }}>
                <div style={labelStyle}>Title</div>
                <input
                    type="text"
                    value={currentSettings.yAxisTitle}
                    onChange={handleTextChange('yAxisTitle')}
                    style={inputStyle}
                />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                    <div style={labelStyle}>Minimum Value</div>
                    <input
                        type="text"
                        value={currentSettings.yAxisMin}
                        onChange={handleTextChange('yAxisMin')}
                        style={inputStyle}
                        placeholder="Auto"
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={labelStyle}>Maximum Value</div>
                    <input
                        type="text"
                        value={currentSettings.yAxisMax}
                        onChange={handleTextChange('yAxisMax')}
                        style={inputStyle}
                        placeholder="Auto"
                    />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                    <div style={labelStyle}>Position</div>
                    <div style={dropdownWrapperStyle}>
                        <select
                            style={{ ...inputStyle, paddingRight: '25px', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }}
                            value={currentSettings.yAxisPosition}
                            onChange={handleDropdownChange}
                        >
                            <option value="Left">Left</option>
                            <option value="Right">Right</option>
                        </select>
                    </div>
                </div>
                <div style={{ flex: 1, paddingBottom: '7px' }}>
                    <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', height: '32px' }}>
                        <input
                            type="checkbox"
                            checked={currentSettings.yAxisShowGridlines}
                            onChange={handleCheckboxChange}
                            style={{ marginRight: '5px' }}
                        />
                        Show gridlines
                    </label>
                </div>
            </div>
        </div>
    );
};


const XAxisConfig: React.FC<AxisConfigProps> = ({ currentSettings, onSettingsChange }) => {
    const periodOptions = ['Monthly', 'Quarterly', 'Yearly', 'Daily'];

    const handleCheckboxChange = (settingKey: 'showGridlines' | 'highlightReportDate') => (e: React.ChangeEvent<HTMLInputElement>) => {
        onSettingsChange({ [settingKey]: e.target.checked });
    };

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSettingsChange({ period: e.target.value as ChartSettings['period'] });
    };

    const handleDateChange = (settingKey: 'fromDate' | 'toDate') => (e: React.ChangeEvent<HTMLInputElement>) => {
        onSettingsChange({ [settingKey]: e.target.value });
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px', fontSize: '13px' }}>
                <label>
                    <input
                        type="checkbox"
                        checked={currentSettings.showGridlines}
                        onChange={handleCheckboxChange('showGridlines')}
                        style={{ marginRight: '5px' }}
                    />
                    Show gridlines
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={currentSettings.highlightReportDate}
                        onChange={handleCheckboxChange('highlightReportDate')}
                        style={{ marginRight: '5px' }}
                    />
                    Highlight report date
                </label>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <div style={labelStyle}>Period</div>
                <select
                    style={{ ...inputStyle, paddingRight: '25px', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }}
                    value={currentSettings.period}
                    onChange={handlePeriodChange}
                >
                    {periodOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                    <div style={labelStyle}>From Date</div>
                    <input
                        type="text"
                        value={currentSettings.fromDate}
                        onChange={handleDateChange('fromDate')}
                        style={inputStyle}
                        placeholder="Auto"
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={labelStyle}>To Date</div>
                    <input
                        type="text"
                        value={currentSettings.toDate}
                        onChange={handleDateChange('toDate')}
                        style={inputStyle}
                        placeholder="Auto"
                    />
                </div>
            </div>
        </div>
    );
};

const seriesStyles = {
    label: { fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px' } as React.CSSProperties,
    dropdownWrapper: { position: 'relative', width: '100%' } as React.CSSProperties,
    dropdown: {
        padding: '7px', border: '1px solid #ccc', borderRadius: '3px', width: '100%',
        backgroundColor: 'white', appearance: 'none', WebkitAppearance: 'none',
        MozAppearance: 'none', paddingRight: '25px', cursor: 'pointer',
        fontSize: '13px'
    } as React.CSSProperties,
    arrow: {
        position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
        pointerEvents: 'none', fontSize: '12px', color: '#666',
    } as React.CSSProperties,
};

interface RenderDropdownSeriesProps {
    label: string;
    settingKey: keyof ChartSettings;
    options: string[];
    currentSettings: ChartSettings;
    handleDropdownChange: (e: React.ChangeEvent<HTMLSelectElement>, settingKey: keyof ChartSettings) => void;
}

const RenderDropdownSeries: React.FC<RenderDropdownSeriesProps> = ({
    label,
    settingKey,
    options,
    currentSettings,
    handleDropdownChange,
}) => (
    <div style={{ flexGrow: 1 }}>
        <div style={seriesStyles.label}>{label}</div>
        <div style={seriesStyles.dropdownWrapper}>
            <select
                style={seriesStyles.dropdown}
                value={currentSettings[settingKey] as string}
                onChange={(e) => handleDropdownChange(e, settingKey)}
            >
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            <span style={seriesStyles.arrow}>&#x25BC;</span>
        </div>
    </div>
);


interface SeriesConfigTabProps {
    currentSettings: ChartSettings;
    onSettingsChange: (settings: Partial<ChartSettings>) => void;
}

const SeriesConfigTab: React.FC<SeriesConfigTabProps> = ({ currentSettings, onSettingsChange }) => {

    const inputRowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '15px' };

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>, settingKey: keyof ChartSettings) => {
        const value = e.target.value;
        onSettingsChange({ [settingKey]: value  }); 
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
                    <div style={seriesStyles.label}>Title</div>
                    <input type="text" defaultValue="Liquidity" style={{ padding: '7px', border: '1px solid #ccc', borderRadius: '3px', width: '100%', fontSize: '13px' }} />
                </div>
                <div style={{ width: '70px' }}>
                    <div style={seriesStyles.label}>Colour</div>
                    <input
                        type="color"
                        value={currentSettings.color}
                        onChange={handleColorChange}
                        style={{ height: '32px', width: '100%', padding: 0, border: '1px solid #ccc', cursor: 'pointer' }}
                    />
                </div>
            </div>

            <div style={inputRowStyle}>
                <RenderDropdownSeries
                    label="Type"
                    settingKey="type"
                    options={['Curve', 'Line', 'Bar']}
                    currentSettings={currentSettings}
                    handleDropdownChange={handleDropdownChange}
                />

                <RenderDropdownSeries
                    label="Marker"
                    settingKey="marker"
                    options={['Dot', 'None', 'Square', 'Star']}
                    currentSettings={currentSettings}
                    handleDropdownChange={handleDropdownChange}
                />
            </div>

            <div style={inputRowStyle}>
                <RenderDropdownSeries
                    label="Data Label Options"
                    settingKey="dataLabelOption"
                    options={['Number', 'None', 'Percentage']}
                    currentSettings={currentSettings}
                    handleDropdownChange={handleDropdownChange}
                />

                <RenderDropdownSeries
                    label="Data Label Font Size"
                    settingKey="dataLabelFontSize"
                    options={['11px', '10px', '9px']}
                    currentSettings={currentSettings}
                    handleDropdownChange={handleDropdownChange}
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
    const [activeTab, setActiveTab] = useState<TabName>('Chart');
    const [openDropdown, setOpenDropdown] = useState<'Title' | 'X Axis' | 'Y Axis' | 'Narration' | null>(null);

    const handleReset = () => {
        onSettingsChange({ ...initialSettings }); 
        console.log('Chart Reset to initial settings.');
    };

    const handleUpdate = () => {
        console.log('Update Clicked. Changes are already live on the chart.');
    };

    const handleToggleDropdown = (label: 'Title' | 'X Axis' | 'Y Axis' | 'Narration') => {
        setOpenDropdown(openDropdown === label ? null : label);
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

            <div style={{ minHeight: '350px', maxHeight: '400px', overflowY: 'auto' }}>
                {activeTab === 'Chart' && (
                    <>
                        <DropdownSetting
                          label="Title"
                          isOpen={openDropdown === 'Title'}
                          onToggle={() => handleToggleDropdown('Title')}
                        />

                        <DropdownSetting
                          label="X Axis"
                          isOpen={openDropdown === 'X Axis'}
                          onToggle={() => handleToggleDropdown('X Axis')}
                        >
                            <XAxisConfig
                              currentSettings={currentSettings}
                              onSettingsChange={onSettingsChange}
                            />
                        </DropdownSetting>

                        <DropdownSetting
                          label="Y Axis"
                          isOpen={openDropdown === 'Y Axis'}
                          onToggle={() => handleToggleDropdown('Y Axis')}
                        >
                            <YAxisConfig
                              currentSettings={currentSettings}
                              onSettingsChange={onSettingsChange}
                            />
                        </DropdownSetting>

                        <DropdownSetting
                          label="Narration"
                          isOpen={openDropdown === 'Narration'}
                          onToggle={() => handleToggleDropdown('Narration')}
                        />
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