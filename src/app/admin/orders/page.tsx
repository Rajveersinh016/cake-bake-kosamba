"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Eye, Phone, MapPin, X, CheckCircle, Clock } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { initialAdminOrders, AdminOrder } from "@/data/adminData";

const tabs = ["All", "Pending", "Baking", "Ready for Pickup", "Out for Delivery", "Completed"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(initialAdminOrders);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedOrder(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedOrder]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchTab = activeTab === "All" || o.status === activeTab;
      const matchSearch =
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerPhone.includes(searchQuery);
      return matchTab && matchSearch;
    });
  }, [orders, activeTab, searchQuery]);

  const updateStatus = (orderId: string, status: AdminOrder["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status } : null));
    }
  };

  return (
    <>
      <AdminHeader title="Order Management" />

      <main style={{ padding: "2rem", flex: 1, overflowY: "auto" }}>
        {/* Filters Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.75rem",
            background: "#fff",
            padding: "1rem 1.25rem",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
          }}
        >
          {/* Tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {tabs.map((tab) => {
              const count = tab === "All" ? orders.length : orders.filter((o) => o.status === tab).length;
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: active ? 600 : 500,
                    padding: "0.4rem 0.85rem",
                    borderRadius: "var(--radius-full)",
                    border: `1.5px solid ${active ? "var(--color-green)" : "var(--color-border)"}`,
                    background: active ? "var(--color-green)" : "transparent",
                    color: active ? "var(--color-cream)" : "var(--color-chocolate)",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                  }}
                >
                  {tab} ({count})
                </button>
              );
            })}
          </div>

          {/* Search input */}
          <div style={{ position: "relative", minWidth: "240px" }}>
            <Search size={15} color="var(--color-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Search ID, Name, Phone…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                fontFamily: "var(--font-sans)",
                fontSize: "0.82rem",
                padding: "0.5rem 1rem 0.5rem 2.3rem",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--color-border)",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Orders Table */}
        <div
          style={{
            background: "#fff",
            borderRadius: "var(--radius-xl)",
            padding: "1.5rem",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <th style={thStyle}>Order ID</th>
                  <th style={thStyle}>Date &amp; Time Slot</th>
                  <th style={thStyle}>Customer</th>
                  <th style={thStyle}>Type &amp; Branch</th>
                  <th style={thStyle}>Items Summary</th>
                  <th style={thStyle}>Amount</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: "center", padding: "3rem", color: "var(--color-muted)" }}>
                      No orders found for this criteria.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((o) => (
                    <tr key={o.id} style={{ borderBottom: "1px solid var(--color-cream-dark)" }}>
                      <td style={{ ...tdStyle, fontWeight: 700, color: "var(--color-green)" }}>{o.id}</td>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600 }}>{o.orderDate}</div>
                        <div style={{ fontSize: "0.7rem", color: "var(--color-muted)" }}>{o.timeSlot}</div>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600, color: "var(--color-chocolate)" }}>{o.customerName}</div>
                        <div style={{ fontSize: "0.7rem", color: "var(--color-muted)" }}>{o.customerPhone}</div>
                      </td>
                      <td style={tdStyle}>
                        <span style={{ fontSize: "0.72rem", fontWeight: 700, background: o.orderType === "Delivery" ? "rgba(217,122,120,0.15)" : "rgba(24,63,58,0.08)", color: o.orderType === "Delivery" ? "var(--color-coral)" : "var(--color-green)", padding: "0.15rem 0.5rem", borderRadius: "var(--radius-full)", display: "inline-block", marginBottom: "0.2rem" }}>
                          {o.orderType}
                        </span>
                        <div style={{ fontSize: "0.7rem", color: "var(--color-muted)" }}>{o.location}</div>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontSize: "0.78rem", color: "var(--color-chocolate-light)", maxWidth: "220px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {o.itemsSummary}
                        </div>
                      </td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: "var(--color-green)" }}>₹{o.totalAmount}</td>
                      <td style={tdStyle}>
                        <select
                          value={o.status}
                          onChange={(e) => updateStatus(o.id, e.target.value as AdminOrder["status"])}
                          style={statusSelectStyle(o.status)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Baking">Baking</option>
                          <option value="Ready for Pickup">Ready for Pickup</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td style={tdStyle}>
                        <button
                          onClick={() => setSelectedOrder(o)}
                          style={{
                            background: "none",
                            border: "1px solid var(--color-border)",
                            borderRadius: "var(--radius-full)",
                            padding: "0.3rem 0.6rem",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.3rem",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            color: "var(--color-chocolate)",
                          }}
                        >
                          <Eye size={13} /> View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Drawer Modal */}
        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedOrder(null)}
                style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 300, backdropFilter: "blur(2px)" }}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                style={{
                  position: "fixed",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "min(460px, 100vw)",
                  background: "#fff",
                  zIndex: 301,
                  padding: "1.75rem",
                  boxShadow: "var(--shadow-xl)",
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "1rem" }}>
                  <div>
                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--color-green)", margin: 0 }}>
                      Order {selectedOrder.id}
                    </h2>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-muted)", margin: 0 }}>
                      Placed for {selectedOrder.orderDate} · {selectedOrder.timeSlot}
                    </p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)" }}>
                    <X size={20} />
                  </button>
                </div>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {/* Status Box */}
                  <div style={{ background: "var(--color-cream)", borderRadius: "var(--radius-md)", padding: "1rem", border: "1px solid var(--color-border)" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-muted)", marginBottom: "0.4rem" }}>
                      Current Status
                    </p>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => updateStatus(selectedOrder.id, e.target.value as AdminOrder["status"])}
                      style={{ ...statusSelectStyle(selectedOrder.status), width: "100%", padding: "0.5rem 0.8rem", fontSize: "0.85rem" }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Baking">Baking</option>
                      <option value="Ready for Pickup">Ready for Pickup</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Customer Info */}
                  <div style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "1rem" }}>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--color-green)", marginBottom: "0.75rem" }}>Customer Details</h3>
                    <DetailRow label="Name" value={selectedOrder.customerName} />
                    <DetailRow label="Phone" value={selectedOrder.customerPhone} />
                    <DetailRow label="Email" value={selectedOrder.customerEmail} />
                    <DetailRow label="Fulfillment" value={`${selectedOrder.orderType} (${selectedOrder.location})`} />
                    <DetailRow label="Payment Status" value={selectedOrder.paymentStatus} />
                  </div>

                  {/* Items */}
                  <div style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "1rem" }}>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--color-green)", marginBottom: "0.75rem" }}>Order Items</h3>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--color-chocolate)", lineHeight: 1.6 }}>
                      {selectedOrder.itemsSummary}
                    </p>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1rem", marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--color-muted)" }}>Total Order Value</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.3rem", fontWeight: 700, color: "var(--color-green)" }}>₹{selectedOrder.totalAmount}</span>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontFamily: "var(--font-sans)", fontSize: "0.8rem" }}>
      <span style={{ color: "var(--color-muted)" }}>{label}</span>
      <span style={{ fontWeight: 600, color: "var(--color-chocolate)" }}>{value}</span>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.68rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
  padding: "0.75rem 0.5rem",
};

const tdStyle: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.82rem",
  padding: "0.85rem 0.5rem",
  verticalAlign: "middle",
};

function statusSelectStyle(status: AdminOrder["status"]): React.CSSProperties {
  let bg = "rgba(24,63,58,0.08)";
  let color = "var(--color-green)";
  if (status === "Baking") { bg = "rgba(196,125,26,0.12)"; color = "var(--color-warning)"; }
  if (status === "Ready for Pickup") { bg = "rgba(233,164,160,0.2)"; color = "var(--color-coral)"; }
  if (status === "Completed") { bg = "rgba(58,125,68,0.12)"; color = "var(--color-success)"; }

  return {
    fontFamily: "var(--font-sans)",
    fontSize: "0.72rem",
    fontWeight: 600,
    padding: "0.3rem 0.6rem",
    borderRadius: "var(--radius-full)",
    border: "1px solid var(--color-border)",
    background: bg,
    color: color,
    cursor: "pointer",
    outline: "none",
  };
}
