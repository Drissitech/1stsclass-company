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

  const logoUrl = content?.logoUrl || "/logo.png";
  const subtext = content ? (isRtl ? content.footerTextAr : content.footerTextEn) : '';
  const phone = settings?.phone || '+966 506963669';
  const email = settings?.email || 'info@1stclass.com.sa';
  const address = isRtl 
    ? (settings?.addressAr || 'الرياض، المملكة العربية السعودية')
    : (settings?.addressEn || 'Riyadh, Saudi Arabia');

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logoUrl} alt="Logo" className="h-10 md:h-12 w-auto object-contain rounded-full" />
            <p className="text-white/60 text-xs leading-relaxed max-w-xs whitespace-pre-wrap">
              {subtext || t('hero.subheadline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-secondary font-bold mb-4 tracking-wider uppercase text-[10px]">{t('nav.services')}</h4>
            <ul className="space-y-2 text-white/70 text-xs">
              <li><Link to="/services" className="hover:text-secondary transition-colors">{t('nav.services')}</Link></li>
              <li><Link to="/products" className="hover:text-secondary transition-colors">{t('nav.products')}</Link></li>
              <li><Link to="/about" className="hover:text-secondary transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/blog" className="hover:text-secondary transition-colors">Blog & News</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-secondary font-bold mb-4 tracking-wider uppercase text-[10px]">{isRtl ? 'اتصل بنا' : 'Contact Us'}</h4>
            <ul className="space-y-2 text-white/70 text-xs">
              <li className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 text-secondary" />
                <span>{email}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-3.5 h-3.5 text-secondary" />
                <span dir="ltr">{phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-3.5 h-3.5 text-secondary" />
                <span>{address}</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-secondary font-bold mb-4 tracking-wider uppercase text-[10px]">{isRtl ? 'قانوني' : 'Legal'}</h4>
            <ul className="space-y-2 text-white/70 text-xs">
              <li><Link to="/privacy" className="hover:text-secondary transition-colors">{isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link></li>
              <li><Link to="/terms" className="hover:text-secondary transition-colors">{isRtl ? 'شروط الخدمة' : 'Terms of Service'}</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-[10px] text-center">
          <p>© {new Date().getFullYear()} First Class Advanced Co. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/admin" className="hover:text-white transition-colors">Admin Console</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
