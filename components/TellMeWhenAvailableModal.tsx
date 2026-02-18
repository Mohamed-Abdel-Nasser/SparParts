import React, { useState, useEffect } from 'react';
import { BellIcon, SendIcon } from './Icons';

interface TellMeWhenAvailableModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPartNumber: string;
}

const TellMeWhenAvailableModal: React.FC<TellMeWhenAvailableModalProps> = ({ isOpen, onClose, initialPartNumber }) => {
  const [partNumber, setPartNumber] = useState(initialPartNumber);
  const [brand, setBrand] = useState('Toyota');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPartNumber(initialPartNumber);
  }, [initialPartNumber]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        alert(`تم استلام طلبك! سنقوم بإشعارك فور توفر القطعة رقم ${partNumber} - ${brand}`);
        onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        
        <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BellIcon />
            </div>
            <h2 className="text-xl font-bold text-gray-800">أخبرني عند التوفر</h2>
            <p className="text-sm text-gray-500 mt-2">
               سنقوم بإرسال إشعار لك بمجرد توفر هذه القطعة في الشبكة
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">رقم القطعة</label>
            <input 
              required
              type="text" 
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-left"
              placeholder="Part Number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الماركة</label>
            <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="Toyota">Toyota</option>
                <option value="Nissan">Nissan</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Honda">Honda</option>
                <option value="Mazda">Mazda</option>
                <option value="Kia">Kia</option>
                <option value="Ford">Ford</option>
                <option value="GMC">GMC</option>
            </select>
          </div>

          <button 
            type="submit"
            disabled={loading || !partNumber}
            className={`w-full py-2.5 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${!loading && partNumber ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            {loading ? 'جاري الإرسال...' : (
                <>
                 <SendIcon /> إرسال الطلب
                </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TellMeWhenAvailableModal;
