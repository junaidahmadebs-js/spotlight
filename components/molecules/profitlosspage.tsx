import React, { useState, useMemo } from 'react';
import ReportSettings from './profitlosspopup';

interface PnLLineItem {
  name: string;
  actual: number | null;
  percent: number | null;
  isHeader?: boolean;
  isCalculated?: boolean;
  isPercentage?: boolean;
  className?: string;
  reportFilter?: 'EBITDA' | 'NOP' | 'Both'; 
}

const ytdData: PnLLineItem[] = [
  { name: "Revenue", actual: null, percent: null, isHeader: true, className: "header-row-line", reportFilter: 'Both' },
  { name: "Sales", actual: 1447385, percent: 100.0, className: "", reportFilter: 'Both' },
  { name: "Total Revenue", actual: 1447385, percent: 100.0, isCalculated: true, className: "heavy-border", reportFilter: 'Both' },
  { name: "Cost of Sales", actual: 627444, percent: 43.4, className: "", reportFilter: 'Both' },
  { name: "Gross Profit", actual: 819941, percent: 56.6, isCalculated: true, className: "heavy-border", reportFilter: 'Both' },
  { name: "GP%", actual: 56.6, percent: null, isPercentage: true, className: "percentage-row", reportFilter: 'Both' },
  { name: "OPEX", actual: 368553, percent: 25.5, className: "", reportFilter: 'Both' },
    { name: "Operating Profit", actual: 451388, percent: 31.2, isCalculated: true, className: "heavy-border", reportFilter: 'NOP' },
  
  { name: "Other Revenue", actual: 0, percent: 0.0, className: "", reportFilter: 'EBITDA' }, 
  { name: "EBITDA", actual: 451388, percent: 31.2, isCalculated: true, className: "heavy-border", reportFilter: 'EBITDA' },
  { name: "EBITDA%", actual: 31.2, percent: null, isPercentage: true, className: "percentage-row", reportFilter: 'EBITDA' },
  
  { name: "EBIT", actual: 450138, percent: 31.1, isCalculated: true, className: "", reportFilter: 'Both' },
  { name: "EBT", actual: 450138, percent: 31.1, isCalculated: true, className: "", reportFilter: 'Both' },
];

const formatCurrency = (value: number | null): string => {
  if (value === null || isNaN(value)) return '';
  return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
};

const formatPercentage = (value: number | null): string => {
  if (value === null || isNaN(value)) return '';
  return `${value.toFixed(1)}%`;
};


