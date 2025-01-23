import { Box } from "@mui/material";
import { useGetIdentity } from "@refinedev/core";
import React from "react";
import { Form } from "../components";

function CreateProperty() {
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: true,
  });

  return <Form type="create" />;
}

export default CreateProperty;
