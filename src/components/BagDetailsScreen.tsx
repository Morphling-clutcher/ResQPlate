import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, MapPin, Star, Leaf, Clock, Plus, Minus, Info, ClipboardList, CheckCircle } from 'lucide-react';
import { Store, FoodBag } from '../types';

interface BagDetailsScreenProps {
  bag: FoodBag;
  store: Store;
  onBack: () => void;
  onReserve: (quantity: number) => void;
}

export default function BagDetailsScreen({ 
  bag, 
  store, 
  onBack, 
  onReserve 
}: BagDetailsScreenProps) {
  const [quantity, setQuantity] = useState(1);

  const discountPct = Math.round(((bag.originalPrice - bag.discountedPrice) / bag.originalPrice) * 100);
  const totalDiscountedPrice = bag.discountedPrice * quantity;
  const totalOriginalPrice = bag.originalPrice * quantity;
  const totalImpactGrams = bag.impactGrams * quantity;
  const totalCo2Saved = (bag.co2SavedKg * quantity).toFixed(1);

  const incrementQty = () => {
    if (quantity < bag.quantityAvailable) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col max-w-md mx-auto pb-24 relative" id="bag-details-screen-container">
      {/* Absolute Hero Banner Image */}
      <div className="relative h-64 w-full bg-slate-100" id="hero-image-wrapper">
        <img
          src={store.image}
          alt={bag.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          id="hero-img"
        />
        {/* Soft Dark Overlay on top to make icons clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-transparent pointer-events-none" />

        {/* Floating Back Action */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-brand-text shadow-level-1 cursor-pointer hover:bg-white active:scale-95 transition-all z-10"
          title="Back to Discovery"
          id="btn-back-to-discovery"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Floating Category Badge */}
        <span 
          className="absolute bottom-4 left-4 bg-brand-primary text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md tracking-wider"
          id="details-category-badge"
        >
          {store.category} Category
        </span>
      </div>

      {/* Bag & Store Details Content */}
      <div className="px-4 py-5 space-y-5 bg-brand-bg flex-1" id="bag-details-content-container">
        
        {/* Main Title Block */}
        <div className="bg-brand-card p-5 rounded-2xl border border-brand-outline shadow-level-1" id="title-block">
          <div className="flex items-center justify-between mb-1" id="details-store-row">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider" id="details-store-name">
              {store.name}
            </span>
            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold" id="details-store-rating">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span>{store.rating}</span>
              <span className="text-slate-400 font-normal">({store.reviewsCount} reviews)</span>
            </div>
          </div>

          <h1 className="text-2xl font-black text-brand-text leading-tight mt-1" id="details-bag-title">
            {bag.name}
          </h1>

          {/* Location details */}
          <div className="flex items-start gap-1.5 mt-3 text-brand-text-muted text-xs" id="details-store-address-row">
            <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
            <span className="leading-relaxed">{store.address} • <strong>{store.distance}</strong></span>
          </div>

          {/* Dynamic Badges / Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4" id="details-tags-row">
            <span className="bg-brand-primary-light text-brand-primary text-xs font-extrabold px-3 py-1 rounded-lg">
              {discountPct}% SAVINGS
            </span>
            {bag.tags.map((tag, i) => (
              <span key={i} className="bg-slate-50 text-slate-600 text-xs px-2.5 py-1 rounded-lg border border-brand-outline font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quantities & Pricing Selector Card */}
        <div className="bg-brand-card p-5 rounded-2xl border border-brand-outline shadow-level-1 flex items-center justify-between" id="quantity-price-card">
          <div>
            <p className="text-xs font-bold text-brand-text-muted uppercase tracking-wider">Reserve Quantity</p>
            <p className="text-xs text-brand-primary font-semibold mt-1">
              {bag.quantityAvailable} available of this rescue bag
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 px-3.5 py-2 rounded-xl border border-brand-outline" id="qty-selector-group">
            <button
              onClick={decrementQty}
              disabled={quantity <= 1}
              className={`p-1 rounded-md transition-all ${quantity <= 1 ? 'text-slate-300 cursor-not-allowed' : 'text-brand-text hover:bg-slate-200 cursor-pointer'}`}
              id="btn-qty-minus"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-base text-brand-text w-5 text-center" id="qty-value-display">
              {quantity}
            </span>
            <button
              onClick={incrementQty}
              disabled={quantity >= bag.quantityAvailable}
              className={`p-1 rounded-md transition-all ${quantity >= bag.quantityAvailable ? 'text-slate-300 cursor-not-allowed' : 'text-brand-text hover:bg-slate-200 cursor-pointer'}`}
              id="btn-qty-plus"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* What You Are Saving Section */}
        <div className="bg-brand-card p-5 rounded-2xl border border-brand-outline shadow-level-1 space-y-3" id="contents-details-card">
          <div className="flex items-center gap-1.5 border-b border-brand-outline pb-2">
            <ClipboardList className="w-5 h-5 text-brand-primary" />
            <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider">What's in the box?</h3>
          </div>
          
          <p className="text-xs text-brand-text-muted leading-relaxed">
            {bag.description} Since it is a surplus rescue bag, specific contents may vary slightly depending on actual daily bakery leftover batches, but typically includes:
          </p>

          <div className="grid grid-cols-1 gap-2 pt-2" id="contents-list">
            {bag.typicalItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-slate-50/55 px-3 py-2 rounded-xl text-xs text-brand-text font-medium" id={`content-item-${i}`}>
                <CheckCircle className="w-4 h-4 text-brand-primary shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ecological Impact Statement Card */}
        <div className="bg-brand-primary-light/50 border border-emerald-100 p-5 rounded-2xl shadow-level-1 flex items-start gap-4" id="ecological-impact-card">
          <div className="bg-brand-primary text-white p-3 rounded-xl shadow-md shrink-0">
            <Leaf className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-brand-primary">Your Environmental Impact</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              This delicious purchase rescues <strong className="text-brand-primary text-sm font-bold font-mono">{totalImpactGrams}g</strong> of high quality food waste from the landfill, saving roughly <strong className="text-brand-primary text-sm font-bold font-mono">{totalCo2Saved}kg</strong> of CO2 equivalent emissions. That is equivalent to charging your phone for 150 times!
            </p>
          </div>
        </div>

        {/* Pickup Location & Counter Directions */}
        <div className="bg-brand-card p-5 rounded-2xl border border-brand-outline shadow-level-1 space-y-3.5" id="pickup-info-card">
          <div className="flex items-center gap-1.5 border-b border-brand-outline pb-2">
            <Clock className="w-5 h-5 text-brand-primary" />
            <h3 className="text-sm font-bold text-brand-text uppercase tracking-wider">Pickup details</h3>
          </div>

          <div className="flex justify-between items-center bg-slate-50 px-3.5 py-3 rounded-xl border border-brand-outline" id="pickup-window-box">
            <span className="text-xs font-semibold text-slate-500">Scheduled window</span>
            <span className="text-xs font-extrabold text-brand-text flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-primary" />
              {store.pickupWindow}
            </span>
          </div>

          <div className="flex items-start gap-2 text-xs text-brand-text-muted leading-relaxed" id="pickup-directions-instructions">
            <Info className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
            <p>
              To collect, simply head to the counter, show your digital receipt to the staff, and they will pack your box of delicious goodies. Please respect the pickup hours.
            </p>
          </div>
        </div>

      </div>

      {/* Sticky Bottom Action Reservation Drawer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-brand-card border-t border-brand-outline p-4 shadow-level-3 z-30 flex items-center justify-between" id="sticky-bottom-drawer">
        <div id="sticky-pricing-col">
          <span className="text-[10px] uppercase font-bold text-brand-text-muted tracking-wider">Total ResQ Price</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-brand-primary font-mono" id="sticky-price">
              ₱{totalDiscountedPrice}
            </span>
            <span className="text-xs text-slate-400 line-through font-mono" id="sticky-original-price">
              ₱{totalOriginalPrice}
            </span>
          </div>
        </div>

        <button
          onClick={() => onReserve(quantity)}
          className="py-3.5 px-6 bg-brand-primary hover:bg-brand-primary-dark text-white font-extrabold rounded-xl shadow-md cursor-pointer transition-all active:scale-98 text-sm flex items-center gap-2"
          id="btn-reserve-bag"
        >
          <span>Reserve & Checkout</span>
          <ChevronLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  );
}
