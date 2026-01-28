'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    collection,
    doc,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    setDoc,
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Product, ColorVariant, products as defaultProducts } from '@/lib/data';

// Category Interface
export interface Category {
    id: string;
    name: string;
    slug: string;
    imageUrl: string;
}

// Hero Slide Interface (new structure with string id)
export interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    order?: number;
}

// Default Categories
const defaultCategories: Category[] = [
    { id: '1', name: 'İkili Takım', slug: 'ikili-takim', imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop' },
    { id: '2', name: 'Tunik', slug: 'tunik', imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&h=800&fit=crop' },
    { id: '3', name: 'Elbise', slug: 'elbise', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop' },
    { id: '4', name: 'Gömlek', slug: 'gomlek', imageUrl: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&h=800&fit=crop' },
];

// Default Hero Slides
const defaultHeroSlides: Omit<HeroSlide, 'id'>[] = [
    {
        title: 'Yeni Sezon Koleksiyonu',
        subtitle: 'Her Detayda Zarafeti Keşfedin',
        imageUrl: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=1920&h=1080&fit=crop',
        order: 1
    },
    {
        title: 'Şık İkili Takımlar',
        subtitle: 'Her Anınız İçin Zarif Tasarımlar',
        imageUrl: 'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=1920&h=1080&fit=crop',
        order: 2
    },
    {
        title: 'Zarif Elbiseler',
        subtitle: 'Modern Tarz, Tesettür Değerleri',
        imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1920&h=1080&fit=crop',
        order: 3
    },
];

// Site Context State Interface
interface SiteContextState {
    products: Product[];
    categories: Category[];
    heroSlides: HeroSlide[];
    isLoaded: boolean;
    // Product CRUD
    addProduct: (product: Omit<Product, 'id'>, imageFiles?: File[][]) => Promise<void>;
    updateProduct: (id: string, product: Partial<Product>, imageFiles?: File[][]) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    // Category CRUD
    addCategory: (category: Omit<Category, 'id'>, imageFile?: File) => Promise<void>;
    updateCategory: (id: string, updates: Partial<Category>, imageFile?: File) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
    // Hero Slide CRUD
    addHeroSlide: (imageFile: File, title: string, subtitle: string) => Promise<void>;
    updateHeroSlide: (id: string, updates: Partial<HeroSlide>, imageFile?: File) => Promise<void>;
    deleteHeroSlide: (id: string, imageUrl?: string) => Promise<void>;
    // Image Upload
    uploadImage: (file: File, path: string) => Promise<string>;
    // Helpers
    getProductById: (id: string) => Product | undefined;
    getProductsByCategory: (category: string) => Product[];
    getUniqueCategories: () => string[];
}

// Create Context
const SiteContext = createContext<SiteContextState | undefined>(undefined);

// Provider Component
export function SiteProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>(defaultCategories);
    const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Subscribe to Firestore collections
    useEffect(() => {
        // Products subscription
        const unsubscribeProducts = onSnapshot(
            collection(db, 'products'),
            (snapshot: QuerySnapshot<DocumentData>) => {
                const productsData: Product[] = [];
                snapshot.forEach((docSnap) => {
                    productsData.push({ id: docSnap.id, ...docSnap.data() } as Product);
                });
                setProducts(productsData);
                setIsLoaded(true);
            },
            (error: Error) => {
                console.error('Error fetching products:', error);
                setProducts(defaultProducts);
                setIsLoaded(true);
            }
        );

        // Categories subscription
        const unsubscribeCategories = onSnapshot(
            collection(db, 'categories'),
            (snapshot: QuerySnapshot<DocumentData>) => {
                if (snapshot.empty) {
                    // Initialize default categories if collection is empty
                    defaultCategories.forEach(async (cat) => {
                        await addDoc(collection(db, 'categories'), {
                            name: cat.name,
                            slug: cat.slug,
                            imageUrl: cat.imageUrl
                        });
                    });
                } else {
                    const categoriesData: Category[] = [];
                    snapshot.forEach((docSnap) => {
                        categoriesData.push({ id: docSnap.id, ...docSnap.data() } as Category);
                    });
                    setCategories(categoriesData);
                }
            },
            (error: Error) => {
                console.error('Error fetching categories:', error);
            }
        );

        // Hero slides subscription
        const unsubscribeHeroSlides = onSnapshot(
            collection(db, 'hero_slides'),
            (snapshot: QuerySnapshot<DocumentData>) => {
                if (snapshot.empty) {
                    // Initialize default hero slides if collection is empty
                    defaultHeroSlides.forEach(async (slide) => {
                        await addDoc(collection(db, 'hero_slides'), slide);
                    });
                } else {
                    const slidesData: HeroSlide[] = [];
                    snapshot.forEach((docSnap) => {
                        slidesData.push({ id: docSnap.id, ...docSnap.data() } as HeroSlide);
                    });
                    // Sort by order if exists
                    slidesData.sort((a, b) => (a.order || 0) - (b.order || 0));
                    setHeroSlides(slidesData);
                }
            },
            (error: Error) => {
                console.error('Error fetching hero slides:', error);
            }
        );

        return () => {
            unsubscribeProducts();
            unsubscribeCategories();
            unsubscribeHeroSlides();
        };
    }, []);

    // Upload image to Firebase Storage
    const uploadImage = async (file: File, path: string): Promise<string> => {
        const timestamp = Date.now();
        const fileName = `${timestamp}_${file.name}`;
        const storageRef = ref(storage, `${path}/${fileName}`);

        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    };

    // Delete image from Firebase Storage
    const deleteImage = async (imageUrl: string) => {
        try {
            // Extract path from URL
            const urlParts = imageUrl.split('/o/');
            if (urlParts.length > 1) {
                const pathWithParams = urlParts[1];
                const path = decodeURIComponent(pathWithParams.split('?')[0]);
                const imageRef = ref(storage, path);
                await deleteObject(imageRef);
            }
        } catch (error) {
            console.error('Error deleting image from storage:', error);
        }
    };

    // Add Product
    const addProduct = async (product: Omit<Product, 'id'>, imageFiles?: File[][]) => {
        try {
            let variants = [...product.variants];

            if (imageFiles && imageFiles.length > 0) {
                for (let vIndex = 0; vIndex < variants.length; vIndex++) {
                    const variantFiles = imageFiles[vIndex] || [];
                    const uploadedUrls: string[] = [];

                    for (const file of variantFiles) {
                        const url = await uploadImage(file, 'products');
                        uploadedUrls.push(url);
                    }

                    const existingUrls = variants[vIndex].images.filter(img => img.startsWith('http'));
                    variants[vIndex] = {
                        ...variants[vIndex],
                        images: [...existingUrls, ...uploadedUrls]
                    };
                }
            }

            const productData = {
                ...product,
                variants,
                createdAt: product.createdAt || new Date().toISOString().split('T')[0],
            };

            await addDoc(collection(db, 'products'), productData);
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    };

    // Update Product
    const updateProduct = async (id: string, updates: Partial<Product>, imageFiles?: File[][]) => {
        try {
            let finalUpdates = { ...updates };

            if (imageFiles && updates.variants) {
                const variants = [...updates.variants];

                for (let vIndex = 0; vIndex < variants.length; vIndex++) {
                    const variantFiles = imageFiles[vIndex] || [];
                    const uploadedUrls: string[] = [];

                    for (const file of variantFiles) {
                        const url = await uploadImage(file, 'products');
                        uploadedUrls.push(url);
                    }

                    if (uploadedUrls.length > 0) {
                        const existingUrls = variants[vIndex].images.filter(img => img.startsWith('http'));
                        variants[vIndex] = {
                            ...variants[vIndex],
                            images: [...existingUrls, ...uploadedUrls]
                        };
                    }
                }

                finalUpdates.variants = variants;
            }

            await updateDoc(doc(db, 'products', id), finalUpdates);
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    };

    // Delete Product
    const deleteProduct = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'products', id));
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    };

    // Add Category
    const addCategory = async (category: Omit<Category, 'id'>, imageFile?: File) => {
        try {
            let imageUrl = category.imageUrl || '';

            if (imageFile) {
                imageUrl = await uploadImage(imageFile, 'categories');
            }

            await addDoc(collection(db, 'categories'), {
                name: category.name,
                slug: category.slug,
                imageUrl
            });
        } catch (error) {
            console.error('Error adding category:', error);
            throw error;
        }
    };

    // Update Category
    const updateCategory = async (id: string, updates: Partial<Category>, imageFile?: File) => {
        try {
            let finalUpdates = { ...updates };

            if (imageFile) {
                finalUpdates.imageUrl = await uploadImage(imageFile, 'categories');
            }

            await updateDoc(doc(db, 'categories', id), finalUpdates);
        } catch (error) {
            console.error('Error updating category:', error);
            throw error;
        }
    };

    // Delete Category
    const deleteCategory = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'categories', id));
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    };

    // Add Hero Slide
    const addHeroSlide = async (imageFile: File, title: string, subtitle: string) => {
        try {
            const imageUrl = await uploadImage(imageFile, 'hero');
            const order = heroSlides.length + 1;

            await addDoc(collection(db, 'hero_slides'), {
                title,
                subtitle,
                imageUrl,
                order
            });
        } catch (error) {
            console.error('Error adding hero slide:', error);
            throw error;
        }
    };

    // Update Hero Slide
    const updateHeroSlide = async (id: string, updates: Partial<HeroSlide>, imageFile?: File) => {
        try {
            let finalUpdates = { ...updates };

            if (imageFile) {
                finalUpdates.imageUrl = await uploadImage(imageFile, 'hero');
            }

            // Remove id from updates
            const { id: _, ...updateData } = finalUpdates as HeroSlide;

            await updateDoc(doc(db, 'hero_slides', id), updateData);
        } catch (error) {
            console.error('Error updating hero slide:', error);
            throw error;
        }
    };

    // Delete Hero Slide
    const deleteHeroSlide = async (id: string, imageUrl?: string) => {
        try {
            // Delete from Firestore
            await deleteDoc(doc(db, 'hero_slides', id));

            // Delete image from Storage if provided
            if (imageUrl && imageUrl.includes('firebasestorage.googleapis.com')) {
                await deleteImage(imageUrl);
            }
        } catch (error) {
            console.error('Error deleting hero slide:', error);
            throw error;
        }
    };

    // Get Product by ID
    const getProductById = (id: string): Product | undefined => {
        return products.find((p) => p.id === id);
    };

    // Get Products by Category
    const getProductsByCategory = (category: string): Product[] => {
        return products.filter((p) => p.category === category);
    };

    // Get Unique Categories
    const getUniqueCategories = (): string[] => {
        return [...new Set(products.map((p) => p.category))];
    };

    const value: SiteContextState = {
        products,
        categories,
        heroSlides,
        isLoaded,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        uploadImage,
        getProductById,
        getProductsByCategory,
        getUniqueCategories,
    };

    return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

// Hook to use context
export function useSiteContext() {
    const context = useContext(SiteContext);
    if (context === undefined) {
        throw new Error('useSiteContext must be used within a SiteProvider');
    }
    return context;
}

// Re-export types
export type { Product, ColorVariant };
