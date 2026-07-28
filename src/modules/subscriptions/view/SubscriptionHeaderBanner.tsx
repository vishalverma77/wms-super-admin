import { Box, Paper, Typography, Button, IconButton, Avatar, Stack } from "@mui/material";

type SubscriptionHeaderBannerProps = {
  newContactsCount: number;
  onOpenRequests: () => void;
  onCloseBanner: () => void;
};

export function SubscriptionHeaderBanner({
  newContactsCount,
  onOpenRequests,
  onCloseBanner,
}: SubscriptionHeaderBannerProps) {
  if (newContactsCount === 0) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2.5,
        borderRadius: "8px",
        bgcolor: "var(--color-primary-soft, #eaf8fd)",
        border: "1px solid var(--bdr2, #e6eef2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: { xs: "100%", sm: "auto" } }}>
        <Avatar
          sx={{
            bgcolor: "var(--color-primary, #3ac1ef)",
            color: "#ffffff",
            width: 36,
            height: 36,
            flexShrink: 0,
          }}
        >
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
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </Avatar>
        <Box>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            sx={{ color: "var(--color-primary-strong, #1597c6)", fontSize: "0.95rem" }}
          >
            Enterprise Pro Plan Inquiries
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--tx3, #7a7876)", fontSize: "0.85rem" }}>
            You have {newContactsCount} new contact request{newContactsCount > 1 ? "s" : ""} from the landing page.
          </Typography>
        </Box>
      </Box>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "space-between", sm: "flex-end" } }}
      >
        <Button
          variant="contained"
          disableElevation
          onClick={onOpenRequests}
          sx={{
            bgcolor: "var(--color-primary, #3ac1ef)",
            color: "#ffffff",
            fontWeight: 600,
            borderRadius: "6px",
            px: 2,
            py: 0.75,
            textTransform: "none",
            fontSize: "0.825rem",
            "&:hover": {
              bgcolor: "var(--color-primary-strong, #1597c6)",
            },
          }}
        >
          See All Requests
        </Button>
        <IconButton
          size="small"
          onClick={onCloseBanner}
          sx={{ color: "var(--color-primary-strong, #1597c6)", opacity: 0.7, "&:hover": { opacity: 1 } }}
        >
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
      </Stack>
    </Paper>
  );
}
