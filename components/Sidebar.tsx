import React from 'react';
import { HomeIcon, SearchIcon, CashierIcon, UsersIcon, CubeIcon, CartIcon, ChartIcon, ChevronLeftIcon, ChevronDownIcon, ReceiptIcon, WalletIcon, GlobeIcon } from './Icons';
import { translations } from '../translations';

interface SidebarItemProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  hasSubmenu?: boolean;
  badge?: number;
  onClick?: () => void;
  language: 'ar' | 'en';
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon, active, hasSubmenu, badge, onClick, language }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${active ? 'bg-[#1a2b47] border-l-4 border-blue-500 text-white' : 'text-gray-400 hover:bg-[#1a2b47] hover:text-white'}`}
    >
      <div className="flex items-center gap-3">
        {icon && <span>{icon}</span>}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">{badge}</span>}
        {hasSubmenu && (
            <div className={language === 'en' ? 'transform rotate-180' : ''}>
                <ChevronLeftIcon />
            </div>
        )}
      </div>
    </div>
  );
};

interface SidebarProps {
  currentView?: string;
  onNavigate?: (view: string) => void;
  language: 'ar' | 'en';
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, language }) => {
  const t = translations[language];

  return (
    <aside className={`w-64 bg-[#0e1d34] h-screen flex flex-col ${language === 'ar' ? 'text-right' : 'text-left'} shrink-0 overflow-y-auto custom-scroll shadow-xl z-20`}>
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-center border-b border-gray-800 bg-[#0e1d34] sticky top-0 z-30">
        <h1 className="text-2xl font-bold text-white tracking-widest">Q<span className="text-red-500">STOCK</span></h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <SidebarItem 
          label={t.dashboard}
          icon={<HomeIcon />} 
          active={currentView === 'dashboard'} 
          onClick={() => onNavigate && onNavigate('dashboard')}
          language={language}
        />
        <SidebarItem 
          label={t.network}
          icon={<GlobeIcon />} 
          active={currentView === 'network'}
          onClick={() => onNavigate && onNavigate('network')}
          language={language}
        />
        <SidebarItem label={t.search} icon={<SearchIcon />} language={language} />
        <SidebarItem label={t.cashier} icon={<CashierIcon />} language={language} />
        <SidebarItem label={t.contacts} icon={<UsersIcon />} hasSubmenu language={language} />
        <SidebarItem label={t.products} icon={<CubeIcon />} hasSubmenu language={language} />
        <SidebarItem label={t.sales} icon={<CartIcon />} hasSubmenu language={language} />
        <SidebarItem label={t.pendingSales} icon={<ReceiptIcon />} badge={134} language={language} />
        <SidebarItem label={t.purchases} icon={<CartIcon />} hasSubmenu language={language} />
        <SidebarItem label={t.quotes} icon={<ChartIcon />} hasSubmenu language={language} />
        <SidebarItem label={t.commissions} icon={<UsersIcon />} hasSubmenu language={language} />
        <SidebarItem label={t.accounting} icon={<ReceiptIcon />} hasSubmenu language={language} />
        <SidebarItem label={t.finance} icon={<WalletIcon />} hasSubmenu language={language} />
        <SidebarItem label={t.closing} icon={<ReceiptIcon />} hasSubmenu language={language} />
        <SidebarItem label={t.merchants} icon={<UsersIcon />} hasSubmenu language={language} />
        <SidebarItem 
          label={t.reports}
          icon={<ChartIcon />} 
          active={currentView === 'analytics'}
          onClick={() => onNavigate && onNavigate('analytics')}
          language={language}
        />
        <SidebarItem label={t.uploadedReports} icon={<ChartIcon />} hasSubmenu language={language} />
      </nav>
    </aside>
  );
};

export default Sidebar;