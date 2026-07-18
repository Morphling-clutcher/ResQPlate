export interface Store {
  id: string;
  name: string;
  logo: string;
  image: string;
  rating: number;
  reviewsCount: number;
  distance: string; // e.g., "0.4 km"
  address: string;
  pickupWindow: string; // e.g., "Today, 5:30 PM - 6:00 PM"
  category: 'Bakery' | 'Cafe' | 'Groceries' | 'Meals' | 'Sushi';
}

export interface FoodBag {
  id: string;
  name: string;
  storeId: string;
  description: string;
  typicalItems: string[];
  originalPrice: number;
  discountedPrice: number;
  quantityAvailable: number;
  impactGrams: number; // e.g., 450 (for 450g saved)
  co2SavedKg: number; // e.g., 1.2kg
  image: string;
  tags: string[];
}

export interface UserStats {
  lifetimeSavedGrams: number; // e.g., 12400 for 12.4kg
  reservationsCount: number;
}

export interface Order {
  id: string;
  bagId: string;
  storeId: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: 'GCash' | 'CashOnPickup';
  orderDate: string;
  orderTime: string;
  status: 'pending' | 'completed';
}

export type ScreenType = 'welcome' | 'discovery' | 'details' | 'pay' | 'success';
