import React from 'react';

interface BarData {
  label: string;
  value: number;
  color: string;
  textColor: string;
}

interface DashboardBarChartProps {
  data: BarData[];
}

export default function DashboardBarChart({ data }: DashboardBarChartProps) {
  // Check if data is available
  if (!data || data.length === 0) {
    return <div className="text-center py-4 text-gray-500 text-sm">No data available</div>;
  }

  // Calculate the maximum value for scaling
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Chart labels on top */}
      <div className="flex w-full justify-between mb-2">
        {data.map((item, index) => (
          <div key={`label-${index}`} className="text-center text-xs font-medium text-gray-700 flex-1">
            {item.value}
          </div>
        ))}
      </div>
      
      {/* Chart container with fixed height */}
      <div className="w-full flex-grow flex items-end justify-between gap-2 mb-2">
        {data.map((item, index) => {
          // Calculate height percentage based on value (minimum 5% to always show something)
          const heightPercentage = maxValue > 0 ? Math.max(5, (item.value / maxValue) * 100) : 5;
          
          return (
            <div key={`bar-${index}`} className="flex flex-col items-center w-full h-full">
              {/* Bar container with full height */}
              <div className="w-full h-full flex items-end">
                {/* The actual bar */}
                <div
                  className={`w-full ${item.color} rounded-t-md transition-all duration-300`}
                  style={{ height: `${heightPercentage}%`, minHeight: '8px' }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Labels at bottom */}
      <div className="flex w-full justify-between">
        {data.map((item, index) => (
          <div key={`name-${index}`} className={`${item.textColor} text-center text-xs font-medium truncate flex-1`}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}