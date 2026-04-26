import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Search, Globe, Truck, FileText, Handshake, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { getServices, getSiteContent } from '@/lib/dynamicContent';
import { cn } from '@/lib/utils';

export function Services() {
  const { t, i18n } = useTranslation();
  const [dynServices, setDynServices] = useState<any[]>([]);
  const [content, setContent] = useState<any>(null);
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    getServices().then(setDynServices);
    getSiteContent().then(setContent);
  }, []);

  const staticServices = [
    { key: 'internationalSourcing', icon: Search, color: 'bg-primary/10 text-primary' },
    { key: 'importExport', icon: Globe, color: 'bg-secondary/10 text-secondary' },
    { key: 'shippingLogistics', icon: Truck, color: 'bg-primary/10 text-primary' },
    { key: 'poManagement', icon: FileText, color: 'bg-secondary/10 text-secondary' },
    { key: 'relationshipDev', icon: Handshake, color: 'bg-primary/10 text-primary' },
  ];

  const title = content ? (isRtl ? content.servicesTitleAr : content.servicesTitleEn) : t('services.title');
  const description = content ? (isRtl ? content.servicesTextAr : content.servicesTextEn) : t('services.description');

  const displayServices = dynServices.length > 0 
    ? dynServices.map(s => ({ 
        title: isRtl ? s.titleAr : s.titleEn,
        description: isRtl ? s.descriptionAr : s.descriptionEn,
        icon: Shield,
        color: 'bg-secondary/10 text-secondary shadow-lg shadow-secondary/5'
      }))
    : staticServices.map(s => ({
        title: t(`services.list.${s.key}.title`),
        description: t(`services.list.${s.key}.description`),
        icon: s.icon,
        color: s.color
      }));

  return (
    <section id="services" className="py-24 bg-accent/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-primary mb-6"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground whitespace-pre-wrap"
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-none shadow-xl shadow-primary/5 hover:shadow-secondary/10 transition-all group overflow-hidden bg-background">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform duration-500" />
                  <CardHeader>
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", service.color)}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl font-bold mb-4 group-hover:text-secondary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a 
            href="/services" 
            className="inline-flex items-center gap-2 bg-secondary text-white px-10 py-4 rounded-xl font-bold hover:bg-secondary/90 transition-all shadow-xl shadow-secondary/20"
          >
            {isRtl ? 'عرض جميع الخدمات' : 'See All Services'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
