import { useVoice } from '../context/VoiceContext';

const SpeechMic = ({ onResult, lang = 'hi-IN', className = '' }) => {
  const { startVoiceInput, isListening } = useVoice();

  return (
    <button
      type="button"
      onClick={() => startVoiceInput(onResult, lang)}
      className={`p-2 rounded-full bg-brand-cream border border-brand-brown/10 hover:border-brand-orange/40 hover:scale-105 active:scale-95 transition-all text-lg flex items-center justify-center ${isListening ? 'animate-pulse bg-brand-orange/20 border-brand-orange' : ''} ${className}`}
      title="Tap to speak"
    >
      🎤
    </button>
  );
};

export default SpeechMic;
