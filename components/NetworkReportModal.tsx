import React from 'react';
import { NetworkReportData } from '../types';
import { EyeIcon, PhoneIcon, CubeIcon, ActivityIcon } from './Icons';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface NetworkReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: NetworkReportData;
}

const StatBox = ({ label, value, icon, colorClass }: { label: string, value: string | number, icon: React.ReactNode, colorClass: string }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <h3 className="text-xl font-bold text-gray-800">{value}</h3>
    </div>
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
      {icon}
    </div>
  </div>
);

const NetworkReportModal: React.FC<NetworkReportModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-blue-600"><ActivityIcon /></span>
              تقرير أداء الشبكة
            </h2>
            <p className="text-sm text-gray-500 mt-1">إحصائيات تفاعل التجار مع منتجاتك المعروضة</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatBox 
              label="مرات الظهور في البحث" 
              value={data.totalImpressions.toLocaleString()} 
              icon={<EyeIcon />}
              colorClass="bg-blue-100 text-blue-600"
            />
            <StatBox 
              label="مشاهدات جهة الاتصال" 
              value={data.totalViews} 
              icon={<PhoneIcon />}
              colorClass="bg-green-100 text-green-600"
            />
            <StatBox 
              label="المنتجات النشطة" 
              value={data.activeProducts} 
              icon={<CubeIcon />}
              colorClass="bg-purple-100 text-purple-600"
            />
            <StatBox 
              label="معدل التفاعل" 
              value={`${((data.totalViews / data.totalImpressions) * 100).toFixed(1)}%`} 
              icon={<ActivityIcon />}
              colorClass="bg-orange-100 text-orange-600"
            />
          </div>

          {/* Activity Chart */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 text-sm">نشاط الأيام السبعة الماضية</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: 'rgba(0,0,0,0.05)'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} 
                  />
                  <Bar dataKey="impressions" name="الظهور" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="views" name="التواصل" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Performing Products */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4 text-sm">أعلى المنتجات تفاعلاً</h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-right">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
                  <tr>
                    <th className="px-4 py-3">المنتج</th>
                    <th className="px-4 py-3">رقم القطعة</th>
                    <th className="px-4 py-3">الظهور</th>
                    <th className="px-4 py-3">التواصل</th>
                    <th className="px-4 py-3">آخر نشاط</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.topProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{product.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 font-mono">{product.partNumber}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{product.impressions}</td>
                      <td className="px-4 py-3 text-sm text-green-600 font-bold">{product.views}</td>
                      <td className="px-4 py-3 text-xs text-gray-400">{product.lastViewed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end">
           <button 
             onClick={onClose}
             className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 font-medium transition-colors"
           >
             إغلاق
           </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkReportModal;
