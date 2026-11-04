import { useState } from "react";

interface InputProps {
  label:       string;
  type?:       string;
  value:       string;
  onChange:    (v: string) => void;
  placeholder?: string;
  error?:      string;
}
 
export const Input = ({
  label, type = "text", value, onChange, placeholder, error
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
      <label style={{ fontSize:"14px", fontWeight:"500", color:"#334155" }}>
        {label}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: `1.5px solid ${error ? "#DC2626" : "#CBD5E1"}`,
          borderRadius: "10px",
          background: "#F8FAFC",
        }}
      >
        <input
          type={isPassword && !isPasswordVisible ? "password" : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            minWidth: 0,
            padding: "12px 16px",
            border: "none",
            borderRadius: "10px",
            fontSize: "15px",
            color: "#0F172A",
            background: "transparent",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(visible => !visible)}
            aria-label={isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={isPasswordVisible}
            style={{
              minWidth: "44px",
              minHeight: "44px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {isPasswordVisible ? "🙈" : "👁"}
          </button>
        )}
      </div>
      {error && (
        <span style={{ fontSize:"12px", color:"#DC2626" }}>{error}</span>
      )}
    </div>
  );
};
