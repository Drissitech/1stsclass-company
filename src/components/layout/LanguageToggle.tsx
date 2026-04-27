import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LanguageToggle({ scrolled }: { scrolled?: boolean }) {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage} 
      className={cn(
        "transition-colors flex items-center gap-1",
        scrolled ? "text-primary hover:bg-primary/5" : "text-white hover:bg-white/10"
      )}
    >
      <Languages className="h-4 w-4" />
      <span className="sr-only">Toggle Language</span>
      <span className="text-xs font-bold">{i18n.language === 'ar' ? 'EN' : 'عربي'}</span>
    </Button>
  );
}
