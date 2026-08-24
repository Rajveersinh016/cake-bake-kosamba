export interface AdminOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  itemsCount: number;
  totalAmount: number;
  status: "Pending" | "Baking" | "Ready for Pickup" | "Out for Delivery" | "Completed" | "Cancelled";
  orderType: "Pickup" | "Delivery";
  location: string;
  orderDate: string;
  timeSlot: string;
  paymentStatus: "Paid" | "Pending" | "50% Advance Paid";
  itemsSummary: string;
}

export interface CustomCakeRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  occasion: string;
  flavour: string;
  size: string;
  eggOption: string;
  style: string;
  message: string;
  referenceImage?: string;
  quotedPrice?: number;
  advancePrice?: number;
  status: "Awaiting Quote" | "Quote Sent" | "Deposit Received" | "In Production" | "Completed";
  submittedAt: string;
  deliveryDate: string;
  location: string;
}

export const adminMetrics = {
  todaysOrders: 28,
  todaysRevenue: 24500,
  pendingCustomCakes: 6,
  activeStores: 5,
  growthRate: "+18.4%",
  ordersComparison: "+12% vs yesterday",
};

export const initialAdminOrders: AdminOrder[] = [
  {
    id: "CB-1094",
    customerName: "Ananya Patel",
    customerPhone: "+91 98765 43210",
    customerEmail: "ananya.p@gmail.com",
    itemsCount: 2,
    totalAmount: 1450,
    status: "Baking",
    orderType: "Delivery",
    location: "Kosamba Main",
    orderDate: "2026-08-24",
    timeSlot: "05:00 PM - 06:00 PM",
    paymentStatus: "Paid",
    itemsSummary: "Belgian Chocolate Truffle (1 kg, Eggless), Choco Lava Cupcake x 2",
  },
  {
    id: "CB-1093",
    customerName: "Rahul Sharma",
    customerPhone: "+91 98123 88990",
    customerEmail: "rahul.s@outlook.com",
    itemsCount: 1,
    totalAmount: 850,
    status: "Ready for Pickup",
    orderType: "Pickup",
    location: "Sayan Station Road",
    orderDate: "2026-08-24",
    timeSlot: "04:00 PM - 05:00 PM",
    paymentStatus: "Paid",
    itemsSummary: "Red Velvet Velvet Bliss (0.5 kg, Eggless)",
  },
  {
    id: "CB-1092",
    customerName: "Priya Desai",
    customerPhone: "+91 94221 11223",
    customerEmail: "priya.d@yahoo.com",
    itemsCount: 3,
    totalAmount: 2200,
    status: "Pending",
    orderType: "Delivery",
    location: "Ankleshwar GIDC",
    orderDate: "2026-08-24",
    timeSlot: "06:30 PM - 07:30 PM",
    paymentStatus: "Pending",
    itemsSummary: "Fresh Mango Cream Cake (1 kg), Assorted Brownie Box, Cheese Straws",
  },
  {
    id: "CB-1091",
    customerName: "Vikram Mehta",
    customerPhone: "+91 99001 55443",
    customerEmail: "vikram@mehta.co.in",
    itemsCount: 1,
    totalAmount: 1800,
    status: "Completed",
    orderType: "Delivery",
    location: "Valia Highway Branch",
    orderDate: "2026-08-24",
    timeSlot: "02:00 PM - 03:00 PM",
    paymentStatus: "Paid",
    itemsSummary: "Black Forest Classic (1.5 kg, Egg)",
  },
  {
    id: "CB-1090",
    customerName: "Sanjay Joshi",
    customerPhone: "+91 97234 66778",
    customerEmail: "sanjay.j@gmail.com",
    itemsCount: 4,
    totalAmount: 3100,
    status: "Completed",
    orderType: "Pickup",
    location: "Kosamba Main",
    orderDate: "2026-08-24",
    timeSlot: "01:00 PM - 02:00 PM",
    paymentStatus: "Paid",
    itemsSummary: "Butterscotch Delight (1 kg), Almond Crunch Cookies, Paneer Puff x 4",
  },
];

export const initialCustomCakeRequests: CustomCakeRequest[] = [
  {
    id: "CC-302",
    customerName: "Meera Trivedi",
    customerPhone: "+91 98980 12345",
    occasion: "1st Birthday",
    flavour: "Belgian Chocolate",
    size: "2 kg (Serves 15-20)",
    eggOption: "Eggless",
    style: "Fondant Designer",
    message: "Happy 1st Birthday Aaryav! 👶👑",
    referenceImage: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&q=80",
    quotedPrice: 2800,
    advancePrice: 1400,
    status: "Deposit Received",
    submittedAt: "2026-08-24 10:15 AM",
    deliveryDate: "2026-08-26",
    location: "Kosamba Main",
  },
  {
    id: "CC-301",
    customerName: "Hardik Shah",
    customerPhone: "+91 97112 33445",
    occasion: "25th Wedding Anniversary",
    flavour: "Red Velvet Cream Cheese",
    size: "3 kg (Serves 25-30)",
    eggOption: "Eggless",
    style: "Tiered Celebration",
    message: "25 Glorious Years Together - H & S",
    referenceImage: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&q=80",
    quotedPrice: 4200,
    advancePrice: 2100,
    status: "Awaiting Quote",
    submittedAt: "2026-08-24 11:45 AM",
    deliveryDate: "2026-08-28",
    location: "Andada Branch",
  },
  {
    id: "CC-300",
    customerName: "Krutika Parmar",
    customerPhone: "+91 94290 77661",
    occasion: "Baby Shower",
    flavour: "Fresh Pineapple",
    size: "1.5 kg (Serves 10-12)",
    eggOption: "Eggless",
    style: "Floral Buttercream",
    message: "Welcome Little One 💕",
    referenceImage: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&q=80",
    quotedPrice: 1950,
    advancePrice: 975,
    status: "Quote Sent",
    submittedAt: "2026-08-23 04:30 PM",
    deliveryDate: "2026-08-25",
    location: "Sayan Station Road",
  },
];
