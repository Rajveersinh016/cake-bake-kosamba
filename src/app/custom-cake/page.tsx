"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Upload, X, CheckCircle } from "lucide-react";
import {
  occasions,
  cakeSizes,
  flavours,
  eggOptions,
  cakeStyles,
  basePricePerKg,
} from "@/data/customCakeOptions";

import {
  isValidIndianPhone,
  getMinDeliveryDate,
  calculateCustomCakePrice,
  formatCurrency,
} from "@/lib/pricing";

const steps = [
  { num: "01", label: "Occasion" },
  { num: "02", label: "Cake" },
  { num: "03", label: "Design" },
  { num: "04", label: "Details" },
  { num: "05", label: "Review" },
];

interface FormData {
  occasion: string;
  size: string;
  sizePrice: number;
  flavour: string;
  eggOption: string;
  style: string;
  message: string;
  referenceImage: File | null;
  referencePreview: string | null;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  deliveryType: "pickup" | "delivery";
  address: string;
}

const initialData: FormData = {
  occasion: "",
  size: "",
  sizePrice: 0,
  flavour: "",
  eggOption: "",
  style: "",
  message: "",
  referenceImage: null,
  referencePreview: null,
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  deliveryType: "pickup",
  address: "",
};

export default function CustomCakePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const updateForm = (key: keyof FormData, value: any) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const minDeliveryDate = getMinDeliveryDate(24);

  const validateStep = () => {
    const errs: typeof errors = {};
    if (currentStep === 0 && !form.occasion) errs.occasion = "Please select an occasion.";
    if (currentStep === 1) {
      if (!form.size) errs.size = "Please select a size.";
      if (!form.flavour) errs.flavour = "Please select a flavour.";
      if (!form.eggOption) errs.eggOption = "Please choose egg preference.";
    }
    if (currentStep === 2 && !form.style) errs.style = "Please select a style.";
    if (currentStep === 3) {
      if (!form.name.trim()) errs.name = "Full name is required.";
      if (!form.phone.trim()) {
        errs.phone = "Phone number is required.";
      } else if (!isValidIndianPhone(form.phone)) {
        errs.phone = "Please enter a valid 10-digit mobile number (e.g. 9876543210).";
      }
      if (!form.email.trim() || !form.email.includes("@")) errs.email = "Valid email address required.";
      if (!form.date) {
        errs.date = "Please select a delivery/pickup date.";
      } else if (form.date < minDeliveryDate) {
        errs.date = `Custom orders require at least 24 hours preparation time (Earliest: ${minDeliveryDate}).`;
      }
      if (!form.time) errs.time = "Please select a preferred time.";
      if (form.deliveryType === "delivery" && !form.address.trim()) errs.address = "Delivery address is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep()) setCurrentStep((s) => Math.min(s + 1, 4)); };
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const pricing = calculateCustomCakePrice({
    sizeWeightMultiplier: form.sizePrice ? form.sizePrice / basePricePerKg : 1,
    deliveryType: form.deliveryType,
  });

  const handleImageUpload = (file: File) => {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrors((e) => ({ ...e, referenceImage: "Please upload a valid image (JPG, PNG, or WEBP)." }));
      return;
    }

    if (file.size > MAX_SIZE) {
      setErrors((e) => ({ ...e, referenceImage: "Image file size must be less than 5MB." }));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      setErrors((e) => ({ ...e, referenceImage: "Failed to read image file. Try another photo." }));
    };
    reader.onloadend = () => {
      updateForm("referenceImage", file);
      updateForm("referencePreview", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  if (submitted) {
    return (
      <div style={{ background: "var(--color-cream)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: "#fff",
            borderRadius: "var(--radius-xl)",
            padding: "3rem",
            maxWidth: "480px",
            width: "100%",
            textAlign: "center",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(24,63,58,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <CheckCircle size={36} color="var(--color-green)" />
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", fontWeight: 500, color: "var(--color-green)", marginBottom: "0.75rem" }}>
            Your Request is Received!
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--color-chocolate-light)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Our team will review your design and contact you with the final price and confirmation details.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--color-muted)", marginBottom: "2rem" }}>
            We&apos;ll reach out to <strong>{form.phone}</strong> within 24 hours.
          </p>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "var(--color-green)",
              color: "var(--color-cream)",
              padding: "0.85rem 2rem",
              borderRadius: "var(--radius-full)",
              textDecoration: "none",
            }}
          >
            Back to Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--color-cream)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "var(--color-green)", padding: "2.5rem 0 2rem", textAlign: "center" }}>
        <p className="eyebrow" style={{ color: "var(--color-blush)", marginBottom: "0.5rem" }}>Custom Cake Builder</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 500, color: "var(--color-cream)" }}>
          Create Your Dream Cake
        </h1>
      </div>

      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        {/* Progress */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0", marginBottom: "3rem", position: "relative" }}>
          {steps.map((step, i) => {
            const done = i < currentStep;
            const active = i === currentStep;
            return (
              <div key={step.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, position: "relative" }}>
                {/* Connector line */}
                {i > 0 && (
                  <div style={{
                    position: "absolute",
                    top: "17px",
                    left: "calc(-50% + 17px)",
                    width: "calc(100% - 34px)",
                    height: "2px",
                    background: done || active ? "var(--color-green)" : "var(--color-border)",
                    transition: "background var(--transition-slow)",
                  }} />
                )}
                <div style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: done ? "var(--color-green)" : active ? "var(--color-green)" : "#fff",
                  border: `2px solid ${done || active ? "var(--color-green)" : "var(--color-border)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                  transition: "all var(--transition-base)",
                }}>
                  {done ? <Check size={16} color="#fff" /> : (
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 700, color: active ? "#fff" : "var(--color-muted)" }}>
                      {step.num}
                    </span>
                  )}
                </div>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 600, color: active ? "var(--color-green)" : done ? "var(--color-chocolate)" : "var(--color-muted)", marginTop: "0.35rem", textAlign: "center" }}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div style={{ background: "#fff", borderRadius: "var(--radius-xl)", padding: "2rem", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-sm)", marginBottom: "1.5rem" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {currentStep === 0 && <StepOccasion form={form} updateForm={updateForm} errors={errors} />}
              {currentStep === 1 && <StepCake form={form} updateForm={updateForm} errors={errors} />}
              {currentStep === 2 && <StepDesign form={form} updateForm={updateForm} errors={errors} handleImageUpload={handleImageUpload} />}
              {currentStep === 3 && <StepDetails form={form} updateForm={updateForm} errors={errors} />}
              {currentStep === 4 && <StepReview form={form} estimatedPrice={pricing.total} advance={pricing.advanceDeposit} remaining={pricing.remainingBalance} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
          <button
            onClick={prev}
            disabled={currentStep === 0}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              background: "transparent",
              color: "var(--color-chocolate)",
              border: "1.5px solid var(--color-border)",
              borderRadius: "var(--radius-full)",
              padding: "0.75rem 1.5rem",
              cursor: currentStep === 0 ? "not-allowed" : "pointer",
              opacity: currentStep === 0 ? 0.4 : 1,
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              minHeight: "44px",
            }}
          >
            <ChevronLeft size={15} /> Back
          </button>

          {currentStep < 4 ? (
            <button
              onClick={next}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                background: "var(--color-green)",
                color: "var(--color-cream)",
                border: "none",
                borderRadius: "var(--radius-full)",
                padding: "0.75rem 1.75rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                minHeight: "44px",
              }}
            >
              Continue <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                background: "var(--color-coral)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius-full)",
                padding: "0.75rem 2rem",
                cursor: "pointer",
                minHeight: "44px",
              }}
            >
              Submit Custom Cake Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Step 1: Occasion ──────────────────────────────────────────
function StepOccasion({ form, updateForm, errors }: any) {
  return (
    <div>
      <h2 style={stepHeading}>What&apos;s the occasion?</h2>
      {errors.occasion && <p style={errorStyle}>{errors.occasion}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.75rem" }}>
        {occasions.map((occ) => (
          <button
            key={occ.id}
            onClick={() => updateForm("occasion", occ.id)}
            style={{
              border: `2px solid ${form.occasion === occ.id ? "var(--color-green)" : "var(--color-border)"}`,
              background: form.occasion === occ.id ? "rgba(24,63,58,0.05)" : "#fff",
              borderRadius: "var(--radius-lg)",
              padding: "1rem 0.75rem",
              cursor: "pointer",
              textAlign: "center",
              transition: "all var(--transition-fast)",
            }}
          >
            <div style={{ width: "56px", height: "56px", borderRadius: "var(--radius-md)", overflow: "hidden", margin: "0 auto 0.5rem", background: "var(--color-cream-dark)" }}>
              <img src={occ.image} alt={occ.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 500, color: form.occasion === occ.id ? "var(--color-green)" : "var(--color-chocolate)" }}>
              {occ.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Step 2: Cake ──────────────────────────────────────────────
function StepCake({ form, updateForm, errors }: any) {
  return (
    <div>
      <h2 style={stepHeading}>Choose Your Cake</h2>

      <Section label="Size / Weight">
        {errors.size && <p style={errorStyle}>{errors.size}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {cakeSizes.map((s) => (
            <button key={s.value} onClick={() => { updateForm("size", s.label); updateForm("sizePrice", Math.round(basePricePerKg * s.baseMultiplier)); }} style={optionPill(form.size === s.label)}>
              {s.label}<br /><span style={{ fontSize: "0.65rem", opacity: 0.7 }}>{s.serves}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section label="Flavour">
        {errors.flavour && <p style={errorStyle}>{errors.flavour}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {flavours.map((f) => (
            <button key={f.id} onClick={() => updateForm("flavour", f.id)} style={optionPill(form.flavour === f.id)}>
              {f.label}
            </button>
          ))}
        </div>
      </Section>

      <Section label="Egg Preference">
        {errors.eggOption && <p style={errorStyle}>{errors.eggOption}</p>}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {eggOptions.map((e) => (
            <button key={e.id} onClick={() => updateForm("eggOption", e.id)} style={optionPill(form.eggOption === e.id)}>
              {e.label}
            </button>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ── Step 3: Design ────────────────────────────────────────────
function StepDesign({ form, updateForm, errors, handleImageUpload }: any) {
  return (
    <div>
      <h2 style={stepHeading}>Make It Yours</h2>

      <Section label="Cake Style">
        {errors.style && <p style={errorStyle}>{errors.style}</p>}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.5rem" }}>
          {cakeStyles.map((s) => (
            <button
              key={s.id}
              onClick={() => updateForm("style", s.id)}
              style={{
                border: `2px solid ${form.style === s.id ? "var(--color-green)" : "var(--color-border)"}`,
                background: form.style === s.id ? "rgba(24,63,58,0.05)" : "#fff",
                borderRadius: "var(--radius-md)",
                padding: "0.75rem",
                cursor: "pointer",
                textAlign: "left",
                transition: "all var(--transition-fast)",
              }}
            >
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: form.style === s.id ? "var(--color-green)" : "var(--color-chocolate)", marginBottom: "0.2rem" }}>{s.label}</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--color-muted)" }}>{s.description}</div>
            </button>
          ))}
        </div>
      </Section>

      <Section label="Message on Cake (optional)">
        <input
          type="text"
          placeholder="e.g. Happy Birthday Mom ❤️"
          value={form.message}
          onChange={(e) => updateForm("message", e.target.value)}
          maxLength={50}
          style={inputStyle}
        />
      </Section>

      <Section label="Upload Reference Image (optional)">
        <label
          htmlFor="reference-upload"
          style={{
            display: "block",
            border: "2px dashed var(--color-border-dark)",
            borderRadius: "var(--radius-lg)",
            padding: "2rem",
            textAlign: "center",
            cursor: "pointer",
            transition: "border-color var(--transition-base)",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-green)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--color-border-dark)")}
        >
          {form.referencePreview ? (
            <div>
              <img src={form.referencePreview} alt="Reference" style={{ maxHeight: "200px", borderRadius: "var(--radius-md)", margin: "0 auto", display: "block" }} />
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--color-muted)", marginTop: "0.75rem" }}>Click to change image</p>
            </div>
          ) : (
            <>
              <Upload size={24} color="var(--color-muted)" style={{ margin: "0 auto 0.5rem" }} />
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--color-chocolate)", marginBottom: "0.25rem" }}>Drop your reference image here</p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-muted)" }}>JPG, PNG or WEBP supported</p>
            </>
          )}
        </label>
        <input
          id="reference-upload"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
        />
      </Section>
    </div>
  );
}

// ── Step 4: Details ───────────────────────────────────────────
function StepDetails({ form, updateForm, errors }: any) {
  return (
    <div>
      <h2 style={stepHeading}>Your Details</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="details-grid">
        <FormField label="Full Name *" error={errors.name}>
          <input value={form.name} onChange={(e) => updateForm("name", e.target.value)} placeholder="Your full name" style={inputStyle} />
        </FormField>
        <FormField label="Mobile Number *" error={errors.phone}>
          <input value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="+91 00000 00000" type="tel" style={inputStyle} />
        </FormField>
        <FormField label="Email *" error={errors.email}>
          <input value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="your@email.com" type="email" style={inputStyle} />
        </FormField>
        <FormField label="Preferred Date *" error={errors.date}>
          <input value={form.date} onChange={(e) => updateForm("date", e.target.value)} type="date" min={getMinDeliveryDate(24)} style={inputStyle} />
        </FormField>
        <FormField label="Preferred Time *" error={errors.time}>
          <input value={form.time} onChange={(e) => updateForm("time", e.target.value)} type="time" style={inputStyle} />
        </FormField>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "0.5rem" }}>Pickup or Delivery</p>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
          {(["pickup", "delivery"] as const).map((opt) => (
            <button key={opt} onClick={() => updateForm("deliveryType", opt)} style={optionPill(form.deliveryType === opt)}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
        {form.deliveryType === "delivery" && (
          <FormField label="Delivery Address *" error={errors.address}>
            <textarea value={form.address} onChange={(e) => updateForm("address", e.target.value)} placeholder="Full delivery address" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </FormField>
        )}
      </div>

      <style jsx>{`
        .details-grid {
          grid-template-columns: 1fr !important;
        }
        @media (min-width: 600px) {
          .details-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

// ── Step 5: Review ────────────────────────────────────────────
function StepReview({ form, estimatedPrice, advance, remaining }: any) {
  const rows = [
    { label: "Occasion", value: occasions.find((o) => o.id === form.occasion)?.label || "—" },
    { label: "Cake Size", value: form.size || "—" },
    { label: "Flavour", value: flavours.find((f) => f.id === form.flavour)?.label || "—" },
    { label: "Egg Preference", value: eggOptions.find((e) => e.id === form.eggOption)?.label || "—" },
    { label: "Style", value: cakeStyles.find((s) => s.id === form.style)?.label || "—" },
    { label: "Message", value: form.message || "None" },
    { label: "Preferred Date", value: form.date || "—" },
    { label: "Delivery / Pickup", value: form.deliveryType === "delivery" ? `Delivery to: ${form.address}` : "Pickup" },
    { label: "Customer Name", value: form.name || "—" },
    { label: "Phone", value: form.phone || "—" },
    { label: "Email", value: form.email || "—" },
  ];

  return (
    <div>
      <h2 style={stepHeading}>Review Your Order</h2>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--color-muted)", marginBottom: "1.5rem" }}>
        Please review your custom cake request before submitting. Our team will contact you with the final price.
      </p>

      {form.referencePreview && (
        <div style={{ marginBottom: "1.25rem" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "0.5rem" }}>Reference Image</p>
          <img src={form.referencePreview} alt="Reference" style={{ maxHeight: "140px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
        </div>
      )}

      <div style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflow: "hidden", marginBottom: "1.5rem" }}>
        {rows.map((row, i) => (
          <div key={row.label} style={{ display: "flex", padding: "0.65rem 1rem", background: i % 2 === 0 ? "var(--color-cream)" : "#fff", gap: "1rem" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 600, color: "var(--color-muted)", minWidth: "120px", flexShrink: 0 }}>{row.label}</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--color-chocolate)" }}>{row.value}</span>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div style={{ background: "var(--color-cream)", borderRadius: "var(--radius-lg)", padding: "1.25rem", border: "1px solid var(--color-border-dark)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.83rem", color: "var(--color-muted)" }}>Estimated Total</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 700, color: "var(--color-green)" }}>₹{estimatedPrice.toLocaleString("en-IN")}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.83rem", color: "var(--color-muted)" }}>Advance Payment (50%)</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.83rem", fontWeight: 600, color: "var(--color-coral)" }}>₹{advance.toLocaleString("en-IN")}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.83rem", color: "var(--color-muted)" }}>Remaining on Delivery</span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.83rem", color: "var(--color-chocolate)" }}>₹{remaining.toLocaleString("en-IN")}</span>
        </div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-muted)", marginTop: "0.75rem", fontStyle: "italic" }}>
          * Estimated pricing — Demo content. Final price will be confirmed by our team.
        </p>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────
function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "0.6rem" }}>
        {label}
      </p>
      {children}
    </div>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--color-muted)", display: "block", marginBottom: "0.35rem" }}>
        {label}
      </label>
      {children}
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

const optionPill = (active: boolean): React.CSSProperties => ({
  fontFamily: "var(--font-sans)",
  fontSize: "0.78rem",
  fontWeight: 500,
  padding: "0.45rem 0.9rem",
  borderRadius: "var(--radius-full)",
  border: `1.5px solid ${active ? "var(--color-green)" : "var(--color-border)"}`,
  background: active ? "var(--color-green)" : "transparent",
  color: active ? "var(--color-cream)" : "var(--color-chocolate)",
  cursor: "pointer",
  transition: "all var(--transition-fast)",
  minHeight: "36px",
});

const stepHeading: React.CSSProperties = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.5rem",
  fontWeight: 500,
  color: "var(--color-green)",
  marginBottom: "1.5rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-sans)",
  fontSize: "0.88rem",
  padding: "0.65rem 1rem",
  border: "1.5px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  background: "#fff",
  color: "var(--color-chocolate)",
  outline: "none",
  boxSizing: "border-box",
};

const errorStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.75rem",
  color: "var(--color-error)",
  marginBottom: "0.5rem",
};
