import React, { useMemo, useState } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  BarChart,
} from "recharts";

const COLORS = ["#173b6c", "#21b6ae", "#f59e0b", "#ef4444", "#8b5cf6", "#334155"];

const pageBackground = {
  minHeight: "100vh",
  background:
    "radial-gradient(circle at top left, rgba(23,59,108,0.10) 0%, rgba(244,247,251,1) 26%), linear-gradient(180deg, #eef3f9 0%, #e8eef7 100%)",
  padding: "20px 16px 48px",
  fontFamily: "Inter, Arial, sans-serif",
  color: "#10233f",
};

const containerStyle = {
  maxWidth: "1160px",
  margin: "0 auto",
  display: "grid",
  gap: "18px",
};

const cardStyle = {
  border: "1px solid #dbe4f0",
  borderRadius: "20px",
  padding: "22px",
  background: "rgba(255,255,255,0.97)",
  boxShadow: "0 14px 34px rgba(16,35,63,0.06)",
};

const buttonStyle = {
  padding: "11px 16px",
  border: "1px solid #c9d6e8",
  borderRadius: "12px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  textDecoration: "none",
  color: "#10233f",
  background: "#ffffff",
  fontSize: "13px",
  fontWeight: 700,
  cursor: "pointer",
  letterSpacing: "0.01em",
};

const primaryButtonStyle = {
  ...buttonStyle,
  background: "linear-gradient(135deg, #173b6c 0%, #0f2749 100%)",
  color: "#ffffff",
  border: "1px solid #173b6c",
  boxShadow: "0 8px 18px rgba(23,59,108,0.16)",
};

const tagStyle = {
  border: "1px solid #d7e1ef",
  borderRadius: "999px",
  padding: "8px 12px",
  fontSize: "13px",
  backgroundColor: "#ffffff",
  color: "#173b6c",
  fontWeight: 700,
};

const statCardStyle = {
  border: "1px solid #dde6f2",
  borderRadius: "16px",
  padding: "18px",
  background: "linear-gradient(180deg, #fbfdff 0%, #f6f9fd 100%)",
  minHeight: "144px",
};

const dashboardGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
  gap: "12px",
};

