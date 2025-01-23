import { Box } from "@mui/material";
import React from "react";
import { CustomButton } from "../components";
import { useNavigate } from "react-router";
import { Add } from "@mui/icons-material";

function AllProperties() {
  const navigate = useNavigate();
  return (
    <Box>
      <CustomButton
        title={"Add Property"}
        backgroundColor={"#3f51b5"}
        color={"#fff"}
        handleClick={() => navigate("/properties/create")}
        icon={<Add />}
      />
    </Box>
  );
}

export default AllProperties;
