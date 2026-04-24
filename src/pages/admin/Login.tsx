import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { LogIn, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

export function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'techbydrissi@gmail.com') {
        navigate('/admin');
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email === 'techbydrissi@gmail.com') {
        toast.success('Logged in as administrator');
        navigate('/admin');
      } else {
        toast.error('Unauthorized access. Only techbydrissi@gmail.com is allowed.');
        await auth.signOut();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/20 px-4">
      <Card className="w-full max-w-md shadow-2xl border-deep-green/10">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-deep-green rounded-2xl flex items-center justify-center mx-auto mb-6">
             <ShieldAlert className="w-10 h-10 text-gold" />
          </div>
          <CardTitle className="text-3xl font-bold text-deep-green tracking-tight">Admin Portal</CardTitle>
          <CardDescription>Secure access for authorized personnel only</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleLogin} 
            disabled={loading}
            className="w-full bg-deep-green hover:bg-deep-green/90 text-white h-14 text-lg rounded-xl flex items-center justify-center gap-3"
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
