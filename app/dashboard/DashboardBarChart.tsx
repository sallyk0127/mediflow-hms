// components/DashboardBarChart.tsx
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
    <div className="w-full">
      {/* Chart container with fixed height */}
      <div className="w-full h-32 flex items-end justify-between gap-4 mb-4">
        {data.map((item, index) => {
          // Calculate height percentage based on value
          const heightPercentage = (item.value / maxValue) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center w-full">
              {/* Value label */}
              <div className="mb-1 text-sm font-medium">{item.value}%</div>
              
              {/* Bar container with fixed height */}
              <div className="w-full h-24 flex items-end">
                {/* The actual bar */}
                <div
                  className={`w-full ${item.color} rounded-t-md`}
                  style={{ height: `${heightPercentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Labels */}
      <div className="grid grid-cols-5 gap-4">
        {data.map((item, index) => (
          <div key={index} className={`${item.textColor} text-center text-xs font-medium`}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}