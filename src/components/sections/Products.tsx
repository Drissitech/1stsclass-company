import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Package, Box, Factory, Construction, Diamond } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { getProducts, getSiteContent } from '@/lib/dynamicContent';
import { cn } from '@/lib/utils';

export function Products() {
  const { t, i18n } = useTranslation();
  const [dynProducts, setDynProducts] = useState<any[]>([]);
  const [content, setContent] = useState<any>(null);
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    getProducts().then(setDynProducts);
    getSiteContent().then(setContent);
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

  const hasDynamicProducts = dynProducts.length > 0;

  return (
    <section id="products" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Centered Heading */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground whitespace-pre-wrap max-w-3xl mx-auto"
          >
            {description}
          </motion.p>
          <div className="w-24 h-1.5 bg-secondary mx-auto mt-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
           {hasDynamicProducts ? (
             dynProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                   <div className="absolute inset-0 bg-secondary/5 rounded-[3rem] transform translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                   <div className="relative bg-white border border-border overflow-hidden rounded-[3rem] h-full flex flex-col shadow-2xl shadow-primary/5 group-hover:border-secondary/50 transition-all duration-500">
                      <div className="aspect-[4/3] bg-accent relative overflow-hidden">
                         <img src={product.imageUrl} alt={isRtl ? product.nameAr : product.nameEn} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <div className="p-8 flex flex-col flex-1 items-start">
                         <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                           {isRtl ? product.nameAr : product.nameEn}
                         </h3>
                         <p className="text-muted-foreground text-base leading-relaxed mb-8 line-clamp-3">
                            {isRtl ? product.descriptionAr : product.descriptionEn}
                         </p>
                         <div className="mt-auto pt-6 flex items-center justify-between w-full border-t border-border">
                            <span className="text-secondary font-bold text-lg">{product.price || t('nav.products')}</span>
                            <Badge variant="outline" className="border-secondary/30 text-secondary uppercase tracking-[0.2em] px-4 py-1.5 text-[10px] font-bold">
                               {t('nav.products')}
                            </Badge>
                         </div>
                      </div>
                   </div>
                </motion.div>
             ))
           ) : (
             staticCategories.map((cat, index) => {
               const Icon = cat.icon;
               return (
                 <motion.div
                   key={cat.key}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: index * 0.1 }}
                   className="group relative"
                 >
                    <div className="absolute inset-0 bg-gold/5 rounded-2xl transform translate-x-1.5 translate-y-1.5 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                    <div className="relative bg-white border border-border p-6 rounded-2xl h-full flex flex-col items-center text-center shadow-lg shadow-primary/5 group-hover:border-secondary/50 transition-colors">
                       <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", cat.color)}>
                          <Icon className="h-6 w-6" />
                       </div>
                       <h3 className="text-lg font-bold text-primary mb-3">
                         {t(`products.categories.${cat.key}`)}
                       </h3>
                       <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                         {i18n.language === 'ar' ? 'نحن نوفر أفضل الحلول لتأمين هذه المنتجات.' : 'We provide the best solutions to secure these products.'}
                       </p>
                       <Badge variant="outline" className="mt-auto border-secondary/30 text-secondary uppercase tracking-widest px-3 py-0.5 text-[9px]">
                         {t('nav.products')}
                       </Badge>
                    </div>
                 </motion.div>
               );
             })
           )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white h-16 px-12 rounded-full font-bold text-xl shadow-xl shadow-primary/20">
            <a href="/products">
              {isRtl ? 'مشاهدة جميع المنتجات' : 'View All Products'}
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-10 bg-accent/10 rounded-[3rem] border border-secondary/20 flex flex-col lg:flex-row items-center justify-between gap-10 max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 shadow-lg">
                <Box className="h-10 w-10" />
             </div>
             <p className="text-xl md:text-2xl font-bold text-primary max-w-2xl leading-tight">
                {t('products.customRequest')}
             </p>
          </div>
          <Button className="bg-primary text-white h-16 px-12 rounded-full font-bold text-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 shrink-0">
            {t('contact.form.send')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
