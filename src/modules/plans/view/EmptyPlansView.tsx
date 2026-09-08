import { Paper, Box, Typography } from "@mui/material";
import { FolderOff as FolderOffIcon } from "@mui/icons-material";
import "./index.css";

export function EmptyPlansView() {
  return (
    <Paper elevation={0} className="plan-empty-paper">
      <Box className="plan-empty-icon-box">
        <FolderOffIcon sx={{ fontSize: 44 }} />
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 800, color: "#0f1e35", mb: 1 }}>
        No Plans Available
      </Typography>

      <Typography variant="body2" sx={{ color: "#64748b", maxWidth: 420, lineHeight: 1.6 }}>
        No subscription plans were found for the selected billing frequency.
      </Typography>
    </Paper>
  );
}
