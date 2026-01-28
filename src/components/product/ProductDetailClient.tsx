'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import ProductGrid from '@/components/product/ProductGrid';
import { useSiteContext } from '@/context/SiteContext';
import { sortProductsByDate } from '@/lib/data';

interface ProductDetailClientProps {
    productId: string;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
    const { products, isLoaded } = useSiteContext();
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

    const product = products.find(p => p.id === productId);

    // Get related products (same category, excluding current)
    const relatedProducts = product
        ? sortProductsByDate(
            products.filter((p) => p.category === product.category && p.id !== product.id),
            'desc'
        ).slice(0, 4)
        : [];

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-400">Yükleniyor...</div>
            </div>
        );
    }

    if (!product) {
        notFound();
    }

    const selectedVariant = product.variants[selectedVariantIndex];

    return (
        <main className="min-h-screen bg-white">
            {/* Product Section */}
            <section className="py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* 50/50 Split Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left: Gallery */}
                        <div>
                            {/* Mobile Product Title - Above Gallery */}
                            <h1 className="lg:hidden font-[var(--font-serif)] text-2xl font-semibold text-[var(--color-dark-grey)] mb-4 text-center">
                                {product.name}
                            </h1>

                            <ProductGallery
                                variants={product.variants}
                                productName={product.name}
                                selectedVariantIndex={selectedVariantIndex}
                                onVariantChange={setSelectedVariantIndex}
                            />
                        </div>

                        {/* Right: Product Info */}
                        <div className="flex flex-col">
                            {/* Product Title - Desktop Only */}
                            <h1 className="hidden lg:block font-[var(--font-serif)] text-3xl lg:text-4xl font-semibold text-[var(--color-dark-grey)] mb-4">
                                {product.name}
                            </h1>

                            {/* Description */}
                            {product.description && (
                                <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-8">
                                    {product.description}
                                </p>
                            )}

                            {/* Size Information - Dynamic Display */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-[var(--color-dark-grey)] uppercase tracking-wider mb-3">
                                        Beden Bilgileri
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.sizes.map((size) => (
                                            <span
                                                key={size}
                                                className="w-14 h-12 flex items-center justify-center text-sm font-medium rounded-lg border-2 border-gray-200 bg-gray-50 text-[var(--color-dark-grey)] cursor-default"
                                            >
                                                {size}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Color Selection */}
                            {product.variants.length > 1 && (
                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold text-[var(--color-dark-grey)] uppercase tracking-wider mb-3">
                                        Renk: <span className="font-normal text-gray-600">{selectedVariant.colorName}</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {product.variants.map((variant, index) => (
                                            <button
                                                key={variant.colorName}
                                                onClick={() => setSelectedVariantIndex(index)}
                                                className={`w-10 h-10 rounded-full border-2 transition-all duration-300 hover:scale-110 ${index === selectedVariantIndex
                                                    ? 'border-gray-800 ring-2 ring-gray-300 ring-offset-2'
                                                    : 'border-gray-300 hover:border-gray-500'
                                                    }`}
                                                style={{ backgroundColor: variant.colorCode }}
                                                title={variant.colorName}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Single Color Display (when only 1 variant) */}
                            {product.variants.length === 1 && (
                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold text-[var(--color-dark-grey)] uppercase tracking-wider mb-3">
                                        Renk
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded-full border-2 border-gray-300"
                                            style={{ backgroundColor: selectedVariant.colorCode }}
                                        />
                                        <span className="text-gray-700">{selectedVariant.colorName}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-12 lg:py-16 bg-[var(--color-cream)]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8">
                            <h2 className="font-[var(--font-serif)] text-2xl lg:text-3xl font-semibold text-[var(--color-dark-grey)]">
                                Benzer Ürünler
                            </h2>
                        </div>
                    </div>
                    <ProductGrid products={relatedProducts} />
                </section>
            )}
        </main>
    );
}
