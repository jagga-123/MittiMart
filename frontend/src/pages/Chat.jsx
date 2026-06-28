import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import PageShell from '../components/PageShell';

const defaultMessages = [
  { sender: 'support', text: 'Welcome to MittiMart support. How can we help you today?' },
  { sender: 'you', text: 'I need help with my order tracking.' },
];

const ChatPage = () => {
  const [messages, setMessages] = useState(defaultMessages);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: 'you', text: input.trim() }, { sender: 'support', text: 'Thanks. A team member will reply shortly.' }]);
    setInput('');
  };

  return (
    <PageShell
      eyebrow="Chat"
      title="Support chat"
      description="This customer route is kept simple and ready for a real message backend later."
      actions={
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cream border border-brand-brown/10 text-xs font-bold text-brand-brown">
          <MessageCircle className="w-4 h-4" />
          Online support
        </div>
      }
    >
      <div className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm">
        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
          {messages.map((message, index) => (
            <div
              key={`${message.sender}-${index}`}
              className={`flex ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xl px-4 py-3 rounded-2xl text-sm ${
                  message.sender === 'you'
                    ? 'bg-brand-brown text-white rounded-br-md'
                    : 'bg-brand-cream text-brand-brown rounded-bl-md border border-brand-brown/10'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write your message..."
            className="flex-1 px-4 py-3 rounded-full border border-brand-brown/15 outline-none"
          />
          <button className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-md" type="submit">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </PageShell>
  );
};

export default ChatPage;

