'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaTelegram, FaMapMarkerAlt } from 'react-icons/fa';

const contactLinks = [
    {
        id: 'whatsapp',
        icon: FaWhatsapp,
        label: 'WhatsApp',
        href: 'https://wa.me/905001234567',
        bgColor: 'bg-green-500 hover:bg-green-600',
    },
    {
        id: 'instagram',
        icon: FaInstagram,
        label: 'Instagram',
        href: 'https://instagram.com/arnascollection',
        bgColor: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:from-purple-700 hover:via-pink-600 hover:to-orange-500',
    },
    {
        id: 'telegram',
        icon: FaTelegram,
        label: 'Telegram',
        href: 'https://t.me/arnascollection',
        bgColor: 'bg-sky-500 hover:bg-sky-600',
    },
    {
        id: 'maps',
        icon: FaMapMarkerAlt,
        label: 'Konum',
        href: 'https://maps.google.com/?q=Istanbul,Turkey',
        bgColor: 'bg-red-500 hover:bg-red-600',
    },
];

export default function FloatingContactMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3">
            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform ${isOpen
                        ? 'bg-gray-700 hover:bg-gray-800 rotate-0'
                        : 'bg-[var(--color-burgundy)] hover:bg-[var(--color-burgundy-dark)] rotate-0'
                    }`}
                aria-label={isOpen ? 'Menüyü Kapat' : 'İletişim Menüsü'}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <MessageCircle className="w-6 h-6 text-white" />
                )}
            </button>

            {/* Contact Icons */}
            <div
                className={`flex flex-col gap-3 transition-all duration-300 ${isOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
            >
                {contactLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                        <a
                            key={link.id}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 ${link.bgColor}`}
                            style={{
                                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                            }}
                            aria-label={link.label}
                            title={link.label}
                        >
                            <Icon className="w-5 h-5" />
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
