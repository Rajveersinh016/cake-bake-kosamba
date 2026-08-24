import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import Navbar from "@/components/layout/Navbar";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Footer from "@/components/layout/Footer";
import ToastContainer from "@/components/ui/ToastContainer";

export const metadata: Metadata = {
  title: {
    template: "%s | Cake & Bake — The Live Bakery",
    default: "Cake & Bake — The Live Bakery | Fresh Cakes & Custom Creations",
  },
  description:
    "Premium cakes, custom creations and delicious desserts made fresh for birthdays, anniversaries and every celebration. Order from Cake & Bake — The Live Bakery.",
  keywords: ["cake", "bakery", "custom cake", "birthday cake", "eggless cake", "cake & bake", "Kosamba", "Gujarat"],
  openGraph: {
    title: "Cake & Bake — The Live Bakery",
    description: "Fresh cakes, custom creations and desserts made for your most special moments.",
    type: "website",
    locale: "en_IN",
    siteName: "Cake & Bake",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cake & Bake — The Live Bakery",
    description: "Fresh cakes and custom creations for every celebration.",
  },
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#183F3A" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <AnnouncementBar />
                <Navbar />
                <main id="main-content">{children}</main>
                <Footer />
                <ToastContainer />
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
