import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ShieldCheck, Target, Zap, Users, Gem, Handshake, Award, Briefcase, Globe2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSiteContent } from '@/lib/dynamicContent';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/ui/SEO';

export function AboutPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    getSiteContent().then(setContent);
    window.scrollTo(0, 0);
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
  const seoTitle = content ? (isRtl ? content.aboutSeoTitleAr : content.aboutSeoTitleEn) : null;
  const seoDescription = content ? (isRtl ? content.aboutSeoDescriptionAr : content.aboutSeoDescriptionEn) : null;

  return (
    <div className="pt-24 min-h-screen bg-background">
      <SEO title={seoTitle || title} description={seoDescription || description} />
      {/* Hero Section for About Page */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent scale-150" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter"
          >
            {title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1.5 bg-secondary mx-auto mb-8 rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/80 max-w-2xl mx-auto font-medium"
          >
            {isRtl 
              ? 'نحن شريكك الاستراتيجي في سلاسل الإمداد العالمية، ملتزمون بالتميز والابتكار.' 
              : 'Your strategic partner in global supply chains, committed to excellence and innovation.'}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className={cn("aspect-[4/5] rounded-[3rem] bg-accent/20 overflow-hidden shadow-2xl relative", !aboutImage && "flex items-center justify-center p-20")}>
                <img 
                  src={aboutImage || logoUrl} 
                  alt="Company" 
                  className={cn("w-full h-full object-cover transition-transform duration-700 hover:scale-105", !aboutImage && "object-contain brightness-0 invert opacity-20")}
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[3rem]" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-secondary p-10 rounded-[2.5rem] shadow-2xl hidden lg:block">
                 <div className="flex flex-col items-center">
                    <span className="text-white font-bold text-5xl mb-1 tracking-tighter">15+</span>
                    <span className="text-white/80 text-xs uppercase tracking-[0.2em] font-bold">
                       {isRtl ? 'عاماً من الخبرة' : 'Years of Experience'}
                    </span>
                 </div>
              </div>
            </motion.div>

            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-bold text-sm tracking-widest uppercase">
                 <Briefcase className="w-4 h-4" />
                 {isRtl ? 'قصتنا' : 'Our Story'}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                 {isRtl ? 'ريادة في إدارة المشتريات وسلاسل الإمداد' : 'Leadership in Procurement & Supply Chain'}
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p className="whitespace-pre-wrap">
                  {description || t('about.description')}
                </p>
                <p>
                  {isRtl 
                    ? 'منذ انطلاقتنا، ركزنا على بناء جسور من الثقة بين الموردين والعملاء، مع تحسين دائم للعمليات التشغيلية لضمان أعلى مستويات الكفاءة.'
                    : 'Since our inception, we have focused on building bridges of trust between suppliers and customers, with constant optimization of operational processes to ensure maximum efficiency.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-primary">{isRtl ? 'حضور عالمي' : 'Global Presence'}</h4>
                  <p className="text-sm text-muted-foreground">{isRtl ? 'نعمل في أكثر من 20 دولة.' : 'Operating in over 20 countries.'}</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-primary">{isRtl ? 'جودة مضمونة' : 'Quality Guaranteed'}</h4>
                  <p className="text-sm text-muted-foreground">{isRtl ? 'معايير صارمة لفحص المنتجات.' : 'Strict standards for product inspection.'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 bg-primary text-white rounded-[3rem] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
              <Target className="w-16 h-16 text-secondary mb-8" />
              <h3 className="text-3xl font-bold mb-6">{t('about.vision')}</h3>
              <p className="text-xl text-white/70 leading-relaxed">
                {vision}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-12 bg-background border-2 border-primary/10 rounded-[3rem] relative overflow-hidden group"
            >
              <Zap className="w-16 h-16 text-secondary mb-8" />
              <h3 className="text-3xl font-bold text-primary mb-6">{t('about.mission')}</h3>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {mission}
              </p>
            </motion.div>
          </div>

          {/* Core Values Section */}
          <div className="text-center mb-16">
             <h2 className="text-4xl font-bold text-primary mb-4">{isRtl ? 'قيمنا الجوهرية' : 'Our Core Values'}</h2>
             <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center gap-4 text-center group"
                >
                  <div className="w-20 h-20 rounded-[2rem] bg-white border border-border shadow-xl shadow-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:-translate-y-2 transition-all duration-300">
                    <Icon className="h-10 w-10" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">{t(`about.values.${value.key}`)}</h4>
                    <div className="w-8 h-0.5 bg-secondary/30 mx-auto" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats/Achievements Section */}
      <section className="py-24 bg-accent/20">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
               {[
                 { label: isRtl ? 'عملاء راضون' : 'Happy Clients', value: '500+', icon: Users },
                 { label: isRtl ? 'مشاريع مكتملة' : 'Projects Done', value: '1,200+', icon: Briefcase },
                 { label: isRtl ? 'جوائز التميز' : 'Excellence Awards', value: '25+', icon: Award },
                 { label: isRtl ? 'فريق خبير' : 'Expert Team', value: '45+', icon: Globe2 },
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-6">
                       <item.icon className="w-8 h-8 text-secondary" />
                    </div>
                    <div className="text-4xl font-bold text-primary mb-2">{item.value}</div>
                    <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{item.label}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
