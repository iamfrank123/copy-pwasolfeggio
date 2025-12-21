'use client';

import React from 'react';
import { useMobile, ExerciseMode } from '@/context/MobileContext';
import { useTranslation } from '@/context/LanguageContext';

interface ModeConfig {
    id: ExerciseMode;
    icon: string;
    labelKey: string;
}

const modes: ModeConfig[] = [
    { id: 'rhythm', icon: '🥁', labelKey: 'header.rhythm_solfege' },
    { id: 'sight-reading', icon: '🎹', labelKey: 'header.sight_reading' },
    { id: 'melodic', icon: '🎵', labelKey: 'header.melodic_solfege' },
    { id: 'challenge', icon: '🏆', labelKey: 'header.challenge' }
];

export default function ModeSelector() {
    const { t } = useTranslation();
    const { currentMode, setCurrentMode, isExerciseActive } = useMobile();

    const handleModeChange = (mode: ExerciseMode) => {
        if (!isExerciseActive) {
            setCurrentMode(mode);
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-around h-16 px-2">
                {modes.map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => handleModeChange(mode.id)}
                        disabled={isExerciseActive}
                        className={`
                            flex flex-col items-center justify-center
                            min-w-[60px] h-14 px-2 rounded-lg
                            transition-all duration-200
                            ${currentMode === mode.id
                                ? 'bg-amber-50 border-2 border-amber-500 scale-105 shadow-md'
                                : 'border-2 border-transparent hover:bg-gray-50'
                            }
                            ${isExerciseActive ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
                        `}
                        style={{ minHeight: '44px' }} // Touch target minimum
                    >
                        <span className="text-2xl mb-0.5">{mode.icon}</span>
                        <span className={`
                            text-[10px] font-bold leading-tight text-center
                            ${currentMode === mode.id ? 'text-amber-700' : 'text-gray-600'}
                        `}>
                            {t(mode.labelKey).split(' ')[0]}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
