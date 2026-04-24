import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const COMPANY_KNOWLEDGE = `
Company Name: 1st Class Advanced Co. (شركة الدرجة الأولى المتقدمة)
Core Business: International trade, logistics, and sourcing.
Focus: Sourcing from global markets (especially China) and shipping to Saudi Arabia.
Services:
- International Sourcing: Searching for suppliers, reviewing options.
- Import & Export: Support in operations and documentation.
- Shipping & Logistics: Coordination and tracking.
- PO Management: Handling purchase orders and comparing offers.
- Business Development: Bridging clients and trade partners.
Mission: Providing integrated sourcing and commercial solutions with quality and flexibility.
Vision: To be a leading and trusted partner in international sourcing and trade.
Why Us: Professional experience, wide network of suppliers, meticulous tracking, and commitment to transparency.
Contact Info:
- Phone: +966 506963669
- Email: info@1stclass.com.sa
- Address: King Abdullah Road – Al-Fayhaa – Emaar Tower – 1st Floor, Saudi Arabia.
`;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hello! I am your 1st Class assistant. How can I help you with our logistics and sourcing services today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: `You are a helpful AI assistant for '1st Class Advanced Co.'. 
          Use the following company knowledge to answer questions. 
          If you don't know the answer, politely ask them to contact the company directly via phone or email provided in the knowledge.
          Knowledge Base: ${COMPANY_KNOWLEDGE}
          Answer in the same language as the user (English or Arabic). Keep answers professional and helpful.`,
        },
      });

      const botMsg = response.text || "I'm sorry, I couldn't process that. Please try calling us directly.";
      setMessages(prev => [...prev, { role: 'bot', text: botMsg }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', text: "I apologize, but I am having trouble connecting. Feel free to contact our team via WhatsApp for immediate assistance." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:right-6 z-[70] w-14 h-14 bg-gold text-deep-green rounded-full flex items-center justify-center shadow-2xl overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] md:w-[400px] h-[500px] bg-white border border-border rounded-3xl shadow-2xl z-[70] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-deep-green p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-deep-green" />
                </div>
                <div>
                  <h3 className="font-bold">AI Assistant</h3>
                  <p className="text-[10px] text-white/70 uppercase tracking-widest">1st Class Expert</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-hidden" ref={scrollRef}>
               <ScrollArea className="h-full p-4">
                 <div className="space-y-4">
                   {messages.map((msg, i) => (
                     <div key={i} className={cn("flex items-start gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
                       <div className={cn(
                         "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                         msg.role === 'bot' ? "bg-accent/30 text-deep-green" : "bg-deep-green text-white"
                       )}>
                         {msg.role === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                       </div>
                       <div className={cn(
                         "max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed",
                         msg.role === 'bot' ? "bg-accent/40 rounded-tl-none text-foreground" : "bg-deep-green text-white rounded-tr-none"
                       )}>
                         {msg.text}
                       </div>
                     </div>
                   ))}
                   {isTyping && (
                     <div className="flex items-start gap-3">
                       <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center shrink-0">
                         <Bot className="w-4 h-4" />
                       </div>
                       <div className="bg-accent/40 p-3 rounded-2xl rounded-tl-none">
                         <Loader2 className="w-4 h-4 animate-spin text-deep-green" />
                       </div>
                     </div>
                   )}
                 </div>
               </ScrollArea>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-accent/5">
               <div className="flex gap-2">
                 <Input 
                   placeholder="Type your question..." 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                   className="rounded-xl border-border/50 focus-visible:ring-gold"
                 />
                 <Button onClick={handleSend} className="bg-deep-green text-white rounded-xl aspect-square p-0 w-11 shadow-lg shadow-deep-green/10" disabled={isTyping}>
                   <Send className="w-4 h-4" />
                 </Button>
               </div>
               <p className="text-[10px] text-center text-muted-foreground mt-2">Powered by Gemini AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
