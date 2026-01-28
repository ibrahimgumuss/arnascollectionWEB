'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { ColorVariant } from '@/lib/data';

interface ProductGalleryProps {
    variants: ColorVariant[];
    productName: string;
    selectedVariantIndex: number;
    onVariantChange: (index: number) => void;
}

export default function ProductGallery({
    variants,
    productName,
    selectedVariantIndex,
    onVariantChange
}: ProductGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZooming, setIsZooming] = useState(false);

    const currentVariant = variants[selectedVariantIndex];
    const images = currentVariant.images;
    const currentImage = images[selectedImageIndex];

    // Reset image index when variant changes
    useEffect(() => {
        setSelectedImageIndex(0);
    }, [selectedVariantIndex]);

    // Navigate images
    const goToPrevious = useCallback(() => {
        setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const goToNext = useCallback(() => {
        setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isLightboxOpen) return;

            if (e.key === 'Escape') {
                setIsLightboxOpen(false);
            } else if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, goToPrevious, goToNext]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isLightboxOpen]);

    // Handle zoom on hover
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
    };

    return (
        <>
            {/* Main Image Container - 9:16 Vertical Portrait */}
            <div className="space-y-4">
                {/* Main Image with Zoom */}
                <div
                    className="relative aspect-[9/16] max-h-[85vh] mx-auto bg-gray-50 rounded-lg overflow-hidden cursor-zoom-in group"
                    onClick={() => setIsLightboxOpen(true)}
                    onMouseEnter={() => setIsZooming(true)}
                    onMouseLeave={() => setIsZooming(false)}
                    onMouseMove={handleMouseMove}
                >
                    <Image
                        src={currentImage}
                        alt={`${productName} - ${currentVariant.colorName}`}
                        fill
                        className="object-contain transition-transform duration-300 ease-out"
                        style={{
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                            transform: isZooming ? 'scale(1.5)' : 'scale(1)',
                        }}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                    />

                    {/* Zoom Icon Indicator */}
                    <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn size={20} className="text-gray-700" />
                    </div>
                </div>

                {/* Image Thumbnails */}
                {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImageIndex(index)}
                                className={`relative w-20 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${index === selectedImageIndex
                                    ? 'border-red-600 ring-2 ring-red-200'
                                    : 'border-gray-200 hover:border-gray-400'
                                    }`}
                            >
                                <Image
                                    src={image}
                                    alt={`${productName} - Görsel ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsLightboxOpen(false)}
                        className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        aria-label="Kapat"
                    >
                        <X size={28} className="text-white" />
                    </button>

                    {/* Navigation - Previous */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                            className="absolute left-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                            aria-label="Önceki"
                        >
                            <ChevronLeft size={32} className="text-white" />
                        </button>
                    )}

                    {/* Main Lightbox Image */}
                    <div
                        className="relative w-full h-full max-w-[90vw] max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={currentImage}
                            alt={`${productName} - ${currentVariant.colorName}`}
                            fill
                            className="object-contain"
                            sizes="90vw"
                            priority
                        />
                    </div>

                    {/* Navigation - Next */}
                    {images.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className="absolute right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                            aria-label="Sonraki"
                        >
                            <ChevronRight size={32} className="text-white" />
                        </button>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full text-white text-sm">
                        {selectedImageIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </>
    );
}
