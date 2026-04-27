import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSiteContent } from '@/lib/dynamicContent';

export function WhyUs() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    getSiteContent().then(setContent);
  }, []);

  const title = content ? (isRtl ? content.whyUsTitleAr : content.whyUsTitleEn) : t('whyUs.title');
  const description = content ? (isRtl ? content.whyUsTextAr : content.whyUsTextEn) : t('whyUs.description');
  
  const dynPoints = content ? (isRtl ? content.whyUsPointsAr : content.whyUsPointsEn) : null;
  const points = dynPoints 
    ? dynPoints.split('\n').filter((p: string) => p.trim() !== '')
    : (t('whyUs.points', { returnObjects: true }) as string[]);

  return (
    <section className="py-16 bg-primary text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold mb-6 text-white leading-tight"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/70 text-base mb-8 whitespace-pre-wrap leading-relaxed"
            >
              {description}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="mt-1">
                   <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-4 h-4" />
                   </div>
                </div>
                <p className="text-sm font-medium text-white/90 leading-relaxed font-sans">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
