import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ChartIcon, TrendingUpIcon, WalletIcon, CartIcon, UsersIcon } from './Icons';
import { ANALYTICS_REVENUE_DATA, ANALYTICS_BRAND_DATA, TOP_SELLING_PRODUCTS } from '../constants';

const KPICard = ({ label, value, trend, icon, color }: { label: string, value: string, trend: string, icon: any, color: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      <span className="text-xs font-medium text-green-500 flex items-center gap-1 mt-1">
        <TrendingUpIcon /> {trend}
      </span>
    </div>
    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
      {icon}
    </div>
  </div>
);

const AnalyticsPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-blue-600"><ChartIcon /></span>
            التقارير الشاملة
          </h2>
          <p className="text-sm text-gray-500 mt-1">نظرة عامة على أداء المتجر والمبيعات</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg flex text-sm overflow-hidden">
          <button className="px-4 py-2 bg-blue-50 text-blue-600 font-medium">شهري</button>
          <button className="px-4 py-2 hover:bg-gray-50 text-gray-600">ربع سنوي</button>
          <button className="px-4 py-2 hover:bg-gray-50 text-gray-600">سنوي</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          label="إجمالي الإيرادات" 
          value="328,000 ر.س" 
          trend="+12.5% مقارنة بالشهر الماضي" 
          icon={<WalletIcon />}
          color="bg-green-100 text-green-600"
        />
        <KPICard 
          label="إجمالي الطلبات" 
          value="1,450" 
          trend="+5.2% مقارنة بالشهر الماضي" 
          icon={<CartIcon />}
          color="bg-blue-100 text-blue-600"
        />
        <KPICard 
          label="العملاء الجدد" 
          value="320" 
          trend="+8.1% مقارنة بالشهر الماضي" 
          icon={<UsersIcon />}
          color="bg-purple-100 text-purple-600"
        />
        <KPICard 
          label="متوسط قيمة الطلب" 
          value="226 ر.س" 
          trend="-2.4% مقارنة بالشهر الماضي" 
          icon={<TrendingUpIcon />}
          color="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">تحليل الإيرادات والأرباح</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_REVENUE_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="الإيرادات" />
                <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" name="الأرباح" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Brand Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4">توزيع المبيعات حسب الماركة</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ANALYTICS_BRAND_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ANALYTICS_BRAND_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">المنتجات الأكثر مبيعاً</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">عرض الكل</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="py-4 px-6 font-medium">اسم المنتج</th>
                <th className="py-4 px-6 font-medium">عدد المبيعات</th>
                <th className="py-4 px-6 font-medium">إجمالي الإيرادات</th>
                <th className="py-4 px-6 font-medium">النمو</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {TOP_SELLING_PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-gray-800 font-medium">{product.name}</td>
                  <td className="py-4 px-6 text-gray-600">{product.sales}</td>
                  <td className="py-4 px-6 text-gray-600">{product.revenue.toLocaleString()} ر.س</td>
                  <td className={`py-4 px-6 font-medium ${product.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {product.growth}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
