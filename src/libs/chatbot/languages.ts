
export type LanguageOption = {
  value: string; // Represents the aiModelCode, e.g., "english", "hindi"
  label: string; // Display name, e.g., "English", "हिन्दी (Hindi)"
  bcp47: string; // For speech recognition, e.g., "en-US", "hi-IN"
};

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'english', label: 'English', bcp47: 'en-US' },
  { value: 'hindi', label: 'हिन्दी (Hindi)', bcp47: 'hi-IN' },
  { value: 'telugu', label: 'తెలుగు (Telugu)', bcp47: 'te-IN' },
  { value: 'gondi', label: 'गोंडी (Gondi)', bcp47: 'gon' }, // ISO 639-3 code for Gondi
  { value: 'santhali', label: 'संथाली (Santhali)', bcp47: 'sat' }, // ISO 639-3 code for Santali
  { value: 'bhili', label: 'भीली (Bhili)', bcp47: 'bhb' }, // Using Bhilali as an example for Bhili group
  { value: 'khurukh', label: 'कुड़ुख़ (Kurukh)', bcp47: 'kru' }, // ISO 639-3 code for Kurukh
  { value: 'kui', label: 'कुई (Kui)', bcp47: 'kxu' }, // ISO 639-3 code for Kui (India)
  { value: 'ho', label: 'हो (Ho)', bcp47: 'hoc' }, // ISO 639-3 code for Ho
  { value: 'kharia', label: 'खड़िया (Kharia)', bcp47: 'khr' }, // ISO 639-3 code for Kharia
  { value: 'mundari', label: 'मुंडारी (Mundari)', bcp47: 'unr' }, // ISO 639-3 code for Mundari
];

export const DEFAULT_LANGUAGE = LANGUAGE_OPTIONS[0]; // English

export function getLanguageOptionFromValue(value: string): LanguageOption | undefined {
  return LANGUAGE_OPTIONS.find(l => l.value === value);
}

export function getLanguageOptionFromBcp47(bcp47Code: string): LanguageOption | undefined {
  return LANGUAGE_OPTIONS.find(l => l.bcp47 === bcp47Code);
}
