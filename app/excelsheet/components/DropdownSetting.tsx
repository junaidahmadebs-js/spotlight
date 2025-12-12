import React from 'react';

interface DropdownSettingProps {
  label: string;
}

const DropdownSetting: React.FC<DropdownSettingProps> = ({ label }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 15px',
      borderBottom: '1px solid #eee',
      backgroundColor: 'white',
      cursor: 'pointer' 
    }}>
      <span>{label}</span>
      <span style={{ fontSize: '18px', color: '#666' }}>&#x25BC;</span>
    </div>
  );
};

export default DropdownSetting;