import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ShieldCheck, Target, Zap, Users, Gem, Handshake } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSiteContent } from '@/lib/dynamicContent';
import { cn } from '@/lib/utils';

export function About() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    getSiteContent().then(setContent);
  }, []);

  const values = [
    { key: 'trust', icon: ShieldCheck },
    { key: 'professionalism', icon: Target },
    { key: 'transparency', icon: Zap },
    { key: 'commitment', icon: Users },
    { key: 'quality', icon: Gem },
    { key: 'partnership', icon: Handshake },
  ];

  const title = content ? (isRtl ? content.aboutTitleAr : content.aboutTitleEn) : t('about.title');
  const description = content ? (isRtl ? content.aboutTextAr : content.aboutTextEn) : t('about.description');
  const vision = content ? (isRtl ? content.visionAr : content.visionEn) : t('about.vision');
  const mission = content ? (isRtl ? content.missionAr : content.missionEn) : t('about.mission');
  const aboutImage = content?.aboutImageUrl;
  const logoUrl = content?.logoUrl || "/logo.png";

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className={cn("aspect-square rounded-[3rem] bg-primary overflow-hidden flex items-center justify-center shadow-2xl", aboutImage ? "p-0" : "p-12")}>
               <img 
                 src={aboutImage || logoUrl} 
                 alt="Company Image" 
                 className={cn("w-full h-full object-cover transition-transform duration-700 hover:scale-105", !aboutImage && "object-contain brightness-0 invert opacity-40")}
               />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-secondary p-8 rounded-[2.5rem] shadow-2xl hidden md:block">
               <p className="text-white font-bold text-2xl tracking-tighter">1ST CLASS</p>
               <p className="text-white/80 text-sm uppercase tracking-widest leading-none">Advanced Co.</p>
            </div>
          </motion.div>

          <div>
             <motion.h2
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-4xl md:text-5xl font-bold text-primary mb-8"
             >
               {title}
             </motion.h2>
             <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-lg text-muted-foreground mb-8 leading-relaxed whitespace-pre-wrap"
             >
               {description || t('about.description')}
             </motion.p>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="p-6 bg-accent/20 rounded-3xl border border-border"
                >
                   <h4 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                     <Target className="text-secondary h-6 w-6" />
                     {t('about.vision')}
                   </h4>
                   <p className="text-muted-foreground text-sm">{vision}</p>
                </motion.div>
                <motion.div
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="p-6 bg-accent/20 rounded-3xl border border-border"
                >
                   <h4 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                     <Zap className="text-secondary h-6 w-6" />
                     {t('about.mission')}
                   </h4>
                   <p className="text-muted-foreground text-sm">{mission}</p>
                </motion.div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.key}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center gap-3 text-center"
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-secondary/20 flex items-center justify-center text-secondary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-semibold">{t(`about.values.${value.key}`)}</span>
                    </motion.div>
                  );
                })}
             </div>

             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5 }}
             >
               <a 
                 href="/about" 
                 className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
               >
                 {isRtl ? 'اقرأ المزيد' : 'Read More'}
               </a>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
