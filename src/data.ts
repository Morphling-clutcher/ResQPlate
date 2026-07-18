import { Store, FoodBag } from './types';

export const STORES: Store[] = [
  {
    id: 'green-leaf-bakery',
    name: 'Green Leaf Bakery & Cafe',
    logo: 'GL',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    reviewsCount: 142,
    distance: '0.6 km',
    address: '142 Emerald Avenue, University Quarter',
    pickupWindow: 'Today, 5:30 PM - 6:00 PM',
    category: 'Bakery'
  },
  {
    id: 'campus-bakery',
    name: 'Campus Bakery',
    logo: 'CB',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    reviewsCount: 98,
    distance: '0.3 km',
    address: 'Student Union Building, Ground Floor',
    pickupWindow: 'Today, 4:30 PM - 5:15 PM',
    category: 'Bakery'
  },
  {
    id: 'sushi-express',
    name: 'Sushi Express',
    logo: 'SE',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
    rating: 4.7,
    reviewsCount: 215,
    distance: '1.2 km',
    address: 'Food Court West, Building C',
    pickupWindow: 'Today, 7:00 PM - 7:45 PM',
    category: 'Sushi'
  },
  {
    id: 'garden-greens',
    name: 'Garden Greens',
    logo: 'GG',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    reviewsCount: 76,
    distance: '0.8 km',
    address: 'Science Park East Entrance',
    pickupWindow: 'Today, 3:00 PM - 4:00 PM',
    category: 'Meals'
  },
  {
    id: 'metro-grocers',
    name: 'Metro Grocers',
    logo: 'MG',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    rating: 4.4,
    reviewsCount: 112,
    distance: '1.5 km',
    address: 'Block 42, High Street',
    pickupWindow: 'Today, 6:00 PM - 7:00 PM',
    category: 'Groceries'
  },
  {
    id: 'daily-brew',
    name: 'The Daily Brew & Bistro',
    logo: 'DB',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 189,
    distance: '0.4 km',
    address: 'Engineering Lane, Plaza B',
    pickupWindow: 'Today, 5:00 PM - 5:45 PM',
    category: 'Cafe'
  }
];

export const FOOD_BAGS: FoodBag[] = [
  {
    id: 'surplus-pastry-bag',
    name: 'Surplus Pastry Bag',
    storeId: 'green-leaf-bakery',
    description: 'Help us rescue a delicious assortment of gourmet pastries baked fresh this morning! These are premium goods made with organic flour and premium butter that are too good to throw away.',
    typicalItems: ['2x Butter Croissants', '1x Cinnamon Roll', '1x Blueberry Scone'],
    originalPrice: 380,
    discountedPrice: 120,
    quantityAvailable: 2,
    impactGrams: 450,
    co2SavedKg: 1.2,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    tags: ['Fresh', 'Sweet', 'Pastry', 'Vegetarian']
  },
  {
    id: 'assorted-pastry-box',
    name: 'Assorted Pastry Box',
    storeId: 'campus-bakery',
    description: 'A delightful selection of our daily baked standard sweet and savory pastries. Perfectly preserved and packed with care by our student bakers. This is a surprise bag, you will love it!',
    typicalItems: ['Chocolate Croissant', 'Danish Pastry', 'Cheese Turnover', 'Sausage Puff'],
    originalPrice: 350,
    discountedPrice: 100,
    quantityAvailable: 3,
    impactGrams: 450,
    co2SavedKg: 1.2,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
    tags: ['Best Value', 'Bakery', 'Classic']
  },
  {
    id: 'sushi-dinner-roll',
    name: 'Surplus Sushi Bento Roll',
    storeId: 'sushi-express',
    description: 'Gourmet hand-crafted sushi rolls made today. This box contains top tier fresh rolls kept under cold refrigeration. Enjoy authentic taste at a massive discount!',
    typicalItems: ['4x California Rolls', '4x Spicy Tuna Rolls', '2x Salmon Nigiri'],
    originalPrice: 480,
    discountedPrice: 160,
    quantityAvailable: 1,
    impactGrams: 600,
    co2SavedKg: 1.6,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800',
    tags: ['Premium', 'Savory', 'Seafood']
  },
  {
    id: 'veggie-salad-box',
    name: 'Superfood Salad Combo',
    storeId: 'garden-greens',
    description: 'Nutritious salad bowls packed with superfoods, seeds, fresh leafy greens, and homemade dressings. Perfect for a healthy, guilt-free lunch or dinner!',
    typicalItems: ['Quinoa & Kale Bowl', 'Avocado Toast', 'Cold-pressed Green Juice'],
    originalPrice: 320,
    discountedPrice: 110,
    quantityAvailable: 4,
    impactGrams: 400,
    co2SavedKg: 1.1,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    tags: ['Healthy', 'Vegetarian', 'Vegan Friendly']
  },
  {
    id: 'fresh-organic-bag',
    name: 'Rescue Produce Bag',
    storeId: 'metro-grocers',
    description: 'A heavy bag packed with high-quality organic vegetables and fruits with slight cosmetic imperfections. Tastes amazing, fully fresh, and packed with vitamins!',
    typicalItems: ['Organic Bananas', 'Vine Tomatoes', 'Fresh Bell Peppers', 'Spinach Bunch'],
    originalPrice: 400,
    discountedPrice: 130,
    quantityAvailable: 5,
    impactGrams: 1200,
    co2SavedKg: 3.1,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800',
    tags: ['Organic', 'Eco-Choice', 'Vegetarian']
  },
  {
    id: 'bistro-lunch-box',
    name: 'Bistro Surprise Lunch',
    storeId: 'daily-brew',
    description: 'A surprise warm sandwich and dessert box from our main bistro kitchen. Hand-wrapped and served with love. Ideal comfort food!',
    typicalItems: ['Grilled Sourdough Panini', 'Fudge Brownie Slice', 'Drip Coffee Voucher'],
    originalPrice: 390,
    discountedPrice: 115,
    quantityAvailable: 2,
    impactGrams: 500,
    co2SavedKg: 1.3,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    tags: ['Lunch Box', 'Warm Food', 'Cafe']
  }
];
