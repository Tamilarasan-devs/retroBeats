import React, { useState, useEffect } from 'react';
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import AppRoutes from './component/routes/AppRoutes';
import WhatsAppButton from './component/shared/WhatsAppButton';
import SplashScreen from './component/shared/SplashScreen';
import { AnimatePresence } from 'framer-motion';
import SilverScreenOpening from './component/pages/SilverScreenOpening';
import RetroBeat from './component/shared/RetroBeats';

function App() {
  const [loadingStep, setLoadingStep] = useState('silver'); // 'silver', 'splash', 'app'

  return (
    <div className="relative overflow-hidden min-h-screen bg-[#0a0a0a] selection:bg-red-900/50 selection:text-white">
      {/* <AnimatePresence mode="wait">
        {loadingStep === 'silver' && (
          <SilverScreenOpening key="silver" onNext={() => setLoadingStep('splash')} />
        )}
        {loadingStep === 'splash' && (
          <SplashScreen key="splash" finishLoading={() => setLoadingStep('app')} />
        )}
      </AnimatePresence> */}

      <div>
       
      

        <Header />
        <AppRoutes />

        <Footer />
        <WhatsAppButton /> 

        
     </div>
      {/* <RetroBeat/> */}
    </div>
  );
}

export default App;

