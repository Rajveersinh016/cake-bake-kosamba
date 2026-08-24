"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingBag,
  IndianRupee,
  Sparkles,
  Store,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Eye,
  Edit3,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import MetricCard from "@/components/admin/MetricCard";
import { adminMetrics, initialAdminOrders, initialCustomCakeRequests, AdminOrder } from "@/data/adminData";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(initialAdminOrders);

  const handleStatusChange = (orderId: string, newStatus: AdminOrder["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <>
      <AdminHeader title="Dashboard Overview" />

      <main style={{ padding: "2rem", flex: 1, overflowY: "auto" }}>
        {/* KPI Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2rem",
          }}
        >
          <MetricCard
            title="Today's Orders"
            value={adminMetrics.todaysOrders}
            subtext="vs yesterday"
            trend={adminMetrics.ordersComparison}
            icon={<ShoppingBag size={20} />}
          />
          <MetricCard
            title="Today's Revenue"
            value={`₹${adminMetrics.todaysRevenue.toLocaleString("en-IN")}`}
            subtext="growth rate"
            trend={adminMetrics.growthRate}
            icon={<IndianRupee size={20} />}
          />
          <MetricCard
            title="Custom Cake Requests"
            value={adminMetrics.pendingCustomCakes}
            subtext="requires quote approval"
            trend="2 new today"
            isPositive={true}
            icon={<Sparkles size={20} />}
          />
          <MetricCard
            title="Active Outlets"
            value={adminMetrics.activeStores}
            subtext="Kosamba, Sayan, Valia, Andada, Ankleshwar"
            icon={<Store size={20} />}
          />
        </div>

        {/* Live Orders Section */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.75rem", alignItems: "start" }} className="admin-grid">
          {/* Recent Orders Table */}
          <div
            style={{
              background: "#fff",
              borderRadius: "var(--radius-xl)",
              padding: "1.5rem",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 600, color: "var(--color-green)" }}>
                  Recent Orders
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--color-muted)" }}>
                  Live order status tracking &amp; instant workflow transitions
                </p>
              </div>
              <Link
                href="/admin/orders"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--color-green)",
                  textDecoration: "none",
                }}
              >
                View All <ArrowUpRight size={14} />
              </Link>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <th style={thStyle}>Order ID</th>
                    <th style={thStyle}>Customer</th>
                    <th style={thStyle}>Items</th>
                    <th style={thStyle}>Amount</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} style={{ borderBottom: "1px solid var(--color-cream-dark)" }}>
                      <td style={{ ...tdStyle, fontWeight: 700, color: "var(--color-green)" }}>{order.id}</td>
                      <td style={tdStyle}>
                        <div style={{ fontWeight: 600, color: "var(--color-chocolate)" }}>{order.customerName}</div>
                        <div style={{ fontSize: "0.7rem", color: "var(--color-muted)" }}>{order.customerPhone}</div>
                      </td>
                      <td style={tdStyle}>
                        <div style={{ fontSize: "0.78rem", color: "var(--color-chocolate-light)", maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {order.itemsSummary}
                        </div>
                      </td>
                      <td style={{ ...tdStyle, fontWeight: 700 }}>₹{order.totalAmount}</td>
                      <td style={tdStyle}>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as AdminOrder["status"])}
                          style={statusSelectStyle(order.status)}
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
                        <Link
                          href="/admin/orders"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            color: "var(--color-coral)",
                            textDecoration: "none",
                          }}
                        >
                          <Eye size={14} /> View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Custom Cake Enquiries */}
          <div
            style={{
              background: "#fff",
              borderRadius: "var(--radius-xl)",
              padding: "1.5rem",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontWeight: 600, color: "var(--color-green)" }}>
                  Custom Cake Enquiries
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-muted)" }}>
                  Requests from custom builder
                </p>
              </div>
              <Link
                href="/admin/custom-cakes"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--color-coral)",
                  textDecoration: "none",
                }}
              >
                Manage →
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {initialCustomCakeRequests.map((req) => (
                <div
                  key={req.id}
                  style={{
                    padding: "0.95rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--color-cream)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.35rem" }}>
                    <div>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, color: "var(--color-green)" }}>
                        {req.id}
                      </span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-muted)", marginLeft: "0.4rem" }}>
                        · {req.occasion}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        padding: "0.15rem 0.5rem",
                        borderRadius: "var(--radius-full)",
                        background: req.status === "Deposit Received" ? "rgba(58,125,68,0.12)" : "rgba(217,122,120,0.15)",
                        color: req.status === "Deposit Received" ? "var(--color-success)" : "var(--color-coral)",
                      }}
                    >
                      {req.status}
                    </span>
                  </div>

                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 600, color: "var(--color-chocolate)", marginBottom: "0.2rem" }}>
                    {req.customerName} ({req.customerPhone})
                  </div>

                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--color-chocolate-light)", marginBottom: "0.5rem" }}>
                    {req.flavour} · {req.size}
                  </div>

                  <Link
                    href="/admin/custom-cakes"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "var(--color-green)",
                      textDecoration: "none",
                    }}
                  >
                    <Edit3 size={13} /> Quote / Review Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @media (max-width: 1024px) {
          .admin-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
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
