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
  const isHomePage = location.pathname === '/';

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        (scrolled || !isHomePage) 
          ? 'bg-white py-2 shadow-xl border-b border-border/50' 
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex items-center">
        <Link to="/" className="flex items-center group shrink-0">
          <img 
            src={logoUrl} 
            alt="1st Class Advanced Co" 
            className="h-10 md:h-14 w-auto group-hover:scale-105 transition-all duration-500 rounded-full object-contain filter drop-shadow-md"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=1st+Class&background=151543&color=C0822F&bold=true&rounded=true';
            }}
          />
        </Link>

        {/* Desktop Nav - Centered */}
        <div className="hidden md:flex items-center justify-center flex-1 px-8">
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-[12px] font-bold transition-all relative group uppercase tracking-[0.1em]",
                    isActive 
                      ? "text-secondary" 
                      : ((scrolled || !isHomePage) ? "text-primary" : "text-white"),
                    "hover:text-secondary"
                  )}
                >
                  {item.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Desktop Actions - Right */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <div className={cn("h-6 w-px mx-2 transition-colors", (scrolled || !isHomePage) ? "bg-border" : "bg-white/20")} />
          <LanguageToggle scrolled={scrolled || !isHomePage} />
          <Button asChild className="bg-secondary hover:bg-primary text-white border-none shadow-lg shadow-secondary/10 transition-all duration-300 font-bold px-6 h-10 text-[10px] uppercase tracking-widest rounded-full">
            <Link to="/contact">{t('hero.ctaRequest')}</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4 ml-auto">
          <LanguageToggle scrolled={scrolled || !isHomePage} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "p-2 hover:bg-accent/10 rounded-full transition-colors",
              (scrolled || !isHomePage) ? "text-primary" : "text-white"
            )}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
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
                      "text-xl font-bold p-3 hover:bg-secondary/10 rounded-xl transition-all flex items-center justify-center",
                      isActive ? "text-secondary bg-secondary/5" : "text-secondary"
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
