import React, { useState } from 'react';
import { RFQ, Quote } from '../types';
import { MapPinIcon, PhoneIcon, CartIcon } from './Icons';

interface MyRFQDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rfq: RFQ | null;
  onConfirmQuote: (rfqId: string, quoteId: string) => void;
}

const MyRFQDetailsModal: React.FC<MyRFQDetailsModalProps> = ({ isOpen, onClose, rfq, onConfirmQuote }) => {
  const [expandedQuote, setExpandedQuote] = useState<string | null>(null);

  if (!isOpen || !rfq) return null;

  const handleConfirm = (quoteId: string) => {
    if (window.confirm('هل أنت متأكد من اعتماد عرض السعر هذا؟')) {
      onConfirmQuote(rfq.id, quoteId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-0 relative max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
             <h2 className="text-xl font-bold text-gray-800">تفاصيل الطلب #{rfq.id}</h2>
             <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
               <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md text-xs font-bold">
                 {rfq.items.length} قطع مطلوبة
               </span>
               <span>{rfq.date}</span>
               <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${rfq.status === 'closed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                 {rfq.status === 'closed' ? 'مكتمل' : 'بانتظار العروض'}
               </span>
             </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
          
          {/* Requested Items Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CartIcon /> القطع المطلوبة
            </h3>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-right text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>
                    <th className="px-4 py-3">اسم القطعة</th>
                    <th className="px-4 py-3">رقم القطعة</th>
                    <th className="px-4 py-3">الماركة</th>
                    <th className="px-4 py-3">الكمية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rfq.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 font-medium text-gray-800">{item.partName}</td>
                      <td className="px-4 py-3 text-gray-500 font-mono">{item.partNumber || '-'}</td>
                      <td className="px-4 py-3 text-gray-600">{item.brand} <span className="text-xs">({item.brandClass})</span></td>
                      <td className="px-4 py-3 font-bold">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quotes Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="relative">
                <CartIcon />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                   {rfq.quotes?.length || 0}
                </span>
              </div>
              عروض الأسعار المستلمة
            </h3>
            
            {(!rfq.quotes || rfq.quotes.length === 0) ? (
               <div className="text-center py-8 bg-white rounded-lg border border-dashed border-gray-300 text-gray-500">
                 لم يتم استلام أي عروض أسعار حتى الآن
               </div>
            ) : (
               <div className="space-y-4">
                 {rfq.quotes.map((quote) => (
                   <div key={quote.id} className={`bg-white rounded-xl border transition-all ${quote.isConfirmed ? 'border-green-500 shadow-md ring-1 ring-green-100' : 'border-gray-200 hover:shadow-md'}`}>
                      <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                         <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-gray-800">{quote.sellerName}</h4>
                              {quote.isConfirmed && <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">تم الاعتماد</span>}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-3">
                               <span className="flex items-center gap-1"><MapPinIcon /> {quote.sellerCity}</span>
                               <span className="flex items-center gap-1 dir-ltr"><PhoneIcon /> {quote.sellerPhone}</span>
                               <span className="text-xs text-gray-400">{quote.date}</span>
                            </div>
                         </div>

                         <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                            <div className="text-center">
                              <div className="text-xs text-gray-400">الإجمالي</div>
                              <div className="text-xl font-bold text-green-600">{quote.totalPrice} ر.س</div>
                            </div>
                            
                            <div className="flex gap-2">
                               <button 
                                 onClick={() => setExpandedQuote(expandedQuote === quote.id ? null : quote.id)}
                                 className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50"
                               >
                                 {expandedQuote === quote.id ? 'إخفاء التفاصيل' : 'تفاصيل العرض'}
                               </button>
                               {!quote.isConfirmed && rfq.status !== 'closed' && (
                                 <button 
                                   onClick={() => handleConfirm(quote.id)}
                                   className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 font-bold"
                                 >
                                   اعتماد
                                 </button>
                               )}
                            </div>
                         </div>
                      </div>

                      {/* Quote Item Details */}
                      {expandedQuote === quote.id && (
                        <div className="border-t border-gray-100 bg-gray-50 p-4">
                           <table className="w-full text-right text-sm">
                             <thead className="text-gray-500 text-xs uppercase">
                               <tr>
                                 <th className="pb-2">القطعة</th>
                                 <th className="pb-2">تفاصيل العرض</th>
                                 <th className="pb-2">السعر</th>
                                 <th className="pb-2">الكمية</th>
                                 <th className="pb-2">الإجمالي</th>
                               </tr>
                             </thead>
                             <tbody className="divide-y divide-gray-200">
                               {quote.items.map((qItem, i) => {
                                 const reqItem = rfq.items.find(ri => ri.id === qItem.rfqItemId);
                                 return (
                                   <tr key={i}>
                                     <td className="py-2 text-gray-800 font-medium">
                                       {reqItem?.partName || 'قطعة بديلة'}
                                     </td>
                                     <td className="py-2 text-gray-600">
                                       {qItem.isAlternative ? (
                                          <span className="text-orange-600 text-xs bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100 mr-2">بديل</span>
                                       ) : (
                                          <span className="text-blue-600 text-xs bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 mr-2">مطابق</span>
                                       )}
                                       {qItem.brand && <span className="text-xs ml-1">{qItem.brand}</span>}
                                       {qItem.note && <div className="text-xs text-gray-500 mt-1 italic">{qItem.note}</div>}
                                     </td>
                                     <td className="py-2">{qItem.price}</td>
                                     <td className="py-2">{qItem.quantity}</td>
                                     <td className="py-2 font-bold">{qItem.price * qItem.quantity}</td>
                                   </tr>
                                 );
                               })}
                             </tbody>
                           </table>
                        </div>
                      )}
                   </div>
                 ))}
               </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-white flex justify-end">
          <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">إغلاق</button>
        </div>
      </div>
    </div>
  );
};

export default MyRFQDetailsModal;
