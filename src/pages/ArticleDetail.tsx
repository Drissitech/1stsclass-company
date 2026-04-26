import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Markdown from 'react-markdown';
import { SEO } from '@/components/ui/SEO';

export function ArticleDetail() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id === "1") {
      setArticle({
        titleEn: "The Future of Maritime Logistics",
        titleAr: "مستقبل اللوجستيات البحرية",
        contentEn: "Digital transformation is reshaping how we handle global trade and shipping routes.",
        contentAr: "التحول الرقمي يعيد تشكيل كيفية تعاملنا مع التجارة العالمية وخطوط الشحن.",
        imageUrl: "https://images.unsplash.com/photo-1494412574743-019485b7593d?auto=format&fit=crop&q=80&w=800",
        createdAt: { toDate: () => new Date() },
        author: "Ahmed"
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!article) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20">
      <h2 className="text-2xl font-bold mb-4">Article not found</h2>
      <Link to="/blog">
        <Button>Back to Blog</Button>
      </Link>
    </div>
  );

  const title = isRtl ? article.titleAr : article.titleEn;
  const content = isRtl ? article.contentAr : article.contentEn;
  const htmlContent = isRtl ? article.htmlContentAr : article.htmlContentEn;
  const seoTitle = isRtl ? article.seoTitleAr : article.seoTitleEn;
  const seoDescription = isRtl ? article.seoDescriptionAr : article.seoDescriptionEn;
  const seoKeywords = isRtl ? article.seoKeywordsAr : article.seoKeywordsEn;

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <SEO 
        title={seoTitle || title} 
        description={seoDescription || (isRtl ? article.excerptAr : article.excerptEn)} 
        keywords={seoKeywords} 
      />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-video w-full rounded-[3rem] overflow-hidden mb-12 shadow-2xl relative"
          >
            {article.imageUrl ? (
              <img src={article.imageUrl} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-accent flex items-center justify-center">
                 <span className="text-muted-foreground/20 font-black text-6xl rotate-[-10deg]">1ST CLASS</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </motion.div>

          <header className="mb-12 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/blog">
                <Button variant="ghost" className="rounded-full gap-2 border border-border">
                  <ArrowLeft className={isRtl ? "rotate-180" : ""} /> {isRtl ? 'رجوع' : 'Back'}
                </Button>
              </Link>
              <Badge className="bg-secondary text-primary border-none px-4 py-1.5 rounded-full uppercase text-xs font-bold tracking-widest">
                {isRtl ? 'أخبار' : 'News'}
              </Badge>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-primary leading-[1.1] tracking-tighter"
            >
              {title}
            </motion.h1>

            <div className="flex items-center gap-8 py-6 border-y border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold text-lg text-primary border border-border/10">
                  {article.author?.[0] || 'A'}
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">{article.author || 'Admin User'}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Article Author</p>
                </div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-muted-foreground">
                    <Calendar className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-primary">{article.createdAt?.toDate ? format(article.createdAt.toDate(), 'MMMM dd, yyyy') : 'Recently'}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Published On</p>
                 </div>
              </div>
            </div>
          </header>

          <article className="prose prose-lg max-w-none dark:prose-invert">
             {article.isHtml ? (
               <div 
                 className="html-content" 
                 dangerouslySetInnerHTML={{ __html: htmlContent }} 
               />
             ) : (
               <div className="markdown-body">
                 <Markdown>{content}</Markdown>
               </div>
             )}
          </article>
          
          <footer className="mt-20 pt-10 border-t border-border flex justify-between items-center">
             <p className="text-muted-foreground text-sm italic">
               {isRtl ? 'شكراً لقراءتك. شارك هذا المقال مع الآخرين.' : 'Thank you for reading. Feel free to share this article.'}
             </p>
             <Button variant="outline" className="rounded-full gap-2 border-secondary/40 text-secondary hover:bg-secondary hover:text-white">
                <Share2 className="w-4 h-4" /> {isRtl ? 'مشاركة' : 'Share'}
             </Button>
          </footer>
        </div>
      </div>
    </div>
  );
}