const PLPage: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  
  const [reportType, setReportType] = useState<'NOP' | 'EBITDA'>('EBITDA');
  const [rowLayout, setRowLayout] = useState<'charts' | 'summary' | 'detailed'>('charts');

  const [tempReportType, setTempReportType] = useState<'NOP' | 'EBITDA'>(reportType);
  const [tempRowLayout, setTempRowLayout] = useState<'charts' | 'summary' | 'detailed'>(rowLayout);

  const handleShowSettings = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); 
    setTempReportType(reportType);
    setTempRowLayout(rowLayout);
    setIsPopupOpen(true);
  };

  const handleConfirmOrClosePopup = () => {
    setReportType(tempReportType);
    setRowLayout(tempRowLayout);
    
    setIsPopupOpen(false);
  };

  const handleTempSettingChange = (setting: string, value: string) => {
      if (setting === 'reportType') {
          setTempReportType(value as 'NOP' | 'EBITDA');
      } else if (setting === 'rowOptions') {
          setTempRowLayout(value as 'charts' | 'summary' | 'detailed');
      }
  };

  const filteredData = useMemo(() => {
    return ytdData.filter(item => {
      if (item.reportFilter === 'Both') return true;
      return item.reportFilter === reportType;
    }).map(item => {
        if (item.name === "Operating Profit" && reportType === 'NOP') {
            return { ...item, name: "NOP", className: item.className + ' main-metric' };
        }
        return item;
    });
  }, [reportType]);


  const renderRow = (item: PnLLineItem) => {
    const rowClasses = [
        'data-row',
        item.isCalculated ? 'calculated-row' : '',
        item.isPercentage ? 'percentage-row' : '',
        item.className || '',
    ].filter(Boolean).join(' ');

    let actualContent: string;
    let percentContent: string;
    
    if (item.isPercentage && item.actual !== null) {
      actualContent = formatPercentage(item.actual);
      percentContent = '';
    } else {
      actualContent = formatCurrency(item.actual);
      percentContent = formatPercentage(item.percent);
    }
    
    const isPercentageRow = item.isPercentage;
    const isHeaderRow = item.isHeader;
    
    const actualBg = isPercentageRow || isHeaderRow ? 'transparent' : '#e1f0ff';
    const percentBg = isPercentageRow || isHeaderRow ? 'transparent' : '#e1f0ff';

    return (
      <div key={item.name} className={rowClasses}>
        <div className="label-col">{item.name}</div> 
        <div 
          className="data-col actual-value"
          style={{ backgroundColor: actualBg }}
        >
          {actualContent}
        </div>
        <div 
          className="data-col percent-value"
          style={{ backgroundColor: percentBg }}
        >
          {percentContent}
        </div>
      </div>
    );
  };

  
  if (isPopupOpen) {
    return (
        <div className="page-wrapper report-settings-mode">
            <div className="report-container">
                <ReportSettings 
                    onHide={handleConfirmOrClosePopup} 
                    currentReportType={tempReportType}
                    currentRowLayout={tempRowLayout}
                    onSettingChange={handleTempSettingChange}
                />
            </div>
        </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="report-container">
        
        <div className="header-row">
          <span className="report-title">Profit and Loss ({reportType})</span> 
          <a 
            href="#" 
            className="settings-link" 
            onClick={handleShowSettings} 
          >
            Show Settings
          </a>
        </div>

        <div className="table-header">
          <div className="label-col-header"style={{ backgroundColor: 'white' }}></div>
          <div className="ytd-header">YTD</div>
        </div>
        
        <div className="data-subheader">
          <div className="label-col-header"></div>
          
          <div className="actual-col" style={{ backgroundColor: '#8a8c90' }}>Actual</div>
          <div className="percent-col" style={{ backgroundColor: '#8a8c90' }}>% of Rev</div>
        </div>

        <div className="report-body">
          {filteredData.map(renderRow)}
        </div>
      </div>
      
      <style jsx global>{`
        /* ... (Your existing styles remain here) ... */
        .page-wrapper {
          font-family: Arial, sans-serif;
          font-size: 13px;
          background: #f4f6fb;
          padding: 20px;
          color: #333; 
          min-height: 100vh;
        }

        .report-container {
          width: 600px;
          margin: 0 auto;
          background: white; 
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .header-row {
          display: flex;
          justify-content: space-between;
          padding: 15px 30px;
        }

        .report-title {
          color: #4ba3e3;
          font-size: 16px;
          font-weight: bold;
        }

        .settings-link {
          color: #4ba3e3;
          text-decoration: none;
          font-size: 13px;
        }

        .table-header {
          display: flex;
          background-color: #8a8c90; 
          color: white; 
          font-weight: bold;
          text-align: right;
        }
        
        .label-col-header {
          flex-grow: 1;
          padding: 8px 30px;
          text-align: left;
        }

        .ytd-header {
          width: 180px;
          background-color: #d12f36; 
          padding: 8px 0;
          text-align: center;
        }

        .data-subheader {
          display: flex;
          background-color: #8a8c90; 
          color: white;
          font-weight: normal;
          text-align: center;
        }

        .actual-col,
        .percent-col {
          width: 90px;
          padding: 6px 0;
        }

        .report-body {
          display: flex;
          flex-direction: column;
        }

        .data-row {
          display: flex;
          border-bottom: 1px solid #eee;
          line-height: 1.2;
        }

        .label-col {
          flex-grow: 1;
          padding: 8px 30px;
          text-align: left;
          font-weight: normal;
        }

        .data-col {
          width: 90px;
          padding: 8px 0;
          text-align: right;
        }
        
        .data-col {
            background-color: #e1f0ff; 
        }
        
        .percent-value {
          padding-right: 8px;
        }

        .calculated-row .label-col,
        .calculated-row .data-col {
          font-weight: bold;
        }

        .percentage-row .label-col {
          font-weight: bold;
        }
        
        .percentage-row .data-col {
          background-color: #e1f0ff !important; 
          font-weight: bold;
        }

        .heavy-border {
          border-bottom: 2px solid #ccc;
        }
        
        .main-metric .label-col,
        .main-metric .data-col {
             /* Highlight the main metric (NOP or EBITDA) */
             background-color: #ffffe0 !important; 
             border-top: 1px solid #ccc;
        }


        .header-row-line .label-col {
          font-weight: bold;
          padding-top: 15px;
          padding-bottom: 4px;
          border-bottom: none;
        }
        .header-row-line .data-col {
          background-color: transparent;
          border-bottom: none;
          padding-top: 15px;
          padding-bottom: 4px;
        }

        .data-row:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
};

export default PLPage;