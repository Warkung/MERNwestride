import { ArrowCircleUpRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { TotalRevenueOptions, TotalRevenueSeries } from "./ChartConfig";

function TotalRevenue() {
  return (
    <Box
      p={4}
      flex={1}
      bgcolor={"#fff"}
      borderRadius={5}
      flexDirection={"column"}
      display={"flex"}
      boxShadow={"0 4px 12px 0 rgba(18,38,63,.125)"}
    >
      <Typography variant={"h6"} color="#11142d">
        Total Revenue
      </Typography>
      <Stack my={"20px"} direction={"row"} gap={4} flexWrap={"wrap"}>
        <Typography fontSize={28} fontWeight={700} color="#11142d">
          $235,798
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <ArrowCircleUpRounded sx={{ color: "#4caf50" }} />
          <Stack>
            <Typography fontSize={12} color="#4caf50">
              0.8%
            </Typography>
            <Typography fontSize={12} color="#4caf50">
              Since last month
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <ReactApexChart
        series={TotalRevenueSeries}
        type="bar"
        height={310}
        options={TotalRevenueOptions}
      />
    </Box>
  );
}

export default TotalRevenue;
