import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Leaf, ShoppingBag, Landmark, Lock } from 'lucide-react';
import { Store, FoodBag } from '../types';

interface PayScreenProps {
  bag: FoodBag;
  store: Store;
  quantity: number;
  onBack: () => void;
  onConfirmPayment: (paymentMethod: 'GCash' | 'CashOnPickup') => void;
}

export default function PayScreen({ 
  bag, 
  store, 
  quantity, 
  onBack, 
  onConfirmPayment 
}: PayScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState<'GCash' | 'CashOnPickup'>('GCash');

  const totalDiscountedPrice = bag.discountedPrice * quantity;
  const totalOriginalPrice = bag.originalPrice * quantity;
  const totalImpactGrams = bag.impactGrams * quantity;

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col max-w-md mx-auto lg:max-w-none lg:min-h-0 lg:flex-1" id="pay-screen-container">
      {/* Mobile Navigation Header */}
      <div className="bg-white border-b border-brand-outline px-4 py-4 flex items-center justify-between sticky top-0 z-20 lg:hidden" id="pay-header">
        <button
          onClick={onBack}
          className="p-1 hover:bg-slate-50 rounded-lg text-brand-text-muted cursor-pointer transition-colors"
          title="Back to Bag Details"
          id="btn-back-to-details"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-extrabold text-brand-primary" id="pay-logo-text">
          ResQPlate
        </h1>
        <span className="text-xs font-black tracking-wider text-brand-text-muted font-mono" id="pay-checkout-tag">
          CHECKOUT
        </span>
      </div>

      {/* Main Container */}
      <div className="p-4 space-y-6 flex-1 overflow-y-auto lg:p-8" id="pay-scrollable-content">
        
        {/* Desktop header */}
        <div className="hidden lg:flex items-center justify-between mb-2" id="pay-desktop-header">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-lg text-brand-text-muted cursor-pointer transition-colors"
              title="Back to Bag Details"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-extrabold text-brand-text tracking-tight">Checkout</h1>
          </div>
          <span className="text-sm font-black tracking-wider text-brand-text-muted font-mono">
            STEP 2 OF 2
          </span>
        </div>

        {/* Desktop: two-column grid layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-5xl lg:mx-auto lg:mt-4">
          {/* Left Column: Review Order */}
          <div className="space-y-3 lg:space-y-4" id="review-order-section">
            <h2 className="text-xl font-extrabold text-brand-text tracking-tight lg:text-2xl" id="review-order-heading">
              Review Order
            </h2>

            <div className="bg-white p-5 rounded-2xl border border-brand-outline shadow-level-2 space-y-4" id="review-card-main">
              <div className="flex items-start gap-4" id="review-card-body">
                <div className="w-12 h-12 bg-[#e2e8f8]/60 text-[#3d4756] rounded-xl flex items-center justify-center shrink-0 border border-brand-outline" id="box-icon-container">
                  <ShoppingBag className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div className="flex-1 min-w-0" id="review-card-meta">
                  <h3 className="text-lg font-bold text-brand-text truncate leading-tight lg:text-xl" id="review-item-title">
                    {bag.name}
                  </h3>
                  <p className="text-xs text-brand-text-muted mt-1 font-medium lg:text-sm" id="review-item-store">
                    {store.name} • {quantity} item{quantity !== 1 && 's'}
                  </p>
                </div>
                <div className="text-right shrink-0" id="review-card-pricing">
                  <p className="text-lg font-extrabold text-brand-primary font-mono lg:text-xl" id="review-price">
                    ₱{totalDiscountedPrice}
                  </p>
                  <p className="text-xs text-slate-400 line-through font-mono mt-0.5" id="review-original-price">
                    ₱{totalOriginalPrice}
                  </p>
                </div>
              </div>

              <div className="bg-[#eafaf1] border border-[#a7f3d0]/30 px-4 py-3 rounded-xl flex items-center gap-3" id="review-impact-subcard">
                <Leaf className="w-5 h-5 text-[#059669] shrink-0" />
                <p className="text-xs text-slate-700 leading-normal lg:text-sm" id="review-impact-text">
                  <span className="text-[#059669] font-bold">Your Impact:</span> This purchase saves <strong className="font-extrabold text-brand-primary font-mono">{totalImpactGrams}g</strong> of food waste!
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Method */}
          <div className="space-y-3.5 mt-6 lg:mt-0 lg:space-y-4" id="payment-method-section">
            <h2 className="text-xl font-extrabold text-brand-text tracking-tight lg:text-2xl" id="payment-method-heading">
              Payment Method
            </h2>

            <div className="bg-white p-5 rounded-2xl border border-brand-outline shadow-level-2 space-y-4" id="payment-card-main">
              <div 
                onClick={() => setPaymentMethod('GCash')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  paymentMethod === 'GCash' 
                    ? 'border-brand-primary bg-[#f0faf5]' 
                    : 'border-slate-100 hover:border-slate-200 bg-white'
                }`}
                id="payment-option-gcash"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1e61f2] rounded-lg flex items-center justify-center shrink-0 shadow-sm font-black text-white text-base font-sans tracking-wide" id="gcash-g-icon">
                    G
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-text">GCash</h4>
                    <p className="text-[11px] text-brand-text-muted mt-0.5 font-medium">Fast & Secure</p>
                  </div>
                </div>
                <div className="w-5.5 h-5.5 rounded-full border-2 border-brand-primary flex items-center justify-center">
                  {paymentMethod === 'GCash' && (
                    <div className="w-3 h-3 rounded-full bg-brand-primary" id="radio-checked-gcash" />
                  )}
                </div>
              </div>

              <div 
                onClick={() => setPaymentMethod('CashOnPickup')}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  paymentMethod === 'CashOnPickup' 
                    ? 'border-brand-primary bg-[#f0faf5]' 
                    : 'border-slate-100 hover:border-slate-200 bg-white'
                }`}
                id="payment-option-pickup"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#e2e8f8] text-[#475569] rounded-lg flex items-center justify-center shrink-0 border border-slate-200" id="pickup-cash-icon">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-brand-text">Cash on Pickup</h4>
                    <p className="text-[11px] text-brand-text-muted mt-0.5 font-medium">Pay at the store counter</p>
                  </div>
                </div>
                <div className="w-5.5 h-5.5 rounded-full border-2 border-slate-300 flex items-center justify-center">
                  {paymentMethod === 'CashOnPickup' && (
                    <div className="w-3 h-3 rounded-full bg-brand-primary" id="radio-checked-pickup" />
                  )}
                </div>
              </div>

              <hr className="border-slate-100 my-1" />

              <div className="flex items-center justify-between pt-1" id="pricing-summary-row">
                <span className="text-sm text-brand-text-muted font-semibold">Total Amount</span>
                <span className="text-2xl font-black text-brand-primary font-mono" id="checkout-total-price">
                  ₱{totalDiscountedPrice}
                </span>
              </div>

              <button
                onClick={() => onConfirmPayment(paymentMethod)}
                className="w-full py-4 bg-brand-primary hover:bg-brand-primary-dark text-white font-extrabold rounded-xl shadow-md cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2"
                id="btn-confirm-and-pay"
              >
                <Lock className="w-4 h-4 fill-white" />
                <span>Pay & Confirm Reservation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Closing Notice Caption */}
        <div className="text-center px-4 pt-2 lg:pt-6 lg:pb-4" id="pay-footer-disclaimer-card">
          <p className="text-xs text-brand-text-muted leading-relaxed font-medium lg:text-sm">
            Reservations are held for 30 minutes after store closing time. Please present your digital receipt upon pickup.
          </p>
        </div>

      </div>
    </div>
  );
}
