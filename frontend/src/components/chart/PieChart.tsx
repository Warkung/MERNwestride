import React from "react";
import { PieChartProps } from "../../interfaces/homeInterface";
import { Box, Stack, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

function PieChart({ title, value, series, colors }: PieChartProps) {
  return (
    <Box
      id="chart"
      display={"flex"}
      flex={1}
      flexDirection={"row"}
      bgcolor={"#fff"}
      justifyContent={"space-between"}
      alignItems={"center"}
      pl={3.5}
      py={2}
      gap={2}
      borderRadius={5}
      minHeight={"110px"}
      width={"fit-content"}
      boxShadow={"0px 4px 10px rgba(0, 0, 0, 0.05)"}
    >
      <Stack direction={"column"} spacing={1}>
        <Typography fontSize={14} color="#808191">
          {title}
        </Typography>
        <Typography fontSize={24} fontWeight={700} mt={1} color="#11142d">
          {value}
        </Typography>
      </Stack>
      <ReactApexChart
        options={{
          chart: { type: "donut" },
          colors,
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={series}
        type="donut"
        height={120}
        width={120}
      />
    </Box>
  );
}

export default PieChart;
