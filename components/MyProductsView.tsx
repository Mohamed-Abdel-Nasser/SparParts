import React, { useState } from 'react';
import { NetworkPart } from '../types';
import { ActivityIcon, ArrowUpIcon, ArrowDownIcon, CheckCircleIcon, AlertCircleIcon, GlobeIcon, MapPinIcon, WalletIcon, EditIcon, CheckCircleIcon as SaveIcon, ChevronLeftIcon } from './Icons';
import { translations } from '../translations';

interface MyProductsViewProps {
  products: NetworkPart[];
  onUpdatePrice?: (id: string, newPrice: number) => void;
  language?: 'ar' | 'en';
}

const StatBox = ({ label, value, icon, colorClass, subText }: { label: string, value: string | number, icon: React.ReactNode, colorClass: string, subText?: React.ReactNode }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-xs mb-1">{label}</p>
      <h3 className="text-xl font-bold text-gray-800">{value}</h3>
      {subText && <div className="text-[10px] text-gray-500 mt-1">{subText}</div>}
    </div>
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
      {icon}
    </div>
  </div>
);

const ActionCard = ({ type, count, t }: { type: 'increase' | 'decrease' | 'restock', count: number, t: any }) => {
  if (count === 0) return null;
  
  let config = { label: '', sub: '', icon: null, color: '', bg: '', border: '' };
  
  switch(type) {
      case 'increase': 
          config = { 
            label: t.increaseProfit, 
            sub: '',
            icon: <ArrowUpIcon />, 
            color: 'text-green-700', 
            bg: 'bg-green-50', 
            border: 'border-green-200' 
          };
          break;
      case 'decrease': 
          config = { 
            label: t.boostSales, 
            sub: '',
            icon: <ArrowDownIcon />, 
            color: 'text-orange-700', 
            bg: 'bg-orange-50', 
            border: 'border-orange-200' 
          };
          break;
      case 'restock': 
          config = { 
            label: t.stockAlerts, 
            sub: '',
            icon: <AlertCircleIcon />, 
            color: 'text-red-700', 
            bg: 'bg-red-50', 
            border: 'border-red-200' 
          };
          break;
  }

  return (
      <div className={`p-4 rounded-xl border ${config.border} ${config.bg} flex items-center justify-between cursor-pointer hover:shadow-md transition-all`}>
          <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${config.color} shadow-sm`}>
                  {config.icon}
              </div>
              <div>
                  <h4 className={`font-bold ${config.color} text-lg`}>{count} {t.products}</h4>
                  <p className="text-sm font-medium text-gray-800">{config.label}</p>
              </div>
          </div>
          <div className={`${config.color} opacity-50`}>
              <ChevronLeftIcon /> 
          </div>
      </div>
  );
};

const getRecommendation = (product: NetworkPart, t: any) => {
    const marketPrice = product.marketAveragePrice || product.price;
    const priceDiffPercent = marketPrice > 0 ? ((product.price - marketPrice) / marketPrice) * 100 : 0;

    if (product.quantity === 0) {
        return { label: t.stockAlerts, type: 'restock' };
    } else if (product.quantity < 5 && priceDiffPercent < -10) {
        return { label: t.increase, type: 'increase' };
    } else if (priceDiffPercent < -15) {
        return { label: t.increase, type: 'increase' };
    } else if (priceDiffPercent > 5) {
        return { label: t.save, type: 'decrease' };
    } else {
        return { label: 'Good', type: 'good' };
    }
}

const MyProductsView: React.FC<MyProductsViewProps> = ({ products, onUpdatePrice, language = 'ar' }) => {
  const t = translations[language];
  // State for inline editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  // Calculate Totals
  const totalImpressions = products.reduce((acc, curr) => acc + (curr.impressions || 0), 0);
  const totalExposureValue = products.reduce((acc, curr) => acc + (curr.price * (curr.impressions || 0)), 0);
  const totalLocalSearches = products.reduce((acc, curr) => acc + (curr.localSearchCount || 0), 0);
  const totalNationalSearches = products.reduce((acc, curr) => acc + (curr.nationalSearchCount || 0), 0);
  
  // Calculate Avg Competitiveness
  const priceDifferences = products
    .filter(p => p.marketAveragePrice)
    .map(p => ((p.price - (p.marketAveragePrice || p.price)) / (p.marketAveragePrice || p.price)) * 100);
  
  const avgDiff = priceDifferences.length > 0 
    ? priceDifferences.reduce((a, b) => a + b, 0) / priceDifferences.length 
    : 0;

  // Calculate Recommendation Counts
  const recs = products.map(p => getRecommendation(p, t));
  const increaseCount = recs.filter(r => r.type === 'increase').length;
  const decreaseCount = recs.filter(r => r.type === 'decrease').length;
  const restockCount = recs.filter(r => r.type === 'restock').length;

  const startEditing = (product: NetworkPart) => {
    setEditingId(product.id);
    setEditValue(product.price.toString());
  };

  const savePrice = (id: string) => {
    if (onUpdatePrice && editValue) {
      onUpdatePrice(id, parseFloat(editValue));
    }
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Exposure Value */}
        <StatBox 
          label={t.marketExposure}
          value={`${(totalExposureValue / 1000).toFixed(1)}K ${t.sar}`} 
          subText={<span>{t.impressions}: <span className="font-bold text-gray-700">{totalImpressions.toLocaleString()}</span></span>}
          icon={<WalletIcon />}
          colorClass="bg-purple-100 text-purple-600"
        />

        {/* Card 2: Search Geography */}
        <StatBox 
          label={t.geoSearch}
          value={totalLocalSearches + totalNationalSearches} 
          subText={
             <div className="flex gap-2">
                <span className="flex items-center gap-1"><MapPinIcon /> {totalLocalSearches}</span>
                <span className="flex items-center gap-1 text-gray-400">|</span>
                <span className="flex items-center gap-1"><GlobeIcon /> {totalNationalSearches}</span>
             </div>
          }
          icon={<GlobeIcon />}
          colorClass="bg-blue-100 text-blue-600"
        />

        {/* Card 3: Competitiveness */}
        <StatBox 
          label={t.priceCompetitiveness}
          value={`${Math.abs(avgDiff).toFixed(1)}%`} 
          subText={avgDiff <= 0 ? (language === 'ar' ? 'أرخص من متوسط السوق' : 'Cheaper than market avg') : (language === 'ar' ? 'أغلى من متوسط السوق' : 'Higher than market avg')}
          icon={<ActivityIcon />}
          colorClass={avgDiff <= 0 ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}
        />
      </div>

      {/* Recommendations Section */}
      {(increaseCount > 0 || decreaseCount > 0 || restockCount > 0) && (
        <div className="animate-fade-in">
           <h3 className="font-bold text-gray-800 mb-3 text-lg flex items-center gap-2">
             <ActivityIcon />
             {t.smartRecommendations}
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ActionCard type="increase" count={increaseCount} t={t} />
              <ActionCard type="decrease" count={decreaseCount} t={t} />
              <ActionCard type="restock" count={restockCount} t={t} />
           </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
           <h3 className="font-bold text-gray-800">{t.myProductsList}</h3>
           <span className="text-xs text-gray-500">{products.length} {t.products}</span>
        </div>
        <div className="overflow-x-auto">
          <table className={`w-full ${language === 'ar' ? 'text-right' : 'text-left'} text-sm`}>
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-medium">{t.products}</th>
                <th className="px-6 py-3 font-medium w-40">{t.myPrice}</th>
                <th className="px-6 py-3 font-medium">{t.lowestPrice}</th>
                <th className="px-6 py-3 font-medium">{t.marketAvg}</th>
                <th className="px-6 py-3 font-medium">{t.impressions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.length > 0 ? (
                products.map((product) => {
                  const recommendation = getRecommendation(product, t);
                  const isEditing = editingId === product.id;

                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-800">{product.partName}</div>
                        <div className="text-xs text-gray-500 font-mono">{product.partNumber}</div>
                        <div className="text-[10px] text-gray-400 mt-1">Qty: {product.quantity}</div>
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                             <input 
                               type="number"
                               value={editValue}
                               onChange={(e) => setEditValue(e.target.value)}
                               className="w-20 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 font-bold text-gray-800"
                               autoFocus
                               onKeyDown={(e) => {
                                 if (e.key === 'Enter') savePrice(product.id);
                                 if (e.key === 'Escape') setEditingId(null);
                               }}
                             />
                             <button onClick={() => savePrice(product.id)} className="text-green-600 hover:text-green-700">
                               <SaveIcon />
                             </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 group">
                             <div className="font-bold text-gray-800 text-lg">
                                {product.price} <span className="text-xs font-normal">{t.sar}</span>
                             </div>
                             <button onClick={() => startEditing(product)} className="text-gray-300 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all">
                               <EditIcon />
                             </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-green-700 font-bold">
                        {product.lowestMarketPrice ? (
                            <span>{product.lowestMarketPrice} <span className="text-xs font-normal">{t.sar}</span></span>
                        ) : (
                            <span className="text-gray-400 text-xs">--</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {product.marketAveragePrice} <span className="text-xs">{t.sar}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-600">{product.impressions || 0}</div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    {t.noResults}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProductsView;