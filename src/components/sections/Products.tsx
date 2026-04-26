import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Package, Box, Factory, Construction, Diamond } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
    <section id="products" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-primary mb-6"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground whitespace-pre-wrap"
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                   <div className="absolute inset-0 bg-secondary/5 rounded-[2rem] transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                   <div className="relative bg-white border border-border overflow-hidden rounded-[2rem] h-full flex flex-col shadow-lg shadow-primary/5 group-hover:border-secondary/50 transition-colors">
                      <div className="aspect-video bg-accent relative overflow-hidden">
                         <img src={product.imageUrl} alt={isRtl ? product.nameAr : product.nameEn} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                      </div>
                      <div className="p-8 flex flex-col flex-1 items-start">
                         <h3 className="text-xl font-bold text-primary mb-3">
                           {isRtl ? product.nameAr : product.nameEn}
                         </h3>
                         <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                            {isRtl ? product.descriptionAr : product.descriptionEn}
                         </p>
                         <div className="mt-auto pt-4 flex items-center justify-between w-full border-t border-border/10">
                            <span className="text-secondary font-bold text-sm">{product.price || t('nav.products')}</span>
                            <Badge variant="outline" className="border-secondary/30 text-secondary uppercase tracking-widest text-[10px]">
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
                    <div className="absolute inset-0 bg-gold/5 rounded-[2rem] transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                    <div className="relative bg-white border border-border p-8 rounded-[2rem] h-full flex flex-col items-center text-center shadow-lg shadow-primary/5 group-hover:border-secondary/50 transition-colors">
                       <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6", cat.color)}>
                          <Icon className="h-8 w-8" />
                       </div>
                       <h3 className="text-xl font-bold text-primary mb-4">
                         {t(`products.categories.${cat.key}`)}
                       </h3>
                       <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                         {i18n.language === 'ar' ? 'نحن نوفر أفضل الحلول لتأمين هذه المنتجات.' : 'We provide the best solutions to secure these products.'}
                       </p>
                       <Badge variant="outline" className="mt-auto border-secondary/30 text-secondary uppercase tracking-widest px-4 py-1">
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
          className="mt-12 text-center"
        >
          <a 
            href="/products" 
            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
          >
            {isRtl ? 'مشاهدة جميع المنتجات' : 'View All Products'}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-accent/20 rounded-[2rem] border border-secondary/10 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                <Box className="h-8 w-8" />
             </div>
             <p className="text-lg font-medium text-primary max-w-lg">
                {t('products.customRequest')}
             </p>
          </div>
          <button className="bg-primary text-white px-8 h-14 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
            {t('contact.form.send')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
