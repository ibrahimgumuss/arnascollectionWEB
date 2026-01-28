'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSiteContext } from '@/context/SiteContext';

export default function CategoryShowcase() {
    const { categories, isLoaded } = useSiteContext();

    if (!isLoaded) {
        return (
            <section className="py-10 lg:py-14 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="text-gray-400">Yükleniyor...</div>
                    </div>
                </div>
            </section>
        );
    }

    if (categories.length === 0) {
        return null;
    }

    return (
        <section className="py-10 lg:py-14 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="font-[var(--font-serif)] text-2xl lg:text-3xl font-semibold text-[var(--color-dark-grey)]">
                        Kategoriler
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/?category=${category.slug}`}
                            className="group block"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-cream)] rounded-lg shadow-md">
                                {category.imageUrl ? (
                                    <Image
                                        src={category.imageUrl}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 640px) 50vw, 25vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        <span className="text-4xl">📦</span>
                                    </div>
                                )}
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                            </div>

                            {/* Category Label */}
                            <div className="mt-4 text-center">
                                <h3 className="text-xl lg:text-2xl font-bold uppercase tracking-wider text-[var(--color-dark-grey)] group-hover:text-red-600 transition-colors">
                                    {category.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
