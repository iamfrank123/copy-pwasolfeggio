'use client';

import { useState, useEffect } from 'react';
import { latencyConfig } from '@/lib/midi/latency-config';

interface MIDILatencySettingsProps {
  onClose?: () => void;
}

export default function MIDILatencySettings({ onClose }: MIDILatencySettingsProps) {
  const [enabled, setEnabled] = useState(true);
  const [offsetMs, setOffsetMs] = useState(25);

  // Load current settings on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const config = latencyConfig.getConfig();
      setEnabled(config.enabled);
      setOffsetMs(config.offsetMs);
    }
  }, []);

  const handleEnabledChange = (checked: boolean) => {
    setEnabled(checked);
    latencyConfig.setEnabled(checked);
  };

  const handleOffsetChange = (value: number) => {
    setOffsetMs(value);
    latencyConfig.setOffsetMs(value);
  };

  const handleReset = () => {
    latencyConfig.reset();
    const config = latencyConfig.getConfig();
    setEnabled(config.enabled);
    setOffsetMs(config.offsetMs);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">🎹 MIDI Latency Compensation</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Enable/Disable Toggle */}
        <label className="flex items-center justify-between cursor-pointer group">
          <div className="flex-1">
            <div className="font-medium text-gray-700 group-hover:text-amber-700 transition">
              Enable Compensation
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Compensate for MIDI cable/interface latency
            </div>
          </div>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => handleEnabledChange(e.target.checked)}
            className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500 ml-3"
          />
        </label>

        {/* Offset Slider */}
        <div className={enabled ? '' : 'opacity-50 pointer-events-none'}>
          <label className="block mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Latency Offset</span>
              <span className="text-amber-600 font-bold text-lg">{offsetMs} ms</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={offsetMs}
              onChange={(e) => handleOffsetChange(Number(e.target.value))}
              className="w-full accent-amber-600"
              disabled={!enabled}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0 ms</span>
              <span>50 ms</span>
              <span>100 ms</span>
            </div>
          </label>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
          <div className="font-medium text-blue-800 mb-1">💡 What is this?</div>
          <div className="text-blue-700 text-xs leading-relaxed">
            MIDI devices typically have 20-30ms of latency. This compensation adjusts timing 
            evaluation so your notes register as "on time" even with cable delay. It does NOT 
            affect audio playback or visual display.
          </div>
        </div>

        {/* Calibration Tip */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
          <div className="font-medium text-amber-800 mb-1">🎯 How to calibrate</div>
          <div className="text-amber-700 text-xs leading-relaxed">
            Play along with the metronome. If feedback shows "late" even when you're on time, 
            increase the offset. If it shows "early", decrease it. Typical range: 20-30ms.
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition"
        >
          Reset to Default (25ms)
        </button>
      </div>
    </div>
  );
}
