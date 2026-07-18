import { motion } from 'motion/react';
import { Leaf, ArrowRight, ShieldCheck, TrendingDown, Users } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  communityWeightKg: number;
}

export default function WelcomeScreen({ onStart, communityWeightKg }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-between p-6 max-w-md mx-auto lg:max-w-none lg:p-0 lg:min-h-0 lg:flex-1 relative overflow-hidden" id="welcome-screen-container">
      {/* Abstract Background Accents */}
      <div className="absolute top-[-100px] left-[-100px] w-64 h-64 rounded-full bg-emerald-100/40 blur-3xl -z-10" />
      <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 rounded-full bg-emerald-100/30 blur-3xl -z-10" />
      <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-100/20 blur-3xl -z-10" />

      {/* Mobile layout (<lg) */}
      <div className="flex flex-col items-center justify-between w-full min-h-screen lg:hidden" id="welcome-mobile-layout">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full text-center pt-8"
          id="welcome-brand-header"
        >
          <div className="inline-flex items-center justify-center gap-2 mb-2 bg-brand-primary-light text-brand-primary px-3.5 py-1.5 rounded-full shadow-sm" id="badge-saving-green">
            <Leaf className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Save Taste • Stop Waste</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-brand-text flex items-center justify-center gap-1.5 mt-2" id="app-logo-welcome">
            ResQ<span className="text-brand-primary">Plate</span>
          </h1>
          <p className="text-brand-text-muted mt-3 text-sm px-4" id="app-tagline-welcome">
            Rescue delicious surplus meals from local favorites at unbeatable prices. High quality, zero waste.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full my-8 space-y-4"
          id="welcome-stats-section"
        >
          <div className="bg-brand-card p-5 rounded-2xl shadow-level-2 border border-brand-outline relative overflow-hidden" id="community-impact-card">
            <div className="absolute top-0 right-0 p-3 bg-emerald-50 text-brand-primary rounded-bl-2xl">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-brand-text-muted uppercase tracking-wider">Community Impact</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-extrabold text-brand-primary tracking-tight" id="welcome-community-weight">
                {communityWeightKg.toLocaleString()} kg
              </span>
              <span className="text-xs text-brand-text-muted font-medium">saved to date</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="bg-brand-primary h-full rounded-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3" id="welcome-features-grid">
            <div className="bg-brand-card p-4 rounded-xl shadow-level-1 border border-brand-outline flex flex-col justify-between">
              <div className="p-2 bg-emerald-50 text-brand-primary rounded-lg w-fit mb-3">
                <TrendingDown className="w-4 h-4" />
              </div>
              <div>
                <p className="text-lg font-bold text-brand-text">65% Off</p>
                <p className="text-xs text-brand-text-muted">Average savings compared to retail price</p>
              </div>
            </div>

            <div className="bg-brand-card p-4 rounded-xl shadow-level-1 border border-brand-outline flex flex-col justify-between">
              <div className="p-2 bg-emerald-50 text-brand-primary rounded-lg w-fit mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-lg font-bold text-brand-text">Fresh & Safe</p>
                <p className="text-xs text-brand-text-muted">Hand-inspected food by verified local merchants</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl text-center" id="welcome-fact-banner">
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              💡 <strong>Did you know?</strong> Around 1/3 of all food produced globally goes to waste. Rescuing just one meal saves 1.2kg of CO2 equivalent emissions!
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full pb-8"
          id="welcome-actions"
        >
          <button
            onClick={onStart}
            className="w-full py-4 px-6 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold rounded-2xl shadow-level-2 transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
            id="btn-get-started"
          >
            <span>Get Started & Find Food</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="text-center text-[11px] text-brand-text-muted mt-3" id="welcome-footer-disclaimer">
            By continuing, you agree to join our food rescue revolution!
          </p>
        </motion.div>
      </div>

      {/* Desktop layout (lg+) */}
      <div className="hidden lg:flex flex-1 w-full max-w-7xl mx-auto px-8 py-8 gap-12 items-center" id="welcome-desktop-layout">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 max-w-xl"
          id="welcome-desktop-hero"
        >
          <div className="inline-flex items-center gap-2 mb-4 bg-brand-primary-light text-brand-primary px-4 py-1.5 rounded-full shadow-sm" id="badge-saving-green-desktop">
            <Leaf className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">Save Taste • Stop Waste</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-text leading-tight mt-4" id="app-logo-welcome-desktop">
            Rescue <span className="text-brand-primary">Surplus Food</span>
            <br />
            <span className="text-brand-text">Before It's Wasted</span>
          </h1>
          <p className="text-brand-text-muted mt-4 text-lg leading-relaxed max-w-lg" id="app-tagline-welcome-desktop">
            Rescue delicious surplus meals from local favorites at unbeatable prices. High quality, zero waste.
          </p>
          <div className="flex items-center gap-4 mt-8" id="welcome-desktop-actions">
            <button
              onClick={onStart}
              className="py-4 px-8 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold rounded-2xl shadow-level-2 transition-all flex items-center gap-2 group cursor-pointer text-base"
              id="btn-get-started-desktop"
            >
              <span>Get Started & Find Food</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-sm text-brand-text-muted font-medium">
              Join our food rescue revolution!
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-lg space-y-5"
          id="welcome-desktop-stats"
        >
          <div className="bg-brand-card p-6 rounded-2xl shadow-level-2 border border-brand-outline relative overflow-hidden" id="community-impact-card-desktop">
            <div className="absolute top-0 right-0 p-3 bg-emerald-50 text-brand-primary rounded-bl-2xl">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-brand-text-muted uppercase tracking-wider">Community Impact</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl font-extrabold text-brand-primary tracking-tight" id="welcome-community-weight-desktop">
                {communityWeightKg.toLocaleString()} kg
              </span>
              <span className="text-sm text-brand-text-muted font-medium">saved to date</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full mt-3 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="bg-brand-primary h-full rounded-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4" id="welcome-features-grid-desktop">
            <div className="bg-brand-card p-5 rounded-xl shadow-level-1 border border-brand-outline flex flex-col justify-between">
              <div className="p-2 bg-emerald-50 text-brand-primary rounded-lg w-fit mb-3">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-brand-text">65% Off</p>
                <p className="text-sm text-brand-text-muted">Average savings compared to retail price</p>
              </div>
            </div>

            <div className="bg-brand-card p-5 rounded-xl shadow-level-1 border border-brand-outline flex flex-col justify-between">
              <div className="p-2 bg-emerald-50 text-brand-primary rounded-lg w-fit mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-brand-text">Fresh & Safe</p>
                <p className="text-sm text-brand-text-muted">Hand-inspected food by verified local merchants</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 px-5 py-4 rounded-xl text-center" id="welcome-fact-banner-desktop">
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              💡 <strong>Did you know?</strong> Around 1/3 of all food produced globally goes to waste. Rescuing just one meal saves 1.2kg of CO2 equivalent emissions!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
