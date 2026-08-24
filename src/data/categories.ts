export interface Category {
  id: string;
  slug: string;
  name: string;
  label: string;
  image: string;
  count?: number;
}

export const categories: Category[] = [
  {
    id: "1",
    slug: "birthday-cakes",
    name: "Birthday Cakes",
    label: "Make their day special",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&q=80",
  },
  {
    id: "2",
    slug: "chocolate-cakes",
    name: "Chocolate Cakes",
    label: "For true chocolate lovers",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
  },
  {
    id: "3",
    slug: "photo-cakes",
    name: "Photo Cakes",
    label: "Your moment, on a cake",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80",
  },
  {
    id: "4",
    slug: "designer-cakes",
    name: "Designer Cakes",
    label: "Crafted to perfection",
    image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&q=80",
  },
  {
    id: "5",
    slug: "eggless-cakes",
    name: "Eggless Cakes",
    label: "Delicious for everyone",
    image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&q=80",
  },
  {
    id: "6",
    slug: "pastries",
    name: "Pastries",
    label: "Little bites of joy",
    image: "https://images.unsplash.com/photo-1542124948-dc391252a940?w=600&q=80",
  },
  {
    id: "7",
    slug: "desserts",
    name: "Desserts",
    label: "Sweet after every meal",
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80",
  },
  {
    id: "8",
    slug: "cookies",
    name: "Cookies",
    label: "Classic baked goodness",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80",
  },
  {
    id: "9",
    slug: "festival-specials",
    name: "Festival Specials",
    label: "Celebrate every season",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&q=80",
  },
  {
    id: "10",
    slug: "gift-hampers",
    name: "Gift Hampers",
    label: "Curated with care",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80",
  },
];
