import React, { useState } from 'react';
import { NetworkSettings } from '../types';
import { translations } from '../translations';

interface NetworkSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: NetworkSettings;
  onSave: (settings: NetworkSettings) => void;
  language: 'ar' | 'en';
}

const NetworkSettingsModal: React.FC<NetworkSettingsModalProps> = ({ isOpen, onClose, settings, onSave, language }) => {
  const [localSettings, setLocalSettings] = useState<NetworkSettings>(settings);
  const t = translations[language];

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">{t.settingsTitle}</h2>

        <div className="space-y-6">
          {/* Activation Switch */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div>
              <h3 className="font-semibold text-gray-700">{t.enableNetwork}</h3>
              <p className="text-xs text-gray-500">{t.enableNetworkDesc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={localSettings.isActive} 
                onChange={(e) => setLocalSettings({...localSettings, isActive: e.target.checked})}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Conditional Options */}
          {localSettings.isActive && (
            <div className="space-y-4 border-t border-gray-100 pt-4">
              {/* Price List Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.priceListShare}</label>
                <select 
                  value={localSettings.priceList}
                  onChange={(e) => setLocalSettings({...localSettings, priceList: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="retail">{t.retailPrice}</option>
                  <option value="wholesale">{t.wholesalePrice}</option>
                  <option value="min_price">{t.minPrice}</option>
                </select>
              </div>

              {/* Share Quantity Checkbox */}
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="shareQty"
                  checked={localSettings.shareQuantity}
                  onChange={(e) => setLocalSettings({...localSettings, shareQuantity: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="shareQty" className="text-sm text-gray-700">{t.shareStockQty}</label>
              </div>
            </div>
          )}

          <div className="pt-4 flex gap-3">
            <button 
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {t.saveSettings}
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkSettingsModal;