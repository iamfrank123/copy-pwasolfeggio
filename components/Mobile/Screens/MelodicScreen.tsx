'use client';

import { useTranslation } from '@/context/LanguageContext';

export default function MelodicScreen() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center h-full bg-stone-50 p-6">
            <div className="text-center space-y-4">
                <span className="text-6xl">🎵</span>
                <h2 className="text-2xl font-bold text-gray-800">{t('header.melodic_solfege')}</h2>
                <p className="text-gray-600 max-w-md">
                    {t('melodic.subtitle')}
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                    <p className="font-semibold mb-2">{t('melodic.midi_warning_title')}</p>
                    <p>{t('melodic.midi_warning_desc')}</p>
                </div>
            </div>
        </div>
    );
}
