'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteContext } from '@/context/SiteContext';

// Default placeholder slide for when no slides exist
const placeholderSlide = {
    id: 'placeholder',
    title: 'Arnas Collection',
    subtitle: 'Modern Tesettür Modası',
    imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=1920&h=1080&fit=crop'
};

export default function HeroSection() {
    const { heroSlides, isLoaded } = useSiteContext();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Use heroSlides or fallback to placeholder
    const slides = heroSlides.length > 0 ? heroSlides : [placeholderSlide];

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    // Reset slide index if out of bounds
    useEffect(() => {
        if (currentSlide >= slides.length) {
            setCurrentSlide(0);
        }
    }, [slides.length, currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    if (!isLoaded) {
        return (
            <section className="w-full aspect-[1800/700] md:h-[80vh] md:aspect-auto bg-[var(--color-beige)] flex items-center justify-center">
                <div className="text-gray-400">Yükleniyor...</div>
            </section>
        );
    }

    return (
        <section className="relative w-full aspect-[1800/700] md:h-[80vh] md:aspect-auto overflow-hidden bg-[var(--color-beige)]">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={slide.imageUrl}
                            alt={slide.title}
                            fill
                            className="object-contain md:object-cover"
                            priority={index === 0}
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-black/20 md:bg-black/30" />
                    </div>

                    {/* Content */}
                    <div className="relative h-full flex items-center justify-center text-center px-4">
                        <div
                            className={`transform transition-all duration-1000 delay-300 ${index === currentSlide
                                ? 'translate-y-0 opacity-100'
                                : 'translate-y-8 opacity-0'
                                }`}
                        >
                            <h2 className="font-[var(--font-serif)] text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-2 md:mb-4 tracking-wide drop-shadow-lg">
                                {slide.title}
                            </h2>
                            {slide.subtitle && (
                                <p className="text-sm sm:text-base md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
                                    {slide.subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows - only show if more than one slide */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors rounded-full"
                        aria-label="Önceki"
                    >
                        <ChevronLeft size={20} className="md:w-6 md:h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors rounded-full"
                        aria-label="Sonraki"
                    >
                        <ChevronRight size={20} className="md:w-6 md:h-6" />
                    </button>
                </>
            )}

            {/* Slide Indicators - only show if more than one slide */}
            {slides.length > 1 && (
                <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2 md:space-x-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                                ? 'w-6 md:w-8 bg-[var(--color-soft-gold)]'
                                : 'bg-white/50 hover:bg-white/80'
                                }`}
                            aria-label={`Slayt ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
