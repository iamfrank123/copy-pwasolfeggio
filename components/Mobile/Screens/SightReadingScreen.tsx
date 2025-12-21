'use client';

import { useTranslation } from '@/context/LanguageContext';

export default function SightReadingScreen() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center h-full bg-stone-50 p-6">
            <div className="text-center space-y-4">
                <span className="text-6xl">🎹</span>
                <h2 className="text-2xl font-bold text-gray-800">{t('header.sight_reading')}</h2>
                <p className="text-gray-600 max-w-md">
                    {t('sight_reading.subtitle')}
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                    <p className="font-semibold mb-2">{t('sight_reading.midi_info_title')}</p>
                    <p>{t('sight_reading.midi_info_desc')}</p>
                </div>
            </div>
        </div>
    );
}
