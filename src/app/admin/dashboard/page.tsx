'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Package,
    Image,
    LogOut,
    Menu,
    Plus,
    Pencil,
    Trash2,
    Home,
    Grid,
    Upload,
    Save,
    Layers
} from 'lucide-react';
import { useSiteContext, Product, Category, HeroSlide } from '@/context/SiteContext';

const AUTH_KEY = 'arnas_admin_auth';

type ActiveTab = 'products' | 'categories' | 'hero';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('products');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const {
        products,
        categories,
        heroSlides,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        isLoaded
    } = useSiteContext();

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

    const handleLogout = () => {
        localStorage.removeItem(AUTH_KEY);
        router.push('/admin');
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

    const getTabTitle = () => {
        switch (activeTab) {
            case 'products': return 'Ürün Yönetimi';
            case 'categories': return 'Kategori Yönetimi';
            case 'hero': return 'Hero Slayt Yönetimi';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-xl font-bold">Arnas Admin</h1>
                    <p className="text-gray-400 text-sm">Yönetim Paneli</p>
                </div>

                <nav className="p-4 space-y-2">
                    <button
                        onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <Package size={20} />
                        Ürün Yönetimi
                    </button>

                    <button
                        onClick={() => { setActiveTab('categories'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'categories' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <Grid size={20} />
                        Kategori Yönetimi
                    </button>

                    <button
                        onClick={() => { setActiveTab('hero'); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'hero' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <Layers size={20} />
                        Hero Slaytları
                    </button>

                    <hr className="border-gray-800 my-4" />

                    <Link
                        href="/"
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        <Home size={20} />
                        Siteyi Görüntüle
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
                    >
                        <LogOut size={20} />
                        Çıkış Yap
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800">
                            {getTabTitle()}
                        </h2>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-6">
                    {activeTab === 'products' && (
                        <ProductManagement products={products} onDelete={deleteProduct} />
                    )}
                    {activeTab === 'categories' && (
                        <CategoryManagement
                            categories={categories}
                            onAdd={addCategory}
                            onUpdate={updateCategory}
                            onDelete={deleteCategory}
                        />
                    )}
                    {activeTab === 'hero' && (
                        <HeroSlideManagement
                            slides={heroSlides}
                            onAdd={addHeroSlide}
                            onUpdate={updateHeroSlide}
                            onDelete={deleteHeroSlide}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}

// Product Management Component
function ProductManagement({
    products,
    onDelete
}: {
    products: Product[];
    onDelete: (id: string) => void;
}) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        onDelete(id);
        setShowDeleteConfirm(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="text-gray-600">{products.length} ürün listeleniyor</p>
                <Link
                    href="/admin/dashboard/product/new"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <Plus size={20} />
                    Yeni Ürün Ekle
                </Link>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Ürün</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Kategori</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Varyant</th>
                            <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Tarih</th>
                            <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                                            {product.variants[0]?.images[0] && (
                                                <img
                                                    src={product.variants[0].images[0]}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <span className="font-medium text-gray-800">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-1">
                                        {product.variants.slice(0, 3).map((v, i) => (
                                            <div
                                                key={i}
                                                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                                                style={{ backgroundColor: v.colorCode }}
                                                title={v.colorName}
                                            />
                                        ))}
                                        {product.variants.length > 3 && (
                                            <span className="text-sm text-gray-500">+{product.variants.length - 3}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{product.createdAt}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/dashboard/product/${product.id}`}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Pencil size={18} />
                                        </Link>
                                        <button
                                            onClick={() => setShowDeleteConfirm(product.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    {/* Delete Confirmation */}
                                    {showDeleteConfirm === product.id && (
                                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                            <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ürünü Sil?</h3>
                                                <p className="text-gray-600 mb-4">
                                                    "{product.name}" ürününü silmek istediğinize emin misiniz?
                                                </p>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => setShowDeleteConfirm(null)}
                                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                                    >
                                                        İptal
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                                    >
                                                        Sil
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {products.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Henüz ürün eklenmemiş.
                    </div>
                )}
            </div>
        </div>
    );
}

// Category Management Component
function CategoryManagement({
    categories,
    onAdd,
    onUpdate,
    onDelete
}: {
    categories: Category[];
    onAdd: (category: Omit<Category, 'id'>, imageFile?: File) => Promise<void>;
    onUpdate: (id: string, updates: Partial<Category>, imageFile?: File) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', slug: '' });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

    const resetForm = () => {
        setFormData({ name: '', slug: '' });
        setSelectedFile(null);
        setPreviewUrl(null);
        setShowAddForm(false);
        setEditingId(null);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/ı/g, 'i')
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleNameChange = (name: string) => {
        setFormData({
            name,
            slug: generateSlug(name)
        });
    };

    const handleAdd = async () => {
        if (!formData.name.trim()) return;

        setIsSaving(true);
        try {
            await onAdd(
                { name: formData.name, slug: formData.slug, imageUrl: '' },
                selectedFile || undefined
            );
            resetForm();
        } catch (error) {
            console.error('Error adding category:', error);
        }
        setIsSaving(false);
    };

    const handleEdit = (category: Category) => {
        setEditingId(category.id);
        setFormData({ name: category.name, slug: category.slug });
        setPreviewUrl(category.imageUrl);
        setSelectedFile(null);
    };

    const handleUpdate = async () => {
        if (!editingId || !formData.name.trim()) return;

        setIsSaving(true);
        try {
            await onUpdate(
                editingId,
                { name: formData.name, slug: formData.slug },
                selectedFile || undefined
            );
            resetForm();
        } catch (error) {
            console.error('Error updating category:', error);
        }
        setIsSaving(false);
    };

    const handleDelete = async (id: string) => {
        try {
            await onDelete(id);
            setShowDeleteConfirm(null);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="text-gray-600">{categories.length} kategori listeleniyor</p>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <Plus size={20} />
                    Yeni Kategori Ekle
                </button>
            </div>

            {/* Add/Edit Form */}
            {(showAddForm || editingId) && (
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                    <h3 className="font-semibold text-gray-800 text-lg">
                        {editingId ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Adı *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                                placeholder="Örn: İkili Takım"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                                placeholder="Örn: ikili-takim"
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Görseli</label>
                        <div className="flex items-start gap-4">
                            {/* Preview */}
                            <div className="w-32 h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <Image size={32} />
                                    </div>
                                )}
                            </div>

                            {/* Upload Button */}
                            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors">
                                <Upload size={24} className="text-gray-400 mb-2" />
                                <span className="text-gray-500 text-sm">Görsel Yükle</span>
                                <span className="text-gray-400 text-xs mt-1">PNG, JPG, WebP</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={resetForm}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            İptal
                        </button>
                        <button
                            onClick={editingId ? handleUpdate : handleAdd}
                            disabled={isSaving || !formData.name.trim()}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Kaydediliyor...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Kaydet
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <div key={category.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="h-36 bg-gray-100">
                            {category.imageUrl ? (
                                <img
                                    src={category.imageUrl}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <Image size={48} />
                                </div>
                            )}
                        </div>
                        <div className="p-4 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-800">{category.name}</h3>
                                <p className="text-sm text-gray-500">{category.slug}</p>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(category.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Delete Confirmation */}
                        {showDeleteConfirm === category.id && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Kategori Sil?</h3>
                                    <p className="text-gray-600 mb-4">
                                        "{category.name}" kategorisini silmek istediğinize emin misiniz?
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowDeleteConfirm(null)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                        >
                                            İptal
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl">
                    Henüz kategori eklenmemiş.
                </div>
            )}
        </div>
    );
}

// Hero Slide Management Component
function HeroSlideManagement({
    slides,
    onAdd,
    onUpdate,
    onDelete
}: {
    slides: HeroSlide[];
    onAdd: (imageFile: File, title: string, subtitle: string) => Promise<void>;
    onUpdate: (id: string, updates: Partial<HeroSlide>, imageFile?: File) => Promise<void>;
    onDelete: (id: string, imageUrl?: string) => Promise<void>;
}) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ title: '', subtitle: '' });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

    const resetForm = () => {
        setFormData({ title: '', subtitle: '' });
        setSelectedFile(null);
        setPreviewUrl(null);
        setShowAddForm(false);
        setEditingId(null);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleAdd = async () => {
        if (!selectedFile) {
            alert('Görsel gereklidir.');
            return;
        }

        setIsSaving(true);
        try {
            await onAdd(selectedFile, formData.title, formData.subtitle);
            resetForm();
        } catch (error) {
            console.error('Error adding hero slide:', error);
        }
        setIsSaving(false);
    };

    const handleEdit = (slide: HeroSlide) => {
        setEditingId(slide.id);
        setFormData({ title: slide.title, subtitle: slide.subtitle || '' });
        setPreviewUrl(slide.imageUrl);
        setSelectedFile(null);
    };

    const handleUpdate = async () => {
        if (!editingId) return;

        setIsSaving(true);
        try {
            await onUpdate(
                editingId,
                { title: formData.title, subtitle: formData.subtitle },
                selectedFile || undefined
            );
            resetForm();
        } catch (error) {
            console.error('Error updating hero slide:', error);
        }
        setIsSaving(false);
    };

    const handleDelete = async (slide: HeroSlide) => {
        try {
            await onDelete(slide.id, slide.imageUrl);
            setShowDeleteConfirm(null);
        } catch (error) {
            console.error('Error deleting hero slide:', error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="text-gray-600">{slides.length} slayt listeleniyor</p>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <Plus size={20} />
                    Yeni Slayt Ekle
                </button>
            </div>

            {/* Add/Edit Form */}
            {(showAddForm || editingId) && (
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                    <h3 className="font-semibold text-gray-800 text-lg">
                        {editingId ? 'Slayt Düzenle' : 'Yeni Slayt Ekle'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                                placeholder="Örn: Yeni Sezon Koleksiyonu"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık</label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                                placeholder="Örn: Her Detayda Zarafeti Keşfedin"
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Slayt Görseli {!editingId && '*'}
                        </label>
                        <div className="flex items-start gap-4">
                            {/* Preview */}
                            <div className="w-48 h-28 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <Layers size={32} />
                                    </div>
                                )}
                            </div>

                            {/* Upload Button */}
                            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors">
                                <Upload size={24} className="text-gray-400 mb-2" />
                                <span className="text-gray-500 text-sm">Görsel Yükle (1920x1080 önerilir)</span>
                                <span className="text-gray-400 text-xs mt-1">PNG, JPG, WebP</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={resetForm}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            İptal
                        </button>
                        <button
                            onClick={editingId ? handleUpdate : handleAdd}
                            disabled={isSaving || (!editingId && !selectedFile)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Kaydediliyor...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    {editingId ? 'Güncelle' : 'Slayt Ekle'}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Slides List */}
            <div className="space-y-4">
                {slides.map((slide) => (
                    <div key={slide.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex">
                        <div className="w-48 h-28 bg-gray-100 flex-shrink-0">
                            {slide.imageUrl ? (
                                <img
                                    src={slide.imageUrl}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <Layers size={32} />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 p-4 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-800">{slide.title}</h3>
                                <p className="text-sm text-gray-500">{slide.subtitle || '—'}</p>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => handleEdit(slide)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(slide.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Delete Confirmation */}
                        {showDeleteConfirm === slide.id && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-xl p-6 max-w-sm mx-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Slaytı Sil?</h3>
                                    <p className="text-gray-600 mb-4">
                                        "{slide.title}" slaytını silmek istediğinize emin misiniz?
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setShowDeleteConfirm(null)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                        >
                                            İptal
                                        </button>
                                        <button
                                            onClick={() => handleDelete(slide)}
                                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                        >
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {slides.length === 0 && (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl">
                    Henüz slayt eklenmemiş. İlk slaytınızı ekleyin!
                </div>
            )}
        </div>
    );
}
