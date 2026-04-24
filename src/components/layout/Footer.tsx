import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getSiteContent, getGlobalSettings } from '@/lib/dynamicContent';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    getSiteContent().then(setContent);
    getGlobalSettings().then(setSettings);
  }, []);

  const logoUrl = content?.logoUrl || "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0642593940.firebasestorage.app/o/logo.png?alt=media";
  const subtext = content ? (isRtl ? content.footerTextAr : content.footerTextEn) : '';
  const phone = settings?.phone || '+966 506963669';
  const email = settings?.email || 'info@1stclass.com.sa';
  const address = isRtl 
    ? (settings?.addressAr || 'الرياض، المملكة العربية السعودية')
    : (settings?.addressEn || 'Riyadh, Saudi Arabia');

  return (
    <footer className="bg-deep-green text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <img src={logoUrl} alt="Logo" className="h-16 w-auto brightness-0 invert" />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs whitespace-pre-wrap">
              {subtext || t('hero.subheadline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-bold mb-6 text-lg tracking-wider uppercase text-xs">{t('nav.services')}</h4>
            <ul className="space-y-4 text-white/70 text-sm">
              <li><Link to="/#services" className="hover:text-gold transition-colors">{t('nav.services')}</Link></li>
              <li><Link to="/#products" className="hover:text-gold transition-colors">{t('nav.products')}</Link></li>
              <li><Link to="/#about" className="hover:text-gold transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/blog" className="hover:text-gold transition-colors">Blog & News</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-gold font-bold mb-6 text-lg tracking-wider uppercase text-xs">{isRtl ? 'اتصل بنا' : 'Contact Us'}</h4>
            <ul className="space-y-4 text-white/70 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <span>{email}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <span dir="ltr">{phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold" />
                <span>{address}</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gold font-bold mb-6 text-lg tracking-wider uppercase text-xs">{isRtl ? 'قانوني' : 'Legal'}</h4>
            <ul className="space-y-4 text-white/70 text-sm">
              <li><Link to="/privacy" className="hover:text-gold transition-colors">{isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link></li>
              <li><Link to="/terms" className="hover:text-gold transition-colors">{isRtl ? 'شروط الخدمة' : 'Terms of Service'}</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-xs text-center">
          <p>© {new Date().getFullYear()} First Class Advanced Co. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/#hero" className="hover:text-white transition-colors">Home</Link>
            <Link to="/admin" className="hover:text-white transition-colors">Admin Console</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
