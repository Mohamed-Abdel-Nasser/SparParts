import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import SalesChart from './components/SalesChart';
import BranchTable from './components/BranchTable';
import SparePartNetwork from './components/SparePartNetwork';
import AnalyticsPage from './components/AnalyticsPage';
import { HomeStoreIcon, CalendarIcon, ReceiptIcon, WalletIcon, WhatsappIcon, GlobeIcon } from './components/Icons';
import { BRANCH_DATA, DAILY_SALES_DATA, MONTHLY_SALES_DATA } from './constants';
import { NetworkSettings } from './types';
import { translations } from './translations';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [networkSettings, setNetworkSettings] = useState<NetworkSettings>({
    isActive: false,
    priceList: 'retail',
    shareQuantity: true
  });

  const t = translations[language];

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const renderContent = () => {
    if (currentView === 'network') {
      return (
        <SparePartNetwork 
          settings={networkSettings} 
          onUpdateSettings={setNetworkSettings}
          language={language}
        />
      );
    }

    if (currentView === 'analytics') {
      return <AnalyticsPage />;
    }

    // Default Dashboard Content
    return (
      <div className="p-4 sm:p-6 lg:p-8 custom-scroll">
        {/* Filter Bar */}
        <div className="mb-6 flex justify-between items-center">
          <div className="relative inline-block w-48">
            <select className="block w-full px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-600 appearance-none cursor-pointer">
              <option>{language === 'ar' ? 'اختر الفرع' : 'Select Branch'}</option>
              <option>{language === 'ar' ? 'الفرع الرئيسي' : 'Main Branch'}</option>
              <option>{language === 'ar' ? 'فرع 2' : 'Branch 2'}</option>
            </select>
            <div className={`pointer-events-none absolute inset-y-0 ${language === 'ar' ? 'left-0' : 'right-0'} flex items-center px-2 text-gray-500`}>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard 
            label={t.inventoryValue}
            value="140946235.33" 
            subLabel={t.allBranches}
            colorClass="red"
            icon={<HomeStoreIcon />}
          />
          <StatCard 
            label={t.dailySales}
            value="0.00" 
            subLabel={t.allBranches}
            colorClass="green"
            icon={<ReceiptIcon />}
          />
          <StatCard 
            label={t.monthlySales}
            value="23749.85" 
            subLabel={t.allBranches}
            colorClass="gray"
            icon={<CalendarIcon />}
          />
          <StatCard 
            label={t.yearlySales}
            value="23749.85" 
            subLabel={t.allBranches}
            colorClass="yellow"
            icon={<WalletIcon />}
          />
        </div>
        
        {/* Quick Access to Network */}
        <div 
          onClick={() => setCurrentView('network')}
          className="bg-gradient-to-l from-blue-600 to-blue-800 rounded-xl p-6 text-white mb-8 flex items-center justify-between cursor-pointer shadow-lg hover:shadow-xl transition-all group"
        >
           <div>
             <h3 className="text-xl font-bold mb-1">{t.quickAccessNetwork}</h3>
             <p className="text-blue-100 text-sm">{t.quickAccessDesc}</p>
           </div>
           <div className="bg-white/10 p-3 rounded-full group-hover:bg-white/20 transition-colors">
             <GlobeIcon />
           </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <div className="h-[350px]">
            <SalesChart 
              title={t.dailySalesChart}
              subTitle={language === 'ar' ? "(جميع الفروع) 11-01-2026 - 05-01-2026" : "(All Branches) 2026-01-11 - 2026-01-05"}
              data={DAILY_SALES_DATA}
              dataKey="value"
            />
          </div>
          <div className="h-[350px]">
            <SalesChart 
              title={t.monthlySalesChart}
              subTitle={language === 'ar' ? "(جميع الفروع) مبيعات آخر 12 شهر" : "(All Branches) Last 12 Months"}
              data={MONTHLY_SALES_DATA}
              dataKey="value"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mb-10">
          <BranchTable data={BRANCH_DATA} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Sidebar - Fixed Right (RTL) or Left (LTR) */}
      <Sidebar currentView={currentView} onNavigate={setCurrentView} language={language} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
        <Header language={language} onToggleLanguage={toggleLanguage} />

        <main className="flex-1 overflow-y-auto">
          {renderContent()}

          {/* Footer - Only show on dashboard to prevent double scrollbars inside specific views */}
          {currentView === 'dashboard' && (
            <footer className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 py-4 px-8 border-t border-gray-200 mt-auto">
              <div className="flex items-center gap-2 mb-2 md:mb-0">
                <span>{t.support}: +966 58 158 3094</span>
                <span className="text-green-500"><WhatsappIcon /></span>
              </div>
              <div>
                {t.rights} Qstock 2026 ©
              </div>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;