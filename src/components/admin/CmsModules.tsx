import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  FileText, 
  Users, 
  BookOpen, 
  Save, 
  ArrowLeft,
  Search,
  Layout,
  UserPlus
} from 'lucide-react';
import { toast } from 'sonner';

// --- PAGE MANAGER ---
export function PageManager() {
  const [pages, setPages] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cms/pages').then(res => res.json()).then(data => {
      setPages(data);
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing.id ? 'PUT' : 'POST';
    const url = editing.id ? `/api/cms/pages/${editing.id}` : '/api/cms/pages';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing)
      });
      if (res.ok) {
        toast.success('Page saved successfully');
        setEditing(null);
        const data = await fetch('/api/cms/pages').then(r => r.json());
        setPages(data);
      }
    } catch (e) {
      toast.error('Failed to save page');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/cms/pages/${id}`, { method: 'DELETE' });
    setPages(pages.filter(p => p.id !== id));
    toast.success('Page deleted');
  };

  if (editing) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setEditing(null)} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to List
          </Button>
          <Button onClick={handleSave} className="gap-2 bg-primary text-white">
            <Save className="w-4 h-4" /> Save Page
          </Button>
        </div>
        
        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle>{editing.id ? 'Edit Page' : 'Create New Page'}</CardTitle>
            <CardDescription>Configure the dynamic route and content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Page Title</Label>
                <Input value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} placeholder="e.g. Terms of Service" />
              </div>
              <div className="space-y-2">
                <Label>URL Slug</Label>
                <Input value={editing.slug} onChange={e => setEditing({...editing, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} placeholder="e.g. terms-of-service" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Page Content</Label>
              <textarea 
                className="w-full min-h-[400px] p-4 rounded-xl border border-input bg-white focus:ring-2 focus:ring-primary outline-none font-sans text-lg"
                value={editing.content} 
                onChange={e => setEditing({...editing, content: e.target.value})}
                placeholder="Write your content here..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dynamic Pages</h2>
          <p className="text-muted-foreground">Manage custom landing pages and routes</p>
        </div>
        <Button onClick={() => setEditing({ title: '', slug: '', content: '' })} className="bg-primary text-white gap-2">
          <Plus className="w-4 h-4" /> Add Page
        </Button>
      </div>

      <div className="grid gap-4">
        {pages.map(page => (
          <Card key={page.id} className="group hover:border-primary/50 transition-all shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{page.title}</h3>
                  <p className="text-sm text-muted-foreground font-mono">/{page.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => setEditing(page)} className="h-10 w-10 p-0 text-slate-400 hover:text-primary">
                  <Edit3 className="w-5 h-5" />
                </Button>
                <Button variant="ghost" onClick={() => handleDelete(page.id)} className="h-10 w-10 p-0 text-slate-400 hover:text-destructive">
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// --- BLOG MANAGER ---
export function BlogManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);

  useEffect(() => {
    fetch('/api/cms/posts').then(res => res.json()).then(setPosts);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing.id ? 'PUT' : 'POST';
    const url = editing.id ? `/api/cms/posts/${editing.id}` : '/api/cms/posts';
    
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing)
    });
    if (res.ok) {
      toast.success('Post published');
      setEditing(null);
      fetch('/api/cms/posts').then(res => res.json()).then(setPosts);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/cms/posts/${id}`, { method: 'DELETE' });
    setPosts(posts.filter(p => p.id !== id));
  };

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setEditing(null)} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Button>
          <Button onClick={handleSave} className="gap-2 bg-primary text-white">
            <Save className="w-4 h-4" /> Publish Post
          </Button>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
             <Card className="border-none shadow-xl">
               <CardContent className="p-6 space-y-4">
                 <div className="space-y-2">
                   <Label>Post Title</Label>
                   <Input 
                     className="text-2xl font-bold h-16 border-none bg-accent/30 focus-visible:ring-0" 
                     value={editing.title} 
                     onChange={e => setEditing({...editing, title: e.target.value})} 
                     placeholder="Enter title here..." 
                   />
                 </div>
                 <div className="space-y-2">
                   <Label>Content</Label>
                   <textarea 
                     className="w-full min-h-[400px] p-4 rounded-xl border border-input bg-white focus:ring-2 focus:ring-primary outline-none font-sans text-lg"
                     value={editing.content} 
                     onChange={e => setEditing({...editing, content: e.target.value})}
                     placeholder="Write your content here..."
                   />
                 </div>
               </CardContent>
             </Card>
          </div>
          
          <div className="space-y-6">
             <Card className="border-none shadow-xl">
               <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
               <CardContent className="space-y-4">
                 <div className="space-y-2">
                   <Label>Featured Image URL</Label>
                   <Input value={editing.featuredImage} onChange={e => setEditing({...editing, featuredImage: e.target.value})} placeholder="https://..." />
                 </div>
                 <div className="space-y-2">
                   <Label>Category</Label>
                   <Input value={editing.category} onChange={e => setEditing({...editing, category: e.target.value})} placeholder="Business, Tech, etc." />
                 </div>
                 <div className="space-y-2">
                   <Label>Slug</Label>
                   <Input value={editing.slug} onChange={e => setEditing({...editing, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} placeholder="post-url-slug" />
                 </div>
               </CardContent>
             </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog System</h2>
          <p className="text-muted-foreground">Publish industry insights and company news</p>
        </div>
        <Button onClick={() => setEditing({ title: '', slug: '', category: '', content: '', featuredImage: '' })} className="bg-primary text-white gap-2">
          <Plus className="w-4 h-4" /> New Post
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <Card key={post.id} className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-none">
            <div className="aspect-video relative overflow-hidden">
               <img src={post.featuredImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={post.title} />
               <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary">{post.category}</span>
               </div>
            </div>
            <CardContent className="p-6">
               <h3 className="font-bold text-xl mb-4 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-muted-foreground italic">{new Date(post.createdAt).toLocaleDateString()}</span>
                 <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" onClick={() => setEditing(post)}><Edit3 className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(post.id)}><Trash2 className="w-4 h-4" /></Button>
                 </div>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// --- USER MANAGER ---
export function UserManager() {
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });

  useEffect(() => {
    fetch('/api/cms/users').then(res => res.json()).then(setUsers);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/cms/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });
    if (res.ok) {
      toast.success('Admin added');
      setNewUser({ username: '', password: '' });
      fetch('/api/cms/users').then(res => res.json()).then(setUsers);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this admin?')) return;
    const res = await fetch(`/api/cms/users/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setUsers(users.filter(u => u.id !== id));
      toast.success('Admin removed');
    } else {
      const err = await res.json();
      toast.error(err.error || 'Failed to remove admin');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Management</h2>
          <p className="text-muted-foreground">Control access to the CMS core</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle>Register New Admin</CardTitle>
            <CardDescription>Grant dashboard access to personnel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} required />
              </div>
              <Button type="submit" className="w-full bg-primary text-white gap-2">
                <UserPlus className="w-4 h-4" /> Create Admin
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
           {users.map(user => (
             <Card key={user.id} className="border-none shadow-md overflow-hidden">
               <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                       <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold">{user.username}</h4>
                      <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">{user.id === '1' ? 'Super Admin' : 'Editor'}</p>
                    </div>
                  </div>
                  {user.username !== 'admin' && (
                    <Button variant="ghost" className="text-destructive h-10 w-10 p-0" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  )}
               </CardContent>
             </Card>
           ))}
        </div>
      </div>
    </div>
  );
}
