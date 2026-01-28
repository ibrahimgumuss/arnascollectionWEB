'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Save, Upload, X, Image as ImageIcon } from 'lucide-react';
import { useSiteContext, ColorVariant } from '@/context/SiteContext';

const AUTH_KEY = 'arnas_admin_auth';

const CATEGORIES = [
    { value: 'ikili-takim', label: 'İkili Takım' },
    { value: 'tunik', label: 'Tunik' },
    { value: 'elbise', label: 'Elbise' },
    { value: 'gomlek', label: 'Gömlek' },
];

interface VariantWithFiles extends ColorVariant {
    newFiles: File[];
}

export default function ProductFormPage() {
    const params = useParams();
    const router = useRouter();
    const { products, addProduct, updateProduct, isLoaded } = useSiteContext();

    const isNew = params.id === 'new';
    const productId = isNew ? null : params.id as string;
    const existingProduct = productId ? products.find(p => p.id === productId) : null;

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [category, setCategory] = useState('ikili-takim');
    const [description, setDescription] = useState('');
    const [variants, setVariants] = useState<VariantWithFiles[]>([
        { colorName: '', colorCode: '#000000', images: [], newFiles: [] }
    ]);
    const [sizesInput, setSizesInput] = useState('');

    // Check authentication
    useEffect(() => {
        const token = localStorage.getItem(AUTH_KEY);
        if (!token) {
            router.push('/admin');
        } else {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, [router]);

    // Load existing product data
    useEffect(() => {
        if (existingProduct) {
            setName(existingProduct.name);
            setCategory(existingProduct.category);
            setDescription(existingProduct.description || '');
            setVariants(existingProduct.variants.map(v => ({ ...v, newFiles: [] })));
            setSizesInput((existingProduct.sizes || []).join(', '));
        }
    }, [existingProduct]);

    // Add new variant
    const addVariant = () => {
        setVariants([...variants, { colorName: '', colorCode: '#000000', images: [], newFiles: [] }]);
    };

    // Remove variant
    const removeVariant = (index: number) => {
        if (variants.length > 1) {
            setVariants(variants.filter((_, i) => i !== index));
        }
    };

    // Update variant
    const updateVariant = (index: number, field: keyof ColorVariant, value: string | string[]) => {
        const updated = [...variants];
        updated[index] = { ...updated[index], [field]: value };
        setVariants(updated);
    };

    // Handle file selection for a variant
    const handleFileSelect = (variantIndex: number, files: FileList | null) => {
        if (!files) return;

        const updated = [...variants];
        const newFiles = Array.from(files);
        updated[variantIndex].newFiles = [...updated[variantIndex].newFiles, ...newFiles];
        setVariants(updated);
    };

    // Remove a pending file
    const removePendingFile = (variantIndex: number, fileIndex: number) => {
        const updated = [...variants];
        updated[variantIndex].newFiles = updated[variantIndex].newFiles.filter((_, i) => i !== fileIndex);
        setVariants(updated);
    };

    // Remove an existing image URL
    const removeExistingImage = (variantIndex: number, imageIndex: number) => {
        const updated = [...variants];
        updated[variantIndex].images = updated[variantIndex].images.filter((_, i) => i !== imageIndex);
        setVariants(updated);
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            // Validate variants
            const validVariants = variants.filter(v =>
                v.colorName.trim() !== '' && (v.images.length > 0 || v.newFiles.length > 0)
            );

            if (validVariants.length === 0) {
                alert('En az bir varyant ve görsel eklemelisiniz.');
                setIsSaving(false);
                return;
            }

            // Parse sizes
            const parsedSizes = sizesInput
                .split(',')
                .map(s => s.trim())
                .filter(s => s.length > 0);

            // Prepare variants without newFiles for storage
            const cleanVariants: ColorVariant[] = validVariants.map(v => ({
                colorName: v.colorName,
                colorCode: v.colorCode,
                images: v.images
            }));

            // Prepare image files for upload
            const imageFiles: File[][] = validVariants.map(v => v.newFiles);

            const productData = {
                name,
                category,
                description,
                variants: cleanVariants,
                price: 0,
                isNew: true,
                sizes: parsedSizes,
                createdAt: existingProduct?.createdAt || new Date().toISOString().split('T')[0],
            };

            if (isNew) {
                await addProduct(productData, imageFiles);
            } else if (productId) {
                await updateProduct(productId, productData, imageFiles);
            }

            router.push('/admin/dashboard');
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Ürün kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
            setIsSaving(false);
        }
    };

    if (isLoading || !isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-gray-600">Yükleniyor...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm px-6 py-4">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <button
                        onClick={() => router.push('/admin/dashboard')}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800">
                        {isNew ? 'Yeni Ürün Ekle' : 'Ürünü Düzenle'}
                    </h1>
                </div>
            </header>

            {/* Form */}
            <main className="max-w-4xl mx-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                        <h2 className="font-semibold text-gray-800 text-lg">Temel Bilgiler</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı *</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                                placeholder="Örn: Zarif Siyah Elbise"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent resize-none"
                                placeholder="Ürün açıklaması..."
                            />
                        </div>
                    </div>

                    {/* Variants */}
                    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-gray-800 text-lg">Renk Varyantları</h2>
                            <button
                                type="button"
                                onClick={addVariant}
                                className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                            >
                                <Plus size={16} />
                                Varyant Ekle
                            </button>
                        </div>

                        {variants.map((variant, vIndex) => (
                            <div key={vIndex} className="border border-gray-200 rounded-lg p-4 space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-medium text-gray-700">Varyant {vIndex + 1}</h3>
                                    {variants.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeVariant(vIndex)}
                                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Renk Adı *</label>
                                        <input
                                            type="text"
                                            value={variant.colorName}
                                            onChange={(e) => updateVariant(vIndex, 'colorName', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                                            placeholder="Örn: Siyah"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Renk Kodu</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={variant.colorCode}
                                                onChange={(e) => updateVariant(vIndex, 'colorCode', e.target.value)}
                                                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                                            />
                                            <input
                                                type="text"
                                                value={variant.colorCode}
                                                onChange={(e) => updateVariant(vIndex, 'colorCode', e.target.value)}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Images Section */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Görseller *</label>

                                    {/* Existing Images */}
                                    {variant.images.length > 0 && (
                                        <div className="grid grid-cols-4 gap-2 mb-3">
                                            {variant.images.map((img, iIndex) => (
                                                <div key={iIndex} className="relative group">
                                                    <img
                                                        src={img}
                                                        alt={`Görsel ${iIndex + 1}`}
                                                        className="w-full h-24 object-cover rounded-lg border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeExistingImage(vIndex, iIndex)}
                                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Pending Files Preview */}
                                    {variant.newFiles.length > 0 && (
                                        <div className="grid grid-cols-4 gap-2 mb-3">
                                            {variant.newFiles.map((file, fIndex) => (
                                                <div key={fIndex} className="relative group">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={file.name}
                                                        className="w-full h-24 object-cover rounded-lg border border-blue-300"
                                                    />
                                                    <div className="absolute inset-0 bg-blue-500/10 rounded-lg border-2 border-blue-400 border-dashed" />
                                                    <button
                                                        type="button"
                                                        onClick={() => removePendingFile(vIndex, fIndex)}
                                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                    <span className="absolute bottom-1 left-1 text-xs bg-blue-500 text-white px-1 rounded">
                                                        Yeni
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* File Upload Button */}
                                    <label className="flex items-center justify-center gap-2 w-full h-16 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors">
                                        <Upload size={20} className="text-gray-400" />
                                        <span className="text-gray-500">Görsel Yükle</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => handleFileSelect(vIndex, e.target.files)}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Birden fazla görsel seçebilirsiniz. Desteklenen formatlar: JPG, PNG, WebP
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sizes */}
                    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                        <h2 className="font-semibold text-gray-800 text-lg">Bedenler</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bedenler (Virgülle ayırın: S, M, L veya 36, 38)
                            </label>
                            <input
                                type="text"
                                value={sizesInput}
                                onChange={(e) => setSizesInput(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                                placeholder="Örn: 36, 38, 40 veya S, M, L, XL"
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                Birden fazla beden için virgül ile ayırın. Örnek: "S, M, L" veya "36, 38, 40, 42"
                            </p>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => router.push('/admin/dashboard')}
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            İptal
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Kaydediliyor...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    Kaydet
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
