import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    home: 'Home',
    contact: 'Contact',
    follow: 'Follow',
    // Hero
    heroHeadline: 'Build Your Own Ecosystem,',
    heroHeadlineLine2: "Don't Just Settle for a Website.",
    heroSubtitle: 'We design and develop high-performance web solutions integrated with smart admin dashboards, giving you absolute control over your business with ease.',
    ctaButton: 'Start Your Project',
    ctaSecondary: 'Get a Free Consultation',
    // Value Proposition
    problemTitle: 'The Problem',
    problemText: 'Tired of rigid, static websites that require a developer for every minor update?',
    solutionTitle: 'The Solution',
    solutionText: 'At Vibe Web, we provide an all-in-one integrated system that lets you manage every detail of your business at the click of a button—no technical expertise required.',
    // Services
    ourServices: 'Our Services',
    servicesSubtitle: 'Performance Meets Aesthetics',
    fullstackTitle: 'Full-Stack Web Development',
    fullstackDesc: 'Lightning-fast, mobile-responsive, and SEO-optimized sites built for growth. We handle everything from frontend to backend.',
    dashboardTitle: 'Custom Admin Dashboards',
    dashboardDesc: 'Take the driver\'s seat. Monitor sales, manage users, and update content in real-time—all from one powerful dashboard.',
    uxuiTitle: 'Premium UX/UI Design',
    uxuiDesc: '"Outside the box" visuals that don\'t just look good—they convert visitors into loyal clients.',
    // Why Choose Us
    whyChooseTitle: 'Why Choose Vibe Web',
    autonomyTitle: 'Total Autonomy',
    autonomyDesc: 'Our user-friendly Admin Panels eliminate the need for constant technical help. You control everything.',
    securityTitle: 'Security & Speed',
    securityDesc: 'Clean, scalable code with high-level data protection and rapid load times. Your site runs fast and stays safe.',
    supportTitle: 'Continuous Support',
    supportDesc: 'We are your partners from the initial concept to long-term post-launch growth. We\'re with you every step.',
    // Stats
    projectsDelivered: 'Projects Delivered',
    timeSaved: 'Avg. Time Saved',
    satisfactionRate: 'Client Satisfaction',
    supportAvailable: 'Support Available',
    // Portfolio
    portfolioTitle: 'Case Studies',
    portfolioSubtitle: 'Focusing on Results',
    portfolioText: "We don't just show layouts; we solve business challenges. From automating workflows to reducing management time by 40% through custom dashboard logic.",
    viewProject: 'View Project',
    // Process
    processTitle: 'Your Journey with Us',
    processSubtitle: 'From concept to launch',
    consultTitle: 'Consultation',
    consultDesc: 'We deep dive into your business needs, goals, and challenges to understand exactly what you need.',
    designTitle: 'Design & Development',
    designDesc: 'Crafting your unique site and the powerful engine (Dashboard) behind it.',
    testTitle: 'Testing & Launch',
    testDesc: 'Meticulous QA to ensure every gear is turning perfectly before we go live.',
    // CTA
    readyToStart: 'Ready to Build Your Ecosystem?',
    ctaSubtitle: "Let's create something extraordinary together. Your dream website is just one click away.",
    contactUs: 'Start Your Project',
    // Footer
    footerTagline: 'Building complete web ecosystems with admin dashboards. Full-stack solutions for businesses worldwide.',
    quickLinks: 'Quick Links',
    connectWithUs: 'Connect With Us',
    rights: 'All rights reserved.',
    trustBadge: 'Building ecosystems, not just websites',
    instagramLabel: 'Follow @vibe_web26',
    emailLabel: 'Message Us',
  },
  ar: {
    // Navbar
    home: 'الرئيسية',
    contact: 'اتصل بنا',
    follow: 'تابعنا',
    // Hero
    heroHeadline: 'ابنِ نظامك البيئي الخاص,',
    heroHeadlineLine2: 'لا تكتفِ بموقع إلكتروني.',
    heroSubtitle: 'نصمم ونطور حلول ويب عالية الأداء مع لوحات تحكم ذكية، مما يمنحك السيطرة الكاملة على عملك بسهولة.',
    ctaButton: 'ابدأ مشروعك',
    ctaSecondary: 'احصل على استشارة مجانية',
    // Value Proposition
    problemTitle: 'المشكلة',
    problemText: 'هل سئمت من المواقع الثابتة التي تحتاج مطوراً لكل تحديث صغير؟',
    solutionTitle: 'الحل',
    solutionText: 'في Vibe Web، نقدم نظاماً متكاملاً يتيح لك إدارة كل تفاصيل عملك بنقرة واحدة—دون الحاجة لخبرة تقنية.',
    // Services
    ourServices: 'خدماتنا',
    servicesSubtitle: 'الأداء يلتقي بالجمال',
    fullstackTitle: 'تطوير ويب متكامل',
    fullstackDesc: 'مواقع سريعة ومتجاوبة ومحسّنة لمحركات البحث مبنية للنمو. نتولى كل شيء من الواجهة إلى الخادم.',
    dashboardTitle: 'لوحات تحكم مخصصة',
    dashboardDesc: 'تولى القيادة. راقب المبيعات وإدارة المستخدمين وتحديث المحتوى في الوقت الحقيقي—كل ذلك من لوحة واحدة.',
    uxuiTitle: 'تصميم تجربة مستخدم متميزة',
    uxuiDesc: 'تصاميم "خارج الصندوق" لا تبدو جيدة فقط—بل تحوّل الزوار إلى عملاء أوفياء.',
    // Why Choose Us
    whyChooseTitle: 'لماذا تختار Vibe Web',
    autonomyTitle: 'استقلالية كاملة',
    autonomyDesc: 'لوحاتنا سهلة الاستخدام تلغي الحاجة للمساعدة التقنية المستمرة. أنت تتحكم في كل شيء.',
    securityTitle: 'الأمان والسرعة',
    securityDesc: 'كود نظيف وقابل للتوسع مع حماية بيانات عالية وسرعة تحميل فائقة. موقعك يعمل بسرعة ويبقى آمناً.',
    supportTitle: 'دعم مستمر',
    supportDesc: 'نحن شركاؤك من الفكرة الأولية إلى النمو طويل المدى بعد الإطلاق. نحن معك في كل خطوة.',
    // Stats
    projectsDelivered: 'مشروع منجز',
    timeSaved: 'متوسط الوقت الموفر',
    satisfactionRate: 'رضا العملاء',
    supportAvailable: 'دعم متاح',
    // Portfolio
    portfolioTitle: 'دراسات حالة',
    portfolioSubtitle: 'التركيز على النتائج',
    portfolioText: 'نحن لا نعرض تصاميم فقط; نحل تحديات الأعمال. من أتمتة سير العمل إلى توفير 40% من وقت الإدارة من خلال منطق لوحة التحكم المخصصة.',
    viewProject: 'عرض المشروع',
    // Process
    processTitle: 'رحلتك معنا',
    processSubtitle: 'من الفكرة إلى الإطلاق',
    consultTitle: 'الاستشارة',
    consultDesc: 'نتعمق في احتياجات عملك وأهدافك والتحديات لفهم ما تحتاجه بالضبط.',
    designTitle: 'التصميم والتطوير',
    designDesc: 'صنع موقعك الفريد والمحرك القوي (لوحة التحكم) خلفه.',
    testTitle: 'الاختبار والإطلاق',
    testDesc: 'ضمان جودة دقيق للتأكد من أن كل شيء يعمل بشكل مثالي قبل أن نبدأ.',
    // CTA
    readyToStart: 'هل أنت مستعد لبناء نظامك البيئي؟',
    ctaSubtitle: 'لنخلق شيئاً استثنائياً معاً. موقع أحلامك على بعد نقرة واحدة.',
    contactUs: 'ابدأ مشروعك',
    // Footer
    footerTagline: 'بناء أنظمة ويب متكاملة مع لوحات تحكم. حلول متكاملة للشركات في جميع أنحاء العالم.',
    quickLinks: 'روابط سريعة',
    connectWithUs: 'تواصل معنا',
    rights: 'جميع الحقوق محفوظة.',
    trustBadge: 'نبني أنظمة بيئية، ليس فقط مواقع',
    instagramLabel: 'تابع @vibe_web26',
    emailLabel: 'راسلنا',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}