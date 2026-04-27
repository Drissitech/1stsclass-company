import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LogIn, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthed = localStorage.getItem('isAuthed') === 'true';
    if (isAuthed) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        localStorage.setItem('isAuthed', 'true');
        toast.success('Successfully authenticated');
        navigate('/admin');
      } else {
        toast.error('Invalid username or password');
      }
    } catch (err) {
      toast.error('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md shadow-2xl border-none rounded-3xl overflow-hidden">
        <CardHeader className="text-center bg-primary text-white py-10">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
             <ShieldAlert className="w-8 h-8 text-secondary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Admin Vault</CardTitle>
          <CardDescription className="text-white/70">Management Authorization Required</CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
               <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Identifier</label>
               <input 
                 type="text" 
                 value={username} 
                 onChange={e => setUsername(e.target.value)}
                 className="w-full h-12 bg-accent/30 border-none rounded-xl px-4 focus:ring-2 focus:ring-primary outline-none"
                 placeholder="Username"
                 required
               />
            </div>
            <div className="space-y-2">
               <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Credential</label>
               <input 
                 type="password" 
                 value={password} 
                 onChange={e => setPassword(e.target.value)}
                 className="w-full h-12 bg-accent/30 border-none rounded-xl px-4 focus:ring-2 focus:ring-primary outline-none"
                 placeholder="••••••••"
                 required
               />
            </div>
            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-base font-bold rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
            >
              <LogIn className="w-5 h-5 text-secondary" />
              {loading ? 'Verifying...' : 'Authorize Access'}
            </Button>
          </form>
          <p className="mt-8 text-center text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
            Encrypted Session Management Active
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
