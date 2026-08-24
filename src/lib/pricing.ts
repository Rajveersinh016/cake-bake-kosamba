import { basePricePerKg } from "@/data/customCakeOptions";

export interface CustomCakePriceParams {
  sizeWeightMultiplier?: number;
  flavourPremium?: number;
  isEggless?: boolean;
  stylePremium?: number;
  deliveryType?: "pickup" | "delivery";
}

export const DELIVERY_FEE = 60;
export const ADVANCE_DEPOSIT_RATIO = 0.5;

/**
 * Calculates estimated total price for a custom cake request.
 */
export function calculateCustomCakePrice({
  sizeWeightMultiplier = 1,
  flavourPremium = 0,
  isEggless = false,
  stylePremium = 0,
  deliveryType = "pickup",
}: CustomCakePriceParams): {
  basePrice: number;
  flavourExtra: number;
  styleExtra: number;
  deliveryFee: number;
  subtotal: number;
  total: number;
  advanceDeposit: number;
  remainingBalance: number;
} {
  const basePrice = Math.round(basePricePerKg * sizeWeightMultiplier);
  const flavourExtra = flavourPremium;
  const styleExtra = stylePremium;
  const subtotal = basePrice + flavourExtra + styleExtra;
  const deliveryFee = deliveryType === "delivery" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;
  const advanceDeposit = Math.round(total * ADVANCE_DEPOSIT_RATIO);
  const remainingBalance = total - advanceDeposit;

  return {
    basePrice,
    flavourExtra,
    styleExtra,
    deliveryFee,
    subtotal,
    total,
    advanceDeposit,
    remainingBalance,
  };
}

/**
 * Formats a number as Indian Currency (INR).
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Validates an Indian mobile phone number (10 digits starting with 6, 7, 8, or 9).
 */
export function isValidIndianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\+\(\)]/g, "").replace(/^91/, "");
  return /^[6-9]\d{9}$/.test(cleaned);
}

/**
 * Gets tomorrow's date formatted as YYYY-MM-DD for minimum lead-time validation.
 */
export function getMinDeliveryDate(leadTimeHours = 24): string {
  const minDate = new Date();
  minDate.setHours(minDate.getHours() + leadTimeHours);
  return minDate.toISOString().split("T")[0];
}
