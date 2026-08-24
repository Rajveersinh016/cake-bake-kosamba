export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

export const galleryCategories = [
  "All",
  "Cakes",
  "Custom",
  "Celebrations",
  "Pastries",
  "Festivals",
];

export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80",
    alt: "Designer fondant cake",
    category: "Custom",
    width: 800,
    height: 1000,
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    alt: "Chocolate truffle cake",
    category: "Cakes",
    width: 800,
    height: 800,
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80",
    alt: "Photo cake",
    category: "Cakes",
    width: 800,
    height: 1000,
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800&q=80",
    alt: "Red velvet celebration cake",
    category: "Celebrations",
    width: 800,
    height: 600,
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
    alt: "Belgian chocolate cake",
    category: "Cakes",
    width: 800,
    height: 1000,
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1542124948-dc391252a940?w=800&q=80",
    alt: "Fresh pastry display",
    category: "Pastries",
    width: 800,
    height: 600,
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&q=80",
    alt: "Chocolate brownie",
    category: "Pastries",
    width: 800,
    height: 800,
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&q=80",
    alt: "Festival special sweets",
    category: "Festivals",
    width: 800,
    height: 1000,
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&q=80",
    alt: "Celebration gift hamper",
    category: "Celebrations",
    width: 800,
    height: 800,
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?w=800&q=80",
    alt: "Birthday celebration cake",
    category: "Celebrations",
    width: 800,
    height: 600,
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80",
    alt: "Strawberry cake",
    category: "Cakes",
    width: 800,
    height: 1000,
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
    alt: "Assorted cookies",
    category: "Pastries",
    width: 800,
    height: 800,
  },
];
