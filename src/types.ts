export interface Review {
  username: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  gender: 'boys' | 'girls' | 'unisex';
  weekendOffer: boolean;
  offerPrice: number;
  features: string[];
  specifications: Record<string, string>;
  trustCert: string; // trustworthy badge certification
  inStock: boolean;
  isBundle?: boolean;
  itemsIncluded?: string[];
  customerReviews?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  suggestedAction?: string;
  voiceMatchedCommand?: string;
}

export interface ExchangeTicket {
  id: string;
  productName: string;
  customerName: string;
  phone: string;
  reason: string;
  damagePhotoUrl?: string;
  status: 'Pending Review' | 'Exchanged Scheduled' | 'Resolved';
  createdAt: Date;
}
