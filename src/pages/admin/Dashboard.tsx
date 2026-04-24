import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, doc, getDoc, getDocs, setDoc, addDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Sidebar } from '@/components/layout/AdminSidebar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  FileText, 
  MessageSquare, 
  Settings as SettingsIcon, 
  Search, 
  Plus, 
  Trash2, 
  Edit2, 
  CheckCircle2, 
  ExternalLink,
  Mail,
  Phone,
  Globe,
  ArrowLeft,
  LayoutDashboard,
  BarChart3,
  Save,
  Shield,
  Box,
  Layers,
  Image as ImageIcon,
  ChevronUp,
  ChevronDown,
  Clock
} from 'lucide-react';

// --- Sub-components (Views) ---

function Overview({ messages }: { messages: any[] }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-bold tracking-tight text-deep-green">Dashboard Overview</h2>
           <p className="text-muted-foreground">Quick summary of your site's activity.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <Card className="bg-deep-green text-white border-none shadow-xl shadow-deep-green/10">
            <CardContent className="p-6 flex items-center gap-4">
               <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-gold" />
               </div>
               <div>
                  <p className="text-sm text-white/60">New Messages</p>
                  <p className="text-3xl font-bold">{messages.length}</p>
               </div>
            </CardContent>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="rounded-2xl border-border/50">
            <CardHeader>
               <CardTitle>Recent Messages</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {messages.length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">No recent messages.</p>
                  ) : (
                    messages.slice(0, 5).map(msg => (
                      <div key={msg.id} className="flex items-center justify-between p-4 bg-accent/20 rounded-xl hover:bg-accent/40 transition-colors">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-deep-green border border-border/10">
                               {msg.name[0]}
                            </div>
                            <div className="min-w-0">
                               <p className="font-bold text-sm truncate">{msg.name}</p>
                               <p className="text-xs text-muted-foreground truncate max-w-[200px]">{msg.message}</p>
                            </div>
                         </div>
                         <Link to="/admin/messages">
                            <Button variant="ghost" size="icon" className="hover:text-gold">
                               <ExternalLink className="w-4 h-4" />
                            </Button>
                         </Link>
                      </div>
                    ))
                  )}
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}

