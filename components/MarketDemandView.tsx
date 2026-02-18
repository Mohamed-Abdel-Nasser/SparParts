import React, { useState } from 'react';
import { SearchLog, ProductRequest } from '../types';
import { MARKET_SEARCH_LOGS, UNAVAILABLE_REQUESTS } from '../constants';
import { SearchIcon, TrendingUpIcon, FilterIcon, AlertCircleIcon } from './Icons';
import { translations } from '../translations';

interface MarketDemandViewProps {
  language?: 'ar' | 'en';
}

const MarketDemandView: React.FC<MarketDemandViewProps> = ({ language = 'ar' }) => {
  const t = translations[language];
  const [activeSubTab, setActiveSubTab] = useState<'searches' | 'requests'>('searches');
  const [requestBrandFilter, setRequestBrandFilter] = useState<string>('All');

  // Filter requests based on selected brand
  const filteredRequests = requestBrandFilter === 'All' 
    ? UNAVAILABLE_REQUESTS 
    : UNAVAILABLE_REQUESTS.filter(r => r.brand === requestBrandFilter);

  // Get unique brands for filter
  const brands = ['All', ...Array.from(new Set(UNAVAILABLE_REQUESTS.map(r => r.brand)))];

  return (
    <div className="space-y-6">
      {/* Sub-Tabs Navigation */}
      <div className="bg-white p-2 rounded-xl border border-gray-100 flex gap-2 w-fit shadow-sm">
        <button 
          onClick={() => setActiveSubTab('searches')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeSubTab === 'searches' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          <TrendingUpIcon />
          {t.trendingSearches}
        </button>
        <button 
          onClick={() => setActiveSubTab('requests')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeSubTab === 'requests' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          <AlertCircleIcon />
          {t.unavailableRequests}
          <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-xs mx-1">{UNAVAILABLE_REQUESTS.length}</span>
        </button>
      </div>

      {/* Content Area */}
      {activeSubTab === 'searches' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
             <div>
                <h3 className="font-bold text-gray-800">{t.whatOthersSearch}</h3>
             </div>
             <div className="text-blue-600 bg-blue-50 p-2 rounded-full">
               <SearchIcon />
             </div>
          </div>
          <div className="overflow-x-auto">
            <table className={`w-full ${language === 'ar' ? 'text-right' : 'text-left'} text-sm`}>
              <thead className="bg-white text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-medium">{t.searchTerm}</th>
                  <th className="px-6 py-4 font-medium">{t.searchFreq}</th>
                  <th className="px-6 py-4 font-medium">{t.lastActivity}</th>
                  <th className="px-6 py-4 font-medium">{t.status}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MARKET_SEARCH_LOGS.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-800">{log.query}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <div className="w-full bg-gray-200 rounded-full h-1.5 max-w-[100px]">
                           <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(log.searchCount / 2000) * 100}%` }}></div>
                         </div>
                         <span className="text-xs text-gray-500 font-mono">{log.searchCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{log.lastSearched}</td>
                    <td className="px-6 py-4">
                       {log.resultsFound ? (
                         <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{t.availableInNetwork}</span>
                       ) : (
                         <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">{t.scarce}</span>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'requests' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
           <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
             <div>
                <h3 className="font-bold text-gray-800">{t.missedOpportunities}</h3>
             </div>
             
             {/* Brand Filter */}
             <div className="relative w-48">
                <select 
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  value={requestBrandFilter}
                  onChange={(e) => setRequestBrandFilter(e.target.value)}
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand === 'All' ? t.allBrands : brand}</option>
                  ))}
                </select>
                <div className={`absolute top-1/2 ${language === 'ar' ? 'left-3' : 'right-3'} -translate-y-1/2 pointer-events-none text-gray-500`}>
                  <FilterIcon />
                </div>
             </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className={`w-full ${language === 'ar' ? 'text-right' : 'text-left'} text-sm`}>
              <thead className="bg-white text-gray-500 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-medium">{t.partNumber}</th>
                  <th className="px-6 py-4 font-medium">{t.brand}</th>
                  <th className="px-6 py-4 font-medium">{t.interestedCount}</th>
                  <th className="px-6 py-4 font-medium">{t.lastRequest}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-gray-800">{req.partNumber}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{req.brand}</span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-1 text-red-600 font-bold">
                         <AlertCircleIcon />
                         {req.requestCount}
                       </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{req.lastRequested}</td>
                  </tr>
                ))}
                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-400">
                      {t.noResults}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketDemandView;