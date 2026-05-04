import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table } from './Table';
import { Badge } from './Badge';
import { Tabs } from './Tabs';
import { Button } from './Button';
import { EmptyState } from './EmptyState';
import { Modal } from './Modal';
import { Toast } from './Toast';
import { Icons } from './icons';
import './searchpage.css';

/* ══════════════════════════════════════════════════════════════════
   Mock Data — sunscreen products matching reference design
   ══════════════════════════════════════════════════════════════════ */
const MOCK_PRODUCTS = [
  { id: '1', name: 'CeraVe Hydrating Mineral Sunscreen SP...', brand: 'CeraVe', initials: 'CV', initialsColor: '#6B8E23', category: 'Mineral Sunscreen', price: 15.99, salesRank: 12, revenueEst: '$1M – $5M', monthlyGrowth: 34, ninetyDayGrowth: 340, rating: 4.6, ratingCount: '45.2K', ratingPercent: 97 },
  { id: '2', name: 'Supergoop! Unseen Sunscreen SPF 40', brand: 'Supergoop!', initials: 'SG', initialsColor: '#2E8B57', category: 'Chemical Sunscreen', price: 22.00, salesRank: 34, revenueEst: '$1M – $5M', monthlyGrowth: 18, ninetyDayGrowth: 215, rating: 4.5, ratingCount: '28.1K', ratingPercent: 94 },
  { id: '3', name: 'Sun Bum Original SPF 50 Sunscreen Lot...', brand: 'Sun Bum', initials: 'SB', initialsColor: '#B8860B', category: 'Lotion', price: 12.49, salesRank: 8, revenueEst: '$5M – $10M', monthlyGrowth: 12, ninetyDayGrowth: 178, rating: 4.7, ratingCount: '67.8K', ratingPercent: 91 },
  { id: '4', name: 'EltaMD UV Clear Broad-Spectrum SPF 46', brand: 'EltaMD', initials: 'EM', initialsColor: '#4682B4', category: 'Dermatologist', price: 39.00, salesRank: 56, revenueEst: '$500K – $1M', monthlyGrowth: 22, ninetyDayGrowth: 156, rating: 4.4, ratingCount: '19.3K', ratingPercent: 88 },
  { id: '5', name: 'Banana Boat Ultra Sport Spray SPF 50+', brand: 'Banana Boat', initials: 'BB', initialsColor: '#DAA520', category: 'Spray', price: 8.97, salesRank: 3, revenueEst: '$10M+', monthlyGrowth: 5, ninetyDayGrowth: 89, rating: 4.3, ratingCount: '89.4K', ratingPercent: 82 },
  { id: '6', name: 'Neutrogena Ultra Sheer Dry-Touch SPF ...', brand: 'Neutrogena', initials: 'NG', initialsColor: '#708090', category: 'Dry-Touch', price: 10.49, salesRank: 15, revenueEst: '$5M – $10M', monthlyGrowth: 9, ninetyDayGrowth: 127, rating: 4.2, ratingCount: '52.1K', ratingPercent: 85 },
  { id: '7', name: 'La Roche-Posay Anthelios Melt-In SPF 60', brand: 'La Roche-Posay', initials: 'LR', initialsColor: '#5F9EA0', category: 'Dermatologist', price: 35.99, salesRank: 42, revenueEst: '$1M – $5M', monthlyGrowth: 15, ninetyDayGrowth: 198, rating: 4.5, ratingCount: '22.7K', ratingPercent: 90 },
  { id: '8', name: 'Blue Lizard Australian Sunscreen SPF 30+', brand: 'Blue Lizard', initials: 'BL', initialsColor: '#4169E1', category: 'Mineral Sunscreen', price: 14.99, salesRank: 67, revenueEst: '$500K – $1M', monthlyGrowth: 28, ninetyDayGrowth: 245, rating: 4.4, ratingCount: '15.6K', ratingPercent: 87 },
  { id: '9', name: 'Hawaiian Tropic Sheer Touch SPF 30', brand: 'Hawaiian Tropic', initials: 'HT', initialsColor: '#CD853F', category: 'Lotion', price: 7.99, salesRank: 21, revenueEst: '$5M – $10M', monthlyGrowth: 6, ninetyDayGrowth: 67, rating: 4.1, ratingCount: '41.3K', ratingPercent: 79 },
  { id: '10', name: 'Coppertone Sport Sunscreen Lotion SPF 50', brand: 'Coppertone', initials: 'CP', initialsColor: '#8B4513', category: 'Sport', price: 9.49, salesRank: 11, revenueEst: '$5M – $10M', monthlyGrowth: 8, ninetyDayGrowth: 95, rating: 4.3, ratingCount: '58.9K', ratingPercent: 83 },
  // Neck cream products
  { id: '20', name: 'StriVectin TL Advanced Tightening Neck Cream Plus', brand: 'StriVectin', initials: 'SV', initialsColor: '#8B008B', category: 'Neck Care', price: 89.00, salesRank: 142, revenueEst: '$1M – $5M', monthlyGrowth: 31, ninetyDayGrowth: 187, rating: 4.3, ratingCount: '8.9K', ratingPercent: 86 },
  { id: '21', name: 'Revision Skincare Nectifirm Advanced', brand: 'Revision Skincare', initials: 'RS', initialsColor: '#800020', category: 'Neck Care', price: 154.00, salesRank: 289, revenueEst: '$500K – $1M', monthlyGrowth: 19, ninetyDayGrowth: 134, rating: 4.5, ratingCount: '3.2K', ratingPercent: 91 },
  { id: '22', name: 'Drunk Elephant Protini Neck Cream', brand: 'Drunk Elephant', initials: 'DE', initialsColor: '#FF6B6B', category: 'Neck Care', price: 68.00, salesRank: 198, revenueEst: '$1M – $5M', monthlyGrowth: 24, ninetyDayGrowth: 210, rating: 4.4, ratingCount: '12.1K', ratingPercent: 89 },
  { id: '23', name: 'ELEMIS Pro-Collagen Marine Cream for Neck', brand: 'ELEMIS', initials: 'EL', initialsColor: '#2C3E50', category: 'Neck Care', price: 105.00, salesRank: 367, revenueEst: '$500K – $1M', monthlyGrowth: 15, ninetyDayGrowth: 98, rating: 4.2, ratingCount: '5.7K', ratingPercent: 84 },
  { id: '24', name: 'Perricone MD Cold Plasma Plus+ Neck & Chest', brand: 'Perricone MD', initials: 'PM', initialsColor: '#1A1A2E', category: 'Neck Care', price: 135.00, salesRank: 445, revenueEst: '$500K – $1M', monthlyGrowth: 12, ninetyDayGrowth: 76, rating: 4.1, ratingCount: '2.8K', ratingPercent: 82 },
  { id: '25', name: 'IT Cosmetics Confidence in a Neck Cream', brand: 'IT Cosmetics', initials: 'IT', initialsColor: '#E91E63', category: 'Neck Care', price: 52.00, salesRank: 78, revenueEst: '$5M – $10M', monthlyGrowth: 38, ninetyDayGrowth: 265, rating: 4.6, ratingCount: '18.4K', ratingPercent: 93 },
  { id: '26', name: 'Olay Regenerist Micro-Sculpting Neck Cream', brand: 'Olay', initials: 'OL', initialsColor: '#DC143C', category: 'Neck Care', price: 25.99, salesRank: 34, revenueEst: '$5M – $10M', monthlyGrowth: 11, ninetyDayGrowth: 89, rating: 4.3, ratingCount: '31.2K', ratingPercent: 85 },
  { id: '27', name: 'RoC Multi Correxion 5-in-1 Neck Cream', brand: 'RoC', initials: 'RC', initialsColor: '#0077B6', category: 'Neck Care', price: 29.99, salesRank: 56, revenueEst: '$1M – $5M', monthlyGrowth: 16, ninetyDayGrowth: 142, rating: 4.4, ratingCount: '14.6K', ratingPercent: 88 },
];

/* ── Filter options ─────────────────────────────────────────────── */
const FILTER_SECTIONS = [
  {
    id: 'categories',
    label: 'Product Categories',
    icon: 'grid',
    options: [
      { id: 'cosmetics', label: 'Cosmetics & Beauty' },
      { id: 'sun-protection', label: 'Sun Protection' },
      { id: 'skincare', label: 'Skincare' },
      { id: 'body-care', label: 'Body Care' },
      { id: 'organic', label: 'Organic & Natural' },
    ],
  },
  {
    id: 'revenue',
    label: 'Revenue Range',
    icon: 'chart',
    options: [
      { id: 'rev-500k-5m', label: '$500K – $5M' },
      { id: 'rev-5m-10m', label: '$5M – $10M' },
      { id: 'rev-10m+', label: '$10M+' },
      { id: 'rev-100k-500k', label: '$100K – $500K' },
    ],
  },
  {
    id: 'growth',
    label: 'Growth Signals',
    icon: 'trending',
    options: [
      { id: 'growth-100', label: '+100% or more' },
      { id: 'growth-50', label: '+50% or more' },
      { id: 'growth-25', label: '+25% or more' },
    ],
  },
  {
    id: 'segments',
    label: 'Market Segments',
    icon: 'tag',
    options: [
      { id: 'b2c', label: 'b2c' },
      { id: 'ecommerce', label: 'e-commerce' },
      { id: 'retail', label: 'retail' },
      { id: 'wholesale', label: 'wholesale' },
    ],
  },
];

/* ── People Filter options ────────────────────────────────────── */
const PEOPLE_FILTER_SECTIONS = [
  {
    id: 'location',
    label: 'Person Location',
    icon: 'tag',
    options: [
      { id: 'loc-us', label: 'United States' },
      { id: 'loc-ca', label: 'Canada' },
      { id: 'loc-uk', label: 'United Kingdom' },
      { id: 'loc-de', label: 'Germany' },
      { id: 'loc-fr', label: 'France' },
    ],
  },
  {
    id: 'job-title',
    label: 'Job Title',
    icon: 'grid',
    options: [
      { id: 'jt-vp', label: 'VP / Vice President' },
      { id: 'jt-director', label: 'Director' },
      { id: 'jt-manager', label: 'Manager' },
      { id: 'jt-head', label: 'Head of...' },
      { id: 'jt-founder', label: 'Founder / CEO' },
    ],
  },
  {
    id: 'seniority',
    label: 'Seniority',
    icon: 'trending',
    options: [
      { id: 'sen-c', label: 'C-Suite' },
      { id: 'sen-vp', label: 'VP-Level' },
      { id: 'sen-director', label: 'Director' },
      { id: 'sen-manager', label: 'Manager' },
      { id: 'sen-senior', label: 'Senior' },
    ],
  },
  {
    id: 'department',
    label: 'Department',
    icon: 'chart',
    options: [
      { id: 'dept-sales', label: 'Sales / BD' },
      { id: 'dept-marketing', label: 'Marketing' },
      { id: 'dept-supply', label: 'Supply Chain' },
      { id: 'dept-product', label: 'Product' },
      { id: 'dept-exec', label: 'Executive' },
    ],
  },
  {
    id: 'company-size',
    label: 'Company Size',
    icon: 'chart',
    options: [
      { id: 'cs-1-50', label: '1–50 employees' },
      { id: 'cs-51-200', label: '51–200 employees' },
      { id: 'cs-201-1000', label: '201–1,000 employees' },
      { id: 'cs-1000+', label: '1,000+ employees' },
    ],
  },
];

/* ── Helpers ──────────────────────────────────────────────────── */
const formatPrice = (val) => `$${val.toFixed(2)}`;

/** Group products by brand for the Brands tab */
export const groupProductsByBrand = (products) => {
  const map = {};
  for (const p of products) {
    if (!map[p.brand]) {
      map[p.brand] = { brandName: p.brand, productCount: 0, totalRevenue: 0, avgGrowth: 0, products: [] };
    }
    map[p.brand].products.push(p);
    map[p.brand].productCount += 1;
  }
  for (const g of Object.values(map)) {
    g.avgGrowth = +(g.products.reduce((s, p) => s + p.monthlyGrowth, 0) / g.productCount).toFixed(1);
  }
  return Object.values(map);
};

/* ── SVG micro-icons for filter sections ──────────────────────── */
const FilterIcons = {
  grid: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  chart: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  trending: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  tag: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  lock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  chevron: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  filter: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="20" y2="12" /><line x1="12" y1="18" x2="20" y2="18" />
    </svg>
  ),
  star: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  save: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
    </svg>
  ),
  sort: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
    </svg>
  ),
  settings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

/* ── Rating bar mini component ───────────────────────────────── */
const RatingBar = ({ percent }) => (
  <div className="oai-sp-rating-bar">
    <div className="oai-sp-rating-bar__fill" style={{ width: `${percent}%` }} />
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   Table column definitions — matching reference design
   ══════════════════════════════════════════════════════════════════ */
const productColumns = [
  {
    key: 'name',
    label: 'PRODUCT / BRAND',
    render: (val, row) => (
      <div className="oai-sp-product-cell">
        <span className="oai-sp-product-cell__avatar" style={{ background: row.initialsColor || 'var(--color-neutral-400)' }}>
          {row.initials}
        </span>
        <div className="oai-sp-product-cell__text">
          <span className="oai-sp-product-cell__name">{val}</span>
          <span className="oai-sp-product-cell__brand">{row.brand}</span>
        </div>
      </div>
    ),
  },
  { key: 'category', label: 'CATEGORY' },
  {
    key: 'price',
    label: 'PRICE',
    render: (val) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatPrice(val)}</span>,
  },
  {
    key: 'salesRank',
    label: 'SALES RANK',
    render: (val) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>#{val}</span>,
  },
  { key: 'revenueEst', label: 'REVENUE EST.' },
  {
    key: 'monthlyGrowth',
    label: 'MONTHLY GROWTH',
    render: (val) => (
      <span className={`oai-sp-growth ${val >= 20 ? 'oai-sp-growth--high' : ''}`}>
        +{val}%
      </span>
    ),
  },
  {
    key: 'ninetyDayGrowth',
    label: '90D GROWTH',
    render: (val) => (
      <span className="oai-sp-growth oai-sp-growth--ninety">
        +{val}%
      </span>
    ),
  },
  {
    key: 'rating',
    label: 'RATING',
    render: (val, row) => (
      <div className="oai-sp-rating-cell">
        <div className="oai-sp-rating-cell__top">
          {FilterIcons.star}
          <span className="oai-sp-rating-cell__value">{val}</span>
          <span className="oai-sp-rating-cell__count">({row.ratingCount})</span>
        </div>
        <RatingBar percent={row.ratingPercent} />
        <span className="oai-sp-rating-cell__pct">{row.ratingPercent}%</span>
      </div>
    ),
  },
];

/* ══════════════════════════════════════════════════════════════════
   Mock People Data — linked to brands
   ══════════════════════════════════════════════════════════════════ */
const MOCK_PEOPLE = [
  { id: 'p1', name: 'Sarah Chen', title: 'VP of Business Development', brand: 'CeraVe', company: "L'Oreal (CeraVe)", email: 'available', emailBlurred: 's••••@loreal.com', linkedin: true, linkedinUrl: 'linkedin.com/in/sarah-chen', initials: 'SC', color: '#6B8E23', location: 'New York, NY', seniority: 'VP-Level', department: 'Sales / BD', companySize: '1,000+', skills: ['Partnerships', 'Strategy', 'CPG'], bio: 'Sarah leads business development for CeraVe at L\'Oreal, focusing on retail and wholesale partnerships across North America. Previously at Unilever for 8 years.', trendingNotes: ['CeraVe Mineral Sunscreen hit 42K repeat purchases in the last 90 days (+68% vs prior quarter)', 'Brand went viral on TikTok Shop — revenue surged 340% over 60 days', 'Recently expanded to Costco and Sam\'s Club, signaling wholesale growth'] },
  { id: 'p2', name: 'Marcus Johnson', title: 'Global Partnerships Manager', brand: 'CeraVe', company: "L'Oreal (CeraVe)", email: 'available', emailBlurred: 'm••••@loreal.com', linkedin: true, linkedinUrl: 'linkedin.com/in/marcus-johnson', initials: 'MJ', color: '#6B8E23', location: 'Los Angeles, CA', seniority: 'Manager', department: 'Sales / BD', companySize: '1,000+', skills: ['Partnerships', 'Account Management'], bio: 'Marcus manages global brand partnerships for CeraVe, specializing in Amazon and DTC channels.', trendingNotes: ['CeraVe Amazon storefront grew 28% MoM in March 2026', 'Launched new DTC subscription program driving 15K sign-ups in first month'] },
  { id: 'p3', name: 'Holly Thaggard', title: 'Founder & CEO', brand: 'Supergoop!', company: 'Supergoop!', email: 'available', emailBlurred: 'h••••@supergoop.com', linkedin: true, linkedinUrl: 'linkedin.com/in/holly-thaggard', initials: 'HT', color: '#2E8B57', location: 'San Antonio, TX', seniority: 'C-Suite', department: 'Executive', companySize: '201–1,000', skills: ['Leadership', 'Brand Building', 'Fundraising'], bio: 'Holly founded Supergoop! in 2007 with a mission to make sunscreen a daily habit. Named to Forbes 50 Over 50 list.', trendingNotes: ['Supergoop! Unseen Sunscreen ranked #2 in Amazon Sun Protection for 3 consecutive months', 'Brand secured $15M Series C — expanding into Asia-Pacific markets Q3 2026', 'Unseen Sunscreen featured in Allure Best of Beauty 2026'] },
  { id: 'p4', name: 'Amanda Baldwin', title: 'President', brand: 'Supergoop!', company: 'Supergoop!', email: 'available', linkedin: true, initials: 'AB', color: '#2E8B57', location: 'New York, NY', seniority: 'C-Suite', department: 'Executive', companySize: '201–1,000', skills: ['Operations', 'P&L Management', 'Retail'], bio: 'Amanda oversees all operations at Supergoop! Previously President at Proactiv and VP at Estee Lauder.' },
  { id: 'p5', name: 'Tom Rinks', title: 'Director of Sales', brand: 'Sun Bum', company: 'Sun Bum LLC', email: 'hidden', linkedin: true, initials: 'TR', color: '#B8860B', location: 'Cocoa Beach, FL', seniority: 'Director', department: 'Sales / BD', companySize: '51–200', skills: ['Retail Sales', 'Wholesale', 'Amazon'], bio: 'Tom leads national sales for Sun Bum across mass retail, specialty, and e-commerce channels.' },
  { id: 'p6', name: 'Rachel Kim', title: 'Head of Manufacturing', brand: 'Sun Bum', company: 'Sun Bum LLC', email: 'available', linkedin: false, initials: 'RK', color: '#B8860B', location: 'San Diego, CA', seniority: 'Director', department: 'Supply Chain', companySize: '51–200', skills: ['Manufacturing', 'Supply Chain', 'Quality'], bio: 'Rachel manages all manufacturing operations and supplier relationships for Sun Bum product lines.' },
  { id: 'p7', name: 'Dr. Ada Cheng', title: 'VP Product Development', brand: 'EltaMD', company: 'EltaMD Inc.', email: 'hidden', linkedin: true, initials: 'AC', color: '#4682B4', location: 'Boise, ID', seniority: 'VP-Level', department: 'Product', companySize: '51–200', skills: ['R&D', 'Formulation', 'Dermatology'], bio: 'Ada leads product R&D at EltaMD, developing dermatologist-tested sun care formulations.' },
  { id: 'p8', name: 'Brian Wells', title: 'National Sales Director', brand: 'Banana Boat', company: 'Edgewell Personal Care', email: 'available', linkedin: true, initials: 'BW', color: '#DAA520', location: 'Shelton, CT', seniority: 'Director', department: 'Sales / BD', companySize: '1,000+', skills: ['National Accounts', 'CPG Sales', 'Trade Marketing'], bio: 'Brian drives national retail sales for the Banana Boat brand at Edgewell Personal Care.' },
  { id: 'p9', name: 'Linda Park', title: 'Sr. Brand Manager', brand: 'Neutrogena', company: 'Johnson & Johnson (Neutrogena)', email: 'available', linkedin: true, initials: 'LP', color: '#708090', location: 'Skillman, NJ', seniority: 'Senior', department: 'Marketing', companySize: '1,000+', skills: ['Brand Strategy', 'Digital Marketing', 'Innovation'], bio: 'Linda manages the Neutrogena sun care portfolio, including product launches and marketing strategy.' },
  { id: 'p10', name: 'James Duval', title: 'Global Business Development', brand: 'La Roche-Posay', company: "L'Oreal (La Roche-Posay)", email: 'hidden', linkedin: true, initials: 'JD', color: '#5F9EA0', location: 'Paris, France', seniority: 'Manager', department: 'Sales / BD', companySize: '1,000+', skills: ['International BD', 'Pharma Channel', 'Dermo-Cosmetics'], bio: 'James leads global business development for La Roche-Posay, focusing on pharmacy and professional channels.' },
  { id: 'p11', name: 'Nicole Foster', title: 'Partnerships Lead', brand: 'Blue Lizard', company: 'Crown Laboratories', email: 'available', linkedin: false, initials: 'NF', color: '#4169E1', location: 'Nashville, TN', seniority: 'Manager', department: 'Sales / BD', companySize: '51–200', skills: ['Partnerships', 'Retail', 'Healthcare'], bio: 'Nicole manages retail and distribution partnerships for Blue Lizard Australian Sunscreen.' },
  { id: 'p12', name: 'Kevin Cho', title: 'Supply Chain Director', brand: 'Hawaiian Tropic', company: 'Edgewell Personal Care', email: 'hidden', linkedin: true, initials: 'KC', color: '#CD853F', location: 'Shelton, CT', seniority: 'Director', department: 'Supply Chain', companySize: '1,000+', skills: ['Supply Chain', 'Procurement', 'Logistics'], bio: 'Kevin oversees supply chain operations for Hawaiian Tropic and other Edgewell sun care brands.' },
  { id: 'p13', name: 'Stephanie Ruiz', title: 'Marketing Director', brand: 'Coppertone', company: 'Beiersdorf (Coppertone)', email: 'available', linkedin: true, initials: 'SR', color: '#8B4513', location: 'Stamford, CT', seniority: 'Director', department: 'Marketing', companySize: '1,000+', skills: ['Brand Marketing', 'Media', 'Consumer Insights'], bio: 'Stephanie leads marketing strategy for Coppertone at Beiersdorf, driving brand growth and consumer engagement.' },
  // Neck cream people
  { id: 'p20', name: 'Diana Voss', title: 'VP of Global Sales', brand: 'StriVectin', company: 'Crown Laboratories (StriVectin)', email: 'available', emailBlurred: 'd••••@crownlabs.com', linkedin: true, linkedinUrl: 'linkedin.com/in/diana-voss', initials: 'DV', color: '#8B008B', location: 'Nashville, TN', seniority: 'VP-Level', department: 'Sales / BD', companySize: '201–1,000', skills: ['Retail Sales', 'Anti-Aging', 'Key Accounts'], bio: 'Diana leads global sales for StriVectin, managing key accounts with Sephora, Ulta, and Nordstrom.', trendingNotes: ['StriVectin TL Neck Cream became #1 in Amazon Neck Care for 4 consecutive weeks', 'Brand expanded to Target with exclusive neck cream bundle, driving 31% MoM growth'] },
  { id: 'p21', name: 'Philip Grant', title: 'Director of Product Development', brand: 'Revision Skincare', company: 'Revision Skincare', email: 'hidden', linkedin: true, linkedinUrl: 'linkedin.com/in/philip-grant', initials: 'PG', color: '#800020', location: 'Irving, TX', seniority: 'Director', department: 'Product', companySize: '51–200', skills: ['R&D', 'Clinical Skincare', 'Peptide Technology'], bio: 'Philip oversees product formulation at Revision Skincare, specializing in clinical-grade anti-aging ingredients.' },
  { id: 'p22', name: 'Mia Tanaka', title: 'Head of Partnerships', brand: 'Drunk Elephant', company: 'Shiseido (Drunk Elephant)', email: 'available', emailBlurred: 'm••••@shiseido.com', linkedin: true, linkedinUrl: 'linkedin.com/in/mia-tanaka', initials: 'MT', color: '#FF6B6B', location: 'New York, NY', seniority: 'Director', department: 'Sales / BD', companySize: '1,000+', skills: ['Partnerships', 'Luxury Beauty', 'DTC Strategy'], bio: 'Mia manages strategic partnerships for Drunk Elephant under Shiseido, focusing on premium retail and DTC growth.', trendingNotes: ['Drunk Elephant Protini Neck Cream saw 210% 90-day growth driven by Sephora Clean Beauty campaign', 'Brand launched refillable packaging program, gaining 24% new customer acquisition'] },
  { id: 'p23', name: 'Robert Hale', title: 'National Sales Manager', brand: 'ELEMIS', company: 'L\'Occitane Group (ELEMIS)', email: 'available', linkedin: true, initials: 'RH', color: '#2C3E50', location: 'London, UK', seniority: 'Manager', department: 'Sales / BD', companySize: '1,000+', skills: ['International Sales', 'Spa Channel', 'Luxury Beauty'], bio: 'Robert manages ELEMIS national and international sales, specializing in spa and professional channels.' },
  { id: 'p24', name: 'Jennifer Wu', title: 'Sr. Brand Manager', brand: 'IT Cosmetics', company: "L'Oreal (IT Cosmetics)", email: 'available', emailBlurred: 'j••••@loreal.com', linkedin: true, linkedinUrl: 'linkedin.com/in/jennifer-wu', initials: 'JW', color: '#E91E63', location: 'Jersey City, NJ', seniority: 'Senior', department: 'Marketing', companySize: '1,000+', skills: ['Brand Strategy', 'Product Launch', 'Inclusive Beauty'], bio: 'Jennifer manages the IT Cosmetics skincare portfolio including their fastest-growing neck cream line.', trendingNotes: ['IT Cosmetics Neck Cream ranked #1 in Amazon Anti-Aging for 2 months running', 'Brand achieved 38% MoM growth after viral dermatologist endorsement on Instagram', 'Confidence in a Neck Cream won Allure Best of Beauty 2026 in neck care category'] },
  { id: 'p25', name: 'Carlos Mendez', title: 'Supply Chain Director', brand: 'Olay', company: 'Procter & Gamble (Olay)', email: 'hidden', linkedin: true, initials: 'CM', color: '#DC143C', location: 'Cincinnati, OH', seniority: 'Director', department: 'Supply Chain', companySize: '1,000+', skills: ['Supply Chain', 'Manufacturing', 'Cost Optimization'], bio: 'Carlos oversees Olay supply chain operations at P&G, managing manufacturing and distribution for North America.' },
];

