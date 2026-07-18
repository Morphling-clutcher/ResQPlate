import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Share2, Globe, Sparkles, Copy, Twitter, MessageSquare } from 'lucide-react';
import { Store, FoodBag } from '../types';

interface SuccessScreenProps {
  bag: FoodBag;
  store: Store;
  quantity: number;
  paymentMethod: 'GCash' | 'CashOnPickup';
  userPreviousSavedKg: number;
  onBackToDiscovery: () => void;
}

export default function SuccessScreen({
  bag,
  store,
  quantity,
  paymentMethod,
  userPreviousSavedKg,
  onBackToDiscovery
}: SuccessScreenProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic values
  const totalDiscountedPrice = bag.discountedPrice * quantity;
  const currentSavedGrams = bag.impactGrams * quantity;
  const newLifetimeKg = userPreviousSavedKg + (currentSavedGrams / 1000);

  // Generate random order ID
  const orderId = `#${Math.floor(1000 + Math.random() * 9000)}-B`;

  // Get current date/time formatted
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const handleCopyLink = () => {
    setCopiedLink(true);
    navigator.clipboard.writeText(`I just rescued ${currentSavedGrams}g of delicious surplus food using ResQPlate! Join me in stopping food waste.`);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col max-w-md mx-auto lg:max-w-none lg:min-h-0 lg:flex-1 relative pb-6 lg:pb-0" id="success-screen-container">
      
      {/* Mobile Header bar */}
      <div className="px-4 py-4 flex items-center justify-between bg-transparent border-b border-slate-100 lg:hidden" id="success-header">
        <h2 className="text-xl font-extrabold text-brand-primary" id="success-logo">
          ResQPlate
        </h2>
        <button
          onClick={onBackToDiscovery}
          className="p-1.5 hover:bg-slate-100 rounded-full text-brand-text-muted transition-colors cursor-pointer"
          title="Back to Discovery"
          id="btn-close-success"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Scrollable Body */}
      <div className="p-4 space-y-5 flex-1 overflow-y-auto lg:p-8 lg:space-y-6" id="success-scroll-content">
        
        {/* Desktop success header */}
        <div className="hidden lg:flex items-center justify-between mb-6" id="success-desktop-header">
          <h1 className="text-3xl font-extrabold text-brand-text tracking-tight">Reservation Confirmed</h1>
          <button
            onClick={onBackToDiscovery}
            className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold rounded-xl transition-colors cursor-pointer text-sm"
            id="btn-back-to-discovery-desktop"
          >
            Back to Discovery
          </button>
        </div>

        {/* Celebration block */}
        <div className="flex flex-col items-center text-center py-4 lg:py-8" id="success-celebration-block">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-emerald-50 flex items-center justify-center relative border-4 border-emerald-100 shadow-md mb-4"
            id="checkmark-outer-ring"
          >
            <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white" id="checkmark-inner-ring">
              <Check className="w-7 h-7 lg:w-8 lg:h-8 stroke-[3]" />
            </div>
            <div className="absolute -top-1 -right-1 bg-brand-primary text-white p-1 rounded-full text-[9px] lg:text-xs">
              🌱
            </div>
          </motion.div>

          <h3 className="text-3xl lg:text-4xl font-extrabold text-brand-text tracking-tight" id="success-heading">
            Enjoy your meal!
          </h3>
          <p className="text-sm lg:text-base text-brand-text-muted mt-2 px-6 max-w-md" id="success-subheading">
            Your pickup at <strong className="text-brand-text font-bold">{store.name}</strong> is complete.
          </p>
        </div>

        {/* Desktop: side-by-side cards */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:max-w-4xl lg:mx-auto">
          {/* Card 1: Order Details */}
          <div className="bg-white p-5 lg:p-6 rounded-2xl border border-brand-outline shadow-level-2" id="success-order-details-card">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs lg:text-sm" id="success-order-header-row">
              <div>
                <span className="text-[10px] lg:text-xs uppercase font-bold text-slate-400 tracking-wider">ORDER ID</span>
                <p className="font-mono font-bold text-brand-text mt-0.5" id="success-order-id">{orderId}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] lg:text-xs uppercase font-bold text-slate-400 tracking-wider">DATE & TIME</span>
                <p className="font-semibold text-brand-text mt-0.5" id="success-order-timestamp">{formattedDate}, {formattedTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 pt-4" id="success-order-item-row">
              <img
                src={bag.image}
                alt={bag.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl object-cover border border-slate-100 bg-slate-50 shrink-0"
                id="success-order-item-image"
              />
              <div className="flex-1 min-w-0" id="success-order-item-meta">
                <h4 className="text-sm lg:text-base font-extrabold text-brand-text truncate">{bag.name}</h4>
                <p className="text-[11px] lg:text-xs text-brand-text-muted mt-0.5 font-medium">Quantity: {quantity} • Paid via {paymentMethod === 'GCash' ? 'GCash' : 'Cash on Pickup'}</p>
              </div>
              <div className="text-right shrink-0" id="success-order-item-price">
                <span className="text-sm lg:text-base font-black text-brand-primary font-mono">₱{totalDiscountedPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Impact Unlocked Card */}
          <div className="bg-emerald-600 text-white p-5 lg:p-6 rounded-2xl shadow-level-2 relative overflow-hidden" id="success-impact-unlocked-card">
            <div className="absolute top-[-30px] right-[-30px] w-28 h-28 rounded-full bg-emerald-500/30 border-8 border-emerald-500/10 pointer-events-none" />
            <div className="absolute bottom-[-10px] left-[-10px] w-12 h-12 bg-emerald-700/20 rounded-full" />

            <div className="flex items-center gap-1.5 text-[10px] lg:text-xs font-black uppercase tracking-wider text-emerald-100" id="impact-unlocked-label-row">
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Impact Unlocked</span>
            </div>

            <div className="mt-2.5 pb-3 border-b border-emerald-500/40" id="impact-unlocked-weight-row">
              <h4 className="text-4xl lg:text-5xl font-extrabold tracking-tight font-sans" id="success-today-impact">
                {currentSavedGrams}g
              </h4>
              <p className="text-[11px] lg:text-sm text-emerald-100 mt-0.5 font-medium">saved from waste today</p>
            </div>

            <div className="flex items-center justify-between pt-3" id="lifetime-impact-row">
              <div>
                <h5 className="text-lg lg:text-xl font-bold font-sans" id="success-lifetime-impact">
                  {newLifetimeKg.toFixed(1)}kg
                </h5>
                <p className="text-[10px] lg:text-xs text-emerald-200 uppercase tracking-wider font-semibold">Lifetime Impact</p>
              </div>

              <div className="flex gap-1.5" id="impact-globe-badge">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-emerald-500/50 flex items-center justify-center border border-emerald-400/30">
                  <Globe className="w-4 h-4 text-emerald-100" />
                </div>
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-emerald-500/50 flex items-center justify-center border border-emerald-400/30">
                  <span className="text-sm">🌱</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Inspire Community */}
        <div className="text-center space-y-2.5 py-2 lg:py-6" id="inspire-community-section">
          <p className="text-xs lg:text-sm text-brand-text-muted font-bold uppercase tracking-wider">
            Inspire your community
          </p>

          <button
            onClick={() => setShowShareModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-brand-text text-xs lg:text-sm font-bold rounded-full transition-all cursor-pointer active:scale-95"
            id="btn-share-impact"
          >
            <Share2 className="w-4 h-4 text-brand-primary" />
            <span>Share your impact</span>
          </button>
        </div>

      </div>

      {/* Mobile Bottom Discovery Return Action */}
      <div className="p-4 lg:hidden" id="success-bottom-bar">
        <button
          onClick={onBackToDiscovery}
          className="w-full py-4 bg-brand-primary hover:bg-brand-primary-dark text-white font-extrabold rounded-xl shadow-md transition-all cursor-pointer active:scale-98 text-sm text-center"
          id="btn-back-to-discovery-footer"
        >
          Back to Discovery
        </button>
      </div>

      {/* Share Dialog Sheet */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-end lg:items-center justify-center p-4" id="share-modal-overlay">
            <motion.div 
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="bg-brand-card w-full max-w-sm lg:max-w-md rounded-t-3xl lg:rounded-3xl p-5 space-y-4 shadow-level-3 relative"
              id="share-modal"
            >
              <div className="flex items-center justify-between" id="share-modal-header">
                <h4 className="text-base lg:text-lg font-extrabold text-brand-text">Spread the Word!</h4>
                <button 
                  onClick={() => setShowShareModal(false)}
                  className="p-1 hover:bg-slate-100 rounded-full text-slate-400 cursor-pointer"
                  id="btn-close-share-modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs lg:text-sm text-brand-text-muted leading-relaxed">
                By sharing your food rescue achievement, you encourage others to join the zero-waste community and help local merchants!
              </p>

              <div className="grid grid-cols-3 gap-2 py-2" id="share-channels-grid">
                <button 
                  onClick={handleCopyLink}
                  className="flex flex-col items-center p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                  id="share-channel-copy"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-brand-primary flex items-center justify-center mb-1">
                    <Copy className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] lg:text-xs font-bold text-slate-600">
                    {copiedLink ? 'Copied!' : 'Copy Link'}
                  </span>
                </button>

                <button 
                  onClick={() => {
                    window.open(`https://twitter.com/intent/tweet?text=I just rescued ${currentSavedGrams}g of high-quality food from landfill using ResQPlate! Let's stop food waste!`, '_blank');
                    setShowShareModal(false);
                  }}
                  className="flex flex-col items-center p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                  id="share-channel-twitter"
                >
                  <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center mb-1">
                    <Twitter className="w-5 h-5 fill-sky-500" />
                  </div>
                  <span className="text-[11px] lg:text-xs font-bold text-slate-600">Twitter/X</span>
                </button>

                <button 
                  onClick={() => {
                    alert("Mock Direct Share: Link copied to clipboard!");
                    setShowShareModal(false);
                  }}
                  className="flex flex-col items-center p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                  id="share-channel-messenger"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-1">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] lg:text-xs font-bold text-slate-600">Chat</span>
                </button>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100" id="share-badge-quote">
                <p className="text-[11px] lg:text-xs text-slate-500 leading-normal font-medium">
                  "I just rescued {currentSavedGrams}g of surplus pastries and meals with ResQPlate 🥪. Join the food rescue revolution!"
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
