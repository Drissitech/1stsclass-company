import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/ui/SEO';

export function Blog() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setArticles([
      {
        id: "1",
        titleEn: "The Future of Maritime Logistics",
        titleAr: "مستقبل اللوجستيات البحرية",
        contentEn: "Digital transformation is reshaping how we handle global trade and shipping routes.",
        contentAr: "التحول الرقمي يعيد تشكيل كيفية تعاملنا مع التجارة العالمية وخطوط الشحن.",
        imageUrl: "https://images.unsplash.com/photo-1494412574743-019485b7593d?auto=format&fit=crop&q=80&w=800",
        createdAt: { toDate: () => new Date() },
        author: "Ahmed"
      }
    ]);
  }, []);

  return (
    <section className="py-32 bg-accent/10 min-h-screen">
      <SEO 
        title={isRtl ? 'المدونة - أخبارنا ومقالاتنا' : 'Blog - Latest News & Insights'} 
        description={isRtl ? 'اطلع على آخر الأخبار والمقالات المتخصصة في التجارة الدولية.' : 'Explore our latest articles and insights on international trade.'} 
      />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tighter"
          >
            {isRtl ? 'أخبارنا ومقالاتنا' : 'Latest News & Insights'}
          </motion.h1>
          <p className="text-xl text-muted-foreground">
            {isRtl ? 'تابع آخر مستجدات التجارة الدولية واللوجستيات.' : 'Stay updated with the latest in international trade and logistics.'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/blog/${article.id}`}>
                  <Card className="h-full border-none shadow-xl shadow-primary/5 hover:shadow-secondary/10 transition-all rounded-[2rem] overflow-hidden group">
                    <div className="aspect-[16/10] bg-accent relative overflow-hidden">
                       {article.imageUrl ? (
                         <img 
                           src={article.imageUrl} 
                           alt={article.titleEn} 
                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                         />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center">
                            <span className="text-muted-foreground opacity-20 font-bold text-4xl italic">LOGISTICS</span>
                         </div>
                       )}
                       <Badge className="absolute top-4 left-4 bg-white/90 text-primary backdrop-blur-md border-none px-4 rounded-full">
                          {isRtl ? 'مقالات' : 'Article'}
                       </Badge>
                    </div>
                    <CardHeader className="pt-6">
                       <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.createdAt?.toDate ? format(article.createdAt.toDate(), 'PP') : 'Recently'}</span>
                          <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author || 'Admin'}</span>
                       </div>
                       <CardTitle className="text-2xl font-bold group-hover:text-secondary transition-colors leading-tight">
                         {isRtl ? article.titleAr : article.titleEn}
                       </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-muted-foreground text-sm line-clamp-3 mb-6 leading-relaxed">
                         {isRtl ? article.contentAr : article.contentEn}
                       </p>
                       <div className="flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-tighter group-hover:gap-4 transition-all">
                          {isRtl ? 'اقرأ المزيد' : 'Read Article'} <ArrowRight className={cn("w-4 h-4", isRtl && "rotate-180")} />
                       </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ArticleDetail() {
  // Simple implementation for detail view
  return null; 
}
