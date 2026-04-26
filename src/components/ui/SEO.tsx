import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export function SEO({ title, description, keywords }: SEOProps) {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    if (title) {
      document.title = `${title} | First Class Advanced Co.`;
    } else {
      document.title = i18n.language === 'ar' 
        ? 'شركة الدرجة الأولى المتقدمة - التجارة الدولية والتوريد'
        : 'First Class Advanced Co. - International Trade & Sourcing';
    }

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (description) {
      updateMetaTag('description', description);
    }
    
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }
  }, [title, description, keywords, i18n.language]);

  return null;
}
