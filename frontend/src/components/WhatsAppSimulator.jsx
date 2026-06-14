import { useState, useEffect, useRef } from 'react';
import { Send, PhoneCall, Check } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';

const WhatsAppSimulator = () => {
  const { speak } = useVoice();
  const [messages, setMessages] = useState([
    { sender: 'seller', text: '📷 Product photo + voice note uploaded', time: '12:00 PM' },
    { sender: 'bot', text: 'Aapka product dekh liya! Yeh Madhubani Painting lag rahi hai. Maine ₹799–₹1,200 ka price suggest kiya hai. Kya sahi hai?', time: '12:01 PM' },
    { sender: 'seller', text: 'HAAN', time: '12:01 PM' },
    { sender: 'bot', text: 'Bahut badiya! Draft saved. Aapka product 48 ghante ke andar live ho sakta hai.', time: '12:02 PM' }
  ]);
  const [input, setInput] = useState('');
  const threadEndRef = useRef(null);

  useEffect(() => {
    if (threadEndRef.current) {
      threadEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendBotResponse = (sellerText) => {
    let reply = 'Main aapke commands ko process kar raha hoon. "Help" likh kar details dekh sakte hain.';
    const text = sellerText.toUpperCase();

    if (text.includes('HAAN')) {
      reply = 'Shukriya! Aapka order accept ho gaya hai. Ab aap ise taiyaar karna shuru karein.';
      speak('Shukriya! Aapka order accept ho gaya hai.');
    } else if (text.includes('NAHI')) {
      reply = 'Koi baat nahi, order cancel kar diya gaya hai.';
    } else if (text.includes('ORDER')) {
      reply = 'Sunita Ji, aapke paas abhi 2 pending orders hain. Ek Madhubani Painting aur ek Kantha Table Runner.';
      speak('Aapke paas do pending orders hain.');
    } else if (text.includes('PAISA') || text.includes('EARN') || text.includes('KAMAI')) {
      reply = 'Is maheene aapne ₹4,200 kamaye hain. Agla target ₹8,000 hai.';
      speak('Is maheene aapne char hazar do sau rupaye kamaye hain.');
    } else if (text.includes('HELP')) {
      reply = 'Onboarding guide: 1. Photo bhejein listing ke liye, 2. "Mera order dikhao" likhein order status ke liye.';
    }

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 1000);
  };

  const handleSend = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const newMsg = {
      sender: 'seller',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    sendBotResponse(textToSend);
  };

  return (
    <div className="bg-brand-card border border-brand-brown/10 rounded-xl p-4 md:p-6 shadow-premium backdrop-blur-md max-w-4xl mx-auto font-body grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Left panel: Info & Commands */}
      <div className="md:col-span-1 flex flex-col justify-center">
        <span className="text-xs font-bold text-brand-orange uppercase bg-brand-orange/10 px-3 py-1 rounded-full w-fit mb-3">
          WhatsApp Bot Panel
        </span>
        <h3 className="font-heading text-xl font-bold text-brand-brown mb-2">
          MittiMart on WhatsApp
        </h3>
        <p className="text-brand-muted text-xs leading-relaxed mb-4">
          Many village sellers already use WhatsApp. This simulator replicates our official WhatsApp business interface.
        </p>

        <div className="border-t border-brand-brown/5 pt-4">
          <h4 className="text-[11px] uppercase font-bold text-brand-brown/70 tracking-wider mb-2">Quick Commands</h4>
          <div className="flex flex-col gap-2">
            {[
              { cmd: 'Mera order dikhao', desc: 'Check pending orders' },
              { cmd: 'Kitna paisa aaya', desc: 'Check monthly earnings' },
              { cmd: 'HAAN', desc: 'Accept new orders' },
              { cmd: 'NAHI', desc: 'Reject new orders' }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.cmd)}
                className="text-left px-3 py-2 bg-brand-cream/60 hover:bg-brand-cream border border-brand-brown/5 rounded-xl text-xs font-semibold text-brand-brown hover:text-brand-orange transition-colors flex justify-between"
              >
                <span>{item.cmd}</span>
                <span className="text-[10px] text-brand-muted font-normal italic">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel: Phone simulator */}
      <div className="md:col-span-2 flex flex-col h-[520px] bg-brand-cream/35 border border-brand-brown/10 rounded-2xl overflow-hidden shadow-inner relative">
        {/* Phone Header */}
        <div className="bg-emerald-600 text-white px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-white border border-emerald-500">
              MM
            </div>
            <div>
              <strong className="block text-sm font-semibold">MittiMart Support</strong>
              <span className="block text-[10px] text-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Online
              </span>
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-emerald-700 text-white transition-colors" title="Call Mitras">
            <PhoneCall className="w-4 h-4" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                msg.sender === 'seller'
                  ? 'bg-emerald-100 text-emerald-900 self-end rounded-tr-none'
                  : 'bg-white text-brand-dark self-start rounded-tl-none'
              }`}
            >
              <p className="leading-relaxed">{msg.text}</p>
              <div className="flex items-center gap-1 self-end mt-1 text-[9px] text-brand-muted">
                <span>{msg.time}</span>
                {msg.sender === 'seller' && <Check className="w-3 h-3 text-emerald-600" />}
              </div>
            </div>
          ))}
          <div ref={threadEndRef} />
        </div>

        {/* Chat input controls */}
        <div className="p-3 bg-white border-t border-brand-brown/10 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message or command..."
            className="flex-1 px-4 py-2 border border-brand-brown/15 rounded-full text-sm outline-none focus:border-emerald-600"
          />
          <button
            onClick={() => handleSend()}
            className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppSimulator;
