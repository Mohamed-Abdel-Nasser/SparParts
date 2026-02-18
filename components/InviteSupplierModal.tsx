import React, { useState } from 'react';
import { SendIcon, UserPlusIcon } from './Icons';

interface InviteSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteSupplierModal: React.FC<InviteSupplierModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    
    setLoading(true);
    
    // Simulate SMS sending delay
    setTimeout(() => {
        setLoading(false);
        alert(`تم إرسال دعوة انضمام للشبكة إلى ${supplierName ? supplierName : 'المورد'} (${phoneNumber}) بنجاح.`);
        setPhoneNumber('');
        setSupplierName('');
        onClose();
    }, 1500);
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
                <UserPlusIcon />
            </div>
            <h2 className="text-xl font-bold text-gray-800">دعوة مورد جديد</h2>
            <p className="text-sm text-gray-500 mt-2">
                قم بإدخال بيانات المورد لإرسال دعوة انضمام عبر رسالة SMS
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اسم المورد (اختياري)</label>
            <input 
              type="text" 
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="اسم المؤسسة أو الشخص"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">رقم الجوال *</label>
            <input 
              required
              type="tel" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dir-ltr text-right"
              placeholder="05xxxxxxxx"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-500 border border-gray-100 mb-2">
            ستصل المورد رسالة تحتوي على رابط لتحميل التطبيق والانضمام لشبكتك الخاصة.
          </div>

          <button 
            type="submit"
            disabled={loading || !phoneNumber}
            className={`w-full py-2.5 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${!loading && phoneNumber ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            {loading ? 'جاري الإرسال...' : (
                <>
                 <SendIcon /> إرسال الدعوة
                </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteSupplierModal;
