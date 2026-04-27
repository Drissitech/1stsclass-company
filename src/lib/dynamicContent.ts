/**
 * Static content provider - API linking removed per user request.
 * Now checks localStorage for dynamic updates from the admin dashboard.
 */

const DEFAULT_CONTENT = {
  heroTitleEn: "Global Trade Solutions",
  heroTitleAr: "حلول التجارة العالمية",
  heroSubEn: "Your trusted partner in international logistics and sourcing.",
  heroSubAr: "شريكك الموثوق في الخدمات اللوجستية الدولية والتوريد.",
  heroImageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000",
  aboutTitleEn: "About Our Company",
  aboutTitleAr: "عن شركتنا",
  aboutTextEn: "We have been providing world-class logistics services for over a decade.",
  aboutTextAr: "نحن نقدم خدمات لوجستية عالمية المستوى لأكثر من عقد من الزمان.",
  missionEn: "To bridge markets and empower businesses globally.",
  missionAr: "ربط الأسواق وتمكين الشركات عالمياً.",
  logoUrl: "/logo.png",
  aboutImageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000",
  homepageSeoTitleEn: "First Class Advanced Co. - Home",
  homepageSeoTitleAr: "شركة الدرجة الأولى المتقدمة - الرئيسية",
  homepageSeoDescriptionEn: "International shipping and trading services.",
  homepageSeoDescriptionAr: "خدمات الشحن والتجارة الدولية.",
};

const DEFAULT_SETTINGS = {
  siteName: "First Class Advanced Co.",
  email: "info@1stclass.sa",
  phone: "+966 123 456 789",
  addressEn: "Riyadh, Saudi Arabia",
  addressAr: "الرياض، المملكة العربية السعودية",
  facebook: "",
  twitter: "",
  linkedin: "",
  instagram: ""
};

const DEFAULT_SERVICES = [
  {
    id: "1",
    titleEn: "Sea Freight",
    titleAr: "الشحن البحري",
    descriptionEn: "Efficient container shipping across major global routes.",
    descriptionAr: "شحن حاويات فعال عبر المسارات العالمية الكبرى.",
    icon: "ship",
    order: 1
  },
  {
    id: "2",
    titleEn: "Air Freight",
    titleAr: "الشحن الجوي",
    descriptionEn: "Fast and reliable air cargo solutions for urgent shipments.",
    descriptionAr: "حلول شحن جوي سريعة وموثوقة للشحنات العاجلة.",
    icon: "plane",
    order: 2
  }
];

const DEFAULT_PRODUCTS = [
  {
    id: "1",
    nameEn: "Container Type A",
    nameAr: "حاوية نوع أ",
    descriptionEn: "Standard 20ft container for general cargo.",
    descriptionAr: "حاوية قياسية 20 قدم للبضائع العامة.",
    price: "Variable",
    order: 1
  }
];

function getFromStorage(key: string, defaultValue: any) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export async function getSiteContent() {
  try {
    const res = await fetch('/api/cms/hero');
    if (res.ok) {
      const hero = await res.json();
      // Map server model to local component expected model
      return {
        ...DEFAULT_CONTENT,
        heroTitleEn: hero.title,
        heroSubEn: hero.subtitle,
        heroImageUrl: hero.bgImage,
        heroButtonEn: hero.buttonText
      };
    }
  } catch (e) {
    console.warn('Using default content');
  }
  return DEFAULT_CONTENT;
}

export async function getGlobalSettings() {
  return getFromStorage('site_settings', DEFAULT_SETTINGS);
}

export async function getServices() {
  try {
    const res = await fetch('/api/cms/services');
    if (res.ok) {
      const services = await res.json();
      return services.map((s: any) => ({
        id: s.id,
        titleEn: s.name,
        descriptionEn: s.description,
        price: s.price,
        icon: s.icon,
        order: 0
      }));
    }
  } catch (e) {}
  return DEFAULT_SERVICES;
}

export async function getProducts() {
  return getFromStorage('site_products', DEFAULT_PRODUCTS);
}

export async function getArticles() {
  return getFromStorage('site_articles', [
    {
      id: "1",
      titleEn: "The Future of Maritime Logistics",
      titleAr: "مستقبل اللوجستيات البحرية",
      contentEn: "Digital transformation is reshaping how we handle global trade and shipping routes.",
      contentAr: "التحول الرقمي يعيد تشكيل كيفية تعاملنا مع التجارة العالمية وخطوط الشحن.",
      imageUrl: "https://images.unsplash.com/photo-1494412574743-019485b7593d?auto=format&fit=crop&q=80&w=800",
      createdAt: new Date().toISOString(),
      author: "Ahmed",
      status: "published"
    }
  ]);
}

export async function getPages() {
  return getFromStorage('site_pages', []);
}
