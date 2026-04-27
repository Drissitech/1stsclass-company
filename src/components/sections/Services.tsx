import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Search, Globe, Truck, FileText, Handshake, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
        {/* Centered Heading */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground whitespace-pre-wrap max-w-3xl mx-auto"
          >
            {description}
          </motion.p>
          <div className="w-20 h-1.5 bg-secondary mx-auto mt-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
          {displayServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full border-none shadow-2xl shadow-primary/5 hover:shadow-secondary/20 transition-all duration-500 group overflow-hidden bg-background p-4 rounded-[2.5rem]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full translate-x-16 -translate-y-16 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform duration-700" />
                  <CardHeader className="p-6">
                    <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-all group-hover:bg-primary group-hover:text-white shadow-lg", service.color)}>
                      <Icon className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-4 group-hover:text-secondary transition-colors leading-tight">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-lg leading-relaxed text-muted-foreground/90">
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
          <Button asChild size="lg" className="h-16 px-12 rounded-full font-bold text-xl shadow-xl shadow-secondary/20">
            <a href="/services">
              {isRtl ? 'عرض جميع الخدمات' : 'See All Services'}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
