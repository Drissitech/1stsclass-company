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

  const logoUrl = content?.logoUrl || "/logo.png";

  const navItems = [
    { name: t('nav.home'), path: '/', type: 'link' },
    { name: t('nav.services'), path: '/services', type: 'link' },
    { name: i18n.language === 'ar' ? 'المدونة' : 'Blog', path: '/blog', type: 'link' },
    { name: t('nav.products'), path: '/products', type: 'link' },
    { name: t('nav.about'), path: '/about', type: 'link' },
    { name: t('nav.contact'), path: '/contact', type: 'link' },
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
            className="h-14 w-auto group-hover:scale-105 transition-transform"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/120x120/151543/C0822F?text=1st+Class';
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium hover:text-secondary transition-colors relative group",
                    isActive ? "text-secondary" : "text-foreground"
                  )}
                >
                  {item.name}
                  <span className={cn("absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all group-hover:w-full", isActive ? "w-full" : "w-0")} />
                </Link>
              );
            })}
          </div>
          <div className="h-6 w-px bg-border mx-2" />
          <LanguageToggle />
          <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
            <Link to="/contact">{t('hero.ctaRequest')}</Link>
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
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium p-2 hover:bg-accent rounded-md transition-colors",
                      isActive ? "text-secondary bg-accent/50" : ""
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Button asChild className="mt-4 w-full bg-primary text-white">
                <Link to="/contact" onClick={() => setIsOpen(false)}>{t('hero.ctaRequest')}</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
