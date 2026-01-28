'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Instagram, MapPin, Send, Search, MessageCircle } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Ana Sayfa', highlight: false, isHome: true },
  { href: '/?show=all', label: 'Tüm Ürünler', highlight: true, isHome: false },
  { href: '/?category=ikili-takim', label: 'İkili Takım', highlight: false, isHome: false },
  { href: '/?category=tunik', label: 'Tunik', highlight: false, isHome: false },
  { href: '/?category=elbise', label: 'Elbise', highlight: false, isHome: false },
  { href: '/?category=gomlek', label: 'Gömlek', highlight: false, isHome: false },
];

const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/arnas_tesettur_toptan/',
  telegram: 'https://t.me/arnascollection',
  maps: 'https://www.google.com/maps/place/ARNAS+COLLECTİON/@41.011728,28.971939,17z/data=!3m1!4b1!4m6!3m5!1s0x14cab9003b26f2d5:0x6939c1bafec5d07b!8m2!3d41.011728!4d28.971939!16s%2Fg%2F11y75v213f?entry=ttu&g_ep=EgoyMDI2MDEyNS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D',
  whatsapp: 'https://wa.me/905340106547',
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    // If clicking "Ana Sayfa", always reset to landing page
    if (link.isHome) {
      e.preventDefault();
      // Force navigation to root, clearing ALL query params
      router.push('/');
      // Force scroll to absolute top
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }, 100);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      {/* Row 1: Main Header with Search, Logo, and Social Icons */}
      <header className="bg-white border-b border-gray-100 shadow-md">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout */}
          <div className="flex lg:hidden items-center justify-between py-1">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-900 hover:text-gray-600"
              aria-label="Menüyü aç/kapat"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo - Center */}
            <Link href="/" className="flex-1 flex justify-center">
              <Image
                src="/logo-new.png"
                alt="Arnas Collection"
                width={280}
                height={140}
                className="h-[80px] w-auto object-contain"
                priority
              />
            </Link>

            {/* Mobile Contact Menu */}
            <div className="relative">
              <button
                onClick={() => setIsContactOpen(!isContactOpen)}
                className={`p-2 transition-colors ${isContactOpen ? 'text-red-600' : 'text-gray-700'}`}
                aria-label="İletişim"
              >
                {isContactOpen ? <X size={24} /> : <MessageCircle size={24} />}
              </button>

              {/* Contact Dropdown */}
              {isContactOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[160px] z-50">
                  <a
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsContactOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="text-sm text-gray-700">WhatsApp</span>
                  </a>
                  <a
                    href={SOCIAL_LINKS.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsContactOpen(false)}
                  >
                    <Send size={20} className="text-sky-500" />
                    <span className="text-sm text-gray-700">Telegram</span>
                  </a>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsContactOpen(false)}
                  >
                    <Instagram size={20} className="text-pink-600" />
                    <span className="text-sm text-gray-700">Instagram</span>
                  </a>
                  <a
                    href={SOCIAL_LINKS.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsContactOpen(false)}
                  >
                    <MapPin size={20} className="text-red-500" />
                    <span className="text-sm text-gray-700">Konum</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Layout - 3 Column Grid */}
          <div className="hidden lg:grid grid-cols-3 items-center py-1">
            {/* Left Column: Search Bar */}
            <div className="flex items-center justify-self-start">
              <form onSubmit={handleSearch} className="flex items-center w-full max-w-sm">
                <div className="relative flex items-center w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ara..."
                    className="w-full h-10 pl-4 pr-12 text-gray-700 bg-gray-100 rounded-l-full border-0 focus:outline-none focus:ring-2 focus:ring-red-200 placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="h-10 px-4 bg-red-700 hover:bg-red-800 text-white rounded-r-full transition-colors flex items-center justify-center"
                    aria-label="Ara"
                  >
                    <Search size={18} />
                  </button>
                </div>
              </form>
            </div>

            {/* Center Column: Logo */}
            <div className="flex justify-center">
              <Link href="/">
                <Image
                  src="/logo-new.png"
                  alt="Arnas Collection"
                  width={320}
                  height={160}
                  className="h-[80px] w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Right Column: Social Icons */}
            <div className="flex items-center justify-end space-x-2">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-pink-600 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-blue-500 hover:text-blue-400 transition-colors"
                aria-label="Telegram"
              >
                <Send size={22} />
              </a>
              <a
                href={SOCIAL_LINKS.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-red-600 hover:text-red-400 transition-colors"
                aria-label="Konum"
              >
                <MapPin size={22} />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-green-600 hover:text-green-400 transition-colors"
                aria-label="WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Row 2: Category Navigation Bar - STICKY */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center space-x-8 h-12">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-sm uppercase tracking-wider font-bold transition-colors ${link.highlight
                  ? 'text-red-600 hover:text-red-500'
                  : 'text-gray-700 hover:text-red-600'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-inner">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative flex items-center w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ara..."
                    className="w-full h-10 pl-4 pr-12 text-gray-700 bg-gray-100 rounded-l-full border-0 focus:outline-none focus:ring-2 focus:ring-red-200 placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="h-10 px-4 bg-red-700 hover:bg-red-800 text-white rounded-r-full transition-colors flex items-center justify-center"
                    aria-label="Ara"
                  >
                    <Search size={18} />
                  </button>
                </div>
              </form>

              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { handleNavClick(e, link); setIsMenuOpen(false); }}
                    className={`text-sm uppercase tracking-wider font-bold py-2 text-center transition-colors ${link.highlight
                      ? 'text-red-600 hover:text-red-500'
                      : 'text-gray-700 hover:text-red-600'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
