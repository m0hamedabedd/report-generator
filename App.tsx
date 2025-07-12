
import React, { useState } from 'react';
import type { UserDetails } from './types';
import UserDetailsForm from './components/UserDetailsForm';
import ReportView from './components/ReportView';
import HowItWorks from './components/HowItWorks';
import { SparklesIcon } from './components/icons';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const { t, language, toggleLanguage } = useLanguage();

  const handleDetailsSubmit = (details: UserDetails) => {
    setUserDetails(details);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleStartOver = () => {
    setUserDetails(null);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCreating = () => {
    const formSection = document.getElementById('form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <main className="w-full flex-grow flex flex-col items-center">
        {userDetails ? (
          <>
            <header className="w-full max-w-7xl text-center mb-8 sm:mb-12 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">{t('studioTitle')}</h1>
              <p className="mt-3 text-lg text-slate-600">
                {t('studioSubtitle')}
              </p>
            </header>
            <ReportView 
              userDetails={userDetails} 
              setUserDetails={setUserDetails} 
              onStartOver={handleStartOver} 
            />
          </>
        ) : (
          <div className="w-full max-w-5xl flex flex-col items-center">
            {/* Hero Section */}
            <div className="text-center py-16 sm:py-24 animate-fade-in">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
                {t('heroTitle')}
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
                {t('heroSubtitle')}
              </p>
              <div className="mt-10 flex justify-center">
                <button
                  onClick={handleStartCreating}
                  className="inline-flex justify-center items-center py-4 px-8 border border-transparent rounded-full shadow-lg text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform duration-200 hover:scale-105"
                >
                  <SparklesIcon className="w-6 h-6 me-3" />
                  {t('startCreating')}
                </button>
              </div>
            </div>

            {/* "How It Works" Section */}
            <div className="w-full py-12 animate-fade-in">
                <HowItWorks />
            </div>
            
            {/* Form Section */}
            <div id="form-section" className="w-full scroll-mt-20 pt-16 sm:pt-24 animate-fade-in">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">{t('formSectionTitle')}</h2>
                <p className="mt-3 text-lg text-slate-500">{t('formSectionSubtitle')}</p>
              </div>
              <div className="flex justify-center">
                <UserDetailsForm onSubmit={handleDetailsSubmit} />
              </div>
            </div>
          </div>
        )}
      </main>
       <footer className="w-full max-w-5xl text-center py-8 mt-16 border-t border-slate-200">
            <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} {t('footerText')}</p>
            <button onClick={toggleLanguage} className="mt-2 text-sm text-blue-600 hover:underline">
              {t('toggleLanguage')}
            </button>
        </footer>
    </div>
  );
};

export default App;
