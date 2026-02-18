import React from 'react';
import { BranchData } from '../types';

interface BranchTableProps {
  data: BranchData[];
}

const BranchTable: React.FC<BranchTableProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-lg text-gray-800">مبيعات الفروع</h3>
        <span className="text-xs text-gray-400">JANUARY 2026 11</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm">
              <th className="py-4 px-6 font-medium">الاسم</th>
              <th className="py-4 px-6 font-medium">المدينة</th>
              <th className="py-4 px-6 font-medium">مبيعات اليوم</th>
              <th className="py-4 px-6 font-medium">مبيعات الشهر</th>
              <th className="py-4 px-6 font-medium">مبيعات السنة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((branch) => (
              <tr key={branch.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm text-gray-600 font-medium">{branch.name}</td>
                <td className="py-4 px-6 text-sm text-gray-500">{branch.city}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{branch.dailySales.toFixed(2)}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{branch.monthlySales.toFixed(2)}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{branch.yearlySales.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BranchTable;
