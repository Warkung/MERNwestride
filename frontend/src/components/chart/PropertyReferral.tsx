import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { propertyReferralsInfo } from "./ChartConfig";

interface ProgressBarProps {
  title: string;
  percentage: number;
  color: string;
}

const ProgressBar = ({ title, percentage, color }: ProgressBarProps) => {
  return (
    <Box>
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={16} fontWeight={500} color={"#11142d"}>
          {title}
        </Typography>
        <Typography fontSize={16} fontWeight={500} color="#11142d">
          {percentage}%
        </Typography>
      </Stack>
      <Box
        mt={2}
        position={"relative"}
        width={"100%"}
        height={"8px"}
        borderRadius={10}
        bgcolor={"#f4f5f7"}
      >
        <Box
          position={"absolute"}
          width={`${percentage}%`}
          height={"100%"}
          borderRadius={10}
          bgcolor={color}
        ></Box>
      </Box>
    </Box>
  );
};

function PropertyReferral() {
  return (
    <Box
      p={4}
      bgcolor={"#fff"}
      minWidth={"300px"}
      display={"flex"}
      flexDirection={"column"}
      borderRadius={5}
      boxShadow={"0 4px 12px 0 rgba(18,38,63,.125)"}
    >
      <Typography variant={"h6"} color="#11142d">
        Property Referral
      </Typography>
      <Stack my={"20px"} direction={"column"} gap={4}>
        {propertyReferralsInfo.map((bar,index) => {
          return <ProgressBar key={index} {...bar} />;
        })}
      </Stack>
    </Box>
  );
}

export default PropertyReferral;
