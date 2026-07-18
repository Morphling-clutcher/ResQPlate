import { useState } from 'react';
import { STORES, FOOD_BAGS } from './data';
import { ScreenType } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import DiscoveryScreen from './components/DiscoveryScreen';
import BagDetailsScreen from './components/BagDetailsScreen';
import PayScreen from './components/PayScreen';
import SuccessScreen from './components/SuccessScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  const [selectedBagId, setSelectedBagId] = useState<string | null>(null);
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'GCash' | 'CashOnPickup'>('GCash');

  // User & community metrics state for full fidelity prototype
  const [userSavedKg, setUserSavedKg] = useState<number>(12.0); // Starts at 12.0kg as shown in screenshots
  const [communitySavedKg, setCommunitySavedKg] = useState<number>(1240.0);

  // Find the currently active food bag and its store
  const activeBag = FOOD_BAGS.find(b => b.id === selectedBagId) || FOOD_BAGS[0];
  const activeStore = STORES.find(s => s.id === activeBag.storeId) || STORES[0];

  // Screen Routing Logic
  const handleStartDiscovery = () => {
    setCurrentScreen('discovery');
  };

  const handleSelectBag = (bagId: string) => {
    setSelectedBagId(bagId);
    setCurrentScreen('details');
  };

  const handleReserveBag = (quantity: number) => {
    setSelectedQty(quantity);
    setCurrentScreen('pay');
  };

  const handleConfirmPayment = (chosenMethod: 'GCash' | 'CashOnPickup') => {
    setPaymentMethod(chosenMethod);
    
    // Calculate total impact grams for this specific rescue bag reservation
    const impactGrams = activeBag.impactGrams * selectedQty;
    const impactKg = impactGrams / 1000;

    // Simulate database updates
    setUserSavedKg(prev => prev + impactKg);
    setCommunitySavedKg(prev => prev + impactKg);

    setCurrentScreen('success');
  };

  const handleResetToDiscovery = () => {
    setSelectedBagId(null);
    setSelectedQty(1);
    setCurrentScreen('discovery');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 flex items-center justify-center font-sans antialiased selection:bg-brand-primary selection:text-white" id="main-app-container">
      {/* Simulation Frame to mimic an elegant Mobile App interface in browser */}
      <div className="w-full max-w-md min-h-screen bg-brand-bg relative shadow-2xl flex flex-col overflow-x-hidden md:min-h-[850px] md:my-6 md:rounded-[36px] md:border-[12px] md:border-slate-950 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]" id="phone-simulator">
        
        {/* Dynamic Status Bar for the mobile simulator */}
        <div className="hidden md:flex bg-white px-8 pt-3 pb-1 justify-between items-center text-[11px] text-slate-800 font-bold border-b border-slate-50 rounded-t-[24px]" id="simulator-status-bar">
          <span id="statusBar-time">04:32 PM</span>
          <div className="w-24 h-5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2" id="notch" />
          <div className="flex items-center gap-1.5" id="statusBar-icons">
            <span>5G</span>
            <span>📶</span>
            <span>🔋 85%</span>
          </div>
        </div>

        {/* Screen Routing Panel */}
        <div className="flex-1 flex flex-col relative" id="screen-routing-panel">
          {currentScreen === 'welcome' && (
            <WelcomeScreen 
              onStart={handleStartDiscovery} 
              communityWeightKg={communitySavedKg}
            />
          )}

          {currentScreen === 'discovery' && (
            <DiscoveryScreen
              stores={STORES}
              bags={FOOD_BAGS}
              userSavedKg={userSavedKg}
              onSelectBag={handleSelectBag}
              onBackToWelcome={handleBackToWelcome}
            />
          )}

          {currentScreen === 'details' && (
            <BagDetailsScreen
              bag={activeBag}
              store={activeStore}
              onBack={() => setCurrentScreen('discovery')}
              onReserve={handleReserveBag}
            />
          )}

          {currentScreen === 'pay' && (
            <PayScreen
              bag={activeBag}
              store={activeStore}
              quantity={selectedQty}
              onBack={() => setCurrentScreen('details')}
              onConfirmPayment={handleConfirmPayment}
            />
          )}

          {currentScreen === 'success' && (
            <SuccessScreen
              bag={activeBag}
              store={activeStore}
              quantity={selectedQty}
              paymentMethod={paymentMethod}
              userPreviousSavedKg={userSavedKg - (activeBag.impactGrams * selectedQty / 1000)}
              onBackToDiscovery={handleResetToDiscovery}
            />
          )}
        </div>

        {/* Simulator Bottom Navigation Pill (Home indicator) */}
        <div className="hidden md:flex bg-brand-bg py-2.5 items-center justify-center rounded-b-[24px]" id="simulator-home-bar-container">
          <div className="w-28 h-1 bg-slate-900 rounded-full" id="home-indicator-pill" />
        </div>

      </div>
    </div>
  );
}
