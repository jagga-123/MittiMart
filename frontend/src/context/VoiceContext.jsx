import { createContext, useContext, useState } from 'react';

const VoiceContext = createContext();

export const useVoice = () => useContext(VoiceContext);

export const VoiceProvider = ({ children }) => {
  const [isListening, setIsListening] = useState(false);

  const getSpeechRecognition = () => {
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  };

  const speak = (text, lang = 'hi-IN') => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;

    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const startVoiceInput = (onResult, lang = 'hi-IN') => {
    const SR = getSpeechRecognition();
    if (!SR) {
      alert('Voice input (SpeechRecognition) is not supported in this browser. Works best on Chrome.');
      return;
    }

    const recognition = new SR();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onResult(text);
      setIsListening(false);
      speak(`Maine sun liya: ${text}. Sahi hai?`, lang);
    };

    recognition.onerror = (err) => {
      console.error('Speech recognition error:', err);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const triggerVibration = (pattern = [200, 100, 200]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  return (
    <VoiceContext.Provider
      value={{
        isListening,
        speak,
        startVoiceInput,
        triggerVibration,
        isSupported: !!getSpeechRecognition(),
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};