const panelStyle = {
  border: "1px solid #dfe8f3",
  borderRadius: "16px",
  background: "#ffffff",
  padding: "16px",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const skills = [
  "Supply Chain Analysis",
  "Logistics Coordination",
  "Advanced Excel",
  "Power BI",
  "Shipment Tracking",
  "Cross-Border Logistics",
  "Vendor Coordination",
  "SOP Development",
  "Process Improvement",
  "Reporting & KPI Analysis",
  "Asana",
  "Slack",
  "DAT Load Board",
];

const operationsData = [
  { month: "Jan", region: "Ontario", lane: "Toronto-Montreal", mode: "LTL", customer: "Retail", cause: "Carrier", priority: "High", totalOrders: 1000, delayedOrders: 82, onTimeRate: 91.8, costPerShipment: 5.1, avgTransitDays: 2.8 },
  { month: "Jan", region: "Ontario", lane: "Toronto-Ottawa", mode: "FTL", customer: "Manufacturing", cause: "Warehouse", priority: "Medium", totalOrders: 800, delayedOrders: 41, onTimeRate: 94.9, costPerShipment: 4.4, avgTransitDays: 2.1 },
  { month: "Feb", region: "Ontario", lane: "Toronto-Montreal", mode: "LTL", customer: "Retail", cause: "Warehouse", priority: "High", totalOrders: 1000, delayedOrders: 69, onTimeRate: 93.1, costPerShipment: 5.0, avgTransitDays: 2.7 },
  { month: "Feb", region: "West", lane: "Calgary-Seattle", mode: "Cross-Border", customer: "Ecommerce", cause: "Customs", priority: "High", totalOrders: 700, delayedOrders: 52, onTimeRate: 92.6, costPerShipment: 7.2, avgTransitDays: 4.3 },
  { month: "Mar", region: "West", lane: "Vancouver-Portland", mode: "Cross-Border", customer: "Ecommerce", cause: "Customs", priority: "High", totalOrders: 800, delayedOrders: 77, onTimeRate: 90.4, costPerShipment: 6.8, avgTransitDays: 4.0 },
  { month: "Mar", region: "Quebec", lane: "Montreal-Quebec City", mode: "Parcel", customer: "Retail", cause: "Carrier", priority: "Low", totalOrders: 750, delayedOrders: 48, onTimeRate: 93.6, costPerShipment: 4.2, avgTransitDays: 1.9 },
  { month: "Apr", region: "Quebec", lane: "Montreal-Halifax", mode: "LTL", customer: "Distributor", cause: "Carrier", priority: "Medium", totalOrders: 795, delayedOrders: 62, onTimeRate: 92.2, costPerShipment: 5.6, avgTransitDays: 3.5 },
  { month: "Apr", region: "West", lane: "Calgary-Edmonton", mode: "FTL", customer: "Manufacturing", cause: "Weather", priority: "Low", totalOrders: 670, delayedOrders: 33, onTimeRate: 95.1, costPerShipment: 3.9, avgTransitDays: 1.8 },
  { month: "May", region: "West", lane: "Vancouver-Kelowna", mode: "Parcel", customer: "Retail", cause: "Weather", priority: "Low", totalOrders: 685, delayedOrders: 39, onTimeRate: 94.3, costPerShipment: 4.1, avgTransitDays: 2.0 },
  { month: "May", region: "Ontario", lane: "Toronto-London", mode: "FTL", customer: "Distributor", cause: "Carrier", priority: "Medium", totalOrders: 760, delayedOrders: 47, onTimeRate: 93.8, costPerShipment: 4.0, avgTransitDays: 2.2 },
  { month: "Jun", region: "Ontario", lane: "Toronto-Montreal", mode: "LTL", customer: "Retail", cause: "Warehouse", priority: "High", totalOrders: 950, delayedOrders: 58, onTimeRate: 93.9, costPerShipment: 5.2, avgTransitDays: 2.9 },
  { month: "Jun", region: "Ontario", lane: "Toronto-Chicago", mode: "Cross-Border", customer: "Ecommerce", cause: "Customs", priority: "High", totalOrders: 745, delayedOrders: 44, onTimeRate: 94.1, costPerShipment: 7.4, avgTransitDays: 4.5 },
  { month: "Jul", region: "West", lane: "Calgary-Vancouver", mode: "LTL", customer: "Distributor", cause: "Carrier", priority: "Medium", totalOrders: 798, delayedOrders: 71, onTimeRate: 91.1, costPerShipment: 5.4, avgTransitDays: 3.4 },
  { month: "Jul", region: "Quebec", lane: "Montreal-Halifax", mode: "LTL", customer: "Distributor", cause: "Warehouse", priority: "Medium", totalOrders: 659, delayedOrders: 31, onTimeRate: 95.3, costPerShipment: 5.2, avgTransitDays: 3.2 },
  { month: "Aug", region: "Ontario", lane: "Toronto-Detroit", mode: "Cross-Border", customer: "Manufacturing", cause: "Customs", priority: "High", totalOrders: 705, delayedOrders: 36, onTimeRate: 94.9, costPerShipment: 7.1, avgTransitDays: 4.1 },
  { month: "Aug", region: "West", lane: "Vancouver-Portland", mode: "Cross-Border", customer: "Ecommerce", cause: "Weather", priority: "Medium", totalOrders: 690, delayedOrders: 29, onTimeRate: 95.8, costPerShipment: 6.3, avgTransitDays: 3.8 },
];

const blogs = [
  {
    title: "How I Think About Shipment Delays",
    excerpt: "A practical breakdown of delay root causes, escalation priorities, and the KPI mindset needed to improve service performance.",
  },
  {
    title: "Why Visibility Changes Every Decision",
    excerpt: "A short perspective on operational KPIs, trend tracking, and how reporting helps balance service with cost.",
  },
  {
    title: "Turning Daily Operations into Repeatable SOPs",
    excerpt: "What process discipline looks like when teams need better accountability, cleaner handoffs, and less manual follow-up.",
  },
];

function useIsMobile() {
  return typeof window !== "undefined" ? window.innerWidth < 768 : false;
}

function SectionTitle({ title, subtitle }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <h2 style={{ fontSize: "22px", margin: 0, color: "#10233f", letterSpacing: "-0.03em", fontWeight: 800 }}>{title}</h2>
      {subtitle ? <p style={{ margin: "6px 0 0 0", color: "#62758f", fontSize: "13px", lineHeight: 1.6 }}>{subtitle}</p> : null}
      <div style={{ height: "1px", background: "linear-gradient(90deg, #dbe4f0 0%, rgba(219,228,240,0) 100%)", marginTop: "12px" }} />
    </div>
  );
}

