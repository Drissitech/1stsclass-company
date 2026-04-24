import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About Us",
        services: "Services",
        products: "Products",
        contact: "Contact Us",
        admin: "Admin"
      },
      hero: {
        headline: "We connect the world to your business needs",
        subheadline: "First Class Advanced Co. is your trusted partner in sourcing, import, export, and international shipping, with integrated solutions serving companies and factories across various sectors.",
        intro: "In a world where trade moves fast and markets change constantly, companies need a partner who understands international sourcing requirements professionally.",
        ctaRequest: "Request a Quote",
        ctaExplore: "Explore Our Services",
        ctaContact: "Contact Us",
        ctaStart: "Start Your Partnership"
      },
      whyUs: {
        title: "Why Us",
        description: "We believe our excellence is not just in fulfilling orders, but in providing real value at every stage of the process.",
        points: [
          "Practical experience in international trade and sourcing management.",
          "Wide network of reliable suppliers, manufacturers, and trade partners.",
          "Ability to handle diverse needs across multiple sectors.",
          "Meticulous tracking of orders, documents, and logistics procedures.",
          "Commitment to clarity, quality, and reliability in every process.",
          "Professional understanding of international business nature and requirements."
        ]
      },
      stats: {
        shiptments: "Shipments Delivered",
        partners: "Global Partners",
        satisfaction: "Client Satisfaction",
        experience: "Years of Experience"
      },
      about: {
        title: "About The Company",
        description: "First Class Advanced Co. is specialized in sourcing and international trade, providing professional services in import, export, and international shipping, focusing on meeting the needs of companies and factories of various types and sizes.",
        vision: "To be a leading and trusted partner in international sourcing and trade, helping companies access the best commercial and logistical solutions with efficiency and professionalism.",
        mission: "Providing integrated sourcing and commercial solutions that support our clients' businesses and achieve real value through quality, commitment, flexibility, and rapid response.",
        values: {
          trust: "Trust",
          professionalism: "Professionalism",
          transparency: "Transparency",
          commitment: "Commitment",
          quality: "Quality",
          partnership: "Long-term Partnership"
        }
      },
      services: {
        title: "Our Services",
        description: "We offer an integrated range of services that help companies manage their commercial and logistical needs with high efficiency.",
        list: {
          internationalSourcing: {
            title: "International Sourcing",
            description: "We provide sourcing services from global markets by searching for suitable suppliers and reviewing options."
          },
          importExport: {
            title: "Import & Export",
            description: "Supporting our clients in executing import and export operations professionally with documentation follow-up."
          },
          shippingLogistics: {
            title: "Shipping & Logistics",
            description: "Integrated logistical solutions including shipping coordination and cargo tracking."
          },
          poManagement: {
            title: "PO Management",
            description: "Helping companies manage purchase orders by reviewing needs and comparing offers."
          },
          relationshipDev: {
            title: "Business Relationship Development",
            description: "Building bridges of cooperation between our clients and trade partners in various markets."
          }
        }
      },
      products: {
        title: "Our Products",
        description: "We provide flexible solutions to secure various types of goods based on client needs.",
        categories: {
          trading: "Trading Products",
          rawMaterials: "Raw Materials",
          industrial: "Industrial Products",
          building: "Building & Construction Materials",
          special: "Special Requirements"
        },
        customRequest: "If you don't find the product you're looking for, our team can help you source and coordinate it for the best solution."
      },
      faq: {
        title: "Frequently Asked Questions",
        q1: "Do you offer shipping services only or sourcing as well?",
        a1: "We provide integrated solutions including sourcing, trade coordination, shipping follow-up, and logistical services.",
        q2: "Can you provide products not listed on the site?",
        a2: "Yes, we handle various needs and can study requests to find suitable solutions based on client specifications."
      },
      contact: {
        title: "Contact Us",
        form: {
          name: "Name",
          company: "Company Name",
          email: "Email",
          phone: "Phone Number",
          service: "Type of Service",
          message: "Order Details",
          send: "Send Request"
        },
        info: {
          phone: "Phone",
          email: "Email",
          whatsapp: "WhatsApp",
          address: "Address"
        }
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
        about: "من نحن",
        services: "خدماتنا",
        products: "المنتجات",
        contact: "تواصل معنا",
        admin: "لوحة التحكم"
      },
      hero: {
        headline: "نربط العالم باحتياجات أعمالكم",
        subheadline: "شركة الدرجة الأولى المتقدمة هي شريككم الموثوق في التوريد، الاستيراد، التصدير، والشحن الدولي، مع حلول متكاملة تخدم الشركات والمصانع في مختلف القطاعات.",
        intro: "في عالم تتحرك فيه التجارة بسرعة وتتغير فيه الأسواق باستمرار، تحتاج الشركات إلى شريك يفهم متطلبات التوريد الدولي باحترافية.",
        ctaRequest: "اطلب عرض سعر",
        ctaExplore: "استكشف خدماتنا",
        ctaContact: "تواصل معنا",
        ctaStart: "ابدأ شراكتك معنا"
      },
      whyUs: {
        title: "قسم لماذا نحن",
        description: "نؤمن أن تميزنا لا يقوم فقط على تنفيذ الطلبات، بل على تقديم قيمة حقيقية في كل مرحلة من مراحل العمل.",
        points: [
          "خبرة عملية في التجارة الدولية وإدارة عمليات التوريد.",
          "شبكة واسعة من الموردين والمصنعين والشركاء التجاريين.",
          "قدرة على التعامل مع احتياجات متنوعة في قطاعات متعددة.",
          "متابعة دقيقة للطلبات والمستندات والإجراءات اللوجستية.",
          "التزام بالوضوح والجودة والموثوقية في كل عملية.",
          "فهم احترافي لطبيعة الأعمال الدولية ومتطلباتها."
        ]
      },
      stats: {
        shiptments: "شحنات تم تسليمها",
        partners: "شركاء عالميون",
        satisfaction: "رضا العملاء",
        experience: "سنوات الخبرة"
      },
      about: {
        title: "عن الشركة",
        description: "شركة الدرجة الأولى المتقدمة هي شركة متخصصة في التوريد والتجارة الدولية، تقدم خدمات احترافية في مجالات الاستيراد، التصدير، والشحن الدولي، مع التركيز على تلبية احتياجات الشركات والمصانع بمختلف أنواعها وأحجامها.",
        vision: "أن نكون شريكاً رائداً وموثوقاً في التوريد والتجارة الدولية، وأن نساهم في تمكين الشركات من الوصول إلى أفضل الحلول التجارية واللوجستية بكفاءة واحترافية.",
        mission: "تقديم حلول توريد وتجارية متكاملة تدعم أعمال عملائنا، وتحقق لهم قيمة حقيقية من خلال الجودة، الالتزام، المرونة، وسرعة الاستجابة.",
        values: {
          trust: "الثقة",
          professionalism: "الاحترافية",
          transparency: "الشفافية",
          commitment: "الالتزام",
          quality: "الجودة",
          partnership: "الشراكة طويلة الأمد"
        }
      },
      services: {
        title: "الخدمات",
        description: "نقدم في شركة الدرجة الأولى المتقدمة مجموعة متكاملة من الخدمات التي تساعد الشركات والمصانع على إدارة احتياجاتها التجارية واللوجستية بكفاءة عالية.",
        list: {
          internationalSourcing: {
            title: "التوريد الدولي",
            description: "نوفر خدمات التوريد من الأسواق العالمية عبر البحث عن الموردين المناسبين ودراسة الخيارات."
          },
          importExport: {
            title: "الاستيراد والتصدير",
            description: "ندعم عملائنا في تنفيذ عمليات الاستيراد والتصدير باحترافية مع متابعة المتطلبات المستندية."
          },
          shippingLogistics: {
            title: "الشحن والخدمات اللوجستية",
            description: "نقدم حلولاً لوجستية متكاملة تشمل تنسيق الشحن ومتابعة حركة البضائع."
          },
          poManagement: {
            title: "إدارة طلبات الشراء",
            description: "نساعد الشركات في إدارة طلبات الشراء من خلال مراجعة الاحتياج ومقارنة العروض."
          },
          relationshipDev: {
            title: "تطوير العلاقات التجارية",
            description: "نعمل على بناء جسور تعاون بين عملائنا والشركاء التجاريين والموردين في الأسواق المختلفة."
          }
        }
      },
      products: {
        title: "المنتجات",
        description: "نوفر حلولاً مرنة لتأمين مختلف أنواع البضائع والمنتجات بناءً على احتياج العميل.",
        categories: {
          trading: "المنتجات التجارية",
          rawMaterials: "المواد الأولية",
          industrial: "المنتجات الصناعية",
          building: "مواد البناء والإنشاء",
          special: "الاحتياجات الخاصة والمنتجات حسب الطلب"
        },
        customRequest: "إذا لم تجد المنتج الذي تبحث عنه، يمكن لفريقنا مساعدتك في البحث والتأمين والتنسيق التجاري للحصول على الحل الأنسب."
      },
      faq: {
        title: "الأسئلة الشائعة",
        q1: "هل تقدمون خدمات التوريد فقط أم تشملون الشحن أيضاً؟",
        a1: "نقدم حلولاً متكاملة تشمل التوريد، التنسيق التجاري، ومتابعة الشحن والخدمات اللوجستية بحسب طبيعة الطلب واحتياجات العميل.",
        q2: "هل يمكنكم توفير منتجات غير موجودة في الموقع؟",
        a2: "نعم، نحن نتعامل مع احتياجات متنوعة، ويمكننا دراسة الطلب والبحث عن الحل المناسب وفق المواصفات والمتطلبات المقدمة من العميل."
      },
      contact: {
        title: "تواصل معنا",
        form: {
          name: "الاسم",
          company: "اسم الشركة",
          email: "البريد الإلكتروني",
          phone: "رقم الهاتف",
          service: "نوع الخدمة المطلوبة",
          message: "تفاصيل الطلب",
          send: "إرسال الطلب"
        },
        info: {
          phone: "الهاتف",
          email: "البريد الإلكتروني",
          whatsapp: "واتساب",
          address: "العنوان"
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie']
    }
  });

export default i18n;
