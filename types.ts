import React from 'react';

export interface SidebarItemType {
  id: string;
  label: string;
  icon?: React.ReactNode;
  hasSubmenu?: boolean;
  active?: boolean;
  count?: number;
}

export interface BranchData {
  id: number;
  name: string;
  city: string;
  dailySales: number;
  monthlySales: number;
  yearlySales: number;
}

export interface StatCardProps {
  label: string;
  value: string;
  subLabel: string;
  colorClass: 'red' | 'green' | 'gray' | 'yellow';
  icon: React.ReactNode;
  onClick?: () => void;
}

// New Types for Spare Part Network
export type BrandClass = 'original' | 'commercial' | 'oem';

export interface NetworkPart {
  id: string;
  partNumber: string;
  partName: string;
  brand: string;
  brandClass: BrandClass;
  price: number;
  quantity: number;
  sellerCity: string;
  sellerName: string;
  sellerPhone: string;
  isQtyShared: boolean;
  
  // New Analytics Fields
  goodPriceCount?: number;
  badPriceCount?: number;
  impressions?: number;
  marketAveragePrice?: number;
  lowestMarketPrice?: number; // New field for lowest price in market
  
  // Search Geography
  localSearchCount?: number; // Searches from same city
  nationalSearchCount?: number; // Searches from other cities

  // Buying History
  lastPurchasePrice?: number; // The last price the current user paid for this item
}

export interface NetworkSettings {
  isActive: boolean;
  priceList: string;
  shareQuantity: boolean;
}

export interface NetworkReportProduct {
  id: string;
  name: string;
  partNumber: string;
  impressions: number; // Appearances in search
  views: number; // Clicked to see details
  lastViewed: string;
}

export interface NetworkReportData {
  totalImpressions: number;
  totalViews: number;
  activeProducts: number;
  dailyStats: { day: string; impressions: number; views: number }[];
  topProducts: NetworkReportProduct[];
}

// Market Demand / Search History Types
export interface SearchLog {
  id: string;
  query: string;
  searchCount: number;
  lastSearched: string;
  trend: 'up' | 'down' | 'stable';
  resultsFound: boolean;
}

export interface ProductRequest {
  id: string;
  partNumber: string;
  brand: string;
  requestCount: number;
  lastRequested: string;
  status: 'pending' | 'fulfilled';
}

// RFQ Related Types
export interface RFQItem {
  id: string;
  partName: string;
  partNumber: string;
  brand: string;
  brandClass: BrandClass;
  quantity: number;
}

export interface QuoteItem {
  rfqItemId: string;
  price: number;
  quantity: number;
  isAlternative?: boolean;
  brand?: string;
  note?: string;
}

export interface Quote {
  id: string;
  sellerName: string;
  sellerCity: string;
  sellerPhone: string;
  date: string;
  totalPrice: number;
  items: QuoteItem[];
  isConfirmed: boolean;
}

export interface RFQ {
  id: string;
  requesterName: string;
  requesterCity: string;
  requesterPhone?: string;
  date: string;
  status: 'open' | 'closed' | 'pending';
  items: RFQItem[];
  quotes?: Quote[];
}
