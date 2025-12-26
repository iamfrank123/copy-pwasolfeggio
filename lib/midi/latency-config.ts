/**
 * MIDI Latency Compensation Configuration
 * 
 * This module handles MIDI input latency compensation to ensure accurate timing
 * evaluation when using MIDI devices. The compensation is applied ONLY to timing
 * evaluation, not to playback, recording, or visual rendering.
 */

export interface LatencyConfig {
  /** Enable/disable MIDI latency compensation */
  enabled: boolean;
  /** Offset in milliseconds (default: 25ms) */
  offsetMs: number;
  /** Minimum allowed offset */
  minOffsetMs: number;
  /** Maximum allowed offset */
  maxOffsetMs: number;
}

const DEFAULT_CONFIG: LatencyConfig = {
  enabled: true,
  offsetMs: 25, // Default 25ms based on typical MIDI cable latency
  minOffsetMs: 0,
  maxOffsetMs: 100,
};

class LatencyConfigManager {
  private config: LatencyConfig;
  private storageKey = 'midi-latency-config';

  constructor() {
    this.config = { ...DEFAULT_CONFIG };
    this.loadFromStorage();
  }

  /**
   * Load configuration from localStorage (client-side only)
   */
  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.config = { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load MIDI latency config:', error);
    }
  }

  /**
   * Save configuration to localStorage (client-side only)
   */
  private saveToStorage(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.config));
    } catch (error) {
      console.warn('Failed to save MIDI latency config:', error);
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): LatencyConfig {
    return { ...this.config };
  }

  /**
   * Get the current offset in milliseconds
   */
  getOffsetMs(): number {
    return this.config.enabled ? this.config.offsetMs : 0;
  }

  /**
   * Get the current offset in seconds (for audio time calculations)
   */
  getOffsetSeconds(): number {
    return this.getOffsetMs() / 1000;
  }

  /**
   * Set the offset value (clamped to min/max range)
   */
  setOffsetMs(offsetMs: number): void {
    const clamped = Math.max(
      this.config.minOffsetMs,
      Math.min(this.config.maxOffsetMs, offsetMs)
    );
    this.config.offsetMs = clamped;
    this.saveToStorage();
  }

  /**
   * Enable or disable latency compensation
   */
  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
    this.saveToStorage();
  }

  /**
   * Reset to default configuration
   */
  reset(): void {
    this.config = { ...DEFAULT_CONFIG };
    this.saveToStorage();
  }

  /**
   * Apply latency compensation to a timestamp
   * This is the core function that compensates for MIDI latency
   * 
   * @param timestamp - Original MIDI event timestamp (in milliseconds or seconds)
   * @param isSeconds - Whether the timestamp is in seconds (default: false for milliseconds)
   * @returns Compensated timestamp
   */
  compensateTimestamp(timestamp: number, isSeconds: boolean = false): number {
    if (!this.config.enabled) return timestamp;

    const offset = isSeconds ? this.getOffsetSeconds() : this.getOffsetMs();
    return timestamp - offset; // Subtract offset to "move the event earlier"
  }
}

// Singleton instance
export const latencyConfig = new LatencyConfigManager();
