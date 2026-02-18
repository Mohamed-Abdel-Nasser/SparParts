import React, { useState } from 'react';
import { BrandClass, RFQItem } from '../types';
import { SendIcon, PlusIcon, TrashIcon } from './Icons';
import { CURRENT_USER } from '../constants';

interface RFQFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const RFQFormModal: React.FC<RFQFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [items, setItems] = useState<Partial<RFQItem>[]>([]);
  const [currentItem, setCurrentItem] = useState<Partial<RFQItem>>({
    partName: '',
    partNumber: '',
    brand: 'Toyota',
    brandClass: 'original',
    quantity: 1,
  });

  const [contactInfo, setContactInfo] = useState({
    requesterName: CURRENT_USER.name,
    requesterPhone: CURRENT_USER.phone,
    requesterCity: CURRENT_USER.city
  });

  const handleAddItem = () => {
    if (!currentItem.partName) return;
    
    setItems([...items, { ...currentItem, id: Math.random().toString() }]);
    setCurrentItem({
      partName: '',
      partNumber: '',
      brand: 'Toyota',
      brandClass: 'original',
      quantity: 1,
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('الرجاء إضافة قطعة واحدة على الأقل');
      return;
    }
    onSubmit({
      items,
      ...contactInfo
    });
    setItems([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">طلب تسعير قطع (RFQ)</h2>
        <p className="text-sm text-gray-500 text-center mb-6 -mt-4">
          أضف القطع المطلوبة وأرسل الطلب للتجار
        </p>

        <div className="space-y-6">
          {/* Add Item Section */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <PlusIcon />
              إضافة قطعة للطلب
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
               <div className="md:col-span-2">
                 <input 
                   type="text" 
                   value={currentItem.partName}
                   onChange={e => setCurrentItem({...currentItem, partName: e.target.value})}
                   className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                   placeholder="اسم القطعة *"
                 />
               </div>
               <div className="md:col-span-2">
                 <input 
                   type="text" 
                   value={currentItem.partNumber}
                   onChange={e => setCurrentItem({...currentItem, partNumber: e.target.value})}
                   className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                   placeholder="رقم القطعة"
                 />
               </div>
               <div>
                 <select 
                   value={currentItem.brand}
                   onChange={e => setCurrentItem({...currentItem, brand: e.target.value})}
                   className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                 >
                   <option value="Toyota">Toyota</option>
                   <option value="Nissan">Nissan</option>
                   <option value="Hyundai">Hyundai</option>
                   <option value="Honda">Honda</option>
                 </select>
               </div>
               <div>
                 <select 
                   value={currentItem.brandClass}
                   onChange={e => setCurrentItem({...currentItem, brandClass: e.target.value as any})}
                   className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                 >
                   <option value="original">أصلي</option>
                   <option value="commercial">تجاري</option>
                   <option value="oem">OEM</option>
                 </select>
               </div>
               <div>
                 <input 
                   type="number" 
                   min="1"
                   value={currentItem.quantity}
                   onChange={e => setCurrentItem({...currentItem, quantity: parseInt(e.target.value)})}
                   className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                   placeholder="الكمية"
                 />
               </div>
               <div>
                 <button 
                   onClick={handleAddItem}
                   className="w-full bg-blue-600 text-white p-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors h-full"
                 >
                   إضافة للقائمة
                 </button>
               </div>
            </div>
          </div>

          {/* Items List */}
          {items.length > 0 && (
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <table className="w-full text-right text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-4 py-2">القطعة</th>
                    <th className="px-4 py-2">الماركة</th>
                    <th className="px-4 py-2">الكمية</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <div className="font-medium">{item.partName}</div>
                        <div className="text-xs text-gray-400">{item.partNumber}</div>
                      </td>
                      <td className="px-4 py-2">
                        {item.brand} <span className="text-xs text-gray-400">({item.brandClass})</span>
                      </td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2 text-left">
                        <button onClick={() => handleRemoveItem(idx)} className="text-red-500 hover:text-red-700">
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="border-t border-gray-100 pt-4 mt-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">بيانات التواصل (قابلة للتعديل)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم / اسم المؤسسة</label>
                  <input 
                    required
                    type="text" 
                    value={contactInfo.requesterName}
                    onChange={e => setContactInfo({...contactInfo, requesterName: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">رقم الجوال</label>
                  <input 
                    required
                    type="tel" 
                    value={contactInfo.requesterPhone}
                    onChange={e => setContactInfo({...contactInfo, requesterPhone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dir-ltr text-right"
                    placeholder="05xxxxxxxx"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                disabled={items.length === 0}
                className={`w-full py-2.5 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${items.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                <SendIcon />
                إرسال الطلب ({items.length})
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RFQFormModal;
