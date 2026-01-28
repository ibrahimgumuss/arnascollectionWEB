'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/data';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const selectedVariant = product.variants[selectedVariantIndex];
    const mainImage = selectedVariant.images[0];

    const handleSwatchClick = (e: React.MouseEvent, index: number) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedVariantIndex(index);
    };

    return (
        <Link
            href={`/products/${product.id}`}
            className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-cream)]">
                <Image
                    src={mainImage}
                    alt={`${product.name} - ${selectedVariant.colorName}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* New Badge */}
                {product.isNew && (
                    <div className="absolute top-3 left-3 bg-[var(--color-soft-gold)] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        Yeni
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Product Name */}
                <h3 className="font-medium text-[var(--color-dark-grey)] text-sm lg:text-base group-hover:text-red-600 transition-colors text-center mb-3">
                    {product.name}
                </h3>

                {/* Color Swatches */}
                {product.variants.length > 1 && (
                    <div className="flex justify-center gap-2">
                        {product.variants.map((variant, index) => (
                            <button
                                key={variant.colorName}
                                onClick={(e) => handleSwatchClick(e, index)}
                                className={`w-6 h-6 rounded-full border-2 transition-all duration-300 hover:scale-110 ${index === selectedVariantIndex
                                        ? 'border-gray-800 ring-2 ring-gray-300 ring-offset-1'
                                        : 'border-gray-300 hover:border-gray-500'
                                    }`}
                                style={{ backgroundColor: variant.colorCode }}
                                title={variant.colorName}
                                aria-label={`${variant.colorName} rengi seç`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}
