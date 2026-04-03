export interface ProductCategory {
    id: number;
    name: string;
    tagline: string;
    description: string[];
    highlight?: boolean;
    icon: string;
    image: string;
}

export interface GalleryImage {
    id: number;
    url: string;
    alt: string;
}
