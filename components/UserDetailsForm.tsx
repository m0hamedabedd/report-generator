
import React, { useState } from 'react';
import type { UserDetails } from '../types';
import { SparklesIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';
import StyleButton from './StyleButton';

interface UserDetailsFormProps {
  onSubmit: (details: UserDetails) => void;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({ onSubmit }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [section, setSection] = useState('');
  const [university, setUniversity] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [pages, setPages] = useState('10');
  const [style, setStyle] = useState('Modern');
  const [coverPageFormat, setCoverPageFormat] = useState('Standard');
  const [language, setLanguage] = useState('english');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, id, section, university, additionalInfo, pages: parseInt(pages, 10) || 1, style, coverPageFormat, language });
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
            <div className="pb-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800">{t('authorDetailsTitle')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                        {t('fullNameLabel')}
                    </label>
                    <input
                        type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                        placeholder={t('fullNamePlaceholder')}
                        className="mt-1 block w-full bg-white border border-slate-300 rounded-md shadow-sm py-2 px-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                 <div>
                    <label htmlFor="university" className="block text-sm font-medium text-slate-700">
                        {t('universityLabel')}
                    </label>
                    <input
                        type="text" id="university" value={university} onChange={(e) => setUniversity(e.target.value)}
                        placeholder={t('universityPlaceholder')}
                        className="mt-1 block w-full bg-white border border-slate-300 rounded-md shadow-sm py-2 px-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                 <div>
                    <label htmlFor="id" className="block text-sm font-medium text-slate-700">
                        {t('idLabel')}
                    </label>
                    <input
                        type="text" id="id" value={id} onChange={(e) => setId(e.target.value)}
                        placeholder={t('idPlaceholder')}
                        className="mt-1 block w-full bg-white border border-slate-300 rounded-md shadow-sm py-2 px-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="section" className="block text-sm font-medium text-slate-700">
                        {t('sectionLabel')}
                    </label>
                    <input
                        type="text" id="section" value={section} onChange={(e) => setSection(e.target.value)}
                        placeholder={t('sectionPlaceholder')}
                        className="mt-1 block w-full bg-white border border-slate-300 rounded-md shadow-sm py-2 px-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
             <div className="col-span-1 md:col-span-2">
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-slate-700">
                    {t('coverLetterInfoLabel')}
                </label>
                <textarea
                    id="additionalInfo" rows={4} value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder={t('coverLetterInfoPlaceholder')}
                    className="mt-1 block w-full bg-white border border-slate-300 rounded-md shadow-sm py-2 px-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>

        <div className="space-y-6">
            <div className="pb-4 border-b border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800">{t('configTitle')}</h2>
            </div>
             <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <div>
                        <label htmlFor="pages" className="block text-sm font-medium text-slate-700">
                            {t('pagesLabel')}
                        </label>
                        <input
                            type="number" id="pages" value={pages} onChange={(e) => setPages(e.target.value)}
                            min="1" max="50" required placeholder={t('pagesPlaceholder')}
                            className="mt-1 block w-full bg-white border border-slate-300 rounded-md shadow-sm py-2 px-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            {t('styleLabel')}
                        </label>
                        <div className="mt-1 flex items-center space-x-2 flex-wrap gap-2">
                            <StyleButton currentStyle={style} setStyle={setStyle} styleName="Modern" displayName={t('styleModern')} />
                            <StyleButton currentStyle={style} setStyle={setStyle} styleName="Classic" displayName={t('styleClassic')} />
                            <StyleButton currentStyle={style} setStyle={setStyle} styleName="Minimalist" displayName={t('styleMinimalist')} />
                            <StyleButton currentStyle={style} setStyle={setStyle} styleName="Academic" displayName={t('styleAcademic')} />
                        </div>
                    </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                     <div>
                        <label className="block text-sm font-medium text-slate-700">
                            {t('coverFormatLabel')}
                        </label>
                        <div className="mt-1 flex items-center space-x-2 flex-wrap gap-2">
                            <StyleButton currentStyle={coverPageFormat} setStyle={setCoverPageFormat} styleName="Standard" displayName={t('coverFormatStandard')} />
                            <StyleButton currentStyle={coverPageFormat} setStyle={setCoverPageFormat} styleName="Formal Report" displayName={t('coverFormatFormal')} />
                            <StyleButton currentStyle={coverPageFormat} setStyle={setCoverPageFormat} styleName="Full Page" displayName={t('coverFormatFullPage')} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            {t('languageLabel')}
                        </label>
                        <div className="mt-1 flex items-center space-x-2 flex-wrap gap-2">
                            <StyleButton currentStyle={language} setStyle={setLanguage} styleName="english" displayName={t('langEnglish')} />
                            <StyleButton currentStyle={language} setStyle={setLanguage} styleName="arabic" displayName={t('langArabic')} />
                        </div>
                    </div>
                 </div>
             </div>
        </div>
        
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center items-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <SparklesIcon className="w-5 h-5 mx-2" />
            {t('submitButton')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetailsForm;
