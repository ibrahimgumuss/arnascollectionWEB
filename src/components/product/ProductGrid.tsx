import { Product } from '@/lib/data';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[];
    title?: string;
}

export default function ProductGrid({ products, title }: ProductGridProps) {
    return (
        <section className="py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {title && (
                    <h2 className="font-[var(--font-serif)] text-2xl lg:text-3xl font-semibold text-[var(--color-dark-grey)] text-center mb-8 lg:mb-12">
                        {title}
                    </h2>
                )}

                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-[var(--color-text-muted)]">Ürün bulunamadı.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
