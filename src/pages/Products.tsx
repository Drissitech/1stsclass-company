import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Package, Box, Factory, Construction, Diamond, Search, Info, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { getProducts, getSiteContent } from '@/lib/dynamicContent';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/ui/SEO';

export function ProductsPage() {
  const { t, i18n } = useTranslation();
  const [dynProducts, setDynProducts] = useState<any[]>([]);
  const [content, setContent] = useState<any>(null);
  const [filter, setFilter] = useState('all');
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    getProducts().then(setDynProducts);
    getSiteContent().then(setContent);
    window.scrollTo(0, 0);
  }, []);

  const staticCategories = [
    { key: 'trading', icon: Package, color: 'text-orange-600 border-orange-200 bg-orange-50' },
    { key: 'rawMaterials', icon: Box, color: 'text-blue-600 border-blue-200 bg-blue-50' },
    { key: 'industrial', icon: Factory, color: 'text-zinc-600 border-zinc-200 bg-zinc-50' },
    { key: 'building', icon: Construction, color: 'text-amber-600 border-amber-200 bg-amber-50' },
    { key: 'special', icon: Diamond, color: 'text-purple-600 border-purple-200 bg-purple-50' },
  ];

  const title = content ? (isRtl ? content.productsTitleAr : content.productsTitleEn) : t('products.title');
  const description = content ? (isRtl ? content.productsTextAr : content.productsTextEn) : t('products.description');
  const seoTitle = content ? (isRtl ? content.productsSeoTitleAr : content.productsSeoTitleEn) : null;

  const filteredProducts = dynProducts; // In a real app we would filter by category

  return (
    <div className="pt-24 min-h-screen bg-background">
      <SEO title={seoTitle || title} description={description} />
      {/* Products Header */}
      <section className="bg-primary text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute -top-24 -left-24 w-96 h-96 border-[40px] border-white rounded-full opacity-20" />
           <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-secondary/40 via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-8 py-3 rounded-full bg-secondary text-white text-sm font-bold uppercase tracking-[0.4em] mb-10 shadow-2xl"
          >
            {isRtl ? 'كتالوج المنتجات' : 'Products Catalog'}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-10 tracking-tighter"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-white/80 max-w-5xl mx-auto leading-tight font-medium"
          >
            {description}
          </motion.p>
          <div className="w-32 h-2 bg-white/20 mx-auto mt-12 rounded-full" />
        </div>
      </section>

      {/* Category Pills */}
      <section className="py-12 bg-accent/20 sticky top-20 z-40 backdrop-blur-md border-b">
        <div className="container mx-auto px-4">
           <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className="rounded-full px-8 shrink-0"
              >
                {isRtl ? 'جيمع المنتجات' : 'All Products'}
              </Button>
              {staticCategories.map(cat => (
                <Button
                  key={cat.key}
                  variant={filter === cat.key ? 'default' : 'outline'}
                  onClick={() => setFilter(cat.key)}
                  className="rounded-full px-8 shrink-0 flex items-center gap-2"
                >
                  <cat.icon className="w-4 h-4" />
                  {t(`products.categories.${cat.key}`)}
                </Button>
              ))}
           </div>
        </div>
      </section>

      {/* Products Display */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
             {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                   <div className="bg-white rounded-[2.5rem] border border-border/50 overflow-hidden shadow-xl shadow-primary/5 hover:shadow-secondary/20 transition-all duration-500 h-full flex flex-col hover:-translate-y-2">
                      <div className="aspect-square relative overflow-hidden bg-accent/30">
                        {product.imageUrl ? (
                           <img src={product.imageUrl} alt={isRtl ? product.nameAr : product.nameEn} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-20 h-20 text-primary opacity-10" />
                           </div>
                        )}
                        <div className="absolute top-6 left-6">
                           <Badge className="bg-white/90 text-primary backdrop-blur-md border-none px-4 rounded-full font-bold">
                              {i18n.language === 'ar' ? 'مميز' : 'Featured'}
                           </Badge>
                        </div>
                      </div>
                      
                      <div className="p-8 flex flex-col flex-1">
                         <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 tracking-tight group-hover:text-secondary transition-colors">
                           {isRtl ? product.nameAr : product.nameEn}
                         </h3>
                         <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-3">
                            {isRtl ? product.descriptionAr : product.descriptionEn}
                         </p>
                         
                         <div className="mt-auto space-y-4">
                            <div className="flex items-center justify-between py-4 border-y border-border/50">
                               <div className="flex flex-col">
                                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{isRtl ? 'السعر التقديري' : 'EST. PRICE'}</span>
                                  <span className="text-secondary font-bold text-lg">{product.price || t('nav.products')}</span>
                               </div>
                               <div className="w-10 h-10 rounded-full border border-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                                  <ArrowUpRight className="w-5 h-5" />
                               </div>
                            </div>
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 font-bold group-hover:shadow-lg shadow-primary/10 transition-all">
                               {isRtl ? 'طلب عرض سعر' : 'Get a Quote'}
                            </Button>
                         </div>
                      </div>
                   </div>
                </motion.div>
             ))}
             
             {/* If no products, show categories again but as info cards */}
             {filteredProducts.length === 0 && staticCategories.map((cat, index) => (
                <motion.div
                   key={cat.key}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.1 }}
                   className="p-10 rounded-[2.5rem] bg-white border border-border/50 shadow-xl shadow-primary/5 hover:border-secondary/30 transition-all text-center flex flex-col items-center"
                >
                   <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-8", cat.color)}>
                      <cat.icon className="h-10 w-10" />
                   </div>
                   <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight">{t(`products.categories.${cat.key}`)}</h3>
                   <p className="text-muted-foreground mb-8 text-sm">
                      {isRtl 
                        ? 'منتجات عالية الجودة يتم تأمينها من أفضل المصادر العالمية مع ضمان الجودة.' 
                        : 'High-quality products sourced from the best global suppliers with guaranteed quality.'}
                   </p>
                   <Button variant="outline" className="mt-auto rounded-xl border-secondary/30 text-secondary hover:bg-secondary hover:text-white">
                      {isRtl ? 'استعراض القسم' : 'Browse Category'}
                   </Button>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Trust & Quality Section */}
      <section className="py-24 bg-accent/20">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { title: isRtl ? 'معايير جودة عالية' : 'High Quality Standards', icon: ShieldCheck, desc: isRtl ? 'جميع منتجاتنا تخضع لعمليات فحص صارمة قبل الشحن.' : 'All our products undergo rigorous inspection processes before shipping.' },
                 { title: isRtl ? 'توصيل سريع' : 'Fast Delivery', icon: Zap, desc: isRtl ? 'نحن نضمن وصول شحناتك في أسرع وقت ممكن وبأعلى أمان.' : 'We ensure your shipments arrive as quickly as possible with maximum safety.' },
                 { title: isRtl ? 'دعم فني متخصص' : 'Expert Support', icon: Info, desc: isRtl ? 'فريقنا متاح دائماً للإجابة على استفساراتك الفنية والتجارية.' : 'Our team is always available to answer your technical and commercial inquiries.' }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-8">
                       <item.icon className="w-8 h-8 text-secondary" />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-primary mb-4 tracking-tight">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                       {item.desc}
                    </p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
