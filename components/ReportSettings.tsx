
import React from 'react';
import type { UserDetails } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import StyleButton from './StyleButton';

interface ReportSettingsProps {
  details: UserDetails;
  setDetails: (details: UserDetails) => void;
}

const ReportSettings: React.FC<ReportSettingsProps> = ({ details, setDetails }) => {
    const { t } = useLanguage();

    const handleChange = (field: keyof UserDetails, value: string | number) => {
        setDetails({ ...details, [field]: value });
    };

    return (
        <div className="space-y-4 bg-slate-50/50 p-4 rounded-lg border border-slate-200">
            {/* Pages */}
            <div>
                <label htmlFor="pages-editor" className="block text-sm font-medium text-slate-700">
                    {t('pagesLabel')}
                </label>
                <input
                    type="number" id="pages-editor" value={details.pages}
                    onChange={(e) => handleChange('pages', parseInt(e.target.value, 10) || 1)}
                    min="1" max="50" required placeholder={t('pagesPlaceholder')}
                    className="mt-1 block w-full bg-white border border-slate-300 rounded-md shadow-sm py-2 px-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Style */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    {t('styleLabel')}
                </label>
                <div className="mt-1 flex items-center space-x-2 flex-wrap gap-2">
                    <StyleButton currentStyle={details.style} setStyle={(style) => handleChange('style', style)} styleName="Modern" displayName={t('styleModern')} />
                    <StyleButton currentStyle={details.style} setStyle={(style) => handleChange('style', style)} styleName="Classic" displayName={t('styleClassic')} />
                    <StyleButton currentStyle={details.style} setStyle={(style) => handleChange('style', style)} styleName="Minimalist" displayName={t('styleMinimalist')} />
                    <StyleButton currentStyle={details.style} setStyle={(style) => handleChange('style', style)} styleName="Academic" displayName={t('styleAcademic')} />
                </div>
            </div>

            {/* Cover Format */}
             <div>
                <label className="block text-sm font-medium text-slate-700">
                    {t('coverFormatLabel')}
                </label>
                <div className="mt-1 flex items-center space-x-2 flex-wrap gap-2">
                    <StyleButton currentStyle={details.coverPageFormat} setStyle={(format) => handleChange('coverPageFormat', format)} styleName="Standard" displayName={t('coverFormatStandard')} />
                    <StyleButton currentStyle={details.coverPageFormat} setStyle={(format) => handleChange('coverPageFormat', format)} styleName="Formal Report" displayName={t('coverFormatFormal')} />
                    <StyleButton currentStyle={details.coverPageFormat} setStyle={(format) => handleChange('coverPageFormat', format)} styleName="Full Page" displayName={t('coverFormatFullPage')} />
                </div>
            </div>

            {/* Language */}
            <div>
                <label className="block text-sm font-medium text-slate-700">
                    {t('languageLabel')}
                </label>
                <div className="mt-1 flex items-center space-x-2 flex-wrap gap-2">
                    <StyleButton currentStyle={details.language} setStyle={(lang) => handleChange('language', lang)} styleName="english" displayName={t('langEnglish')} />
                    <StyleButton currentStyle={details.language} setStyle={(lang) => handleChange('language', lang)} styleName="arabic" displayName={t('langArabic')} />
                </div>
            </div>
        </div>
    );
};

export default ReportSettings;
