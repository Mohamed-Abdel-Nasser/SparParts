import React from 'react';
import { SearchIcon, BellIcon, MenuIcon } from './Icons';
import { translations } from '../translations';

interface HeaderProps {
  language: 'ar' | 'en';
  onToggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, onToggleLanguage }) => {
  const t = translations[language];

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-gray-500">
          <MenuIcon />
        </button>
        <h2 className="text-lg font-bold text-gray-700 hidden sm:block">{t.dashboard}</h2>
      </div>

      <div className="flex items-center gap-4 w-full max-w-xl justify-end">
        {/* Search Bar */}
        <div className="relative w-full max-w-md hidden md:block">
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="w-full px-4 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <div className={`absolute top-1/2 ${language === 'ar' ? 'left-3' : 'right-3'} -translate-y-1/2 text-gray-400`}>
            <SearchIcon />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Language Toggle */}
        <button 
          onClick={onToggleLanguage}
          className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
        >
           <span className={`text-sm font-bold ${language === 'en' ? 'text-blue-600' : 'text-gray-500'}`}>EN</span>
           <span className="text-gray-300">|</span>
           <span className={`text-sm font-bold ${language === 'ar' ? 'text-blue-600' : 'text-gray-500'}`}>AR</span>
        </button>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <BellIcon />
          <span className="absolute -top-1 -right-2 bg-gray-600 text-white text-[10px] px-1 rounded-full border border-white">161</span>
        </div>
        
        {/* Mobile Toggle */}
        <div className="sm:hidden">
            <MenuIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;