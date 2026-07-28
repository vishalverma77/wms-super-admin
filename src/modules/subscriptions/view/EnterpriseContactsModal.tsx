import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Chip,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Stack,
} from "@mui/material";
import type { EnterpriseContactItem } from "../types";

type EnterpriseContactsModalProps = {
  open: boolean;
  onClose: () => void;
  contacts: EnterpriseContactItem[];
  newContactsCount: number;
  onMarkContacted: (id: string | number) => void;
};

export function EnterpriseContactsModal({
  open,
  onClose,
  contacts,
  newContactsCount,
  onMarkContacted,
}: EnterpriseContactsModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          bgcolor: "var(--color-surface, #ffffff)",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--bdr2, #e6eef2)",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ color: "var(--navy, #0f1e35)", fontSize: "1.05rem" }}>
              Enterprise Pro Plan Requests
            </Typography>
            {newContactsCount > 0 && (
              <Chip
                label={`${newContactsCount} New`}
                size="small"
                sx={{
                  bgcolor: "var(--color-primary-soft, #eaf8fd)",
                  color: "var(--color-primary-strong, #1597c6)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  height: "22px",
                }}
              />
            )}
          </Box>
          <Typography variant="body2" sx={{ color: "var(--tx3, #7a7876)", fontSize: "0.825rem", mt: 0.25 }}>
            Leads that submitted the enterprise contact form from the landing page.
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: "var(--tx3, #7a7876)" }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
          <Table sx={{ width: "100%" }}>
            <TableHead sx={{ bgcolor: "var(--bg, #f9fbfe)" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: "var(--tx3, #7a7876)", fontSize: "0.8rem", py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "var(--tx3, #7a7876)", fontSize: "0.8rem", py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                  Contact Info
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "var(--tx3, #7a7876)", fontSize: "0.8rem", py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                  Company
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "var(--tx3, #7a7876)", fontSize: "0.8rem", py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                  Request Date
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "var(--tx3, #7a7876)", fontSize: "0.8rem", py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                  Status
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: "var(--tx3, #7a7876)", fontSize: "0.8rem", py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id} hover>
                  <TableCell sx={{ py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                      <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          bgcolor: "var(--bg2, #eef8fc)",
                          color: "var(--blue, #3ac1ef)",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        {contact.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.85rem", color: "var(--navy, #0f1e35)" }}>
                        {contact.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                    <Typography variant="body2" sx={{ color: "var(--tx3, #7a7876)", fontSize: "0.825rem" }}>
                      {contact.email}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "var(--tx4, #a8a5a0)", fontSize: "0.75rem" }} display="block">
                      {contact.phone}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500, color: "var(--tx, #1a1a1a)", fontSize: "0.85rem", py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                    {contact.company}
                  </TableCell>
                  <TableCell sx={{ color: "var(--tx3, #7a7876)", fontSize: "0.825rem", py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                    {contact.requestDate}
                  </TableCell>
                  <TableCell sx={{ py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                    <Chip
                      label={contact.status}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        height: "22px",
                        borderRadius: "4px",
                        bgcolor:
                          contact.status === "New"
                            ? "var(--color-primary-soft, #eaf8fd)"
                            : "var(--grn-b, #dcfce7)",
                        color:
                          contact.status === "New"
                            ? "var(--color-primary-strong, #1597c6)"
                            : "var(--grn, #15803d)",
                      }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ py: 1.25, px: 1.5, whiteSpace: "nowrap" }}>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => alert(`Sending email to ${contact.email}`)}
                        sx={{
                          textTransform: "none",
                          fontSize: "0.775rem",
                          py: 0.25,
                          px: 1.25,
                          borderRadius: "4px",
                          borderColor: "var(--bdr2, #e6eef2)",
                          color: "var(--tx2, #4a4a4a)",
                          "&:hover": {
                            bgcolor: "var(--bg, #f9fbfe)",
                          },
                        }}
                      >
                        Email
                      </Button>
                      {contact.status === "New" && (
                        <Button
                          variant="contained"
                          size="small"
                          disableElevation
                          onClick={() => onMarkContacted(contact.id)}
                          sx={{
                            bgcolor: "var(--grn, #15803d)",
                            color: "#ffffff",
                            textTransform: "none",
                            fontSize: "0.775rem",
                            fontWeight: 600,
                            py: 0.25,
                            px: 1.25,
                            borderRadius: "4px",
                            "&:hover": { bgcolor: "#059669" },
                          }}
                        >
                          Mark Contacted
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions sx={{ p: 1.5 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={onClose}
          sx={{
            textTransform: "none",
            borderRadius: "4px",
            borderColor: "var(--bdr2, #e6eef2)",
            color: "var(--tx2, #4a4a4a)",
            fontSize: "0.825rem",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