/* ── People table columns (Apollo-style) ─────────────────────── */
const EmailIcon = ({ status }) => (
  <span className={`oai-sp-email-status oai-sp-email-status--${status}`}>
    {status === 'available' ? (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ) : (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    )}
  </span>
);

const LinkedInIcon = ({ available }) => (
  <span className={`oai-sp-linkedin-status ${available ? 'oai-sp-linkedin-status--yes' : 'oai-sp-linkedin-status--no'}`}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  </span>
);

/* peopleColumns is built inside the component to access setProfilePerson */

/* ══════════════════════════════════════════════════════════════════
   Mock Saved Lists — with outreach pipeline status
   ══════════════════════════════════════════════════════════════════ */
const MOCK_SAVED_LISTS = [
  {
    id: 'list-1', name: 'Sunscreen List', createdAt: '2026-04-05',
    products: [
      { id: '1', name: 'CeraVe Hydrating Mineral Sunscreen SP...', brand: 'CeraVe', initials: 'CV', color: '#6B8E23' },
      { id: '2', name: 'Supergoop! Unseen Sunscreen SPF 40', brand: 'Supergoop!', initials: 'SG', color: '#2E8B57' },
      { id: '3', name: 'Sun Bum Original SPF 50 Sunscreen Lot...', brand: 'Sun Bum', initials: 'SB', color: '#B8860B' },
      { id: '4', name: 'EltaMD UV Clear Broad-Spectrum SPF 46', brand: 'EltaMD', initials: 'EM', color: '#4682B4' },
      { id: '5', name: 'Blue Lizard Australian Sunscreen SPF 30+', brand: 'Blue Lizard', initials: 'BL', color: '#4169E1' },
    ],
    brands: ['CeraVe', 'Supergoop!', 'Sun Bum', 'EltaMD', 'Blue Lizard'],
    people: [
      { name: 'Sarah Chen', title: 'VP of Business Development', company: 'CeraVe', status: 'replied', initials: 'SC', color: '#6B8E23' },
      { name: 'Holly Thaggard', title: 'Founder & CEO', company: 'Supergoop!', status: 'contacted', initials: 'HT', color: '#2E8B57' },
      { name: 'Tom Rinks', title: 'Director of Sales', company: 'Sun Bum', status: 'pending', initials: 'TR', color: '#B8860B' },
    ],
    pipeline: { searched: true, brandsFound: true, peopleFound: true, contacted: 2, replied: 1, pending: 1 },
  },
  {
    id: 'list-2', name: 'Neck Cream List', createdAt: '2026-04-06',
    products: [
      { id: '11', name: 'StriVectin TL Advanced Neck Cream', brand: 'StriVectin', initials: 'SV', color: '#8B008B' },
      { id: '12', name: 'CeraVe Skin Renewing Neck Cream', brand: 'CeraVe', initials: 'CV', color: '#6B8E23' },
      { id: '13', name: 'Olay Regenerist Micro-Sculpting Cream', brand: 'Olay', initials: 'OL', color: '#DC143C' },
    ],
    brands: ['StriVectin', 'CeraVe', 'Olay'],
    people: [
      { name: 'Marcus Johnson', title: 'Global Partnerships Manager', company: 'CeraVe', status: 'pending', initials: 'MJ', color: '#6B8E23' },
    ],
    pipeline: { searched: true, brandsFound: true, peopleFound: true, contacted: 0, replied: 0, pending: 1 },
  },
  {
    id: 'list-3', name: 'Vitamin C Serum Prospects', createdAt: '2026-04-07',
    products: [
      { id: '14', name: 'TruSkin Vitamin C Serum', brand: 'TruSkin', initials: 'TS', color: '#FF8C00' },
      { id: '15', name: 'Derma E Vitamin C Serum', brand: 'Derma E', initials: 'DE', color: '#2F4F4F' },
    ],
    brands: ['TruSkin', 'Derma E'],
    people: [],
    pipeline: { searched: true, brandsFound: true, peopleFound: false, contacted: 0, replied: 0, pending: 0 },
  },
];

/* ── For Add to List modal (simple ref) ──────────────────────── */
const MOCK_LISTS = MOCK_SAVED_LISTS.map((l) => ({ id: l.id, name: l.name, tabCount: l.brands.length }));

/* ── Progress step icons ─────────────────────────────────────── */
const ProgressIcons = {
  done: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="9 12 12 15 16 10" />
    </svg>
  ),
  active: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" fill="var(--color-primary-600)" />
    </svg>
  ),
  pending: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-300)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
};

/* ── Outreach status badge helper ────────────────────────────── */
const OutreachBadge = ({ status }) => {
  const config = {
    replied: { label: 'Replied', variant: 'success' },
    contacted: { label: 'Contacted', variant: 'warning' },
    pending: { label: 'Pending', variant: 'info' },
  };
  const c = config[status] || config.pending;
  return <Badge label={c.label} variant={c.variant} size="small" />;
};

/* ══════════════════════════════════════════════════════════════════
   SearchPage Component
   ══════════════════════════════════════════════════════════════════ */
