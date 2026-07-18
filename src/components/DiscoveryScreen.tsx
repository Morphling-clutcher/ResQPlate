import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Star, Flame, Compass, Map, Grid, Info, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Store, FoodBag } from '../types';

interface DiscoveryScreenProps {
  stores: Store[];
  bags: FoodBag[];
  userSavedKg: number;
  onSelectBag: (bagId: string) => void;
  onBackToWelcome: () => void;
}

export default function DiscoveryScreen({ 
  stores, 
  bags, 
  userSavedKg, 
  onSelectBag,
  onBackToWelcome 
}: DiscoveryScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  // Categories list based on mock data
  const categories = ['All', 'Bakery', 'Cafe', 'Sushi', 'Meals', 'Groceries'];

  // Map stores by ID for easy access
  const storeMap = stores.reduce((acc, store) => {
    acc[store.id] = store;
    return acc;
  }, {} as Record<string, Store>);

  // Filter bags based on search query and category
  const filteredBags = bags.filter((bag) => {
    const store = storeMap[bag.storeId];
    if (!store) return false;

    const matchesCategory = selectedCategory === 'All' || store.category === selectedCategory;
    const matchesSearch = 
      bag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bag.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Simulated Coordinates for the Map View of stores
  const storeCoordinates: Record<string, { x: number; y: number }> = {
    'green-leaf-bakery': { x: 30, y: 35 },
    'campus-bakery': { x: 45, y: 55 },
    'sushi-express': { x: 75, y: 40 },
    'garden-greens': { x: 20, y: 70 },
    'metro-grocers': { x: 80, y: 75 },
    'daily-brew': { x: 60, y: 25 }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col max-w-md mx-auto" id="discovery-screen-container">
      {/* Sticky Header */}
      <div className="bg-brand-card shadow-level-1 sticky top-0 z-20 border-b border-brand-outline px-4 py-3" id="discovery-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button 
              onClick={onBackToWelcome}
              className="p-1 hover:bg-slate-50 rounded-lg text-brand-text-muted cursor-pointer transition-colors"
              title="Back to Welcome Screen"
              id="back-to-welcome-btn"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-brand-text tracking-tight" id="discovery-logo-title">
              ResQ<span className="text-brand-primary">Plate</span>
            </h2>
          </div>

          {/* User Impact Tracker pill */}
          <div className="flex items-center gap-1.5 bg-emerald-50 text-brand-primary px-3 py-1 rounded-full border border-emerald-100" id="user-impact-badge">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold font-mono">{userSavedKg.toFixed(1)}kg Saved</span>
          </div>
        </div>

        {/* Search bar & filter toggle */}
        <div className="mt-3 flex items-center gap-2" id="search-filter-wrapper">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-brand-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pastries, sushi, lunches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 text-brand-text text-sm rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary transition-all placeholder:text-slate-400"
              id="search-input"
            />
          </div>

          {/* View Mode Toggle: Map vs List */}
          <div className="flex bg-slate-100 p-1 rounded-xl" id="view-mode-toggle">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-level-1 text-brand-primary' : 'text-brand-text-muted'}`}
              title="List View"
              id="btn-list-view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'map' ? 'bg-white shadow-level-1 text-brand-primary' : 'text-brand-text-muted'}`}
              title="Map View"
              id="btn-map-view"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Category Carousel */}
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1" id="category-carousel">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-brand-primary text-white shadow-sm shadow-brand-primary/25'
                  : 'bg-slate-50 text-brand-text-muted border border-brand-outline hover:bg-slate-100'
              }`}
              id={`cat-pill-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4" id="discovery-content">
        {viewMode === 'list' ? (
          /* List View */
          <div className="space-y-4" id="bags-list-container">
            <div className="flex items-center justify-between" id="list-header-info">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">
                {filteredBags.length} Surplus bag{filteredBags.length !== 1 && 's'} nearby
              </span>
              <span className="text-xs font-semibold text-brand-primary flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" /> Sort: Nearest First
              </span>
            </div>

            {filteredBags.length > 0 ? (
              filteredBags.map((bag) => {
                const store = storeMap[bag.storeId];
                const discountPct = Math.round(((bag.originalPrice - bag.discountedPrice) / bag.originalPrice) * 100);
                
                return (
                  <motion.div
                    key={bag.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => onSelectBag(bag.id)}
                    className="bg-brand-card rounded-2xl overflow-hidden shadow-level-2 border border-brand-outline cursor-pointer hover:shadow-level-3 transition-all group flex flex-col"
                    id={`bag-card-${bag.id}`}
                  >
                    {/* Image Area */}
                    <div className="relative h-44 overflow-hidden bg-slate-100">
                      <img
                        src={bag.image}
                        alt={bag.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        id={`bag-img-${bag.id}`}
                      />
                      
                      {/* Top Corner Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        <span className="bg-emerald-500 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-md" id={`badge-discount-${bag.id}`}>
                          {discountPct}% OFF
                        </span>
                        {bag.quantityAvailable <= 2 && (
                          <span className="bg-amber-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                            <Flame className="w-3 h-3" /> Only {bag.quantityAvailable} Left
                          </span>
                        )}
                      </div>

                      {/* Distance Badge */}
                      <div className="absolute bottom-3 right-3 bg-brand-text/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{store?.distance}</span>
                      </div>
                    </div>

                    {/* Meta info area */}
                    <div className="p-4" id={`bag-meta-${bag.id}`}>
                      <div className="flex items-center justify-between mb-1" id="store-title-rating-row">
                        <span className="text-xs font-semibold text-brand-primary" id={`bag-store-name-${bag.id}`}>
                          {store?.name}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold" id={`bag-store-rating-${bag.id}`}>
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{store?.rating}</span>
                          <span className="text-slate-400 font-normal">({store?.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-brand-text leading-snug group-hover:text-brand-primary transition-colors" id={`bag-title-${bag.id}`}>
                        {bag.name}
                      </h3>

                      <p className="text-xs text-brand-text-muted mt-1 line-clamp-1" id={`bag-desc-${bag.id}`}>
                        {bag.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-2.5" id={`bag-tags-${bag.id}`}>
                        {bag.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Divider line */}
                      <hr className="my-3 border-brand-outline" />

                      {/* Pricing and Pickup window */}
                      <div className="flex items-center justify-between" id={`bag-pricing-pickup-${bag.id}`}>
                        <div>
                          <p className="text-xs text-brand-text-muted" id="pickup-label">Pickup window</p>
                          <p className="text-xs font-semibold text-brand-text" id={`pickup-time-${bag.id}`}>
                            {store?.pickupWindow.replace('Today, ', '')}
                          </p>
                        </div>

                        <div className="text-right" id={`bag-price-section-${bag.id}`}>
                          <span className="text-xs text-slate-400 line-through mr-1.5 font-medium" id={`original-price-${bag.id}`}>
                            ₱{bag.originalPrice}
                          </span>
                          <span className="text-xl font-extrabold text-brand-primary" id={`discount-price-${bag.id}`}>
                            ₱{bag.discountedPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="bg-brand-card p-8 rounded-2xl text-center border border-brand-outline mt-8" id="empty-results-fallback">
                <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-brand-text">No surplus bags found</h3>
                <p className="text-xs text-brand-text-muted mt-1 px-4">
                  We couldn't find any bags matching your filters. Try selecting a different category or clearing search terms.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="mt-4 px-4 py-2 bg-emerald-50 text-brand-primary text-xs font-bold rounded-xl border border-emerald-100 cursor-pointer"
                  id="btn-clear-search-fallback"
                >
                  Reset Search Filters
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Interactive Map View */
          <div className="h-[calc(100vh-220px)] flex flex-col" id="map-view-wrapper">
            <div className="bg-brand-card p-3 rounded-xl border border-brand-outline mb-3 flex items-center gap-2" id="map-instructions-card">
              <Info className="w-4 h-4 text-brand-primary flex-shrink-0" />
              <p className="text-xs text-brand-text-muted leading-relaxed">
                Click a merchant marker on the campus map below to view their available surplus food bags!
              </p>
            </div>

            {/* Stylized Vector Map Canvas */}
            <div className="flex-1 bg-slate-100 rounded-2xl border border-slate-200 relative overflow-hidden shadow-inner" id="map-canvas">
              {/* Grid Background representing streets */}
              <div className="absolute inset-0 bg-grid-[#cbd5e1]/10 opacity-30" />
              
              {/* Simulated Roads/Streets */}
              <div className="absolute left-[45%] top-0 bottom-0 w-8 bg-slate-200 -rotate-12" title="Emerald Avenue" />
              <div className="absolute left-0 right-0 top-[40%] h-8 bg-slate-200 rotate-6" title="Student Union Lane" />
              <div className="absolute left-0 right-0 top-[70%] h-10 bg-slate-200 -rotate-3" title="High Street" />
              <div className="absolute left-[20%] top-0 bottom-0 w-6 bg-slate-200 rotate-45" title="Science Park Lane" />
              
              {/* Campus Landmark Zones */}
              <div className="absolute top-[8%] left-[5%] bg-slate-200/60 border border-slate-300/40 rounded-xl px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                🔬 Science Hub
              </div>
              <div className="absolute top-[48%] left-[55%] bg-slate-200/60 border border-slate-300/40 rounded-xl px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                🎓 Main Quad
              </div>
              <div className="absolute bottom-[10%] right-[8%] bg-slate-200/60 border border-slate-300/40 rounded-xl px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                🛍️ Retail Plaza
              </div>

              {/* Store Markers */}
              {stores.map((store) => {
                const coords = storeCoordinates[store.id] || { x: 50, y: 50 };
                const isHovered = hoveredMarker === store.id;
                const associatedBag = bags.find(b => b.storeId === store.id);
                
                return (
                  <div
                    key={store.id}
                    style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                    id={`map-marker-container-${store.id}`}
                  >
                    {/* Clickable Marker */}
                    <div
                      onMouseEnter={() => setHoveredMarker(store.id)}
                      onMouseLeave={() => setHoveredMarker(null)}
                      onClick={() => {
                        if (associatedBag) {
                          onSelectBag(associatedBag.id);
                        }
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer shadow-md transition-all ${
                        isHovered 
                          ? 'bg-brand-primary text-white scale-110 ring-4 ring-emerald-100' 
                          : 'bg-white text-brand-primary ring-2 ring-brand-primary'
                      }`}
                      title={store.name}
                      id={`map-marker-${store.id}`}
                    >
                      <span className="text-xs font-black font-mono">{store.logo}</span>
                    </div>

                    {/* Popover Card */}
                    <div 
                      className={`absolute bottom-11 left-1/2 -translate-x-1/2 bg-brand-card p-3 rounded-xl shadow-level-3 border border-brand-outline w-44 transition-all pointer-events-none ${
                        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                      id={`marker-popover-${store.id}`}
                    >
                      <h4 className="text-xs font-bold text-brand-text truncate">{store.name}</h4>
                      <div className="flex items-center gap-1 text-[10px] text-brand-text-muted mt-0.5">
                        <MapPin className="w-3 h-3 text-brand-primary" />
                        <span>{store.distance}</span>
                        <span>•</span>
                        <div className="flex items-center text-amber-500 font-bold">
                          <Star className="w-2.5 h-2.5 fill-amber-500 mr-0.5" />
                          <span>{store.rating}</span>
                        </div>
                      </div>
                      
                      {associatedBag ? (
                        <div className="mt-1.5 pt-1.5 border-t border-slate-100">
                          <p className="text-[10px] font-semibold text-brand-primary truncate">{associatedBag.name}</p>
                          <p className="text-xs font-bold text-brand-primary mt-0.5">₱{associatedBag.discountedPrice}</p>
                        </div>
                      ) : (
                        <p className="text-[10px] text-slate-400 mt-1">Sold out today</p>
                      )}
                      
                      {/* Triangle Pointer */}
                      <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-card rotate-45 border-r border-b border-brand-outline" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
