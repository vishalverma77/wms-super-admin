import React, { useState, useRef } from "react";
import { Search, Calendar, ChevronDown, Check, X } from "lucide-react";

export interface HeaderProps {
  title: string;
  subtitle: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  dateRange?: string;
  setDateRange?: (range: string) => void;
  onRefresh?: () => void;
  children?: React.ReactNode;
}

export function Header({
  title,
  subtitle,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  dateRange,
  setDateRange,
  children,
}: HeaderProps) {
  const [localQuery, setLocalQuery] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = searchQuery !== undefined;
  const currentQuery = isControlled ? searchQuery : localQuery;

  const handleQueryChange = (val: string) => {
    if (!isControlled) {
      setLocalQuery(val);
    }
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const handleClear = () => {
    handleQueryChange("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const dateOptions = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
  ];

  return (
    <div
      className="pgh header-component"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 24,
        flexWrap: "wrap",
      }}
    >
      {/* Title & Subtitle */}
      <div className="pgh-l" style={{ minWidth: 200, flex: "1 1 auto" }}>
        <h1
          style={{
            fontSize: "1.45rem",
            fontWeight: 700,
            color: "var(--color-navy, #0f1e35)",
            margin: 0,
            letterSpacing: "-0.02em",
            fontFamily: '"Outfit", sans-serif',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            margin: "4px 0 0",
            fontSize: "0.82rem",
            color: "var(--color-muted, #64748b)",
            fontWeight: 500,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Global Toolbar Actions (Always on one line) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "nowrap",
          flexShrink: 0,
        }}
      >
        {/* Working Search Bar */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: 240,
            height: 38,
            background: isFocused ? "#ffffff" : "#f8fafc",
            border: isFocused
              ? "1.5px solid var(--color-primary, #0ea5e9)"
              : "1px solid #dbe4ef",
            borderRadius: 8,
            padding: "0 10px",
            boxShadow: isFocused
              ? "0 0 0 3px rgba(14, 165, 233, 0.15), 0 1px 2px rgba(0,0,0,0.04)"
              : "0 1px 2px rgba(0,0,0,0.02)",
            transition: "all 0.15s ease",
          }}
        >
          <Search
            size={15}
            color={isFocused ? "var(--color-primary, #0ea5e9)" : "#64748b"}
            style={{ flexShrink: 0, marginRight: 8, transition: "color 0.15s" }}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder={searchPlaceholder}
            value={currentQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              width: "100%",
              border: 0,
              outline: 0,
              fontSize: 12.5,
              fontWeight: 500,
              fontFamily: "inherit",
              color: "#1e293b",
              background: "transparent",
            }}
          />
          {currentQuery ? (
            <button
              type="button"
              onClick={handleClear}
              title="Clear search"
              style={{
                border: 0,
                background: "#e2e8f0",
                borderRadius: "50%",
                width: 16,
                height: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#64748b",
                padding: 0,
                flexShrink: 0,
                marginLeft: 4,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#cbd5e1")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#e2e8f0")
              }
            >
              <X size={10} strokeWidth={2.5} />
            </button>
          ) : null}
        </div>

        {/* Date Range Picker Dropdown (if dateRange & setDateRange provided) */}
        {dateRange && setDateRange ? (
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              style={{
                height: 38,
                padding: "0 12px",
                background: "#ffffff",
                border: showDatePicker
                  ? "1px solid var(--color-primary, #0ea5e9)"
                  : "1px solid #dbe4ef",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontSize: 12,
                fontWeight: 600,
                color: "#334155",
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap",
              }}
            >
              <Calendar size={14} color="var(--color-primary, #0ea5e9)" />
              <span>{dateRange}</span>
              <ChevronDown
                size={14}
                color="#94a3b8"
                style={{
                  transform: showDatePicker ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.15s ease",
                }}
              />
            </button>

            {showDatePicker && (
              <>
                <div
                  onClick={() => setShowDatePicker(false)}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 190,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    right: 0,
                    zIndex: 200,
                    width: 170,
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    padding: "4px 0",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                >
                  {dateOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setDateRange(opt);
                        setShowDatePicker(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 14px",
                        fontSize: 12,
                        fontWeight: dateRange === opt ? 700 : 500,
                        color:
                          dateRange === opt
                            ? "var(--color-primary, #0ea5e9)"
                            : "#334155",
                        background:
                          dateRange === opt ? "#f0f9ff" : "transparent",
                        border: 0,
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        if (dateRange !== opt)
                          e.currentTarget.style.background = "#f8fafc";
                      }}
                      onMouseLeave={(e) => {
                        if (dateRange !== opt)
                          e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span>{opt}</span>
                      {dateRange === opt && (
                        <Check
                          size={13}
                          color="var(--color-primary, #0ea5e9)"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : null}

        {/* Clean Avatar Circle (No box wrapper) */}
        <div
          title="Super Admin Account"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.5px",
            boxShadow: "0 2px 6px rgba(2, 132, 199, 0.25)",
            border: "2px solid #ffffff",
            flexShrink: 0,
            cursor: "default",
          }}
        >
          SA
        </div>

        {/* Optional extra page actions */}
        {children}
      </div>
    </div>
  );
}
