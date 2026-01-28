import { MapPin } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[var(--color-cream)] to-[var(--color-beige)]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-[var(--font-serif)] text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--color-dark-grey)] mb-6">
                        Hakkımızda
                    </h1>
                    <div className="w-24 h-1 bg-[var(--color-soft-gold)] mx-auto"></div>
                </div>
            </section>

            {/* About Content */}
            <section className="py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed mb-8">
                            <span className="font-semibold text-[var(--color-dark-grey)]">Arnas Collection</span>,
                            uzun yıllardır tesettür moda sektöründe öncü bir marka olarak kalite ve zarafeti bir araya getirmektedir.
                        </p>

                        <p className="text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed mb-8">
                            Modern tesettür modasının en seçkin örneklerini sunan markamız, her kadının kendini şık ve özgüvenli
                            hissetmesi için özenle tasarlanmış koleksiyonlar hazırlamaktadır.
                        </p>

                        <p className="text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed mb-8">
                            Kaliteli kumaşlar, zarif kesimler ve detaylara gösterilen özen ile Arnas Collection,
                            tesettür modasında fark yaratmaya devam etmektedir. Müşteri memnuniyetini ön planda tutan
                            anlayışımızla, sizlere en iyi hizmeti sunmak için çalışıyoruz.
                        </p>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="py-16 lg:py-24 bg-[var(--color-cream)]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-[var(--font-serif)] text-3xl md:text-4xl font-semibold text-[var(--color-dark-grey)] mb-4">
                            Mağazamız
                        </h2>
                        <div className="w-16 h-1 bg-[var(--color-soft-gold)] mx-auto"></div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Map Embed */}
                        <div className="h-[300px] md:h-[400px] w-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.2547439847434!2d28.969750277051!3d41.01172797134962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9003b26f2d5%3A0x6939c1bafec5d07b!2sARNAS%20COLLECT%C4%B0ON!5e0!3m2!1str!2str!4v1706467200000!5m2!1str!2str"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        {/* Address Card */}
                        <div className="p-8 md:p-12">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-full bg-[var(--color-soft-gold)]/20 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-7 h-7 text-[var(--color-soft-gold)]" />
                                </div>
                                <div>
                                    <h3 className="font-[var(--font-serif)] text-xl font-semibold text-[var(--color-dark-grey)] mb-2">
                                        Adres
                                    </h3>
                                    <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
                                        Sururi, Bezciler Sk., 34120<br />
                                        Merkez Han Fatih/İstanbul
                                    </p>
                                    <a
                                        href="https://www.google.com/maps/place/ARNAS+COLLECTİON/@41.011728,28.971939,17z"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 mt-4 text-[var(--color-soft-gold)] hover:text-[var(--color-dark-grey)] font-medium transition-colors"
                                    >
                                        <MapPin size={18} />
                                        Haritada Görüntüle
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
