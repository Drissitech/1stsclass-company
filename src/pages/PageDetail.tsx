import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/ui/SEO';

export function PageDetail() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      // Mock static pages
      const STATIC_PAGES: Record<string, any> = {
        'privacy-policy': {
          titleEn: 'Privacy Policy',
          titleAr: 'سياسة الخصوصية',
          contentEn: 'We value your privacy...',
          contentAr: 'نحن نقدر خصوصيتك...',
        }
      };
      setPage(STATIC_PAGES[slug] || null);
      setLoading(false);
    }
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!page) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20">
      <h2 className="text-2xl font-bold mb-4">Page not found</h2>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );

  const title = isRtl ? page.titleAr : page.titleEn;
  const content = isRtl ? page.contentAr : page.contentEn;
  const seoTitle = isRtl ? page.seoTitleAr : page.seoTitleEn;
  const seoDescription = isRtl ? page.seoDescriptionAr : page.seoDescriptionEn;

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <SEO 
        title={seoTitle || title} 
        description={seoDescription} 
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 space-y-6">
            <Link to="/">
              <Button variant="ghost" className="rounded-full gap-2 border border-border">
                <ArrowLeft className={isRtl ? "rotate-180" : ""} /> {isRtl ? 'الرئيسية' : 'Home'}
              </Button>
            </Link>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-primary leading-[1.1] tracking-tighter"
            >
              {title}
            </motion.h1>
          </header>

          <article className="prose prose-lg max-w-none dark:prose-invert whitespace-pre-wrap">
             {content}
          </article>
        </div>
      </div>
    </div>
  );
}
