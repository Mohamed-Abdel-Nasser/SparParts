import React, { useState } from 'react';
import { RFQ, RFQItem, BrandClass } from '../types';
import { MapPinIcon, PlusIcon, SendIcon } from './Icons';

interface RFQQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  rfq: RFQ | null;
}

interface QuoteItem {
  rfqItemId: string;
  price: number | '';
  availableQuantity: number;
  note: string;
}

interface AlternativePart {
  rfqItemId: string; // The original item this is an alternative for
  partNumber: string;
  brand: string;
  brandClass: BrandClass;
  price: number | '';
  availableQuantity: number;
}

const RFQQuoteModal: React.FC<RFQQuoteModalProps> = ({ isOpen, onClose, rfq }) => {
  const [quotes, setQuotes] = useState<Record<string, QuoteItem>>({});
  const [alternatives, setAlternatives] = useState<AlternativePart[]>([]);
  
  // Alternative Form State
  const [showAltFormFor, setShowAltFormFor] = useState<string | null>(null);
  const [tempAlt, setTempAlt] = useState<Partial<AlternativePart>>({});

  if (!isOpen || !rfq) return null;

  const handlePriceChange = (itemId: string, price: string) => {
    setQuotes(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        rfqItemId: itemId,
        price: parseFloat(price) || '',
        availableQuantity: prev[itemId]?.availableQuantity ?? (rfq.items.find(i => i.id === itemId)?.quantity || 1),
        note: prev[itemId]?.note || ''
      }
    }));
  };

  const handleQtyChange = (itemId: string, qty: string) => {
    setQuotes(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        rfqItemId: itemId,
        price: prev[itemId]?.price || '',
        availableQuantity: parseInt(qty) || 0,
        note: prev[itemId]?.note || ''
      }
    }));
  };

  const handleAddAlternative = (itemId: string) => {
    if (!tempAlt.price || !tempAlt.partNumber) return;
    
    const newAlt: AlternativePart = {
      rfqItemId: itemId,
      partNumber: tempAlt.partNumber || '',
      brand: tempAlt.brand || 'Toyota',
      brandClass: (tempAlt.brandClass as BrandClass) || 'commercial',
      price: tempAlt.price || '',
      availableQuantity: tempAlt.availableQuantity || 1
    };
    
    setAlternatives([...alternatives, newAlt]);
    setShowAltFormFor(null);
    setTempAlt({});
  };

  const handleSubmit = () => {
    // Logic to submit the quote
    console.log("Submitting Quote:", { quotes, alternatives });
    alert("تم إرسال عرض السعر بنجاح!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-0 relative max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
             <h2 className="text-xl font-bold text-gray-800">تقديم عرض سعر #{rfq.id}</h2>
             <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
               <span className="font-medium text-gray-700">{rfq.requesterName}</span>
               <span className="flex items-center gap-1"><MapPinIcon /> {rfq.requesterCity}</span>
               <span>{rfq.date}</span>
             </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
           <div className="space-y-6">
             {rfq.items.map((item) => (
               <div key={item.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                 {/* Item Header (Request Info) */}
                 <div className="bg-blue-50/50 p-4 border-b border-blue-100 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{item.partName}</h3>
                      <div className="flex items-center gap-3 text-sm mt-1">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-mono">{item.partNumber || 'بدون رقم'}</span>
                        <span className="text-blue-600 font-medium">{item.brand}</span>
                        <span className="text-gray-500">{item.brandClass}</span>
                      </div>
                    </div>
                    <div className="text-center bg-white px-4 py-2 rounded-lg border border-blue-100 shadow-sm">
                      <div className="text-xs text-gray-400">الكمية المطلوبة</div>
                      <div className="font-bold text-xl text-blue-600">{item.quantity}</div>
                    </div>
                 </div>

                 {/* Quote Inputs */}
                 <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">سعرك للقطعة المطلوبة</label>
                        <div className="flex gap-3">
                           <div className="flex-1">
                             <input 
                               type="number" 
                               placeholder="السعر (ر.س)" 
                               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                               value={quotes[item.id]?.price || ''}
                               onChange={(e) => handlePriceChange(item.id, e.target.value)}
                             />
                           </div>
                           <div className="w-24">
                             <input 
                               type="number" 
                               placeholder="الكمية" 
                               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                               value={quotes[item.id]?.availableQuantity ?? item.quantity}
                               onChange={(e) => handleQtyChange(item.id, e.target.value)}
                             />
                           </div>
                        </div>
                        <p className="text-xs text-gray-400">اترك الحقول فارغة إذا لم تتوفر القطعة</p>
                    </div>

                    <div className="border-r border-gray-100 pr-0 md:pr-6">
                       <div className="flex justify-between items-center mb-2">
                         <label className="text-sm font-medium text-gray-700">خيارات بديلة</label>
                         <button 
                           onClick={() => setShowAltFormFor(showAltFormFor === item.id ? null : item.id)}
                           className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                         >
                           <PlusIcon /> إضافة بديل
                         </button>
                       </div>

                       {/* List of added alternatives */}
                       {alternatives.filter(a => a.rfqItemId === item.id).map((alt, idx) => (
                         <div key={idx} className="bg-yellow-50 p-2 rounded border border-yellow-200 text-sm mb-2 flex justify-between items-center">
                            <div>
                              <span className="font-bold text-gray-800">{alt.brand}</span>
                              <span className="text-gray-500 mx-1">-</span>
                              <span>{alt.partNumber}</span>
                            </div>
                            <div className="font-bold text-green-700">{alt.price} ر.س</div>
                         </div>
                       ))}

                       {/* Add Alternative Form */}
                       {showAltFormFor === item.id && (
                         <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mt-2 space-y-2 text-sm">
                            <input 
                              className="w-full border p-1.5 rounded" 
                              placeholder="رقم القطعة البديلة" 
                              value={tempAlt.partNumber || ''}
                              onChange={e => setTempAlt({...tempAlt, partNumber: e.target.value})}
                            />
                            <div className="flex gap-2">
                              <select 
                                className="border p-1.5 rounded flex-1"
                                value={tempAlt.brand || ''}
                                onChange={e => setTempAlt({...tempAlt, brand: e.target.value})}
                              >
                                <option value="">الماركة</option>
                                <option value="Toyota">Toyota</option>
                                <option value="Nissan">Nissan</option>
                                <option value="Hyundai">Hyundai</option>
                              </select>
                              <select 
                                className="border p-1.5 rounded w-1/3"
                                value={tempAlt.brandClass || ''}
                                onChange={e => setTempAlt({...tempAlt, brandClass: e.target.value as BrandClass})}
                              >
                                <option value="commercial">تجاري</option>
                                <option value="oem">OEM</option>
                              </select>
                            </div>
                            <div className="flex gap-2">
                              <input 
                                type="number" 
                                className="border p-1.5 rounded w-1/2" 
                                placeholder="السعر"
                                value={tempAlt.price || ''}
                                onChange={e => setTempAlt({...tempAlt, price: parseFloat(e.target.value)})}
                              />
                              <input 
                                type="number" 
                                className="border p-1.5 rounded w-1/2" 
                                placeholder="الكمية" 
                                value={tempAlt.availableQuantity || ''}
                                onChange={e => setTempAlt({...tempAlt, availableQuantity: parseInt(e.target.value)})}
                              />
                            </div>
                            <button 
                              onClick={() => handleAddAlternative(item.id)}
                              className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700"
                            >
                              إضافة البديل
                            </button>
                         </div>
                       )}
                    </div>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-white flex justify-end gap-3">
           <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">إلغاء</button>
           <button 
             onClick={handleSubmit}
             className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold shadow-lg flex items-center gap-2"
           >
             <SendIcon />
             إرسال عرض السعر
           </button>
        </div>
      </div>
    </div>
  );
};

export default RFQQuoteModal;