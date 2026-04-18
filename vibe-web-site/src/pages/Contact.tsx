import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(language === 'en' ? `New Contact from ${formData.name}` : `اتصال جديد من ${formData.name}`);
    const body = encodeURIComponent(
      language === 'en'
        ? `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        : `الاسم: ${formData.name}\nالبريد الإلكتروني: ${formData.email}\n\nالرسالة:\n${formData.message}`
    );
    window.location.href = `mailto:vibeweb26@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`bg-gray-950 min-h-screen py-20 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            {language === 'en' ? 'Get in Touch' : 'تواصل معنا'}
          </h1>
          <p className="text-gray-400 text-center mb-12">
            {language === 'en'
              ? "Ready to start your project? We'd love to hear from you."
              : 'هل أنت مستعد لبدء مشروعك؟ نود أن نسمع منك.'}
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-purple-500/20">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {language === 'en' ? 'Message Sent!' : 'تم إرسال الرسالة!'}
                  </h3>
                  <p className="text-gray-400">
                    {language === 'en'
                      ? "Thank you for reaching out. We'll get back to you soon."
                      : 'شكراً لتواصلك معنا. سنعود إليك قريباً.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">
                      {language === 'en' ? 'Your Name' : 'اسمك'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder={language === 'en' ? 'John Doe' : 'أحمد محمد'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">
                      {language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder={language === 'en' ? 'john@example.com' : 'example@email.com'}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-white mb-2">
                      {language === 'en' ? 'Your Message' : 'رسالتك'}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                      placeholder={language === 'en' ? 'Tell us about your project...' : 'أخبرنا عن مشروعك...'}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    {language === 'en' ? 'Send Message' : 'إرسال الرسالة'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gray-900 rounded-2xl p-8 border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-6">
                  {language === 'en' ? 'Contact Information' : 'معلومات الاتصال'}
                </h3>
                <div className="space-y-4">
                  <a
                    href="mailto:vibeweb26@gmail.com"
                    className="flex items-center gap-4 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{language === 'en' ? 'Email' : 'البريد الإلكتروني'}</p>
                      <p>vibeweb26@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://www.instagram.com/vibe_web26/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Instagram</p>
                      <p>@vibe_web26</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 text-center border border-purple-500/20">
                <div className="flex justify-center mb-4">
                  <svg className="w-12 h-12 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {language === 'en' ? 'Follow Us' : 'تابعنا'}
                </h3>
                <p className="text-gray-300 mb-4">
                  {language === 'en'
                    ? 'Stay updated with our latest projects and tips'
                    : 'ابق على اطلاع بآخر مشاريعنا ونصائحنا'}
                </p>
                <a
                  href="https://www.instagram.com/vibe_web26/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full text-white hover:bg-white/20 transition-colors"
                >
                  Follow @vibe_web26
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}