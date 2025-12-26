// MIDI-related types for WebMIDI API

export interface MIDIInputDevice {
    id: string;
    name: string;
    manufacturer: string;
    state: 'connected' | 'disconnected';
}

export interface MIDINoteEvent {
    type: 'noteOn' | 'noteOff';
    pitch: number; // MIDI note number
    velocity: number;
    timestamp: number; // in milliseconds (original timestamp)
    compensatedTimestamp?: number; // Timestamp with latency compensation applied (in seconds for audio time)
    source: 'midi' | 'touch' | 'mouse' | 'audio'; // Input source
}

export interface MIDIConnectionStatus {
    hasAccess: boolean;
    isSupported: boolean;
    devices: MIDIInputDevice[];
    selectedDevice: string | null;
    error?: string;
}

// Raw MIDI message structure
export interface MIDIMessage {
    data: Uint8Array;
    timestamp: DOMHighResTimeStamp;
}
