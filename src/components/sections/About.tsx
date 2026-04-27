import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ShieldCheck, Target, Zap, Users, Gem, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    <section id="about" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Centered Heading */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6"
          >
            {title}
          </motion.h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center justify-items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative max-w-lg"
          >
            <div className={cn("aspect-square rounded-[3rem] bg-primary overflow-hidden flex items-center justify-center shadow-2xl transition-transform hover:scale-105 duration-700", aboutImage ? "p-0" : "p-12")}>
               <img 
                 src={aboutImage || logoUrl} 
                 alt="Company Image" 
                 className={cn("w-full h-full object-cover", !aboutImage && "object-contain brightness-0 invert opacity-40 scale-75")}
               />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-secondary p-10 rounded-[2.5rem] shadow-2xl hidden lg:block">
               <p className="text-white font-bold text-4xl tracking-tighter">1ST CLASS</p>
               <p className="text-white/80 text-xs uppercase tracking-widest leading-none">Advanced Co.</p>
            </div>
          </motion.div>
 
          <div className="flex flex-col items-center lg:items-start text-center lg:text-start max-w-2xl">
             <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed whitespace-pre-wrap"
             >
               {description || t('about.description')}
             </motion.p>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 w-full">
                <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="p-8 bg-accent/10 rounded-[2rem] border border-border flex flex-col items-center lg:items-start"
                >
                   <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                     <Target className="h-7 w-7" />
                   </div>
                   <h4 className="text-xl font-bold text-primary mb-3">
                     {t('about.vision')}
                   </h4>
                   <p className="text-muted-foreground text-base leading-relaxed line-clamp-4">{vision}</p>
                </motion.div>
                <motion.div
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="p-8 bg-primary/5 rounded-[2rem] border border-border flex flex-col items-center lg:items-start"
                >
                   <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                     <Zap className="h-7 w-7" />
                   </div>
                   <h4 className="text-xl font-bold text-primary mb-3">
                     {t('about.mission')}
                   </h4>
                   <p className="text-muted-foreground text-base leading-relaxed line-clamp-4">{mission}</p>
                </motion.div>
             </div>
 
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5 }}
               className="w-full flex justify-center lg:justify-start"
             >
               <Button asChild size="lg" className="h-16 px-12 rounded-full font-bold text-xl shadow-xl shadow-primary/20">
                 <a href="/about">{isRtl ? 'اقرأ المزيد' : 'Read More'}</a>
               </Button>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