function SmallLabel({ children }) {
  return <div style={{ fontSize: "11px", color: "#6a7f98", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.10em" }}>{children}</div>;
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label style={{ display: "grid", gap: "6px", minWidth: "148px" }}>
      <span style={{ fontSize: "12px", color: "#4f647f", fontWeight: 800, letterSpacing: "0.02em" }}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          height: "40px",
          borderRadius: "12px",
          border: "1px solid #cfdae9",
          padding: "0 12px",
          background: "#ffffff",
          color: "#10233f",
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function MetricCard({ label, value, note, accent = "#173b6c" }) {
  return (
    <div style={{ ...statCardStyle, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <SmallLabel>{label}</SmallLabel>
        <div style={{ fontSize: "34px", fontWeight: 800, marginTop: "10px", color: accent, letterSpacing: "-0.04em" }}>{value}</div>
      </div>
      {note ? <p style={{ margin: "10px 0 0 0", color: "#62758f", fontSize: "12px", lineHeight: 1.6 }}>{note}</p> : null}
    </div>
  );
}

function filterRows(rows, filters) {
  return rows.filter(
    (item) =>
      (filters.region === "All" || item.region === filters.region) &&
      (filters.cause === "All" || item.cause === filters.cause) &&
      (filters.mode === "All" || item.mode === filters.mode) &&
      (filters.customer === "All" || item.customer === filters.customer) &&
      (filters.priority === "All" || item.priority === filters.priority)
  );
}

function AppShell({ children }) {
  return (
    <div style={pageBackground}>
      <div style={containerStyle}>
        <TopNav />
        {children}
      </div>
    </div>
  );
}

function TopNav() {
  const isMobile = useIsMobile();
  return (
    <div style={{ ...cardStyle, padding: isMobile ? "14px 16px" : "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#10233f", fontWeight: 800, fontSize: isMobile ? "18px" : "20px" }}>
        Aman Singh
      </Link>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Link to="/" style={buttonStyle}>Home</Link>
      </div>
    </div>
  );
}

function ProfileIntroCard() {
  const isMobile = useIsMobile();
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45 }} style={{ ...cardStyle, textAlign: "center", padding: isMobile ? "34px 20px" : "46px 34px" }}>
      <h1 style={{ fontSize: isMobile ? "42px" : "60px", margin: 0, letterSpacing: "-0.06em", color: "#10233f", lineHeight: 0.98 }}>Aman Singh</h1>
      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginTop: "16px", padding: isMobile ? "10px 16px" : "10px 22px", borderRadius: "999px", background: "linear-gradient(135deg, #d7e6fb 0%, #c7daf7 100%)", color: "#173b6c", fontWeight: 800, fontSize: isMobile ? "11px" : "13px", letterSpacing: "0.12em", textTransform: "uppercase", maxWidth: "100%", textAlign: "center", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.65)" }}>
        Supply Chain · Logistics · Operations
      </div>
      
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginTop: "24px" }}>
        <a href="mailto:aman86062@gmail.com" style={primaryButtonStyle}>Email Me</a>
        <a href="https://www.linkedin.com/in/amann-singhh/" target="_blank" rel="noopener noreferrer" style={buttonStyle}>LinkedIn Profile</a>
      </div>
    </motion.div>
  );
}

