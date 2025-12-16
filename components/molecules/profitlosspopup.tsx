
import React from 'react';

interface ProfitlosspageProps {
    onHide: () => void;
    currentReportType: 'NOP' | 'EBITDA'; 
    currentRowLayout: 'charts' | 'summary' | 'detailed'; 
    onSettingChange: (setting: 'reportType' | 'rowOptions', value: string) => void; 
}

const profitlosspage: React.FC<ProfitlosspageProps> = ({ 
    onHide, 
    currentReportType, 
    currentRowLayout, 
    onSettingChange 
}) => {
    
    const handleChange = (setting: 'reportType' | 'rowOptions', value: string) => {
        onSettingChange(setting, value);
    };
    
    return (
        <div className="p-0 sm:p-4 bg-white shadow-lg rounded-lg max-w-xl mx-auto">
            
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                <span className="text-lg font-bold text-blue-500">
                    Profit and Loss
                </span>
                <button 
                    onClick={onHide} 
                    className="text-sm text-red-600 font-medium hover:text-red-700 transition duration-150 focus:outline-none"
                >
                    Hide Settings
                </button>
            </div>

            <div className="px-6 pb-6">
                
                <div className="pt-4">
                    <p className="text-sm text-gray-600 mb-4">Page Basis: Accrual</p>
                </div>

                <div className="pt-4">
                    <h3 className="text-base font-bold mb-3 text-gray-800">Report Type</h3>
                    <div className="space-y-2">
                        <label className="flex items-center cursor-pointer text-sm text-gray-700">
                            <input 
                                type="radio" 
                                name="reportType" 
                                value="NOP"
                                checked={currentReportType === "NOP"}
                                onChange={() => handleChange("reportType", "NOP")}
                                className="form-radio h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                            /> 
                            <span className="ml-2">NOP</span>
                        </label>
                        <label className="flex items-center cursor-pointer text-sm text-gray-700">
                            <input 
                                type="radio" 
                                name="reportType" 
                                value="EBITDA"
                                checked={currentReportType === "EBITDA"}
                                onChange={() => handleChange("reportType", "EBITDA")}
                                className="form-radio h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                            /> 
                            <span className="ml-2">EBITDA</span>
                        </label>
                    </div>
                </div>

                <div className="my-4 border-b border-gray-200"></div> 

                <div className="pt-2">
                    <h3 className="text-base font-bold mb-3 text-gray-800">Row Options</h3>
                    <button className="text-sm text-blue-500 hover:text-blue-600 mb-4 focus:outline-none">
                        Create New Layout
                    </button>
                    
                    <p className="text-sm font-medium text-gray-700 mb-3">Choose from an existing layout</p>
                    <div className="space-y-2">
                        <label className="flex items-center cursor-pointer text-sm text-gray-700">
                            <input 
                                type="radio" 
                                name="rowOptions" 
                                value="charts"
                                checked={currentRowLayout === "charts"}
                                onChange={() => handleChange("rowOptions", "charts")}
                                className="form-radio h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                            /> 
                            <span className="ml-2">Summary with charts</span>
                        </label>
                        <label className="flex items-center cursor-pointer text-sm text-gray-700">
                            <input 
                                type="radio" 
                                name="rowOptions" 
                                value="summary"
                                checked={currentRowLayout === "summary"}
                                onChange={() => handleChange("rowOptions", "summary")}
                                className="form-radio h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                            /> 
                            <span className="ml-2">Summary only</span>
                        </label>
                        <label className="flex items-center cursor-pointer text-sm text-gray-700">
                            <input 
                                type="radio" 
                                name="rowOptions" 
                                value="detailed"
                                checked={currentRowLayout === "detailed"}
                                onChange={() => handleChange("rowOptions", "detailed")}
                                className="form-radio h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                            /> 
                            <span className="ml-2">Detailed</span>
                        </label>
                    </div>
                </div>

                <div className="my-4 border-b border-gray-200"></div>

                <div className="pt-2">
                    <h3 className="text-base font-bold mb-3 text-gray-800">Column Options</h3>
                    <button className="text-sm text-blue-500 hover:text-blue-600 focus:outline-none">
                        Customise Columns
                    </button>
                </div>

                <div className="pt-6">
                    <button 
                        onClick={onHide} 
                        className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default profitlosspage;