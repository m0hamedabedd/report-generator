
import React from 'react';
import { FormIcon, TypeIcon, GenerateIcon, DownloadFileIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

const InfoCard: React.FC<{ icon: React.ReactNode; step: string; title: string; description: string }> = ({ icon, step, title, description }) => (
    <div className="flex-1 bg-white rounded-xl border border-slate-200/80 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
        <div className="w-12 h-12 mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
            {icon}
        </div>
        <p className="text-sm font-semibold text-blue-600">{step}</p>
        <h3 className="mt-1 text-lg font-bold text-slate-800">{title}</h3>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
);

const HowItWorks: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">{t('howItWorksTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <InfoCard 
                    icon={<FormIcon className="w-6 h-6" />}
                    step={t('step1')}
                    title={t('step1Title')}
                    description={t('step1Desc')}
                />
                <InfoCard 
                    icon={<TypeIcon className="w-6 h-6" />}
                    step={t('step2')}
                    title={t('step2Title')}
                    description={t('step2Desc')}
                />
                 <InfoCard 
                    icon={<GenerateIcon className="w-6 h-6" />}
                    step={t('step3')}
                    title={t('step3Title')}
                    description={t('step3Desc')}
                />
                 <InfoCard 
                    icon={<DownloadFileIcon className="w-6 h-6" />}
                    step={t('step4')}
                    title={t('step4Title')}
                    description={t('step4Desc')}
                />
            </div>
        </div>
    );
};

export default HowItWorks;
