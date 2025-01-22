import { Box, Stack, Typography } from "@mui/material";
import { PieChart, PropertyReferral, TotalRevenue } from "../components";

function Home() {
  return (
    <Box>
      <Typography variant={"h4"} color="">Dashboard</Typography>

      <Box mt={"20px"} display={"flex"} flexWrap={"wrap"} gap={4}>
        <PieChart
          title={"Properties for sale"}
          value={30}
          series={[75, 25]}
          colors={["#275be8", "#e8e8e8"]}
        />
        <PieChart
          title={"Properties for rent"}
          value={400}
          series={[40, 60]}
          colors={["#275be8", "#e8e8e8"]}
        />
        <PieChart
          title={"Total customers"}
          value={750}
          series={[80, 20]}
          colors={["#275be8", "#e8e8e8"]}
        />
        <PieChart
          title={"Properties for city"}
          value={500}
          series={[50, 20]}
          colors={["#275be8", "#e8e8e8"]}
        />
      </Box>
      <Stack
        mt={"25px"}
        width={"100%"}
        direction={{ xs: "column", lg: "row" }}
        gap={2}
      >
        <TotalRevenue />
        <PropertyReferral />
      </Stack>
    </Box>
  );
}

export default Home;