function ServicesView() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'services'), orderBy('order', 'asc'));
    return onSnapshot(q, (snap) => {
      setServices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    try {
      await deleteDoc(doc(db, 'services', id));
      toast.success('Service removed');
    } catch (error) {
      toast.error('Failed to remove service');
    }
  };

  const moveItem = async (index: number, direction: 'up' | 'down') => {
    const newServices = [...services];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newServices.length) return;

    const temp = newServices[index];
    newServices[index] = newServices[targetIndex];
    newServices[targetIndex] = temp;

    try {
      await Promise.all(newServices.map((item, i) => 
        setDoc(doc(db, 'services', item.id), { order: i }, { merge: true })
      ));
    } catch (error) {
      toast.error('Order update failed');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-deep-green">Services</h2>
          <p className="text-muted-foreground">List of services offered by your company.</p>
        </div>
        <Link to="/admin/services/new">
          <Button className="bg-gold text-deep-green hover:bg-gold/90 rounded-xl gap-2 font-bold">
            <Plus className="w-4 h-4" /> Add Service
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 max-w-4xl">
        {services.length === 0 && !loading && (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-border">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground">No services added yet.</p>
          </div>
        )}
        {services.map((service, index) => (
          <Card key={service.id} className="border-border/50 p-4 flex items-center gap-4 rounded-2xl group shadow-sm bg-white">
            <div className="flex flex-col gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveItem(index, 'up')} disabled={index === 0}>
                <ChevronUp className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveItem(index, 'down')} disabled={index === services.length - 1}>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
               <Shield className="w-6 h-6 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg truncate">{service.titleEn}</h3>
              <p className="text-xs text-muted-foreground truncate">{service.descriptionEn}</p>
            </div>
            <div className="flex gap-2">
              <Link to={`/admin/services/edit/${service.id}`}>
                <Button variant="ghost" size="icon" className="hover:text-gold rounded-full">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="hover:text-red-500 rounded-full" onClick={() => handleDelete(service.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ServiceEditor({ mode = 'create', id }: { mode?: 'create' | 'edit', id?: string }) {
  const [formData, setFormData] = useState<any>({
    titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '', icon: 'Shield', order: 0
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'edit' && id) {
      getDoc(doc(db, 'services', id)).then(snap => {
        if (snap.exists()) setFormData(snap.data());
      });
    }
  }, [mode, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (mode === 'create') {
        const snap = await getDoc(doc(db, 'services', 'count')); // Not really a count, just getting current list size
        await addDoc(collection(db, 'services'), { ...formData, order: Date.now() });
      } else {
        await setDoc(doc(db, 'services', id!), formData, { merge: true });
      }
      toast.success('Service saved');
      navigate('/admin/services');
    } catch (error) {
      toast.error('Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
       <Link to="/admin/services">
         <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-deep-green group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Services
         </Button>
       </Link>
       <div>
          <h2 className="text-3xl font-bold text-deep-green">{mode === 'create' ? 'Add Service' : 'Edit Service'}</h2>
          <p className="text-muted-foreground">Define a core offering for your clients.</p>
       </div>

       <form onSubmit={handleSubmit}>
          <Card className="rounded-3xl border-border/50 p-8 space-y-8 shadow-xl shadow-deep-green/5 bg-white">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <Label>Title (English)</Label>
                   <Input value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} required className="rounded-xl" />
                </div>
                <div className="space-y-2 text-right">
                   <Label>العنوان (العربية)</Label>
                   <Input dir="rtl" value={formData.titleAr} onChange={e => setFormData({...formData, titleAr: e.target.value})} className="rounded-xl" />
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <Label>Description (English)</Label>
                   <Textarea rows={4} value={formData.descriptionEn} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} required className="rounded-xl" />
                </div>
                <div className="space-y-2 text-right">
                   <Label>الوصف (العربية)</Label>
                   <Textarea dir="rtl" rows={4} value={formData.descriptionAr} onChange={e => setFormData({...formData, descriptionAr: e.target.value})} className="rounded-xl" />
                </div>
             </div>
             <Button type="submit" disabled={saving} className="w-full bg-deep-green h-14 rounded-2xl font-bold text-white shadow-lg shadow-deep-green/10">
                {saving ? 'Saving...' : 'Save Service'}
             </Button>
          </Card>
       </form>
    </div>
  );
}

function ProductsView() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('order', 'asc'));
    return onSnapshot(q, (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      toast.success('Product removed');
    } catch (error) {
      toast.error('Failed to remove product');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-deep-green">Product Catalog</h2>
          <p className="text-muted-foreground">Manage the items showcased in your catalog.</p>
        </div>
        <Link to="/admin/products/new">
          <Button className="bg-gold text-deep-green hover:bg-gold/90 rounded-xl gap-2 font-bold">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="border-border/50 group overflow-hidden rounded-3xl shadow-sm bg-white border">
            <div className="aspect-square bg-accent relative overflow-hidden">
               <img src={product.imageUrl} alt={product.nameEn} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
               <div className="absolute top-2 right-2 flex gap-2">
                  <Link to={`/admin/products/edit/${product.id}`}>
                    <Button size="icon" variant="secondary" className="rounded-full shadow-lg bg-white/90 backdrop-blur-sm">
                       <Edit2 className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button size="icon" variant="destructive" className="rounded-full shadow-lg" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
               </div>
            </div>
            <CardContent className="p-6">
               <h3 className="font-bold text-lg mb-1">{product.nameEn}</h3>
               <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.descriptionEn}</p>
               <span className="text-gold font-bold">{product.price || 'Contact for price'}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProductEditor({ mode = 'create', id }: { mode?: 'create' | 'edit', id?: string }) {
  const [formData, setFormData] = useState<any>({
    nameEn: '', nameAr: '', descriptionEn: '', descriptionAr: '', imageUrl: '', price: '', order: 0
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'edit' && id) {
      getDoc(doc(db, 'products', id)).then(snap => {
        if (snap.exists()) setFormData(snap.data());
      });
    }
  }, [mode, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (mode === 'create') {
        await addDoc(collection(db, 'products'), { ...formData, order: Date.now() });
      } else {
        await setDoc(doc(db, 'products', id!), formData, { merge: true });
      }
      toast.success('Product saved');
      navigate('/admin/products');
    } catch (error) {
      toast.error('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
       <Link to="/admin/products">
         <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-deep-green group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Catalog
         </Button>
       </Link>
       <h2 className="text-3xl font-bold text-deep-green">{mode === 'create' ? 'Add Product' : 'Edit Product'}</h2>

       <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="rounded-3xl border-border/50 p-8 space-y-8 shadow-xl bg-white">
             <div className="space-y-4">
                <Label>Image URL</Label>
                <div className="flex gap-4">
                  <Input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} required className="rounded-xl" />
                  {formData.imageUrl && <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border"><img src={formData.imageUrl} className="w-full h-full object-cover" /></div>}
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2"><Label>Name (EN)</Label><Input value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} required className="rounded-xl" /></div>
                <div className="space-y-2 text-right"><Label>الاسم (AR)</Label><Input dir="rtl" value={formData.nameAr} onChange={e => setFormData({...formData, nameAr: e.target.value})} className="rounded-xl" /></div>
             </div>
             <div className="space-y-2"><Label>Price Label</Label><Input value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="e.g. $1,200 / Ton" className="rounded-xl" /></div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2"><Label>Description (EN)</Label><Textarea rows={4} value={formData.descriptionEn} onChange={e => setFormData({...formData, descriptionEn: e.target.value})} required className="rounded-xl" /></div>
                <div className="space-y-2 text-right"><Label>الوصف (AR)</Label><Textarea dir="rtl" rows={4} value={formData.descriptionAr} onChange={e => setFormData({...formData, descriptionAr: e.target.value})} className="rounded-xl" /></div>
             </div>
             <Button type="submit" disabled={saving} className="w-full bg-deep-green h-14 rounded-2xl font-bold">
                {saving ? 'Saving...' : 'Confirm Changes'}
             </Button>
          </Card>
       </form>
    </div>
  );
}

function PagesView() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'pages'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      setPages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this page?')) return;
    try {
      await deleteDoc(doc(db, 'pages', id));
      toast.success('Page removed');
    } catch (error) {
      toast.error('Failed to remove page');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-deep-green">Custom Pages</h2>
          <p className="text-muted-foreground">Manage standalone informational pages.</p>
        </div>
        <Link to="/admin/pages/new">
          <Button className="bg-gold text-deep-green hover:bg-gold/90 rounded-xl gap-2 font-bold">
            <Plus className="w-4 h-4" /> Add Page
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 max-w-4xl">
        {pages.map((page) => (
          <Card key={page.id} className="border-border/50 p-4 flex items-center gap-4 rounded-2xl bg-white border">
            <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
               <FileText className="w-5 h-5 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg">{page.titleEn}</h3>
              <p className="text-xs text-muted-foreground truncate">URL Slug: /{page.slug}</p>
            </div>
            <div className="flex gap-2">
              <Link to={`/admin/pages/edit/${page.id}`}>
                <Button variant="ghost" size="icon" className="hover:text-gold rounded-full"><Edit2 className="w-4 h-4" /></Button>
              </Link>
              <Button variant="ghost" size="icon" className="hover:text-red-500 rounded-full" onClick={() => handleDelete(page.id)}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PageEditor({ mode = 'create', id }: { mode?: 'create' | 'edit', id?: string }) {
  const [formData, setFormData] = useState<any>({
    titleEn: '', titleAr: '', slug: '', contentEn: '', contentAr: '', status: 'draft'
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'edit' && id) {
      getDoc(doc(db, 'pages', id)).then(snap => {
        if (snap.exists()) setFormData(snap.data());
      });
    }
  }, [mode, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (mode === 'create') {
        await addDoc(collection(db, 'pages'), { ...formData, createdAt: Timestamp.now() });
      } else {
        await setDoc(doc(db, 'pages', id!), formData, { merge: true });
      }
      toast.success('Page saved');
      navigate('/admin/pages');
    } catch (error) {
      toast.error('Failed to save page');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
       <Link to="/admin/pages">
         <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-deep-green group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Pages
         </Button>
       </Link>
       <h2 className="text-3xl font-bold text-deep-green">{mode === 'create' ? 'Create Custom Page' : 'Edit Page'}</h2>

       <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="rounded-3xl border-border/50 p-8 space-y-8 bg-white shadow-xl">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2"><Label>Page Title (EN)</Label><Input value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} required className="rounded-xl" /></div>
                <div className="space-y-2 text-right"><Label>عنوان الصفحة (AR)</Label><Input dir="rtl" value={formData.titleAr} onChange={e => setFormData({...formData, titleAr: e.target.value})} className="rounded-xl" /></div>
             </div>
             <div className="space-y-2"><Label>Slug Override</Label><Input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="about-legal" className="rounded-xl" /></div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2"><Label>Content (EN)</Label><Textarea rows={10} value={formData.contentEn} onChange={e => setFormData({...formData, contentEn: e.target.value})} className="rounded-xl" /></div>
                <div className="space-y-2 text-right"><Label>المحتوى (AR)</Label><Textarea dir="rtl" rows={10} value={formData.contentAr} onChange={e => setFormData({...formData, contentAr: e.target.value})} className="rounded-xl" /></div>
             </div>
             <Button type="submit" disabled={saving} className="w-full bg-deep-green h-14 rounded-2xl font-bold">
                {saving ? 'Publishing...' : 'Save Page'}
             </Button>
          </Card>
       </form>
    </div>
  );
}

function MediaView() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllImages = async () => {
      try {
        const collections = ['articles', 'products', 'services', 'sections'];
        const allImages: any[] = [];
        
        for (const colName of collections) {
          const snap = await getDocs(collection(db, colName));
          snap.docs.forEach(d => {
            const data = d.data();
            const imageUrlFields = ['imageUrl', 'heroImageUrl', 'aboutImageUrl', 'logoUrl'];
            imageUrlFields.forEach(field => {
              if (data[field]) {
                allImages.push({
                  url: data[field],
                  source: colName,
                  id: d.id,
                  name: data.titleEn || data.nameEn || d.id
                });
              }
            });
          });
        }
        
        // Dedup copies
        const unique = Array.from(new Map(allImages.map(img => [img.url, img])).values());
        setImages(unique);
      } catch (err) {
        toast.error('Failed to scan media');
      } finally {
        setLoading(false);
      }
    };
    loadAllImages();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-deep-green">Media Library</h2>
        <p className="text-muted-foreground">Managing images indexed from your content collections.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((img, i) => (
          <Card key={i} className="group relative aspect-square overflow-hidden rounded-2xl border-none shadow-lg">
            <img src={img.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center cursor-pointer" onClick={() => {
               navigator.clipboard.writeText(img.url);
               toast.success('URL copied to clipboard');
            }}>
               <p className="text-white font-bold text-[10px] uppercase truncate w-full">{img.name}</p>
               <p className="text-white/60 text-[8px] uppercase">{img.source}</p>
               <Button variant="secondary" size="sm" className="mt-2 h-7 rounded-full text-[10px]">Copy URL</Button>
            </div>
          </Card>
        ))}
        {images.length === 0 && !loading && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
             No media assets detected in current content.
          </div>
        )}
      </div>
    </div>
  );
}

function MessagesView({ messages }: { messages: any[] }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
         <h2 className="text-3xl font-bold text-deep-green">Messages</h2>
         <p className="text-muted-foreground">Inquiries from the contact form.</p>
      </div>

      {messages.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-border max-w-4xl">
           <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
           <p className="text-muted-foreground">No messages received yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {messages.map((msg) => (
            <Card key={msg.id} className="border-border/50 hover:border-gold/30 transition-all rounded-3xl overflow-hidden group h-full flex flex-col">
               <CardHeader className="bg-accent/30 border-b border-border/10">
                  <div className="flex items-center justify-between">
                     <Badge className="bg-deep-green/10 text-deep-green">
                        {msg.service || 'Inquiry'}
                     </Badge>
                     <span className="text-[10px] text-muted-foreground">
                        {msg.createdAt?.toDate ? format(msg.createdAt.toDate(), 'PPp') : 'Just now'}
                     </span>
                  </div>
                  <CardTitle className="text-lg font-bold mt-2">{msg.name}</CardTitle>
                  <CardDescription>{msg.company || 'Private User'}</CardDescription>
               </CardHeader>
               <CardContent className="pt-6 flex-1">
                  <div className="space-y-3 mb-6">
                     <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gold" />
                        <a href={`mailto:${msg.email}`} className="hover:text-gold transition-colors truncate">{msg.email}</a>
                     </div>
                     {msg.phone && (
                       <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-gold" />
                          <span dir="ltr">{msg.phone}</span>
                       </div>
                     )}
                  </div>
                  <div className="p-4 bg-accent/20 rounded-xl text-sm italic leading-relaxed text-foreground/80">
                     "{msg.message}"
                  </div>
               </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function ArticlesView() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      setArticles(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteDoc(doc(db, 'articles', id));
      toast.success('Article deleted');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-bold text-deep-green">Articles / Blog</h2>
           <p className="text-muted-foreground">Manage your company news and blog posts.</p>
        </div>
        <Link to="/admin/articles/new">
          <Button className="bg-gold text-deep-green hover:bg-gold/90 rounded-xl gap-2 h-11">
             <Plus className="w-4 h-4" /> New Article
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 max-w-5xl">
        {articles.length === 0 && !loading && (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-border">
             <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
             <p className="text-muted-foreground">No articles created yet.</p>
          </div>
        )}
        {articles.map(article => (
          <Card key={article.id} className="border-border/50 hover:border-gold/20 transition-all flex items-center p-4 gap-4 rounded-2xl group shadow-sm">
             <div className="w-20 h-20 bg-accent rounded-xl bg-cover bg-center shrink-0 border border-border/10" style={{ backgroundImage: article.imageUrl ? `url(${article.imageUrl})` : 'none' }}>
                {!article.imageUrl && <FileText className="w-full h-full p-6 text-muted-foreground/30" />}
             </div>
             <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                   <Badge className={cn(article.status === 'published' ? "bg-green-100 text-green-700 border-none" : "bg-slate-100 text-slate-600 border-none")}>
                      {article.status}
                   </Badge>
                   <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      {article.createdAt?.toDate ? format(article.createdAt.toDate(), 'PP') : 'Today'}
                   </span>
                </div>
                <h3 className="font-bold text-lg truncate">{article.titleEn || article.titleAr}</h3>
             </div>
             <div className="flex gap-2">
                <Link to={`/admin/articles/edit/${article.id}`}>
                  <Button variant="ghost" size="icon" className="hover:text-gold rounded-full">
                     <Edit2 className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="hover:text-red-500 rounded-full" onClick={() => handleDelete(article.id)}>
                   <Trash2 className="w-4 h-4" />
                </Button>
             </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ArticleEditor({ mode = 'create', id }: { mode?: 'create' | 'edit', id?: string }) {
  const [formData, setFormData] = useState<any>({
    titleEn: '', titleAr: '', contentEn: '', contentAr: '', imageUrl: '', status: 'draft'
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === 'edit' && id) {
      getDoc(doc(db, 'articles', id)).then(snap => {
        if (snap.exists()) setFormData(snap.data());
      });
    }
  }, [mode, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = { ...formData, updatedAt: Timestamp.now() };
      if (mode === 'create') {
        data.createdAt = Timestamp.now();
        await addDoc(collection(db, 'articles'), data);
      } else {
        await setDoc(doc(db, 'articles', id!), data, { merge: true });
      }
      toast.success(`Article ${mode === 'create' ? 'created' : 'updated'}`);
      navigate('/admin/articles');
    } catch (error) {
      toast.error('Operation failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in duration-500">
       <Link to="/admin/articles">
         <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-deep-green group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Articles
         </Button>
       </Link>
       <div>
          <h2 className="text-3xl font-bold text-deep-green">{mode === 'create' ? 'Post New Article' : 'Edit Article'}</h2>
          <p className="text-muted-foreground">Share news or professional insights.</p>
       </div>

       <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="rounded-3xl border-border/50 overflow-hidden shadow-2xl shadow-deep-green/5">
             <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <Label className="text-deep-green font-bold uppercase text-[10px] tracking-widest">Entry Title (English)</Label>
                      <Input value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} required className="rounded-xl border-border/50" />
                   </div>
                   <div className="space-y-3 text-right">
                      <Label className="text-deep-green font-bold uppercase text-[10px] tracking-widest">العنوان (العربية)</Label>
                      <Input dir="rtl" value={formData.titleAr} onChange={e => setFormData({...formData, titleAr: e.target.value})} className="rounded-xl border-border/50" />
                   </div>
                </div>

                <div className="space-y-3">
                   <Label className="text-deep-green font-bold uppercase text-[10px] tracking-widest">Featured Image URL</Label>
                   <div className="flex gap-4">
                      <Input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="https://exmaple.com/image.jpg" className="rounded-xl border-border/50 flex-1" />
                      <div className="w-11 h-11 bg-accent rounded-xl shrink-0 border border-border/20 flex items-center justify-center overflow-hidden">
                         {formData.imageUrl ? <img src={formData.imageUrl} className="w-full h-full object-cover" /> : <Plus className="w-4 h-4 text-muted-foreground/30" />}
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <Label className="text-deep-green font-bold uppercase text-[10px] tracking-widest">Article Body (English)</Label>
                      <Textarea rows={12} value={formData.contentEn} onChange={e => setFormData({...formData, contentEn: e.target.value})} required className="rounded-xl border-border/50 text-sm leading-relaxed" />
                   </div>
                   <div className="space-y-3 text-right">
                      <Label className="text-deep-green font-bold uppercase text-[10px] tracking-widest">محتوى المقال (العربية)</Label>
                      <Textarea dir="rtl" rows={12} value={formData.contentAr} onChange={e => setFormData({...formData, contentAr: e.target.value})} className="rounded-xl border-border/50 text-sm leading-relaxed" />
                   </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border/50">
                   <div className="space-y-2 w-48">
                      <Label className="text-[10px] uppercase font-bold text-muted-foreground">Status</Label>
                      <select 
                        className="w-full bg-accent/20 rounded-xl border border-border h-11 px-4 outline-none focus:border-gold transition-colors text-sm"
                        value={formData.status} 
                        onChange={e => setFormData({...formData, status: e.target.value})}
                      >
                         <option value="draft">Draft</option>
                         <option value="published">Published</option>
                      </select>
                   </div>
                   <Button type="submit" disabled={saving} className="bg-deep-green text-white hover:bg-deep-green/90 h-14 px-12 rounded-2xl font-bold shadow-xl shadow-deep-green/10">
                      {saving ? 'Processing...' : (
                        <>
                          <Save className="w-5 h-5 mr-2" /> Save Article
                        </>
                      )}
                   </Button>
                </div>
             </CardContent>
          </Card>
       </form>
    </div>
  );
}

function SiteContentView() {
  const [content, setContent] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getDoc(doc(db, 'sections', 'content')).then(snap => {
      if (snap.exists()) setContent(snap.data());
      else setContent({
        heroTitleEn: 'Excellence in Trade', heroTitleAr: 'التميز في التجارة',
        heroSubEn: 'Global logistics and sourcing', heroSubAr: 'اللوجستيات العالمية والتوريد',
        heroImageUrl: '',
        aboutTitleEn: 'About Us', aboutTitleAr: 'عن الشركة',
        aboutTextEn: '', aboutTextAr: '',
        aboutImageUrl: '',
        visionEn: '', visionAr: '',
        missionEn: '', missionAr: '',
        whyUsTitleEn: 'Why Us', whyUsTitleAr: 'لماذا نحن',
        whyUsTextEn: '', whyUsTextAr: '',
        whyUsPointsEn: '', whyUsPointsAr: '',
        servicesTitleEn: 'Our Services', servicesTitleAr: 'خدماتنا',
        servicesTextEn: '', servicesTextAr: '',
        productsTitleEn: 'Our Products', productsTitleAr: 'منتجاتنا',
        productsTextEn: '', productsTextAr: '',
        contactTitleEn: 'Contact Us', contactTitleAr: 'تواصل معنا',
        contactTextEn: '', contactTextAr: '',
        footerTextEn: '', footerTextAr: '',
        logoUrl: '',
        statsShipments: '500+', statsPartners: '20+', statsSatisfaction: '98%', statsExperience: '15+'
      });
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'sections', 'content'), content);
      toast.success('Site content updated');
    } catch (error) {
      toast.error('Failed to update');
    } finally {
      setSaving(false);
    }
  };

  if (!content) return <div className="p-12 animate-pulse text-deep-green font-bold">Loading Editor...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl pb-20">
      <div className="flex items-center justify-between sticky top-[65px] bg-slate-50/80 backdrop-blur-md z-30 py-4 -mx-4 px-4 border-b border-border/50">
         <div>
            <h2 className="text-3xl font-bold text-deep-green">Site Builder</h2>
            <p className="text-muted-foreground">Manage every section of your homepage.</p>
         </div>
         <Button onClick={handleSave} disabled={saving} className="bg-deep-green hover:bg-deep-green/90 h-12 px-8 rounded-xl font-bold shadow-xl shadow-deep-green/10">
            {saving ? 'Syncing...' : (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" /> Save All Changes
              </>
            )}
         </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-12">
         {/* HERO */}
         <Card className="rounded-3xl border-border/50 overflow-hidden shadow-xl shadow-deep-green/5">
            <CardHeader className="bg-deep-green text-white p-6">
               <CardTitle className="text-lg font-bold flex items-center gap-2">
                 <LayoutDashboard className="w-5 h-5 text-gold" /> Hero Section
               </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
               <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">Hero Background Image URL</Label>
                  <div className="flex gap-4">
                     <Input value={content.heroImageUrl} onChange={e => setContent({...content, heroImageUrl: e.target.value})} className="rounded-xl" />
                     {content.heroImageUrl && <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border"><img src={content.heroImageUrl} className="w-full h-full object-cover" /></div>}
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">Headline (English)</Label>
                     <Input value={content.heroTitleEn} onChange={e => setContent({...content, heroTitleEn: e.target.value})} className="rounded-xl" />
                  </div>
                  <div className="space-y-3 text-right">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">العنوان (العربية)</Label>
                     <Input dir="rtl" value={content.heroTitleAr} onChange={e => setContent({...content, heroTitleAr: e.target.value})} className="rounded-xl" />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">Intro Subtext (English)</Label>
                     <Textarea rows={4} value={content.heroSubEn} onChange={e => setContent({...content, heroSubEn: e.target.value})} className="rounded-xl" />
                  </div>
                  <div className="space-y-3 text-right">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">النص الفرعي (العربية)</Label>
                     <Textarea dir="rtl" rows={4} value={content.heroSubAr} onChange={e => setContent({...content, heroSubAr: e.target.value})} className="rounded-xl" />
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* ABOUT & VISION/MISSION */}
         <Card className="rounded-3xl border-border/50 overflow-hidden shadow-xl shadow-deep-green/5">
            <CardHeader className="bg-deep-green text-white p-6">
               <CardTitle className="text-lg font-bold flex items-center gap-2">
                 <Globe className="w-5 h-5 text-gold" /> About Us, Vision & Mission
               </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
               <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">About Section Image URL</Label>
                  <div className="flex gap-4">
                     <Input value={content.aboutImageUrl} onChange={e => setContent({...content, aboutImageUrl: e.target.value})} className="rounded-xl" />
                     {content.aboutImageUrl && <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border"><img src={content.aboutImageUrl} className="w-full h-full object-cover" /></div>}
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">Headline (English)</Label>
                     <Input value={content.aboutTitleEn} onChange={e => setContent({...content, aboutTitleEn: e.target.value})} className="rounded-xl" />
                  </div>
                  <div className="space-y-3 text-right">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">العنوان (العربية)</Label>
                     <Input dir="rtl" value={content.aboutTitleAr} onChange={e => setContent({...content, aboutTitleAr: e.target.value})} className="rounded-xl" />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">Mission Statement (English)</Label>
                     <Textarea rows={6} value={content.aboutTextEn} onChange={e => setContent({...content, aboutTextEn: e.target.value})} className="rounded-xl leading-relaxed" />
                  </div>
                  <div className="space-y-3 text-right">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">بيان المهمة (العربية)</Label>
                     <Textarea dir="rtl" rows={6} value={content.aboutTextAr} onChange={e => setContent({...content, aboutTextAr: e.target.value})} className="rounded-xl leading-relaxed" />
                  </div>
               </div>
               <div className="pt-6 border-t border-border/50 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-gold font-bold">Vision (English)</Label>
                     <Textarea rows={3} value={content.visionEn} onChange={e => setContent({...content, visionEn: e.target.value})} className="rounded-xl" />
                  </div>
                  <div className="space-y-3 text-right">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-gold font-bold">الرؤية (العربية)</Label>
                     <Textarea dir="rtl" rows={3} value={content.visionAr} onChange={e => setContent({...content, visionAr: e.target.value})} className="rounded-xl" />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-gold font-bold">Mission Detail (English)</Label>
                     <Textarea rows={3} value={content.missionEn} onChange={e => setContent({...content, missionEn: e.target.value})} className="rounded-xl" />
                  </div>
                  <div className="space-y-3 text-right">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-gold font-bold">تفاصيل المهمة (العربية)</Label>
                     <Textarea dir="rtl" rows={3} value={content.missionAr} onChange={e => setContent({...content, missionAr: e.target.value})} className="rounded-xl" />
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* WHY US */}
         <Card className="rounded-3xl border-border/50 overflow-hidden shadow-xl shadow-deep-green/5">
            <CardHeader className="bg-deep-green text-white p-6">
               <CardTitle className="text-lg font-bold flex items-center gap-2">
                 <Shield className="w-5 h-5 text-gold" /> Why Us Section
               </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">Section Title (EN)</Label>
                     <Input value={content.whyUsTitleEn} onChange={e => setContent({...content, whyUsTitleEn: e.target.value})} className="rounded-xl" />
                  </div>
                  <div className="space-y-3 text-right">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">عنوان القسم (AR)</Label>
                     <Input dir="rtl" value={content.whyUsTitleAr} onChange={e => setContent({...content, whyUsTitleAr: e.target.value})} className="rounded-xl" />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">Description (EN)</Label>
                     <Textarea rows={4} value={content.whyUsTextEn} onChange={e => setContent({...content, whyUsTextEn: e.target.value})} className="rounded-xl" />
                  </div>
                  <div className="space-y-3 text-right">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">الوصف (AR)</Label>
                     <Textarea dir="rtl" rows={4} value={content.whyUsTextAr} onChange={e => setContent({...content, whyUsTextAr: e.target.value})} className="rounded-xl" />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border/50">
                  <div className="space-y-3">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-gold font-bold">Why Us Points (EN - Newline separated)</Label>
                     <Textarea rows={6} value={content.whyUsPointsEn} onChange={e => setContent({...content, whyUsPointsEn: e.target.value})} className="rounded-xl" />
                  </div>
                  <div className="space-y-3 text-right">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-gold font-bold">نقاط لماذا نحن (AR - سطر جديد لكل نقطة)</Label>
                     <Textarea dir="rtl" rows={6} value={content.whyUsPointsAr} onChange={e => setContent({...content, whyUsPointsAr: e.target.value})} className="rounded-xl" />
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* SERVICES & PRODUCTS HEADERS */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
            <Card className="rounded-3xl border-none overflow-hidden bg-deep-green">
               <CardHeader><CardTitle className="text-sm font-bold flex items-center gap-2"><Layers className="w-4 h-4 text-gold" /> Services Header</CardTitle></CardHeader>
               <CardContent className="space-y-4">
                  <Input value={content.servicesTitleEn} onChange={e => setContent({...content, servicesTitleEn: e.target.value})} placeholder="Title (EN)" className="bg-white/10 border-none rounded-xl text-white placeholder:text-white/40" />
                  <Input dir="rtl" value={content.servicesTitleAr} onChange={e => setContent({...content, servicesTitleAr: e.target.value})} placeholder="العنوان (AR)" className="bg-white/10 border-none rounded-xl text-white placeholder:text-white/40" />
                  <Textarea value={content.servicesTextEn} onChange={e => setContent({...content, servicesTextEn: e.target.value})} placeholder="Subtext (EN)" className="bg-white/10 border-none rounded-xl text-white placeholder:text-white/40" />
                  <Textarea dir="rtl" value={content.servicesTextAr} onChange={e => setContent({...content, servicesTextAr: e.target.value})} placeholder="النص (AR)" className="bg-white/10 border-none rounded-xl text-white placeholder:text-white/40" />
               </CardContent>
            </Card>
            <Card className="rounded-3xl border-none overflow-hidden bg-deep-green">
               <CardHeader><CardTitle className="text-sm font-bold flex items-center gap-2"><Box className="w-4 h-4 text-gold" /> Products Header</CardTitle></CardHeader>
               <CardContent className="space-y-4">
                  <Input value={content.productsTitleEn} onChange={e => setContent({...content, productsTitleEn: e.target.value})} placeholder="Title (EN)" className="bg-white/10 border-none rounded-xl text-white placeholder:text-white/40" />
                  <Input dir="rtl" value={content.productsTitleAr} onChange={e => setContent({...content, productsTitleAr: e.target.value})} placeholder="العنوان (AR)" className="bg-white/10 border-none rounded-xl text-white placeholder:text-white/40" />
                  <Textarea value={content.productsTextEn} onChange={e => setContent({...content, productsTextEn: e.target.value})} placeholder="Subtext (EN)" className="bg-white/10 border-none rounded-xl text-white placeholder:text-white/40" />
                  <Textarea dir="rtl" value={content.productsTextAr} onChange={e => setContent({...content, productsTextAr: e.target.value})} placeholder="النص (AR)" className="bg-white/10 border-none rounded-xl text-white placeholder:text-white/40" />
               </CardContent>
            </Card>
         </div>

         {/* STATS */}
         <Card className="rounded-3xl border-border/50 overflow-hidden shadow-xl shadow-deep-green/5">
            <CardHeader className="bg-deep-green text-white p-6">
               <CardTitle className="text-lg font-bold flex items-center gap-2">
                 <BarChart3 className="w-5 h-5 text-gold" /> Platform Statistics
               </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="space-y-2">
                     <Label className="text-[10px] text-muted-foreground uppercase font-bold">Shipments</Label>
                     <Input value={content.statsShipments} onChange={e => setContent({...content, statsShipments: e.target.value})} className="text-2xl font-bold rounded-xl" />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-[10px] text-muted-foreground uppercase font-bold">Global Partners</Label>
                     <Input value={content.statsPartners} onChange={e => setContent({...content, statsPartners: e.target.value})} className="text-2xl font-bold rounded-xl" />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-[10px] text-muted-foreground uppercase font-bold">Satisfaction</Label>
                     <Input value={content.statsSatisfaction} onChange={e => setContent({...content, statsSatisfaction: e.target.value})} className="text-2xl font-bold rounded-xl" />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-[10px] text-muted-foreground uppercase font-bold">Years Exp.</Label>
                     <Input value={content.statsExperience} onChange={e => setContent({...content, statsExperience: e.target.value})} className="text-2xl font-bold rounded-xl" />
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* FOOTER & BRANDING */}
         <Card className="rounded-3xl border-border/50 overflow-hidden shadow-xl shadow-deep-green/5">
            <CardHeader className="bg-deep-green text-white p-6">
               <CardTitle className="text-lg font-bold flex items-center gap-2">
                 <SettingsIcon className="w-5 h-5 text-gold" /> Branding & Footer
               </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
               <div className="space-y-3">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">Site Logo URL</Label>
                  <div className="flex gap-4">
                     <Input value={content.logoUrl} onChange={e => setContent({...content, logoUrl: e.target.value})} className="rounded-xl" />
                     {content.logoUrl && <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border bg-deep-green p-1"><img src={content.logoUrl} className="w-full h-full object-contain" /></div>}
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">Footer Subtext (English)</Label>
                     <Textarea rows={3} value={content.footerTextEn} onChange={e => setContent({...content, footerTextEn: e.target.value})} className="rounded-xl" />
                  </div>
                  <div className="space-y-3 text-right">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-deep-green">نص التذييل (العربية)</Label>
                     <Textarea dir="rtl" rows={3} value={content.footerTextAr} onChange={e => setContent({...content, footerTextAr: e.target.value})} className="rounded-xl" />
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="rounded-3xl border-none overflow-hidden bg-gold">
            <CardContent className="p-8 flex items-center justify-between">
               <div className="text-deep-green">
                  <h4 className="text-xl font-bold">Synchronize Content</h4>
                  <p className="text-deep-green/60 text-sm">Apply all the above changes to the live production environment.</p>
               </div>
               <Button type="submit" disabled={saving} className="bg-deep-green text-white hover:bg-deep-green/80 h-14 px-12 rounded-2xl font-bold shadow-2xl">
                  {saving ? 'Syncing...' : 'Publish Content Updates'}
               </Button>
            </CardContent>
         </Card>
      </form>
    </div>
  );
}

function SettingsView() {
  const [settings, setSettings] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getDoc(doc(db, 'settings', 'global')).then(snap => {
      if (snap.exists()) setSettings(snap.data());
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'global'), settings);
      toast.success('Site settings updated');
    } catch (error) {
      toast.error('Failed to update');
    } finally {
      setSaving(false);
    }
  };

  if (!settings) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl">
      <div>
         <h2 className="text-3xl font-bold text-deep-green">App Settings</h2>
         <p className="text-muted-foreground">Manage global meta-data, contact points, and technical SEO.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
         <Card className="rounded-3xl border-border/50 overflow-hidden shadow-xl shadow-deep-green/5">
            <CardContent className="p-8 space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Agency Name</Label>
                     <Input value={settings.siteName} onChange={e => setSettings({...settings, siteName: e.target.value})} className="rounded-xl" />
                  </div>
                  <div className="space-y-3">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Liaison Email</Label>
                     <Input value={settings.email} onChange={e => setSettings({...settings, email: e.target.value})} className="rounded-xl" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                     <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Verified Phone</Label>
                     <Input value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} className="rounded-xl" />
                  </div>
               </div>

               <div className="space-y-6 pt-6 border-t border-border/50">
                  <h4 className="font-bold text-deep-green flex items-center gap-2">
                     <Search className="w-4 h-4 text-gold" />
                     Search Optimizations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Keywords (EN)</Label>
                        <Input value={settings.seoKeywordsEn} onChange={e => setSettings({...settings, seoKeywordsEn: e.target.value})} className="rounded-xl" />
                     </div>
                     <div className="space-y-3 text-right">
                        <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">الكلمات المفتاحية</Label>
                        <Input dir="rtl" value={settings.seoKeywordsAr} onChange={e => setSettings({...settings, seoKeywordsAr: e.target.value})} className="rounded-xl" />
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Discovery Snippet (EN)</Label>
                        <Textarea rows={3} value={settings.siteDescriptionEn} onChange={e => setSettings({...settings, siteDescriptionEn: e.target.value})} className="rounded-xl" />
                     </div>
                     <div className="space-y-3 text-right">
                        <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">وصف البحث</Label>
                        <Textarea dir="rtl" rows={3} value={settings.siteDescriptionAr} onChange={e => setSettings({...settings, siteDescriptionAr: e.target.value})} className="rounded-xl" />
                     </div>
                  </div>
               </div>

               <Button type="submit" disabled={saving} className="w-full bg-deep-green h-14 rounded-2xl font-bold shadow-xl shadow-deep-green/10">
                  {saving ? 'Writing Data...' : 'Commit Settings'}
               </Button>
            </CardContent>
         </Card>
      </form>
    </div>
  );
}

// --- Main Wrapper ---

export function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (!u || u.email !== 'techbydrissi@gmail.com') {
        navigate('/admin/login');
      } else {
        setUser(u);
      }
    });

    return () => unsubAuth();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  if (loading && !user) return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
       <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-gold font-bold tracking-widest uppercase text-sm">Authenticating Session</p>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <Sidebar onLogout={handleLogout} email={user?.email} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto h-screen relative">
         <header className="h-16 bg-white/90 border-b border-border flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md">
            <div className="flex items-center gap-3">
               <div className="md:hidden">
                 {/* Mobile menu trigger could go here */}
               </div>
               <h1 className="font-bold text-deep-green flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-gold" />
                  Management Console
               </h1>
               <Badge className="bg-gold/10 text-gold border-none font-bold text-[10px]">VER. 2.5</Badge>
            </div>
            <div className="flex items-center gap-4">
               <a 
                 href="/" 
                 target="_blank" 
                 className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "rounded-full gap-2 border-gold/40 text-deep-green hover:bg-gold hover:text-white transition-all")}
               >
                  <Globe className="w-4 h-4" /> Live Site
               </a>
            </div>
         </header>

         <div className="p-8 pb-20">
            <Routes>
               <Route index element={<Overview messages={messages} />} />
               <Route path="messages" element={<MessagesView messages={messages} />} />
               <Route path="media" element={<MediaView />} />
               <Route path="articles" element={<ArticlesView />} />
               <Route path="articles/new" element={<ArticleEditor mode="create" />} />
               <Route path="articles/edit/:id" element={<ArticleEditor mode="edit" />} />
               
               <Route path="services" element={<ServicesView />} />
               <Route path="services/new" element={<ServiceEditor mode="create" />} />
               <Route path="services/edit/:id" element={<ServiceEditor mode="edit" />} />
               
               <Route path="products" element={<ProductsView />} />
               <Route path="products/new" element={<ProductEditor mode="create" />} />
               <Route path="products/edit/:id" element={<ProductEditor mode="edit" />} />
               
               <Route path="pages" element={<PagesView />} />
               <Route path="pages/new" element={<PageEditor mode="create" />} />
               <Route path="pages/edit/:id" element={<PageEditor mode="edit" />} />
               
               <Route path="content" element={<SiteContentView />} />
               <Route path="settings" element={<SettingsView />} />
               <Route path="*" element={
                 <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-deep-green">Module Not Found</h2>
                    <p className="text-muted-foreground">The administrative module you are looking for is currently unavailable.</p>
                    <Link to="/admin">
                       <Button className="bg-gold text-deep-green">Return to Index</Button>
                    </Link>
                 </div>
               } />
            </Routes>
         </div>
         
         {/* System Notification area could go here */}
      </main>
    </div>
  );
}
