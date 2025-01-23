import { Box, Typography } from "@mui/material";
import React from "react";

function TotalRevenue() {
  return (
    <Box
      p={4}
      flex={1}
      bgcolor={"#fff"}
      borderRadius={5}
      flexDirection={"column"}
      display={"flex"}
    >
      <Typography variant={"h6"} color="#11142d">
        Total Revenue
      </Typography>
      <Typography m>
        Total Revenue
      </Typography>
    </Box>
  );
}

export default TotalRevenue;
