// components/LiquidityChart.tsx
import React from 'react';
import { ChartSettings } from './LayoutPage'; 

interface LiquidityChartProps {
    settings: ChartSettings; // Reads live settings
}

const LiquidityChart: React.FC<LiquidityChartProps> = ({ settings }) => {
    
    // --- Data and Scaling ---
    const data = [
        { month: 'JAN', value: 27 }, { month: 'FEB', value: 784 }, { month: 'MAR', value: 478 }, 
        { month: 'APR', value: 309 }, { month: 'MAY', value: 198 }, { month: 'JUN', value: 90 }, 
        { month: 'JUL', value: -12 }, { month: 'AUG', value: -88 }, { month: 'SEP', value: 453 }, 
        { month: 'OCT', value: 564 },
    ];

    const CHART_WIDTH = 350; 
    const CHART_HEIGHT = 300; 
    
    const MAX_Y = 800;
    const MIN_Y = -100;
    const Y_RANGE = MAX_Y - MIN_Y;

    const getYPos = (value: number) => {
        const normalizedValue = (value - MIN_Y) / Y_RANGE;
        return CHART_HEIGHT - (normalizedValue * CHART_HEIGHT);
    };

    const getXPos = (index: number) => {
        return (index / (data.length - 1)) * CHART_WIDTH;
    };

    const X_AXIS_Y_POS = getYPos(0);
    const Y_GRID_LINES = [800, 600, 400, 200, 0]; 

    // Function to generate path (Curve/Line logic)
    const generatePath = () => {
        if (settings.type === 'Bar') return ''; 
        
        if (settings.type === 'Line') {
             return data.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getXPos(i)} ${getYPos(p.value)}`).join(' ');
        }
        
        // Curve logic (default)
        let path = `M ${getXPos(0)} ${getYPos(data[0].value)}`;
        for (let i = 0; i < data.length - 1; i++) {
            const x1 = getXPos(i); const y1 = getYPos(data[i].value);
            const x2 = getXPos(i + 1); const y2 = getYPos(data[i + 1].value);

            const ctrlX1 = x1 + (x2 - x1) / 3; const ctrlY1 = y1;
            const ctrlX2 = x1 + 2 * (x2 - x1) / 3; const ctrlY2 = y2;
            path += ` C ${ctrlX1} ${ctrlY1}, ${ctrlX2} ${ctrlY2}, ${x2} ${y2}`;
        }
        return path;
    };

    // Star Path Generator (5-pointed star)
    const STAR_SIZE = 5; 
    const getStarPath = (cx: number, cy: number, size: number) => {
        const spikes = 5;
        const outerRadius = size;
        const innerRadius = size / 2.5; 
        
        let path = '';
        for (let i = 0; i < spikes * 2; i++) {
            const angle = Math.PI / spikes * i;
            const r = i % 2 === 0 ? outerRadius : innerRadius;
            const x = cx + r * Math.sin(angle);
            const y = cy - r * Math.cos(angle);
            path += (i === 0 ? 'M' : 'L') + x + ',' + y;
        }
        path += 'Z';
        return path;
    };

    const pathData = generatePath();
    const months = data.map(p => p.month);
    
    const shouldShowLabels = settings.dataLabelOption !== 'None';
    const shouldShowMarkers = settings.marker !== 'None';
    
    return (
        <div style={{
            padding: '15px', 
            backgroundColor: 'white', border: '1px solid #eee',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)', 
            width: `${CHART_WIDTH + 70}px`, 
            fontFamily: 'Arial, sans-serif',
        }}>
          <h2 style={{ 
            fontSize: '14px', fontWeight: 'bold', color: '#2c3e50', marginBottom: '30px', 
            marginLeft: '35px', textTransform: 'uppercase'
          }}>
            LIQUIDITY MONITOR
          </h2>

          <div style={{ 
            position: 'relative', width: CHART_WIDTH + 40, margin: '0 15px 0 35px' 
          }}>
            
            {/* Y-Axis Labels Container (Same) */}
            <div style={{ 
              position: 'absolute', top: 0, left: -35, height: CHART_HEIGHT, width: 35, 
              fontSize: '10px', color: '#666' 
            }}>
              <div style={{ position: 'absolute', top: getYPos(800) - 8, left: 0 }}>800 Dirham (000)</div>
              {Y_GRID_LINES.slice(1).map(val => (
                  <div key={val} style={{ position: 'absolute', top: getYPos(val) - 8, left: 0 }}>
                      {val}
                  </div>
              ))}
            </div>

            {/* SVG Drawing Area */}
            <svg 
              width={CHART_WIDTH} height={CHART_HEIGHT} 
              viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} style={{ overflow: 'visible' }}
            >
              {/* Grid Lines (Same) */}
              {Y_GRID_LINES.map(val => {
                const y = getYPos(val);
                const isZeroLine = val === 0;
                return (
                    <line 
                        key={`grid-${val}`} x1="0" y1={y} x2={CHART_WIDTH} y2={y} 
                        stroke={isZeroLine ? '#ccc' : '#eee'} strokeWidth="1" 
                    />
                );
              })}

              {/* The Main Path: Renders for Curve or Line types */}
              {settings.showSeries && settings.type !== 'Bar' && (
                <path d={pathData} fill="none" stroke={settings.color} strokeWidth="2" />
              )}

              {/* Bar Chart Rendering (Same) */}
              {settings.type === 'Bar' && data.map((point, index) => {
                  const width = (CHART_WIDTH / data.length) * 0.7; 
                  const x = getXPos(index) - (CHART_WIDTH / data.length) / 2 + 15;
                  const y = getYPos(Math.max(0, point.value));
                  const height = Math.abs(getYPos(point.value) - X_AXIS_Y_POS);
                  return (
                      <rect
                          key={point.month} x={x} y={y} width={width - 18} height={height} 
                          fill={settings.color}
                      />
                  );
              })}

              {/* Data Points and Value Labels */}
              {settings.showSeries && data.map((point, index) => {
                const cx = getXPos(index);
                const cy = getYPos(point.value);
                const isNegative = point.value < 0;

                const currentMarker = settings.marker;

                return (
                  <React.Fragment key={point.month}>
                    
                    {/* Marker Rendering */}
                    {shouldShowMarkers && settings.type !== 'Bar' && (
                        <>
                            {currentMarker === 'Dot' && (
                                <circle cx={cx} cy={cy} r={2.5} fill={settings.color} />
                            )}
                            {currentMarker === 'Square' && (
                                <rect 
                                    x={cx - 3} y={cy - 3} width={6} height={6} 
                                    fill={settings.color} 
                                    transform={`rotate(45 ${cx} ${cy})`}
                                />
                            )}
                            {currentMarker === 'Star' && (
                                <path 
                                    d={getStarPath(cx, cy, STAR_SIZE)} 
                                    fill={settings.color} 
                                    stroke="white" 
                                    strokeWidth="0.5"
                                />
                            )}
                        </>
                    )}

                    {/* Value Label */}
                    {shouldShowLabels && (
                        <text
                          x={cx} y={cy + (isNegative ? 15 : -8)}
                          textAnchor="middle" 
                          // Font Size Applied Here
                          fontSize={settings.dataLabelFontSize} 
                          fontWeight="bold"
                          fill={settings.color} 
                        >
                          {point.value}
                          {settings.dataLabelOption === 'Percentage' ? '%' : ''}
                        </text>
                    )}
                  </React.Fragment>
                );
              })}
            </svg>

            {/* X-Axis Labels (Same) */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', marginTop: '10px',
              fontSize: '10px', fontWeight: 'bold', color: '#666', width: CHART_WIDTH,
              borderTop: '1px solid #ccc', paddingTop: '5px'
            }}>
              {months.map(month => (
                <span key={month} style={{ margin: '0 1px' }}>{month}</span>
              ))}
            </div>
          </div>
        </div>
    );
};

export default LiquidityChart;