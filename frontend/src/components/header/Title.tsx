import { BedroomBaby } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

function Title({ collapsed }: { collapsed: boolean }) {
  return (
    <Box display={"flex"}>
      <BedroomBaby sx={{ marginRight: collapsed ? 0 : 2 }} />
      <Typography
        fontSize={18}
        fontWeight={700}
        display={collapsed ? "none" : "block"}
      >
        Dashboard
      </Typography>
    </Box>
  );
}

export default Title;
