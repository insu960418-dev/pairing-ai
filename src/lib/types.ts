export type FlavorProfile = {
  rich: number;  // 1-5
  acid: number;  // 1-5
  spicy: number; // 1-5
  smoky: number; // 1-5
};

export interface Food {
  id: string;
  restaurantId: string;
  name: string;
  main_ingredient: string;
  flavor_profile: FlavorProfile;
  sauce_base?: string;
}

export type WineType = 'Red' | 'White' | 'Sparkling' | 'Rose' | 'Orange';



export type Category = '미슐랭' | '기념일' | '스시' | '우마카세' | '부모님' | '상견례' | 'AI소믈리에';
export type MichelinStar = 1 | 2 | 3;

export interface Restaurant {
  id: string;
  name: string;
  category: Category;
  starRating?: MichelinStar;
  region: string;
  rating: number;
  image: string;
  description: string;
  signatureDishes?: string[];
  isActive?: boolean;
  promotionYear?: number;
}

export type PricingTier = 'Standard' | 'Premium';

export interface Wine {
  id: string;
  name: string;
  type: WineType;
  grape: string;
  region: string;
  body: number; // 1-5
  acidity: number; // 1-5
  tannin: number; // 1-5
  sweetness: number; // 1-5
  oak: boolean;
  price_range: string;
  price: number; // Actual numeric price for tiering
  tier: PricingTier;
}

export interface PairingResult {
  classic: Wine;
  adventurous: Wine;
  classicReason: string;
  adventurousReason: string;
}