function OverviewDashboard() {
  const isMobile = useIsMobile();
  const [region, setRegion] = useState("All");
  const [cause, setCause] = useState("All");
  const [mode, setMode] = useState("All");
  const [customer, setCustomer] = useState("All");
  const [lane, setLane] = useState("All");

  const filtered = useMemo(
    () => filterRows(operationsData, { region, cause, mode, customer, priority: "All" }).filter((item) => lane === "All" || item.lane === lane),
    [region, cause, mode, customer, lane]
  );

  const totalOrders = filtered.reduce((sum, item) => sum + item.totalOrders, 0);
  const avgOnTime = filtered.length ? (filtered.reduce((sum, item) => sum + item.onTimeRate, 0) / filtered.length).toFixed(1) : "0.0";
  const avgCost = filtered.length ? (filtered.reduce((sum, item) => sum + item.costPerShipment, 0) / filtered.length).toFixed(2) : "0.00";
  const avgTransit = filtered.length ? (filtered.reduce((sum, item) => sum + item.avgTransitDays, 0) / filtered.length).toFixed(1) : "0.0";

  const monthlyData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((month) => {
    const rows = filtered.filter((item) => item.month === month);
    const orders = rows.reduce((sum, item) => sum + item.totalOrders, 0);
    const delays = rows.reduce((sum, item) => sum + item.delayedOrders, 0);
    return { month, orders, onTime: orders ? Number((((orders - delays) / orders) * 100).toFixed(1)) : 0 };
  });

  const routeMapData = filtered.map((item) => ({ lane: item.lane, onTimeRate: item.onTimeRate })).sort((a, b) => b.onTimeRate - a.onTimeRate);

  return (
    <div style={cardStyle}>
      <SectionTitle title="Dashboard" subtitle="Executive-style performance page built for fast KPI review and route visibility" />
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "18px", justifyContent: "center", padding: "14px", borderRadius: "16px", background: "#f7faff", border: "1px solid #e2eaf4" }}>
        <SelectField label="Region" value={region} onChange={setRegion} options={["All", "Ontario", "Quebec", "West"]} />
        <SelectField label="Delay Cause" value={cause} onChange={setCause} options={["All", "Carrier", "Warehouse", "Customs", "Weather"]} />
        <SelectField label="Mode" value={mode} onChange={setMode} options={["All", "LTL", "FTL", "Parcel", "Cross-Border"]} />
        <SelectField label="Lane" value={lane} onChange={setLane} options={["All", ...Array.from(new Set(operationsData.map((item) => item.lane)))]} />
        <SelectField label="Customer" value={customer} onChange={setCustomer} options={["All", "Retail", "Manufacturing", "Distributor", "Ecommerce"]} />
      </div>
      <div style={{ ...dashboardGridStyle, gridTemplateColumns: isMobile ? "1fr" : dashboardGridStyle.gridTemplateColumns }}>
        <div style={{ gridColumn: isMobile ? "span 12" : "span 3" }}><MetricCard label="Average On-Time" value={`${avgOnTime}%`} note="Service level across the filtered shipments." /></div>
        <div style={{ gridColumn: isMobile ? "span 12" : "span 3" }}><MetricCard label="Average Cost / Shipment" value={`$${avgCost}`} note="Average transport cost across the current selection." /></div>
        <div style={{ gridColumn: isMobile ? "span 12" : "span 3" }}><MetricCard label="Total Orders" value={String(totalOrders)} note="Total shipment volume under the active filters." /></div>
        <div style={{ gridColumn: isMobile ? "span 12" : "span 3" }}><MetricCard label="Average Transit" value={`${avgTransit} days`} note="Average route movement time." accent="#0f766e" /></div>
        <div style={{ ...panelStyle, gridColumn: isMobile ? "span 12" : "span 7" }}>
          <SmallLabel>Monthly Service Trend</SmallLabel>
          <div style={{ height: isMobile ? "240px" : "300px", marginTop: "12px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyData}>
                <CartesianGrid stroke="#e8eef6" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" domain={[88, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="orders" fill="#21b6ae" radius={[6, 6, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="onTime" stroke="#173b6c" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ ...panelStyle, gridColumn: isMobile ? "span 12" : "span 5" }}>
          <SmallLabel>Route Performance</SmallLabel>
          <div style={{ paddingTop: "10px", display: "grid", gap: "10px" }}>
            {routeMapData.slice(0, 6).map((route, index) => (
              <div key={`${route.lane}-${index}`} style={{ display: "grid", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#29496f", fontWeight: 700, gap: "8px" }}>
                  <span style={{ overflowWrap: "anywhere" }}>{route.lane}</span>
                  <span>{route.onTimeRate}%</span>
                </div>
                <div style={{ height: "12px", background: "#e6edf7", borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{ width: `${route.onTimeRate}%`, height: "100%", background: index % 2 === 0 ? "#173b6c" : "#21b6ae" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DelayDashboard() {
  const isMobile = useIsMobile();
  const [region, setRegion] = useState("All");
  const [cause, setCause] = useState("All");
  const [priority, setPriority] = useState("All");
  const [mode, setMode] = useState("All");
  const [lane, setLane] = useState("All");

  const filtered = useMemo(
    () => filterRows(operationsData, { region, cause, mode, customer: "All", priority }).filter((item) => lane === "All" || item.lane === lane),
    [region, cause, mode, priority, lane]
  );

  const avgDelayRate = filtered.length ? (filtered.reduce((sum, item) => sum + (item.delayedOrders / item.totalOrders) * 100, 0) / filtered.length).toFixed(1) : "0.0";
  const avgTransit = filtered.length ? (filtered.reduce((sum, item) => sum + item.avgTransitDays, 0) / filtered.length).toFixed(1) : "0.0";

  const causeChartData = Object.entries(
    filtered.reduce((acc, item) => {
      acc[item.cause] = (acc[item.cause] || 0) + item.delayedOrders;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const laneData = Object.entries(
    filtered.reduce((acc, item) => {
      acc[item.lane] = (acc[item.lane] || 0) + item.delayedOrders;
      return acc;
    }, {})
  ).map(([lane, delayed]) => ({ lane, delayed })).sort((a, b) => b.delayed - a.delayed);

  const monthlyDelayData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((month) => {
    const rows = filtered.filter((item) => item.month === month);
    const total = rows.reduce((sum, item) => sum + item.totalOrders, 0);
    const delayed = rows.reduce((sum, item) => sum + item.delayedOrders, 0);
    return { month, delayRate: total ? Number(((delayed / total) * 100).toFixed(1)) : 0 };
  });

  return (
    <div style={cardStyle}>
      <SectionTitle title="Dashboard" subtitle="Diagnostic page focused on cause concentration, delay movement, and operational exposure" />
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "18px", justifyContent: "center", padding: "14px", borderRadius: "16px", background: "#f7faff", border: "1px solid #e2eaf4" }}>
        <SelectField label="Region" value={region} onChange={setRegion} options={["All", "Ontario", "Quebec", "West"]} />
        <SelectField label="Delay Cause" value={cause} onChange={setCause} options={["All", "Carrier", "Warehouse", "Customs", "Weather"]} />
        <SelectField label="Priority" value={priority} onChange={setPriority} options={["All", "High", "Medium", "Low"]} />
        <SelectField label="Mode" value={mode} onChange={setMode} options={["All", "LTL", "FTL", "Parcel", "Cross-Border"]} />
        <SelectField label="Lane" value={lane} onChange={setLane} options={["All", ...Array.from(new Set(operationsData.map((item) => item.lane)))]} />
      </div>
      <div style={{ ...dashboardGridStyle, gridTemplateColumns: isMobile ? "1fr" : dashboardGridStyle.gridTemplateColumns }}>
        <div style={{ gridColumn: isMobile ? "span 12" : "span 3" }}><MetricCard label="Average Delay Rate" value={`${avgDelayRate}%`} note="Share of delayed orders in the filtered slice." accent="#b45309" /></div>
        <div style={{ gridColumn: isMobile ? "span 12" : "span 3" }}><MetricCard label="Average Transit Time" value={`${avgTransit} days`} note="Average movement time across selected lanes." /></div>
        <div style={{ ...panelStyle, gridColumn: isMobile ? "span 12" : "span 6" }}>
          <SmallLabel>Delay Cause Mix</SmallLabel>
          <div style={{ height: isMobile ? "220px" : "240px", marginTop: "12px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={causeChartData} dataKey="value" nameKey="name" outerRadius={82} innerRadius={42}>
                  {causeChartData.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ ...panelStyle, gridColumn: isMobile ? "span 12" : "span 7" }}>
          <SmallLabel>Monthly Delay Rate</SmallLabel>
          <div style={{ height: isMobile ? "240px" : "300px", marginTop: "12px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyDelayData}>
                <CartesianGrid stroke="#e8eef6" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="delayRate" fill="#fde68a" stroke="#b45309" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ ...panelStyle, gridColumn: isMobile ? "span 12" : "span 5" }}>
          <SmallLabel>Highest Delay Lanes</SmallLabel>
          <div style={{ height: isMobile ? "260px" : "300px", marginTop: "12px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={laneData.slice(0, 8)} layout="vertical" margin={{ left: 10, right: 10 }}>
                <CartesianGrid stroke="#e8eef6" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="lane" tick={{ fontSize: 10 }} width={130} />
                <Tooltip />
                <Bar dataKey="delayed" fill="#173b6c" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCaseStudy({ title, problem, dataset, insights, explanation, children }) {
  const isMobile = useIsMobile();
  return (
    <AppShell>
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45 }} style={cardStyle}>
        <Link to="/" style={{ ...buttonStyle, marginBottom: "16px", width: "fit-content" }}>← Back Home</Link>
        <SectionTitle title={title} subtitle="Detailed project page with business framing, dashboard view, and key recommendations" />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "18px", marginBottom: "18px" }}>
          <div style={panelStyle}>
            <SmallLabel>Problem</SmallLabel>
            <p style={{ margin: "8px 0 0 0", color: "#4b607b", fontSize: "14px", lineHeight: 1.8 }}>{problem}</p>
          </div>
          <div style={panelStyle}>
            <SmallLabel>Dataset</SmallLabel>
            <p style={{ margin: "8px 0 0 0", color: "#4b607b", fontSize: "14px", lineHeight: 1.8 }}>{dataset}</p>
          </div>
        </div>
        {children}
        <div style={{ ...cardStyle, padding: "0", background: "transparent", boxShadow: "none", border: "none" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "18px" }}>
            <div style={panelStyle}>
              <SmallLabel>Key Insights</SmallLabel>
              <div style={{ display: "grid", gap: "8px", marginTop: "10px" }}>
                {insights.map((insight) => (
                  <div key={insight} style={{ padding: "10px 12px", borderRadius: "12px", background: "#f7faff", border: "1px solid #e3ebf5", color: "#374151", fontSize: "14px", lineHeight: 1.7 }}>
                    {insight}
                  </div>
                ))}
              </div>
            </div>
            <div style={panelStyle}>
              <SmallLabel>Project Explanation</SmallLabel>
              <p style={{ margin: "8px 0 0 0", color: "#4b607b", fontSize: "14px", lineHeight: 1.8 }}>{explanation}</p>
              <div style={{ marginTop: "16px" }}>
                <SmallLabel>Tools Used</SmallLabel>
                <p style={{ margin: "8px 0 0 0", color: "#4b607b", fontSize: "14px", lineHeight: 1.8 }}>Excel, Power BI concepts, React, KPI reporting, shipment operations analysis.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AppShell>
  );
}

function HomePage() {
  const isMobile = useIsMobile();
  return (
    <AppShell>
      <ProfileIntroCard />
      <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.05, duration: 0.45 }} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.08fr 0.92fr", gap: "18px" }}>
        <div style={cardStyle}>
          <SectionTitle title="About Me" />
          <p style={{ margin: 0, color: "#374151", lineHeight: 1.9, fontSize: "15px" }}>
            My background combines business education, startup operations, manufacturing quality support, and logistics-focused coordination. I have experience with documentation, task management, communication across teams, and process improvement. I am building my portfolio around practical supply chain work such as shipment performance, delay trends, and operations insights to demonstrate both analytical thinking and operational understanding.
          </p>
        </div>
        <div style={cardStyle}>
          <SectionTitle title="Core Skills" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {skills.map((skill) => <span key={skill} style={tagStyle}>{skill}</span>)}
          </div>
        </div>
      </motion.div>
      <ExperienceSection />
      <FeaturedProjects />
      <BlogSection />
      <FooterSection />
    </AppShell>
  );
}

function FeaturedProjects() {
  const isMobile = useIsMobile();
  const projects = [
    {
      title: "Carrier Performance Dashboard",
      path: "/projects/carrier-performance",
      text: "Executive KPI view focused on service, cost, transit time, and lane visibility.",
    },
    {
      title: "Shipment Delay Analysis",
      path: "/projects/shipment-delay-analysis",
      text: "Diagnostic page focused on root causes, delay trends, and highest-risk lanes.",
    },
  ];
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1, duration: 0.45 }} style={cardStyle}>
      <SectionTitle title="Featured Projects" subtitle="Open a full case-study style project page for deeper analysis" />
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "18px" }}>
        {projects.map((project) => (
          <div key={project.title} style={{ ...panelStyle, display: "grid", gap: "12px" }}>
            <div style={{ fontWeight: 800, fontSize: "20px", color: "#173b6c" }}>{project.title}</div>
            <p style={{ margin: 0, color: "#5f7189", fontSize: "14px", lineHeight: 1.8 }}>{project.text}</p>
            <Link to={project.path} style={{ ...primaryButtonStyle, width: "fit-content" }}>View Project</Link>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CarrierProjectPage() {
  return (
    <ProjectCaseStudy
      title="Carrier Performance Dashboard"
      problem="A logistics team needs to monitor service, cost, and route performance across regions and shipment types without waiting for manual reports."
      dataset="Shipment operations dataset across Ontario, Quebec, and Western Canada with lane, mode, customer, priority, cost, on-time rate, and delay metrics."
      insights={[
        "Cross-border lanes show the highest average cost and usually carry the strongest delay risk.",
        "Ontario drives the highest order volume, but service performance stays relatively stable compared with cross-border lanes.",
        "Route-level performance highlights which lanes should be monitored for carrier reassignment or process review.",
      ]}
      explanation="This project is designed like a management dashboard. It focuses on KPI visibility, service trend movement, cost awareness, and lane-level performance so a team can quickly understand where operations are healthy and where attention is needed."
    >
      <OverviewDashboard />
    </ProjectCaseStudy>
  );
}

function DelayProjectPage() {
  return (
    <ProjectCaseStudy
      title="Shipment Delay Analysis Dashboard"
      problem="Operations leaders need to know not only that delays are happening, but why they are happening and which lanes are responsible for the biggest service impact."
      dataset="The same shipment dataset is reused here but sliced differently to isolate causes, lane concentration, priority exposure, and monthly delay behavior."
      insights={[
        "Customs and carrier issues create the heaviest delay pressure in higher-priority shipments.",
        "A small number of lanes account for a large share of delayed orders, which supports focused corrective action.",
        "Monthly delay rate movement helps distinguish recurring structural issues from short-term operational spikes.",
      ]}
      explanation="This page is built for diagnosis rather than overview. Instead of broad KPI tracking, it explains delay concentration through root-cause mix, monthly delay rate, and highest-delay lane analysis so decision-makers can prioritize action faster."
    >
      <DelayDashboard />
    </ProjectCaseStudy>
  );
}

function ExperienceSection() {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.08, duration: 0.45 }} style={cardStyle}>
      <SectionTitle title="Professional Experience" subtitle="Experience structured around execution, coordination, and operational control" />
      <div style={{ display: "grid", gap: "16px" }}>
        <div>
          <strong>Quality Inspector – Honda Manufacturing</strong>
          <p style={{ margin: "6px 0", color: "#5f7189" }}>
            Conducted daily inspection of automotive parts using precision tools, identified defects, and coordinated with line associates for replacements. Maintained quality records and supported continuous improvement practices within production.
          </p>
          <p style={{ fontSize: "13px", color: "#7a8da6" }}>Systems: Internal Honda systems, inspection tools</p>
        </div>
        <div>
          <strong>Logistics Coordinator</strong>
          <p style={{ margin: "6px 0", color: "#5f7189" }}>
            Managed shipment coordination, tracked inbound and outbound loads, communicated with carriers, and handled delay situations. Used load boards to secure freight and supported day-to-day transportation flow.
          </p>
          <p style={{ fontSize: "13px", color: "#7a8da6" }}>Tools: DAT Load Board, tracking tools, Excel</p>
        </div>
        <div>
          <strong>Operations Manager – Startup</strong>
          <p style={{ margin: "6px 0", color: "#5f7189" }}>
            Built operational structure from scratch, handled hiring, task management, and internal communication. Managed workflows and ensured coordination across teams for daily operations.
          </p>
          <p style={{ fontSize: "13px", color: "#7a8da6" }}>Tools: Asana, Slack</p>
        </div>
      </div>
    </motion.div>
  );
}

function BlogSection() {
  const isMobile = useIsMobile();
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.12, duration: 0.45 }} style={cardStyle}>
      <SectionTitle title="Blogs & Thought Pieces" />
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: "14px" }}>
        {blogs.map((blog) => (
          <div key={blog.title} style={{ border: "1px solid #dbe4f0", borderRadius: "16px", padding: "18px", background: "#ffffff", boxShadow: "0 8px 20px rgba(16,35,63,0.03)" }}>
            <div style={{ fontWeight: 800, color: "#173b6c", marginBottom: "8px", lineHeight: 1.5 }}>{blog.title}</div>
            <p style={{ margin: 0, color: "#5f7189", fontSize: "14px", lineHeight: 1.8 }}>{blog.excerpt}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function FooterSection() {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.14, duration: 0.45 }} style={{ ...cardStyle, background: "linear-gradient(135deg, #163764 0%, #10233f 100%)", color: "#ffffff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em" }}>Let’s Connect</div>
          <p style={{ margin: "10px 0 0 0", color: "#d7e3f4", lineHeight: 1.8, maxWidth: "760px" }}>
            I am open to opportunities in supply chain analysis, logistics coordination, and operations roles across Canada. This website is designed to show both my background and my project thinking in a recruiter-friendly way.
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href="mailto:aman86062@gmail.com" style={{ ...primaryButtonStyle, background: "#ffffff", color: "#10233f", border: "1px solid #ffffff" }}>Email Me</a>
          <a href="https://www.linkedin.com/in/amann-singhh/" target="_blank" rel="noopener noreferrer" style={{ ...buttonStyle, background: "transparent", color: "#ffffff", border: "1px solid rgba(255,255,255,0.28)" }}>LinkedIn</a>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/carrier-performance" element={<CarrierProjectPage />} />
        <Route path="/projects/shipment-delay-analysis" element={<DelayProjectPage />} />
      </Routes>
    </HashRouter>
  );
}
