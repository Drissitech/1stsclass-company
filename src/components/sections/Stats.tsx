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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100 
              }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 racking-tighter">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-secondary uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
