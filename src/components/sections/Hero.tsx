import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const logoUrl = content?.logoUrl || "/logo.png";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      {/* Dynamic Background Image */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/80 z-10" />
          <img src={bgImage} className="w-full h-full object-cover" alt="Hero background" />
        </div>
      )}
      
      {/* Background Ornaments - Centered Background Ornament */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-bold uppercase tracking-[0.2em] mb-10"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            {isRtl ? 'بوابتك إلى التميز' : 'Your Gateway to Excellence'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true }}
            className={cn("text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tighter mb-8", bgImage ? "text-white" : "text-primary")}
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
            className={cn("text-base md:text-lg lg:text-xl max-w-3xl mb-12 leading-relaxed font-medium mx-auto", bgImage ? "text-white/80" : "text-muted-foreground")}
          >
            {subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white h-16 px-10 text-lg group rounded-full shadow-xl shadow-primary/20">
              <Link to="/contact">
                {t('hero.ctaRequest')}
                <ChevronRight className={cn("ml-2 h-5 w-5 transition-transform group-hover:translate-x-1", isRtl && "rotate-180 group-hover:-translate-x-1")} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white h-16 px-10 text-lg rounded-full group">
              <Link to="/services">
                {t('hero.ctaExplore')}
                <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Visual Element - Enlarged and behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-10 flex items-center justify-center overflow-hidden -z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
           <div className="w-[800px] h-[800px] border-[40px] border-secondary/10 rounded-full flex items-center justify-center">
              <div className="w-[500px] h-[500px] border-[20px] border-primary/5 rounded-full" />
           </div>
        </motion.div>
      </div>
    </section>
  );
}
