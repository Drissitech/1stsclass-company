import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { getSiteContent } from '@/lib/dynamicContent';
import { cn } from '@/lib/utils';

export function Hero() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    getSiteContent().then(setContent);
  }, []);

  const headline = content ? (isRtl ? content.heroTitleAr : content.heroTitleEn) : t('hero.headline');
  const subheadline = content ? (isRtl ? content.heroSubAr : content.heroSubEn) : t('hero.subheadline');
  const bgImage = content?.heroImageUrl;
  const logoUrl = content?.logoUrl || "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0642593940.firebasestorage.app/o/logo.png?alt=media";

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Dynamic Background Image */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-deep-green/80 mix-blend-multiply z-10" />
          <img src={bgImage} className="w-full h-full object-cover" alt="Hero background" />
        </div>
      )}
      
      {/* Background Ornaments */}
      {!bgImage && <div className="absolute top-0 right-0 w-1/3 h-full bg-deep-green/5 -skew-x-12 transform translate-x-1/2" />}
      <div className="absolute bottom-0 left-0 w-64 h-64 border-2 border-gold/10 rounded-full -translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            {t('nav.home')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={cn("text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tighter mb-8", bgImage ? "text-white" : "text-deep-green")}
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className={cn("text-lg md:text-xl max-w-2xl mb-12 leading-relaxed", bgImage ? "text-white/80" : "text-muted-foreground")}
          >
            {subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="bg-deep-green hover:bg-deep-green/90 text-white h-14 px-8 text-lg group rounded-full">
              <a href="#contact">
                {t('hero.ctaRequest')}
                <ChevronRight className={cn("ml-2 h-5 w-5 transition-transform group-hover:translate-x-1", isRtl && "rotate-180 group-hover:-translate-x-1")} />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white h-14 px-8 text-lg rounded-full group">
              {t('hero.ctaExplore')}
              <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Visual Element */}
      <div className="absolute right-0 bottom-0 w-full lg:w-1/2 h-1/2 lg:h-full pointer-events-none opacity-20 lg:opacity-100 flex items-end justify-center lg:justify-end pr-0 lg:pr-24 overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative translate-y-20 lg:translate-y-40 translate-x-10 lg:translate-x-20"
        >
           <div className="w-[600px] h-[600px] border-[40px] border-gold/10 rounded-full flex items-center justify-center">
              <div className="w-[400px] h-[400px] border-[20px] border-deep-green/5 rounded-full" />
           </div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img 
                src={logoUrl} 
                alt="Logo" 
                className="w-96 h-96 object-contain grayscale opacity-50 contrast-125"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
           </div>
        </motion.div>
      </div>
    </section>
  );
}
