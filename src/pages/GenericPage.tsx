import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';

export function GenericPage() {
  const { slug } = useParams();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/cms/pages').then(res => res.json()).then(data => {
      const found = data.find((p: any) => p.slug === slug);
      setPage(found);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-6">
        <h1 className="text-4xl font-bold">404 - Excellence Not Found</h1>
        <p className="text-muted-foreground max-w-md">The page you are looking for does not exist or has been moved to our private collection.</p>
        <Link to="/">
          <Button className="bg-primary text-white gap-2">
            <ArrowLeft className="w-4 h-4" /> Go Back Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Banner */}
        <div className="bg-primary py-20 md:py-32 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
           <div className="relative z-10 container mx-auto px-4">
              <h1 className="text-white mb-4 animate-in fade-in slide-in-from-top-4 duration-700">{page.title}</h1>
              <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
           </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-20 max-w-4xl">
           <div 
             className="prose prose-lg prose-slate max-w-none 
                        prose-headings:text-primary prose-headings:font-bold
                        prose-a:text-secondary prose-strong:text-primary
                        animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200"
             dangerouslySetInnerHTML={{ __html: page.content }} 
           />
        </div>
      </main>
      <Footer />
    </div>
  );
}
