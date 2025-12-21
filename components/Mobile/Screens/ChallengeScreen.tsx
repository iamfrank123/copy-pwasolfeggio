'use client';

import { useTranslation } from '@/context/LanguageContext';

export default function ChallengeScreen() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center h-full bg-stone-50 p-6">
            <div className="text-center space-y-4">
                <span className="text-6xl">🏆</span>
                <h2 className="text-2xl font-bold text-gray-800">{t('header.challenge')}</h2>
                <p className="text-gray-600 max-w-md">
                    {t('challenge.subtitle')}
                </p>
                <div className="grid grid-cols-1 gap-3 mt-6 max-w-xs mx-auto">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm">
                        <p>{t('challenge.midi_info')}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm">
                        <p>{t('challenge.mouse_info')}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm">
                        <p>{t('challenge.touch_info')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
