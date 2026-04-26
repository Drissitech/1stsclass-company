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
    <section id="contact" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: i18n.language === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">{title}</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-lg whitespace-pre-wrap">
              {description}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{t('contact.info.phone')}</h4>
                  <p className="text-muted-foreground" dir="ltr">{phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{t('contact.info.email')}</h4>
                  <p className="text-muted-foreground">{email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{t('contact.info.address')}</h4>
                  <p className="text-muted-foreground">
                    {address}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-primary rounded-3xl text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full translate-x-10 -translate-y-10 group-hover:scale-125 transition-transform duration-700" />
               <h3 className="text-2xl font-bold mb-4 relative z-10">{t('hero.ctaStart')}</h3>
               <p className="opacity-80 mb-6 relative z-10">
                 {i18n.language === 'ar' 
                   ? 'ابدأ اليوم شراكة استراتيجية تدعم نمو أعمالك.' 
                   : 'Start a strategic partnership today that supports your business growth.'}
               </p>
               <Button className="bg-white text-primary hover:bg-secondary hover:text-white border-none transition-all relative z-10 font-bold">
                  {t('contact.info.whatsapp')}
               </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: i18n.language === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-accent/20 p-8 md:p-12 rounded-[2.5rem] border border-border shadow-2xl shadow-primary/5"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('contact.form.name')}</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    {...register('name', { required: true })} 
                    className={errors.name ? 'border-destructive' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">{t('contact.form.company')}</Label>
                  <Input id="company" placeholder="Example Co." {...register('company')} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('contact.form.email')}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })} 
                    className={errors.email ? 'border-destructive' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                  <Input id="phone" placeholder="+966..." {...register('phone')} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">{t('contact.form.service')}</Label>
                <Input id="service" placeholder={t('services.title')} {...register('service')} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t('contact.form.message')}</Label>
                <Textarea 
                  id="message" 
                  rows={5} 
                  placeholder="..." 
                  {...register('message', { required: true })} 
                  className={errors.message ? 'border-destructive' : ''}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-secondary hover:bg-secondary/90 text-white h-14 text-lg font-bold rounded-xl shadow-lg shadow-secondary/20"
              >
                {isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                     ...
                  </motion.div>
                ) : (
                  <>
                    <Send className={cn("mr-2 h-5 w-5", i18n.language === 'ar' && "ml-2 mr-0")} />
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
