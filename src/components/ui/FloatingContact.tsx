import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface FloatingContactProps {
  phone: string;
}

export function FloatingContact({ phone }: FloatingContactProps) {
  // Clean phone number for WhatsApp link (remove non-digits, keep + for international if present)
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  return (
    <>
      {/* WhatsApp Link - Left */}
      <motion.a
        href={`https://wa.me/${cleanPhone}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 left-6 z-[60] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:shadow-[#25D366]/40"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
      </motion.a>

      {/* Phone Link - Right */}
      <motion.a
        href={`tel:${cleanPhone}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:shadow-primary/40 md:right-24"
        aria-label="Call us"
      >
        <Phone className="w-7 h-7" />
      </motion.a>
    </>
  );
}
