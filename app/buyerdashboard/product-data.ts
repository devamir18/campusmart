export type BuyerProduct = {
  id: string;
  name: string;
  category: string;
  menuCategory: string;
  price: number;
  storeId: string;
  seller: string;
  location: string;
  image: string;
  imageAlt: string;
  description: string;
  stock: number;
  deliveryFee: number;
  deliveryEstimate: string;
};

export type BuyerStore = {
  id: string;
  name: string;
  description: string;
  pickupPoint: string;
  deliveryAvailable: boolean;
  isOpen: boolean;
  isVerified: boolean;
  openingHours: { day: string; hours: string }[];
  deliveryFee: number;
  estimatedTime: string;
};

export const STORES: BuyerStore[] = [
  {
    id: "campus-books",
    name: "Campus Books",
    description:
      "Find pre-owned textbooks, lecture notes, and study materials from campus sellers.",
    pickupPoint: "Library gate",
    deliveryAvailable: false,
    isOpen: true,
    isVerified: false,
    openingHours: [
      { day: "Monday to Saturday", hours: "9:00 am to 5:00 pm" },
      { day: "Sunday", hours: "Closed" },
    ],
    deliveryFee: 300,
    estimatedTime: "Arrange pickup with the seller",
  },
  {
    id: "tech-corner",
    name: "Tech Corner",
    description:
      "Campus electronics and gadgets. Confirm product condition and specifications with the seller before purchase.",
    pickupPoint: "Student centre",
    deliveryAvailable: true,
    isOpen: true,
    isVerified: false,
    openingHours: [
      { day: "Monday to Saturday", hours: "9:00 am to 6:00 pm" },
      { day: "Sunday", hours: "Closed" },
    ],
    deliveryFee: 500,
    estimatedTime: "Pickup from the student centre",
  },
  {
    id: "amakas-kitchen",
    name: "Amaka's Kitchen",
    description:
      "Fresh meals and snacks for students in the north hostels. Orders are packed hot and delivered to your door.",
    pickupPoint: "Food court, main gate",
    deliveryAvailable: true,
    isOpen: true,
    isVerified: true,
    openingHours: [
      { day: "Monday to Friday", hours: "8:00 am to 8:00 pm" },
      { day: "Saturday", hours: "8:00 am to 8:00 pm" },
      { day: "Sunday", hours: "Closed" },
    ],
    deliveryFee: 300,
    estimatedTime: "20 to 30 minutes",
  },
  {
    id: "hostel-essentials",
    name: "Hostel Essentials",
    description:
      "Useful lighting and everyday essentials for your room and study space.",
    pickupPoint: "Angwan Rukuba",
    deliveryAvailable: true,
    isOpen: true,
    isVerified: false,
    openingHours: [
      { day: "Monday to Saturday", hours: "9:00 am to 6:00 pm" },
      { day: "Sunday", hours: "Closed" },
    ],
    deliveryFee: 500,
    estimatedTime: "Arrange pickup with the seller",
  },
  {
    id: "campus-fits",
    name: "Campus Fits",
    description:
      "Casual campus clothing. Contact the seller to confirm sizes and availability.",
    pickupPoint: "Main campus",
    deliveryAvailable: true,
    isOpen: true,
    isVerified: false,
    openingHours: [
      { day: "Monday to Saturday", hours: "10:00 am to 6:00 pm" },
      { day: "Sunday", hours: "Closed" },
    ],
    deliveryFee: 500,
    estimatedTime: "Arrange pickup with the seller",
  },
];

export const PRODUCTS: BuyerProduct[] = [
  {
    id: "calculus-past-questions",
    name: "Second-hand Textbooks",
    category: "textbooks",
    menuCategory: "Textbooks",
    price: 2500,
    storeId: "campus-books",
    seller: "Campus Books",
    location: "Library gate",
    image: "/products/calculus-book.jpg",
    imageAlt: "Shelves of books at a library",
    description:
      "Browse pre-owned textbooks and lecture materials from other students.",
    stock: 5,
    deliveryFee: 300,
    deliveryEstimate: "Arrange pickup with the seller",
  },
  {
    id: "fast-charger",
    name: "Android Smartphone",
    category: "gadgets",
    menuCategory: "Gadgets",
    price: 95000,
    storeId: "tech-corner",
    seller: "Tech Corner",
    location: "Student centre",
    image: "/products/phone-charger.jpg",
    imageAlt: "Android smartphone",
    description:
      "A pre-owned Android smartphone listed by a campus seller. Contact the seller to confirm the model and condition before ordering.",
    stock: 1,
    deliveryFee: 500,
    deliveryEstimate: "Pickup from the student centre",
  },
  {
    id: "garden-salad-bowl",
    name: "Fresh Garden Salad Bowl",
    category: "hot-food",
    menuCategory: "Food",
    price: 3500,
    storeId: "amakas-kitchen",
    seller: "Amaka's Kitchen",
    location: "Naraguta Hostel",
    image: "/products/chicken-rice-bowl.jpg",
    imageAlt: "Fresh garden salad in a bowl",
    description:
      "A fresh garden salad bowl prepared by Amaka's Kitchen. Contact the seller about today's availability.",
    stock: 12,
    deliveryFee: 300,
    deliveryEstimate: "20 to 30 minutes",
  },
  {
    id: "study-lamp",
    name: "Study Desk Lamp",
    category: "hostel",
    menuCategory: "Hostel & Room",
    price: 6500,
    storeId: "hostel-essentials",
    seller: "Hostel Essentials",
    location: "Angwan Rukuba",
    image: "/products/study-lamp.jpg",
    imageAlt: "Desk lamp",
    description:
      "A desk lamp for your study space. Confirm the item details with the seller before arranging pickup.",
    stock: 4,
    deliveryFee: 500,
    deliveryEstimate: "Arrange pickup with the seller",
  },
  {
    id: "campus-hoodie",
    name: "Grey Pullover Hoodie",
    category: "fashion",
    menuCategory: "Fashion",
    price: 12000,
    storeId: "campus-fits",
    seller: "Campus Fits",
    location: "Main campus",
    image: "/products/campus-hoodie.jpg",
    imageAlt: "Grey pullover hoodie",
    description:
      "A grey pullover hoodie from Campus Fits. Contact the seller to confirm the available size.",
    stock: 2,
    deliveryFee: 500,
    deliveryEstimate: "Arrange pickup with the seller",
  },
  {
    id: "fruit-smoothie",
    name: "Fresh Fruit Smoothie",
    category: "hot-food",
    menuCategory: "Drinks",
    price: 1800,
    storeId: "amakas-kitchen",
    seller: "Amaka's Kitchen",
    location: "Naraguta Hostel",
    image: "/products/fruit-smoothie.jpg",
    imageAlt: "Fresh fruit smoothies",
    description:
      "A freshly blended fruit smoothie from Amaka's Kitchen. Contact the seller about today's flavours.",
    stock: 20,
    deliveryFee: 300,
    deliveryEstimate: "20 to 30 minutes",
  },
];

export function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}
