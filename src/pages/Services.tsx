import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Search, Globe, Truck, FileText, Handshake, Shield, CheckCircle2, ArrowRight, Zap, Settings, BarChart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { getServices, getSiteContent } from '@/lib/dynamicContent';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/ui/SEO';

export function ServicesPage() {
  const { t, i18n } = useTranslation();
  const [dynServices, setDynServices] = useState<any[]>([]);
  const [content, setContent] = useState<any>(null);
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    getServices().then(setDynServices);
    getSiteContent().then(setContent);
    window.scrollTo(0, 0);
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
  const seoTitle = content ? (isRtl ? content.servicesSeoTitleAr : content.servicesSeoTitleEn) : null;

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

  const processes = [
    { title: isRtl ? 'تحليل الاحتياجات' : 'Requirement Analysis', icon: Search, desc: isRtl ? 'نفهم متطلباتك وسياق عملك بدقة.' : 'We deeply understand your requirements and business context.' },
    { title: isRtl ? 'التخطيط الاستراتيجي' : 'Strategic Planning', icon: Settings, desc: isRtl ? 'نضع خطة توريد لوجستية مخصصة.' : 'We develop a customized logistics procurement plan.' },
    { title: isRtl ? 'التنفيذ والمتابعة' : 'Execution & Monitoring', icon: Zap, desc: isRtl ? 'إدارة دقيقة لكل مرحلة من مراحل الشحن.' : 'Precise management of every shipping stage.' },
    { title: isRtl ? 'التحسين المستمر' : 'Continuous Optimization', icon: BarChart, desc: isRtl ? 'نقوم بتحليل البيانات لتحسين النتائج المستقبلية.' : 'We analyze data to improve future outcomes.' },
  ];

  return (
    <div className="pt-24 min-h-screen bg-background">
      <SEO title={seoTitle || title} description={description} />
      {/* Page Header */}
      <section className="bg-accent/40 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10 text-center md:text-left max-w-4xl mr-auto ml-0">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest mb-8"
           >
             {isRtl ? 'حلولنا' : 'Our Solutions'}
           </motion.div>
           <motion.h1
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-5xl md:text-7xl font-bold text-primary mb-8 tracking-tighter"
           >
             {title}
           </motion.h1>
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-2xl text-muted-foreground leading-relaxed"
           >
             {description}
           </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border border-border/50 shadow-2xl shadow-primary/5 hover:shadow-secondary/10 transition-all group overflow-hidden bg-background rounded-[2.5rem]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-full translate-x-16 -translate-y-16 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform duration-700" />
                    <CardHeader className="p-10">
                      <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-10 transition-transform group-hover:rotate-12 group-hover:scale-110 duration-500", service.color)}>
                        <Icon className="h-10 w-10" />
                      </div>
                      <CardTitle className="text-3xl font-bold mb-6 group-hover:text-secondary transition-colors tracking-tight">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-lg leading-relaxed text-muted-foreground mb-8">
                        {service.description}
                      </CardDescription>
                      
                      <ul className="space-y-4 mb-10">
                         {[1, 2, 3].map(i => (
                           <li key={i} className="flex items-center gap-3 text-sm font-medium">
                              <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                              <span>{isRtl ? `ميزة الخدمة ${i}` : `Service Benefit ${i}`} - {isRtl ? 'تحسين الأداء والكفاءة' : 'Optimization of performance & efficiency.'}</span>
                           </li>
                         ))}
                      </ul>

                      <div className="pt-6 border-t border-border/50">
                         <button className="flex items-center gap-2 text-secondary font-bold group-hover:gap-4 transition-all">
                            {isRtl ? 'طلب الخدمة الآن' : 'Request This Service'} <ArrowRight className={isRtl ? "rotate-180" : ""} />
                         </button>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
         <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
               <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{isRtl ? 'كيف نعمل؟' : 'How We Work'}</h2>
               <p className="text-xl text-white/70">{isRtl ? 'نتبع نهجاً منهجياً لضمان أفضل النتائج لعملائنا.' : 'We follow a systematic approach to ensure best results for our clients.'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
               {/* Connector Line (Desktop) */}
               <div className="hidden lg:block absolute top-[60px] left-0 w-full h-0.5 bg-white/10" />
               
               {processes.map((p, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.2 }}
                   className="flex flex-col items-center text-center relative"
                 >
                    <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-white mb-8 border-[8px] border-primary z-10 shadow-2xl">
                       <p.icon className="w-10 h-10" />
                    </div>
                    <div className="bg-white/10 p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm h-full">
                       <h4 className="text-xl font-bold mb-4">{p.title}</h4>
                       <p className="text-white/60 leading-relaxed">{p.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
         <div className="container mx-auto px-4">
            <div className="bg-accent/40 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
               <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-bold text-primary mb-8 tracking-tighter">
                     {isRtl ? 'جاهز لتحسين أعمالك؟' : 'Ready to Optimize Your Business?'}
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                     {isRtl ? 'تواصل معنا اليوم وسيقدم لك خبراؤنا أفضل الحلول المتاحة.' : 'Contact us today and our experts will provide you with the best available solutions.'}
                  </p>
                  <button className="bg-primary hover:bg-primary/90 text-white px-12 h-16 rounded-2xl font-bold text-xl shadow-2xl shadow-primary/20 transition-all hover:-translate-y-1">
                     {t('nav.contact')}
                  </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
