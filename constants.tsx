import React from 'react';
import { BranchData, NetworkPart, NetworkReportData, SearchLog, ProductRequest } from './types';

export const CURRENT_USER = {
  name: 'فرع 3 - تبوك',
  phone: '0591234567',
  city: 'تبوك'
};

export const BRANCH_DATA: BranchData[] = [
  { id: 1, name: 'ff', city: 'الرياض', dailySales: 0.00, monthlySales: 0.00, yearlySales: 0.00 },
  { id: 2, name: 'فرع 3', city: 'تبوك', dailySales: 0.00, monthlySales: 0.00, yearlySales: 0.00 },
  { id: 3, name: 'فرع 2', city: 'المحلة الكبرى', dailySales: 0.00, monthlySales: 0.00, yearlySales: 0.00 },
  { id: 4, name: 'الرئيسي', city: 'القاهرة', dailySales: 0.00, monthlySales: 23749.85, yearlySales: 23749.85 },
];

export const DAILY_SALES_DATA = [
  { name: '05', value: 0 },
  { name: '06', value: 0 },
  { name: '07', value: 0 },
  { name: '08', value: 0 },
  { name: '09', value: 0 },
  { name: '10', value: 0 },
  { name: '11', value: 0 },
];

export const MONTHLY_SALES_DATA = [
  { name: 'FEB', value: 0 },
  { name: 'MAR', value: 0 },
  { name: 'APR', value: 0 },
  { name: 'MAY', value: 0 },
  { name: 'JUN', value: 0 },
  { name: 'JUL', value: 0 },
  { name: 'AUG', value: 0 },
  { name: 'SEP', value: 0 },
  { name: 'OCT', value: 0 },
  { name: 'NOV', value: 0 },
  { name: 'DEC', value: 0 },
  { name: 'JAN', value: 0 },
];

export const NETWORK_PARTS_DATA: NetworkPart[] = [
  {
    id: '1',
    partNumber: '123-456-TY',
    partName: 'فحمات فرامل أمامية',
    brand: 'Toyota',
    brandClass: 'original',
    price: 250,
    quantity: 15,
    sellerCity: 'الرياض',
    sellerName: 'مؤسسة الغيار السريع',
    sellerPhone: '0501234567',
    isQtyShared: true,
    goodPriceCount: 45,
    badPriceCount: 2,
    impressions: 1250,
    marketAveragePrice: 240,
    lowestMarketPrice: 225,
    localSearchCount: 800,
    nationalSearchCount: 450,
    lastPurchasePrice: 230
  },
  {
    id: '2',
    partNumber: '999-888-NS',
    partName: 'فلتر زيت',
    brand: 'Nissan',
    brandClass: 'original',
    price: 35,
    quantity: 100,
    sellerCity: 'جدة',
    sellerName: 'شركة النور',
    sellerPhone: '0559876543',
    isQtyShared: false,
    goodPriceCount: 120,
    badPriceCount: 0,
    impressions: 3400,
    marketAveragePrice: 38,
    lowestMarketPrice: 32,
    localSearchCount: 2000,
    nationalSearchCount: 1400,
    lastPurchasePrice: 40
  },
  {
    id: '3',
    partNumber: 'BRK-Pad-001',
    partName: 'طقم فرامل',
    brand: 'Toyota',
    brandClass: 'commercial',
    price: 120,
    quantity: 50,
    sellerCity: 'تبوك',
    sellerName: CURRENT_USER.name, // Matches Current User
    sellerPhone: CURRENT_USER.phone,
    isQtyShared: true,
    goodPriceCount: 15,
    badPriceCount: 5,
    impressions: 450,
    marketAveragePrice: 130, // User is cheaper (120 vs 130)
    lowestMarketPrice: 115,
    localSearchCount: 300,
    nationalSearchCount: 150,
    lastPurchasePrice: 115
  },
  {
    id: '4',
    partNumber: 'ALT-HY-2024',
    partName: 'دينامو',
    brand: 'Hyundai',
    brandClass: 'oem',
    price: 800,
    quantity: 3,
    sellerCity: 'الرياض',
    sellerName: 'مركز الصيانة المعتمد',
    sellerPhone: '0114445555',
    isQtyShared: true,
    goodPriceCount: 8,
    badPriceCount: 12,
    impressions: 220,
    marketAveragePrice: 750,
    lowestMarketPrice: 740,
    localSearchCount: 150,
    nationalSearchCount: 70,
    lastPurchasePrice: 850
  },
  {
    id: '5',
    partNumber: '123-456-TY',
    partName: 'فحمات فرامل أمامية',
    brand: 'Toyota',
    brandClass: 'original',
    price: 245,
    quantity: 20,
    sellerCity: 'تبوك',
    sellerName: CURRENT_USER.name, // Matches Current User
    sellerPhone: CURRENT_USER.phone,
    isQtyShared: true,
    goodPriceCount: 30,
    badPriceCount: 1,
    impressions: 890,
    marketAveragePrice: 250, // User is cheaper (245 vs 250)
    lowestMarketPrice: 235,
    localSearchCount: 600,
    nationalSearchCount: 290,
    lastPurchasePrice: 230
  }
];

