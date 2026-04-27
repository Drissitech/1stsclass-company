import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { getSiteContent, getGlobalSettings } from '@/lib/dynamicContent';
import { cn } from '@/lib/utils';

interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export function ContactForm() {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  useEffect(() => {
    getSiteContent().then(setContent);
    getGlobalSettings().then(setSettings);
  }, []);

  const isRtl = i18n.language === 'ar';

  const title = content ? (isRtl ? content.contactTitleAr : content.contactTitleEn) : t('contact.title');
  const description = content ? (isRtl ? content.contactTextAr : content.contactTextEn) : (isRtl 
    ? 'يسعدنا استقبال استفساراتكم وطلباتكم التجارية في أي وقت. فريقنا جاهز لخدمتكم بكل احترافية واهتمام.' 
    : 'We are happy to receive your inquiries and commercial requests at any time. Our team is ready to serve you with professionalism and care.');

  const phone = settings?.phone || '+966 506963669';
  const email = settings?.email || 'info@1stclass.com.sa';
  const address = isRtl 
    ? (settings?.addressAr || 'طريق الملك عبدالله – حي الفيحاء – برج إعمار – الدور الأول')
    : (settings?.addressEn || 'King Abdullah Road – Al-Fayhaa – Emaar Tower – 1st Floor');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log("Mock data submitted:", data);
      toast.success(i18n.language === 'ar' ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!');
      reset();
    } catch (error) {
      console.error(error);
      toast.error(i18n.language === 'ar' ? 'حدث خطأ ما. يرجى المحاولة مرة أخرى.' : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Centered Heading for Contact */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground whitespace-pre-wrap max-w-3xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
          <div className="w-32 h-2 bg-secondary mx-auto mt-10 rounded-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: i18n.language === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-10">
              <div className="flex items-start gap-8">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 shadow-lg">
                  <Phone className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">{t('contact.info.phone')}</h4>
                  <p className="text-base text-muted-foreground font-medium" dir="ltr">{phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-8">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 shadow-lg">
                  <Mail className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">{t('contact.info.email')}</h4>
                  <p className="text-base text-muted-foreground font-medium">{email}</p>
                </div>
              </div>
              <div className="flex items-start gap-8">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 shadow-lg">
                  <MapPin className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">{t('contact.info.address')}</h4>
                  <p className="text-base text-muted-foreground font-medium leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-12 bg-primary rounded-[3rem] text-white relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/20 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-1000" />
               <h3 className="text-3xl font-bold mb-6 relative z-10">{t('hero.ctaStart')}</h3>
               <p className="text-lg opacity-80 mb-10 relative z-10 leading-relaxed max-w-md">
                 {i18n.language === 'ar' 
                   ? 'ابدأ اليوم شراكة استراتيجية تدعم نمو أعمالك وتحقق تطلعاتك التجارية.' 
                   : 'Start a strategic partnership today that supports your business growth and fulfills your commercial aspirations.'}
               </p>
               <Button size="lg" className="bg-white text-primary hover:bg-secondary hover:text-white h-14 px-10 rounded-full transition-all relative z-10 font-bold text-lg">
                  {t('contact.info.whatsapp')}
               </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: i18n.language === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-accent/10 p-10 md:p-16 rounded-[4rem] border border-border shadow-2xl shadow-primary/5"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-lg font-bold ml-1">{t('contact.form.name')}</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    {...register('name', { required: true })} 
                    className={cn("h-16 text-lg px-6 rounded-2xl bg-background border-2", errors.name ? 'border-destructive' : 'border-border focus:border-secondary transition-colors')}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="company" className="text-lg font-bold ml-1">{t('contact.form.company')}</Label>
                  <Input id="company" placeholder="Example Co." {...register('company')} className="h-16 text-lg px-6 rounded-2xl bg-background border-2 border-border focus:border-secondary transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-lg font-bold ml-1">{t('contact.form.email')}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })} 
                    className={cn("h-16 text-lg px-6 rounded-2xl bg-background border-2", errors.email ? 'border-destructive' : 'border-border focus:border-secondary transition-colors')}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-lg font-bold ml-1">{t('contact.form.phone')}</Label>
                  <Input id="phone" placeholder="+966..." {...register('phone')} className="h-16 text-lg px-6 rounded-2xl bg-background border-2 border-border focus:border-secondary transition-colors" />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="service" className="text-lg font-bold ml-1">{t('contact.form.service')}</Label>
                <Input id="service" placeholder={t('services.title')} {...register('service')} className="h-16 text-lg px-6 rounded-2xl bg-background border-2 border-border focus:border-secondary transition-colors" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="message" className="text-lg font-bold ml-1">{t('contact.form.message')}</Label>
                <Textarea 
                  id="message" 
                  rows={6} 
                  placeholder="..." 
                  {...register('message', { required: true })} 
                  className={cn("text-lg p-6 rounded-3xl bg-background border-2", errors.message ? 'border-destructive' : 'border-border focus:border-secondary transition-colors')}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-secondary hover:bg-secondary/90 text-white h-16 text-xl font-bold rounded-2xl shadow-2xl shadow-secondary/20 transition-all active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                     <Send className="h-8 w-8" />
                  </motion.div>
                ) : (
                  <>
                    <Send className={cn("mr-3 h-7 w-7", i18n.language === 'ar' && "ml-3 mr-0")} />
                    {t('contact.form.send')}
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
