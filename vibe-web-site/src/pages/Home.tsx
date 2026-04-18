import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useEffect, useRef, useState } from 'react';

// Floating shapes component
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full animate-float blur-sm" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-pink-500/20 rounded-full animate-float blur-sm" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full animate-float blur-sm" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-purple-500/15 rounded-full animate-float blur-sm" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-500/15 rounded-full animate-float blur-sm" style={{ animationDelay: '2s' }} />
    </div>
  );
}

// Animated Section component with scroll reveal
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} ${className}`}
    >
      {children}
    </div>
  );
}

// 3D Icon component
function Icon3D({ type, href, label }: { type: 'instagram' | 'email'; href: string; label: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-500 ${
          isHovered ? 'scale-110 rotate-6' : ''
        } ${type === 'instagram' ? 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400' : 'bg-gradient-to-br from-blue-600 to-cyan-400'}`}
        style={{
          transform: isHovered ? 'perspective(500px) rotateY(15deg) rotateX(5deg)' : 'perspective(500px) rotateY(0deg)',
          boxShadow: isHovered
            ? type === 'instagram'
              ? '0 20px 40px rgba(236, 72, 153, 0.4)'
              : '0 20px 40px rgba(59, 130, 246, 0.4)'
            : '0 10px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        {type === 'instagram' ? (
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        ) : (
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )}
      </div>
      <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm font-medium text-white bg-gray-900 px-3 py-1 rounded-full`}>
        {label}
      </div>
    </a>
  );
}

export default function Home() {
  const { t, language } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: t('fullstackTitle'),
      desc: t('fullstackDesc'),
      gradient: 'from-purple-500 to-indigo-600',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: t('dashboardTitle'),
      desc: t('dashboardDesc'),
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: t('uxuiTitle'),
      desc: t('uxuiDesc'),
      gradient: 'from-cyan-500 to-blue-600',
    },
  ];

  const whyChoose = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: t('autonomyTitle'),
      desc: t('autonomyDesc'),
      color: 'text-purple-400',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: t('securityTitle'),
      desc: t('securityDesc'),
      color: 'text-pink-400',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: t('supportTitle'),
      desc: t('supportDesc'),
      color: 'text-blue-400',
    },
  ];

  const processSteps = [
    {
      num: '01',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: t('consultTitle'),
      desc: t('consultDesc'),
    },
    {
      num: '02',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: t('designTitle'),
      desc: t('designDesc'),
    },
    {
      num: '03',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t('testTitle'),
      desc: t('testDesc'),
    },
  ];

  return (
    <div className={`bg-gray-950 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-950 to-pink-900/30" />
        <FloatingShapes />

        <div
          className="absolute top-20 left-10 w-64 h-64 border border-purple-500/20 rounded-full"
          style={{ transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.1}deg)` }}
        />
        <div
          className="absolute bottom-20 right-10 w-48 h-48 border border-pink-500/20 rounded-full"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="mb-4" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
            <span className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-6 py-2 rounded-full text-sm font-medium border border-purple-500/30">
              {t('trustBadge')}
            </span>
          </div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            <span className="text-white">{t('heroHeadline')}</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {t('heroHeadlineLine2')}
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          >
            {t('heroSubtitle')}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <Link
              to="/contact"
              className="group relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-5 rounded-full font-bold text-xl overflow-hidden shadow-lg shadow-purple-500/30"
            >
              <span className="relative z-10">{t('ctaButton')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-purple-500/50 text-purple-300 px-12 py-5 rounded-full font-bold text-xl hover:bg-purple-500/10 transition-all hover:border-purple-400"
            >
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Value Proposition - Problem/Solution */}
      <section className="py-24 bg-gray-900 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-red-900/30 to-red-900/10 rounded-3xl p-10 border border-red-500/20 h-full">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-red-400 mb-4">{t('problemTitle')}</h3>
                <p className="text-xl text-gray-300 leading-relaxed">{t('problemText')}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="bg-gradient-to-br from-green-900/30 to-green-900/10 rounded-3xl p-10 border border-green-500/20 h-full">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-green-400 mb-4">{t('solutionTitle')}</h3>
                <p className="text-xl text-gray-300 leading-relaxed">{t('solutionText')}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900" />

        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('ourServices')}</h2>
            <p className="text-2xl text-purple-400 mb-6">{t('servicesSubtitle')}</p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full" />
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 150}>
                <div className="group bg-gray-800/50 backdrop-blur-sm rounded-3xl p-10 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 h-full">
                  <div className={`w-24 h-24 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-8 text-white group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{service.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-900 relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('whyChooseTitle')}</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyChoose.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 150}>
                <div className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/30 transition-all text-center h-full">
                  <div className={`w-20 h-20 bg-gray-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6 ${item.color}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio / Case Studies */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('portfolioTitle')}</h2>
            <p className="text-2xl text-purple-400 mb-4">{t('portfolioSubtitle')}</p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl p-12 max-w-4xl mx-auto border border-purple-500/20 text-center">
              <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
                {t('portfolioText')}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                {t('viewProject')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('processTitle')}</h2>
            <p className="text-xl text-gray-400">{t('processSubtitle')}</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.num} delay={index * 200}>
                <div className="relative group">
                  {index < 2 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent z-0" />
                  )}

                  <div className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all relative z-10 text-center h-full">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                      {step.icon}
                    </div>
                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-400/20 to-pink-400/20 bg-clip-text text-transparent mb-4">
                      {step.num}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500 via-pink-500 to-transparent animate-pulse" />
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">{t('readyToStart')}</h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">{t('ctaSubtitle')}</p>
            <Link
              to="/contact"
              className="inline-block bg-white text-purple-900 px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl shadow-purple-500/30 mb-16"
            >
              {t('contactUs')}
            </Link>

            {/* Interactive 3D Icons */}
            <div className="flex justify-center gap-12 mt-16">
              <Icon3D
                type="instagram"
                href="https://www.instagram.com/vibe_web26/"
                label={t('instagramLabel')}
              />
              <Icon3D
                type="email"
                href="mailto:vibeweb26@gmail.com"
                label={t('emailLabel')}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}