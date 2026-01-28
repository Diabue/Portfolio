
export interface ServicePackage {
  id: number;
  name: string;
  price: string;
  description: string[];
  highlight?: boolean;
  icon: string;
}

export interface GalleryImage {
  id: number;
  url: string;
  alt: string;
}
