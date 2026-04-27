import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock } from 'lucide-react';

export function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cms/posts').then(res => res.json()).then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <header className="bg-slate-50 border-b py-20">
           <div className="container mx-auto px-4 max-w-6xl text-center">
              <h1 className="text-primary mb-6">Concierge Insights</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Expert perspective on the intersection of luxury, business, and innovation.</p>
           </div>
        </header>

        <section className="py-20 bg-white">
           <div className="container mx-auto px-4 max-w-7xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                 {loading ? (
                    Array(6).fill(0).map((_, i) => (
                      <div key={i} className="animate-pulse space-y-4">
                        <div className="aspect-video bg-slate-200 rounded-2xl" />
                        <div className="h-4 bg-slate-200 w-1/4 rounded" />
                        <div className="h-8 bg-slate-200 w-full rounded" />
                        <div className="h-4 bg-slate-200 w-2/3 rounded" />
                      </div>
                    ))
                 ) : posts.map(post => (
                    <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                       <Card className="border-none shadow-none overflow-hidden h-full flex flex-col">
                          <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-6">
                             <img 
                               src={post.featuredImage} 
                               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                               alt={post.title} 
                             />
                          </div>
                          <CardContent className="p-0 flex-1 flex flex-col">
                             <div className="flex items-center gap-3 mb-4">
                               <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">{post.category}</Badge>
                               <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {new Date(post.createdAt).toLocaleDateString()}
                               </span>
                             </div>
                             <h3 className="text-2xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                             <p className="text-muted-foreground line-clamp-3 mb-6">Explore the full article to gain deeper insights into this topic.</p>
                             <div className="mt-auto pt-4 flex items-center gap-2 text-primary font-bold transition-all group-hover:gap-4">
                                Read Full Article <ArrowRight className="w-4 h-4 text-secondary" />
                             </div>
                          </CardContent>
                       </Card>
                    </Link>
                 ))}
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
