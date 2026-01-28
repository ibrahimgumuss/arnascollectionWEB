import Link from 'next/link';
import { Instagram, MapPin, Send } from 'lucide-react';

const SOCIAL_LINKS = {
    instagram: 'https://www.instagram.com/arnas_tesettur_toptan/',
    telegram: 'https://t.me/arnascollection',
    maps: 'https://www.google.com/maps/place/ARNAS+COLLECTİON/@41.011728,28.971939,17z/data=!3m1!4b1!4m6!3m5!1s0x14cab9003b26f2d5:0x6939c1bafec5d07b!8m2!3d41.011728!4d28.971939!16s%2Fg%2F11y75v213f?entry=ttu&g_ep=EgoyMDI2MDEyNS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D',
    whatsapp: 'https://wa.me/905340106547',
};

export default function Footer() {
    return (
        <footer className="bg-[var(--color-beige)] border-t border-[var(--color-border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Kurumsal Links */}
                    <div className="text-center md:text-left">
                        <h3 className="font-[var(--font-serif)] text-lg font-semibold text-[var(--color-dark-grey)] mb-4">
                            Kurumsal
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/hakkimizda"
                                    className="text-[var(--color-text-muted)] hover:text-[var(--color-soft-gold)] text-sm transition-colors"
                                >
                                    Hakkımızda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/iletisim"
                                    className="text-[var(--color-text-muted)] hover:text-[var(--color-soft-gold)] text-sm transition-colors"
                                >
                                    İletişim
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Icons */}
                    <div className="text-center md:text-right">
                        <h3 className="font-[var(--font-serif)] text-lg font-semibold text-[var(--color-dark-grey)] mb-4">
                            Bizi Takip Edin
                        </h3>
                        <div className="flex items-center justify-center md:justify-end space-x-4">
                            <a
                                href={SOCIAL_LINKS.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[var(--color-dark-grey)] hover:text-[#E4405F] hover:shadow-lg transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram size={24} />
                            </a>
                            <a
                                href={SOCIAL_LINKS.telegram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[var(--color-dark-grey)] hover:text-[#0088cc] hover:shadow-lg transition-all duration-300"
                                aria-label="Telegram"
                            >
                                <Send size={24} />
                            </a>
                            <a
                                href={SOCIAL_LINKS.maps}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[var(--color-dark-grey)] hover:text-[#EA4335] hover:shadow-lg transition-all duration-300"
                                aria-label="Konum"
                            >
                                <MapPin size={24} />
                            </a>
                            <a
                                href={SOCIAL_LINKS.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[var(--color-dark-grey)] hover:text-[#25D366] hover:shadow-lg transition-all duration-300"
                                aria-label="WhatsApp"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
                    <p className="text-center text-sm text-[var(--color-text-muted)]">
                        © {new Date().getFullYear()} Arnas Collection. Tüm hakları saklıdır.
                    </p>
                </div>
            </div>
        </footer>
    );
}
