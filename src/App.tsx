import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Products } from '@/components/sections/Products';
import { About } from '@/components/sections/About';
import { WhyUs } from '@/components/sections/WhyUs';
import { Stats } from '@/components/sections/Stats';
import { ContactForm } from '@/components/sections/ContactForm';
import { Toaster } from '@/components/ui/sonner';
import { AdminLogin } from '@/pages/admin/Login';
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { Blog } from '@/pages/Blog';
import { ArticleDetail } from '@/pages/ArticleDetail';
import { FloatingContact } from '@/components/ui/FloatingContact';
import { AIChatBot } from '@/components/ui/AIChatBot';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <Products />
      <About />
      <WhyUs />
      <ContactForm />
      <Footer />
    </main>
  );
}

export default function App() {
  const { i18n } = useTranslation();
  const [phone, setPhone] = useState('+966506963669');

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'global'));
        if (snap.exists()) {
          setPhone(snap.data().phone || '+966506963669');
        }
      } catch (error) {
        console.error("Error fetching phone:", error);
      }
    };
    loadSettings();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<ArticleDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Floating components (Hiding on Admin routes could be done by location check) */}
      <FloatingContact phone={phone} />
      <AIChatBot />
      
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
