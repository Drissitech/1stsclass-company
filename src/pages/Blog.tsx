import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Blog() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'articles'), 
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snap) => {
      setArticles(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-32 bg-accent/10 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-deep-green mb-6 tracking-tighter"
          >
            {isRtl ? 'أخبارنا ومقالاتنا' : 'Latest News & Insights'}
          </motion.h1>
          <p className="text-xl text-muted-foreground">
            {isRtl ? 'تابع آخر مستجدات التجارة الدولية واللوجستيات.' : 'Stay updated with the latest in international trade and logistics.'}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
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
                  <Card className="h-full border-none shadow-xl shadow-deep-green/5 hover:shadow-gold/10 transition-all rounded-[2rem] overflow-hidden group">
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
                       <Badge className="absolute top-4 left-4 bg-white/90 text-deep-green backdrop-blur-md border-none px-4 rounded-full">
                          {isRtl ? 'مقالات' : 'Article'}
                       </Badge>
                    </div>
                    <CardHeader className="pt-6">
                       <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.createdAt?.toDate ? format(article.createdAt.toDate(), 'PP') : 'Recently'}</span>
                          <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author || 'Admin'}</span>
                       </div>
                       <CardTitle className="text-2xl font-bold group-hover:text-gold transition-colors leading-tight">
                         {isRtl ? article.titleAr : article.titleEn}
                       </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-muted-foreground text-sm line-clamp-3 mb-6 leading-relaxed">
                         {isRtl ? article.contentAr : article.contentEn}
                       </p>
                       <div className="flex items-center gap-2 text-gold font-bold text-sm uppercase tracking-tighter group-hover:gap-4 transition-all">
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
