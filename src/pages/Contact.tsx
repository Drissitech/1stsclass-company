import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';
import { getGlobalSettings, getSiteContent } from '@/lib/dynamicContent';
import { toast } from 'sonner';
import { SEO } from '@/components/ui/SEO';

export function ContactPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [settings, setSettings] = useState<any>(null);
  const [content, setContent] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getGlobalSettings().then(setSettings);
    getSiteContent().then(setContent);
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(isRtl ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!');
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    {
      icon: Phone,
      title: isRtl ? 'اتصل بنا' : 'Call Us',
      value: settings?.phone || '+966 506963669',
      link: `tel:${settings?.phone || '+966506963669'}`
    },
    {
      icon: Mail,
      title: isRtl ? 'البريد الإلكتروني' : 'Email Us',
      value: settings?.email || 'info@1stclass.com.sa',
      link: `mailto:${settings?.email || 'info@1stclass.com.sa'}`
    },
    {
      icon: MapPin,
      title: isRtl ? 'العنوان' : 'Our Office',
      value: isRtl ? (settings?.addressAr || 'الرياض، المملكة العربية السعودية') : (settings?.addressEn || 'Riyadh, Saudi Arabia'),
      link: '#'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-background">
      <SEO 
        title={isRtl ? 'اتصل بنا - شركة الفئة الأولى' : 'Contact Us - 1st Class Co.'} 
        description={isRtl ? 'تواصل معنا للحصول على استشارات في سلاسل الإمداد والتجارة الدولية.' : 'Get in touch with us for supply chain and international trade consultations.'} 
      />
      
      {/* Hero Section */}
      <section className="bg-primary py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-10 tracking-tighter"
          >
            {isRtl ? 'تواصل معنا' : 'Contact Us'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            {isRtl 
              ? 'نحن هنا للإجابة على استفساراتكم ومساعدتكم في تنمية أعمالكم.' 
              : 'We are here to answer your inquiries and help you grow your business.'}
          </motion.p>
          <div className="w-40 h-2.5 bg-secondary mx-auto mt-12 rounded-full" />
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-6 p-8 bg-accent/20 rounded-[2rem] border border-border hover:border-secondary/50 transition-all group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">{item.title}</p>
                    <p className="text-lg font-bold text-primary">{item.value}</p>
                  </div>
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 bg-primary rounded-[2rem] text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
                <Clock className="w-12 h-12 text-secondary mb-6" />
                <h3 className="text-xl font-bold mb-4">{isRtl ? 'ساعات العمل' : 'Working Hours'}</h3>
                <div className="space-y-2 text-white/70">
                  <div className="flex justify-between">
                    <span>{isRtl ? 'الأحد - الخميس' : 'Sun - Thu'}</span>
                    <span className="font-bold text-white">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isRtl ? 'الجمعة - السبت' : 'Fri - Sat'}</span>
                    <span className="font-bold text-secondary">{isRtl ? 'مغلق' : 'Closed'}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 md:p-16 rounded-[3rem] border border-border shadow-2xl shadow-primary/5"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-primary">{isRtl ? 'أرسل لنا رسالة' : 'Send Us a Message'}</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">{isRtl ? 'الاسم بالكامل' : 'Full Name'}</label>
                      <input 
                        required 
                        type="text" 
                        placeholder={isRtl ? 'أدخل اسمك' : 'Enter your name'}
                        className="w-full h-14 px-6 rounded-2xl bg-accent/30 border-transparent focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="example@mail.com"
                        className="w-full h-14 px-6 rounded-2xl bg-accent/30 border-transparent focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">{isRtl ? 'الموضوع' : 'Subject'}</label>
                    <input 
                      required 
                      type="text" 
                      placeholder={isRtl ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}
                      className="w-full h-14 px-6 rounded-2xl bg-accent/30 border-transparent focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">{isRtl ? 'الرسالة' : 'Message'}</label>
                    <textarea 
                      required 
                      rows={6}
                      placeholder={isRtl ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                      className="w-full p-6 rounded-2xl bg-accent/30 border-transparent focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all outline-none resize-none"
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full h-16 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {isRtl ? 'إرسال الرسالة' : 'Send Message'}
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] bg-accent/40 grayscale hover:grayscale-0 transition-all duration-700 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Globe className="w-16 h-16 text-primary/20 mx-auto mb-4" />
            <p className="text-primary/40 font-bold tracking-widest uppercase">{isRtl ? 'خريطة الموقع' : 'Location Map'}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
