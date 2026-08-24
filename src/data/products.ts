export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  subcategory?: string;
  basePrice: number;
  images: string[];
  tags: string[];
  isEggless: boolean;
  hasEgglessOption: boolean;
  isFeatured: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  flavours: string[];
  sizes: { label: string; weight: string; price: number }[];
  occasions: string[];
  available: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "chocolate-truffle-cake",
    name: "Chocolate Truffle Cake",
    shortDescription: "Rich, decadent layers of chocolate truffle cream.",
    description:
      "Indulge in our signature Chocolate Truffle Cake — layers of moist chocolate sponge enveloped in a rich, velvety truffle cream. A celebration of pure chocolate indulgence.",
    category: "cakes",
    subcategory: "Chocolate Cakes",
    basePrice: 699,
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=85",
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&q=85",
    ],
    tags: ["bestseller", "chocolate", "birthday"],
    isEggless: false,
    hasEgglessOption: true,
    isFeatured: true,
    isBestseller: true,
    rating: 4.8,
    reviewCount: 124,
    flavours: ["Chocolate Truffle"],
    sizes: [
      { label: "0.5 KG", weight: "0.5", price: 699 },
      { label: "1 KG", weight: "1", price: 1199 },
      { label: "1.5 KG", weight: "1.5", price: 1649 },
      { label: "2 KG", weight: "2", price: 2099 },
    ],
    occasions: ["Birthday", "Anniversary", "Celebration"],
    available: true,
  },
  {
    id: "2",
    slug: "red-velvet-cake",
    name: "Red Velvet Cake",
    shortDescription: "Classic velvety red cake with cream cheese frosting.",
    description:
      "A timeless classic — our Red Velvet Cake features a striking crimson sponge with a subtle cocoa note, layered with smooth cream cheese frosting. Elegant, rich and unforgettable.",
    category: "cakes",
    subcategory: "Designer Cakes",
    basePrice: 799,
    images: [
      "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800&q=85",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=85",
    ],
    tags: ["popular", "red-velvet", "anniversary"],
    isEggless: false,
    hasEgglessOption: true,
    isFeatured: true,
    isBestseller: false,
    isNew: false,
    rating: 4.7,
    reviewCount: 89,
    flavours: ["Red Velvet", "Cream Cheese"],
    sizes: [
      { label: "0.5 KG", weight: "0.5", price: 799 },
      { label: "1 KG", weight: "1", price: 1349 },
      { label: "1.5 KG", weight: "1.5", price: 1849 },
      { label: "2 KG", weight: "2", price: 2299 },
    ],
    occasions: ["Birthday", "Anniversary", "Wedding"],
    available: true,
  },
  {
    id: "3",
    slug: "black-forest-cake",
    name: "Black Forest Cake",
    shortDescription: "Cherries, cream and chocolate — a timeless favourite.",
    description:
      "Our Black Forest Cake combines moist chocolate sponge layers with whipped cream, cherries and a drizzle of dark chocolate. A classic that never goes out of style.",
    category: "cakes",
    subcategory: "Chocolate Cakes",
    basePrice: 699,
    images: [
      "https://images.unsplash.com/photo-1611329532992-0b7fd7a3e4aa?w=800&q=85",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85",
    ],
    tags: ["classic", "chocolate", "cherry"],
    isEggless: false,
    hasEgglessOption: true,
    isFeatured: true,
    isBestseller: true,
    rating: 4.6,
    reviewCount: 102,
    flavours: ["Chocolate", "Cherry"],
    sizes: [
      { label: "0.5 KG", weight: "0.5", price: 699 },
      { label: "1 KG", weight: "1", price: 1199 },
      { label: "1.5 KG", weight: "1.5", price: 1649 },
      { label: "2 KG", weight: "2", price: 2099 },
    ],
    occasions: ["Birthday", "Celebration"],
    available: true,
  },
  {
    id: "4",
    slug: "belgian-chocolate-cake",
    name: "Belgian Chocolate Cake",
    shortDescription: "Premium Belgian chocolate for true chocolate lovers.",
    description:
      "Made with imported Belgian chocolate, this cake is an experience for true chocolate connoisseurs. Deeply rich, beautifully smooth and impossibly indulgent.",
    category: "cakes",
    subcategory: "Chocolate Cakes",
    basePrice: 899,
    images: [
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=85",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=85",
    ],
    tags: ["premium", "chocolate", "belgian"],
    isEggless: false,
    hasEgglessOption: true,
    isFeatured: true,
    isBestseller: false,
    isNew: true,
    rating: 4.9,
    reviewCount: 56,
    flavours: ["Belgian Chocolate"],
    sizes: [
      { label: "0.5 KG", weight: "0.5", price: 899 },
      { label: "1 KG", weight: "1", price: 1549 },
      { label: "1.5 KG", weight: "1.5", price: 2099 },
      { label: "2 KG", weight: "2", price: 2649 },
    ],
    occasions: ["Birthday", "Anniversary", "Corporate"],
    available: true,
  },
  {
    id: "5",
    slug: "photo-cake",
    name: "Photo Cake",
    shortDescription: "Your favourite memory printed on a delicious cake.",
    description:
      "Turn your favourite photo into an edible masterpiece. Our photo cakes use premium edible ink printing to bring your cherished moments onto a delicious canvas.",
    category: "cakes",
    subcategory: "Photo Cakes",
    basePrice: 899,
    images: [
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=85",
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=85",
    ],
    tags: ["photo", "custom", "birthday"],
    isEggless: false,
    hasEgglessOption: true,
    isFeatured: true,
    isBestseller: false,
    rating: 4.7,
    reviewCount: 78,
    flavours: ["Vanilla", "Chocolate Truffle", "Butterscotch"],
    sizes: [
      { label: "0.5 KG", weight: "0.5", price: 899 },
      { label: "1 KG", weight: "1", price: 1499 },
      { label: "1.5 KG", weight: "1.5", price: 1999 },
    ],
    occasions: ["Birthday", "Anniversary", "Graduation"],
    available: true,
  },
  {
    id: "6",
    slug: "butterscotch-cake",
    name: "Butterscotch Cake",
    shortDescription: "Golden, caramel-sweet and beautifully nostalgic.",
    description:
      "Our Butterscotch Cake brings warm, caramel-kissed sweetness layered between soft vanilla sponge and crowned with crunchy butterscotch toffee bits.",
    category: "cakes",
    subcategory: "Birthday Cakes",
    basePrice: 699,
    images: [
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800&q=85",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=85",
    ],
    tags: ["butterscotch", "birthday", "eggless-available"],
    isEggless: false,
    hasEgglessOption: true,
    isFeatured: true,
    isBestseller: true,
    rating: 4.5,
    reviewCount: 94,
    flavours: ["Butterscotch", "Vanilla"],
    sizes: [
      { label: "0.5 KG", weight: "0.5", price: 699 },
      { label: "1 KG", weight: "1", price: 1199 },
      { label: "1.5 KG", weight: "1.5", price: 1649 },
      { label: "2 KG", weight: "2", price: 2099 },
    ],
    occasions: ["Birthday", "Celebration"],
    available: true,
  },
  {
    id: "7",
    slug: "vanilla-fresh-cream-cake",
    name: "Vanilla Fresh Cream Cake",
    shortDescription: "Light, airy and perfect for every celebration.",
    description:
      "A classic vanilla sponge layered with fresh whipped cream and seasonal fruits. Light, delicate and suitable for every occasion.",
    category: "cakes",
    subcategory: "Birthday Cakes",
    basePrice: 599,
    images: [
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=85",
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=85",
    ],
    tags: ["vanilla", "fresh-cream", "birthday", "eggless-available"],
    isEggless: true,
    hasEgglessOption: true,
    isFeatured: false,
    isBestseller: false,
    rating: 4.4,
    reviewCount: 67,
    flavours: ["Vanilla"],
    sizes: [
      { label: "0.5 KG", weight: "0.5", price: 599 },
      { label: "1 KG", weight: "1", price: 999 },
      { label: "1.5 KG", weight: "1.5", price: 1399 },
      { label: "2 KG", weight: "2", price: 1749 },
    ],
    occasions: ["Birthday", "Baby Shower", "Celebration"],
    available: true,
  },
  {
    id: "8",
    slug: "strawberry-delight-cake",
    name: "Strawberry Delight Cake",
    shortDescription: "Fresh strawberries and cream in every bite.",
    description:
      "Fresh strawberries layered between moist sponge and smooth strawberry cream. A fruity, refreshing cake that brightens any celebration.",
    category: "cakes",
    subcategory: "Birthday Cakes",
    basePrice: 749,
    images: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=85",
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=85",
    ],
    tags: ["strawberry", "fruity", "birthday"],
    isEggless: false,
    hasEgglessOption: true,
    isFeatured: false,
    isBestseller: false,
    isNew: true,
    rating: 4.6,
    reviewCount: 43,
    flavours: ["Strawberry"],
    sizes: [
      { label: "0.5 KG", weight: "0.5", price: 749 },
      { label: "1 KG", weight: "1", price: 1299 },
      { label: "1.5 KG", weight: "1.5", price: 1799 },
    ],
    occasions: ["Birthday", "Anniversary"],
    available: true,
  },
  {
    id: "9",
    slug: "pineapple-cake",
    name: "Pineapple Cream Cake",
    shortDescription: "Tropical pineapple and cream — a refreshing classic.",
    description:
      "Our Pineapple Cake is a tropical celebration — fresh pineapple chunks and smooth cream layered between soft sponge, topped with pineapple slices.",
    category: "cakes",
    subcategory: "Birthday Cakes",
    basePrice: 649,
    images: [
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=85",
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800&q=85",
    ],
    tags: ["pineapple", "tropical", "classic"],
    isEggless: false,
    hasEgglessOption: true,
    isFeatured: false,
    isBestseller: false,
    rating: 4.3,
    reviewCount: 51,
    flavours: ["Pineapple"],
    sizes: [
      { label: "0.5 KG", weight: "0.5", price: 649 },
      { label: "1 KG", weight: "1", price: 1099 },
      { label: "1.5 KG", weight: "1.5", price: 1499 },
    ],
    occasions: ["Birthday", "Celebration"],
    available: true,
  },
  {
    id: "10",
    slug: "designer-fondant-cake",
    name: "Designer Fondant Cake",
    shortDescription: "Art you can eat. Custom fondant craftsmanship.",
    description:
      "A designer fondant cake crafted to your vision. Every detail sculpted by hand — perfect for weddings, milestone birthdays and unforgettable moments.",
    category: "cakes",
    subcategory: "Designer Cakes",
    basePrice: 1499,
    images: [
      "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=85",
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=85",
    ],
    tags: ["designer", "fondant", "premium", "custom", "wedding"],
    isEggless: false,
    hasEgglessOption: true,
    isFeatured: true,
    isBestseller: false,
    isNew: false,
    rating: 4.9,
    reviewCount: 34,
    flavours: ["Vanilla", "Chocolate Truffle", "Red Velvet", "Butterscotch"],
    sizes: [
      { label: "1 KG", weight: "1", price: 1499 },
      { label: "1.5 KG", weight: "1.5", price: 2099 },
      { label: "2 KG", weight: "2", price: 2649 },
      { label: "3 KG", weight: "3", price: 3699 },
    ],
    occasions: ["Wedding", "Anniversary", "Birthday", "Corporate"],
    available: true,
  },
  {
    id: "11",
    slug: "chocolate-brownie",
    name: "Fudge Brownies",
    shortDescription: "Dense, fudgy and intensely chocolatey.",
    description:
      "Our signature fudge brownies are made with premium cocoa and dark chocolate for an intensely rich, moist texture. Available in boxes of 6 or 12.",
    category: "desserts",
    subcategory: "Brownies",
    basePrice: 299,
    images: [
      "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&q=85",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=85",
    ],
    tags: ["brownie", "chocolate", "dessert"],
    isEggless: false,
    hasEgglessOption: true,
    isFeatured: false,
    isBestseller: true,
    rating: 4.7,
    reviewCount: 88,
    flavours: ["Chocolate"],
    sizes: [
      { label: "Box of 6", weight: "0.3", price: 299 },
      { label: "Box of 12", weight: "0.6", price: 549 },
    ],
    occasions: ["Celebration", "Gift", "Corporate"],
    available: true,
  },
  {
    id: "12",
    slug: "assorted-cookies",
    name: "Assorted Butter Cookies",
    shortDescription: "Crisp, buttery cookies in a beautiful gift box.",
    description:
      "A curated selection of handcrafted butter cookies in classic flavours — vanilla, chocolate chip, almond and cinnamon. Perfect for gifting or treating yourself.",
    category: "cookies",
    subcategory: "Butter Cookies",
    basePrice: 349,
    images: [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=85",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=85",
    ],
    tags: ["cookies", "butter", "gift"],
    isEggless: false,
    hasEgglessOption: true,
    isFeatured: false,
    isBestseller: false,
    rating: 4.5,
    reviewCount: 55,
    flavours: ["Assorted"],
    sizes: [
      { label: "250g Box", weight: "0.25", price: 349 },
      { label: "500g Box", weight: "0.5", price: 649 },
    ],
    occasions: ["Gift", "Festival", "Corporate"],
    available: true,
  },
  {
    id: "13",
    slug: "chocolate-pastry",
    name: "Chocolate Pastry",
    shortDescription: "Mini indulgence — rich chocolate in every bite.",
    description:
      "Our Chocolate Pastry is a mini celebration — layers of moist chocolate sponge and truffle cream, finished with a glossy chocolate glaze.",
    category: "pastries",
    subcategory: "Pastries",
    basePrice: 79,
    images: [
      "https://images.unsplash.com/photo-1542124948-dc391252a940?w=800&q=85",
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=85",
    ],
    tags: ["pastry", "chocolate", "mini"],
    isEggless: false,
    hasEgglessOption: false,
    isFeatured: false,
    isBestseller: true,
    rating: 4.4,
    reviewCount: 120,
    flavours: ["Chocolate"],
    sizes: [{ label: "1 Piece", weight: "0.1", price: 79 }],
    occasions: ["Snack", "Celebration"],
    available: true,
  },
  {
    id: "14",
    slug: "gift-hamper-celebration",
    name: "Celebration Gift Hamper",
    shortDescription: "A curated hamper for your most special moments.",
    description:
      "Our Celebration Gift Hamper combines a mini cake, assorted cookies, brownies and festive packaging — everything you need to make someone feel truly special.",
    category: "gift-hampers",
    subcategory: "Gift Hampers",
    basePrice: 1299,
    images: [
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&q=85",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=85",
    ],
    tags: ["hamper", "gift", "celebration"],
    isEggless: false,
    hasEgglessOption: false,
    isFeatured: true,
    isBestseller: false,
    rating: 4.8,
    reviewCount: 29,
    flavours: ["Assorted"],
    sizes: [{ label: "Standard", weight: "1", price: 1299 }],
    occasions: ["Birthday", "Anniversary", "Festival", "Corporate"],
    available: true,
  },
  {
    id: "15",
    slug: "diwali-mithai-box",
    name: "Festival Mithai Box",
    shortDescription: "Celebrate the festive season with handcrafted sweets.",
    description:
      "A beautifully presented box of handcrafted festival sweets — perfect for Diwali, Navratri and other festive celebrations.",
    category: "festival",
    subcategory: "Festival Specials",
    basePrice: 499,
    images: [
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&q=85",
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=800&q=85",
    ],
    tags: ["festival", "diwali", "sweets", "seasonal"],
    isEggless: true,
    hasEgglessOption: true,
    isFeatured: false,
    isBestseller: false,
    rating: 4.6,
    reviewCount: 38,
    flavours: ["Assorted"],
    sizes: [
      { label: "500g Box", weight: "0.5", price: 499 },
      { label: "1 KG Box", weight: "1", price: 949 },
    ],
    occasions: ["Festival", "Gift", "Diwali"],
    available: true,
  },
  {
    id: "16",
    slug: "mango-mousse-cake",
    name: "Mango Mousse Cake",
    shortDescription: "Tropical mango mousse layered between soft sponge.",
    description:
      "Light, airy mango mousse layered between delicate sponge — a tropical indulgence that brings sunshine to every celebration.",
    category: "cakes",
    subcategory: "Seasonal",
    basePrice: 849,
    images: [
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=85",
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=85",
    ],
    tags: ["mango", "mousse", "seasonal", "fruity"],
    isEggless: false,
    hasEgglessOption: true,
    isFeatured: false,
    isBestseller: false,
    isNew: true,
    rating: 4.7,
    reviewCount: 22,
    flavours: ["Mango"],
    sizes: [
      { label: "0.5 KG", weight: "0.5", price: 849 },
      { label: "1 KG", weight: "1", price: 1449 },
    ],
    occasions: ["Birthday", "Celebration"],
    available: true,
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getFeaturedProducts = () => products.filter((p) => p.isFeatured);

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);

export const searchProducts = (query: string) => {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.subcategory?.toLowerCase().includes(q)
  );
};