// Market Demand Mock Data
export const MARKET_SEARCH_LOGS: SearchLog[] = [
  { id: '1', query: 'صدام أمامي كامري 2023', searchCount: 1450, lastSearched: 'منذ 5 دقائق', trend: 'up', resultsFound: true },
  { id: '2', query: 'جير بوكس النترا', searchCount: 890, lastSearched: 'منذ 15 دقيقة', trend: 'up', resultsFound: true },
  { id: '3', query: 'مساعدات هايلكس', searchCount: 650, lastSearched: 'منذ ساعة', trend: 'stable', resultsFound: true },
  { id: '4', query: 'شمعات ليد 2024', searchCount: 420, lastSearched: 'منذ ساعتين', trend: 'down', resultsFound: true },
  { id: '5', query: 'طرمبة بنزين جمس', searchCount: 310, lastSearched: 'منذ 3 ساعات', trend: 'stable', resultsFound: true },
];

export const UNAVAILABLE_REQUESTS: ProductRequest[] = [
  { id: '1', partNumber: '87910-06390', brand: 'Toyota', requestCount: 45, lastRequested: 'اليوم', status: 'pending' },
  { id: '2', partNumber: '96301-3TA0A', brand: 'Nissan', requestCount: 32, lastRequested: 'أمس', status: 'pending' },
  { id: '3', partNumber: '92101-C8000', brand: 'Hyundai', requestCount: 28, lastRequested: 'أمس', status: 'pending' },
  { id: '4', partNumber: 'G5021-12345', brand: 'Ford', requestCount: 15, lastRequested: 'قبل يومين', status: 'pending' },
  { id: '5', partNumber: '12300-RNN12', brand: 'Nissan', requestCount: 12, lastRequested: 'قبل 3 أيام', status: 'pending' },
  { id: '6', partNumber: '52119-0X925', brand: 'Toyota', requestCount: 8, lastRequested: 'قبل أسبوع', status: 'pending' },
];

// Analytics Mock Data
export const ANALYTICS_REVENUE_DATA = [
  { name: 'يناير', revenue: 45000, profit: 12000 },
  { name: 'فبراير', revenue: 52000, profit: 15000 },
  { name: 'مارس', revenue: 48000, profit: 13000 },
  { name: 'أبريل', revenue: 61000, profit: 18000 },
  { name: 'مايو', revenue: 55000, profit: 16000 },
  { name: 'يونيو', revenue: 67000, profit: 21000 },
];

export const ANALYTICS_BRAND_DATA = [
  { name: 'Toyota', value: 45, color: '#3b82f6' },
  { name: 'Nissan', value: 25, color: '#ef4444' },
  { name: 'Hyundai', value: 20, color: '#10b981' },
  { name: 'Other', value: 10, color: '#f59e0b' },
];

export const TOP_SELLING_PRODUCTS = [
  { id: 1, name: 'فحمات تويوتا كامري', sales: 120, revenue: 18000, growth: '+12%' },
  { id: 2, name: 'فلتر زيت نيسان', sales: 350, revenue: 8750, growth: '+5%' },
  { id: 3, name: 'بواجي هيونداي', sales: 200, revenue: 12000, growth: '-2%' },
  { id: 4, name: 'صدام أمامي كورولا', sales: 15, revenue: 6000, growth: '+8%' },
];

export const NETWORK_REPORT_MOCK_DATA: NetworkReportData = {
  totalImpressions: 12450,
  totalViews: 842,
  activeProducts: 450,
  dailyStats: [
    { day: 'السبت', impressions: 1200, views: 80 },
    { day: 'الأحد', impressions: 1500, views: 120 },
    { day: 'الاثنين', impressions: 1800, views: 150 },
    { day: 'الثلاثاء', impressions: 1600, views: 110 },
    { day: 'الأربعاء', impressions: 2000, views: 180 },
    { day: 'الخميس', impressions: 2200, views: 160 },
    { day: 'الجمعة', impressions: 2150, views: 42 },
  ],
  topProducts: [
    { id: '1', name: 'دينامو كامري 2020', partNumber: 'TOY-Alt-2020', impressions: 540, views: 45, lastViewed: 'منذ 10 دقائق' },
    { id: '2', name: 'كمبروسر مكيف نيسان', partNumber: 'NIS-AC-Comp', impressions: 320, views: 28, lastViewed: 'منذ ساعة' },
    { id: '3', name: 'مساعدات خلفية', partNumber: 'HYU-Shocks', impressions: 210, views: 15, lastViewed: 'منذ ساعتين' },
    { id: '4', name: 'شمعات احتراق', partNumber: 'NGK-Spark', impressions: 150, views: 12, lastViewed: 'منذ 5 ساعات' },
  ]
};
