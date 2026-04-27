import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { getSiteContent } from '@/lib/dynamicContent';

export function Stats() {
  const { t } = useTranslation();
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    getSiteContent().then(setContent);
  }, []);

  const stats = [
    { value: content?.statsShipments || '500+', label: t('stats.shiptments') },
    { value: content?.statsPartners || '20+', label: t('stats.partners') },
    { value: content?.statsSatisfaction || '98%', label: t('stats.satisfaction') },
    { value: content?.statsExperience || '15+', label: t('stats.experience') },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100 
              }}
              className="text-center group"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-2 tracking-tighter group-hover:text-secondary group-hover:scale-105 transition-all duration-500">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-black text-muted-foreground uppercase tracking-[0.2em] transition-colors group-hover:text-primary">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
