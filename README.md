<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
import React, { useState } from "react";

const cardStyle = {
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "20px",
  backgroundColor: "#ffffff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
};

const buttonStyle = {
  padding: "10px 16px",
  border: "1px solid #d1d5db",
  borderRadius: "12px",
  display: "inline-block",
  textDecoration: "none",
  color: "#111827",
  backgroundColor: "#ffffff",
  fontSize: "14px",
};

const skills = [
  "Supply Chain",
  "Logistics",
  "Advanced Excel",
  "Power BI",
  "Inventory Tracking",
  "Process Improvement",
  "Vendor Coordination",
  "Shipment Tracking",
];

const carrierData = [
  { carrier: "FedEx", onTime: 96, cost: 4.8 },
  { carrier: "UPS", onTime: 94, cost: 4.5 },
  { carrier: "DHL", onTime: 92, cost: 7.6 },
  { carrier: "Purolator", onTime: 93, cost: 4.9 },
];

function SectionTitle({ title, subtitle }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <h2 style={{ fontSize: "22px", margin: 0, color: "#111827" }}>{title}</h2>
      {subtitle ? (
        <p style={{ margin: "6px 0 0 0", color: "#6b7280", fontSize: "14px" }}>{subtitle}</p>
      ) : null}
    </div>
  );
}

function ProfilePhotoUploader() {
  const [preview, setPreview] = useState("");

  return (
    <div style={{ textAlign: "center" }}>
      {preview ? (
        <img
          src={preview}
          alt="Profile preview"
          style={{
            width: "140px",
            height: "140px",
            objectFit: "cover",
            borderRadius: "16px",
            display: "block",
            margin: "0 auto 14px auto",
            border: "1px solid #e5e7eb",
          }}
        />
      ) : (
        <div
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "16px",
            border: "1px dashed #cbd5e1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px auto",
            color: "#64748b",
            fontSize: "14px",
            backgroundColor: "#f8fafc",
          }}
        >
          Upload Photo
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          if (file) {
            setPreview(URL.createObjectURL(file));
          }
        }}
      />
    </div>
  );
}

function CarrierDashboard() {
  const maxOnTime = Math.max(...carrierData.map((item) => item.onTime));

  return (
    <div style={cardStyle}>
      <SectionTitle
        title="Work Sample: Carrier Performance Dashboard"
        subtitle="Simple portfolio sample showing carrier on-time performance and cost comparison"
      />

      <div style={{ display: "grid", gap: "12px" }}>
        {carrierData.map((item) => (
          <div key={item.carrier} style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
              <strong>{item.carrier}</strong>
              <span style={{ color: "#6b7280", fontSize: "14px" }}>Cost per shipment: ${item.cost}</span>
            </div>
            <div style={{ marginTop: "10px", backgroundColor: "#e5e7eb", height: "12px", borderRadius: "999px", overflow: "hidden" }}>
              <div
                style={{
                  width: `${(item.onTime / maxOnTime) * 100}%`,
                  height: "100%",
                  backgroundColor: "#111827",
                }}
              />
            </div>
            <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "#374151" }}>
              On-time delivery: {item.onTime}%
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "16px", padding: "14px", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e5e7eb" }}>
        <strong>Interpretation</strong>
        <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "#374151", lineHeight: 1.7 }}>
          This sample shows how a logistics analyst can compare carriers based on service and cost. A carrier with strong on-time delivery but very high cost may be best for urgent shipments, while a lower-cost carrier with reliable performance may be better for regular freight. The purpose of this dashboard is to support better carrier allocation decisions and reduce service failures.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        color: "#111827",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gap: "20px" }}>
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontSize: "36px", margin: 0 }}>Aman Singh</h1>
              <p style={{ margin: "8px 0 0 0", color: "#6b7280" }}>Supply Chain & Logistics Professional</p>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <a href="mailto:aman86062@gmail.com" style={buttonStyle}>Email Me</a>
              <a
                href="https://www.linkedin.com/in/amann-singhh/"
                target="_blank"
                rel="noopener noreferrer"
                style={buttonStyle}
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <SectionTitle title="Profile Photo" subtitle="You can upload and change your picture anytime" />
          <ProfilePhotoUploader />
        </div>

        <div style={cardStyle}>
          <SectionTitle title="Basic Introduction" subtitle="Short summary for recruiters and hiring managers" />
          <p style={{ margin: 0, color: "#374151", lineHeight: 1.8 }}>
            I am an operations and supply chain professional with experience in logistics coordination, manufacturing support, shipment tracking, and process improvement. My background includes startup operations, quality-focused manufacturing work, and hands-on exposure to logistics workflows. I am currently building my portfolio for Supply Chain Analyst, Logistics Coordinator, and Operations roles in Canada.
          </p>
        </div>

        <div style={cardStyle}>
          <SectionTitle title="Skills" subtitle="Core areas I work in" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {skills.map((skill) => (
              <span
                key={skill}
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "999px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  backgroundColor: "#ffffff",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <CarrierDashboard />
      </div>
    </div>
  );
}
# Portfolio
>>>>>>> a3ded72818d1cae19e148fc9ec200a129759eab0
