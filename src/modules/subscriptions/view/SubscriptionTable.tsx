import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Avatar,
} from "@mui/material";
import type { RazorpaySubscription } from "../types";

type SubscriptionTableProps = {
  subscriptions: RazorpaySubscription[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  searchQuery?: string;
};

export function SubscriptionTable({
  subscriptions,
  loading,
  error,
  onRetry,
  searchQuery,
}: SubscriptionTableProps) {
  const getCustomerName = (sub: RazorpaySubscription) => {
    if (sub.notes?.companyName) return sub.notes.companyName;
    if (sub.notes?.customerName) return sub.notes.customerName;
    return "N/A";
  };

  const filteredSubscriptions = subscriptions.filter((sub) => {
    if (!searchQuery?.trim()) return true;
    const q = searchQuery.toLowerCase();
    const customerName = getCustomerName(sub).toLowerCase();
    const email = (sub.notes?.customerEmail || "").toLowerCase();
    const subId = (sub.razorpaySubscriptionId || sub.id || "").toLowerCase();
    const planId = (sub.razorpayPlanId || "").toLowerCase();
    const status = (sub.status || "").toLowerCase();
    return (
      customerName.includes(q) ||
      email.includes(q) ||
      subId.includes(q) ||
      planId.includes(q) ||
      status.includes(q)
    );
  });

  const getInitials = (name: string) => {
    if (!name || name === "N/A") return "S";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid var(--bdr2, #e6eef2)",
        borderRadius: "8px",
        overflow: "hidden",
        bgcolor: "var(--color-surface, #ffffff)",
      }}
    >
      {/* Loading State */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 6,
            gap: 1.5,
          }}
        >
          <CircularProgress size={32} sx={{ color: "var(--color-primary, #3ac1ef)" }} />
          <Typography variant="body2" sx={{ color: "var(--tx3, #7a7876)", fontSize: "0.85rem" }}>
            Fetching subscription records...
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {!loading && error && (
        <Box sx={{ p: 2.5 }}>
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={onRetry} sx={{ fontWeight: 600, textTransform: "none" }}>
                Retry
              </Button>
            }
            sx={{ borderRadius: "6px", fontSize: "0.85rem" }}
          >
            {error}
          </Alert>
        </Box>
      )}

      {/* Empty State Text */}
      {!loading && !error && filteredSubscriptions.length === 0 && (
        <Box
          sx={{
            py: 6,
            px: 2,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography variant="body1" sx={{ color: "var(--tx2, #4a4a4a)", fontWeight: 500 }}>
            {searchQuery ? `No subscriptions matching "${searchQuery}"` : "No subscriptions found"}
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--tx3, #7a7876)", fontSize: "0.825rem" }}>
            {searchQuery ? "Try adjusting your search criteria" : "There are no subscriptions to display right now."}
          </Typography>
          {!searchQuery && (
            <Button
              variant="outlined"
              size="small"
              onClick={onRetry}
              sx={{
                mt: 1,
                textTransform: "none",
                borderColor: "var(--bdr2, #e6eef2)",
                color: "var(--tx2, #4a4a4a)",
                fontSize: "0.8rem",
                borderRadius: "6px",
              }}
            >
              Refresh
            </Button>
          )}
        </Box>
      )}

      {/* Subscription Table fitted to 100% width without horizontal scroll on desktop */}
      {!loading && !error && filteredSubscriptions.length > 0 && (
        <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
          <Table sx={{ width: "100%" }}>
            <TableHead sx={{ bgcolor: "var(--bg, #f9fbfe)" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: "var(--tx3, #7a7876)", fontSize: "0.8rem", py: 1.5, px: 1.5, whiteSpace: "nowrap" }}>
                  Company / Customer
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "var(--tx3, #7a7876)", fontSize: "0.8rem", py: 1.5, px: 1.5, whiteSpace: "nowrap" }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "var(--tx3, #7a7876)", fontSize: "0.8rem", py: 1.5, px: 1.5, whiteSpace: "nowrap" }}>
                  Subscription ID
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "var(--tx3, #7a7876)", fontSize: "0.8rem", py: 1.5, px: 1.5, whiteSpace: "nowrap" }}>
                  Plan ID
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "var(--tx3, #7a7876)", fontSize: "0.8rem", py: 1.5, px: 1.5, whiteSpace: "nowrap" }}>
                  Cycles (Paid/Total)
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "var(--tx3, #7a7876)", fontSize: "0.8rem", py: 1.5, px: 1.5, whiteSpace: "nowrap" }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "var(--tx3, #7a7876)", fontSize: "0.8rem", py: 1.5, px: 1.5, whiteSpace: "nowrap" }}>
                  Created Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSubscriptions.map((row) => {
                const customerName = getCustomerName(row);
                const isActive = row.status?.toLowerCase() === "active";

                return (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell sx={{ py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                        <Avatar
                          sx={{
                            width: 28,
                            height: 28,
                            bgcolor: "var(--bg2, #eef8fc)",
                            color: "var(--blue, #3ac1ef)",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                          }}
                        >
                          {getInitials(customerName)}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.85rem", color: "var(--tx, #1a1a1a)" }}>
                          {customerName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: "var(--tx3, #7a7876)", fontSize: "0.85rem", py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                      {row.notes?.customerEmail || "N/A"}
                    </TableCell>
                    <TableCell sx={{ py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                      <Chip
                        label={row.razorpaySubscriptionId}
                        size="small"
                        sx={{
                          fontFamily: "monospace",
                          fontSize: "0.75rem",
                          bgcolor: "var(--bg, #f9fbfe)",
                          color: "var(--tx2, #4a4a4a)",
                          borderRadius: "4px",
                          height: "22px",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                      <Chip
                        label={row.razorpayPlanId}
                        size="small"
                        sx={{
                          fontFamily: "monospace",
                          fontSize: "0.75rem",
                          bgcolor: "var(--color-primary-soft, #eaf8fd)",
                          color: "var(--color-primary-strong, #1597c6)",
                          borderRadius: "4px",
                          height: "22px",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500, color: "var(--tx, #1a1a1a)", fontSize: "0.85rem", py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                      {row.paidCount} / {row.totalCount}
                    </TableCell>
                    <TableCell sx={{ py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                      <Chip
                        label={row.status}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          textTransform: "capitalize",
                          borderRadius: "4px",
                          height: "22px",
                          bgcolor: isActive ? "var(--grn-b, #dcfce7)" : "var(--amb-b, #fef3c7)",
                          color: isActive ? "var(--grn, #15803d)" : "var(--amb, #b45309)",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: "var(--tx3, #7a7876)", fontSize: "0.85rem", py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                      {formatDate(row.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
