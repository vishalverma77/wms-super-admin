import { useState, useMemo, useEffect } from "react";
import { Header } from "../../../components/Header";
import { StatsCard } from "../../../components/StatsCard";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchRevenueRequest } from "../slice";
import type { TransactionItem } from "../types";
import {
  Receipt,
  Search,
  DollarSign,
  TrendingUp,
  Clock,
  AlertCircle,
  CreditCard,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Calendar,
  Layers,
} from "lucide-react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";

export function Revenue() {
  const dispatch = useAppDispatch();
  const { data: revenueData, loading, error } = useAppSelector(
    (state) => state.revenue,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Trigger API call immediately on component mount
  useEffect(() => {
    dispatch(fetchRevenueRequest());
  }, [dispatch]);

  // Extract transactions from API response (or empty array)
  const transactions: TransactionItem[] = useMemo(() => {
    return revenueData?.transactions || [];
  }, [revenueData]);

  // Helper to safely parse numeric value from amount
  const parseAmount = (amount: string | number | undefined): number => {
    if (typeof amount === "number") return isNaN(amount) ? 0 : amount;
    if (!amount) return 0;
    const cleaned = amount.toString().replace(/[^0-9.-]+/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Helper to format currency values
  const formatCurrency = (val: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Dynamically computed metrics using API summary data with fallback to transaction item calculations
  const stats = useMemo(() => {
    let calculatedPaid = 0;
    let calculatedPending = 0;
    let calculatedPendingCount = 0;
    let calculatedFailed = 0;
    let calculatedFailedCount = 0;

    transactions.forEach((tx) => {
      const amt = parseAmount(tx.amount);
      const statusLower = (tx.status || "").toLowerCase();

      if (statusLower === "paid" || statusLower === "active") {
        calculatedPaid += amt;
      } else if (statusLower === "pending") {
        calculatedPending += amt;
        calculatedPendingCount += 1;
      } else if (statusLower === "failed") {
        calculatedFailed += amt;
        calculatedFailedCount += 1;
      }
    });

    const mrr = revenueData?.mrr !== undefined ? revenueData.mrr : calculatedPaid;
    const arr = revenueData?.arr !== undefined ? revenueData.arr : mrr * 12;
    const pendingAmount =
      revenueData?.pendingRevenue !== undefined
        ? revenueData.pendingRevenue
        : calculatedPending;
    const failedAmount =
      revenueData?.failedRevenue !== undefined
        ? revenueData.failedRevenue
        : calculatedFailed;

    return {
      mrr,
      arr,
      pendingAmount,
      pendingCount: calculatedPendingCount,
      failedAmount,
      failedCount: calculatedFailedCount,
      totalCount: transactions.length,
      planBreakdown: revenueData?.planBreakdown || [],
    };
  }, [transactions, revenueData]);

  // Filtered transactions based on search query and status tab
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesStatus =
        statusFilter === "All" ||
        tx.status?.toLowerCase() === statusFilter.toLowerCase();

      if (!matchesStatus) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const id = (tx.id || "").toLowerCase();
      const client = (tx.client || "").toLowerCase();
      const plan = (tx.plan || "").toLowerCase();
      const method = (tx.method || "").toLowerCase();
      const status = (tx.status || "").toLowerCase();
      const amount = (tx.amount?.toString() || "").toLowerCase();
      const date = (tx.date || "").toLowerCase();
      const email = (tx.email || "").toLowerCase();

      return (
        id.includes(q) ||
        client.includes(q) ||
        plan.includes(q) ||
        method.includes(q) ||
        status.includes(q) ||
        amount.includes(q) ||
        date.includes(q) ||
        email.includes(q)
      );
    });
  }, [transactions, searchQuery, statusFilter]);

  const getInitials = (name: string) => {
    if (!name) return "TX";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getStatusBadge = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "paid" || s === "active") {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: 600,
            background: "var(--grn-b, #dcfce7)",
            color: "var(--grn, #15803d)",
          }}
        >
          <CheckCircle2 size={12} />
          {status || "Paid"}
        </span>
      );
    }
    if (s === "pending") {
      return (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: 600,
            background: "var(--amb-b, #fef3c7)",
            color: "var(--amb, #b45309)",
          }}
        >
          <Clock size={12} />
          Pending
        </span>
      );
    }
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: "4px 10px",
          borderRadius: "6px",
          fontSize: "0.75rem",
          fontWeight: 600,
          background: "var(--red-b, #fecdd3)",
          color: "var(--red, #be123c)",
        }}
      >
        <XCircle size={12} />
        {status || "Failed"}
      </span>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, sm: 2.25 },
        width: "100%",
        minHeight: "100%",
        boxSizing: "border-box",
      }}
    >
      <Header
        title="Revenue"
        subtitle="MRR · ARR · Invoice tracking · Payment flow"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search invoices, clients, payment status..."
      />

      {/* Error Alert */}
      {error && !loading && (
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => dispatch(fetchRevenueRequest())}
              sx={{ fontWeight: 600, textTransform: "none" }}
            >
              Retry
            </Button>
          }
          sx={{ borderRadius: "8px", fontSize: "0.85rem" }}
        >
          {error}
        </Alert>
      )}

      {/* Responsive KPI Summary Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "12px",
          width: "100%",
        }}
      >
        <StatsCard
          title="MONTHLY RECURRING REVENUE"
          value={formatCurrency(stats.mrr)}
          icon={DollarSign}
          color="primary"
          trend="+18%"
          actionText="Live monthly rate"
        />
        <StatsCard
          title="ANNUAL RUN RATE"
          value={formatCurrency(stats.arr)}
          icon={TrendingUp}
          color="primary"
          trend="+12%"
          actionText="Projected ARR"
        />
        <StatsCard
          title="PENDING INVOICES"
          value={formatCurrency(stats.pendingAmount)}
          icon={Clock}
          color="warning"
          trend={`${stats.pendingCount} pending`}
          actionText="Review pending"
        />
        <StatsCard
          title="FAILED PAYMENTS"
          value={formatCurrency(stats.failedAmount)}
          icon={AlertCircle}
          color="danger"
          trend={stats.failedCount > 0 ? `-${stats.failedCount}` : undefined}
          actionText="Retry payments"
        />
      </div>

      {/* Plan Breakdown Section if available */}
      {stats.planBreakdown && stats.planBreakdown.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            background: "var(--color-surface, #ffffff)",
            border: "1px solid var(--bdr2, #e6eef2)",
            borderRadius: "12px",
            p: 2,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
            <Layers size={16} color="var(--primary)" />
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "var(--tx, #1a1a1a)" }}>
              Revenue by Subscription Plan
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 1.5,
            }}
          >
            {stats.planBreakdown.map((plan, idx) => (
              <Box
                key={idx}
                sx={{
                  p: 1.5,
                  borderRadius: "8px",
                  border: "1px solid var(--bdr2, #e6eef2)",
                  background: "var(--bg, #f9fbfe)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "var(--tx, #1a1a1a)" }}>
                    {plan.planName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "var(--tx3, #7a7876)" }}>
                    {plan.activeCount} active subscribers
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "var(--primary)" }}>
                  {formatCurrency(plan.mrr || plan.totalRevenue || 0)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      {/* Main Content Area */}
      <Paper
        elevation={0}
        sx={{
          background: "var(--color-surface, #ffffff)",
          border: "1px solid var(--bdr2, #e6eef2)",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 340,
          overflow: "hidden",
        }}
      >
        {/* Table/Card Header Bar */}
        <Box
          sx={{
            p: { xs: 2, sm: 2.25 },
            borderBottom: "1px solid var(--bdr2, #e6eef2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "8px",
                background: "var(--bg2, #f0f3fc)",
                color: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Receipt size={17} />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "0.9rem", sm: "0.975rem" },
                  color: "var(--tx, #1a1a1a)",
                  lineHeight: 1.2,
                }}
              >
                Invoices & Transactions
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "var(--tx3, #7a7876)",
                  fontSize: "0.75rem",
                }}
              >
                {transactions.length > 0
                  ? `Showing ${filteredTransactions.length} of ${transactions.length} entries`
                  : "Real-time billing transactions and invoice records"}
              </Typography>
            </Box>
          </Box>

          {/* Filter Tabs if there are transactions */}
          {transactions.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                background: "var(--bg, #f9fbfe)",
                p: "4px",
                borderRadius: "8px",
                border: "1px solid var(--bdr2, #e6eef2)",
              }}
            >
              {["All", "Paid", "Pending", "Failed"].map((status) => {
                const isActive = statusFilter === status;
                return (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    style={{
                      border: "none",
                      background: isActive ? "var(--color-surface, #ffffff)" : "transparent",
                      color: isActive ? "var(--tx, #1a1a1a)" : "var(--tx3, #7a7876)",
                      fontWeight: isActive ? 600 : 500,
                      fontSize: "0.75rem",
                      padding: "5px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      boxShadow: isActive ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {status}
                  </button>
                );
              })}
            </Box>
          )}
        </Box>

        {/* Loading State Spinner */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
              gap: 1.5,
            }}
          >
            <CircularProgress size={32} sx={{ color: "var(--primary)" }} />
            <Typography variant="body2" sx={{ color: "var(--tx3, #7a7876)", fontSize: "0.85rem" }}>
              Fetching latest revenue & transaction data...
            </Typography>
          </Box>
        )}

        {/* State 1: No Data at all (Empty State Card) */}
        {!loading && transactions.length === 0 && (
          <Box
            sx={{
              py: { xs: 6, sm: 8 },
              px: { xs: 2.5, sm: 4 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              flex: 1,
              gap: 2.5,
            }}
          >
            <Box
              sx={{
                width: { xs: 64, sm: 76 },
                height: { xs: 64, sm: 76 },
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, var(--bg2, #f0f3fc) 0%, #edf1ff 100%)",
                border: "1px solid var(--bdr2, #e6eef2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary)",
                boxShadow: "0 8px 20px rgba(72, 87, 210, 0.15)",
              }}
            >
              <Receipt size={36} strokeWidth={1.75} />
            </Box>

            <Box sx={{ maxWidth: 460 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.05rem", sm: "1.2rem" },
                  color: "var(--tx, #1a1a1a)",
                  mb: 0.75,
                }}
              >
                No Revenue Records Yet
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.825rem", sm: "0.875rem" },
                  lineHeight: 1.6,
                  color: "var(--tx3, #7a7876)",
                }}
              >
                There are currently no transaction or invoice records found. As subscriptions renew and payments are processed, live revenue metrics will appear here.
              </Typography>
            </Box>

            {/* Feature Highlights Pills */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.25,
                justifyContent: "center",
                mt: 0.5,
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  py: 0.75,
                  px: 1.75,
                  borderRadius: "20px",
                  background: "var(--bg, #f9fbfe)",
                  border: "1px solid var(--bdr2, #e6eef2)",
                  fontSize: "0.775rem",
                  color: "var(--tx2, #4a4a4a)",
                  fontWeight: 500,
                }}
              >
                <Sparkles size={14} color="var(--primary)" />
                Automatic MRR / ARR Sync
              </Box>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  py: 0.75,
                  px: 1.75,
                  borderRadius: "20px",
                  background: "var(--bg, #f9fbfe)",
                  border: "1px solid var(--bdr2, #e6eef2)",
                  fontSize: "0.775rem",
                  color: "var(--tx2, #4a4a4a)",
                  fontWeight: 500,
                }}
              >
                <CreditCard size={14} color="var(--primary)" />
                Multi-Gateway Tracking
              </Box>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  py: 0.75,
                  px: 1.75,
                  borderRadius: "20px",
                  background: "var(--bg, #f9fbfe)",
                  border: "1px solid var(--bdr2, #e6eef2)",
                  fontSize: "0.775rem",
                  color: "var(--tx2, #4a4a4a)",
                  fontWeight: 500,
                }}
              >
                <CheckCircle2 size={14} color="var(--grn, #15803d)" />
                Automated Invoicing
              </Box>
            </Box>
          </Box>
        )}

        {/* State 2: Has Data, but Filter/Search produces 0 results */}
        {!loading && transactions.length > 0 && filteredTransactions.length === 0 && (
          <Box
            sx={{
              py: 6,
              px: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              flex: 1,
              gap: 1.75,
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "var(--bg, #f9fbfe)",
                border: "1px solid var(--bdr2, #e6eef2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--tx3, #7a7876)",
              }}
            >
              <Search size={24} />
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "var(--tx, #1a1a1a)",
                  mb: 0.5,
                }}
              >
                No matching transactions
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.825rem",
                  color: "var(--tx3, #7a7876)",
                }}
              >
                {searchQuery
                  ? `No records found matching "${searchQuery}".`
                  : "No records found for the selected status filter."}
              </Typography>
            </Box>
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("All");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: "6px",
                border: "1px solid var(--bdr2, #e6eef2)",
                background: "var(--color-surface, #ffffff)",
                color: "var(--tx2, #4a4a4a)",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                marginTop: "4px",
              }}
            >
              <RotateCcw size={14} />
              Reset Filters
            </button>
          </Box>
        )}

        {/* State 3: Transactions Data (Desktop Table + Mobile Cards) */}
        {!loading && filteredTransactions.length > 0 && (
          <>
            {/* Desktop Table View (sm and up) */}
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                width: "100%",
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  fontSize: "0.85rem",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "var(--bg, #f9fbfe)",
                      borderBottom: "1px solid var(--bdr2, #e6eef2)",
                    }}
                  >
                    <th
                      style={{
                        padding: "12px 18px",
                        fontWeight: 600,
                        color: "var(--tx3, #7a7876)",
                        fontSize: "0.775rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Invoice ID
                    </th>
                    <th
                      style={{
                        padding: "12px 18px",
                        fontWeight: 600,
                        color: "var(--tx3, #7a7876)",
                        fontSize: "0.775rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Client / Company
                    </th>
                    <th
                      style={{
                        padding: "12px 18px",
                        fontWeight: 600,
                        color: "var(--tx3, #7a7876)",
                        fontSize: "0.775rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Plan
                    </th>
                    <th
                      style={{
                        padding: "12px 18px",
                        fontWeight: 600,
                        color: "var(--tx3, #7a7876)",
                        fontSize: "0.775rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Date
                    </th>
                    <th
                      style={{
                        padding: "12px 18px",
                        fontWeight: 600,
                        color: "var(--tx3, #7a7876)",
                        fontSize: "0.775rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Method
                    </th>
                    <th
                      style={{
                        padding: "12px 18px",
                        fontWeight: 600,
                        color: "var(--tx3, #7a7876)",
                        fontSize: "0.775rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Amount
                    </th>
                    <th
                      style={{
                        padding: "12px 18px",
                        fontWeight: 600,
                        color: "var(--tx3, #7a7876)",
                        fontSize: "0.775rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      style={{
                        borderBottom: "1px solid var(--bdr2, #e6eef2)",
                        transition: "background 0.15s ease",
                      }}
                    >
                      <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "var(--primary)",
                            background: "var(--primary-light)",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                          }}
                        >
                          {tx.id}
                        </span>
                      </td>
                      <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                          <Avatar
                            sx={{
                              width: 30,
                              height: 30,
                              borderRadius: "50%",
                              background: "var(--bg2, #f0f3fc)",
                              color: "var(--primary)",
                              fontWeight: 700,
                              fontSize: "0.75rem",
                            }}
                          >
                            {getInitials(tx.client)}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color: "var(--tx, #1a1a1a)",
                                fontSize: "0.85rem",
                              }}
                            >
                              {tx.client}
                            </Typography>
                            {tx.email && (
                              <Typography
                                variant="caption"
                                sx={{
                                  fontSize: "0.75rem",
                                  color: "var(--tx3, #7a7876)",
                                }}
                              >
                                {tx.email}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </td>
                      <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                        <Chip
                          label={tx.plan}
                          size="small"
                          sx={{
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            bgcolor: "var(--bg2, #f0f3fc)",
                            color: "var(--primary)",
                            height: "22px",
                          }}
                        />
                      </td>
                      <td
                        style={{
                          padding: "14px 18px",
                          color: "var(--tx3, #7a7876)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {tx.date}
                      </td>
                      <td
                        style={{
                          padding: "14px 18px",
                          color: "var(--tx3, #7a7876)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {tx.method}
                      </td>
                      <td
                        style={{
                          padding: "14px 18px",
                          fontWeight: 700,
                          color: "var(--tx, #1a1a1a)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {typeof tx.amount === "number"
                          ? formatCurrency(tx.amount)
                          : tx.amount}
                      </td>
                      <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                        {getStatusBadge(tx.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>

            {/* Mobile Cards View (xs to md) */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "column",
                gap: 1.5,
                p: 2,
              }}
            >
              {filteredTransactions.map((tx) => (
                <Paper
                  key={tx.id}
                  elevation={0}
                  sx={{
                    p: 2,
                    border: "1px solid var(--bdr2, #e6eef2)",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    bgcolor: "var(--bg, #f9fbfe)",
                  }}
                >
                  {/* Card Top: Client & Status */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: "var(--bg2, #f0f3fc)",
                          color: "var(--primary)",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                        }}
                      >
                        {getInitials(tx.client)}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "var(--tx, #1a1a1a)", fontSize: "0.85rem" }}
                        >
                          {tx.client}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "var(--tx3, #7a7876)", fontSize: "0.725rem", fontFamily: "monospace" }}
                        >
                          {tx.id}
                        </Typography>
                      </Box>
                    </Box>
                    {getStatusBadge(tx.status)}
                  </Box>

                  {/* Card Middle: Plan & Method & Date */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pt: 1,
                      borderTop: "1px solid var(--bdr2, #e6eef2)",
                      fontSize: "0.75rem",
                      color: "var(--tx3, #7a7876)",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Chip
                        label={tx.plan}
                        size="small"
                        sx={{
                          borderRadius: "4px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          bgcolor: "var(--bg2, #f0f3fc)",
                          color: "var(--primary)",
                          height: "20px",
                        }}
                      />
                      <span>{tx.method}</span>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Calendar size={12} />
                      <span>{tx.date}</span>
                    </Box>
                  </Box>

                  {/* Card Bottom: Total Amount */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pt: 1,
                      borderTop: "1px dashed var(--bdr2, #e6eef2)",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: "var(--tx3, #7a7876)", fontWeight: 500 }}
                    >
                      Total Amount
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: "var(--tx, #1a1a1a)",
                        fontSize: "0.95rem",
                      }}
                    >
                      {typeof tx.amount === "number"
                        ? formatCurrency(tx.amount)
                        : tx.amount}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}
