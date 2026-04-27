import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin, Loader2 } from 'lucide-react';

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cms/posts').then(res => res.json()).then(data => {
      const found = data.find((p: any) => p.slug === slug);
      setPost(found);
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

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-6">
        <h1 className="text-4xl font-bold">Post Not Found</h1>
        <Link to="/blog"><Button>Back to Blog</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-24">
      <main className="flex-1">
        <article>
           {/* Hero */}
           <div className="relative h-[60vh] md:h-[70vh] flex items-end">
              <div className="absolute inset-0">
                 <img src={post.featuredImage} className="w-full h-full object-cover" alt={post.title} />
                 <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
              </div>
              <div className="container mx-auto px-4 relative z-10 pb-20 max-w-4xl">
                 <Link to="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Insights
                 </Link>
                 <div className="flex items-center gap-4 mb-6">
                    <span className="px-4 py-1 bg-secondary text-primary font-bold rounded-full text-xs uppercase tracking-widest">{post.category}</span>
                    <span className="text-white/60 flex items-center gap-2 text-sm">
                       <Clock className="w-4 h-4" /> {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                 </div>
                 <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight leading-tight">{post.title}</h1>
              </div>
           </div>

           {/* Content */}
           <div className="bg-white">
              <div className="container mx-auto px-4 py-20 max-w-4xl flex flex-col md:flex-row gap-12">
                 {/* Sharing */}
                 <div className="md:w-16 flex md:flex-col gap-4">
                    <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white"><Facebook className="w-5 h-5" /></Button>
                    <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white"><Twitter className="w-5 h-5" /></Button>
                    <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white"><Linkedin className="w-5 h-5" /></Button>
                    <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white"><Share2 className="w-5 h-5" /></Button>
                 </div>

                 {/* Body */}
                 <div className="flex-1">
                    <div 
                      className="prose prose-xl prose-slate max-w-none
                                 prose-headings:text-primary prose-headings:font-bold
                                 prose-a:text-secondary prose-img:rounded-3xl
                                 prose-img:shadow-2xl"
                      dangerouslySetInnerHTML={{ __html: post.content }} 
                    />
                 </div>
              </div>
           </div>
        </article>
      </main>
    </div>
  );
}
