import { MapPin, Phone, Users } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaTelegram } from 'react-icons/fa';

const SOCIAL_LINKS = {
    instagram: 'https://www.instagram.com/arnas_tesettur_toptan/',
    telegram: 'https://t.me/arnascollection',
    whatsapp: 'https://wa.me/905340106547',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[var(--color-cream)] to-[var(--color-beige)]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-[var(--font-serif)] text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--color-dark-grey)] mb-6">
                        İletişim
                    </h1>
                    <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
                        Bizimle iletişime geçmek için aşağıdaki kanalları kullanabilirsiniz.
                    </p>
                    <div className="w-24 h-1 bg-[var(--color-soft-gold)] mx-auto mt-6"></div>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-16 lg:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Visit Us Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-shadow duration-300">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-soft-gold)] to-[#d4a853] flex items-center justify-center mb-6">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-[var(--font-serif)] text-2xl font-semibold text-[var(--color-dark-grey)] mb-4">
                                Mağaza
                            </h3>
                            <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
                                Sururi, Bezciler Sk., 34120<br />
                                Merkez Han Fatih/İstanbul
                            </p>
                            <a
                                href="https://www.google.com/maps/place/ARNAS+COLLECTİON/@41.011728,28.971939,17z"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-soft-gold)] text-white rounded-full font-medium hover:bg-[#d4a853] transition-colors"
                            >
                                <MapPin size={18} />
                                Yol Tarifi Al
                            </a>
                        </div>

                        {/* Call Us Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-shadow duration-300">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6">
                                <Phone className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-[var(--font-serif)] text-2xl font-semibold text-[var(--color-dark-grey)] mb-4">
                                Telefon
                            </h3>
                            <p className="text-[var(--color-text-muted)] leading-relaxed mb-2">
                                Bizi arayın veya WhatsApp üzerinden ulaşın
                            </p>
                            <p className="text-2xl font-bold text-[var(--color-dark-grey)] mb-6">
                                0534 010 65 47
                            </p>
                            <a
                                href="tel:+905340106547"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
                            >
                                <Phone size={18} />
                                Hemen Ara
                            </a>
                        </div>

                        {/* Social Media Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-shadow duration-300">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-[var(--font-serif)] text-2xl font-semibold text-[var(--color-dark-grey)] mb-4">
                                Sosyal Medya
                            </h3>
                            <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
                                Bizi sosyal medyada takip edin
                            </p>
                            <div className="flex flex-col gap-3">
                                <a
                                    href={SOCIAL_LINKS.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-5 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:bg-[#128C7E] transition-colors"
                                >
                                    <FaWhatsapp size={22} />
                                    WhatsApp
                                </a>
                                <a
                                    href={SOCIAL_LINKS.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                                >
                                    <FaInstagram size={22} />
                                    Instagram
                                </a>
                                <a
                                    href={SOCIAL_LINKS.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-5 py-3 bg-[#0088cc] text-white rounded-xl font-medium hover:bg-[#0077b5] transition-colors"
                                >
                                    <FaTelegram size={22} />
                                    Telegram
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 lg:py-24 bg-[var(--color-cream)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-[var(--font-serif)] text-3xl md:text-4xl font-semibold text-[var(--color-dark-grey)] mb-4">
                            Konumumuz
                        </h2>
                        <div className="w-16 h-1 bg-[var(--color-soft-gold)] mx-auto"></div>
                    </div>

                    <div className="rounded-2xl overflow-hidden shadow-xl">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.2547439847434!2d28.969750277051!3d41.01172797134962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9003b26f2d5%3A0x6939c1bafec5d07b!2sARNAS%20COLLECT%C4%B0ON!5e0!3m2!1str!2str!4v1706467200000!5m2!1str!2str"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>
        </main>
    );
}
