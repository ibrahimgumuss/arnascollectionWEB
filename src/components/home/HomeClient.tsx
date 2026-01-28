'use client';

import { useMemo } from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import ProductGrid from '@/components/product/ProductGrid';
import { useSiteContext } from '@/context/SiteContext';
import { sortProductsByDate, categories } from '@/lib/data';

interface HomeClientProps {
    searchQuery: string;
    categoryFilter: string;
    showAll: boolean;
}

export default function HomeClient({ searchQuery, categoryFilter, showAll }: HomeClientProps) {
    const { products, isLoaded } = useSiteContext();

    // Check if this is a category view or show all view
    const isCategoryView = !!categoryFilter;
    const isSearchView = !!searchQuery;
    const isShowAllView = showAll;

    // Get category name for display
    const categoryInfo = categories.find(c => c.slug === categoryFilter);
    const categoryName = categoryInfo?.name || '';

    // Memoized filtered and sorted products
    const { filteredProducts, allProductsSorted, latestProducts } = useMemo(() => {
        let filtered = [...products];

        if (searchQuery) {
            // Search filter
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        } else if (categoryFilter) {
            // Category filter - show ALL matching products
            filtered = filtered.filter((product) =>
                product.category === categoryFilter
            );
        }

        // ALWAYS sort by date (newest first)
        filtered = sortProductsByDate(filtered, 'desc');
        const allSorted = sortProductsByDate(products, 'desc');
        const latest = sortProductsByDate(products, 'desc').slice(0, 8);

        return { filteredProducts: filtered, allProductsSorted: allSorted, latestProducts: latest };
    }, [products, searchQuery, categoryFilter]);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-400">Yükleniyor...</div>
            </div>
        );
    }

    // ============================================
    // SCENARIO: Search Results View
    // ============================================
    if (isSearchView) {
        return (
            <>
                {/* Search Results Section - NO Hero, NO CategoryShowcase */}
                <section className="py-12 lg:py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8 lg:mb-12">
                            <span className="text-[var(--color-soft-gold)] text-sm uppercase tracking-widest font-medium">
                                Arama Sonuçları
                            </span>
                            <h2 className="font-[var(--font-serif)] text-3xl lg:text-4xl font-semibold text-[var(--color-dark-grey)] mt-2">
                                &ldquo;{searchQuery}&rdquo; için sonuçlar
                            </h2>
                            <p className="mt-4 text-[var(--color-text-muted)] max-w-2xl mx-auto">
                                {filteredProducts.length} ürün bulundu.
                            </p>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <ProductGrid products={filteredProducts} />
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-[var(--color-text-muted)] text-lg">
                                Aramanızla eşleşen ürün bulunamadı. Lütfen farklı bir arama terimi deneyin.
                            </p>
                        </div>
                    )}
                </section>
            </>
        );
    }

    // ============================================
    // SCENARIO B: Category Listing View
    // ============================================
    if (isCategoryView) {
        return (
            <>
                {/* Category Results Section - NO Hero, NO CategoryShowcase */}
                <section className="py-12 lg:py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8 lg:mb-12">
                            <h2 className="font-[var(--font-serif)] text-3xl lg:text-4xl font-semibold text-[var(--color-dark-grey)]">
                                {categoryName.toUpperCase()} MODELLERİ
                            </h2>
                            <p className="mt-4 text-[var(--color-text-muted)] max-w-2xl mx-auto">
                                {filteredProducts.length} ürün bulundu.
                            </p>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <ProductGrid products={filteredProducts} />
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-[var(--color-text-muted)] text-lg">
                                Bu kategoride ürün bulunamadı.
                            </p>
                        </div>
                    )}
                </section>
            </>
        );
    }

    // ============================================
    // SCENARIO C: Show All Products View
    // ============================================
    if (isShowAllView) {
        return (
            <>
                {/* All Products Section */}
                <section className="py-12 lg:py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8 lg:mb-12">
                            <h2 className="font-[var(--font-serif)] text-3xl lg:text-4xl font-semibold text-[var(--color-dark-grey)]">
                                TÜM ÜRÜNLER
                            </h2>
                            <p className="mt-4 text-[var(--color-text-muted)] max-w-2xl mx-auto">
                                Koleksiyonumuzdaki tüm ürünleri keşfedin. ({allProductsSorted.length} ürün)
                            </p>
                        </div>
                    </div>
                    <ProductGrid products={allProductsSorted} />
                </section>
            </>
        );
    }

    // ============================================
    // SCENARIO A: Landing Page (Root Home)
    // ============================================
    return (
        <>
            <HeroSection />
            <CategoryShowcase />

            {/* Yeni Eklenenler - Latest 8 Products */}
            <section className="py-12 lg:py-16 bg-[var(--color-cream)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 lg:mb-12">
                        <h2 className="font-[var(--font-serif)] text-3xl lg:text-4xl font-semibold text-[var(--color-dark-grey)]">
                            YENİ EKLENENLER
                        </h2>
                        <p className="mt-4 text-[var(--color-text-muted)] max-w-2xl mx-auto">
                            En yeni ve şık parçalar şimdi sizler için eklendi.
                        </p>
                    </div>
                </div>
                <ProductGrid products={latestProducts} />
            </section>
        </>
    );
}
