export interface ColorVariant {
    colorName: string;
    colorCode: string;
    images: string[];
}

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    variants: ColorVariant[];
    isNew: boolean;
    description?: string;
    sizes?: string[];
    createdAt: string;
}

export const products: Product[] = [
    {
        id: "1",
        name: "Yeşil İkili Takım",
        category: "ikili-takim",
        price: 1299,
        variants: [
            {
                colorName: "Yeşil",
                colorCode: "#2d5a27",
                images: [
                    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop&sat=50",
                    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop&flip=h",
                ],
            },
            {
                colorName: "Siyah",
                colorCode: "#1a1a1a",
                images: [
                    "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800&h=1000&fit=crop&sat=-100",
                ],
            },
        ],
        isNew: true,
        description: "Şık ve rahat yeşil ikili takım. Günlük kullanım için ideal, kaliteli kumaştan üretilmiştir.",
        sizes: ["S", "M", "L", "XL"],
        createdAt: "2024-01-25",
    },
    {
        id: "2",
        name: "Klasik Siyah Tunik",
        category: "tunik",
        price: 899,
        variants: [
            {
                colorName: "Siyah",
                colorCode: "#1a1a1a",
                images: [
                    "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&h=1000&fit=crop&flip=h",
                ],
            },
            {
                colorName: "Lacivert",
                colorCode: "#1e3a5f",
                images: [
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop&sat=-50",
                ],
            },
            {
                colorName: "Bordo",
                colorCode: "#722f37",
                images: [
                    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop&flip=h",
                ],
            },
        ],
        isNew: false,
        description: "Her kombine uyum sağlayan klasik siyah tunik. Zarif kesimi ile şıklığınızı tamamlayın.",
        sizes: ["S", "M", "L", "XL"],
        createdAt: "2024-01-10",
    },
    {
        id: "3",
        name: "Dantel Detaylı Elbise",
        category: "elbise",
        price: 1449,
        variants: [
            {
                colorName: "Beyaz",
                colorCode: "#f5f5f5",
                images: [
                    "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop&flip=h",
                    "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop&sat=20",
                ],
            },
            {
                colorName: "Krem",
                colorCode: "#f5e6d3",
                images: [
                    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop&flip=h",
                ],
            },
        ],
        isNew: true,
        description: "Zarif dantel detayları ile özel günleriniz için tasarlanmış şık elbise.",
        sizes: ["S", "M", "L"],
        createdAt: "2024-01-27",
    },
    {
        id: "4",
        name: "Modern Kesim Gömlek",
        category: "gomlek",
        price: 699,
        variants: [
            {
                colorName: "Beyaz",
                colorCode: "#ffffff",
                images: [
                    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=1000&fit=crop&flip=h",
                ],
            },
            {
                colorName: "Mavi",
                colorCode: "#4a90d9",
                images: [
                    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop&sat=30",
                ],
            },
            {
                colorName: "Pembe",
                colorCode: "#e8a0b5",
                images: [
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop&hue=300",
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop&hue=300&flip=h",
                ],
            },
        ],
        isNew: false,
        description: "Modern kesimli, rahat gömlek. İş ve günlük hayatta şıklığınızdan ödün vermeyin.",
        sizes: ["S", "M", "L", "XL"],
        createdAt: "2024-01-05",
    },
    {
        id: "5",
        name: "Çiçek Desenli Tunik",
        category: "tunik",
        price: 799,
        variants: [
            {
                colorName: "Çok Renkli",
                colorCode: "#e67e22",
                images: [
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop&flip=h",
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop&sat=50",
                ],
            },
            {
                colorName: "Mavi Desenli",
                colorCode: "#3498db",
                images: [
                    "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&h=1000&fit=crop&hue=200",
                    "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&h=1000&fit=crop&hue=200&flip=h",
                ],
            },
        ],
        isNew: true,
        description: "Canlı çiçek desenleri ile baharın enerjisini yansıtan tunik modeli.",
        sizes: ["S", "M", "L", "XL"],
        createdAt: "2024-01-22",
    },
    {
        id: "6",
        name: "Kahverengi İkili Takım",
        category: "ikili-takim",
        price: 1399,
        variants: [
            {
                colorName: "Kahverengi",
                colorCode: "#8b4513",
                images: [
                    "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800&h=1000&fit=crop&flip=h",
                ],
            },
            {
                colorName: "Vizon",
                colorCode: "#967969",
                images: [
                    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop&sat=-50",
                    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop&sat=-50&flip=h",
                ],
            },
            {
                colorName: "Bej",
                colorCode: "#d4c4a8",
                images: [
                    "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800&h=1000&fit=crop&sat=-80",
                    "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800&h=1000&fit=crop&sat=-80&flip=h",
                ],
            },
        ],
        isNew: false,
        description: "Toprak tonlarında şık ikili takım. Doğal ve zarif görünüm için ideal seçim.",
        sizes: ["S", "M", "L"],
        createdAt: "2024-01-08",
    },
    {
        id: "7",
        name: "İpek Karışımlı Elbise",
        category: "elbise",
        price: 1799,
        variants: [
            {
                colorName: "Şampanya",
                colorCode: "#f7e7ce",
                images: [
                    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop&flip=h",
                    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop&sat=20",
                ],
            },
            {
                colorName: "Gül Altın",
                colorCode: "#b76e79",
                images: [
                    "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop&hue=350",
                    "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=1000&fit=crop&hue=350&flip=h",
                ],
            },
        ],
        isNew: true,
        description: "Lüks ipek karışımlı kumaştan üretilen zarif elbise. Özel davetler için mükemmel.",
        sizes: ["S", "M", "L", "XL"],
        createdAt: "2024-01-26",
    },
    {
        id: "8",
        name: "İşlemeli Gömlek",
        category: "gomlek",
        price: 899,
        variants: [
            {
                colorName: "Beyaz",
                colorCode: "#ffffff",
                images: [
                    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop&flip=h",
                ],
            },
            {
                colorName: "Ekru",
                colorCode: "#f0ead6",
                images: [
                    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=1000&fit=crop&sat=-30",
                    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=1000&fit=crop&sat=-30&flip=h",
                ],
            },
        ],
        isNew: false,
        description: "El işlemesi detayları ile zenginleştirilmiş özel tasarım gömlek.",
        sizes: ["S", "M", "L", "XL"],
        createdAt: "2024-01-12",
    },
    {
        id: "9",
        name: "Yazlık Tunik",
        category: "tunik",
        price: 649,
        variants: [
            {
                colorName: "Açık Mavi",
                colorCode: "#87ceeb",
                images: [
                    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1000&fit=crop&flip=h",
                ],
            },
            {
                colorName: "Beyaz",
                colorCode: "#ffffff",
                images: [
                    "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&h=1000&fit=crop&sat=-100",
                    "https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&h=1000&fit=crop&sat=-100&flip=h",
                ],
            },
            {
                colorName: "Mint Yeşili",
                colorCode: "#98ff98",
                images: [
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop&hue=120",
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop&hue=120&flip=h",
                ],
            },
        ],
        isNew: true,
        description: "Hafif ve serin kumaşı ile yaz ayları için ideal tunik modeli.",
        sizes: ["S", "M", "L"],
        createdAt: "2024-01-20",
    },
    {
        id: "10",
        name: "Günlük Elbise",
        category: "elbise",
        price: 999,
        variants: [
            {
                colorName: "Siyah",
                colorCode: "#1a1a1a",
                images: [
                    "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&h=1000&fit=crop&flip=h",
                ],
            },
            {
                colorName: "Antrasit",
                colorCode: "#383838",
                images: [
                    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop&sat=-100",
                    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop&sat=-100&flip=h",
                ],
            },
        ],
        isNew: false,
        description: "Rahat kesimi ile günlük kullanıma uygun, şık ve pratik elbise modeli.",
        sizes: ["S", "M", "L", "XL"],
        createdAt: "2024-01-15",
    },
    {
        id: "11",
        name: "Pudra İkili Takım",
        category: "ikili-takim",
        price: 1349,
        variants: [
            {
                colorName: "Pudra",
                colorCode: "#e8c4c4",
                images: [
                    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop&flip=h",
                    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop&sat=30",
                ],
            },
            {
                colorName: "Bej",
                colorCode: "#d4c4a8",
                images: [
                    "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800&h=1000&fit=crop&sat=-60",
                    "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800&h=1000&fit=crop&sat=-60&flip=h",
                ],
            },
        ],
        isNew: true,
        description: "Pudra rengi ile feminen ve zarif bir görünüm sunan ikili takım.",
        sizes: ["S", "M", "L", "XL"],
        createdAt: "2024-01-24",
    },
    {
        id: "12",
        name: "Oversize Gömlek",
        category: "gomlek",
        price: 749,
        variants: [
            {
                colorName: "Beyaz",
                colorCode: "#ffffff",
                images: [
                    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=1000&fit=crop",
                    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=1000&fit=crop&flip=h",
                ],
            },
            {
                colorName: "Siyah",
                colorCode: "#1a1a1a",
                images: [
                    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop&sat=-100",
                    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop&sat=-100&flip=h",
                ],
            },
            {
                colorName: "Haki",
                colorCode: "#8b8b3d",
                images: [
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop&hue=80",
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1000&fit=crop&hue=80&flip=h",
                ],
            },
        ],
        isNew: false,
        description: "Rahat oversize kesimli gömlek. Trend ve konforlu.",
        sizes: ["S", "M", "L", "XL"],
        createdAt: "2024-01-03",
    },
];

export const categories = [
    { id: "all", name: "Tüm Ürünler", slug: "all" },
    { id: "ikili-takim", name: "İkili Takım", slug: "ikili-takim" },
    { id: "tunik", name: "Tunik", slug: "tunik" },
    { id: "elbise", name: "Elbise", slug: "elbise" },
    { id: "gomlek", name: "Gömlek", slug: "gomlek" },
];

export function getProductById(id: string): Product | undefined {
    return products.find((product) => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
    if (category === "all") return products;
    if (category === "yeni") return products.filter((p) => p.isNew);
    return products.filter((product) => product.category === category);
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 0,
    }).format(price);
}

export function sortProductsByDate(productList: Product[], order: 'asc' | 'desc' = 'desc'): Product[] {
    return [...productList].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
}
