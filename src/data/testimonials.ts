export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  occasion?: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya M.",
    location: "Kosamba",
    text: "Ordered a custom birthday cake for my daughter and the team absolutely delivered. The design was beautiful and the cake was delicious. Will definitely order again!",
    rating: 5,
    occasion: "Birthday",
  },
  {
    id: "2",
    name: "Rahul S.",
    location: "Sayan",
    text: "The chocolate truffle cake was absolutely divine — rich, moist and perfectly crafted. Everyone at the party loved it.",
    rating: 5,
    occasion: "Birthday Party",
  },
  {
    id: "3",
    name: "Meera K.",
    location: "Ankleshwar",
    text: "Beautifully packaged and delivered on time. The anniversary cake looked exactly like the reference I sent. So impressed!",
    rating: 5,
    occasion: "Anniversary",
  },
  {
    id: "4",
    name: "Arjun P.",
    location: "Valia",
    text: "First time ordering a photo cake and it came out perfect. The team was helpful and the process was easy. Highly recommend.",
    rating: 5,
    occasion: "Graduation",
  },
  {
    id: "5",
    name: "Sneha D.",
    location: "Andada",
    text: "The eggless red velvet cake was surprisingly amazing — I didn't feel like I was missing anything. Fresh, well-presented and genuinely delicious.",
    rating: 5,
    occasion: "Birthday",
  },
  {
    id: "6",
    name: "Kavya R.",
    location: "Kosamba",
    text: "Ordered for a corporate event and the gift hampers were a huge hit. Everyone appreciated the thoughtfulness and quality.",
    rating: 4,
    occasion: "Corporate",
  },
];