export const SearchPage = ({ products = MOCK_PRODUCTS, savedLists = [], onAddNewList, onAddProductsToList }) => {
  const [keyword, setKeyword] = useState('sunscreen');
  const [activeTab, setActiveTab] = useState('product');
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [aiMode, setAiMode] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [profilePerson, setProfilePerson] = useState(null);
  const [revealConfirm, setRevealConfirm] = useState(false);
  const [revealedEmails, setRevealedEmails] = useState({});

  // Add Company state (P1 Wow Point)
  const [addCompanyOpen, setAddCompanyOpen] = useState(false);
  const [companyQuery, setCompanyQuery] = useState('');
  const [addedCompanies, setAddedCompanies] = useState([]); // [{name, domain, industry, size, location, revenue}]
  const [companyBanner, setCompanyBanner] = useState(null); // {name, count} or null
  const COMPANY_DB = [
    { name: 'CeraVe', domain: 'cerave.com', industry: 'Skincare / Sun Care', size: '1,000+', location: 'New York, NY', revenue: '$2.5B (L\'Oreal)', growth: '+28% MoM', match: 'Bullseye', initials: 'CV', color: '#6B8E23', peopleCount: 12 },
    { name: 'Olay', domain: 'olay.com', industry: 'Skincare / Anti-Aging', size: '1,000+', location: 'Cincinnati, OH', revenue: '$3.2B (P&G)', growth: '+15% MoM', match: 'Bullseye', initials: 'OL', color: '#DC143C', peopleCount: 9 },
    { name: 'Supergoop!', domain: 'supergoop.com', industry: 'Sun Care / Clean Beauty', size: '201-1,000', location: 'San Antonio, TX', revenue: '$150M est.', growth: '+340% (TikTok Shop)', match: 'Bullseye', initials: 'SG', color: '#2E8B57', peopleCount: 6 },
    { name: 'EltaMD', domain: 'eltamd.com', industry: 'Dermatologist Skincare', size: '51-200', location: 'Boise, ID', revenue: '$45M est.', growth: '+22% YoY', match: 'High match', initials: 'EM', color: '#4682B4', peopleCount: 4 },
    { name: 'StriVectin', domain: 'strivectin.com', industry: 'Anti-Aging Skincare', size: '201-1,000', location: 'Nashville, TN', revenue: '$120M est.', growth: '#1 Amazon Neck Care', match: 'High match', initials: 'SV', color: '#8B008B', peopleCount: 7 },
    { name: 'Sun Bum', domain: 'sunbum.com', industry: 'Sun Care / Lifestyle', size: '51-200', location: 'Cocoa Beach, FL', revenue: '$60M est.', growth: '+18% MoM', match: 'High match', initials: 'SB', color: '#B8860B', peopleCount: 5 },
    { name: 'TruSkin', domain: 'truskin.com', industry: 'Clean Skincare', size: '11-50', location: 'Austin, TX', revenue: '$8M est.', growth: 'Founder-led', match: 'Match', initials: 'TS', color: '#FF8C00', peopleCount: 3 },
    { name: 'Drunk Elephant', domain: 'drunkelephant.com', industry: 'Premium Skincare', size: '1,000+', location: 'New York, NY', revenue: '$1.5B (Shiseido)', growth: '+210% (Protini Neck)', match: 'Bullseye', initials: 'DE', color: '#FF6B6B', peopleCount: 8 },
  ];
  const filteredCompanies = COMPANY_DB.filter((c) => !addedCompanies.find((a) => a.name === c.name) && (companyQuery === '' || c.name.toLowerCase().includes(companyQuery.toLowerCase()) || c.domain.toLowerCase().includes(companyQuery.toLowerCase())));

  const handleAddCompany = (company) => {
    setAddedCompanies((prev) => [...prev, company]);
    setCompanyBanner({ name: company.name, count: company.peopleCount });
    setAddCompanyOpen(false);
    setCompanyQuery('');
    setActiveTab('brand');
  };
  const dismissCompanyBanner = () => setCompanyBanner(null);

  // Filter state: which filter options are checked
  const [checkedFilters, setCheckedFilters] = useState({
    'cosmetics': true,
    'sun-protection': true,
    'skincare': true,
    'rev-500k-5m': true,
    'rev-5m-10m': true,
    'growth-100': true,
    'b2c': true,
    'ecommerce': true,
  });

  // Accordion open/close per section
  const [openSections, setOpenSections] = useState({
    categories: true,
    revenue: true,
    growth: true,
    segments: true,
  });

  // Selection state
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);

  // Add to List modal
  const [addToListOpen, setAddToListOpen] = useState(false);
  const [addToListTargetId, setAddToListTargetId] = useState(null);
  const [creatingNewList, setCreatingNewList] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [toast, setToast] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalResults = 8063;
  const perPage = 30;

  /* ── Filter logic ─────────────────────────────────────────── */
  const activeFilterEntries = useMemo(() => {
    const entries = [];
    for (const section of FILTER_SECTIONS) {
      for (const opt of section.options) {
        if (checkedFilters[opt.id]) {
          entries.push({ ...opt, sectionId: section.id });
        }
      }
    }
    return entries;
  }, [checkedFilters]);

  const activeFilterCount = activeFilterEntries.length;

  const filteredProducts = useMemo(() => {
    let result = products;
    if (keyword.trim()) {
      const kw = keyword.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(kw) || p.brand.toLowerCase().includes(kw)
      );
    }
    return result;
  }, [products, keyword]);

  /* ── Toggle helpers ───────────────────────────────────────── */
  const toggleFilter = (optId) => {
    setCheckedFilters((prev) => ({ ...prev, [optId]: !prev[optId] }));
  };

  const removeFilter = (optId) => {
    setCheckedFilters((prev) => ({ ...prev, [optId]: false }));
  };

  const clearAllFilters = () => {
    setCheckedFilters({});
  };

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  /* ── People for selected brands ──────────────────────────── */
  const selectedBrandNames = useMemo(() => {
    const ids = new Set(selectedProducts);
    return [...new Set(filteredProducts.filter((p) => ids.has(p.id)).map((p) => p.brand))];
  }, [selectedProducts, filteredProducts]);

  const peopleBrandGroups = useMemo(() => {
    // If products selected, show people for those brands; otherwise show all
    const brands = selectedBrandNames.length > 0 ? selectedBrandNames : [...new Set(filteredProducts.map((p) => p.brand))];
    const groups = [];

    // Added companies first (highlighted)
    for (const co of addedCompanies) {
      const brandPeople = MOCK_PEOPLE.filter((p) => p.brand === co.name);
      groups.push({
        brand: co.name,
        productCount: 0,
        people: brandPeople.length > 0 ? brandPeople : [],
        initials: co.initials,
        color: co.color,
        addedDirectly: true,
      });
    }

    for (const brand of brands) {
      // skip if already added directly
      if (addedCompanies.find((c) => c.name === brand)) continue;
      const brandProducts = filteredProducts.filter((p) => p.brand === brand);
      const brandPeople = MOCK_PEOPLE.filter((p) => p.brand === brand);
      if (brandPeople.length > 0) {
        groups.push({
          brand,
          productCount: brandProducts.length,
          people: brandPeople,
          initials: brandProducts[0]?.initials || brand.slice(0, 2).toUpperCase(),
          color: brandProducts[0]?.initialsColor || 'var(--color-neutral-400)',
        });
      }
    }
    return groups;
  }, [selectedBrandNames, filteredProducts, addedCompanies]);

  /* ── Selection helpers ─────────────────────────────────────── */
  const selectionCount = selectedProducts.length;

  const handleAddToList = () => {
    let targetId = addToListTargetId;
    let listName = '';

    if (creatingNewList && newListName.trim()) {
      targetId = onAddNewList?.(newListName.trim());
      listName = newListName.trim();
    } else if (targetId) {
      const list = savedLists.find((l) => l.id === targetId);
      listName = list?.name || '';
    } else {
      return;
    }

    // Add selected products to the list
    const selectedProductData = filteredProducts.filter((p) => selectedProducts.includes(p.id)).map((p) => ({
      id: p.id, name: p.name, brand: p.brand, initials: p.initials, color: p.initialsColor, category: p.category, price: p.price,
    }));
    if (targetId && onAddProductsToList) onAddProductsToList(targetId, selectedProductData);

    const count = selectionCount;
    setAddToListOpen(false);
    setAddToListTargetId(null);
    setCreatingNewList(false);
    setNewListName('');
    setSelectedProducts([]);
    showToast(`${count} item${count > 1 ? 's' : ''} added to "${listName}"`);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  /* ── Brand groups for Brand tab ──────────────────────────── */
  const brandGroups = useMemo(() => groupProductsByBrand(filteredProducts), [filteredProducts]);

  /* ── People columns (needs setProfilePerson) ────────────── */
  /* Mask last name: "Sarah Chen" → "Sarah C." */
  const maskName = (fullName, id) => {
    if (revealedEmails[id]) return fullName;
    const parts = fullName.split(' ');
    if (parts.length <= 1) return fullName;
    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  };

  const handleRevealEmail = (id) => {
    setRevealedEmails((prev) => ({ ...prev, [id]: true }));
  };

  const peopleColumns = [
    {
      key: 'name',
      label: 'NAME',
      render: (val, row) => (
        <div className="oai-sp-product-cell">
          <span className="oai-sp-product-cell__avatar" style={{ background: row.color || 'var(--color-neutral-400)' }}>
            {row.initials}
          </span>
          <div className="oai-sp-product-cell__text">
            <button className="oai-sp-person-link" onClick={(e) => { e.stopPropagation(); setProfilePerson(row); }}>{maskName(val, row.id)}</button>
            <span className="oai-sp-product-cell__brand">{row.title}</span>
          </div>
        </div>
      ),
    },
    { key: 'company', label: 'COMPANY' },
    {
      key: 'location',
      label: 'LOCATION',
      render: (val) => <span className="oai-sp-location">{val || '—'}</span>,
    },
    {
      key: 'email',
      label: 'EMAIL',
      render: (val, row) => {
        const isRevealed = revealedEmails[row.id];
        if (val === 'available' && isRevealed) {
          return (
            <div className="oai-sp-contact-status">
              <EmailIcon status="available" />
              <span style={{ fontSize: 'var(--font-size-xs)' }}>{row.emailBlurred?.replace(/•/g, '') || `${row.initials.toLowerCase()}@${row.company?.split(' ')[0].toLowerCase()}.com`}</span>
            </div>
          );
        }
        if (val === 'available') {
          return (
            <button className="oai-sp-reveal-btn" onClick={(e) => { e.stopPropagation(); handleRevealEmail(row.id); }}>
              <EmailIcon status="available" />
              <span>Reveal Email</span>
            </button>
          );
        }
        return (
          <div className="oai-sp-contact-status oai-sp-contact-status--hidden">
            <EmailIcon status="hidden" />
            <span>Not available</span>
          </div>
        );
      },
    },
    {
      key: 'linkedin',
      label: 'LINKEDIN',
      render: (val) => (
        <div className="oai-sp-contact-status">
          <LinkedInIcon available={val} />
          <span>{val ? 'Available' : 'N/A'}</span>
        </div>
      ),
    },
  ];

  /* ── Category tabs ─────────────────────────────────────────── */
  const categoryTabs = [
    { id: 'product', label: 'Product' },
    { id: 'brand', label: 'Brand' },
    { id: 'people', label: 'People' },
  ];

  /* ── Render ────────────────────────────────────────────────── */
  return (
    <div className="oai-sp">
      {/* ── LEFT SIDEBAR — Filters or Progress Tree ────── */}
      {filtersVisible && (
        <aside className="oai-sp-filters">
          <div className="oai-sp-filters__header">
            <span className="oai-sp-filters__title">Filters</span>
            <button className="oai-sp-filters__hide-btn" onClick={() => setFiltersVisible(false)}>
              {FilterIcons.filter}
              <span>Hide</span>
              {activeFilterCount > 0 && <Badge label={String(activeFilterCount)} variant="info" size="small" />}
            </button>
          </div>
          <div className="oai-sp-filters__counts">
            <div className="oai-sp-filters__count-item">
              <span className="oai-sp-filters__count-value">8.1K</span>
              <span className="oai-sp-filters__count-label">Total</span>
            </div>
            <div className="oai-sp-filters__count-item">
              <span className="oai-sp-filters__count-value">8.1K</span>
              <span className="oai-sp-filters__count-label">Net New</span>
            </div>
            <div className="oai-sp-filters__count-item">
              <span className="oai-sp-filters__count-value">0</span>
              <span className="oai-sp-filters__count-label">Saved</span>
            </div>
          </div>
          <div className="oai-sp-filters__sections">
            {(activeTab === 'people' ? PEOPLE_FILTER_SECTIONS : FILTER_SECTIONS).map((section) => {
              const sectionCheckedCount = section.options.filter((o) => checkedFilters[o.id]).length;
              const isOpen = openSections[section.id];
              return (
                <div key={section.id} className="oai-sp-filters__section">
                  <button className="oai-sp-filters__section-header" onClick={() => !section.locked && toggleSection(section.id)} aria-expanded={isOpen}>
                    <span className="oai-sp-filters__section-icon">{FilterIcons[section.icon]}</span>
                    <span className="oai-sp-filters__section-label">{section.label}</span>
                    {sectionCheckedCount > 0 && (
                      <>
                        <span className="oai-sp-filters__section-count">{sectionCheckedCount}</span>
                        <span className="oai-sp-filters__section-x" onClick={(e) => { e.stopPropagation(); section.options.forEach((o) => removeFilter(o.id)); }}>&times;</span>
                      </>
                    )}
                    {section.locked ? (
                      <span className="oai-sp-filters__section-lock">{FilterIcons.lock}</span>
                    ) : (
                      <span className={`oai-sp-filters__section-chevron ${isOpen ? 'oai-sp-filters__section-chevron--open' : ''}`}>{FilterIcons.chevron}</span>
                    )}
                  </button>
                  {isOpen && !section.locked && (
                    <div className="oai-sp-filters__section-body">
                      {section.options.map((opt) => (
                        <label key={opt.id} className="oai-sp-filters__option">
                          <input type="checkbox" checked={!!checkedFilters[opt.id]} onChange={() => toggleFilter(opt.id)} />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="oai-sp-filters__bottom">
            {activeFilterCount > 0 && <button className="oai-sp-filters__clear-all" onClick={clearAllFilters}>Clear all {activeFilterCount}</button>}
            <button className="oai-sp-filters__view-all">View all 61 filters</button>
          </div>
        </aside>
      )}


      {/* ── RIGHT: Main Content ──────────────────────────── */}
      <main className={`oai-sp-main ${!filtersVisible ? 'oai-sp-main--full' : ''}`}>
        {/* Header */}
        <div className="oai-sp-main__header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
          <div>
            <h1 className="oai-sp-main__title">Find Growing Products</h1>
            <p className="oai-sp-main__subtitle">
              Discover fast-growing Amazon products ready for manufacturing partnerships.
            </p>
          </div>
          <Button variant="primary" size="medium" label="+ Add Company" onClick={() => setAddCompanyOpen(true)} />
        </div>

        {/* Company added banner */}
        {companyBanner && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: 'var(--space-3) var(--space-4)',
            margin: 'var(--space-3) 0',
            background: 'var(--color-primary-50)',
            border: '1px solid var(--color-primary-200)',
            borderLeft: '4px solid var(--color-primary-600)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-family-sans)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-primary-600)"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" /></svg>
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)' }}>
                <strong>We found {companyBanner.count} likely decision-makers at {companyBanner.name}</strong> — including BD, Partnerships, and Manufacturing leads.
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <button onClick={() => { setActiveTab('people'); }} style={{ background: 'none', border: 'none', color: 'var(--color-primary-700)', cursor: 'pointer', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', fontFamily: 'var(--font-family-sans)' }}>
                View people →
              </button>
              <button onClick={dismissCompanyBanner} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', padding: '2px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="oai-sp-main__tabs">
          <Tabs tabs={categoryTabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Search bar — normal or AI expanded */}
        {!aiMode ? (
          <div className="oai-sp-search">
            <div className="oai-sp-search__input-wrapper">
              <span className="oai-sp-search__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                className="oai-sp-search__input"
                type="text"
                placeholder="Search products, brands, categories..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="oai-sp-search__actions">
              <button className="oai-sp-search__action-btn oai-sp-search__action-btn--ai" onClick={() => setAiMode(true)}>
                {Icons.sparkle}
                <span>Advanced search</span>
              </button>
<button className="oai-sp-search__action-btn">
                {FilterIcons.sort}
                <span>Relevance</span>
              </button>
              <button className="oai-sp-search__action-btn">
                {FilterIcons.settings}
                <span>Search settings</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="oai-sp-ai-search">
            <div className="oai-sp-ai-search__header">
              <span className="oai-sp-ai-search__sparkle">{Icons.sparkle}</span>
              <span className="oai-sp-ai-search__title">Advanced search</span>
              <button className="oai-sp-ai-search__close" onClick={() => setAiMode(false)} aria-label="Close advanced search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <textarea
              className="oai-sp-ai-search__textarea"
              placeholder={'Describe what you\'re looking for in natural language...\n\ne.g. "Find sunscreen products under $20 with high growth in the last 90 days, sold by small brands"'}
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              rows={4}
              autoFocus
            />
            <div className="oai-sp-ai-search__footer">
              <div className="oai-sp-ai-search__hints">
                <button className="oai-sp-ai-search__hint-chip" onClick={() => setAiQuery('Top growing sunscreens under $25 with 4+ stars')}>Top growing sunscreens under $25</button>
                <button className="oai-sp-ai-search__hint-chip" onClick={() => setAiQuery('Small brands in skincare with revenue over $1M and high growth')}>Small skincare brands, $1M+ revenue</button>
                <button className="oai-sp-ai-search__hint-chip" onClick={() => setAiQuery('Find mineral sunscreen products ranked in top 50')}>Mineral sunscreen, top 50 rank</button>
              </div>
              <button className="oai-sp-ai-search__submit" onClick={() => { if (aiQuery.trim()) { setKeyword(aiQuery.split(' ').slice(0, 3).join(' ')); setAiMode(false); } }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Show filters button (when sidebar hidden) */}
        {!filtersVisible && (
          <button className="oai-sp-show-filters" onClick={() => setFiltersVisible(true)}>
            {FilterIcons.filter}
            <span>Show Filters</span>
            {activeFilterCount > 0 && <Badge label={String(activeFilterCount)} variant="info" size="small" />}
          </button>
        )}

        {/* Active filter chips */}
        {activeFilterEntries.length > 0 && (
          <div className="oai-sp-chips">
            <span className="oai-sp-chips__label">Active:</span>
            {activeFilterEntries.map((entry) => (
              <span key={entry.id} className="oai-sp-chips__chip">
                {entry.label}
                <button className="oai-sp-chips__chip-x" onClick={() => removeFilter(entry.id)} aria-label={`Remove ${entry.label}`}>&times;</button>
              </span>
            ))}
          </div>
        )}

        {/* ── Tab Content ─────────────────────────────────── */}
        {activeTab === 'product' && (
          <>
            <Table columns={productColumns} data={filteredProducts} sortable selectable striped />
            <div className="oai-sp-pagination">
              <button className="oai-sp-pagination__btn" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <span className="oai-sp-pagination__current">{currentPage}</span>
              <button className="oai-sp-pagination__btn" onClick={() => setCurrentPage((p) => p + 1)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
              <span className="oai-sp-pagination__info">
                {(currentPage - 1) * perPage + 1} - {Math.min(currentPage * perPage, totalResults)} of {totalResults.toLocaleString()}
              </span>
            </div>
            <div className="oai-sp-footer">Powered by Keepa + AI — results ranked by growth potential</div>
          </>
        )}

        {activeTab === 'brand' && (
          <div className="oai-sp-people">
            {/* Added companies via "+ Add Company" */}
            {addedCompanies.length > 0 && (
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-2)' }}>Added Companies</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-3)' }}>
                  {addedCompanies.map((co) => (
                    <div key={co.name} style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-card)', padding: 'var(--space-3)', fontFamily: 'var(--font-family-sans)' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                        <span className="oai-sp-product-cell__avatar" style={{ background: co.color, width: 36, height: 36, fontSize: 12, flexShrink: 0 }}>{co.initials}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginBottom: '2px' }}>
                            <span style={{ fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>{co.name}</span>
                            <Badge label={co.match} variant={co.match === 'Bullseye' ? 'success' : 'info'} size="small" />
                          </div>
                          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>{co.domain}</div>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 8px', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                        <span><strong style={{ color: 'var(--color-text-primary)' }}>{co.size}</strong> employees</span>
                        <span>{co.location}</span>
                        <span>{co.industry}</span>
                        <span style={{ color: 'var(--color-success-700)', fontWeight: 'var(--font-weight-semibold)' }}>{co.growth}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--color-border-default)' }}>
                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{co.peopleCount} contacts found</span>
                        <Button variant="ghost" size="small" label="View people" onClick={() => setActiveTab('people')} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {brandGroups.length === 0 ? (
              <EmptyState icon={Icons.brands} title="No brands found" description="Try adjusting your search or filters." />
            ) : (
              brandGroups.map((group) => {
                const brandProduct = filteredProducts.find((p) => p.brand === group.brandName);
                return (
                  <div key={group.brandName} className="oai-sp-people__brand-group">
                    <div className="oai-sp-people__brand-header">
                      <span className="oai-sp-product-cell__avatar" style={{ background: brandProduct?.initialsColor || 'var(--color-neutral-400)' }}>
                        {brandProduct?.initials || group.brandName.slice(0, 2).toUpperCase()}
                      </span>
                      <div className="oai-sp-people__brand-info">
                        <span className="oai-sp-people__brand-name">{group.brandName}</span>
                        <span className="oai-sp-people__brand-meta">
                          {group.productCount} product{group.productCount !== 1 ? 's' : ''} &middot; Avg growth +{group.avgGrowth}%
                        </span>
                      </div>
                    </div>
                    <Table columns={productColumns} data={group.products} sortable selectable />
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'people' && (
          <div className="oai-sp-people">
            {selectedProducts.length > 0 && (
              <div className="oai-sp-people__hint">
                Showing contacts for {selectedBrandNames.length} brand{selectedBrandNames.length !== 1 ? 's' : ''} from your selected products
              </div>
            )}
            {selectedProducts.length === 0 && (
              <div className="oai-sp-people__hint oai-sp-people__hint--neutral">
                Select products in the Product tab to filter contacts by brand, or browse all contacts below
              </div>
            )}
            {peopleBrandGroups.length === 0 ? (
              <EmptyState icon={Icons.contacts} title="No contacts found" description="Try selecting different products or adjusting your search." />
            ) : (
              peopleBrandGroups.map((group) => (
                <div key={group.brand} className="oai-sp-people__brand-group">
                  <div className="oai-sp-people__brand-header">
                    <span className="oai-sp-product-cell__avatar" style={{ background: group.color }}>
                      {group.initials}
                    </span>
                    <div className="oai-sp-people__brand-info">
                      <span className="oai-sp-people__brand-name">{group.brand}</span>
                      <span className="oai-sp-people__brand-meta">
                        {group.productCount} product{group.productCount !== 1 ? 's' : ''} &middot; {group.people.length} contact{group.people.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <Table columns={peopleColumns} data={group.people} selectable onSelectionChange={(rows) => {
                    setSelectedPeople((prev) => {
                      const otherGroupPeople = prev.filter((p) => p.company !== group.brand);
                      return [...otherGroupPeople, ...rows];
                    });
                  }} />
                </div>
              ))
            )}
          </div>
        )}

      </main>

      {/* ── Selection action bar — Products ────────────── */}
      {selectionCount > 0 && activeTab === 'product' && (
        <div className="oai-search-action-bar">
          <span className="oai-search-action-bar__count">
            {selectionCount} product{selectionCount > 1 ? 's' : ''} selected
          </span>
          <Button variant="primary" size="medium" label="Add to List" onClick={() => setAddToListOpen(true)} />
          <Button variant="ghost" size="small" label="Clear" onClick={() => setSelectedProducts([])} />
        </div>
      )}

      {/* ── Selection action bar — People ────────────── */}
      {selectedPeople.length > 0 && activeTab === 'people' && (
        <div className="oai-search-action-bar">
          <span className="oai-search-action-bar__count">
            {selectedPeople.length} contact{selectedPeople.length > 1 ? 's' : ''} selected
          </span>
          <Button variant="primary" size="medium" label="Add to List" onClick={() => setAddToListOpen(true)} />
          <Button variant="ghost" size="small" label="Send Email" onClick={() => {}} />
          <Button variant="ghost" size="small" label="Clear" onClick={() => setSelectedPeople([])} />
        </div>
      )}

      {/* ── Add to List Modal ────────────────────────────── */}
      <Modal
        isOpen={addToListOpen}
        onClose={() => { setAddToListOpen(false); setAddToListTargetId(null); setCreatingNewList(false); setNewListName(''); }}
        title="Add to List"
        size="sm"
        footer={
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
            <Button variant="ghost" size="small" label="Cancel" onClick={() => { setAddToListOpen(false); setAddToListTargetId(null); setCreatingNewList(false); setNewListName(''); }} />
            <Button variant="primary" size="small" label="Add to List" onClick={handleAddToList} disabled={creatingNewList ? !newListName.trim() : !addToListTargetId} />
          </div>
        }
      >
        <p style={{ margin: '0 0 var(--space-2)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          {selectionCount} item{selectionCount > 1 ? 's' : ''} will be added.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
          {/* Create New List option */}
          {creatingNewList ? (
            <div style={{ padding: 'var(--space-3)', border: '1px solid var(--color-primary-500)', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-50)' }}>
              <input
                type="text"
                placeholder="Enter list name..."
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                autoFocus
                style={{ width: '100%', padding: 'var(--space-2)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-sm)', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          ) : (
            <button
              onClick={() => { setCreatingNewList(true); setAddToListTargetId(null); }}
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', width: '100%', padding: 'var(--space-3)', border: '1px dashed var(--color-border-strong)', borderRadius: 'var(--radius-md)', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-link)' }}
            >
              + Create New List
            </button>
          )}

          {/* Existing lists */}
          {savedLists.map((list) => (
            <button
              key={list.id}
              className={`oai-atl__list-item ${!creatingNewList && addToListTargetId === list.id ? 'oai-atl__list-item--selected' : ''}`}
              onClick={() => { setAddToListTargetId(list.id); setCreatingNewList(false); setNewListName(''); }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 'var(--space-3)', border: `1px solid ${!creatingNewList && addToListTargetId === list.id ? 'var(--color-primary-500)' : 'var(--color-border-default)'}`, borderRadius: 'var(--radius-md)', background: !creatingNewList && addToListTargetId === list.id ? 'var(--color-primary-50)' : 'var(--color-bg-card)', cursor: 'pointer', fontFamily: 'var(--font-family-sans)', textAlign: 'left' }}
            >
              <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>{list.name}</span>
              <Badge label={`${list.products.length} items`} variant="info" size="small" />
            </button>
          ))}
        </div>
      </Modal>

      {/* ── Person Profile Drawer ───────────────────────── */}
      {profilePerson && (
        <div className="oai-sp-drawer-backdrop" onClick={() => setProfilePerson(null)}>
          <aside className="oai-sp-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="oai-sp-drawer__header">
              <button className="oai-sp-drawer__close" onClick={() => setProfilePerson(null)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="oai-sp-drawer__profile">
              <span className="oai-sp-drawer__avatar" style={{ background: profilePerson.color }}>
                {profilePerson.initials}
              </span>
              <h2 className="oai-sp-drawer__name">{profilePerson.name}</h2>
              <p className="oai-sp-drawer__title">{profilePerson.title}</p>
              <p className="oai-sp-drawer__company">{profilePerson.company}</p>
            </div>
            <div className="oai-sp-drawer__details">
              <div className="oai-sp-drawer__row">
                <span className="oai-sp-drawer__label">Location</span>
                <span className="oai-sp-drawer__value">{profilePerson.location || '—'}</span>
              </div>
              <div className="oai-sp-drawer__row">
                <span className="oai-sp-drawer__label">Seniority</span>
                <span className="oai-sp-drawer__value">{profilePerson.seniority || '—'}</span>
              </div>
              <div className="oai-sp-drawer__row">
                <span className="oai-sp-drawer__label">Department</span>
                <span className="oai-sp-drawer__value">{profilePerson.department || '—'}</span>
              </div>
              <div className="oai-sp-drawer__row">
                <span className="oai-sp-drawer__label">Company Size</span>
                <span className="oai-sp-drawer__value">{profilePerson.companySize || '—'}</span>
              </div>
              <div className="oai-sp-drawer__row">
                <span className="oai-sp-drawer__label">Verified Email</span>
                <span className="oai-sp-drawer__value">
                  {profilePerson.email === 'available' ? (
                    revealedEmails[profilePerson.id] ? (
                      <span className="oai-sp-drawer__email-group">
                        <EmailIcon status="available" />
                        <span className="oai-sp-drawer__email-revealed">{revealedEmails[profilePerson.id]}</span>
                      </span>
                    ) : (
                      <span className="oai-sp-drawer__email-group">
                        <EmailIcon status="available" />
                        <span className="oai-sp-drawer__email-blurred">{profilePerson.emailBlurred || 'a••••@company.com'}</span>
                        <button className="oai-sp-drawer__reveal-btn" onClick={() => setRevealConfirm(true)}>Reveal</button>
                      </span>
                    )
                  ) : (
                    <><EmailIcon status="hidden" /> Hidden</>
                  )}
                </span>
              </div>
              <div className="oai-sp-drawer__row">
                <span className="oai-sp-drawer__label">LinkedIn</span>
                <span className="oai-sp-drawer__value">
                  {profilePerson.linkedin ? (
                    <span className="oai-sp-drawer__linkedin-group">
                      <LinkedInIcon available={true} />
                      <span>Available</span>
                      <a className="oai-sp-drawer__link-btn" href={`https://${profilePerson.linkedinUrl || '#'}`} target="_blank" rel="noopener noreferrer">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      </a>
                    </span>
                  ) : (
                    <><LinkedInIcon available={false} /> N/A</>
                  )}
                </span>
              </div>
              {profilePerson.skills && profilePerson.skills.length > 0 && (
                <div className="oai-sp-drawer__row">
                  <span className="oai-sp-drawer__label">Skills</span>
                  <div className="oai-sp-drawer__skills">
                    {profilePerson.skills.map((s) => <span key={s} className="oai-sp-drawer__skill-tag">{s}</span>)}
                  </div>
                </div>
              )}
            </div>
            {profilePerson.bio && (
              <div className="oai-sp-drawer__bio">
                <span className="oai-sp-drawer__label">About</span>
                <p className="oai-sp-drawer__bio-text">{profilePerson.bio}</p>
              </div>
            )}
            {profilePerson.trendingNotes && profilePerson.trendingNotes.length > 0 && (
              <div className="oai-sp-drawer__notes">
                <span className="oai-sp-drawer__notes-title">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                  Overview Notes
                </span>
                <ul className="oai-sp-drawer__notes-list">
                  {profilePerson.trendingNotes.map((note, i) => (
                    <li key={i} className="oai-sp-drawer__notes-item">{note}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="oai-sp-drawer__actions">
              <Button variant="primary" size="medium" label="Add to List" onClick={() => { setAddToListOpen(true); setProfilePerson(null); }} />
              <Button variant="outline" size="medium" label="View Lead" onClick={() => {}} />
            </div>
          </aside>
        </div>
      )}

      {/* ── Token Confirm Modal ────────────────────────── */}
      <Modal
        isOpen={revealConfirm}
        onClose={() => setRevealConfirm(false)}
        title="Reveal Email"
        size="sm"
        footer={
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
            <Button variant="primary" size="small" label="Cancel" onClick={() => setRevealConfirm(false)} />
            <Button variant="ghost" size="small" label="Use 1 Token" onClick={() => {
              if (profilePerson) {
                const fakeEmail = profilePerson.emailBlurred?.replace(/••••/, profilePerson.name.split(' ')[0].toLowerCase()) || 'email@company.com';
                setRevealedEmails((prev) => ({ ...prev, [profilePerson.id]: fakeEmail }));
              }
              setRevealConfirm(false);
              showToast('Email revealed — 1 token used');
            }} />
          </div>
        }
      >
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)', lineHeight: 'var(--leading-relaxed)' }}>
          This will use <strong>1 token</strong> to reveal the verified email for <strong>{profilePerson?.name}</strong>.
        </p>
        <p style={{ margin: 'var(--space-2) 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
          Once revealed, you can access this email anytime without additional tokens.
        </p>
      </Modal>

      {/* ── Add Company Modal ────────────────────────── */}
      <Modal
        isOpen={addCompanyOpen}
        onClose={() => { setAddCompanyOpen(false); setCompanyQuery(''); }}
        title="Add a Company"
        size="md"
      >
        <p style={{ margin: '0 0 var(--space-3)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          Type a company name or domain — we'll automatically find decision-makers and brand signals.
        </p>
        <div style={{ position: 'relative', marginBottom: 'var(--space-3)' }}>
          <input
            type="text"
            placeholder="e.g. CeraVe or cerave.com"
            value={companyQuery}
            onChange={(e) => setCompanyQuery(e.target.value)}
            autoFocus
            style={{ width: '100%', padding: 'var(--space-3) var(--space-3) var(--space-3) var(--space-9)', border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-sm)', outline: 'none', boxSizing: 'border-box' }}
          />
          <span style={{ position: 'absolute', left: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', display: 'flex', color: 'var(--color-text-muted)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </span>
        </div>

        {/* Suggestions */}
        <div style={{ maxHeight: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {filteredCompanies.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-4)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-family-sans)' }}>
              No companies match. Try a different name or domain.
            </div>
          ) : (
            filteredCompanies.slice(0, 6).map((c) => (
              <button
                key={c.name}
                onClick={() => handleAddCompany(c)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                  padding: 'var(--space-3)', border: '1px solid var(--color-border-default)',
                  borderRadius: 'var(--radius-md)', background: 'var(--color-bg-card)',
                  cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-family-sans)',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary-400)'; e.currentTarget.style.background = 'var(--color-primary-50)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-default)'; e.currentTarget.style.background = 'var(--color-bg-card)'; }}
              >
                <span className="oai-sp-product-cell__avatar" style={{ background: c.color, width: 32, height: 32, fontSize: 11, flexShrink: 0 }}>{c.initials}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)' }}>{c.name}</span>
                    <Badge label={c.match} variant={c.match === 'Bullseye' ? 'success' : 'info'} size="small" />
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>{c.domain} &middot; {c.size} &middot; {c.location}</div>
                </div>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>{c.peopleCount} contacts</span>
              </button>
            ))
          )}
        </div>
      </Modal>

      {/* ── Toast ────────────────────────────────────────── */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
          <Toast message={toast} variant="success" onClose={() => setToast(null)} />
        </div>
      )}
    </div>
  );
};

SearchPage.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
};
