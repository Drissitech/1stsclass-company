import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LogIn, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

export function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthed = localStorage.getItem('isAuthed') === 'true';
    if (isAuthed) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async () => {
    setLoading(true);
    // Local mock login logic (removed API linking)
    setTimeout(() => {
      localStorage.setItem('isAuthed', 'true');
      toast.success('Offline mode: Logged in locally');
      navigate('/admin');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/20 px-4">
      <Card className="w-full max-w-md shadow-2xl border-primary/10">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
             <ShieldAlert className="w-10 h-10 text-secondary" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary tracking-tight">Admin Portal</CardTitle>
          <CardDescription>Secure access for authorized personnel only</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleLogin} 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-lg rounded-xl flex items-center justify-center gap-3"
          >
            <LogIn className="w-5 h-5" />
            {loading ? 'Authenticating...' : 'Sign in with Google'}
          </Button>
          <p className="mt-6 text-center text-xs text-muted-foreground uppercase tracking-widest">
            First Class Advanced Co.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
