import React, { useState } from 'react';
import { NetworkSettings, NetworkPart, BrandClass } from '../types';
import { SearchIcon, FilterIcon, MapPinIcon, EyeIcon, PhoneIcon, SettingsIcon, GlobeIcon, CubeIcon, TrendingUpIcon, BellIcon, ClipboardListIcon } from './Icons';
import NetworkSettingsModal from './NetworkSettingsModal';
import NetworkReportModal from './NetworkReportModal';
import MyProductsView from './MyProductsView';
import MarketDemandView from './MarketDemandView';
import TellMeWhenAvailableModal from './TellMeWhenAvailableModal';
import { NETWORK_PARTS_DATA, NETWORK_REPORT_MOCK_DATA, CURRENT_USER } from '../constants';
import { translations } from '../translations';

interface SparePartNetworkProps {
  settings: NetworkSettings;
  onUpdateSettings: (settings: NetworkSettings) => void;
  language?: 'ar' | 'en';
}

const SparePartNetwork: React.FC<SparePartNetworkProps> = ({ settings, onUpdateSettings, language = 'ar' }) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'marketplace' | 'my-products' | 'market-demand'>('marketplace');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isTellMeOpen, setIsTellMeOpen] = useState(false);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<BrandClass | ''>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  
  const [revealedContacts, setRevealedContacts] = useState<Set<string>>(new Set());
  const [allParts, setAllParts] = useState<NetworkPart[]>(NETWORK_PARTS_DATA);

  // Extract unique cities for filter
  const availableCities = Array.from(new Set(NETWORK_PARTS_DATA.map(part => part.sellerCity)));

  // My Products Filter
  const myProducts = allParts.filter(part => part.sellerName === CURRENT_USER.name);

  // Filter Data (Marketplace)
  const filteredParts = allParts.filter(part => {
    const matchesBrand = selectedBrand ? part.brand === selectedBrand : true;
    const matchesClass = selectedClass ? part.brandClass === selectedClass : true;
    const matchesCity = selectedCity ? part.sellerCity === selectedCity : true;
    
    // Search logic: Only apply if length >= 4
    let matchesSearch = true;
    if (searchQuery.trim().length >= 4) {
        matchesSearch = part.partName.includes(searchQuery) || part.partNumber.includes(searchQuery);
    }
    
    return matchesSearch && matchesBrand && matchesClass && matchesCity;
  });

  const handleRevealContact = (id: string) => {
    const newRevealed = new Set(revealedContacts);
    newRevealed.add(id);
    setRevealedContacts(newRevealed);
  };

  const handleUpdatePrice = (partId: string, newPrice: number) => {
    setAllParts(prevParts => 
      prevParts.map(part => 
        part.id === partId ? { ...part, price: newPrice } : part
      )
    );
  };

  const getClassLabel = (cls: BrandClass) => {
    switch (cls) {
      case 'original': return language === 'ar' ? 'أصلي' : 'Original';
      case 'commercial': return language === 'ar' ? 'تجاري' : 'Commercial';
      case 'oem': return 'OEM';
      default: return cls;
    }
  };

  const getClassColor = (cls: BrandClass) => {
    switch (cls) {
      case 'original': return 'bg-blue-100 text-blue-700';
      case 'commercial': return 'bg-orange-100 text-orange-700';
      case 'oem': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // View: Not Active
  if (!settings.isActive) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-xl border border-gray-200 m-4">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
          <GlobeIcon />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.networkTitle}</h2>
        <p className="text-gray-500 max-w-md mb-8">
          {t.joinNetwork}
        </p>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2 font-bold"
        >
          <SettingsIcon />
          {t.activateService}
        </button>
        <NetworkSettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
          settings={settings}
          onSave={onUpdateSettings}
          language={language}
        />
      </div>
    );
  }

  // View: Active
  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      <div className="p-6 border-b border-gray-200 bg-white flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sticky top-0 z-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-blue-600"><GlobeIcon /></span>
            {t.networkTitle}
          </h2>
          <p className="text-xs text-gray-500 mt-1">{t.networkSubtitle}</p>
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
          <div className="bg-gray-100 p-1 rounded-lg flex items-center gap-1">
             <button 
               onClick={() => setActiveTab('marketplace')}
               className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'marketplace' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
             >
               {t.marketplace}
             </button>
             <button 
               onClick={() => setActiveTab('market-demand')}
               className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'market-demand' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
             >
               <ClipboardListIcon />
               {t.marketDemand}
             </button>
             <button 
               onClick={() => setActiveTab('my-products')}
               className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'my-products' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
             >
               <CubeIcon />
               {t.myProducts}
             </button>
          </div>
          
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors"
          >
            <SettingsIcon />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {activeTab === 'marketplace' && (
        <>
          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col xl:flex-row gap-4">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder={t.searchNetwork} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <div className={`absolute top-1/2 ${language === 'ar' ? 'right-3' : 'left-3'} -translate-y-1/2 text-gray-400`}>
                <SearchIcon />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="relative w-40">
                <select 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">{t.allBrands}</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Nissan">Nissan</option>
                  <option value="Hyundai">Hyundai</option>
                </select>
                <div className={`absolute top-1/2 ${language === 'ar' ? 'left-3' : 'right-3'} -translate-y-1/2 pointer-events-none text-gray-500`}>
                  <FilterIcon />
                </div>
              </div>

              <div className="relative w-40">
                <select 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value as BrandClass)}
                >
                  <option value="">{t.allClasses}</option>
                  <option value="original">original</option>
                  <option value="commercial">commercial</option>
                  <option value="oem">OEM</option>
                </select>
                <div className={`absolute top-1/2 ${language === 'ar' ? 'left-3' : 'right-3'} -translate-y-1/2 pointer-events-none text-gray-500`}>
                  <FilterIcon />
                </div>
              </div>

              {/* Location Filter */}
              <div className="relative w-40">
                <select 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">{t.allCities}</option>
                  {availableCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <div className={`absolute top-1/2 ${language === 'ar' ? 'left-3' : 'right-3'} -translate-y-1/2 pointer-events-none text-gray-500`}>
                  <MapPinIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Marketplace Results Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className={`w-full ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                    <th className="py-4 px-6 font-medium">{t.partDetails}</th>
                    <th className="py-4 px-6 font-medium">{t.brandClass}</th>
                    <th className="py-4 px-6 font-medium">{t.price}</th>
                    <th className="py-4 px-6 font-medium">{t.lastPurchase}</th>
                    <th className="py-4 px-6 font-medium">{t.quantity}</th>
                    <th className="py-4 px-6 font-medium">{t.sellerCity}</th>
                    <th className="py-4 px-6 font-medium">{t.seller}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredParts.length > 0 ? (
                    filteredParts.map((part) => {
                      // Calculation logic for diff
                      const hasLastPurchase = part.lastPurchasePrice !== undefined && part.lastPurchasePrice > 0;
                      const diff = hasLastPurchase ? (part.price - part.lastPurchasePrice!) : 0;
                      const diffPercent = hasLastPurchase ? (diff / part.lastPurchasePrice!) * 100 : 0;
                      const isCheaper = diff < 0;

                      return (
                      <tr key={part.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="font-bold text-gray-800">{part.partNumber}</div>
                          <div className="text-sm text-gray-500">{part.partName}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm font-medium text-gray-700 mb-1">{part.brand}</div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getClassColor(part.brandClass)}`}>
                            {getClassLabel(part.brandClass)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-bold text-green-600 text-lg">{part.price}</span>
                          <span className="text-xs text-gray-400 mx-1">{t.sar}</span>
                        </td>
                        <td className="py-4 px-6">
                          {hasLastPurchase ? (
                            <div>
                               <div className="text-xs text-gray-500 mb-1">Last: <span className="font-bold">{part.lastPurchasePrice}</span></div>
                               <div className={`text-xs font-bold flex items-center gap-1 ${isCheaper ? 'text-green-600' : 'text-red-500'}`}>
                                  {isCheaper ? t.save : t.increase} {Math.abs(diff)} {t.sar} ({Math.abs(diffPercent).toFixed(1)}%)
                                  {isCheaper ? <TrendingUpIcon /> : null} 
                                </div>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400 italic">--</span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          {part.isQtyShared ? (
                            <div className="flex items-center gap-1.5 text-gray-700">
                              <span className="font-bold">{part.quantity}</span>
                              <span className="text-xs text-gray-400">{t.piece}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400 italic">--</span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1 text-gray-600">
                             <MapPinIcon />
                             <span className="text-sm">{part.sellerCity}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {revealedContacts.has(part.id) ? (
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 min-w-[180px]">
                              <div className="font-bold text-gray-800 text-sm mb-1">{part.sellerName}</div>
                              <div className="flex items-center gap-2 text-blue-600 text-sm font-mono dir-ltr justify-end">
                                <PhoneIcon />
                                {part.sellerPhone}
                              </div>
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleRevealContact(part.id)}
                              className="text-sm bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-600 px-4 py-2 rounded-lg transition-all flex items-center gap-2 w-full justify-center whitespace-nowrap"
                            >
                              <EyeIcon />
                              {t.revealContact}
                            </button>
                          )}
                        </td>
                      </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                           <span>{t.noResults}</span>
                           {searchQuery.trim().length >= 4 && (
                                <button 
                                    onClick={() => setIsTellMeOpen(true)}
                                    className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1 mt-2 px-3 py-1.5 rounded-lg hover:bg-blue-50"
                                >
                                    <BellIcon />
                                    {t.tellMe}
                                </button>
                           )}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
        )}

        {activeTab === 'market-demand' && (
          <MarketDemandView language={language} />
        )}

        {activeTab === 'my-products' && (
           <MyProductsView products={myProducts} onUpdatePrice={handleUpdatePrice} language={language} />
        )}
      </div>

      <NetworkSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        settings={settings}
        onSave={onUpdateSettings}
        language={language}
      />
      
      <NetworkReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        data={NETWORK_REPORT_MOCK_DATA}
      />

      <TellMeWhenAvailableModal 
        isOpen={isTellMeOpen}
        onClose={() => setIsTellMeOpen(false)}
        initialPartNumber={searchQuery}
      />
    </div>
  );
};

export default SparePartNetwork;