import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from './LanguageToggle';
import { getSiteContent } from '@/lib/dynamicContent';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [content, setContent] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    getSiteContent().then(setContent);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoUrl = content?.logoUrl || "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0642593940.firebasestorage.app/o/logo.png?alt=media";

  const navItems = [
    { name: t('nav.home'), path: '/', type: 'link' },
    { name: t('nav.services'), path: '/#services', type: 'anchor' },
    { name: i18n.language === 'ar' ? 'المدونة' : 'Blog', path: '/blog', type: 'link' },
    { name: t('nav.products'), path: '/#products', type: 'anchor' },
    { name: t('nav.about'), path: '/#about', type: 'anchor' },
    { name: t('nav.contact'), path: '/#contact', type: 'anchor' },
  ];

  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAdminPage) return null;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled 
          ? 'bg-background/80 backdrop-blur-md py-2 border-border' 
          : 'bg-transparent py-4 border-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src={logoUrl} 
            alt="Logo" 
            className="h-12 w-auto group-hover:scale-105 transition-transform"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/00482B/D4AF37?text=1st+Class';
            }}
          />
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight tracking-tight text-deep-green">1ST CLASS</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold">Advanced Co.</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              if (item.type === 'link') {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "text-sm font-medium hover:text-gold transition-colors relative group",
                      isActive ? "text-gold" : "text-foreground"
                    )}
                  >
                    {item.name}
                    <span className={cn("absolute -bottom-1 left-0 h-0.5 bg-gold transition-all group-hover:w-full", isActive ? "w-full" : "w-0")} />
                  </Link>
                );
              }
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className="text-sm font-medium hover:text-gold transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" />
                </a>
              );
            })}
          </div>
          <div className="h-6 w-px bg-border mx-2" />
          <LanguageToggle />
          <Button asChild className="bg-deep-green hover:bg-deep-green/90 text-white shadow-lg shadow-deep-green/20">
            <a href="/#contact">{t('hero.ctaRequest')}</a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground p-2 hover:bg-accent rounded-full transition-colors"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                if (item.type === 'link') {
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-medium p-2 hover:bg-accent rounded-md transition-colors",
                        isActive ? "text-gold bg-accent/50" : ""
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                }
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium p-2 hover:bg-accent rounded-md transition-colors"
                  >
                    {item.name}
                  </a>
                );
              })}
              <Button asChild className="mt-4 w-full bg-deep-green text-white">
                <a href="/#contact" onClick={() => setIsOpen(false)}>{t('hero.ctaRequest')}</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
