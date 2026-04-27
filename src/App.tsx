import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { WhyUs } from '@/components/sections/WhyUs';
import { Stats } from '@/components/sections/Stats';
import { ContactForm } from '@/components/sections/ContactForm';
import { Toaster } from '@/components/ui/sonner';
import { AdminLogin } from '@/pages/admin/Login';
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { ArticleDetail } from '@/pages/ArticleDetail';
import { FloatingContact } from '@/components/ui/FloatingContact';
import { SEO } from '@/components/ui/SEO';
import { useEffect, useState } from 'react';
import { getSiteContent, getGlobalSettings } from '@/lib/dynamicContent';

import { AboutPage } from '@/pages/About';
import { ServicesPage } from '@/pages/Services';
import { ProductsPage } from '@/pages/Products';
import { ContactPage } from '@/pages/Contact';
import { BlogPage } from '@/pages/Blog';
import { BlogPostPage } from '@/pages/BlogPost';
import { GenericPage } from '@/pages/GenericPage';
import { PageDetail } from '@/pages/PageDetail';
import { MaintenancePage } from '@/pages/Maintenance';

import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Products } from '@/components/sections/Products';

function Home() {
  const { i18n } = useTranslation();
  const [seo, setSeo] = useState<any>(null);

  useEffect(() => {
    getSiteContent().then(data => {
      if (data) {
        setSeo({
          title: i18n.language === 'ar' ? data.homepageSeoTitleAr : data.homepageSeoTitleEn,
          description: i18n.language === 'ar' ? data.homepageSeoDescriptionAr : data.homepageSeoDescriptionEn
        });
      }
    });
  }, [i18n.language]);

  return (
    <main>
      <SEO title={seo?.title} description={seo?.description} />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Products />
      <WhyUs />
      <ContactForm />
    </main>
  );
}

export default function App() {
  const { i18n } = useTranslation();
  const [phone, setPhone] = useState('+966506963669');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    getGlobalSettings().then(data => {
      if (data) {
        setPhone(data.phone || '+966506963669');
        setMaintenanceMode(data.maintenanceMode || false);
      }
    });
  }, []);

  const isAdmin = localStorage.getItem('isAuthed') === 'true';
  const isMaintenanceRoute = location.pathname.startsWith('/admin');

  if (maintenanceMode && !isAdmin && !isMaintenanceRoute) {
    return <MaintenancePage />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/p/:slug" element={<GenericPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      <Footer />
      
      {/* Floating components (Hiding on Admin routes could be done by location check) */}
      <FloatingContact phone={phone} />
      
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
