import React from 'react';
import { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ label, value, subLabel, colorClass, icon }) => {
  const colors = {
    red: { bg: 'bg-[#faeaea]', text: 'text-[#d63031]' },
    green: { bg: 'bg-[#e5f9e9]', text: 'text-[#27ae60]' },
    gray: { bg: 'bg-[#f1f2f6]', text: 'text-[#2f3542]' },
    yellow: { bg: 'bg-[#fff7d6]', text: 'text-[#f1c40f]' },
  };

  const activeColor = colors[colorClass];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between border border-transparent hover:border-gray-100 transition-all">
       {/* Text Section */}
       <div className="flex flex-col gap-1 text-right w-full">
         <h3 className="text-2xl font-bold text-gray-800 tracking-tight">{value}</h3>
         <p className="text-sm text-gray-500 font-medium">{label}</p>
         <p className="text-xs text-gray-400 mt-1">{subLabel}</p>
       </div>
       
       {/* Icon Section */}
       <div className={`w-14 h-14 rounded-2xl ${activeColor.bg} ${activeColor.text} flex items-center justify-center shrink-0 mr-4`}>
         {icon}
       </div>
    </div>
  );
};

export default StatCard;
